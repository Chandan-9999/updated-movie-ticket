import React from 'react'
import BlurCircle from '../components/BlurCircle'
import { motion } from 'framer-motion'
import { MapPin, ArrowRight, Star } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { theatersList } from './Theaters'
import FloatingParticles from '../components/FloatingParticles'
import { GlowingOrb, NeonText } from '../components/CinemaGraphics'

const TheatersSelection = () => {
    const navigate = useNavigate()
    const { id, date } = useParams()

    const handleSelectTheater = (theaterName) => {
        // Navigate to the seat selection section
        navigate(`/movies/${id}/${date}/seats`)
        scrollTo(0,0)
    }

    return (
        <div className='relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh] overflow-hidden'>
            <FloatingParticles count={10} />
            <BlurCircle top='100px' left='100px'/>
            <BlurCircle bottom='0px' right='100px'/>
            <GlowingOrb color='blue' size={250} top='50px' right='-50px' delay={1} />

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='relative z-10 text-center mb-8'
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className='inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm mb-4'
                >
                    <MapPin className='w-4 h-4' />
                    {date && new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                </motion.div>

                <h1 className='text-2xl md:text-3xl font-semibold'>
                    Select a <NeonText>Theater</NeonText>
                </h1>
                <p className='text-gray-400 mt-2 text-sm'>Choose your preferred location to proceed to seat selection</p>
                
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className='h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mt-6 max-w-md mx-auto'
                />
            </motion.div>

            <div className='relative z-10 flex flex-col gap-4 max-w-3xl mx-auto'>
                {theatersList.map((theater, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        onClick={() => handleSelectTheater(theater.name)}
                        className='group bg-gray-800/40 hover:bg-gray-800 border border-gray-700 hover:border-primary/50 p-5 rounded-xl flex items-center justify-between cursor-pointer transition-all duration-300 overflow-hidden relative'
                    >
                        {/* Hover glow */}
                        <div className='absolute -left-10 top-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-primary/0 group-hover:bg-primary/10 blur-2xl transition-all duration-500' />
                        
                        <div className='relative z-10'>
                            <div className='flex items-center gap-3'>
                                <h2 className='text-lg font-medium text-white group-hover:text-primary transition-colors'>{theater.name}</h2>
                                {theater.rating && (
                                    <span className='flex items-center gap-1 text-xs bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded-full'>
                                        <Star className='w-3 h-3 fill-yellow-400' />
                                        {theater.rating}
                                    </span>
                                )}
                            </div>
                            <p className='text-gray-400 flex items-center gap-2 mt-1 text-sm'>
                                <MapPin className='w-4 h-4 text-primary'/>
                                {theater.location}
                            </p>
                        </div>
                        <motion.div 
                            className='bg-primary/20 text-primary p-2 rounded-full group-hover:bg-primary group-hover:text-white transition-all'
                            whileHover={{ scale: 1.1 }}
                        >
                            <ArrowRight className='w-5 h-5'/>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default TheatersSelection
