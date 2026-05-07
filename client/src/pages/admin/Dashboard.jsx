import { ChartLineIcon, CircleDollarSignIcon, PlayCircleIcon, StarIcon, UsersIcon, TrendingUpIcon, RefreshCwIcon, ActivityIcon } from 'lucide-react';
import React, { useEffect, useState, useRef, useCallback } from 'react'
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import BlurCircle from '../../components/BlurCircle';
import { dateFormat } from '../../lib/dateFormat';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

// Animated number counter that smoothly transitions between values
const AnimatedNumber = ({ value, prefix = '', duration = 800 }) => {
    const [displayValue, setDisplayValue] = useState(0)
    const prevValueRef = useRef(0)
    const animFrameRef = useRef(null)

    useEffect(() => {
        const numVal = typeof value === 'number' ? value : parseInt(value) || 0
        const startVal = prevValueRef.current
        const diff = numVal - startVal

        if (diff === 0) return

        const startTime = performance.now()

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = Math.round(startVal + diff * eased)
            setDisplayValue(current)

            if (progress < 1) {
                animFrameRef.current = requestAnimationFrame(animate)
            } else {
                prevValueRef.current = numVal
            }
        }

        animFrameRef.current = requestAnimationFrame(animate)

        return () => {
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
        }
    }, [value, duration])

    return <>{prefix}{displayValue.toLocaleString()}</>
}

