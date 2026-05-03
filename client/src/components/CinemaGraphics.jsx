import React from 'react'
import { motion } from 'framer-motion'

// ─── Film Strip Divider ─────────────────────────────────
export const FilmStripDivider = ({ className = '' }) => (
  <div className={`relative w-full py-6 overflow-hidden ${className}`}>
    <motion.div
      className="flex items-center justify-center gap-1"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {/* Left film strip */}
      <div className="flex items-center">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`l-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="relative"
          >
            <div className="w-8 h-5 border border-primary/20 bg-primary/5 rounded-sm mx-0.5" />
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary/15" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary/15" />
          </motion.div>
        ))}
      </div>

      {/* Center reel icon */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="mx-4 flex-shrink-0"
      >
        <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="22" stroke="rgba(248,69,101,0.3)" strokeWidth="2" />
          <circle cx="24" cy="24" r="16" stroke="rgba(248,69,101,0.2)" strokeWidth="1.5" />
          <circle cx="24" cy="24" r="4" fill="rgba(248,69,101,0.4)" />
          <circle cx="24" cy="10" r="3" fill="rgba(248,69,101,0.2)" />
          <circle cx="24" cy="38" r="3" fill="rgba(248,69,101,0.2)" />
          <circle cx="10" cy="24" r="3" fill="rgba(248,69,101,0.2)" />
          <circle cx="38" cy="24" r="3" fill="rgba(248,69,101,0.2)" />
        </svg>
      </motion.div>

      {/* Right film strip */}
      <div className="flex items-center">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`r-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + i * 0.05 }}
            className="relative"
          >
            <div className="w-8 h-5 border border-primary/20 bg-primary/5 rounded-sm mx-0.5" />
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary/15" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary/15" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  </div>
)

