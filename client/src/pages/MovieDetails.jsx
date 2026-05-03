import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { dummyDateTimeData, dummyShowsData } from '../assets/assets'
import BlurCircle from '../components/BlurCircle'
import { Heart, PlayCircleIcon, StarIcon, Film, Clock, Calendar, Globe } from 'lucide-react'
import timeFormat from '../lib/timeFormat'
import DateSelect from '../components/DateSelect'
import MovieCard from '../components/MovieCard'
import Loading from '../components/Loading'
import { useAppContext } from '../context/AppContext'
import { motion } from 'framer-motion'
import FloatingParticles from '../components/FloatingParticles'
import { GlowingOrb, GridPattern, AnimatedStarsDecor } from '../components/CinemaGraphics'

const MovieDetails = () => {

  const navigate=useNavigate()
  const {id}=useParams()
  const [show,setShow]=useState(null)

  const {shows,axios,getToken,user,fetchFavoriteMovies,favoriteMovies,image_base_url, detailedShows}=useAppContext()
  const currency = import.meta.env.VITE_CURRENCY

  const getShow=async()=>{
    try {
      const {data}=await axios.get(`/api/show/${id}`)
      if(data.success){
        setShow(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const showForMovie = detailedShows?.find(s => (s.movie?._id || s.movie) === id);
  const showPrice = showForMovie?.showPrice;

  const handleFavorite=async()=>{
    try {
      if(!user) return toast.error('Please Login to proceed');
      const {data}=await axios.post('/api/user/update-favorite',{movieId:id},
        {headers:{Authorization:`Bearer ${await getToken()}`}})
      
        if(data.success){
          await fetchFavoriteMovies()
          toast.success(data.message)
        }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getShow()
  },[id])

  return show ? (
    <div className='relative px-6 md:px-16 lg:px-40 pt-30 md:pt-50 overflow-hidden'>
      <FloatingParticles count={12} />
      <GridPattern />
      
      {/* Background movie poster as atmospheric backdrop */}
      <div className='absolute top-0 left-0 right-0 h-[500px] overflow-hidden pointer-events-none'>
        <img 
          src={image_base_url+show.movie.backdrop_path} 
          alt="" 
          className='w-full h-full object-cover opacity-[0.06] blur-sm'
        />
        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-[#09090B]/80 to-[#09090B]' />
      </div>

      <GlowingOrb color='primary' size={300} top='-50px' right='5%' delay={0} />
      <GlowingOrb color='purple' size={200} bottom='300px' left='-50px' delay={2} />

      <div className='relative z-10 flex flex-col md:flex-row gap-8 max-w-6xl mx-auto'>

        {/* Poster with decorative frame */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, x: -30 }} 
          animate={{ opacity: 1, scale: 1, x: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className='relative'
        >
          {/* Decorative frame glow */}
          <div className='absolute -inset-1 bg-gradient-to-br from-primary/30 via-purple-500/20 to-blue-500/20 rounded-xl blur-sm opacity-50' />
          <img 
            src={image_base_url+show.movie.poster_path} 
            alt="" 
            className='relative max-md:mx-auto rounded-xl h-104 max-w-70 object-cover ring-1 ring-white/10'
          />
          
          {/* Rating badge on poster */}
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className='absolute -top-3 -right-3 bg-[#09090B] border border-primary/30 rounded-xl px-3 py-1.5 shadow-lg'
          >
            <div className='flex items-center gap-1.5'>
              <StarIcon className='w-4 h-4 text-primary fill-primary' />
              <span className='text-sm font-bold text-primary'>{show.movie.vote_average.toFixed(1)}</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
             hidden: { opacity: 0, x: 30 },
             visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.2, duration: 0.8, ease: "easeOut" }}
          }}
          className='relative flex flex-col gap-3'>
          <BlurCircle top='-100px' left='-100px'/>
          
          <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 }}} className='text-primary flex items-center gap-2'>
            <Globe className='w-4 h-4' />
            ENGLISH
          </motion.p>
          
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }}} className="flex items-center gap-4 flex-wrap">
            <h1 className='text-4xl font-semibold max-w-96 text-balance'>{show.movie.title}</h1>
            {showPrice && <span className="px-3 py-1 bg-primary/20 text-primary font-bold rounded-lg text-lg border border-primary/30">{currency}{showPrice}</span>}
          </motion.div>
          
          {/* Animated star rating visual */}
          <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 }}} className='flex items-center gap-3'>
            <AnimatedStarsDecor rating={Math.round(show.movie.vote_average / 2)} />
            <span className='text-gray-300 text-sm'>{show.movie.vote_average.toFixed(1)} User Rating</span>
          </motion.div>
          
          <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 }}} className='text-gray-400 mt-2 text-sm leading-tight max-w-xl'>{show.movie.overview}</motion.p>
          
          {/* Info pills with icons */}
          <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 }}} className='flex flex-wrap items-center gap-3 mt-1'>
            <span className='flex items-center gap-1.5 text-sm bg-white/5 border border-white/10 px-3 py-1 rounded-full'>
              <Clock className='w-3.5 h-3.5 text-primary' />
              {timeFormat(show.movie.runtime)}
            </span>
            {show.movie.genres.map((genre, i) => (
              <span key={genre.id || i} className='text-sm bg-white/5 border border-white/10 px-3 py-1 rounded-full'>
                {genre.name}
              </span>
            ))}
            <span className='flex items-center gap-1.5 text-sm bg-white/5 border border-white/10 px-3 py-1 rounded-full'>
              <Calendar className='w-3.5 h-3.5 text-primary' />
              {show.movie.release_date.split("-")[0]}
            </span>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }}} className='flex items-center flex-wrap gap-4 mt-4'>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='flex items-center gap-2 px-7 py-3 text-sm bg-gray-800
            hover:bg-gray-900 transition rounded-md font-medium cursor-pointer'>
              <PlayCircleIcon className='w-5 h-5'/>
              Watch Trailer
              </motion.button>
            <motion.a whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(248, 69, 101, 0.3)' }} whileTap={{ scale: 0.95 }} href="#dateSelect" className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull
            transition rounded-md font-medium cursor-pointer shadow-lg shadow-primary/20'>Buy Tickets</motion.a>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleFavorite} className='bg-gray-700 p-2.5 rounded-full transition cursor-pointer'>
              <Heart className={`w-5 h-5 ${favoriteMovies.find(movie=>movie._id === id) ? 'fill-primary text-primary': ""}`}/>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Cast section with decorative line */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once:true }} className='relative z-10 mt-20'>
        <div className='flex items-center gap-3 mb-8'>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className='p-2 bg-white/5 border border-white/10 rounded-lg'
          >
            <Film className='w-4 h-4 text-primary' />
          </motion.div>
          <p className='text-lg font-medium'>Your Favorite Cast</p>
        </div>
      </motion.div>
      
      <div className='relative z-10 overflow-x-auto no-scrollbar pb-4'>
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once:true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 }}}}
            className='flex items-center gap-4 w-max px-4'>
            {show.movie.casts.slice(0,12).map((cast,index)=>(
              <motion.div 
                variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 }}} 
                whileHover={{ scale: 1.1, y: -5 }}
                key={index} 
                className='flex flex-col items-center text-center group'
              >
                <div className='relative'>
                  <div className='absolute -inset-0.5 bg-gradient-to-br from-primary/30 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-sm' />
                  <img src={image_base_url+cast.profile_path} alt="" className='relative rounded-full h-20
                  md:h-20 aspect-square object-cover ring-2 ring-transparent group-hover:ring-primary/30 transition-all'/>
                </div>
                <p className='font-medium text-xs mt-3 group-hover:text-primary transition-colors'>{cast.name}</p>
              </motion.div>
            ))}
          </motion.div>  
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className='relative z-10'>
        <DateSelect dateTime={show.dateTime} id={id}/>
      </motion.div>

      {/* You May Also Like section */}
      <div className='relative z-10'>
        <div className='flex items-center gap-3 mt-20 mb-8'>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className='h-6 w-1 bg-primary rounded-full origin-top'
          />
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className='text-lg font-medium'>You May Also Like</motion.p>
        </div>
        
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 }}}}
          className='flex flex-wrap max-sm:justify-center gap-8'>
          {shows.slice(0,4).map((movie,index)=>(
            <MovieCard key={index} movie={movie}/>
          ))}
        </motion.div>
      </div>

      <div className='relative z-10 flex justify-center mt-20'>
        <motion.button 
          onClick={()=>{navigate('/movies'); scrollTo(0,0)}} 
          whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(248, 69, 101, 0.3)' }}
          whileTap={{ scale: 0.95 }}
          className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull
          transition rounded-full font-medium cursor-pointer shadow-lg shadow-primary/20'
        >
          Show more
        </motion.button>
      </div>

    </div>
  ) : <Loading/>
}

export default MovieDetails