import { ChartLineIcon, CircleDollarSignIcon, PlayCircleIcon, StarIcon, UsersIcon, TrendingUpIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import BlurCircle from '../../components/BlurCircle';
import { dateFormat } from '../../lib/dateFormat';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Dashboard = () => {

    const {axios, getToken, user, image_base_url} = useAppContext()
    const currency = import.meta.env.VITE_CURRENCY || '₹'

    const [dashboardData, setDashboardData] = useState({
        totalBookings: 0,
        totalRevenue: 0,
        activeShows: [],
        totalUser: 0
    });
    const [loading, setLoading] = useState(true)

    const dashboardCards = [
        {title: "Total Revenue", value: currency + (dashboardData.totalRevenue || "0"), icon: CircleDollarSignIcon, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20"},
        {title: "Total Bookings", value: dashboardData.totalBookings || "0", icon: ChartLineIcon, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20"},
        {title: "Active Shows", value: dashboardData.activeShows?.length || "0", icon: PlayCircleIcon, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20"},
        {title: "Total Users", value: dashboardData.totalUser || "0", icon: UsersIcon, color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20"},
    ]

    const fetchDashboardData = async () => {
         try {
            const {data} = await axios.get("/api/admin/dashboard", {headers:{
                Authorization: `Bearer ${await getToken()}`}})
            if(data.success){
                setDashboardData(data.dashboardData)
                setLoading(false)
            } else {
                toast.error(data.message)
            }
         } catch (error) {
            toast.error('Error fetching dashboard data')
         }
    }

    useEffect(() => {
        if(user){
            fetchDashboardData()
        }
    }, [user])

  return !loading ? (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pb-10"
    >
        <div className="flex items-center justify-between mb-8">
            <Title text1="Admin" text2="Dashboard"/>
            <div className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full flex items-center gap-2">
                <TrendingUpIcon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Live Overview</span>
            </div>
        </div>
        
        <div className='relative flex flex-wrap gap-4 mt-6'>
            <BlurCircle top='-100px' left='0'/>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full'>
                {dashboardCards.map((card, index) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        key={index} 
                        className={`flex items-center justify-between p-6 ${card.bg} border ${card.border} rounded-2xl backdrop-blur-sm hover:scale-[1.02] transition-transform duration-300 shadow-lg`}
                    >
                        <div>
                            <h1 className='text-sm font-medium text-gray-400 mb-2'>{card.title}</h1>
                            <p className='text-3xl font-bold text-white'>{card.value}</p>
                        </div>
                        <div className={`p-4 rounded-xl ${card.bg}`}>
                            <card.icon className={`w-8 h-8 ${card.color}`}/>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>

        <div className="flex items-center gap-3 mt-14 mb-6">
            <div className="w-2 h-8 bg-primary rounded-full" />
            <h2 className='text-2xl font-bold text-white'>Active Shows</h2>
        </div>

        <div className='relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            <BlurCircle top='100px' left='-10%'/>
            {dashboardData.activeShows?.map((show, index) => (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    key={show._id} 
                    className='group rounded-2xl overflow-hidden bg-black/40 border border-primary/20 hover:border-primary/50 transition-all duration-300 shadow-lg'
                >
                    <div className="relative overflow-hidden h-64">
                        <img 
                            src={image_base_url + show.movie.poster_path} 
                            alt={show.movie.title} 
                            className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                            <p className='font-bold text-lg text-white truncate drop-shadow-md'>{show.movie.title}</p>
                        </div>
                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 border border-white/10">
                            <StarIcon className='w-3.5 h-3.5 text-yellow-500 fill-yellow-500'/>
                            <span className="text-xs font-bold">{show.movie.vote_average?.toFixed(1)}</span>
                        </div>
                    </div>
                    
                    <div className='p-4 bg-gradient-to-b from-transparent to-primary/5'>
                        <div className='flex items-center justify-between mb-3'>
                            <p className='text-xl font-bold text-primary'>{currency} {show.showPrice}</p>
                            <span className="text-xs font-semibold px-2 py-1 bg-primary/20 text-primary rounded-md">Per Ticket</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400 bg-white/5 p-2 rounded-lg">
                            <PlayCircleIcon className="w-4 h-4 text-primary" />
                            {dateFormat(show.showDateTime)}
                        </div>
                    </div>
                </motion.div>
            ))}
            {dashboardData.activeShows?.length === 0 && (
                <div className="col-span-full py-20 text-center bg-white/5 rounded-2xl border border-white/10">
                    <PlayCircleIcon className="w-12 h-12 text-gray-500 mx-auto mb-3 opacity-50" />
                    <p className="text-gray-400 text-lg">No active shows currently running.</p>
                </div>
            )}
        </div>
    </motion.div>
  ) : <Loading/>
}

export default Dashboard