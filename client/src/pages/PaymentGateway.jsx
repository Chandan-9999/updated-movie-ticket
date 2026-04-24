import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import {
  CreditCard, Smartphone, ShieldCheck, Lock, CheckCircle2,
  ArrowLeft, Loader2, ChevronRight, Ticket, Clock
} from 'lucide-react'
import BlurCircle from '../components/BlurCircle'
import { useAppContext } from '../context/AppContext'
import { dateFormat } from '../lib/dateFormat'
import { toast } from 'react-hot-toast'
import './PaymentGateway.css'

const PaymentGateway = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { axios, getToken, user } = useAppContext()
  const currency = import.meta.env.VITE_CURRENCY || '₹'

  // Payment data passed from seat selection
  const paymentData = location.state
  const [activeTab, setActiveTab] = useState('card')
  const [processing, setProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [countdown, setCountdown] = useState(3)

  // Card form state
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [cardFlipped, setCardFlipped] = useState(false)

  // QR payment state
  const [qrScanned, setQrScanned] = useState(false)

  // Redirect if no payment data
  if (!paymentData) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[80vh] pt-30'>
        <p className='text-gray-400 text-lg'>No payment data found.</p>
        <button onClick={() => navigate('/movies')} className='mt-4 bg-primary px-6 py-2 rounded-full cursor-pointer'>
          Browse Movies
        </button>
      </div>
    )
  }

  const { showId, selectedSeats, movieTitle, showPrice, showDateTime, moviePoster, image_base_url } = paymentData
  const totalAmount = showPrice * selectedSeats.length

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\D/g, '').substring(0, 16)
    const parts = []
    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substring(i, i + 4))
    }
    return parts.join(' ')
  }

  // Format expiry with /
  const formatExpiry = (value) => {
    const v = value.replace(/\D/g, '').substring(0, 4)
    if (v.length > 2) return v.substring(0, 2) + '/' + v.substring(2)
    return v
  }

  // Detect card type
  const getCardType = () => {
    const num = cardNumber.replace(/\s/g, '')
    if (num.startsWith('4')) return 'visa'
    if (/^5[1-5]/.test(num) || /^2[2-7]/.test(num)) return 'mastercard'
    if (num.startsWith('6')) return 'rupay'
    return null
  }

  // Process dummy payment
  const processPayment = async () => {
    // Basic validation
    if (activeTab === 'card') {
      if (cardNumber.replace(/\s/g, '').length < 16) return toast.error('Enter a valid 16-digit card number')
      if (!cardName.trim()) return toast.error('Enter the cardholder name')
      if (expiry.length < 5) return toast.error('Enter a valid expiry date')
      if (cvv.length < 3) return toast.error('Enter a valid CVV')
    }

    setProcessing(true)

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2500))

    try {
      // Actually create the booking on the server
      const { data } = await axios.post('/api/booking/create', {
        showId,
        selectedSeats
      }, { headers: { Authorization: `Bearer ${await getToken()}` } })

      if (data.success) {
        setProcessing(false)
        setPaymentSuccess(true)
      } else {
        setProcessing(false)
        toast.error(data.message || 'Booking failed')
      }
    } catch (error) {
      setProcessing(false)
      toast.error(error.message || 'Payment failed')
    }
  }

  // QR payment simulation
  const simulateQrPayment = async () => {
    setQrScanned(true)
    setProcessing(true)

    await new Promise(resolve => setTimeout(resolve, 3000))

    try {
      const { data } = await axios.post('/api/booking/create', {
        showId,
        selectedSeats
      }, { headers: { Authorization: `Bearer ${await getToken()}` } })

      if (data.success) {
        setProcessing(false)
        setPaymentSuccess(true)
      } else {
        setProcessing(false)
        toast.error(data.message || 'Booking failed')
      }
    } catch (error) {
      setProcessing(false)
      toast.error(error.message || 'Payment failed')
    }
  }

  // Countdown redirect after success
  useEffect(() => {
    if (paymentSuccess && countdown > 0) {
      const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000)
      return () => clearTimeout(timer)
    }
    if (paymentSuccess && countdown === 0) {
      navigate('/my-bookings')
      scrollTo(0, 0)
    }
  }, [paymentSuccess, countdown, navigate])

  const cardType = getCardType()

  return (
    <div className='payment-page'>
      <BlurCircle top='100px' left='-50px' />
      <BlurCircle bottom='50px' right='-50px' />

      {/* Processing Overlay */}
      <AnimatePresence>
        {processing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='payment-processing-overlay'
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className='payment-processing-card'
            >
              <div className='payment-processing-spinner'>
                <Loader2 className='w-10 h-10 text-primary animate-spin' />
              </div>
              <h3>Processing Payment</h3>
              <p>Please wait while we confirm your payment...</p>
              <div className='payment-processing-dots'>
                <span /><span /><span />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Overlay */}
      <AnimatePresence>
        {paymentSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='payment-processing-overlay'
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className='payment-success-card'
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                className='payment-success-icon'
              >
                <CheckCircle2 className='w-16 h-16 text-green-400' />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Payment Successful!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className='payment-success-amount'
              >
                {currency}{totalAmount} paid
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className='payment-success-details'
              >
                <p>{movieTitle}</p>
                <p className='text-gray-400 text-sm'>{selectedSeats.length} ticket(s) • Seats: {selectedSeats.join(', ')}</p>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className='payment-success-redirect'
              >
                Redirecting to My Bookings in {countdown}s...
              </motion.p>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { navigate('/my-bookings'); scrollTo(0, 0) }}
                className='payment-success-btn'
              >
                View My Bookings
                <ChevronRight className='w-4 h-4' />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className='payment-container'>
        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          whileHover={{ x: -3 }}
          className='payment-back-btn'
        >
          <ArrowLeft className='w-4 h-4' /> Back to Seats
        </motion.button>

        <div className='payment-grid'>
          {/* Left: Payment Form */}
          <div className='payment-form-section'>
            <div className='payment-form-header'>
              <Lock className='w-5 h-5 text-primary' />
              <h1>Secure Payment</h1>
            </div>

            {/* Payment Method Tabs */}
            <div className='payment-tabs'>
              <button
                className={`payment-tab ${activeTab === 'card' ? 'active' : ''}`}
                onClick={() => setActiveTab('card')}
              >
                <CreditCard className='w-4 h-4' />
                Card Payment
              </button>
              <button
                className={`payment-tab ${activeTab === 'upi' ? 'active' : ''}`}
                onClick={() => setActiveTab('upi')}
              >
                <Smartphone className='w-4 h-4' />
                UPI / QR Pay
              </button>
            </div>

            <AnimatePresence mode='wait'>
              {activeTab === 'card' ? (
                <motion.div
                  key='card'
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className='payment-card-form'
                >
                  {/* Interactive Card Preview */}
                  <div className={`card-preview ${cardFlipped ? 'flipped' : ''}`}>
                    <div className='card-preview-front'>
                      <div className='card-preview-top'>
                        <div className='card-chip' />
                        <span className='card-type'>
                          {cardType === 'visa' ? 'VISA' : cardType === 'mastercard' ? 'MasterCard' : cardType === 'rupay' ? 'RuPay' : ''}
                        </span>
                      </div>
                      <p className='card-preview-number'>
                        {cardNumber || '•••• •••• •••• ••••'}
                      </p>
                      <div className='card-preview-bottom'>
                        <div>
                          <span className='card-preview-label'>Card Holder</span>
                          <p className='card-preview-value'>{cardName || 'YOUR NAME'}</p>
                        </div>
                        <div>
                          <span className='card-preview-label'>Expires</span>
                          <p className='card-preview-value'>{expiry || 'MM/YY'}</p>
                        </div>
                      </div>
                    </div>
                    <div className='card-preview-back'>
                      <div className='card-magnetic-strip' />
                      <div className='card-cvv-section'>
                        <span className='card-preview-label'>CVV</span>
                        <div className='card-cvv-display'>{cvv || '•••'}</div>
                      </div>
                    </div>
                  </div>

                  {/* Card Form Fields */}
                  <div className='payment-field'>
                    <label>Card Number</label>
                    <div className='payment-input-wrapper'>
                      <CreditCard className='payment-input-icon' />
                      <input
                        type='text'
                        placeholder='1234 5678 9012 3456'
                        value={cardNumber}
                        onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                        maxLength={19}
                        onFocus={() => setCardFlipped(false)}
                      />
                    </div>
                  </div>

                  <div className='payment-field'>
                    <label>Cardholder Name</label>
                    <input
                      type='text'
                      placeholder='John Doe'
                      value={cardName}
                      onChange={e => setCardName(e.target.value.toUpperCase())}
                      onFocus={() => setCardFlipped(false)}
                    />
                  </div>

                  <div className='payment-field-row'>
                    <div className='payment-field'>
                      <label>Expiry Date</label>
                      <input
                        type='text'
                        placeholder='MM/YY'
                        value={expiry}
                        onChange={e => setExpiry(formatExpiry(e.target.value))}
                        maxLength={5}
                        onFocus={() => setCardFlipped(false)}
                      />
                    </div>
                    <div className='payment-field'>
                      <label>CVV</label>
                      <input
                        type='password'
                        placeholder='•••'
                        value={cvv}
                        onChange={e => setCvv(e.target.value.replace(/\D/g, '').substring(0, 4))}
                        maxLength={4}
                        onFocus={() => setCardFlipped(true)}
                        onBlur={() => setCardFlipped(false)}
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(248, 69, 101, 0.3)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={processPayment}
                    disabled={processing}
                    className='payment-submit-btn'
                  >
                    <Lock className='w-4 h-4' />
                    Pay {currency}{totalAmount}
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key='upi'
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className='payment-qr-section'
                >
                  <div className='payment-qr-card'>
                    <p className='payment-qr-title'>Scan to Pay</p>
                    <p className='payment-qr-subtitle'>Use any UPI app to scan this QR code</p>

                    <div className='payment-qr-container'>
                      <div className='payment-qr-inner'>
                        <QRCodeSVG
                          value={`upi://pay?pa=quickshow@upi&pn=QuickShow&am=${totalAmount}&cu=INR&tn=Movie-${movieTitle}-${selectedSeats.join(',')}`}
                          size={180}
                          level='H'
                          includeMargin={false}
                          bgColor='#ffffff'
                          fgColor='#000000'
                        />
                      </div>
                      <div className='payment-qr-amount'>
                        <span className='text-gray-400 text-sm'>Amount</span>
                        <span className='text-2xl font-bold text-primary'>{currency}{totalAmount}</span>
                      </div>
                    </div>

                    <div className='payment-upi-apps'>
                      <p className='text-xs text-gray-500 mb-3'>Supported UPI Apps</p>
                      <div className='payment-upi-logos'>
                        <div className='upi-app'>GPay</div>
                        <div className='upi-app'>PhonePe</div>
                        <div className='upi-app'>Paytm</div>
                        <div className='upi-app'>BHIM</div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={simulateQrPayment}
                      disabled={processing}
                      className='payment-submit-btn'
                    >
                      {qrScanned ? (
                        <>
                          <Loader2 className='w-4 h-4 animate-spin' />
                          Verifying Payment...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className='w-4 h-4' />
                          I've Completed the Payment
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Security Badge */}
            <div className='payment-security'>
              <ShieldCheck className='w-4 h-4 text-green-400' />
              <span>Secured with 256-bit SSL encryption</span>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className='payment-summary-section'>
            <div className='payment-summary-card'>
              <h2 className='payment-summary-title'>Order Summary</h2>

              {/* Movie Poster */}
              {moviePoster && (
                <div className='payment-summary-poster'>
                  <img
                    src={(moviePoster.startsWith('http') ? '' : image_base_url) + moviePoster}
                    alt={movieTitle}
                  />
                </div>
              )}

              <h3 className='payment-summary-movie'>{movieTitle}</h3>

              {/* Details */}
              <div className='payment-summary-details'>
                <div className='payment-summary-row'>
                  <span className='payment-summary-label'>
                    <Clock className='w-3.5 h-3.5' /> Date & Time
                  </span>
                  <span className='payment-summary-value'>{dateFormat(showDateTime)}</span>
                </div>

                <div className='payment-summary-row'>
                  <span className='payment-summary-label'>
                    <Ticket className='w-3.5 h-3.5' /> Seats
                  </span>
                  <span className='payment-summary-value'>{selectedSeats.join(', ')}</span>
                </div>

                <div className='payment-summary-divider' />

                <div className='payment-summary-row'>
                  <span className='payment-summary-label'>Ticket Price</span>
                  <span className='payment-summary-value'>{currency}{showPrice} × {selectedSeats.length}</span>
                </div>

                <div className='payment-summary-row'>
                  <span className='payment-summary-label'>Convenience Fee</span>
                  <span className='payment-summary-value fee-waived'>
                    <span className='line-through text-gray-500'>{currency}{Math.round(totalAmount * 0.05)}</span>
                    <span className='text-green-400 ml-1'>FREE</span>
                  </span>
                </div>

                <div className='payment-summary-divider' />

                <div className='payment-summary-row total'>
                  <span>Total Amount</span>
                  <span>{currency}{totalAmount}</span>
                </div>
              </div>

              {/* Promo/Dummy badge */}
              <div className='payment-promo-badge'>
                🎉 You're saving {currency}{Math.round(totalAmount * 0.05)} on convenience fees!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentGateway
