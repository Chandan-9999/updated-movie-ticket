import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import { dateFormat } from '../../lib/dateFormat';
import { useAppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';
import { FilmIcon, UsersIcon, BanknoteIcon, CalendarClockIcon, SearchIcon } from 'lucide-react';
import BlurCircle from '../../components/BlurCircle';

const ListShows = () => {

    const currency = import.meta.env.VITE_CURRENCY || '₹'
    const {axios, getToken, user, image_base_url} = useAppContext()
    
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')

    const getAllShows = async () => {
        try {
            const {data} = await axios.get("/api/admin/all-shows",{
                headers:{Authorization: `Bearer ${await getToken()}`}
            })
            setShows(data.shows)
        } catch(error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user){
            getAllShows();
        }
    }, [user])

    const filteredShows = shows.filter(show => 
        show.movie?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    )

  return !loading ? (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="pb-20 relative h-full flex flex-col"
    >
      <BlurCircle top='-5%' left='50%'/>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <Title text1='Manage' text2="Shows"/>
          
          <div className="relative w-full sm:w-auto">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                  type="text" 
                  placeholder="Search movies..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 bg-black/40 border border-primary/20 rounded-xl text-sm focus:border-primary/50 outline-none transition-colors text-white placeholder-gray-500"
              />
          </div>
      </div>

      <div className='bg-black/30 border border-primary/20 rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm flex-1 flex flex-col'>
        <div className='overflow-x-auto flex-1'>
            <table className='w-full text-left border-collapse whitespace-nowrap min-w-[800px]'>
                <thead>
                    <tr className='bg-primary/10 text-primary text-xs uppercase tracking-wider border-b border-primary/20'>
                        <th className='p-4 pl-6 font-semibold rounded-tl-xl'>
                            <div className="flex items-center gap-2"><FilmIcon className="w-4 h-4"/> Movie</div>
                        </th>
                        <th className='p-4 font-semibold'>
                            <div className="flex items-center gap-2"><CalendarClockIcon className="w-4 h-4"/> Schedule</div>
                        </th>
                        <th className='p-4 font-semibold'>
                            <div className="flex items-center gap-2"><BanknoteIcon className="w-4 h-4"/> Pricing</div>
                        </th>
                        <th className='p-4 font-semibold text-center'>
                            <div className="flex items-center justify-center gap-2"><UsersIcon className="w-4 h-4"/> Bookings</div>
                        </th>
                        <th className='p-4 pr-6 font-semibold text-right rounded-tr-xl'>Revenue</th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-white/5'>
                    {filteredShows.length > 0 ? (
                        filteredShows.map((show, index) => {
                            const bookingsCount = Object.keys(show.occupiedSeats || {}).length;
                            const revenue = bookingsCount * (show.showPrice || 0);
                            
                            return (
                                <motion.tr 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    key={show._id || index} 
                                    className='hover:bg-white/5 transition-colors group'
                                >
                                    <td className='p-4 pl-6'>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-14 rounded bg-gray-800 overflow-hidden flex-shrink-0">
                                                {show.movie?.poster_path && (
                                                    <img src={image_base_url + show.movie.poster_path} alt="" className="w-full h-full object-cover"/>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-bold text-white group-hover:text-primary transition-colors">{show.movie?.title}</p>
                                                <p className="text-xs text-gray-500">{show.movie?.release_date?.split('-')[0]}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='p-4'>
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/5">
                                            <span className="text-sm font-medium text-gray-300">{dateFormat(show.showDateTime)}</span>
                                        </div>
                                    </td>
                                    <td className='p-4'>
                                        <span className="text-sm font-semibold text-white">{currency}{show.showPrice}</span>
                                        <span className="text-xs text-gray-500 ml-1">/ seat</span>
                                    </td>
                                    <td className='p-4 text-center'>
                                        <div className="inline-flex items-center justify-center min-w-[3rem] px-2 py-1 bg-primary/10 text-primary border border-primary/20 rounded-lg font-bold text-sm">
                                            {bookingsCount}
                                        </div>
                                    </td>
                                    <td className='p-4 pr-6 text-right'>
                                        <span className="text-base font-bold text-emerald-400">{currency}{revenue.toLocaleString()}</span>
                                    </td>
                                </motion.tr>
                            )
                        })
                    ) : (
                        <tr>
                            <td colSpan={5} className="p-10 text-center text-gray-500">
                                <FilmIcon className="w-10 h-10 mx-auto mb-3 opacity-20" />
                                No shows found matching your search.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        
        {filteredShows.length > 0 && (
            <div className="p-4 border-t border-white/5 bg-black/20 flex justify-between items-center text-xs text-gray-500">
                <p>Showing {filteredShows.length} total active shows</p>
            </div>
        )}
      </div>
    </motion.div>
  ) : <Loading/>
}

export default ListShows