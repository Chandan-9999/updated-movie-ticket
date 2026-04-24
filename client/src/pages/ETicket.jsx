import React, { useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { useAppContext } from '../context/AppContext'
import { dateFormat } from '../lib/dateFormat'
import timeFormat from '../lib/timeFormat'
import BlurCircle from '../components/BlurCircle'
import { motion } from 'framer-motion'
import { ArrowLeftIcon, DownloadIcon, TicketIcon } from 'lucide-react'

const ETicket = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { image_base_url } = useAppContext()
    const ticketRef = useRef(null)
    const currency = import.meta.env.VITE_CURRENCY

    const booking = location.state?.booking

    if (!booking) {
        return (
            <div className='flex flex-col items-center justify-center min-h-[80vh] pt-30'>
                <p className='text-gray-400 text-lg'>No ticket data found.</p>
                <button onClick={() => navigate('/my-bookings')} className='mt-4 bg-primary px-6 py-2 rounded-full'>
                    Go to My Bookings
                </button>
            </div>
        )
    }

    const handleDownload = () => {
        const printWindow = window.open('', '_blank')
        const ticketHTML = ticketRef.current.innerHTML
        printWindow.document.write(`
            <html>
            <head>
                <title>QuickShow E-Ticket</title>
                <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    body { 
                        font-family: 'Segoe UI', Arial, sans-serif; 
                        background: #0a0a0a; 
                        color: white; 
                        display: flex; 
                        justify-content: center; 
                        padding: 40px;
                    }
                    .ticket-container {
                        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
                        border: 2px solid #F84565;
                        border-radius: 20px;
                        padding: 40px;
                        max-width: 500px;
                        width: 100%;
                    }
                    .ticket-header { text-align: center; margin-bottom: 24px; }
                    .ticket-header h1 { color: #F84565; font-size: 28px; }
                    .ticket-header p { color: #888; font-size: 12px; }
                    .movie-title { font-size: 22px; font-weight: bold; text-align: center; margin: 16px 0 8px; }
                    .divider { 
                        border: none; 
                        border-top: 2px dashed #F84565; 
                        margin: 20px 0; 
                        opacity: 0.4;
                    }
                    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 16px 0; }
                    .info-item label { color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; }
                    .info-item p { font-size: 15px; font-weight: 600; margin-top: 4px; }
                    .qr-section { text-align: center; margin-top: 20px; }
                    .qr-section svg { background: white; padding: 12px; border-radius: 12px; }
                    .booking-id { text-align: center; color: #888; font-size: 11px; margin-top: 12px; }
                    .amount { text-align: center; font-size: 28px; font-weight: bold; color: #F84565; margin: 12px 0; }
                    @media print { body { background: white; } }
                </style>
            </head>
            <body>
                <div class="ticket-container">
                    <div class="ticket-header">
                        <h1>QuickShow</h1>
                        <p>E-Ticket</p>
                    </div>
                    <p class="movie-title">${booking.show.movie.title}</p>
                    <p style="text-align:center; color:#aaa; font-size:13px">${timeFormat(booking.show.movie.runtime)}</p>
                    <hr class="divider" />
                    <div class="info-grid">
                        <div class="info-item">
                            <label>Date & Time</label>
                            <p>${dateFormat(booking.show.showDateTime)}</p>
                        </div>
                        <div class="info-item">
                            <label>Seats</label>
                            <p>${booking.bookedSeats.join(', ')}</p>
                        </div>
                        <div class="info-item">
                            <label>Tickets</label>
                            <p>${booking.bookedSeats.length}</p>
                        </div>
                        <div class="info-item">
                            <label>Amount</label>
                            <p>${currency}${booking.amount}</p>
                        </div>
                    </div>
                    <hr class="divider" />
                    <p class="amount">${currency}${booking.amount}</p>
                    <p class="booking-id">Booking ID: ${booking._id}</p>
                </div>
            </body>
            </html>
        `)
        printWindow.document.close()
        setTimeout(() => printWindow.print(), 500)
    }

    return (
        <div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh] pb-20'>
            <BlurCircle top='100px' left='100px' />
            <BlurCircle bottom='0px' right='100px' />

            <motion.button
                onClick={() => navigate('/my-bookings')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='flex items-center gap-2 text-gray-400 hover:text-white mb-8 cursor-pointer transition-colors'
            >
                <ArrowLeftIcon className='w-4 h-4' /> Back to My Bookings
            </motion.button>

            <div className='flex flex-col items-center'>
                {/* E-Ticket Card */}
                <motion.div
                    ref={ticketRef}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className='relative w-full max-w-md bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 
                    border-2 border-primary/30 rounded-2xl overflow-hidden shadow-2xl shadow-primary/10'
                >
                    {/* Top decorative strip */}
                    <div className='h-2 bg-gradient-to-r from-primary via-pink-500 to-primary' />

                    {/* Header */}
                    <div className='text-center pt-6 pb-3'>
                        <div className='flex items-center justify-center gap-2'>
                            <TicketIcon className='w-6 h-6 text-primary' />
                            <h1 className='text-2xl font-bold text-primary'>QuickShow</h1>
                        </div>
                        <p className='text-gray-500 text-xs tracking-widest uppercase mt-1'>E-Ticket</p>
                    </div>

                    {/* Movie Poster */}
                    <div className='px-6'>
                        <img
                            src={image_base_url + booking.show.movie.poster_path}
                            alt={booking.show.movie.title}
                            className='w-full h-48 object-cover object-top rounded-xl'
                        />
                    </div>

                    {/* Movie Title */}
                    <div className='text-center px-6 pt-4'>
                        <h2 className='text-xl font-bold'>{booking.show.movie.title}</h2>
                        <p className='text-gray-400 text-sm'>{timeFormat(booking.show.movie.runtime)}</p>
                    </div>

                    {/* Dashed Divider with notches */}
                    <div className='relative my-5'>
                        <div className='absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#0B0F19] rounded-full' />
                        <div className='absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#0B0F19] rounded-full' />
                        <hr className='border-t-2 border-dashed border-primary/30 mx-8' />
                    </div>

                    {/* Info Grid */}
                    <div className='grid grid-cols-2 gap-4 px-8'>
                        <div>
                            <p className='text-[10px] uppercase tracking-wider text-gray-500'>Date & Time</p>
                            <p className='text-sm font-semibold mt-1'>{dateFormat(booking.show.showDateTime)}</p>
                        </div>
                        <div>
                            <p className='text-[10px] uppercase tracking-wider text-gray-500'>Seats</p>
                            <p className='text-sm font-semibold mt-1'>{booking.bookedSeats.join(', ')}</p>
                        </div>
                        <div>
                            <p className='text-[10px] uppercase tracking-wider text-gray-500'>Tickets</p>
                            <p className='text-sm font-semibold mt-1'>{booking.bookedSeats.length}</p>
                        </div>
                        <div>
                            <p className='text-[10px] uppercase tracking-wider text-gray-500'>Amount Paid</p>
                            <p className='text-sm font-semibold mt-1 text-primary'>{currency}{booking.amount}</p>
                        </div>
                    </div>

                    {/* QR Code */}
                    <div className='flex flex-col items-center py-6'>
                        <div className='bg-white p-3 rounded-xl'>
                            <QRCodeSVG
                                value={JSON.stringify({
                                    bookingId: booking._id,
                                    movie: booking.show.movie.title,
                                    seats: booking.bookedSeats,
                                    date: booking.show.showDateTime,
                                    amount: booking.amount
                                })}
                                size={140}
                                level='H'
                                includeMargin={false}
                            />
                        </div>
                        <p className='text-gray-500 text-[10px] mt-3 tracking-wider'>SCAN AT THEATER ENTRANCE</p>
                    </div>

                    {/* Booking ID */}
                    <div className='bg-black/30 py-3 text-center'>
                        <p className='text-gray-500 text-[10px] tracking-wider'>BOOKING ID</p>
                        <p className='text-xs font-mono text-gray-300 mt-1'>{booking._id}</p>
                    </div>
                </motion.div>

                {/* Download Button */}
                <motion.button
                    onClick={handleDownload}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='flex items-center gap-2 mt-8 px-8 py-3 bg-primary hover:bg-primary-dull 
                    transition rounded-full font-medium cursor-pointer'
                >
                    <DownloadIcon className='w-5 h-5' />
                    Download / Print Ticket
                </motion.button>
            </div>
        </div>
    )
}

export default ETicket
