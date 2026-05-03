import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

const PARTICLE_SHAPES = ['circle', 'star', 'diamond', 'dot']

const StarSVG = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const DiamondSVG = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2L22 12L12 22L2 12L12 2Z" />
  </svg>
)

const FloatingParticles = ({ count = 20, className = '' }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
      shape: PARTICLE_SHAPES[Math.floor(Math.random() * PARTICLE_SHAPES.length)],
      opacity: Math.random() * 0.3 + 0.05,
    }))
  }, [count])

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} style={{ zIndex: 0 }}>
      {particles.map((p) => {
        const color = `rgba(248, 69, 101, ${p.opacity})`
        return (
          <motion.div
            key={p.id}
            className="absolute"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            animate={{
              y: [0, -30, 10, -20, 0],
              x: [0, 15, -10, 20, 0],
              opacity: [p.opacity, p.opacity * 1.5, p.opacity * 0.5, p.opacity * 1.2, p.opacity],
              scale: [1, 1.2, 0.8, 1.1, 1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
          >
            {p.shape === 'circle' && (
              <div
                className="rounded-full"
                style={{
                  width: p.size,
                  height: p.size,
                  backgroundColor: color,
                  boxShadow: `0 0 ${p.size * 2}px ${color}`,
                }}
              />
            )}
            {p.shape === 'star' && <StarSVG size={p.size * 2} color={color} />}
            {p.shape === 'diamond' && <DiamondSVG size={p.size * 1.5} color={color} />}
            {p.shape === 'dot' && (
              <div
                className="rounded-full"
                style={{
                  width: p.size * 0.6,
                  height: p.size * 0.6,
                  backgroundColor: `rgba(255, 255, 255, ${p.opacity * 0.5})`,
                  boxShadow: `0 0 ${p.size}px rgba(255, 255, 255, ${p.opacity * 0.3})`,
                }}
              />
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

export default FloatingParticles
