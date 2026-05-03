import { ArrowRight, Sparkles } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import BlurCircle from './BlurCircle'
import MovieCard from './MovieCard'
import { useAppContext } from '../context/AppContext'
import { motion } from 'framer-motion'
import { NeonText, GlowingOrb } from './CinemaGraphics'

const FeaturedSection = () => {
    const navigate=useNavigate()
    const {shows} = useAppContext()

    const listVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }

  return (
    <div className='relative px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden'>
        <GlowingOrb color='purple' size={200} top='100px' right='-50px' delay={1} />

        <div className='relative flex items-center justify-between pt-20 pb-10'>
            <BlurCircle top='0'right='-80px'/>
            
            <div className='flex items-center gap-3'>
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className='p-2 bg-primary/10 border border-primary/20 rounded-lg'
                >
                    <Sparkles className='w-4 h-4 text-primary' />
                </motion.div>
                <p className='text-gray-300 font-medium text-lg'>
                    <NeonText>Now Showing</NeonText>
                </p>
            </div>
            
            <button onClick={()=>navigate('/movies')} className='group flex items-center gap-2 text-sm text-gray-300 cursor-pointer' >View All <ArrowRight className='group-hover:translate-x-0.5 transition w-4.5 h-4.5'/></button>
        </div>

        {/* Decorative line */}
        <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='h-px bg-gradient-to-r from-primary/30 via-primary/10 to-transparent mb-8 origin-left'
        />

        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={listVariants}
            className='flex flex-wrap max-sm:justify-center gap-8 mt-8'>
            {shows.slice(0,4).map((show)=>(
                <MovieCard key={show._id} movie={show}/>
            ))}
        </motion.div>
        
        <div className='flex justify-center mt-20'>
            <motion.button 
                onClick={()=> {navigate('/movies');scrollTo(0,0)}} 
                whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(248, 69, 101, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition
                rounded-full font-medium cursor-pointer shadow-lg shadow-primary/20'
            >
                Show more
            </motion.button>
        </div>

    </div>
  )
}

export default FeaturedSection