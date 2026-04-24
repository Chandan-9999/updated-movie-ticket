import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import Title from '../../components/admin/Title'
import { CheckIcon, PlusIcon, StarIcon, XIcon, ClockIcon, FilmIcon, CalendarIcon } from 'lucide-react'
import { kConverter } from '../../lib/kConverter'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import BlurCircle from '../../components/BlurCircle'

const AddShows = () => {

  const {axios, getToken, user, image_base_url} = useAppContext()
  const currency = import.meta.env.VITE_CURRENCY || '₹'
  
  const [nowPlayingMovies, setNowPlayingMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [dateTimeSelection, setDateTimeSelection] = useState({})
  const [dateInput, setDateInput] = useState("");
  const [timeInput, setTimeInput] = useState("");
  const [showPrice, setShowPrice] = useState("")
  const [addingShow, setAddingShow] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchNowPlayingMovies = async () => {
    try {
      const {data} = await axios.get('/api/show/now-playing',{
        headers:{Authorization:`Bearer ${await getToken()}`}})
        if(data.success){
          setNowPlayingMovies(data.movies)
        }
    } catch (error) {
      toast.error('Error fetching Movies')
    } finally {
      setLoading(false)
    }
  }

  const addTimeToSelection = (date, time) => {
    setDateTimeSelection((prev) => {
      const times = prev[date] || [];
      if(!times.includes(time)){
        return { ...prev, [date]: [...times, time].sort()}
      }
      toast.error(`Time ${time} is already added for this date`)
      return prev;
    })
  }

  const handleDateTimeAdd = () => {
    if(!dateInput || !timeInput) {
        return toast.error("Please select a valid date and time")
    }
    addTimeToSelection(dateInput, timeInput)
    setTimeInput("") // clear time after adding, keep date
  }

  const handleQuickAdd = (time) => {
    if(!dateInput) {
        return toast.error("Please select a date first")
    }
    addTimeToSelection(dateInput, time)
  }

  const handleRemoveTime = (date, time) => {
    setDateTimeSelection((prev) => {
      const filteredTimes = prev[date].filter((t) => t !== time);
      if (filteredTimes.length === 0) {
        const {[date]: _, ...rest} = prev;
        return rest
      }
      return { ...prev, [date]: filteredTimes }
    })
  }

  const handleSubmit = async () => {
    try {
      if(!selectedMovie) return toast.error('Please select a movie first')
      if(Object.keys(dateTimeSelection).length === 0) return toast.error('Please add at least one showtime')
      if(!showPrice || Number(showPrice) <= 0) return toast.error('Please enter a valid show price')
      
      setAddingShow(true)

      const showsInput = Object.entries(dateTimeSelection).map(([date, time]) => 
        ({date, time})
      );

      const payload = {
        movieId: selectedMovie,
        showsInput,
        showPrice: Number(showPrice)
      }

      const {data} = await axios.post('/api/show/add', payload, {headers:{
        Authorization:`Bearer ${await getToken()}`}})

        if(data.success){
          toast.success(data.message)
          setSelectedMovie(null)
          setDateTimeSelection({})
          setShowPrice("")
        } else {
          toast.error(data.message)
        }
    } catch (error) {
      toast.error("An error occurred. Please try again")
    } finally {
      setAddingShow(false)
    }
  }

  useEffect(() => {
    if(user){
      fetchNowPlayingMovies();
    }
  }, [user])

  if (loading) return <Loading/>

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="pb-20 relative"
    >
      <BlurCircle top='-10%' left='80%'/>
      <Title text1="Add New" text2="Shows"/>
      
      <div className="bg-black/30 border border-primary/20 rounded-2xl p-6 mt-8 shadow-xl backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
              <FilmIcon className="w-5 h-5 text-primary" />
              <h2 className='text-xl font-bold text-white'>Select Movie</h2>
          </div>
          
          {nowPlayingMovies.length > 0 ? (
              <div className='flex gap-4 overflow-x-auto pb-6 no-scrollbar snap-x'>
                {nowPlayingMovies.map((movie, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={movie.id} 
                    onClick={() => setSelectedMovie(movie.id)}
                    className={`relative min-w-[160px] max-w-[160px] snap-start rounded-xl cursor-pointer transition-all duration-300 group
                      ${selectedMovie === movie.id ? 'ring-4 ring-primary shadow-[0_0_20px_rgba(248,69,101,0.4)] scale-[1.02]' : 'hover:scale-[1.02] opacity-80 hover:opacity-100'}
                    `}
                  >
                      <div className='relative rounded-xl overflow-hidden aspect-[2/3] bg-gray-900'>
                        <img 
                            src={image_base_url + movie.poster_path} 
                            alt={movie.title} 
                            className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                        
                        <div className='absolute bottom-0 left-0 w-full p-3 flex justify-between items-center text-xs'>
                            <p className='flex items-center gap-1 text-yellow-500 font-bold'>
                                <StarIcon className='w-3 h-3 fill-yellow-500'/>
                                {movie.vote_average?.toFixed(1)}
                            </p>
                            <p className='text-gray-300'>{kConverter(movie.vote_count)}</p>
                        </div>

                        <AnimatePresence>
                            {selectedMovie === movie.id && (
                                <motion.div 
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className='absolute top-3 right-3 bg-primary text-white p-1.5 rounded-full shadow-lg'
                                >
                                    <CheckIcon className='w-4 h-4' strokeWidth={3}/>
                                </motion.div>
                            )}
                        </AnimatePresence>
                      </div>
                      <div className="mt-2 px-1">
                          <p className='font-bold text-sm text-white truncate' title={movie.title}>{movie.title}</p>
                          <p className='text-gray-500 text-xs mt-0.5'>{movie.release_date?.split('-')[0]}</p>
                      </div>
                    </motion.div>
                ))}
              </div>
          ) : (
              <div className="py-10 text-center bg-white/5 rounded-xl border border-white/10">
                  <FilmIcon className="w-10 h-10 text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-400">No playing movies found. Ensure TMDB API is configured.</p>
              </div>
          )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Settings Card */}
          <div className="bg-black/30 border border-primary/20 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                  <CalendarIcon className="w-5 h-5 text-primary" />
                  <h2 className='text-xl font-bold text-white'>Show Details</h2>
              </div>

              {/* Price Input */}
              <div className='mb-8'>
                  <label className='block text-sm font-semibold text-gray-300 mb-3'>Ticket Price (per seat)</label>
                  <div className='flex items-center bg-white/5 border border-white/10 rounded-xl overflow-hidden focus-within:border-primary/50 transition-colors'>
                      <div className="bg-white/5 px-4 py-3 border-r border-white/10 flex items-center justify-center">
                          <p className='text-gray-400 font-bold'>{currency}</p>
                      </div>
                      <input 
                          type="number" 
                          min={0} 
                          value={showPrice} 
                          onChange={(e) => setShowPrice(e.target.value)} 
                          placeholder='e.g. 15.00' 
                          className='flex-1 bg-transparent px-4 py-3 text-white outline-none placeholder-gray-600'
                      />
                  </div>
              </div>

              {/* Date & time selection */}
              <div>
                  <label className='block text-sm font-semibold text-gray-300 mb-3'>Add Showtime</label>
                  
                  <div className='flex flex-col sm:flex-row gap-3 mb-3'>
                      <div className='flex-1 bg-white/5 border border-white/10 rounded-xl overflow-hidden focus-within:border-primary/50 transition-colors'>
                          <input 
                              type="date"  
                              value={dateInput} 
                              onChange={(e) => setDateInput(e.target.value)}
                              className='w-full bg-transparent px-4 py-3 text-white outline-none color-scheme-dark'
                              style={{ colorScheme: 'dark' }}
                          />
                      </div>
                      <div className='flex-1 bg-white/5 border border-white/10 rounded-xl overflow-hidden focus-within:border-primary/50 transition-colors'>
                          <input 
                              type="time"  
                              value={timeInput} 
                              onChange={(e) => setTimeInput(e.target.value)}
                              className='w-full bg-transparent px-4 py-3 text-white outline-none color-scheme-dark'
                              style={{ colorScheme: 'dark' }}
                          />
                      </div>
                      <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleDateTimeAdd} 
                          className='bg-primary text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary-dull transition-colors'
                      >
                          <PlusIcon className="w-4 h-4" />
                          Add Time
                      </motion.button>
                  </div>

                  {/* Quick-add chips */}
                  {dateInput && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }} 
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3"
                      >
                          <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider">Quick Add (for {dateInput})</p>
                          <div className="flex flex-wrap gap-2">
                              {['09:00', '12:00', '15:00', '18:00', '21:00'].map(t => (
                                  <button 
                                      key={t}
                                      onClick={() => handleQuickAdd(t)}
                                      className="px-3 py-1.5 bg-white/5 hover:bg-primary/20 hover:text-primary border border-white/10 hover:border-primary/30 rounded-lg text-sm text-gray-300 transition-all cursor-pointer"
                                  >
                                      {t}
                                  </button>
                              ))}
                          </div>
                      </motion.div>
                  )}
              </div>
          </div>

          {/* Schedule Preview Card */}
          <div className="bg-black/30 border border-primary/20 rounded-2xl p-6 shadow-xl backdrop-blur-sm flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                  <ClockIcon className="w-5 h-5 text-primary" />
                  <h2 className='text-xl font-bold text-white'>Schedule Preview</h2>
              </div>

              {Object.keys(dateTimeSelection).length > 0 ? (
                  <div className='flex-1 overflow-y-auto pr-2 custom-scrollbar'>
                      <ul className='space-y-4'>
                          <AnimatePresence>
                              {Object.entries(dateTimeSelection).map(([date, times]) => (
                                  <motion.li 
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      exit={{ opacity: 0, scale: 0.95 }}
                                      key={date} 
                                      className="bg-white/5 border border-white/10 rounded-xl p-4"
                                  >
                                      <div className='font-bold text-primary mb-3 pb-2 border-b border-white/5 flex items-center gap-2'>
                                          <CalendarIcon className="w-4 h-4" />
                                          {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                      </div>
                                      <div className='flex flex-wrap gap-2 mt-1'>
                                          <AnimatePresence>
                                              {times.map((time) => (
                                                  <motion.div 
                                                      initial={{ scale: 0 }}
                                                      animate={{ scale: 1 }}
                                                      exit={{ scale: 0 }}
                                                      key={time} 
                                                      className='bg-primary/10 border border-primary/30 px-3 py-1.5 flex items-center gap-2 rounded-lg group'
                                                  >
                                                      <span className="text-sm font-medium text-white">{time}</span>
                                                      <button 
                                                          onClick={() => handleRemoveTime(date, time)} 
                                                          className='text-gray-400 hover:text-red-500 bg-black/20 hover:bg-red-500/20 p-1 rounded-md transition-colors'
                                                      >
                                                          <XIcon className="w-3 h-3" />
                                                      </button>
                                                  </motion.div>
                                              ))}
                                          </AnimatePresence>
                                      </div>
                                  </motion.li>
                              ))}
                          </AnimatePresence>
                      </ul>
                  </div>
              ) : (
                  <div className="flex-1 flex flex-col items-center justify-center opacity-50 py-10">
                      <ClockIcon className="w-16 h-16 mb-4 text-gray-600" />
                      <p className="text-center text-gray-400">No showtimes added yet.<br/>Select a date and time to build the schedule.</p>
                  </div>
              )}
          </div>
      </div>

      <div className="mt-8 flex justify-end">
          <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit} 
              disabled={addingShow} 
              className={`
                  bg-gradient-to-r from-primary to-primary-dull text-white px-10 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-primary/30
                  ${addingShow ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-primary/50'}
              `}
          >
              {addingShow ? 'Publishing Schedule...' : 'Publish Shows to Platform'}
          </motion.button>
      </div>
    </motion.div>
  )
} 

export default AddShows