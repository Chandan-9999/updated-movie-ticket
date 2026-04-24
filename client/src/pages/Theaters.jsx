import React from 'react'
import BlurCircle from '../components/BlurCircle'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

export const theatersList = [
    { name: "PVR Cinemas, MG Road", location: "MG Road, City Center" },
    { name: "INOX, Nexus Mall", location: "Nexus Mall, South Zone" },
    { name: "Cinepolis, Orion Mall", location: "Orion Mall, West End" },
    { name: "PVR Director's Cut", location: "Ambience Mall, VIP Road" },
    { name: "PVR ICON", location: "VR Mall, East Avenue" },
    { name: "Mukta A2 Cinemas", location: "Central Plaza" },
    { name: "Carnival Cinemas", location: "Himalaya Mall" },
    { name: "INOX Lido", location: "Lido Mall, Trinity Circle" },
    { name: "Gopalan Cinemas", location: "Gopalan Innovation Mall" },
    { name: "Everest Theater", location: "Frazer Town, North Zone" },
    { name: "Cinepolis VIP", location: "Forum Mall, Koramangala" },
    { name: "INOX Megaplex", location: "Mantri Square, Malleshwaram" },
    { name: "PVR Superplex", location: "Phoenix Marketcity, Whitefield" },
    { name: "Miraj Cinemas", location: "Elements Mall, Thanisandra" },
    { name: "SPI Cinemas", location: "Royal Meenakshi Mall, Bannerghatta Road" },
    { name: "Rajhans Cinemas", location: "GT World Mall, Magadi Road" },
    { name: "Asian Cinemas", location: "Esteem Mall, Hebbal" },
    { name: "Cinepolis IMAX", location: "Lulu Mall, Rajajinagar" },
]

const Theaters = () => {
    return (
        <div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]'>
            <BlurCircle top='100px' left='100px'/>
            <BlurCircle bottom='0px' right='100px'/>
            <h1 className='text-3xl font-semibold mb-8 text-center'>Our Partner Theaters</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {theatersList.map((theater, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className='bg-gray-800/50 border border-gray-700 p-6 rounded-xl flex flex-col gap-3 cursor-pointer hover:border-primary/50 transition-colors'
                    >
                        <h2 className='text-xl font-medium text-white'>{theater.name}</h2>
                        <p className='text-gray-400 flex items-center gap-2'>
                            <MapPin className='w-4 h-4 text-primary'/>
                            {theater.location}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default Theaters
