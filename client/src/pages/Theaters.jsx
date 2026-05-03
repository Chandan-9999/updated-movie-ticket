import React from 'react'
import BlurCircle from '../components/BlurCircle'
import { motion } from 'framer-motion'
import { MapPin, Star, Clock, Wifi, Car, Accessibility } from 'lucide-react'
import FloatingParticles from '../components/FloatingParticles'
import { GlowingOrb, NeonText, GridPattern } from '../components/CinemaGraphics'

export const theatersList = [
    { name: "PVR Cinemas, MG Road", location: "MG Road, City Center", screens: 6, rating: 4.5 },
    { name: "INOX, Nexus Mall", location: "Nexus Mall, South Zone", screens: 8, rating: 4.7 },
    { name: "Cinepolis, Orion Mall", location: "Orion Mall, West End", screens: 5, rating: 4.3 },
    { name: "PVR Director's Cut", location: "Ambience Mall, VIP Road", screens: 4, rating: 4.8 },
    { name: "PVR ICON", location: "VR Mall, East Avenue", screens: 7, rating: 4.4 },
    { name: "Mukta A2 Cinemas", location: "Central Plaza", screens: 3, rating: 4.0 },
    { name: "Carnival Cinemas", location: "Himalaya Mall", screens: 5, rating: 4.2 },
    { name: "INOX Lido", location: "Lido Mall, Trinity Circle", screens: 4, rating: 4.6 },
    { name: "Gopalan Cinemas", location: "Gopalan Innovation Mall", screens: 3, rating: 4.1 },
    { name: "Everest Theater", location: "Frazer Town, North Zone", screens: 2, rating: 3.9 },
    { name: "Cinepolis VIP", location: "Forum Mall, Koramangala", screens: 6, rating: 4.5 },
    { name: "INOX Megaplex", location: "Mantri Square, Malleshwaram", screens: 10, rating: 4.7 },
    { name: "PVR Superplex", location: "Phoenix Marketcity, Whitefield", screens: 12, rating: 4.8 },
    { name: "Miraj Cinemas", location: "Elements Mall, Thanisandra", screens: 4, rating: 4.0 },
    { name: "SPI Cinemas", location: "Royal Meenakshi Mall, Bannerghatta Road", screens: 6, rating: 4.3 },
    { name: "Rajhans Cinemas", location: "GT World Mall, Magadi Road", screens: 5, rating: 4.1 },
    { name: "Asian Cinemas", location: "Esteem Mall, Hebbal", screens: 4, rating: 4.2 },
    { name: "Cinepolis IMAX", location: "Lulu Mall, Rajajinagar", screens: 8, rating: 4.9 },
]

const amenityIcons = [Wifi, Car, Accessibility]

const Theaters = () => {
    return (
        <div className='relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh] overflow-hidden'>
            <FloatingParticles count={12} />
            <GridPattern />

            <BlurCircle top='100px' left='100px'/>
            <BlurCircle bottom='0px' right='100px'/>
            <GlowingOrb color='purple' size={350} top='-100px' right='-50px' delay={2} />
            <GlowingOrb color='blue' size={200} bottom='200px' left='-100px' delay={0} />

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className='relative z-10 text-center mb-12'
            >
                {/* Theater icon */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className='inline-block mb-4'
                >
                    <div className='relative inline-flex items-center justify-center'>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                            className='absolute w-20 h-20 rounded-full border border-dashed border-primary/20'
                        />
                        <div className='p-3 bg-primary/10 border border-primary/20 rounded-2xl'>
                            <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
                                <rect x="6" y="16" width="36" height="26" rx="4" stroke="rgba(248,69,101,0.5)" strokeWidth="2" fill="rgba(248,69,101,0.05)" />
                                <path d="M6 22h36" stroke="rgba(248,69,101,0.3)" strokeWidth="1.5" />
                                <rect x="12" y="28" width="24" height="8" rx="2" fill="rgba(248,69,101,0.1)" />
                                <path d="M14 16V10a10 10 0 0120 0v6" stroke="rgba(248,69,101,0.3)" strokeWidth="1.5" fill="none" />
                                <circle cx="18" cy="32" r="1.5" fill="rgba(248,69,101,0.4)" />
                                <circle cx="24" cy="32" r="1.5" fill="rgba(248,69,101,0.4)" />
                                <circle cx="30" cy="32" r="1.5" fill="rgba(248,69,101,0.4)" />
                            </svg>
                        </div>
                    </div>
                </motion.div>

                <h1 className='text-3xl md:text-4xl font-bold'>
                    Our Partner <NeonText>Theaters</NeonText>
                </h1>
                <p className='text-gray-500 mt-2 text-sm'>{theatersList.length} premium locations across the city</p>
                
                {/* Decorative line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className='h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mt-6 max-w-md mx-auto'
                />
            </motion.div>

            <div className='relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {theatersList.map((theater, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.03, y: -5 }}
                        className='group relative bg-gray-800/40 border border-gray-700/50 p-6 rounded-2xl cursor-pointer hover:border-primary/40 transition-all duration-300 overflow-hidden'
                    >
                        {/* Hover glow effect */}
                        <div className='absolute -top-12 -right-12 w-32 h-32 rounded-full bg-primary/0 group-hover:bg-primary/10 blur-3xl transition-all duration-500' />
                        
                        {/* Theater badge */}
                        <div className='flex items-center justify-between mb-3'>
                            <h2 className='text-lg font-semibold text-white group-hover:text-primary transition-colors'>{theater.name}</h2>
                            <div className='flex items-center gap-1 text-xs bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded-full'>
                                <Star className='w-3 h-3 fill-yellow-400' />
                                {theater.rating}
                            </div>
                        </div>
                        
                        <p className='text-gray-400 flex items-center gap-2 text-sm'>
                            <MapPin className='w-4 h-4 text-primary shrink-0'/>
                            {theater.location}
                        </p>

                        {/* Screens count + amenities */}
                        <div className='flex items-center justify-between mt-4 pt-3 border-t border-white/5'>
                            <span className='text-xs text-gray-500'>
                                <span className='text-primary font-semibold'>{theater.screens}</span> Screens
                            </span>
                            <div className='flex items-center gap-1.5'>
                                {amenityIcons.map((Icon, i) => (
                                    <div key={i} className='p-1 bg-white/5 rounded group-hover:bg-primary/10 transition-colors'>
                                        <Icon className='w-3 h-3 text-gray-500 group-hover:text-primary/60 transition-colors' />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default Theaters
