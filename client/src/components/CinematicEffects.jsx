import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ══════════════════════════════════════════════════
   1) CINEMATIC LETTERBOX BARS (widescreen black bars)
   ══════════════════════════════════════════════════ */
export const CinematicLetterbox = ({ className = '' }) => (
  <div className={`absolute inset-0 pointer-events-none z-20 ${className}`}>
    <motion.div
      className="absolute top-0 left-0 right-0 bg-black"
      initial={{ height: '50%' }}
      animate={{ height: '0%' }}
      transition={{ duration: 1.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    />
    <motion.div
      className="absolute bottom-0 left-0 right-0 bg-black"
      initial={{ height: '50%' }}
      animate={{ height: '0%' }}
      transition={{ duration: 1.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    />
  </div>
)

/* ══════════════════════════════════════════════════
   2) FILM COUNTDOWN (classic 5-4-3-2-1 countdown)
   ══════════════════════════════════════════════════ */
export const FilmCountdown = ({ onComplete, className = '' }) => {
  const [count, setCount] = useState(5)
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (count <= 0) {
      setTimeout(() => {
        setShow(false)
        onComplete?.()
      }, 300)
      return
    }
    const timer = setTimeout(() => setCount(c => c - 1), 600)
    return () => clearTimeout(timer)
  }, [count])

  if (!show) return null

  return (
    <motion.div
      className={`fixed inset-0 z-[100] bg-[#09090B] flex items-center justify-center ${className}`}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Scan lines */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
      }} />

      {/* Film grain */}
      <motion.div
        className="absolute inset-0 opacity-[0.06]"
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ duration: 0.3, repeat: Infinity }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />

      {count > 0 ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={count}
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {/* Countdown circle */}
            <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="90" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
              <circle cx="100" cy="100" r="70" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <motion.circle
                cx="100" cy="100" r="90"
                stroke="rgba(248,69,101,0.6)"
                strokeWidth="3"
                strokeDasharray="565"
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: 565 }}
                transition={{ duration: 0.6, ease: 'linear' }}
                strokeLinecap="round"
              />
              {/* Cross hairs */}
              <line x1="100" y1="5" x2="100" y2="195" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
              <line x1="5" y1="100" x2="195" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-7xl font-bold text-white/90 font-mono">
              {count}
            </span>
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.4 }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="35" fill="rgba(248,69,101,0.2)" stroke="rgba(248,69,101,0.5)" strokeWidth="2" />
            <path d="M30 25 L60 40 L30 55 Z" fill="rgba(248,69,101,0.8)" />
          </svg>
        </motion.div>
      )}
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════
   3) ANAMORPHIC LENS FLARES (horizontal streaks)
   ══════════════════════════════════════════════════ */
