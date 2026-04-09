import React from 'react';
import { Heart, Play, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { animeAPI } from '../api';
import { toast } from 'react-toastify';

const AnimeCard = ({ anime, onLike }) => {
  const handleLike = async () => {
    try {
      await animeAPI.like(anime._id);
      onLike();
      toast.success(`Liked ${anime.title}!`);
    } catch (error) {
      toast.error('Failed to like anime');
    }
  };

  const handleWatch = () => {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(anime.title)}`, '_blank');
  };

  const handleTalk = () => {
    const message = encodeURIComponent(`Hey I also have watched ${anime.title}`);
    // Instagram DM format (direct message to a user is harder without username, but we'll use a general intent or just the link)
    // Using a generic IG link as per requirements
    window.open(`https://www.instagram.com/direct/inbox/`, '_blank');
    // Alternatively, if there was a specific username: https://ig.me/m/{username}?text={message}
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="glass rounded-2xl overflow-hidden yellow-glow transition-all duration-300 border border-white/5"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={anime.imageUrl} 
          alt={anime.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-3 right-3 glass px-2 py-1 rounded-lg text-xs font-bold text-primary">
          {anime.seasonsWatched} Seasons
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 text-white">{anime.title}</h3>
        <p className="text-gray-400 text-sm mb-6 line-clamp-2">{anime.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex space-x-3">
            <button 
              onClick={handleLike}
              className="w-10 h-10 rounded-full glass border border-primary/20 flex items-center justify-center hover:bg-primary/20 transition-colors group"
            >
              <Heart className="w-5 h-5 text-primary group-hover:fill-primary" />
            </button>
            <button 
              onClick={handleWatch}
              className="w-10 h-10 rounded-full glass border border-primary/20 flex items-center justify-center hover:bg-primary/20 transition-colors group"
            >
              <Play className="w-5 h-5 text-primary group-hover:fill-primary" />
            </button>
            <button 
              onClick={handleTalk}
              className="w-10 h-10 rounded-full glass border border-primary/20 flex items-center justify-center hover:bg-primary/20 transition-colors group"
            >
              <MessageCircle className="w-5 h-5 text-primary group-hover:fill-primary" />
            </button>
          </div>
          <div className="text-xs text-gray-500 font-medium">
            {anime.likes} Likes • {anime.views} Views
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnimeCard;
