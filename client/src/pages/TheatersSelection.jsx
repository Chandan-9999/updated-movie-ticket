import React from 'react'
import BlurCircle from '../components/BlurCircle'
import { motion } from 'framer-motion'
import { MapPin, ArrowRight } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { theatersList } from './Theaters'

const TheatersSelection = () => {
    const navigate = useNavigate()
    const { id, date } = useParams()

    const handleSelectTheater = (theaterName) => {
        // Navigate to the seat selection section
        navigate(`/movies/${id}/${date}/seats`)
        scrollTo(0,0)
    }

    return (
        <div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]'>
            <BlurCircle top='100px' left='100px'/>
            <BlurCircle bottom='0px' right='100px'/>
            <h1 className='text-2xl font-semibold mb-2 text-center'>Select a Theater</h1>
            <p className='text-gray-400 text-center mb-8'>Choose your preferred location to proceed to seat selection</p>
            <div className='flex flex-col gap-4 max-w-3xl mx-auto'>
                {theatersList.map((theater, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleSelectTheater(theater.name)}
                        className='bg-gray-800/40 hover:bg-gray-800 border border-gray-700 hover:border-primary/50 p-5 rounded-xl flex items-center justify-between cursor-pointer transition-colors'
                    >
                        <div>
                            <h2 className='text-lg font-medium text-white'>{theater.name}</h2>
                            <p className='text-gray-400 flex items-center gap-2 mt-1 text-sm'>
                                <MapPin className='w-4 h-4 text-primary'/>
                                {theater.location}
                            </p>
                        </div>
                        <div className='bg-primary/20 text-primary p-2 rounded-full'>
                            <ArrowRight className='w-5 h-5'/>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default TheatersSelection
