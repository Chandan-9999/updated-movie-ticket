import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets.js'
import { Film, MapPin, Phone, Mail, Instagram, Twitter, Youtube, Facebook, Heart, ArrowUpRight } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='relative mt-40 w-full text-gray-400 overflow-hidden'>
      {/* Top gradient divider */}
      <div className='h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent' />

      {/* Newsletter Section */}
      <div className='px-6 md:px-16 lg:px-36 py-14'>
        <div className='relative flex flex-col md:flex-row items-center justify-between gap-8 
          bg-gradient-to-r from-primary/10 via-primary/5 to-transparent 
          border border-primary/15 rounded-2xl p-8 md:p-12 overflow-hidden'>
          {/* Decorative glow */}
          <div className='absolute -top-20 -left-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl' />
          
          <div className='relative z-10'>
            <h3 className='text-xl md:text-2xl font-bold text-white'>
              Never miss a blockbuster 🎬
            </h3>
            <p className='text-sm text-gray-400 mt-2 max-w-md'>
              Get notified about new releases, exclusive offers, and early access to ticket sales.
            </p>
          </div>
          <div className='relative z-10 flex w-full md:w-auto'>
            <input 
              type='email' 
              placeholder='Enter your email' 
              className='flex-1 md:w-72 px-5 py-3 bg-white/5 border border-white/10 rounded-l-xl 
                text-sm text-white placeholder-gray-500 outline-none 
                focus:border-primary/40 transition-colors'
            />
            <button className='px-6 py-3 bg-primary hover:bg-primary-dull text-white text-sm 
              font-semibold rounded-r-xl transition-colors cursor-pointer whitespace-nowrap'>
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className='px-6 md:px-16 lg:px-36 pb-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8'>
          
          {/* Brand Column */}
          <div className='lg:col-span-4'>
            <Link to='/' onClick={() => scrollTo(0, 0)}>
              <img alt='QuickShow Logo' className='h-10' src={assets.logo} />
            </Link>
            <p className='mt-5 text-sm leading-relaxed max-w-sm'>
              QuickShow is your go-to platform for seamless movie ticket booking. 
              Browse the latest movies, pick your favorite seats, and enjoy a 
              hassle-free cinema experience — all in just a few clicks.
            </p>

            {/* App Store Badges */}
            <div className='flex items-center gap-3 mt-6'>
              <img src={assets.googlePlay} alt='Get it on Google Play' className='h-10 w-auto cursor-pointer hover:opacity-80 transition-opacity' />
              <img src={assets.appStore} alt='Download on the App Store' className='h-10 w-auto cursor-pointer hover:opacity-80 transition-opacity' />
            </div>
          </div>

          {/* Quick Links */}
          <div className='lg:col-span-2'>
            <h3 className='text-white font-semibold mb-5 text-sm tracking-wider uppercase'>Explore</h3>
            <ul className='space-y-3'>
              {[
                { name: 'Home', to: '/' },
                { name: 'Movies', to: '/movies' },
                { name: 'Theaters', to: '/theaters' },
                { name: 'My Bookings', to: '/my-bookings' },
                { name: 'Favorites', to: '/favorite' },
              ].map(link => (
                <li key={link.name}>
                  <Link 
                    to={link.to} 
                    onClick={() => scrollTo(0, 0)}
                    className='text-sm hover:text-primary transition-colors flex items-center gap-1 group'
                  >
                    {link.name}
                    <ArrowUpRight className='w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all' />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className='lg:col-span-2'>
            <h3 className='text-white font-semibold mb-5 text-sm tracking-wider uppercase'>Company</h3>
            <ul className='space-y-3'>
              {['About Us', 'Careers', 'Press', 'Privacy Policy', 'Terms of Service'].map(item => (
                <li key={item}>
                  <a href='#' className='text-sm hover:text-primary transition-colors flex items-center gap-1 group'>
                    {item}
                    <ArrowUpRight className='w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all' />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className='lg:col-span-4'>
            <h3 className='text-white font-semibold mb-5 text-sm tracking-wider uppercase'>Get in Touch</h3>
            <div className='space-y-4'>
              <a href='mailto:support@quickshow.com' className='flex items-center gap-3 text-sm hover:text-primary transition-colors group'>
                <div className='p-2 bg-white/5 rounded-lg group-hover:bg-primary/10 transition-colors'>
                  <Mail className='w-4 h-4' />
                </div>
                support@quickshow.com
              </a>
              <a href='tel:+918001234567' className='flex items-center gap-3 text-sm hover:text-primary transition-colors group'>
                <div className='p-2 bg-white/5 rounded-lg group-hover:bg-primary/10 transition-colors'>
                  <Phone className='w-4 h-4' />
                </div>
                +91 800 123 4567
              </a>
              <div className='flex items-center gap-3 text-sm'>
                <div className='p-2 bg-white/5 rounded-lg'>
                  <MapPin className='w-4 h-4' />
                </div>
                <span>Bangalore, Karnataka, India</span>
              </div>
            </div>

            {/* Social Links */}
            <div className='mt-6'>
              <p className='text-xs text-gray-500 uppercase tracking-wider mb-3'>Follow Us</p>
              <div className='flex items-center gap-2'>
                {[
                  { icon: Instagram, label: 'Instagram', color: 'hover:text-pink-400' },
                  { icon: Twitter, label: 'Twitter', color: 'hover:text-sky-400' },
                  { icon: Youtube, label: 'YouTube', color: 'hover:text-red-400' },
                  { icon: Facebook, label: 'Facebook', color: 'hover:text-blue-400' },
                ].map(social => (
                  <a
                    key={social.label}
                    href='#'
                    aria-label={social.label}
                    className={`p-2.5 bg-white/5 border border-white/5 rounded-xl ${social.color} 
                      hover:bg-white/10 hover:border-white/10 transition-all cursor-pointer`}
                  >
                    <social.icon className='w-4 h-4' />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='border-t border-white/5'>
        <div className='px-6 md:px-16 lg:px-36 py-5 flex flex-col sm:flex-row items-center justify-between gap-3'>
          <p className='text-xs text-gray-500'>
            © {currentYear} QuickShow. All rights reserved.
          </p>
          <p className='text-xs text-gray-600 flex items-center gap-1'>
            Made with <Heart className='w-3 h-3 text-primary fill-primary' /> in India
          </p>
          <div className='flex items-center gap-4 text-xs text-gray-500'>
            <a href='#' className='hover:text-gray-300 transition-colors'>Privacy</a>
            <span className='text-gray-700'>•</span>
            <a href='#' className='hover:text-gray-300 transition-colors'>Terms</a>
            <span className='text-gray-700'>•</span>
            <a href='#' className='hover:text-gray-300 transition-colors'>Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer