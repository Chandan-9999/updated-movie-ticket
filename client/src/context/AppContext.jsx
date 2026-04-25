import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import {useAuth, useUser} from '@clerk/clerk-react'
import {useLocation, useNavigate} from 'react-router-dom'
import toast from "react-hot-toast";

axios.defaults.baseURL=import.meta.env.VITE_BASE_URL

export const AppContext = createContext()

export const AppProvider=({children})=>{

    const [isAdmin,setIsAdmin]=useState(false)
    const [shows,setShows]=useState([])
    const [detailedShows,setDetailedShows]=useState([])
    const [favoriteMovies,setFavoriteMovies]=useState([])
    const [userBookings,setUserBookings]=useState([])

    const image_base_url=import.meta.env.VITE_TMDB_IMAGE_BASE_URL

    const {user,isLoaded} = useUser()
    const {getToken} = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    const fetchIsAdmin = async () => {
    try {

        const token = await getToken()
        if(!token) return

        const {data} = await axios.get('/api/admin/is-admin',{
            headers:{ Authorization:`Bearer ${token}` }
        })

        setIsAdmin(data.isAdmin)

        if(!data.isAdmin && location.pathname.startsWith('/admin')){
            navigate('/')
            toast.error('You are not authorized to access admin dashboard')
        }

    } catch (error) {
        console.error(error)
    }
}

    const fetchShows=async()=>{
        try{
            const {data}=await axios.get('/api/show/all')
            if(data.success){
                // Filter out null movie entries (can happen if a movie was deleted)
                const validShows = (data.shows || []).filter(show => show != null)
                const validDetailedShows = (data.detailedShows || []).filter(show => show && show.movie)
                setShows(validShows)
                setDetailedShows(validDetailedShows)
            }else{
                toast.error(data.message)
            }
        }
        catch(error){
            console.error(error);
            
        }
    }

    const fetchFavoriteMovies = async () => {
    try {

        const token = await getToken()
        if(!token) return

        const {data} = await axios.get('/api/user/favorites',{
            headers:{ Authorization:`Bearer ${token}` }
        })

        if(data.success){
            setFavoriteMovies(data.movies)
        }else{
            toast.error(data.message)
        }

    } catch (error) {
        console.error(error)
    }
}

    const fetchUserBookings = async () => {
        try {
            const token = await getToken()
            if(!token) return

            const {data} = await axios.get('/api/user/bookings',{
                headers:{ Authorization:`Bearer ${token}` }
            })

            if(data.success){
                setUserBookings(data.bookings)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(()=>{
        fetchShows()
    },[])

    useEffect(()=>{
        if(isLoaded && user){
            fetchIsAdmin()
            fetchFavoriteMovies()
            fetchUserBookings()
        }
    },[isLoaded,user])

    const value={
        axios,
        fetchIsAdmin,
        user,getToken,navigate,isAdmin,shows,detailedShows,favoriteMovies,userBookings,fetchFavoriteMovies,fetchUserBookings,image_base_url
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext=()=>useContext(AppContext)