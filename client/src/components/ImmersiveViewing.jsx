import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { useAppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

/* ──────────────────────────────────────────────
   Immersive Viewing – Enhanced Cinema Screen
   with floating movie posters & rich animations
   ────────────────────────────────────────────── */

// Individual floating poster card with 3D tilt on hover
const PosterCard = ({ movie, index, image_base_url, navigate, side }) => {
  const cardRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  // Staggered float animation — each poster bobs at its own rhythm
  const floatDuration = 4 + index * 0.7
  const floatDelay = index * 0.3

  return (
    <motion.div
      ref={cardRef}
      className="relative cursor-pointer group"
      initial={{ opacity: 0, x: side === 'left' ? -80 : 80, scale: 0.7 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: floatDelay, ease: [0.25, 0.46, 0.45, 0.94] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => { navigate(`/movies/${movie._id}`); scrollTo(0, 0) }}
    >
      {/* Floating bob animation wrapper */}
      <motion.div
        animate={{
          y: [0, -8, 0, 6, 0],
          rotateZ: side === 'left' ? [-2, 1, -2] : [2, -1, 2],
        }}
        transition={{
          y: { duration: floatDuration, repeat: Infinity, ease: 'easeInOut' },
          rotateZ: { duration: floatDuration * 1.3, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        {/* 3D tilt container */}
        <motion.div
          className="relative"
          animate={hovered ? { scale: 1.12, rotateY: side === 'left' ? 8 : -8 } : { scale: 1, rotateY: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          style={{ transformStyle: 'preserve-3d', perspective: '800px' }}
        >
          {/* Glow aura behind poster */}
          <motion.div
            className="absolute -inset-3 rounded-2xl blur-xl"
            style={{
              background: `radial-gradient(circle, rgba(248,69,101,${hovered ? 0.35 : 0.1}), transparent 70%)`,
            }}
            animate={{ opacity: hovered ? 1 : 0.4 }}
            transition={{ duration: 0.4 }}
          />

          {/* Poster image */}
          <div className="relative w-[120px] h-[175px] md:w-[140px] md:h-[205px] rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 group-hover:ring-primary/50 transition-all duration-300">
            <img
              src={`${image_base_url}${movie.poster_path || movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />

            {/* Shimmer / light sweep on hover */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)',
              }}
              initial={{ x: '-100%' }}
              animate={hovered ? { x: '200%' } : { x: '-100%' }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />

            {/* Bottom gradient overlay with title */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-[11px] font-semibold truncate text-white">{movie.title}</p>
            </div>

            {/* Film-strip perforations on sides */}
            <div className="absolute top-0 left-0 bottom-0 w-[6px] flex flex-col justify-evenly items-center pointer-events-none">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="w-[3px] h-[5px] rounded-sm bg-black/60" />
              ))}
            </div>
            <div className="absolute top-0 right-0 bottom-0 w-[6px] flex flex-col justify-evenly items-center pointer-events-none">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="w-[3px] h-[5px] rounded-sm bg-black/60" />
              ))}
            </div>
          </div>

          {/* Reflection underneath */}
          <div
            className="mt-1 w-[120px] md:w-[140px] h-[40px] rounded-b-xl opacity-20 blur-md mx-auto overflow-hidden"
            style={{ transform: 'scaleY(-0.35)' }}
          >
            <img
              src={`${image_base_url}${movie.poster_path || movie.backdrop_path}`}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// Animated cinema screen with movie playing effect
const EnhancedCinemaScreen = ({ movies, image_base_url }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-rotate backdrops on the screen
  useEffect(() => {
    if (!movies || movies.length === 0) return
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % movies.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [movies])

  return (
    <div className="perspective-[1000px] w-full max-w-3xl mx-auto">
      <motion.div
        initial={{ rotateX: 18, opacity: 0 }}
        whileInView={{ rotateX: 5, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative"
      >
        {/* Screen frame */}
        <div className="relative bg-gradient-to-b from-gray-900 to-gray-950 rounded-t-2xl border border-white/5 p-1 shadow-2xl">
          {/* Screen surface */}
          <div className="relative h-48 md:h-72 rounded-t-xl overflow-hidden bg-black">
            {/* Cycling movie backdrops */}
            <AnimatePresence mode="wait">
              {movies && movies.length > 0 && (
                <motion.img
                  key={currentSlide}
                  src={`${image_base_url}${movies[currentSlide]?.backdrop_path || movies[currentSlide]?.poster_path}`}
                  alt={movies[currentSlide]?.title || ''}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 0.6, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                />
              )}
            </AnimatePresence>

            {/* Film grain noise overlay */}
            <div className="absolute inset-0 opacity-[0.06] z-10" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
            }} />

            {/* Scan lines */}
            <div className="absolute inset-0 z-10 pointer-events-none" style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
            }} />

            {/* Vignette */}
            <div className="absolute inset-0 z-10 pointer-events-none" style={{
              background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)',
            }} />

            {/* Screen light flicker */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent z-10"
              animate={{ opacity: [0.5, 1, 0.3, 0.8, 0.5] }}
              transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 5 }}
            />

            {/* Movie title overlay */}
            <AnimatePresence mode="wait">
              {movies && movies.length > 0 && (
                <motion.div
                  key={`title-${currentSlide}`}
                  className="absolute bottom-4 left-4 right-4 z-20"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <p className="text-[10px] uppercase tracking-[3px] text-primary/80 mb-0.5">Now Playing</p>
                  <p className="text-sm md:text-base font-bold text-white/90 truncate">{movies[currentSlide]?.title}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Slide indicators */}
            {movies && movies.length > 0 && (
              <div className="absolute bottom-3 right-4 z-20 flex gap-1.5">
                {movies.slice(0, Math.min(movies.length, 6)).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    animate={{
                      backgroundColor: i === currentSlide ? 'rgba(248,69,101,0.9)' : 'rgba(255,255,255,0.2)',
                      scale: i === currentSlide ? 1.3 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Screen bottom edge glow */}
          <div className="h-2 bg-gradient-to-r from-transparent via-primary/30 to-transparent rounded-b-xl" />
        </div>

        {/* Projector light cone */}
        <motion.div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-4 h-32"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="w-full h-full" style={{
            background: 'linear-gradient(to bottom, rgba(248,69,101,0.3), transparent)',
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)',
          }} />
        </motion.div>

        {/* 3D reflection on the floor */}
        <div
          className="mt-1 h-12 rounded-b-xl opacity-30 blur-sm"
          style={{
            background: 'linear-gradient(to bottom, rgba(248,69,101,0.08), transparent)',
            transform: 'scaleY(-0.4) translateZ(-10px)',
          }}
        />
      </motion.div>
    </div>
  )
}

// Theater seats row with subtle animation
const TheaterSeats = () => {
  const seatCount = 13
  return (
    <motion.div
      className="flex justify-center items-end gap-0.5 mt-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      {Array.from({ length: seatCount }).map((_, i) => {
        const distFromCenter = Math.abs(i - Math.floor(seatCount / 2))
        const height = 14 - distFromCenter * 0.5
        return (
          <motion.div
            key={i}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.04 }}
          >
            {/* Seat back */}
            <div
              className="rounded-t-md bg-gradient-to-b from-primary/20 to-primary/5 border border-primary/10"
              style={{ width: '18px', height: `${height}px` }}
            />
            {/* Seat bottom */}
            <div className="w-[18px] h-[6px] rounded-b-sm bg-primary/10 border-x border-b border-primary/10" />
          </motion.div>
        )
      })}
    </motion.div>
  )
}

// Main Immersive Viewing component
const ImmersiveViewing = () => {
  const { shows, image_base_url } = useAppContext()
  const navigate = useNavigate()

  // Pick movies for posters (left and right of screen)
  const allMovies = (shows || []).filter(m => m && (m.poster_path || m.backdrop_path))
  const leftPosters = allMovies.slice(0, 3)
  const rightPosters = allMovies.slice(3, 6)
  const screenMovies = allMovies.slice(0, 6)

  return (
    <div className="relative py-16 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-primary/[0.03] blur-3xl" />
        <motion.div
          className="absolute top-10 left-10 w-64 h-64 rounded-full bg-purple-500/[0.04] blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-56 h-56 rounded-full bg-blue-500/[0.04] blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10 relative z-10"
      >
        <motion.p
          className="text-xs uppercase tracking-[4px] text-primary/60 mb-3"
          initial={{ opacity: 0, letterSpacing: '2px' }}
          whileInView={{ opacity: 1, letterSpacing: '4px' }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          Immersive Viewing
        </motion.p>
        <h2 className="text-2xl md:text-3xl font-bold">
          The Big Screen{' '}
          <span className="bg-gradient-to-r from-primary via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Awaits
          </span>
        </h2>
        <p className="text-gray-500 text-sm mt-2">Explore what's playing on the silver screen</p>
      </motion.div>

      {/* Main layout: posters – screen – posters */}
      <div className="relative z-10 flex items-center justify-center gap-4 md:gap-8 lg:gap-12 px-4 max-w-7xl mx-auto">
        {/* Left posters column */}
        <div className="hidden md:flex flex-col gap-4 items-end flex-shrink-0">
          {leftPosters.map((movie, i) => (
            <PosterCard
              key={movie._id}
              movie={movie}
              index={i}
              image_base_url={image_base_url}
              navigate={navigate}
              side="left"
            />
          ))}
        </div>

        {/* Center: Cinema screen + seats */}
        <div className="flex-1 max-w-3xl">
          <EnhancedCinemaScreen movies={screenMovies} image_base_url={image_base_url} />
          <TheaterSeats />
        </div>

        {/* Right posters column */}
        <div className="hidden md:flex flex-col gap-4 items-start flex-shrink-0">
          {rightPosters.map((movie, i) => (
            <PosterCard
              key={movie._id}
              movie={movie}
              index={i + 3}
              image_base_url={image_base_url}
              navigate={navigate}
              side="right"
            />
          ))}
        </div>
      </div>

      {/* Mobile: horizontal scrolling poster strip */}
      <div className="md:hidden mt-8 relative z-10">
        <div className="flex gap-4 overflow-x-auto px-6 pb-4 snap-x snap-mandatory scrollbar-hide">
          {allMovies.slice(0, 6).map((movie, i) => (
            <div key={movie._id} className="snap-center flex-shrink-0">
              <PosterCard
                movie={movie}
                index={i}
                image_base_url={image_base_url}
                navigate={navigate}
                side={i % 2 === 0 ? 'left' : 'right'}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Decorative film strip bottom */}
      <motion.div
        className="mt-12 flex justify-center gap-2 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      >
        {Array.from({ length: 7 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-10 h-7 rounded-sm border border-primary/15 bg-primary/[0.03] flex items-center justify-center"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
          >
            <div className="w-6 h-4 rounded-[2px] bg-primary/10" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default ImmersiveViewing
