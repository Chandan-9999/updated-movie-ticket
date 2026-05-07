import React from 'react'
import HeroSection from '../components/HeroSection'
import FeaturedSection from '../components/FeaturedSection'
import TrailersSection from '../components/TrailersSection'
import { FilmStripDivider, CinemaIconCluster, SpotlightBeams, GlowingOrb, GridPattern } from '../components/CinemaGraphics'
import FloatingParticles from '../components/FloatingParticles'
import { motion } from 'framer-motion'
import StatsSection from '../components/StatsSection'
import ExperienceBanner from '../components/ExperienceBanner'
import { FloatingPosters3D, CinemaScreen3D, Ticket3D, PopcornBucket3D, FilmReel3D, FilmProjector3D } from '../components/Cinema3D'
import ImmersiveViewing from '../components/ImmersiveViewing'
import { Searchlights, CinemaMarquee, CinematicLetterbox } from '../components/CinematicEffects'

const Home = () => {
  return (
    <div className='relative'>
      {/* Letterbox opening effect */}
      <CinematicLetterbox />

      {/* Global atmospheric effects */}
      <FloatingParticles count={25} />

      {/* Sweeping searchlight beams */}
      <Searchlights />

      <HeroSection/>

      {/* Film strip divider between hero and featured */}
      <FilmStripDivider />

      <div className='relative'>
        <SpotlightBeams />
        <FeaturedSection/>
      </div>

      {/* ─── Cinema Marquee ─── */}
      <CinemaMarquee text='NOW SHOWING' className='my-12 px-6' />

      {/* ─── 3D Floating Movie Posters Section ─── */}
      <div className='relative py-16 overflow-hidden'>
        <GridPattern />
        <GlowingOrb color='purple' size={400} top='-100px' left='-100px' delay={0} />
        <GlowingOrb color='blue' size={300} bottom='-50px' right='-80px' delay={2} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-4 relative z-10'
        >
          <p className='text-xs uppercase tracking-[4px] text-primary/60 mb-3'>Explore in 3D</p>
          <h2 className='text-3xl md:text-4xl font-bold'>
            Featured <span className='bg-gradient-to-r from-primary via-pink-400 to-purple-400 bg-clip-text text-transparent'>Collection</span>
          </h2>
          <p className='text-gray-500 text-sm mt-2'>Click a poster to explore</p>
        </motion.div>

        <FloatingPosters3D className='mt-8' />
      </div>

      {/* Cinema icon cluster decoration */}
      <div className='py-10'>
        <CinemaIconCluster />
      </div>

      {/* ─── 3D Cinema Experience Strip ─── */}
      <div className='relative px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden'>
        <SpotlightBeams />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-12 relative z-10'
        >
          <p className='text-xs uppercase tracking-[4px] text-primary/60 mb-3'>The Full Experience</p>
          <h2 className='text-3xl md:text-4xl font-bold'>
            Step Inside the <span className='bg-gradient-to-r from-primary via-pink-400 to-purple-400 bg-clip-text text-transparent'>Cinema</span>
          </h2>
        </motion.div>

        {/* 3D Objects Grid */}
        <div className='relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto'>
          {/* Film Projector */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
            className='flex flex-col items-center gap-4 p-8 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-sm hover:border-primary/20 transition-colors'
          >
            <FilmProjector3D />
            <p className='text-sm font-semibold text-gray-300'>Film Projector</p>
            <p className='text-xs text-gray-500 text-center'>Classic cinema technology brought to life</p>
          </motion.div>

          {/* 3D Ticket */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className='flex flex-col items-center gap-4 p-8 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-sm hover:border-primary/20 transition-colors'
          >
            <Ticket3D />
            <p className='text-sm font-semibold text-gray-300 mt-4'>Your Ticket</p>
            <p className='text-xs text-gray-500 text-center'>Tap to flip — digital tickets made beautiful</p>
          </motion.div>

          {/* Popcorn + Reel */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className='flex flex-col items-center gap-4 p-8 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-sm hover:border-primary/20 transition-colors'
          >
            <div className='flex items-end gap-2'>
              <PopcornBucket3D />
              <FilmReel3D size={80} />
            </div>
            <p className='text-sm font-semibold text-gray-300'>Cinema Essentials</p>
            <p className='text-xs text-gray-500 text-center'>Every experience needs the perfect combo</p>
          </motion.div>
        </div>
      </div>

      {/* Stats section */}
      <StatsSection />

      {/* ─── Immersive Viewing with Posters ─── */}
      <ImmersiveViewing />

      {/* Film strip divider */}
      <FilmStripDivider className='my-4' />

      <div className='relative'>
        <GridPattern />
        <TrailersSection/>
      </div>

      {/* Experience banner above footer */}
      <ExperienceBanner />
    </div>
  )
}

export default Home