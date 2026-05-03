import React, { useState } from 'react'
import { dummyTrailers } from '../assets/assets'
import ReactPlayer from 'react-player'
import BlurCircle from './BlurCircle'
import { PlayCircleIcon, Film }from 'lucide-react'
import { motion } from 'framer-motion'
import { NeonText, GlowingOrb } from './CinemaGraphics'

const TrailersSection = () => {

    const [currentTrailer,setCurrentTrailer]=useState(dummyTrailers[0])
  return (
    <div className='relative px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden'>
        {/* Section header with icon */}
        <div className='flex items-center gap-3 max-w-[960px] mx-auto mb-6'>
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 300 }}
                className='p-2 bg-primary/10 border border-primary/20 rounded-lg'
            >
                <Film className='w-4 h-4 text-primary' />
            </motion.div>
            <motion.p 
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className='text-gray-300 font-medium text-lg'>
                <NeonText>Latest Trailers</NeonText>
            </motion.p>
        </div>

        {/* Decorative line */}
        <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='h-px bg-gradient-to-r from-primary/30 via-primary/10 to-transparent mb-6 max-w-[960px] mx-auto origin-left'
        />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className='relative mt-6'>
            <BlurCircle top='-100px' right='-100px'/>
            <GlowingOrb color='purple' size={200} bottom='-80px' left='-80px' delay={2} />
            
            {/* Video player with decorative frame */}
            <div className='relative'>
                <div className='absolute -inset-0.5 bg-gradient-to-br from-primary/20 via-purple-500/10 to-blue-500/10 rounded-xl blur-sm opacity-40' />
                <div className='relative rounded-xl overflow-hidden ring-1 ring-white/5'>
                    <ReactPlayer url={currentTrailer.videoUrl} controls={true} 
                    className='mx-auto max-w-full' width="100%" height="540px"/>
                </div>
            </div>
        </motion.div>

        <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 }}}}
            className='group grid grid-cols-4 gap-4 md:gap-8 mt-8 max-w-3xl mx-auto'
        >
            {dummyTrailers.map((trailer)=>(
                <motion.div 
                    variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 }}}
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.2 }}
                    key={trailer.image} 
                    className={`relative group-hover:not-hover:opacity-50 cursor-pointer max-md:h-60 md:max-h-60 overflow-hidden rounded-lg ${
                        currentTrailer.image === trailer.image ? 'ring-2 ring-primary shadow-lg shadow-primary/20' : ''
                    }`}
                    onClick={()=>setCurrentTrailer(trailer)}>
                    <img src={trailer.image} alt="trailer" className='rounded-lg w-full 
                    h-full object-cover brightness-75 hover:brightness-100 transition-all duration-300'/>
                    <PlayCircleIcon strokeWidth={1.6} className="absolute top-1/2 left-1/2
                    w-5 md:w-8 h-5 md:h-12 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-lg"/>
                    
                    {/* Active indicator */}
                    {currentTrailer.image === trailer.image && (
                        <motion.div
                            layoutId="activeTrailer"
                            className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary'
                        />
                    )}
                </motion.div>
            ))}

        </motion.div>
    </div>
  )
}

export default TrailersSection