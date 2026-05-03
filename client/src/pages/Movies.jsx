import React from 'react'
import MovieCard from '../components/MovieCard'
import BlurCircle from '../components/BlurCircle'
import { useAppContext } from '../context/AppContext'
import FloatingParticles from '../components/FloatingParticles'
import { GlowingOrb, GridPattern, NeonText, SpotlightBeams } from '../components/CinemaGraphics'
import { motion } from 'framer-motion'
import { Film, SlidersHorizontal } from 'lucide-react'

const Movies = () => {

  const {shows}=useAppContext()

  return shows.length>0 ? (
    <div className='relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44
    overflow-hidden min-h-[80vh]'>

      <FloatingParticles count={15} />
      <GridPattern />

      <BlurCircle top='150px' left='0px'/>
      <BlurCircle bottom='50px' right='50px'/>

      {/* Glowing orbs */}
      <GlowingOrb color='purple' size={300} top='-50px' right='10%' delay={1} />
      <GlowingOrb color='blue' size={250} bottom='100px' left='5%' delay={3} />

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='relative z-10 flex items-center gap-4 mb-8'
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className='p-3 bg-primary/10 border border-primary/20 rounded-xl'
        >
          <Film className='w-6 h-6 text-primary' />
        </motion.div>
        <div>
          <h1 className='text-2xl md:text-3xl font-bold'>
            <NeonText>Now Showing</NeonText>
          </h1>
          <p className='text-sm text-gray-500 mt-0.5'>{shows.length} movies available</p>
        </div>
      </motion.div>

      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className='h-px bg-gradient-to-r from-primary/40 via-primary/10 to-transparent mb-8 origin-left'
      />

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
        className='relative z-10 flex flex-wrap max-sm:justify-center gap-8'
      >
        {shows.map((movie)=>(
          <MovieCard movie={movie} key={movie._id}/>
        ))}
      </motion.div>
    </div>
  ): (
    <div className='relative flex flex-col items-center justify-center h-screen overflow-hidden'>
      <FloatingParticles count={10} />
      
      {/* Empty state with cinema graphic */}
      <motion.svg
        width="120" height="120" viewBox="0 0 120 120" fill="none"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        <circle cx="60" cy="60" r="55" stroke="rgba(248,69,101,0.15)" strokeWidth="2" />
        <circle cx="60" cy="60" r="40" stroke="rgba(248,69,101,0.1)" strokeWidth="1.5" />
        <motion.circle 
          cx="60" cy="60" r="55" 
          stroke="rgba(248,69,101,0.3)" 
          strokeWidth="2" 
          strokeDasharray="345"
          animate={{ strokeDashoffset: [345, 0] }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
        <path d="M45 42v36l30-18-30-18z" fill="rgba(248,69,101,0.2)" stroke="rgba(248,69,101,0.4)" strokeWidth="1.5" strokeLinejoin="round" />
      </motion.svg>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className='text-3xl font-bold text-center mt-6'
      >
        No Movies Available
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className='text-gray-500 mt-2 text-center'
      >
        Check back soon for upcoming shows
      </motion.p>
    </div>
  )
}

export default Movies