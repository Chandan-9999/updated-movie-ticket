import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import SeatLayout from './pages/SeatLayout'
import MyBookings from './pages/MyBookings'
import Favorite from './pages/Favorite'
import ETicket from './pages/ETicket'
import Theaters from './pages/Theaters'
import TheatersSelection from './pages/TheatersSelection'
import PaymentGateway from './pages/PaymentGateway'
import {Toaster} from 'react-hot-toast'
import Footer from './components/Footer'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddShows from './pages/admin/AddShows'
import ListShows from './pages/admin/ListShows'
import ListBookings from './pages/admin/ListBookings'
import { useAppContext } from './context/AppContext'
import { SignIn } from '@clerk/clerk-react'
import Loading from './components/Loading'
import Chatbot from './components/Chatbot'
import { AnimatePresence, motion } from 'framer-motion'

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

const App = () => {

  const location=useLocation()
  const isAdminRoute=location.pathname.startsWith('/admin')

  const {user}=useAppContext()
  return (
    <>
    <Toaster/>
      {!isAdminRoute && <Navbar/>}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
            <Route path='/' element={<PageWrapper><Home/></PageWrapper>}/>
            <Route path='/movies' element={<PageWrapper><Movies/></PageWrapper>}/>
            <Route path='/movies/:id' element={<PageWrapper><MovieDetails/></PageWrapper>}/>
            <Route path='/movies/:id/:date' element={<PageWrapper><TheatersSelection/></PageWrapper>}/>
            <Route path='/movies/:id/:date/seats' element={<PageWrapper><SeatLayout/></PageWrapper>}/>
            <Route path='/payment' element={<PageWrapper><PaymentGateway/></PageWrapper>}/>
            <Route path='/theaters' element={<PageWrapper><Theaters/></PageWrapper>}/>
            <Route path='/my-bookings' element={<PageWrapper><MyBookings/></PageWrapper>}/>
            <Route path='/e-ticket' element={<PageWrapper><ETicket/></PageWrapper>}/>
            <Route path='/loading/:nextUrl' element={<PageWrapper><Loading/></PageWrapper>}/>
            <Route path='/favorite' element={<PageWrapper><Favorite/></PageWrapper>}/>

            <Route path='/admin/*' element={user ? <Layout/>:(
              <div className='min-h-screen flex justify-center items-center'>
                <SignIn fallbackRedirectUrl={'/admin'}/>
              </div>
            )}>
              <Route index element={<Dashboard/>}/>
              <Route path='add-shows' element={<AddShows/>}/>
              <Route path='list-shows' element={<ListShows/>}/>
              <Route path='list-bookings' element={<ListBookings/>}/>
            </Route>
        </Routes>
      </AnimatePresence>
      {!isAdminRoute && <Footer/>}
      {!isAdminRoute && <Chatbot/>}
      
    </>
  )
}

export default App