const POLL_INTERVAL = 10000 // 10 seconds

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
    const [lastUpdated, setLastUpdated] = useState(null)
    const [changedCards, setChangedCards] = useState({}) // Track which cards just changed
    const [isPolling, setIsPolling] = useState(true)
    const prevStatsRef = useRef({ totalRevenue: 0, totalBookings: 0, activeShowCount: 0, totalUser: 0 })
    const pollTimerRef = useRef(null)

    const dashboardCards = [
        {key: "revenue", title: "Total Revenue", value: dashboardData.totalRevenue || 0, prefix: currency, icon: CircleDollarSignIcon, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20", glowColor: "rgba(52,211,153,0.3)"},
        {key: "bookings", title: "Total Bookings", value: dashboardData.totalBookings || 0, prefix: "", icon: ChartLineIcon, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20", glowColor: "rgba(96,165,250,0.3)"},
        {key: "shows", title: "Active Shows", value: dashboardData.activeShows?.length || 0, prefix: "", icon: PlayCircleIcon, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20", glowColor: "rgba(192,132,252,0.3)"},
        {key: "users", title: "Total Users", value: dashboardData.totalUser || 0, prefix: "", icon: UsersIcon, color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20", glowColor: "rgba(251,191,36,0.3)"},
    ]

    // Full dashboard fetch (on initial load)
    const fetchDashboardData = async () => {
         try {
            const {data} = await axios.get("/api/admin/dashboard", {headers:{
                Authorization: `Bearer ${await getToken()}`}})
            if(data.success){
                setDashboardData(data.dashboardData)
                setLastUpdated(new Date())
                prevStatsRef.current = {
                    totalRevenue: data.dashboardData.totalRevenue || 0,
                    totalBookings: data.dashboardData.totalBookings || 0,
                    activeShowCount: data.dashboardData.activeShows?.length || 0,
                    totalUser: data.dashboardData.totalUser || 0
                }
                setLoading(false)
            } else {
                toast.error(data.message)
            }
         } catch (error) {
            toast.error('Error fetching dashboard data')
         }
    }

    // Lightweight stats poll (frequent)
    const pollLiveStats = useCallback(async () => {
        try {
            const {data} = await axios.get("/api/admin/live-stats", {headers:{
                Authorization: `Bearer ${await getToken()}`}})
            if(data.success) {
                const { stats } = data
                const prev = prevStatsRef.current

                // Detect which stats changed
                const changes = {}
                if (stats.totalRevenue !== prev.totalRevenue) changes.revenue = true
                if (stats.totalBookings !== prev.totalBookings) changes.bookings = true
                if (stats.activeShowCount !== prev.activeShowCount) changes.shows = true
                if (stats.totalUser !== prev.totalUser) changes.users = true

                if (Object.keys(changes).length > 0) {
                    // Flash the changed cards
                    setChangedCards(changes)
                    setTimeout(() => setChangedCards({}), 2000)

                    // Update the dashboard data with new stats
                    setDashboardData(prev => ({
                        ...prev,
                        totalRevenue: stats.totalRevenue,
                        totalBookings: stats.totalBookings,
                        totalUser: stats.totalUser,
                        // If active show count changed, we need a full re-fetch for the show cards
                        ...(stats.activeShowCount !== prevStatsRef.current.activeShowCount ? {} : {})
                    }))

                    // If active shows changed, do a full fetch to get the populated data
                    if (changes.shows) {
                        fetchDashboardData()
                    }

                    prevStatsRef.current = {
                        totalRevenue: stats.totalRevenue,
                        totalBookings: stats.totalBookings,
                        activeShowCount: stats.activeShowCount,
                        totalUser: stats.totalUser
                    }
                }

                setLastUpdated(new Date())
            }
        } catch (error) {
            // Silent fail for polling — don't spam toasts
            console.log('Poll error:', error.message)
        }
    }, [axios, getToken])

    // Initial fetch
    useEffect(() => {
        if(user){
            fetchDashboardData()
        }
    }, [user])

    // Polling interval
    useEffect(() => {
        if (!user || loading || !isPolling) return

        pollTimerRef.current = setInterval(pollLiveStats, POLL_INTERVAL)

        return () => {
            if (pollTimerRef.current) clearInterval(pollTimerRef.current)
        }
    }, [user, loading, isPolling, pollLiveStats])

    // Format "last updated" as relative time
    const getTimeAgo = () => {
        if (!lastUpdated) return ''
        const seconds = Math.floor((Date.now() - lastUpdated.getTime()) / 1000)
        if (seconds < 5) return 'just now'
        if (seconds < 60) return `${seconds}s ago`
        const minutes = Math.floor(seconds / 60)
        return `${minutes}m ago`
    }

    // Force refresh
    const handleForceRefresh = async () => {
        await fetchDashboardData()
        await pollLiveStats()
        toast.success('Dashboard refreshed')
    }

  return !loading ? (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pb-10"
    >
        <div className="flex items-center justify-between mb-8">
            <Title text1="Admin" text2="Dashboard"/>
            <div className="flex items-center gap-3">
                {/* Manual refresh button */}
                <motion.button
                    whileHover={{ scale: 1.05, rotate: 180 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleForceRefresh}
                    className="p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                    title="Refresh now"
                >
                    <RefreshCwIcon className="w-4 h-4 text-gray-400" />
                </motion.button>

                {/* Live indicator */}
                <div 
                    className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full flex items-center gap-2 cursor-pointer select-none"
                    onClick={() => setIsPolling(!isPolling)}
                    title={isPolling ? 'Click to pause live updates' : 'Click to resume live updates'}
                >
                    <div className="relative">
                        <ActivityIcon className="w-4 h-4 text-primary" />
                        {isPolling && (
                            <motion.div
                                className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full"
                                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        )}
                    </div>
                    <span className="text-sm font-medium text-primary">
                        {isPolling ? 'Live' : 'Paused'}
                    </span>
                    {lastUpdated && (
                        <span className="text-xs text-gray-500 ml-1">• {getTimeAgo()}</span>
                    )}
                </div>
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
                        className={`relative flex items-center justify-between p-6 ${card.bg} border ${card.border} rounded-2xl backdrop-blur-sm hover:scale-[1.02] transition-transform duration-300 shadow-lg overflow-hidden`}
                    >
                        {/* Flash effect when value changes */}
                        <AnimatePresence>
                            {changedCards[card.key] && (
                                <motion.div
                                    initial={{ opacity: 0.6, scale: 0.8 }}
                                    animate={{ opacity: 0, scale: 2.5 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1.5, ease: 'easeOut' }}
                                    className="absolute inset-0 rounded-2xl pointer-events-none"
                                    style={{
                                        background: `radial-gradient(circle at center, ${card.glowColor}, transparent 70%)`,
                                    }}
                                />
                            )}
                        </AnimatePresence>

                        {/* Subtle pulse ring when value changes */}
                        <AnimatePresence>
                            {changedCards[card.key] && (
                                <motion.div
                                    initial={{ opacity: 1, borderWidth: 2 }}
                                    animate={{ opacity: 0, scale: 1.1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1 }}
                                    className="absolute inset-0 rounded-2xl pointer-events-none"
                                    style={{ borderColor: card.glowColor, borderStyle: 'solid' }}
                                />
                            )}
                        </AnimatePresence>

                        <div>
                            <h1 className='text-sm font-medium text-gray-400 mb-2'>{card.title}</h1>
                            <p className='text-3xl font-bold text-white'>
                                <AnimatedNumber value={card.value} prefix={card.prefix} />
                            </p>
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
            {dashboardData.activeShows?.filter(show => show.movie).map((show, index) => (
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