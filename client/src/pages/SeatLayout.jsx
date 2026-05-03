import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { assets } from '../assets/assets'
import Loading from '../components/Loading'
import {ArrowRightIcon, ClockIcon, Info, Film, Ticket, Star} from 'lucide-react'
import isoTimeFormat from '../lib/isoTimeFormat'
import BlurCircle from '../components/BlurCircle'
import {toast} from 'react-hot-toast'
import { useAppContext } from '../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'
import { CeilingLights, WallSconce, TheaterCurtains, ProjectorBeam, ExitSign, AisleLights, TheaterFloor } from '../components/TheaterGraphics'
import FloatingParticles from '../components/FloatingParticles'
import './SeatLayout.css'

const SeatLayout = () => {

  const groupRows=[["A","B"],["C","D"],["E","F"],["G","H"],["I","J"]]

  const {id,date}=useParams()
  const [selectedSeats,setSelectedSeats] = useState([])
  const [selectedTime,setSelectedTime] = useState(null)
  const [show,setShow] = useState(null)
  const [occupiedSeats,setOccupiedSeats]=useState([])

  const navigate=useNavigate()
  const currency = import.meta.env.VITE_CURRENCY || '₹'

  const {axios,getToken,user,detailedShows,image_base_url}=useAppContext()

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

  // Get ticket price with fallbacks
  const getTicketPrice = () => {
    if (selectedTime?.showPrice) return selectedTime.showPrice
    if (show?.dateTime?.[date]) {
      const slot = show.dateTime[date].find(s => s.showId === selectedTime?.showId)
      if (slot?.showPrice) return slot.showPrice
    }
    if (detailedShows?.length) {
      const match = detailedShows.find(s => s._id === selectedTime?.showId)
      if (match?.showPrice) return match.showPrice
      const any = detailedShows.find(s => (s.movie?._id || s.movie) === id)
      if (any?.showPrice) return any.showPrice
    }
    return 0
  }

  const ticketPrice = getTicketPrice()
  const totalPrice = ticketPrice * selectedSeats.length

  const handleSeatClick=(seatId)=>{
    if(!selectedTime) {
      return toast("Please select a showtime first")
    }
    if(!selectedSeats.includes(seatId) && selectedSeats.length > 4){
      return toast("Maximum 5 seats per booking")
    }
    if(occupiedSeats.includes(seatId)){
      return toast('This seat is already booked')
    }
    setSelectedSeats(prev => prev.includes(seatId) ? prev.filter(seat => seat!== seatId) : [...prev,seatId])
  }

  const getSeatStatus = (seatId) => {
    if (occupiedSeats.includes(seatId)) return 'occupied'
    if (selectedSeats.includes(seatId)) return 'selected'
    return 'available'
  }

  const renderSeats = (row, count = 9) => (
    <div key={row} className='flex items-center gap-1.5 mt-1.5'>
      {/* Row label */}
      <span className='w-5 text-[10px] font-semibold text-gray-500 text-right mr-1'>{row}</span>
      <div className='flex items-center gap-1.5'>
        {Array.from({length: count}, (_, i) => {
          const seatId = `${row}${i + 1}`
          const status = getSeatStatus(seatId)

          return (
            <motion.button
              key={seatId}
              onClick={() => handleSeatClick(seatId)}
              whileHover={status !== 'occupied' ? { scale: 1.15, y: -2 } : {}}
              whileTap={status !== 'occupied' ? { scale: 0.9 } : {}}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className={`seat-btn ${status}`}
              disabled={status === 'occupied'}
              title={status === 'occupied' ? 'Already booked' : seatId}
            >
              <span className='seat-label'>{i + 1}</span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )

  const getOccupiedSeats=async ()=>{
    try {
      const {data} = await axios.get(`/api/booking/seats/${selectedTime.showId}`)
      if(data.success){
        setOccupiedSeats(data.occupiedSeats)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  const proceedToPayment = ()=>{
    if(!user) return toast.error('Please Login to proceed')
    if(!selectedTime || !selectedSeats.length) return toast.error('Please Select a time and seats')

    navigate('/payment', {
      state: {
        showId: selectedTime.showId,
        selectedSeats,
        movieTitle: show.movie?.title || 'Movie',
        showPrice: ticketPrice,
        showDateTime: selectedTime.time,
        moviePoster: show.movie?.backdrop_path || show.movie?.poster_path || '',
        image_base_url: 'https://image.tmdb.org/t/p/original'
      }
    })
    scrollTo(0,0)
  }

  useEffect(()=>{
    getShow()
  },[])

  useEffect(()=>{
    if(selectedTime){
      getOccupiedSeats()
    }
  },[selectedTime])

  return show ? (
    <div className='seat-layout-page'>

      {/* ═══ Theater Ambiance Graphics ═══ */}
      <TheaterCurtains />
      <CeilingLights count={7} />
      <WallSconce side='left' />
      <WallSconce side='right' />
      <ProjectorBeam />
      <ExitSign side='left' />
      <ExitSign side='right' />
      <AisleLights />
      <TheaterFloor />
      <FloatingParticles count={8} />

      {/* Left Sidebar — Timings */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className='seat-sidebar'
        style={{ zIndex: 10 }}
      >
        <div className='seat-sidebar-inner'>
          {/* Movie poster thumbnail */}
          {show.movie && (
            <div className='seat-sidebar-poster'>
              <img 
                src={`${image_base_url}${show.movie.backdrop_path || show.movie.poster_path}`}
                alt={show.movie.title}
                className='w-full h-28 object-cover rounded-t-2xl'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent rounded-t-2xl' />
              {/* Rating badge */}
              {show.movie.vote_average && (
                <div className='absolute top-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full'>
                  <Star className='w-3 h-3 text-primary fill-primary' />
                  <span className='text-[10px] font-bold'>{show.movie.vote_average?.toFixed(1)}</span>
                </div>
              )}
            </div>
          )}

          <p className='text-base font-semibold px-5 mt-3 mb-1'>Showtimes</p>
          <p className='text-xs text-gray-500 px-5 mb-4'>
            {new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </p>
          <div className='space-y-1'>
            {show.dateTime[date].map((item) => (
              <motion.div 
                key={item.time} 
                onClick={() => setSelectedTime(item)} 
                whileHover={{ x: 4 }}
                className={`seat-time-slot ${selectedTime?.time === item.time ? 'active' : ''}`}
              >
                <ClockIcon className='w-3.5 h-3.5' />
                <span className='text-sm font-medium'>{isoTimeFormat(item.time)}</span>
              </motion.div>
            ))}
          </div>

          {/* Movie info mini card */}
          {show.movie && (
            <div className='seat-movie-info'>
              <div className='flex items-center gap-2 mb-2'>
                <Film className='w-3.5 h-3.5 text-primary' />
                <p className='text-sm font-semibold text-white truncate'>{show.movie.title}</p>
              </div>
              <p className='text-xs text-gray-500'>
                {show.movie.genres?.slice(0, 2).map(g => g.name).join(' • ')}
              </p>
              {ticketPrice > 0 && (
                <div className='flex items-center gap-1.5 mt-2'>
                  <Ticket className='w-3 h-3 text-primary' />
                  <p className='text-xs text-primary font-semibold'>
                    {currency}{ticketPrice} per ticket
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* Main — Seat Map */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className='seat-main'
        style={{ zIndex: 10 }}
      >
        <BlurCircle top='-100px' left='-100px' />

        {/* Title with 3D effect */}
        <motion.div 
          className='text-center mb-6'
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className='text-xl font-bold seat-title-3d'>Select Your Seats</h1>
          <p className='text-[11px] text-gray-500 mt-1'>Choose up to 5 seats for your experience</p>
        </motion.div>

        {/* Screen - Enhanced 3D */}
        <div className='seat-screen-wrapper perspective-[600px]'>
          <motion.div
            initial={{ rotateX: 30, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className='seat-screen'>
              <div className='seat-screen-glow' />
            </div>
            {/* 3D Screen reflection */}
            <div className='seat-screen-reflection' />
          </motion.div>
          <p className='text-[10px] text-gray-500 uppercase tracking-[3px] mt-3 text-center'>
            Screen This Way
          </p>
        </div>

        {/* Color Legend */}
        <div className='seat-legend'>
          <div className='seat-legend-item'>
            <div className='seat-legend-box available' />
            <span>Available</span>
          </div>
          <div className='seat-legend-item'>
            <div className='seat-legend-box selected' />
            <span>Selected</span>
          </div>
          <div className='seat-legend-item'>
            <div className='seat-legend-box occupied' />
            <span>Occupied</span>
          </div>
        </div>

        {/* Seat Grid */}
        <div className='seat-grid'>
          {/* Premium rows A-B */}
          <div className='seat-section'>
            <span className='seat-section-label seat-label-premium'>
              <Star className='w-3 h-3 inline mr-1' />
              Premium
            </span>
            <div className='seat-section-rows'>
              {groupRows[0].map(row => renderSeats(row))}
            </div>
          </div>

          <div className='seat-aisle'>
            <div className='seat-aisle-line' />
          </div>

          {/* Standard rows — left & right blocks */}
          <div className='seat-section'>
            <span className='seat-section-label'>Standard</span>
            <div className='grid grid-cols-2 gap-8 md:gap-12'>
              {groupRows.slice(1).map((group, idx) => (
                <div key={idx} className='seat-section-rows'>
                  {group.map(row => renderSeats(row))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Seat count indicator */}
        {selectedSeats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className='seat-count-badge'
          >
            <Info className='w-3.5 h-3.5' />
            {selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''} selected: {selectedSeats.join(', ')}
          </motion.div>
        )}
      </motion.div>

      {/* Bottom Floating Price Bar */}
      <AnimatePresence>
        {selectedSeats.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className='seat-price-bar'
          >
            <div className='seat-price-bar-inner'>
              <div className='seat-price-left'>
                <div className='seat-price-seats'>
                  {selectedSeats.map(seat => (
                    <motion.span 
                      key={seat} 
                      className='seat-price-chip'
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500 }}
                    >
                      {seat}
                    </motion.span>
                  ))}
                </div>
                <div className='seat-price-calc'>
                  <span className='text-gray-400 text-sm'>
                    {selectedSeats.length} × {currency}{ticketPrice}
                  </span>
                </div>
              </div>

              <div className='seat-price-right'>
                <div className='seat-price-total'>
                  <span className='text-xs text-gray-400'>Total</span>
                  <span className='text-2xl font-bold text-white'>{currency}{totalPrice}</span>
                </div>
                <motion.button
                  onClick={proceedToPayment}
                  whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(248, 69, 101, 0.35)' }}
                  whileTap={{ scale: 0.97 }}
                  className='seat-price-btn'
                >
                  Proceed to Pay
                  <ArrowRightIcon strokeWidth={2.5} className='w-4 h-4' />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  ):(
    <Loading/>
  )
}

export default SeatLayout