// ─── Spotlight Beams (decorative background effect) ─────
export const SpotlightBeams = ({ className = '' }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
    {/* Left spotlight */}
    <motion.div
      className="absolute -top-20 -left-20"
      animate={{
        opacity: [0.03, 0.08, 0.03],
        rotate: [0, 5, 0],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div
        className="w-[600px] h-[800px] origin-top"
        style={{
          background: 'conic-gradient(from 120deg at 0% 0%, transparent 0deg, rgba(248,69,101,0.1) 15deg, transparent 30deg)',
        }}
      />
    </motion.div>

    {/* Right spotlight */}
    <motion.div
      className="absolute -top-20 -right-20"
      animate={{
        opacity: [0.05, 0.1, 0.05],
        rotate: [0, -5, 0],
      }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
    >
      <div
        className="w-[600px] h-[800px] origin-top"
        style={{
          background: 'conic-gradient(from 40deg at 100% 0%, transparent 0deg, rgba(248,69,101,0.08) 15deg, transparent 30deg)',
        }}
      />
    </motion.div>
  </div>
)

// ─── Popcorn / Ticket decorative icon cluster ───────────
export const CinemaIconCluster = ({ className = '' }) => (
  <motion.div
    className={`flex items-center justify-center gap-6 ${className}`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    {/* Popcorn */}
    <motion.svg
      width="40" height="40" viewBox="0 0 64 64" fill="none"
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path d="M20 28h24l-3 28H23L20 28z" fill="rgba(248,69,101,0.15)" stroke="rgba(248,69,101,0.3)" strokeWidth="1.5" />
      <path d="M20 28c0-6 3-10 6-12s5-1 6 1c1-3 3-5 6-5s5 3 6 6c2-1 5 0 6 4 1 3 0 6 0 6" stroke="rgba(248,69,101,0.3)" strokeWidth="1.5" fill="rgba(248,69,101,0.1)" />
      <path d="M26 28v26M32 28v26M38 28v26" stroke="rgba(248,69,101,0.15)" strokeWidth="1" />
    </motion.svg>

    {/* Movie Ticket */}
    <motion.svg
      width="48" height="40" viewBox="0 0 80 56" fill="none"
      animate={{ rotate: [-2, 2, -2] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <rect x="2" y="4" width="76" height="48" rx="6" fill="rgba(248,69,101,0.08)" stroke="rgba(248,69,101,0.25)" strokeWidth="1.5" />
      <line x1="56" y1="4" x2="56" y2="52" stroke="rgba(248,69,101,0.2)" strokeWidth="1" strokeDasharray="4 3" />
      <rect x="10" y="12" width="38" height="6" rx="2" fill="rgba(248,69,101,0.15)" />
      <rect x="10" y="22" width="28" height="4" rx="1.5" fill="rgba(248,69,101,0.08)" />
      <rect x="10" y="30" width="20" height="4" rx="1.5" fill="rgba(248,69,101,0.08)" />
      <text x="62" y="32" fill="rgba(248,69,101,0.3)" fontSize="8" fontFamily="monospace" textAnchor="middle">🎬</text>
      <circle cx="56" cy="4" r="5" fill="#09090B" />
      <circle cx="56" cy="52" r="5" fill="#09090B" />
    </motion.svg>

    {/* Clapperboard */}
    <motion.svg
      width="40" height="40" viewBox="0 0 64 64" fill="none"
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
    >
      <rect x="8" y="24" width="48" height="32" rx="4" fill="rgba(248,69,101,0.1)" stroke="rgba(248,69,101,0.25)" strokeWidth="1.5" />
      <path d="M8 24l48 0-4-14H12l-4 14z" fill="rgba(248,69,101,0.15)" stroke="rgba(248,69,101,0.25)" strokeWidth="1.5" />
      <line x1="16" y1="10" x2="22" y2="24" stroke="rgba(248,69,101,0.3)" strokeWidth="1.5" />
      <line x1="26" y1="10" x2="32" y2="24" stroke="rgba(248,69,101,0.3)" strokeWidth="1.5" />
      <line x1="36" y1="10" x2="42" y2="24" stroke="rgba(248,69,101,0.3)" strokeWidth="1.5" />
      <line x1="46" y1="10" x2="52" y2="24" stroke="rgba(248,69,101,0.3)" strokeWidth="1.5" />
      <rect x="16" y="32" width="32" height="4" rx="1.5" fill="rgba(248,69,101,0.12)" />
      <rect x="16" y="40" width="20" height="3" rx="1" fill="rgba(248,69,101,0.08)" />
    </motion.svg>
  </motion.div>
)

// ─── Glowing Orb (ambient background decoration) ────────
export const GlowingOrb = ({ color = 'primary', size = 200, top, left, right, bottom, delay = 0, className = '' }) => {
  const colorMap = {
    primary: 'rgba(248, 69, 101, 0.12)',
    blue: 'rgba(59, 130, 246, 0.1)',
    purple: 'rgba(168, 85, 247, 0.1)',
    amber: 'rgba(245, 158, 11, 0.08)',
  }

  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${colorMap[color] || colorMap.primary} 0%, transparent 70%)`,
        top, left, right, bottom,
        filter: `blur(${size / 3}px)`,
        zIndex: 0,
      }}
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  )
}

// ─── Animated grid pattern ──────────────────────────────
export const GridPattern = ({ className = '' }) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} style={{ zIndex: 0 }}>
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(248,69,101,0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(248,69,101,0.3) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    />
    {/* Fade edges */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#09090B] via-transparent to-[#09090B]" />
    <div className="absolute inset-0 bg-gradient-to-r from-[#09090B] via-transparent to-[#09090B]" />
  </div>
)

// ─── Animated Stars Rating Visual ───────────────────────
export const AnimatedStarsDecor = ({ rating = 4, className = '' }) => (
  <div className={`flex items-center gap-1 ${className}`}>
    {[1, 2, 3, 4, 5].map((star) => (
      <motion.svg
        key={star}
        width="18"
        height="18"
        viewBox="0 0 24 24"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: star * 0.1, type: 'spring', stiffness: 300 }}
      >
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill={star <= rating ? 'rgba(248,69,101,0.8)' : 'rgba(248,69,101,0.15)'}
          stroke={star <= rating ? 'rgba(248,69,101,1)' : 'rgba(248,69,101,0.2)'}
          strokeWidth="1"
        />
      </motion.svg>
    ))}
  </div>
)

// ─── Neon Text Glow Effect Wrapper ──────────────────────
export const NeonText = ({ children, className = '' }) => (
  <motion.span
    className={`relative inline-block ${className}`}
    animate={{
      textShadow: [
        '0 0 10px rgba(248,69,101,0.3), 0 0 20px rgba(248,69,101,0.1)',
        '0 0 15px rgba(248,69,101,0.5), 0 0 30px rgba(248,69,101,0.2)',
        '0 0 10px rgba(248,69,101,0.3), 0 0 20px rgba(248,69,101,0.1)',
      ],
    }}
    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
  >
    {children}
  </motion.span>
)
