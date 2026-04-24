import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { UserButton } from '@clerk/clerk-react'
import { ShieldAlertIcon } from 'lucide-react'

const AdminNavbar = () => {
  return (
    <div className='flex items-center justify-between px-6 md:px-10 
    h-16 bg-black/40 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50'>
        <div className='flex items-center gap-4'>
            <Link to="/">
                <img src={assets.logo} alt="logo" className='w-32 md:w-36 h-auto cursor-pointer'/>
            </Link>
            <div className='hidden md:flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full'>
                <ShieldAlertIcon className='w-4 h-4 text-primary' />
                <span className='text-xs font-semibold text-primary uppercase tracking-wider'>Admin Portal</span>
            </div>
        </div>
        <div className='flex items-center gap-4'>
            <UserButton afterSignOutUrl='/' />
        </div>
    </div>
  )
}

export default AdminNavbar