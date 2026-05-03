import React from 'react'
import { motion } from 'framer-motion'

/* ──────────────────────────────────────────────
   Theater Ceiling Lights
   ────────────────────────────────────────────── */
export const CeilingLights = ({ count = 5, className = '' }) => (
  <div className={`absolute top-0 left-0 right-0 flex justify-around pointer-events-none ${className}`} style={{ zIndex: 1 }}>
    {Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1, duration: 0.5 }}
      >
        {/* Light fixture */}
        <div className="w-3 h-6 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-full" />
        {/* Bulb */}
        <motion.div
          className="w-4 h-4 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(248,69,101,0.6) 0%, rgba(248,69,101,0.2) 60%, transparent 100%)',
            boxShadow: '0 0 12px rgba(248,69,101,0.3), 0 0 30px rgba(248,69,101,0.1)',
          }}
          animate={{
            boxShadow: [
              '0 0 12px rgba(248,69,101,0.3), 0 0 30px rgba(248,69,101,0.1)',
              '0 0 18px rgba(248,69,101,0.5), 0 0 50px rgba(248,69,101,0.15)',
              '0 0 12px rgba(248,69,101,0.3), 0 0 30px rgba(248,69,101,0.1)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
        />
        {/* Light cone */}
        <div
          className="w-16 h-28 opacity-[0.04]"
          style={{
            background: 'linear-gradient(to bottom, rgba(248,69,101,0.4), transparent)',
            clipPath: 'polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)',
          }}
        />
      </motion.div>
    ))}
  </div>
)

/* ──────────────────────────────────────────────
   Theater Side Wall Sconces
   ────────────────────────────────────────────── */
export const WallSconce = ({ side = 'left', className = '' }) => (
  <motion.div
    className={`absolute top-1/3 ${side === 'left' ? 'left-2' : 'right-2'} pointer-events-none hidden lg:flex flex-col items-center gap-16 ${className}`}
    initial={{ opacity: 0, x: side === 'left' ? -20 : 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.3 }}
    style={{ zIndex: 1 }}
  >
    {[0, 1, 2].map((i) => (
      <div key={i} className="flex flex-col items-center">
        {/* Sconce bracket */}
        <div className={`w-6 h-3 bg-gradient-to-b from-gray-700 to-gray-800 ${side === 'left' ? 'rounded-r-full' : 'rounded-l-full'}`} />
        {/* Light glow */}
        <motion.div
          className="w-8 h-8 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,180,100,0.25) 0%, rgba(255,180,100,0.05) 50%, transparent 100%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 0.8 }}
        />
      </div>
    ))}
  </motion.div>
)

/* ──────────────────────────────────────────────
   Theater Curtains (Left & Right)
   ────────────────────────────────────────────── */
