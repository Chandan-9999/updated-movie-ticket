import React, { useState, useEffect, useCallback } from 'react'
import { ArrowRight, CalendarIcon, ClockIcon, StarIcon, ChevronLeft, ChevronRight, PlayCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppContext } from '../context/AppContext'
import { dummyShowsData } from '../assets/assets'
import timeFormat from '../lib/timeFormat'

const SLIDE_DURATION = 6000

const HeroSection = () => {
    const navigate = useNavigate()
    const { shows, image_base_url } = useAppContext()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState(1)
    const [progress, setProgress] = useState(0)

    // Use real shows if available, fallback to dummy data
    const heroMovies = (shows && shows.length > 0 ? shows.filter(s => s != null) : dummyShowsData).slice(0, 5)

    const goToSlide = useCallback((index) => {
        setDirection(index > currentIndex ? 1 : -1)
        setCurrentIndex(index)
        setProgress(0)
    }, [currentIndex])

    const nextSlide = useCallback(() => {
        setDirection(1)
        setCurrentIndex((prev) => (prev + 1) % heroMovies.length)
        setProgress(0)
    }, [heroMovies.length])

    const prevSlide = useCallback(() => {
        setDirection(-1)
        setCurrentIndex((prev) => (prev - 1 + heroMovies.length) % heroMovies.length)
        setProgress(0)
    }, [heroMovies.length])

    // Auto-slide timer
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide()
        }, SLIDE_DURATION)
        return () => clearInterval(timer)
    }, [currentIndex, nextSlide])

    // Progress bar animation
    useEffect(() => {
        setProgress(0)
        const startTime = Date.now()
        const animFrame = () => {
            const elapsed = Date.now() - startTime
            const newProgress = Math.min((elapsed / SLIDE_DURATION) * 100, 100)
            setProgress(newProgress)
            if (newProgress < 100) {
                requestAnimationFrame(animFrame)
            }
        }
        const id = requestAnimationFrame(animFrame)
        return () => cancelAnimationFrame(id)
    }, [currentIndex])

    const movie = heroMovies[currentIndex]
    if (!movie) return null

    const backdropUrl = movie.backdrop_path?.startsWith('http')
        ? movie.backdrop_path
        : `${image_base_url}${movie.backdrop_path}`

    const slideVariants = {
        enter: (dir) => ({ opacity: 0, scale: 1.1, x: dir > 0 ? 60 : -60 }),
        center: { opacity: 1, scale: 1, x: 0 },
        exit: (dir) => ({ opacity: 0, scale: 0.95, x: dir > 0 ? -60 : 60 }),
    }

    return (
        <div className='relative h-screen w-full overflow-hidden'>
            {/* Background Image with Ken Burns effect */}
            <AnimatePresence mode="popLayout" custom={direction}>
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className='absolute inset-0'
                >
                    <motion.img
                        src={backdropUrl}
                        alt={movie.title}
                        className='w-full h-full object-cover'
                        initial={{ scale: 1 }}
                        animate={{ scale: 1.08 }}
                        transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Overlays */}
            <div className='absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent' />
            <div className='absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-black/40' />
            <div className='absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#09090B] to-transparent' />

            {/* Content */}
            <div className='relative z-10 flex flex-col justify-center h-full px-6 md:px-16 lg:px-36'>
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className='max-w-2xl'
                    >
                        {/* Rating Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                            className='flex items-center gap-3 mb-5'
                        >
                            <div className='flex items-center gap-1.5 bg-primary/20 backdrop-blur-md border border-primary/30 px-3 py-1.5 rounded-full'>
                                <StarIcon className='w-4 h-4 text-primary fill-primary' />
                                <span className='text-sm font-semibold text-primary'>
                                    {movie.vote_average?.toFixed(1)}
                                </span>
                            </div>
                            {movie.tagline && (
                                <span className='text-sm text-gray-400 italic tracking-wide'>
                                    "{movie.tagline}"
                                </span>
                            )}
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15, duration: 0.5 }}
                            className='text-4xl sm:text-5xl md:text-[64px] md:leading-[1.1] font-bold tracking-tight'
                        >
                            {movie.title}
                        </motion.h1>

                        {/* Meta Info Pills */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25, duration: 0.5 }}
                            className='flex flex-wrap items-center gap-3 mt-5'
                        >
                            {movie.genres?.slice(0, 3).map((genre, i) => (
                                <span
                                    key={genre.id || i}
                                    className='px-3 py-1 text-xs font-medium rounded-full border border-white/15 bg-white/5 backdrop-blur-sm text-gray-200'
                                >
                                    {genre.name}
                                </span>
                            ))}
                            <span className='flex items-center gap-1.5 text-sm text-gray-300'>
                                <CalendarIcon className='w-3.5 h-3.5' />
                                {new Date(movie.release_date).getFullYear()}
                            </span>
                            {movie.runtime && (
                                <span className='flex items-center gap-1.5 text-sm text-gray-300'>
                                    <ClockIcon className='w-3.5 h-3.5' />
                                    {timeFormat(movie.runtime)}
                                </span>
                            )}
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35, duration: 0.5 }}
                            className='max-w-lg text-gray-300/90 mt-5 text-[15px] leading-relaxed line-clamp-3'
                        >
                            {movie.overview}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45, duration: 0.5 }}
                            className='flex items-center gap-4 mt-8'
                        >
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(248, 69, 101, 0.4)' }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => { navigate(`/movies/${movie._id}`); scrollTo(0, 0) }}
                                className='flex items-center gap-2 px-7 py-3.5 text-sm bg-primary hover:bg-primary-dull transition-all rounded-full font-semibold cursor-pointer shadow-lg shadow-primary/25'
                            >
                                Book Tickets
                                <ArrowRight className='w-4.5 h-4.5' />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => { navigate('/movies'); scrollTo(0, 0) }}
                                className='flex items-center gap-2 px-7 py-3.5 text-sm bg-white/10 backdrop-blur-sm border border-white/15 hover:border-white/30 transition-all rounded-full font-semibold cursor-pointer'
                            >
                                <PlayCircle className='w-4.5 h-4.5' />
                                Explore All
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <div className='hidden md:flex absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 flex-col gap-3'>
                    <motion.button
                        whileHover={{ scale: 1.15, backgroundColor: 'rgba(255,255,255,0.2)' }}
                        whileTap={{ scale: 0.9 }}
                        onClick={prevSlide}
                        className='p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 cursor-pointer transition-colors'
                    >
                        <ChevronLeft className='w-5 h-5' />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.15, backgroundColor: 'rgba(255,255,255,0.2)' }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextSlide}
                        className='p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 cursor-pointer transition-colors'
                    >
                        <ChevronRight className='w-5 h-5' />
                    </motion.button>
                </div>

                {/* Bottom: Slide Indicators with Progress */}
                <div className='absolute bottom-10 left-6 md:left-16 lg:left-36 flex items-center gap-2'>
                    {heroMovies.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className='relative h-1.5 rounded-full overflow-hidden cursor-pointer transition-all duration-300'
                            style={{ width: index === currentIndex ? '48px' : '24px' }}
                        >
                            {/* Background track */}
                            <div className='absolute inset-0 bg-white/20 rounded-full' />
                            {/* Active progress fill */}
                            {index === currentIndex && (
                                <motion.div
                                    className='absolute inset-y-0 left-0 bg-primary rounded-full'
                                    style={{ width: `${progress}%` }}
                                />
                            )}
                            {/* Completed indicator */}
                            {index < currentIndex && (
                                <div className='absolute inset-0 bg-white/50 rounded-full' />
                            )}
                        </button>
                    ))}

                    <span className='text-xs text-gray-400 ml-3 font-mono tracking-wider'>
                        {String(currentIndex + 1).padStart(2, '0')} / {String(heroMovies.length).padStart(2, '0')}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default HeroSection