export const AnamorphicFlare = ({ className = '' }) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} style={{ zIndex: 5 }}>
    {/* Main horizontal flare */}
    <motion.div
      className="absolute top-[35%] left-0 right-0 h-[2px]"
      style={{
        background: 'linear-gradient(90deg, transparent 0%, rgba(248,69,101,0.01) 20%, rgba(100,180,255,0.08) 40%, rgba(248,69,101,0.15) 50%, rgba(100,180,255,0.08) 60%, rgba(248,69,101,0.01) 80%, transparent 100%)',
      }}
      animate={{
        opacity: [0, 0.6, 0],
        x: ['-10%', '5%', '-10%'],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />

    {/* Wide diffused flare */}
    <motion.div
      className="absolute top-[34%] left-0 right-0 h-8"
      style={{
        background: 'linear-gradient(90deg, transparent 10%, rgba(100,150,255,0.03) 35%, rgba(248,69,101,0.06) 50%, rgba(100,150,255,0.03) 65%, transparent 90%)',
        filter: 'blur(8px)',
      }}
      animate={{
        opacity: [0, 0.5, 0],
        x: ['-5%', '3%', '-5%'],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
    />

    {/* Secondary flare (blueish) */}
    <motion.div
      className="absolute top-[55%] left-0 right-0 h-[1px]"
      style={{
        background: 'linear-gradient(90deg, transparent 15%, rgba(100,180,255,0.12) 45%, rgba(255,255,255,0.06) 50%, rgba(100,180,255,0.12) 55%, transparent 85%)',
      }}
      animate={{
        opacity: [0, 0.4, 0],
      }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
    />

    {/* Flare hotspot */}
    <motion.div
      className="absolute top-[34%] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(248,69,101,0.1) 40%, transparent 70%)',
      }}
      animate={{
        scale: [0.5, 1.5, 0.5],
        opacity: [0, 0.8, 0],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
  </div>
)

/* ══════════════════════════════════════════════════
   4) CINEMA SEARCHLIGHTS (dramatic sweeping beams)
   ══════════════════════════════════════════════════ */
export const Searchlights = ({ className = '' }) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} style={{ zIndex: 1 }}>
    {/* Left searchlight */}
    <motion.div
      className="absolute -bottom-10 left-[15%] origin-bottom"
      animate={{ rotate: [-20, 15, -20] }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="w-[200px] h-[600px]" style={{
        background: 'linear-gradient(to top, rgba(248,69,101,0.06) 0%, transparent 100%)',
        clipPath: 'polygon(40% 100%, 60% 100%, 100% 0%, 0% 0%)',
        filter: 'blur(2px)',
      }} />
    </motion.div>

    {/* Right searchlight */}
    <motion.div
      className="absolute -bottom-10 right-[15%] origin-bottom"
      animate={{ rotate: [20, -15, 20] }}
      transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
    >
      <div className="w-[200px] h-[600px]" style={{
        background: 'linear-gradient(to top, rgba(100,150,255,0.04) 0%, transparent 100%)',
        clipPath: 'polygon(40% 100%, 60% 100%, 100% 0%, 0% 0%)',
        filter: 'blur(2px)',
      }} />
    </motion.div>
  </div>
)

/* ══════════════════════════════════════════════════
   5) FILM GRAIN OVERLAY
   ══════════════════════════════════════════════════ */
export const FilmGrain = ({ opacity = 0.04, className = '' }) => (
  <motion.div
    className={`absolute inset-0 pointer-events-none ${className}`}
    style={{ zIndex: 6, mixBlendMode: 'overlay' }}
    animate={{
      backgroundPosition: ['0% 0%', '100% 50%', '50% 100%', '0% 0%'],
    }}
    transition={{ duration: 0.8, repeat: Infinity }}
  >
    <div className="absolute inset-0" style={{
      opacity,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
      backgroundSize: '200px 200px',
    }} />
  </motion.div>
)

/* ══════════════════════════════════════════════════
   6) VIGNETTE EFFECT (dark corners)
   ══════════════════════════════════════════════════ */
export const Vignette = ({ intensity = 0.6, className = '' }) => (
  <div
    className={`absolute inset-0 pointer-events-none ${className}`}
    style={{
      zIndex: 4,
      background: `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,${intensity}) 100%)`,
    }}
  />
)

/* ══════════════════════════════════════════════════
   7) CINEMA MARQUEE (scrolling light border)
   ══════════════════════════════════════════════════ */
export const CinemaMarquee = ({ text = 'NOW SHOWING', className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`relative mx-auto max-w-xl ${className}`}
  >
    <div className="relative border-2 border-primary/20 rounded-xl overflow-hidden">
      {/* Marquee bulb lights along the border */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top row of bulbs */}
        <div className="absolute top-0 left-0 right-0 flex justify-around py-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`t-${i}`}
              className="w-1.5 h-1.5 -mt-[3px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(255,220,100,0.8) 0%, rgba(248,69,101,0.3) 100%)' }}
              animate={{ opacity: i % 2 === 0 ? [1, 0.3, 1] : [0.3, 1, 0.3] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          ))}
        </div>
        {/* Bottom row */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-around py-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`b-${i}`}
              className="w-1.5 h-1.5 -mb-[3px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(255,220,100,0.8) 0%, rgba(248,69,101,0.3) 100%)' }}
              animate={{ opacity: i % 2 === 0 ? [0.3, 1, 0.3] : [1, 0.3, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          ))}
        </div>
      </div>

      {/* Inner content */}
      <div className="bg-gradient-to-b from-gray-900/90 to-[#09090B]/90 backdrop-blur-sm px-6 py-5">
        <div className="overflow-hidden">
          <motion.div
            className="flex items-center gap-16 whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          >
            {[...Array(6)].map((_, i) => (
              <span key={i} className="flex items-center gap-4 text-lg md:text-xl font-bold tracking-[6px] uppercase">
                <span className="text-primary">★</span>
                <span className="bg-gradient-to-r from-white via-primary/80 to-white bg-clip-text text-transparent">{text}</span>
                <span className="text-primary">★</span>
                <span className="text-gray-600 text-sm font-normal tracking-[3px]">QUICKSHOW CINEMAS</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  </motion.div>
)

/* ══════════════════════════════════════════════════
   8) DRAMATIC LIGHT LEAK (colored light bleeding in)
   ══════════════════════════════════════════════════ */
export const LightLeak = ({ className = '' }) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} style={{ zIndex: 3 }}>
    {/* Warm light leak from top-right */}
    <motion.div
      className="absolute -top-20 -right-20 w-[400px] h-[400px]"
      style={{
        background: 'radial-gradient(circle, rgba(255,150,50,0.08) 0%, rgba(248,69,101,0.04) 40%, transparent 70%)',
        filter: 'blur(40px)',
      }}
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.3, 0.7, 0.3],
        x: [0, 30, 0],
        y: [0, 20, 0],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />

    {/* Cool light leak from bottom-left */}
    <motion.div
      className="absolute -bottom-20 -left-20 w-[350px] h-[350px]"
      style={{
        background: 'radial-gradient(circle, rgba(100,150,255,0.06) 0%, rgba(168,85,247,0.03) 40%, transparent 70%)',
        filter: 'blur(40px)',
      }}
      animate={{
        scale: [1.2, 1, 1.2],
        opacity: [0.2, 0.5, 0.2],
        x: [0, -20, 0],
      }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
    />
  </div>
)

/* ══════════════════════════════════════════════════
   9) CINEMATIC RATING BADGE (MPAA-style)
   ══════════════════════════════════════════════════ */
export const RatingBadge = ({ rating = 'PG-13', className = '' }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
    animate={{ opacity: 1, scale: 1, rotate: 0 }}
    transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
    className={`inline-flex ${className}`}
  >
    <div className="relative px-3 py-1.5 border-2 border-white/20 rounded-md bg-black/40 backdrop-blur-sm">
      <span className="text-[11px] font-black tracking-wider text-white/80">{rating}</span>
      <div className="absolute -top-[2px] -left-[2px] w-2 h-2 border-t-2 border-l-2 border-primary/40" />
      <div className="absolute -top-[2px] -right-[2px] w-2 h-2 border-t-2 border-r-2 border-primary/40" />
      <div className="absolute -bottom-[2px] -left-[2px] w-2 h-2 border-b-2 border-l-2 border-primary/40" />
      <div className="absolute -bottom-[2px] -right-[2px] w-2 h-2 border-b-2 border-r-2 border-primary/40" />
    </div>
  </motion.div>
)

/* ══════════════════════════════════════════════════
   10) CAMERA FOCUS BRACKETS (corner viewfinder)
   ══════════════════════════════════════════════════ */
export const FocusBrackets = ({ className = '' }) => (
  <div className={`absolute inset-8 md:inset-16 pointer-events-none ${className}`} style={{ zIndex: 6 }}>
    {/* Top-left */}
    <motion.div
      className="absolute top-0 left-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.2 }}
      transition={{ delay: 1.5 }}
    >
      <div className="w-8 h-8 border-t-2 border-l-2 border-white/30 rounded-tl-sm" />
    </motion.div>
    {/* Top-right */}
    <motion.div
      className="absolute top-0 right-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.2 }}
      transition={{ delay: 1.6 }}
    >
      <div className="w-8 h-8 border-t-2 border-r-2 border-white/30 rounded-tr-sm" />
    </motion.div>
    {/* Bottom-left */}
    <motion.div
      className="absolute bottom-0 left-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.2 }}
      transition={{ delay: 1.7 }}
    >
      <div className="w-8 h-8 border-b-2 border-l-2 border-white/30 rounded-bl-sm" />
    </motion.div>
    {/* Bottom-right */}
    <motion.div
      className="absolute bottom-0 right-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.2 }}
      transition={{ delay: 1.8 }}
    >
      <div className="w-8 h-8 border-b-2 border-r-2 border-white/30 rounded-br-sm" />
    </motion.div>

    {/* Center crosshair */}
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.15, 0] }}
      transition={{ duration: 3, repeat: Infinity, delay: 2 }}
    >
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <line x1="20" y1="0" x2="20" y2="16" stroke="white" strokeWidth="0.5" />
        <line x1="20" y1="24" x2="20" y2="40" stroke="white" strokeWidth="0.5" />
        <line x1="0" y1="20" x2="16" y2="20" stroke="white" strokeWidth="0.5" />
        <line x1="24" y1="20" x2="40" y2="20" stroke="white" strokeWidth="0.5" />
        <circle cx="20" cy="20" r="6" stroke="white" strokeWidth="0.5" fill="none" />
      </svg>
    </motion.div>
  </div>
)
