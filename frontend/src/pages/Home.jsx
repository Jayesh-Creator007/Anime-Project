import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AnimeCard from '../components/AnimeCard';
import { animeAPI } from '../api';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    fetchAnimes();
  }, []);

  const fetchAnimes = async () => {
    try {
      const { data } = await animeAPI.getAll();
      setAnimes(data.slice(0, 3)); // Show first 3 for home
    } catch (error) {
      console.error('Error fetching animes:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="py-20 flex flex-col items-center text-center">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-6xl md:text-8xl font-black mb-6 tracking-tighter"
        >
          ANIME <span className="text-primary">TRACKER</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed"
        >
          Track your journey through the world of anime. Discover new series, log your watched seasons, and share your passion with others.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex space-x-4"
        >
          <Link to="/anime" className="bg-primary text-black px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition-all flex items-center group">
            Explore List <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/about" className="glass border border-primary/20 text-white px-8 py-3 rounded-full font-bold hover:bg-primary/10 transition-all">
            Learn More
          </Link>
        </motion.div>
      </section>

      {/* Intro Section */}
      <section className="py-20 border-t border-white/5">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-white leading-tight">
              Dive into the <br />
              <span className="text-primary">World of Anime</span>
            </h2>
            <p className="text-gray-400 mb-6 text-lg leading-relaxed">
              Anime is a diverse and captivating medium that has captured hearts worldwide. From action-packed shonen to emotional slice-of-life, there's something for everyone.
            </p>
            <div className="flex space-x-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">100+</div>
                <div className="text-sm text-gray-500 uppercase tracking-widest">Series</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-gray-500 uppercase tracking-widest">Episodes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-gray-500 uppercase tracking-widest">Updates</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-video rounded-3xl overflow-hidden glass border border-primary/20 relative z-10">
              <img src="https://images.unsplash.com/photo-1512686096451-a15c19314d59?q=80&w=2070&auto=format&fit=crop" alt="Anime Theme" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Anime I Watched Section */}
      <section className="py-20 border-t border-white/5">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-2">Anime I Watched</h2>
            <p className="text-gray-500">My personal collection and ratings</p>
          </div>
          <Link to="/anime" className="text-primary hover:underline font-semibold flex items-center">
            View All <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {animes.map((anime) => (
            <AnimeCard key={anime._id} anime={anime} onLike={fetchAnimes} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
