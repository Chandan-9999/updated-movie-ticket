import { StarIcon, Ticket } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import timeFormat from "../lib/timeFormat";
import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const {image_base_url, detailedShows}=useAppContext()
  const currency = import.meta.env.VITE_CURRENCY

  if (!movie) return null;

  const cardVariants = {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  }

  // Find the price for this movie from detailedShows
  const showForMovie = detailedShows?.find(show => 
    (show.movie?._id || show.movie) === movie._id
  );
  const showPrice = showForMovie?.showPrice;

  return (
    <motion.div 
      variants={cardVariants}
      whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.2 } }}
      className="group relative flex flex-col justify-between p-3 bg-gray-800/80 backdrop-blur-sm rounded-2xl w-66 cursor-pointer border border-transparent hover:border-primary/20 transition-all duration-300 overflow-hidden">
      
      {/* Card hover glow effect */}
      <div className='absolute -top-16 -right-16 w-36 h-36 rounded-full bg-primary/0 group-hover:bg-primary/10 blur-3xl transition-all duration-500 pointer-events-none' />
      
      {/* Poster */}
      <div className="relative overflow-hidden rounded-lg">
        <img
          onClick={() => {
            navigate(`/movies/${movie._id}`);
            scrollTo(0, 0);
          }}
          src={image_base_url+movie.backdrop_path}
          alt=""
          className="rounded-lg h-52 w-full object-cover object-right-bottom group-hover:scale-110 transition-transform duration-500"
        />
        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
        
        {/* Rating badge on image */}
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
          <StarIcon className="w-3 h-3 text-primary fill-primary"/>
          <span className="text-xs font-semibold">{movie.vote_average.toFixed(1)}</span>
        </div>
      </div>

      <div className="flex justify-between items-center mt-3">
        <p className="font-semibold truncate pr-2 group-hover:text-primary transition-colors">{movie.title}</p>
        {showPrice && <p className="text-sm font-semibold text-primary shrink-0 bg-primary/20 px-2 py-0.5 rounded">{currency}{showPrice}</p>}
      </div>

      <p className="text-sm text-gray-400 mt-2">
        {new Date(movie.release_date).getFullYear()} •{" "}
        {movie.genres
          .slice(0, 2)
          .map((genre) => genre.name)
          .join(" | ")}{" "}
        • {timeFormat(movie.runtime)}
      </p>

      <div className="flex items-center justify-between mt-4 pb-3">
        <motion.button 
          onClick={()=>{navigate(`/movies/${movie._id}`); scrollTo(0,0)}} 
          whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(248, 69, 101, 0.25)' }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 px-4 py-2 text-xs bg-primary hover:bg-primary-dull
          transition rounded-full font-medium cursor-pointer shadow-lg shadow-primary/15"
        >
          <Ticket className="w-3.5 h-3.5" />
          Buy Tickets
        </motion.button>

        <p className="flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1">
            <StarIcon className="w-4 h-4 text-primary fill-primary"/>
            {movie.vote_average.toFixed(1)}
        </p>
      </div>
    </motion.div>
  );
};

export default MovieCard;
