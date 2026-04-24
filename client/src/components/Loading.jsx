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
    <div className='flex justify-center items-center h-[80vh]'>
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className='rounded-full h-14 w-14 border-4 border-primary border-t-transparent animate-spin'
        ></motion.div>
    </div>
  )
}

export default Loading