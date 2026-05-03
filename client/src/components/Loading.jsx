import React, { useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAppContext } from '../context/AppContext'

const Loading = () => {

  const {nextUrl}=useParams()
  const navigate=useNavigate()
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const { axios } = useAppContext()

  useEffect(()=>{
    const verifyAndNavigate = async () => {
      if (sessionId) {
        try {
          await axios.post('/api/booking/verify-payment', { sessionId })
        } catch (error) {
          console.error(error)
        }
        if (nextUrl) {
          navigate('/' + nextUrl)
        }
      } else {
        if(nextUrl){
          setTimeout(()=>{
            navigate('/'+nextUrl)
          }, 8000)
        }
      }
    }
    
    verifyAndNavigate()
  },[])

  return (
    <div className='flex flex-col justify-center items-center h-[80vh] gap-8'>
      {/* Animated cinema reel loader */}
      <div className='relative'>
        {/* Outer ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className='w-24 h-24'
        >
          <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
            <circle cx="48" cy="48" r="44" stroke="rgba(248,69,101,0.15)" strokeWidth="2" />
            <circle cx="48" cy="48" r="44" stroke="rgba(248,69,101,0.6)" strokeWidth="2.5" strokeDasharray="276" strokeDashoffset="207" strokeLinecap="round" />
            {/* Reel holes */}
            <circle cx="48" cy="16" r="4" fill="rgba(248,69,101,0.3)" />
            <circle cx="48" cy="80" r="4" fill="rgba(248,69,101,0.3)" />
            <circle cx="16" cy="48" r="4" fill="rgba(248,69,101,0.3)" />
            <circle cx="80" cy="48" r="4" fill="rgba(248,69,101,0.3)" />
            <circle cx="25" cy="25" r="3" fill="rgba(248,69,101,0.2)" />
            <circle cx="71" cy="25" r="3" fill="rgba(248,69,101,0.2)" />
            <circle cx="25" cy="71" r="3" fill="rgba(248,69,101,0.2)" />
            <circle cx="71" cy="71" r="3" fill="rgba(248,69,101,0.2)" />
          </svg>
        </motion.div>

        {/* Center icon */}
        <motion.div
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="rgba(248,69,101,0.8)">
            <path d="M8 5v14l11-7z" />
          </svg>
        </motion.div>
      </div>

      {/* Loading text */}
      <div className='text-center'>
        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className='text-gray-400 text-sm tracking-widest uppercase'
        >
          Loading
        </motion.p>
        <div className='flex justify-center gap-1 mt-2'>
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className='w-1.5 h-1.5 rounded-full bg-primary'
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Loading