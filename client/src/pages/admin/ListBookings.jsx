import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import Title from '../../components/admin/Title'
import { dateFormat } from '../../lib/dateFormat'
import { useAppContext } from '../../context/AppContext'
import { motion } from 'framer-motion'
import { ReceiptIcon, UserIcon, FilmIcon, ArmchairIcon, CalendarClockIcon, SearchIcon, CheckCircle2Icon } from 'lucide-react'
import BlurCircle from '../../components/BlurCircle'

const ListBookings = () => {

  const {axios, getToken, user} = useAppContext()
  const currency = import.meta.env.VITE_CURRENCY || '₹'

  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const getAllBookings = async () => {
    try {
      const {data} = await axios.get("/api/admin/all-bookings",{
                headers:{Authorization: `Bearer ${await getToken()}`}
        })
        if (data.bookings) {
          // Sort by newest first based on booking time (or just reverse the array for now assuming chronological return)
          setBookings(data.bookings.reverse())
        }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if(user){
      getAllBookings();
    }
  }, [user])

  const filteredBookings = bookings.filter(booking => 
    booking.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.show?.movie?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return !isLoading ? (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="pb-20 relative h-full flex flex-col"
    >
      <BlurCircle top='-5%' right='0%'/>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <Title text1="Recent" text2="Bookings"/>
          
          <div className="relative w-full sm:w-auto">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                  type="text" 
                  placeholder="Search users, movies..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 bg-black/40 border border-primary/20 rounded-xl text-sm focus:border-primary/50 outline-none transition-colors text-white placeholder-gray-500"
              />
          </div>
      </div>

      <div className='bg-black/30 border border-primary/20 rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm flex-1 flex flex-col'>
        <div className='overflow-x-auto flex-1'>
          <table className='w-full text-left border-collapse whitespace-nowrap min-w-[900px]'>
            <thead>
              <tr className='bg-primary/10 text-primary text-xs uppercase tracking-wider border-b border-primary/20'>
                  <th className='p-4 pl-6 font-semibold rounded-tl-xl'>
                      <div className="flex items-center gap-2"><UserIcon className="w-4 h-4"/> Customer</div>
                  </th>
                  <th className='p-4 font-semibold'>
                      <div className="flex items-center gap-2"><FilmIcon className="w-4 h-4"/> Movie</div>
                  </th>
                  <th className='p-4 font-semibold'>
                      <div className="flex items-center gap-2"><CalendarClockIcon className="w-4 h-4"/> Show Time</div>
                  </th>
                  <th className='p-4 font-semibold'>
                      <div className="flex items-center gap-2"><ArmchairIcon className="w-4 h-4"/> Seats</div>
                  </th>
                  <th className='p-4 font-semibold text-right'>
                      <div className="flex items-center justify-end gap-2"><ReceiptIcon className="w-4 h-4"/> Amount</div>
                  </th>
                  <th className='p-4 pr-6 font-semibold text-center rounded-tr-xl'>Status</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-white/5'>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((item, index) => {
                  const seatsArray = Object.keys(item.bookedSeats || {}).map(k => item.bookedSeats[k]);
                  return (
                    <motion.tr 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      key={item._id || index} 
                      className='hover:bg-white/5 transition-colors group'
                    >
                      <td className='p-4 pl-6'>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                            {item.user?.name?.charAt(0)?.toUpperCase() || '?'}
                          </div>
                          <div>
                            <p className="font-semibold text-white">{item.user?.name}</p>
                            <p className="text-xs text-gray-500">{item.user?.email || 'No email'}</p>
                          </div>
                        </div>
                      </td>
                      <td className='p-4'>
                        <p className="font-semibold text-white group-hover:text-primary transition-colors">{item.show?.movie?.title}</p>
                      </td>
                      <td className='p-4'>
                        <span className="text-sm text-gray-300">{dateFormat(item.show?.showDateTime)}</span>
                      </td>
                      <td className='p-4'>
                        <div className="flex flex-wrap gap-1 max-w-[150px]">
                          {seatsArray.slice(0, 3).map(seat => (
                            <span key={seat} className="text-xs px-2 py-1 bg-white/10 rounded-md text-gray-300">{seat}</span>
                          ))}
                          {seatsArray.length > 3 && (
                            <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md border border-primary/20">+{seatsArray.length - 3}</span>
                          )}
                        </div>
                      </td>
                      <td className='p-4 text-right'>
                        <span className="text-base font-bold text-emerald-400">{currency} {item.amount}</span>
                      </td>
                      <td className='p-4 pr-6'>
                        <div className="flex items-center justify-center">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-semibold">
                            <CheckCircle2Icon className="w-3.5 h-3.5" />
                            Confirmed
                          </div>
                        </div>
                      </td>
                    </motion.tr>
                  )
                })
              ) : (
                <tr>
                    <td colSpan={6} className="p-10 text-center text-gray-500">
                        <ReceiptIcon className="w-10 h-10 mx-auto mb-3 opacity-20" />
                        No bookings found matching your search.
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredBookings.length > 0 && (
            <div className="p-4 border-t border-white/5 bg-black/20 flex justify-between items-center text-xs text-gray-500">
                <p>Showing {filteredBookings.length} total bookings</p>
            </div>
        )}
      </div>
    </motion.div>
  ) : <Loading />
}

export default ListBookings