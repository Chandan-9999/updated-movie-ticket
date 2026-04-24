import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'
import { SearchIcon, XIcon, Clock3Icon, StarIcon } from 'lucide-react'

const SearchOverlay = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const inputRef = useRef(null)
    const navigate = useNavigate()
    const { shows, image_base_url } = useAppContext()

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current.focus(), 200)
        }
        if (!isOpen) {
            setQuery('')
            setResults([])
        }
    }, [isOpen])

    useEffect(() => {
        if (!query.trim()) {
            setResults([])
            return
        }

        const searchTerm = query.toLowerCase()
        const matched = shows.filter(movie =>
            movie.title?.toLowerCase().includes(searchTerm) ||
            movie.overview?.toLowerCase().includes(searchTerm) ||
            movie.genre_ids_names?.some(g => g.toLowerCase().includes(searchTerm))
        ).slice(0, 8)

        setResults(matched)
    }, [query, shows])

    const handleSelect = (movieId) => {
        navigate(`/movies/${movieId}`)
        scrollTo(0, 0)
        onClose()
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose()
    }

    const runtimeFormat = (min) => {
        if (!min) return ''
        const h = Math.floor(min / 60)
        const m = min % 60
        return `${h}h ${m}m`
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className='fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex justify-center pt-24 px-4'
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, y: -30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className='w-full max-w-2xl h-max'
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Search Input */}
                        <div className='relative'>
                            <SearchIcon className='absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
                            <input
                                ref={inputRef}
                                type='text'
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder='Search movies, genres...'
                                className='w-full pl-14 pr-12 py-4 bg-gray-900/90 border border-gray-700 
                                rounded-2xl text-lg text-white placeholder-gray-500 outline-none 
                                focus:border-primary/50 transition-colors'
                            />
                            {query && (
                                <button
                                    onClick={() => setQuery('')}
                                    className='absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer'
                                >
                                    <XIcon className='w-5 h-5' />
                                </button>
                            )}
                        </div>

                        {/* Results */}
                        {results.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className='mt-3 bg-gray-900/95 border border-gray-700 rounded-2xl overflow-hidden max-h-[60vh] overflow-y-auto'
                            >
                                {results.map((movie, index) => (
                                    <motion.div
                                        key={movie._id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => handleSelect(movie._id)}
                                        className='flex items-center gap-4 p-4 hover:bg-white/5 cursor-pointer 
                                        transition-colors border-b border-gray-800 last:border-b-0'
                                    >
                                        <img
                                            src={image_base_url + movie.poster_path}
                                            alt={movie.title}
                                            className='w-12 h-16 object-cover rounded-lg flex-shrink-0'
                                        />
                                        <div className='flex-1 min-w-0'>
                                            <p className='font-semibold text-white truncate'>{movie.title}</p>
                                            <div className='flex items-center gap-3 mt-1 text-xs text-gray-400'>
                                                {movie.runtime && (
                                                    <span className='flex items-center gap-1'>
                                                        <Clock3Icon className='w-3 h-3' />
                                                        {runtimeFormat(movie.runtime)}
                                                    </span>
                                                )}
                                                {movie.vote_average && (
                                                    <span className='flex items-center gap-1'>
                                                        <StarIcon className='w-3 h-3 text-yellow-500' />
                                                        {movie.vote_average.toFixed(1)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className='text-primary text-xs font-medium px-3 py-1 bg-primary/10 rounded-full flex-shrink-0'>
                                            View
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}

                        {/* No Results */}
                        {query.trim() && results.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className='mt-3 bg-gray-900/95 border border-gray-700 rounded-2xl p-8 text-center'
                            >
                                <p className='text-gray-400'>No movies found for "<span className='text-white'>{query}</span>"</p>
                            </motion.div>
                        )}

                        {/* Hint */}
                        {!query && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className='mt-3 text-center'
                            >
                                <p className='text-gray-500 text-sm'>Press <kbd className='px-2 py-0.5 bg-gray-800 rounded text-xs'>ESC</kbd> to close</p>
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default SearchOverlay
