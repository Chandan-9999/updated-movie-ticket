import React from 'react'
import { assets } from '../../assets/assets'
import { LayoutDashboardIcon, ListCollapseIcon, ListIcon, PlusSquareIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAppContext } from '../../context/AppContext'

const AdminSidebar = () => {
    const { user } = useAppContext()

    const adminNavlinks=[
        {name:'Dashboard',path:'/admin',icon:LayoutDashboardIcon},
        {name:'Add Shows',path:'/admin/add-shows',icon:PlusSquareIcon},
        {name:'List Shows',path:'/admin/list-shows',icon:ListIcon},
        {name:'List Bookings',path:'/admin/list-bookings',icon:ListCollapseIcon},
    ]

  return (
    <div className='min-h-[calc(100vh-64px)] md:flex flex-col items-center pt-8
    max-w-[72px] md:max-w-64 w-full border-r border-primary/20 bg-black/20 backdrop-blur-sm text-sm z-40 transition-all'>
        <motion.img 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            src={user?.imageUrl || assets.profile} 
            alt="sidebar profile" 
            className='h-10 md:h-16 w-10 md:w-16 rounded-full mx-auto border-2 border-primary/30 shadow-[0_0_15px_rgba(248,69,101,0.2)]'
        />
        <p className='mt-3 text-base font-semibold max-md:hidden text-white'>{user?.firstName || 'Admin'} {user?.lastName || 'User'}</p>
        <p className='text-xs text-primary max-md:hidden tracking-wider uppercase mb-6'>Administrator</p>
        
        <div className='w-full mt-4 flex flex-col gap-2 px-2 md:px-4'>
            {adminNavlinks.map((link,index)=>(
                <NavLink key={index} to={link.path} end className={({isActive})=>`
                    relative flex items-center justify-center md:justify-start gap-3 w-full py-3 md:px-4 rounded-xl
                    transition-all duration-300 group
                    ${isActive ? 'bg-gradient-to-r from-primary/20 to-transparent text-primary shadow-[inset_2px_0_0_#F84565]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}
                `}>
                    {({isActive})=>(
                        <>
                            <motion.div 
                                whileHover={{ scale: 1.1 }} 
                                whileTap={{ scale: 0.95 }}
                                className={`p-2 rounded-lg ${isActive ? 'bg-primary/20' : 'bg-transparent group-hover:bg-white/10'}`}
                            >
                                <link.icon className='w-5 h-5'/>
                            </motion.div>
                            <p className='max-md:hidden font-medium text-[15px]'>{link.name}</p>
                        </>
                    )}
                </NavLink>
            ))}
        </div>
    </div>
  )
}

export default AdminSidebar