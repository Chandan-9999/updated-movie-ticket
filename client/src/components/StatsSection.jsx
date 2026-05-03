import React from 'react'
import { motion } from 'framer-motion'
import { Film, Users, Ticket, MapPin } from 'lucide-react'
import { NeonText } from './CinemaGraphics'

const stats = [
  { icon: Film, label: 'Movies Screening', value: '50+', color: 'from-red-500/20 to-pink-500/20', iconColor: 'text-red-400' },
  { icon: MapPin, label: 'Partner Theaters', value: '18', color: 'from-blue-500/20 to-cyan-500/20', iconColor: 'text-blue-400' },
  { icon: Ticket, label: 'Tickets Booked', value: '10K+', color: 'from-amber-500/20 to-orange-500/20', iconColor: 'text-amber-400' },
  { icon: Users, label: 'Happy Customers', value: '5K+', color: 'from-green-500/20 to-emerald-500/20', iconColor: 'text-green-400' },
]

const StatsSection = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-44 py-16'>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className='text-center mb-12'
      >
        <p className='text-xs uppercase tracking-[4px] text-primary/60 mb-3'>Why Choose Us</p>
        <h2 className='text-3xl md:text-4xl font-bold'>
          <NeonText>The Ultimate</NeonText> Cinema Experience
        </h2>
      </motion.div>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6'>
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className='relative group'
          >
            <div className={`relative overflow-hidden bg-gradient-to-br ${stat.color} border border-white/5 rounded-2xl p-6 text-center backdrop-blur-sm`}>
              {/* Background glow */}
              <div className='absolute -top-10 -right-10 w-28 h-28 rounded-full bg-white/5 blur-2xl group-hover:bg-white/10 transition-all duration-500' />
              
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                className='inline-block mb-3'
              >
                <stat.icon className={`w-8 h-8 ${stat.iconColor}`} />
              </motion.div>

              <motion.p
                className='text-3xl md:text-4xl font-bold text-white mb-1'
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                {stat.value}
              </motion.p>
              <p className='text-xs md:text-sm text-gray-400'>{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default StatsSection