export const TheaterCurtains = ({ className = '' }) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} style={{ zIndex: 0 }}>
    {/* Left curtain */}
    <motion.div
      className="absolute top-0 left-0 bottom-0 w-12 md:w-20"
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <div className="h-full w-full" style={{
        background: `
          linear-gradient(90deg, 
            rgba(120,15,30,0.15) 0%, 
            rgba(180,25,50,0.08) 30%, 
            rgba(120,15,30,0.12) 50%, 
            rgba(180,25,50,0.06) 70%, 
            rgba(120,15,30,0.1) 85%,
            transparent 100%
          )
        `,
      }}>
        {/* Curtain folds */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0"
            style={{
              left: `${i * 25}%`,
              width: '2px',
              background: `linear-gradient(to bottom, rgba(248,69,101,0.06), rgba(248,69,101,0.02), rgba(248,69,101,0.04))`,
            }}
          />
        ))}
      </div>
    </motion.div>

    {/* Right curtain */}
    <motion.div
      className="absolute top-0 right-0 bottom-0 w-12 md:w-20"
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <div className="h-full w-full" style={{
        background: `
          linear-gradient(-90deg, 
            rgba(120,15,30,0.15) 0%, 
            rgba(180,25,50,0.08) 30%, 
            rgba(120,15,30,0.12) 50%, 
            rgba(180,25,50,0.06) 70%, 
            rgba(120,15,30,0.1) 85%,
            transparent 100%
          )
        `,
      }}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0"
            style={{
              right: `${i * 25}%`,
              width: '2px',
              background: `linear-gradient(to bottom, rgba(248,69,101,0.06), rgba(248,69,101,0.02), rgba(248,69,101,0.04))`,
            }}
          />
        ))}
      </div>
    </motion.div>

    {/* Top curtain valance */}
    <motion.div
      className="absolute top-0 left-0 right-0 h-6 md:h-10"
      initial={{ y: -40 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
    >
      <div className="h-full w-full" style={{
        background: 'linear-gradient(to bottom, rgba(120,15,30,0.12), transparent)',
        borderBottom: '1px solid rgba(248,69,101,0.06)',
      }}>
        {/* Scalloped edge using repeating radial gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-3" style={{
          backgroundImage: 'radial-gradient(circle at 50% 100%, transparent 6px, rgba(120,15,30,0.06) 6px, rgba(120,15,30,0.06) 7px, transparent 7px)',
          backgroundSize: '24px 12px',
          backgroundRepeat: 'repeat-x',
        }} />
      </div>
    </motion.div>
  </div>
)

/* ──────────────────────────────────────────────
   Projector Beam (from top to screen)
   ────────────────────────────────────────────── */
export const ProjectorBeam = ({ className = '' }) => (
  <motion.div
    className={`absolute pointer-events-none ${className}`}
    style={{
      top: '-20px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 0,
    }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, delay: 0.5 }}
  >
    <motion.div
      animate={{ opacity: [0.03, 0.07, 0.03] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width="300" height="250" viewBox="0 0 300 250" fill="none">
        {/* Main beam cone */}
        <path
          d="M148 0 L150 0 L250 250 L50 250 Z"
          fill="url(#projBeam)"
        />
        {/* Dust particles in the beam */}
        {Array.from({ length: 12 }).map((_, i) => {
          const x = 100 + Math.random() * 100
          const y = 50 + Math.random() * 180
          return (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r={0.8 + Math.random() * 1}
              fill="rgba(255,255,255,0.15)"
              animate={{ 
                y: [y, y - 20, y],
                x: [x, x + (Math.random() - 0.5) * 10, x],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{ 
                duration: 3 + Math.random() * 3, 
                repeat: Infinity, 
                delay: Math.random() * 2,
              }}
            />
          )
        })}
        <defs>
          <linearGradient id="projBeam" x1="150" y1="0" x2="150" y2="250" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="rgba(248,69,101,0.15)" />
            <stop offset="50%" stopColor="rgba(248,69,101,0.04)" />
            <stop offset="100%" stopColor="rgba(248,69,101,0.02)" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  </motion.div>
)

/* ──────────────────────────────────────────────
   Exit Sign (glowing red)
   ────────────────────────────────────────────── */
export const ExitSign = ({ side = 'left', className = '' }) => (
  <motion.div
    className={`absolute bottom-8 ${side === 'left' ? 'left-4' : 'right-4'} pointer-events-none hidden md:block ${className}`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1 }}
    style={{ zIndex: 1 }}
  >
    <motion.div
      className="relative px-3 py-1 rounded border"
      style={{
        background: 'rgba(220,38,38,0.1)',
        borderColor: 'rgba(220,38,38,0.3)',
        boxShadow: '0 0 10px rgba(220,38,38,0.15)',
      }}
      animate={{
        boxShadow: [
          '0 0 10px rgba(220,38,38,0.15)',
          '0 0 15px rgba(220,38,38,0.25)',
          '0 0 10px rgba(220,38,38,0.15)',
        ],
      }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      <span className="text-[9px] font-bold tracking-[2px] uppercase" style={{ color: 'rgba(220,38,38,0.7)' }}>
        EXIT
      </span>
    </motion.div>
  </motion.div>
)

/* ──────────────────────────────────────────────
   Floor Runner Lights (aisle step lights)
   ────────────────────────────────────────────── */
export const AisleLights = ({ className = '' }) => (
  <div className={`absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none ${className}`} style={{ zIndex: 1 }}>
    <div className="flex gap-12 md:gap-20">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(248,69,101,0.5) 0%, transparent 100%)',
            boxShadow: '0 0 6px rgba(248,69,101,0.3)',
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
    </div>
  </div>
)

/* ──────────────────────────────────────────────
   Theater Floor Gradient (depth perspective)
   ────────────────────────────────────────────── */
export const TheaterFloor = ({ className = '' }) => (
  <div className={`absolute bottom-0 left-0 right-0 h-40 pointer-events-none ${className}`} style={{ zIndex: 0 }}>
    <div
      className="w-full h-full"
      style={{
        background: `
          linear-gradient(to top, rgba(15,10,12,0.8) 0%, transparent 100%),
          repeating-linear-gradient(90deg, 
            rgba(248,69,101,0.02) 0px, 
            rgba(248,69,101,0.02) 1px, 
            transparent 1px, 
            transparent 60px
          )
        `,
        transform: 'perspective(500px) rotateX(25deg)',
        transformOrigin: 'bottom center',
      }}
    />
  </div>
)
