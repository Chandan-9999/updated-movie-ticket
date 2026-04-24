import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import BlurCircle from '../components/BlurCircle'
import { dateFormat } from '../lib/dateFormat'
import timeFormat from '../lib/timeFormat'
import { useAppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  TicketIcon, Clock, Calendar, Armchair, X, 
  Film, Popcorn, ArrowRight, Timer, AlertTriangle 
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import './MyBookings.css'

// Countdown hook
const useCountdown = (targetDate) => {
  const [timeLeft, setTimeLeft] = useState(null)

  useEffect(() => {
    const calculate = () => {
      const now = new Date().getTime()
      const target = new Date(targetDate).getTime()
      const diff = target - now

      if (diff <= 0) return null

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

      return { days, hours, minutes, total: diff }
    }

    setTimeLeft(calculate())
    const interval = setInterval(() => setTimeLeft(calculate()), 60000)
    return () => clearInterval(interval)
  }, [targetDate])

  return timeLeft
}

// Countdown badge component
const CountdownBadge = ({ showDateTime }) => {
  const timeLeft = useCountdown(showDateTime)

  if (!timeLeft) {
    return (
      <span className='booking-status-badge past'>
        <Film className='w-3 h-3' /> Show Ended
      </span>
    )
  }

  const formatCountdown = () => {
    if (timeLeft.days > 0) return `${timeLeft.days}d ${timeLeft.hours}h`
    if (timeLeft.hours > 0) return `${timeLeft.hours}h ${timeLeft.minutes}m`
    return `${timeLeft.minutes}m`
  }

  const isUrgent = timeLeft.total < 2 * 60 * 60 * 1000 // < 2 hours

  return (
    <motion.span 
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      className={`booking-countdown ${isUrgent ? 'urgent' : ''}`}
    >
      <Timer className='w-3 h-3' />
      Starts in {formatCountdown()}
    </motion.span>
  )
}

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY || '₹'
  const navigate = useNavigate()
  const { axios, getToken, user, image_base_url } = useAppContext()

  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [cancellingId, setCancellingId] = useState(null)
  const [showCancelModal, setShowCancelModal] = useState(null)

  const getMyBookings = async () => {
    try {
      const { data } = await axios.get('/api/user/bookings', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      if (data.success) {
        setBookings(data.bookings)
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  const handleCancelBooking = async (bookingId) => {
    setCancellingId(bookingId)
    // Simulate cancel (dummy) 
    await new Promise(resolve => setTimeout(resolve, 1500))
    setBookings(prev => prev.filter(b => b._id !== bookingId))
    setCancellingId(null)
    setShowCancelModal(null)
    toast.success('Booking cancelled successfully')
  }

  const isUpcoming = (dateStr) => new Date(dateStr).getTime() > Date.now()

  const upcomingBookings = bookings.filter(b => isUpcoming(b.show?.showDateTime))
  const pastBookings = bookings.filter(b => !isUpcoming(b.show?.showDateTime))

  useEffect(() => {
    if (user) {
      getMyBookings()
    }
  }, [user])

  return !isLoading ? (
    <div className='bookings-page'>
      <BlurCircle top='100px' left='100px' />
      <BlurCircle bottom='0px' right='200px' />

      {/* Header */}
      <div className='bookings-header'>
        <div>
          <h1 className='text-2xl font-bold'>My Bookings</h1>
          {bookings.length > 0 && (
            <p className='text-gray-500 text-sm mt-1'>
              {upcomingBookings.length} upcoming • {pastBookings.length} past
            </p>
          )}
        </div>
      </div>

      {/* Empty State */}
      {bookings.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='bookings-empty'
        >
          <div className='bookings-empty-icon'>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            >
              <Popcorn className='w-16 h-16 text-primary/60' />
            </motion.div>
          </div>
          <h2 className='text-xl font-bold mt-6'>No bookings yet!</h2>
          <p className='text-gray-500 text-sm mt-2 max-w-sm text-center'>
            Your movie journey starts here. Browse our latest collection 
            and book tickets for an amazing cinema experience.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { navigate('/movies'); scrollTo(0, 0) }}
            className='bookings-empty-btn'
          >
            <Film className='w-4 h-4' />
            Browse Movies
            <ArrowRight className='w-4 h-4' />
          </motion.button>

          <div className='bookings-empty-features'>
            {[
              { icon: '🎬', text: 'Latest blockbusters' },
              { icon: '💺', text: 'Choose your seats' },
              { icon: '🎫', text: 'Instant e-tickets' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className='bookings-empty-feature'
              >
                <span className='text-lg'>{feature.icon}</span>
                <span className='text-xs text-gray-500'>{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Upcoming Bookings */}
      {upcomingBookings.length > 0 && (
        <div className='bookings-section'>
          <p className='bookings-section-title'>
            <span className='bookings-section-dot upcoming' />
            Upcoming Shows
          </p>
          {upcomingBookings.map((item, index) => (
            <motion.div
              key={item._id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className='booking-card'
            >
              {/* Movie Poster */}
              <div className='booking-card-poster'>
                <img 
                  src={image_base_url + item.show.movie.poster_path} 
                  alt={item.show.movie.title} 
                />
                <div className='booking-card-poster-overlay'>
                  <CountdownBadge showDateTime={item.show.showDateTime} />
                </div>
              </div>

              {/* Info */}
              <div className='booking-card-info'>
                <div className='booking-card-top'>
                  <h3 className='booking-card-title'>{item.show.movie.title}</h3>
                  <div className='booking-card-meta'>
                    <span><Calendar className='w-3.5 h-3.5' /> {dateFormat(item.show.showDateTime)}</span>
                    <span><Clock className='w-3.5 h-3.5' /> {timeFormat(item.show.movie.runtime)}</span>
                  </div>
                </div>

                <div className='booking-card-details'>
                  <div className='booking-card-detail'>
                    <span className='booking-card-detail-label'>Seats</span>
                    <div className='booking-card-seats'>
                      {item.bookedSeats.map(seat => (
                        <span key={seat} className='booking-seat-chip'>{seat}</span>
                      ))}
                    </div>
                  </div>
                  <div className='booking-card-detail'>
                    <span className='booking-card-detail-label'>Amount</span>
                    <span className='booking-card-amount'>{currency}{item.amount}</span>
                  </div>
                </div>

                <div className='booking-card-actions'>
                  <span className='booking-status-badge confirmed'>
                    ✓ Confirmed
                  </span>
                  <div className='booking-card-btns'>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowCancelModal(item._id)}
                      className='booking-cancel-btn'
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        navigate('/e-ticket', { state: { booking: item } })
                        scrollTo(0, 0)
                      }}
                      className='booking-ticket-btn'
                    >
                      <TicketIcon className='w-4 h-4' />
                      View E-Ticket
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Past Bookings */}
      {pastBookings.length > 0 && (
        <div className='bookings-section'>
          <p className='bookings-section-title'>
            <span className='bookings-section-dot past' />
            Past Shows
          </p>
          {pastBookings.map((item, index) => (
            <motion.div
              key={item._id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className='booking-card past'
            >
              <div className='booking-card-poster'>
                <img 
                  src={image_base_url + item.show.movie.poster_path} 
                  alt={item.show.movie.title} 
                />
              </div>

              <div className='booking-card-info'>
                <div className='booking-card-top'>
                  <h3 className='booking-card-title'>{item.show.movie.title}</h3>
                  <div className='booking-card-meta'>
                    <span><Calendar className='w-3.5 h-3.5' /> {dateFormat(item.show.showDateTime)}</span>
                  </div>
                </div>

                <div className='booking-card-details'>
                  <div className='booking-card-detail'>
                    <span className='booking-card-detail-label'>Seats</span>
                    <span className='text-sm'>{item.bookedSeats.join(', ')}</span>
                  </div>
                  <div className='booking-card-detail'>
                    <span className='booking-card-detail-label'>Amount</span>
                    <span className='booking-card-amount'>{currency}{item.amount}</span>
                  </div>
                </div>

                <div className='booking-card-actions'>
                  <span className='booking-status-badge past'>
                    <Film className='w-3 h-3' /> Completed
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      navigate('/e-ticket', { state: { booking: item } })
                      scrollTo(0, 0)
                    }}
                    className='booking-ticket-btn'
                  >
                    <TicketIcon className='w-4 h-4' />
                    View E-Ticket
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      <AnimatePresence>
        {showCancelModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='cancel-modal-overlay'
            onClick={() => setShowCancelModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className='cancel-modal'
              onClick={e => e.stopPropagation()}
            >
              <div className='cancel-modal-icon'>
                <AlertTriangle className='w-10 h-10 text-amber-400' />
              </div>
              <h3 className='text-lg font-bold mt-4'>Cancel Booking?</h3>
              <p className='text-sm text-gray-400 mt-2 text-center max-w-xs'>
                Are you sure you want to cancel this booking? 
                This action cannot be undone.
              </p>
              <div className='cancel-modal-btns'>
                <button
                  onClick={() => setShowCancelModal(null)}
                  className='cancel-modal-btn secondary'
                >
                  Keep Booking
                </button>
                <button
                  onClick={() => handleCancelBooking(showCancelModal)}
                  disabled={cancellingId === showCancelModal}
                  className='cancel-modal-btn danger'
                >
                  {cancellingId === showCancelModal ? 'Cancelling...' : 'Yes, Cancel'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  ) : <Loading />
}

export default MyBookings