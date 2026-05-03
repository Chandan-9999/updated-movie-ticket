import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useAppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

/* ──────────────────────────────────────────────
   1) 3D Rotating Film Reel
   ────────────────────────────────────────────── */
export const FilmReel3D = ({ size = 180, className = '' }) => (
  <div className={`perspective-[800px] ${className}`}>
    <motion.div
      animate={{ rotateY: 360 }}
      transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      style={{ transformStyle: 'preserve-3d', width: size, height: size }}
      className="relative"
    >
      {/* Front face */}
      <div className="absolute inset-0" style={{ transform: 'translateZ(10px)' }}>
        <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="95" stroke="rgba(248,69,101,0.3)" strokeWidth="3" />
          <circle cx="100" cy="100" r="80" stroke="rgba(248,69,101,0.15)" strokeWidth="2" />
          <circle cx="100" cy="100" r="20" fill="rgba(248,69,101,0.25)" stroke="rgba(248,69,101,0.4)" strokeWidth="2" />
          {/* Reel holes */}
          {[0, 60, 120, 180, 240, 300].map((angle) => {
            const r = 55
            const x = 100 + r * Math.cos((angle * Math.PI) / 180)
            const y = 100 + r * Math.sin((angle * Math.PI) / 180)
            return <circle key={angle} cx={x} cy={y} r="12" fill="rgba(9,9,11,0.8)" stroke="rgba(248,69,101,0.2)" strokeWidth="1.5" />
          })}
          {/* Spokes */}
          {[0, 60, 120, 180, 240, 300].map((angle) => {
            const x1 = 100 + 20 * Math.cos((angle * Math.PI) / 180)
            const y1 = 100 + 20 * Math.sin((angle * Math.PI) / 180)
            const x2 = 100 + 80 * Math.cos((angle * Math.PI) / 180)
            const y2 = 100 + 80 * Math.sin((angle * Math.PI) / 180)
            return <line key={`s-${angle}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(248,69,101,0.15)" strokeWidth="2" />
          })}
        </svg>
      </div>
      {/* Back face */}
      <div className="absolute inset-0" style={{ transform: 'translateZ(-10px) rotateY(180deg)' }}>
        <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="95" stroke="rgba(168,85,247,0.2)" strokeWidth="3" />
          <circle cx="100" cy="100" r="80" stroke="rgba(168,85,247,0.1)" strokeWidth="2" />
          <circle cx="100" cy="100" r="20" fill="rgba(168,85,247,0.15)" stroke="rgba(168,85,247,0.3)" strokeWidth="2" />
          {[0, 60, 120, 180, 240, 300].map((angle) => {
            const r = 55
            const x = 100 + r * Math.cos((angle * Math.PI) / 180)
            const y = 100 + r * Math.sin((angle * Math.PI) / 180)
            return <circle key={angle} cx={x} cy={y} r="12" fill="rgba(9,9,11,0.8)" stroke="rgba(168,85,247,0.15)" strokeWidth="1.5" />
          })}
        </svg>
      </div>
    </motion.div>
  </div>
)

/* ──────────────────────────────────────────────
   2) 3D Film Projector with Light Beam
   ────────────────────────────────────────────── */
export const FilmProjector3D = ({ className = '' }) => (
  <div className={`perspective-[1000px] ${className}`}>
    <motion.div
      initial={{ rotateX: 10, rotateY: -15 }}
      animate={{ rotateX: [10, 5, 10], rotateY: [-15, -10, -15] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      style={{ transformStyle: 'preserve-3d' }}
      className="relative"
    >
      {/* Projector body */}
      <svg width="220" height="180" viewBox="0 0 220 180" fill="none" className="drop-shadow-2xl">
        {/* Body */}
        <rect x="50" y="60" width="120" height="80" rx="12" fill="rgba(30,30,40,0.9)" stroke="rgba(248,69,101,0.25)" strokeWidth="1.5" />
        {/* Lens */}
        <ellipse cx="50" cy="90" rx="18" ry="22" fill="rgba(248,69,101,0.1)" stroke="rgba(248,69,101,0.4)" strokeWidth="2" />
        <ellipse cx="50" cy="90" rx="10" ry="14" fill="rgba(248,69,101,0.2)" stroke="rgba(248,69,101,0.5)" strokeWidth="1.5" />
        <ellipse cx="50" cy="90" rx="4" ry="6" fill="rgba(248,69,101,0.6)" />
        {/* Top reel */}
        <circle cx="90" cy="50" r="28" fill="rgba(20,20,30,0.95)" stroke="rgba(248,69,101,0.2)" strokeWidth="1.5" />
        <circle cx="90" cy="50" r="8" fill="rgba(248,69,101,0.15)" stroke="rgba(248,69,101,0.3)" strokeWidth="1" />
        {[0, 72, 144, 216, 288].map((a) => {
          const x = 90 + 18 * Math.cos((a * Math.PI) / 180)
          const y = 50 + 18 * Math.sin((a * Math.PI) / 180)
          return <circle key={a} cx={x} cy={y} r="4" fill="rgba(9,9,11,0.9)" stroke="rgba(248,69,101,0.15)" strokeWidth="0.8" />
        })}
        {/* Bottom reel */}
        <circle cx="140" cy="50" r="22" fill="rgba(20,20,30,0.95)" stroke="rgba(248,69,101,0.15)" strokeWidth="1.5" />
        <circle cx="140" cy="50" r="6" fill="rgba(248,69,101,0.1)" stroke="rgba(248,69,101,0.2)" strokeWidth="1" />
        {/* Buttons */}
        <circle cx="80" cy="100" r="4" fill="rgba(248,69,101,0.5)" />
        <circle cx="95" cy="100" r="4" fill="rgba(59,130,246,0.4)" />
        <circle cx="110" cy="100" r="4" fill="rgba(34,197,94,0.4)" />
        {/* Vents */}
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={120} y={90 + i * 8} width="40" height="3" rx="1.5" fill="rgba(255,255,255,0.04)" />
        ))}
        {/* Legs */}
        <rect x="70" y="140" width="8" height="20" rx="2" fill="rgba(40,40,50,0.9)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        <rect x="145" y="140" width="8" height="20" rx="2" fill="rgba(40,40,50,0.9)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      </svg>

      {/* Projector beam */}
      <motion.div
        className="absolute top-[60px] -left-[100px]"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="140" height="120" viewBox="0 0 140 120" fill="none">
          <path
            d="M140 45 L0 0 L0 120 L140 75 Z"
            fill="url(#projectorBeam)"
            opacity="0.6"
          />
          <defs>
            <linearGradient id="projectorBeam" x1="1" y1="0.5" x2="0" y2="0.5">
              <stop offset="0%" stopColor="rgba(248,69,101,0.3)" />
              <stop offset="100%" stopColor="rgba(248,69,101,0)" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </motion.div>
  </div>
)

/* ──────────────────────────────────────────────
   3) 3D Floating Movie Poster Cards
   ────────────────────────────────────────────── */
export const FloatingPosters3D = ({ className = '' }) => {
  const { shows, image_base_url } = useAppContext()
  const navigate = useNavigate()
  const posters = (shows || []).slice(0, 5)

  if (posters.length === 0) return null

  const positions = [
    { x: 0, y: 0, z: 0, rotateY: -25, rotateX: 5, scale: 1 },
    { x: 200, y: -30, z: -60, rotateY: -10, rotateX: 3, scale: 0.9 },
    { x: 400, y: 10, z: -120, rotateY: 5, rotateX: -2, scale: 0.8 },
    { x: -200, y: -20, z: -40, rotateY: -35, rotateX: 4, scale: 0.85 },
    { x: -400, y: 15, z: -100, rotateY: -45, rotateX: -3, scale: 0.75 },
  ]

  return (
    <div className={`perspective-[1200px] relative h-[350px] flex items-center justify-center ${className}`}>
      {posters.map((movie, i) => {
        const pos = positions[i] || positions[0]
        return (
          <motion.div
            key={movie._id}
            className="absolute cursor-pointer group"
            style={{
              transformStyle: 'preserve-3d',
              left: '50%',
              top: '50%',
            }}
            initial={{
              x: pos.x,
              y: pos.y,
              rotateY: pos.rotateY,
              rotateX: pos.rotateX,
              scale: pos.scale,
              opacity: 0,
            }}
            animate={{
              x: pos.x,
              y: [pos.y, pos.y - 10, pos.y],
              rotateY: pos.rotateY,
              rotateX: pos.rotateX,
              scale: pos.scale,
              opacity: 1,
            }}
            transition={{
              y: { duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut' },
              opacity: { duration: 0.8, delay: i * 0.15 },
            }}
            whileHover={{
              scale: pos.scale * 1.15,
              rotateY: 0,
              rotateX: 0,
              z: 50,
              transition: { duration: 0.3 },
            }}
            onClick={() => { navigate(`/movies/${movie._id}`); scrollTo(0, 0) }}
          >
            <div className="relative w-[140px] h-[200px] rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 group-hover:ring-primary/40 transition-all duration-300">
              <img
                src={`${image_base_url}${movie.poster_path || movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Bottom title overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-xs font-semibold truncate">{movie.title}</p>
              </div>
              {/* 3D shadow underneath */}
              <div
                className="absolute -bottom-4 left-2 right-2 h-8 rounded-xl blur-xl bg-black/40"
                style={{ transform: 'translateZ(-20px) rotateX(60deg)' }}
              />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

/* ──────────────────────────────────────────────
   4) 3D Cinema Screen with Depth
   ────────────────────────────────────────────── */
export const CinemaScreen3D = ({ className = '' }) => (
  <div className={`perspective-[1000px] w-full max-w-3xl mx-auto ${className}`}>
    <motion.div
      initial={{ rotateX: 15 }}
      whileInView={{ rotateX: 5 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      style={{ transformStyle: 'preserve-3d' }}
      className="relative"
    >
      {/* Screen frame */}
      <div className="relative bg-gradient-to-b from-gray-900 to-gray-950 rounded-t-2xl border border-white/5 p-1 shadow-2xl">
        {/* Screen surface */}
        <div className="relative h-48 md:h-72 rounded-t-xl overflow-hidden bg-black">
          {/* Film grain noise */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
          }} />

          {/* Animated countdown / projector flicker */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ opacity: [0.03, 0.08, 0.03] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              <circle cx="60" cy="60" r="50" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
              <circle cx="60" cy="60" r="35" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <line x1="60" y1="10" x2="60" y2="110" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
              <line x1="10" y1="60" x2="110" y2="60" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
            </svg>
          </motion.div>

          {/* Screen light flicker */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent"
            animate={{ opacity: [0.5, 1, 0.3, 0.8, 0.5] }}
            transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 4 }}
          />
        </div>

        {/* Screen bottom edge glow */}
        <div className="h-2 bg-gradient-to-r from-transparent via-primary/20 to-transparent rounded-b-xl" />
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

/* ──────────────────────────────────────────────
   5) 3D Ticket with Flip Animation
   ────────────────────────────────────────────── */
export const Ticket3D = ({ className = '' }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => setIsFlipped(prev => !prev), 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`perspective-[800px] cursor-pointer ${className}`} onClick={() => setIsFlipped(!isFlipped)}>
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative w-[260px] h-[140px]"
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="w-full h-full bg-gradient-to-br from-primary/90 via-primary to-pink-600 p-5 flex flex-col justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[3px] text-white/60">QuickShow</p>
              <p className="text-lg font-bold mt-1">Movie Ticket</p>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[9px] text-white/50 uppercase">Seat</p>
                <p className="text-sm font-bold">A1 - A3</p>
              </div>
              <div>
                <p className="text-[9px] text-white/50 uppercase">Time</p>
                <p className="text-sm font-bold">7:30 PM</p>
              </div>
              <div>
                <p className="text-[9px] text-white/50 uppercase">Screen</p>
                <p className="text-sm font-bold">IMAX 4</p>
              </div>
            </div>
            {/* Perforated line */}
            <div className="absolute right-[60px] top-0 bottom-0 border-r-2 border-dashed border-white/20" />
            {/* Stub circle cutouts */}
            <div className="absolute right-[55px] -top-2 w-4 h-4 rounded-full bg-[#09090B]" />
            <div className="absolute right-[55px] -bottom-2 w-4 h-4 rounded-full bg-[#09090B]" />
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 p-5 flex flex-col items-center justify-center border border-white/10">
            <div className="w-32 h-8 bg-white/90 rounded mb-3" />
            <p className="text-[10px] text-gray-400 tracking-wider">SCAN TO ENTER</p>
            <div className="grid grid-cols-5 gap-0.5 mt-3">
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className={`w-2 h-2 ${Math.random() > 0.5 ? 'bg-white/70' : 'bg-transparent'}`} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   6) 3D Popcorn Bucket
   ────────────────────────────────────────────── */
export const PopcornBucket3D = ({ className = '' }) => (
  <div className={`perspective-[600px] ${className}`}>
    <motion.div
      animate={{ rotateY: [-5, 5, -5], rotateX: [2, -2, 2] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <svg width="100" height="130" viewBox="0 0 100 130" fill="none">
        {/* Bucket body */}
        <path d="M20 45 L10 125 L90 125 L80 45 Z" fill="url(#bucketGrad)" stroke="rgba(248,69,101,0.3)" strokeWidth="1.5" />
        {/* Red stripes */}
        <path d="M25 45 L17 125" stroke="rgba(248,69,101,0.4)" strokeWidth="8" />
        <path d="M45 45 L39 125" stroke="rgba(248,69,101,0.4)" strokeWidth="8" />
        <path d="M65 45 L61 125" stroke="rgba(248,69,101,0.4)" strokeWidth="8" />
        {/* Popcorn kernels */}
        {[
          [35, 30], [50, 25], [65, 32], [42, 18], [58, 15],
          [30, 40], [70, 38], [50, 38], [25, 35], [75, 42],
          [48, 10], [38, 12], [55, 20], [62, 22], [45, 35],
        ].map(([cx, cy], i) => (
          <motion.ellipse
            key={i}
            cx={cx} cy={cy}
            rx={6 + Math.random() * 3} ry={5 + Math.random() * 2}
            fill="rgba(255,235,170,0.85)"
            stroke="rgba(220,180,80,0.5)"
            strokeWidth="0.5"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
        <defs>
          <linearGradient id="bucketGrad" x1="50" y1="45" x2="50" y2="125" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="rgba(248,69,101,0.15)" />
            <stop offset="100%" stopColor="rgba(248,69,101,0.05)" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  </div>
)
