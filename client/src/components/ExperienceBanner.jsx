import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Zap, Shield, Smartphone } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const features = [
  { icon: Zap, title: 'Instant Booking', desc: 'Book tickets in seconds with our lightning-fast checkout' },
  { icon: Shield, title: 'Secure Payments', desc: 'Bank-grade encryption for all your transactions' },
  { icon: Smartphone, title: 'E-Tickets', desc: 'Digital tickets sent directly to your phone' },
]

const ExperienceBanner = () => {
  const navigate = useNavigate()

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-44 py-20'>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className='relative overflow-hidden rounded-3xl'
      >
        {/* Background */}
        <div className='absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-900/20 to-blue-900/20' />
        <div className='absolute inset-0 bg-[#09090B]/60 backdrop-blur-sm' />
        
        {/* Animated grid lines */}
        <div className='absolute inset-0 opacity-[0.04]' style={{
          backgroundImage: `
            linear-gradient(rgba(248,69,101,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(248,69,101,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }} />

        {/* Floating orbs */}
        <motion.div
          className='absolute -top-20 -left-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl'
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className='absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl'
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className='relative z-10 p-8 md:p-16 text-center'>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
            className='inline-flex items-center gap-2 px-4 py-1.5 bg-primary/15 border border-primary/25 rounded-full text-primary text-sm mb-6'
          >
            <Sparkles className='w-4 h-4' />
            Premium Experience
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className='text-3xl md:text-5xl font-bold max-w-2xl mx-auto leading-tight'
          >
            Your Cinema, <br />
            <span className='bg-gradient-to-r from-primary via-pink-400 to-purple-400 bg-clip-text text-transparent'>
              Reimagined
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className='text-gray-400 mt-4 max-w-lg mx-auto text-sm md:text-base'
          >
            From seat selection to e-tickets, we've crafted every detail for the perfect moviegoing experience.
          </motion.p>

          {/* Feature pills */}
          <div className='flex flex-wrap justify-center gap-4 mt-10'>
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -3 }}
                className='flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-5 py-3 backdrop-blur-sm'
              >
                <div className='p-2 bg-primary/15 rounded-lg'>
                  <feat.icon className='w-4 h-4 text-primary' />
                </div>
                <div className='text-left'>
                  <p className='text-sm font-semibold text-white'>{feat.title}</p>
                  <p className='text-xs text-gray-500'>{feat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(248, 69, 101, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { navigate('/movies'); scrollTo(0, 0) }}
            className='mt-10 px-8 py-3.5 bg-primary hover:bg-primary-dull transition rounded-full text-sm font-semibold cursor-pointer shadow-lg shadow-primary/25'
          >
            Start Booking Now
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default ExperienceBanner
