import React from 'react';
import { Heart, Play, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { animeAPI } from '../api';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const AnimeCard = ({ anime, onLike }) => {
  const { user } = useAuth();
  const isLiked = anime.likedBy?.includes(user?._id);

  const handleLike = async () => {
    try {
      const { data } = await animeAPI.like(anime._id);
      onLike();
      toast.success(data.message);
    } catch (error) {
      toast.error('Failed to update like');
    }
  };

  const handleWatch = () => {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(anime.title)}`, '_blank');
  };

  const handleTalk = () => {
    const message = encodeURIComponent(`Hey I also have watched ${anime.title}`);
    window.open(`https://ig.me/m/jayesh.aswani07?text=${message}`, '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="glass rounded-3xl overflow-hidden yellow-glow transition-all duration-500 border border-white/10 group shadow-2xl"
    >
      <div className="relative h-72 overflow-hidden">
        <img 
          src={anime.imageUrl} 
          alt={anime.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 glass px-3 py-1.5 rounded-xl text-xs font-black text-primary uppercase tracking-widest shadow-lg">
          {anime.type === 'movie' ? 'Movie' : `${anime.seasonsWatched} Seasons`}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-black mb-3 text-white tracking-tight group-hover:text-primary transition-colors">{anime.title}</h3>
        <p className="text-gray-400 text-sm mb-8 line-clamp-2 leading-relaxed font-medium">{anime.description}</p>
        
        <div className="flex items-center justify-between border-t border-white/5 pt-6">
          <div className="flex space-x-3">
            <button 
              onClick={handleLike}
              className={`w-12 h-12 rounded-2xl glass border border-white/10 flex items-center justify-center transition-all group/btn ${isLiked ? 'bg-primary border-primary' : 'hover:bg-primary hover:border-primary'}`}
            >
              <Heart className={`w-5 h-5 transition-colors ${isLiked ? 'text-black fill-black' : 'text-primary group-hover/btn:text-black group-hover/btn:fill-black'}`} />
            </button>
            <button 
              onClick={handleWatch}
              className="w-12 h-12 rounded-2xl glass border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all group/btn"
            >
              <Play className="w-5 h-5 text-primary group-hover/btn:text-black group-hover/btn:fill-black" />
            </button>
            <button 
              onClick={handleTalk}
              className="w-12 h-12 rounded-2xl glass border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all group/btn"
            >
              <MessageCircle className="w-5 h-5 text-primary group-hover/btn:text-black group-hover/btn:fill-black" />
            </button>
          </div>
          <div className="text-right">
            <div className="text-lg font-black text-white leading-none">{anime.likes}</div>
            <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Likes</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnimeCard;
