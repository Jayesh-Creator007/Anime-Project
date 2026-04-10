import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AnimeCard from '../components/AnimeCard';
import { animeAPI } from '../api';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Star, ShieldCheck } from 'lucide-react';

const Home = () => {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    fetchAnimes();
  }, []);

  const fetchAnimes = async () => {
    try {
      const { data } = await animeAPI.getAll();
      setAnimes(data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching animes:', error);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent -z-10 opacity-50 animate-pulse"></div>
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] bg-primary/5 blur-[120px] rounded-full -z-10"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[60%] bg-primary/5 blur-[120px] rounded-full -z-10"></div>

        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-[0.3em] mb-6 border border-primary/20">
              Welcome to the ultimate anime hub
            </span>
            <h1 className="text-7xl md:text-9xl font-black mb-8 tracking-tighter leading-none italic">
              ANIME <br />
              <span className="text-primary drop-shadow-[0_0_20px_rgba(255,215,0,0.4)]">TRACKER</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mb-12 font-medium leading-relaxed mx-auto">
              Master your collection. Discover legendary series. <br className="hidden md:block" />
              Your journey through the world of Japanese animation starts here.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
              <Link to="/anime" className="bg-primary text-black px-12 py-5 rounded-2xl font-black text-xl hover:bg-yellow-400 transition-all flex items-center group shadow-[0_0_30px_rgba(255,215,0,0.3)]">
                START EXPLORING <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link to="/about" className="bg-white/5 border border-white/10 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-white/10 transition-all">
                LEARN MORE
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Intro Section */}
      <section className="py-24 border-t border-white/5 bg-accent/30">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-black mb-8 leading-[1.1] tracking-tight">
              Dive into the <br />
              <span className="text-primary">World of Anime</span>
            </h2>
            <p className="text-lg text-gray-400 mb-10 leading-relaxed font-medium">
              Anime is more than just animation. It's a universe of emotion, action, and storytelling. From the intensity of shonen to the depth of psychological thrillers, find your next obsession.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                <Star className="w-10 h-10 text-primary mb-4" />
                <h4 className="text-xl font-bold mb-2">Curated List</h4>
                <p className="text-sm text-gray-500 font-medium">Only the best series handpicked for you.</p>
              </div>
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                <ShieldCheck className="w-10 h-10 text-primary mb-4" />
                <h4 className="text-xl font-bold mb-2">Safe Community</h4>
                <p className="text-sm text-gray-500 font-medium">Join thousands of fans in a safe space.</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border-4 border-white/5 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=1974&auto=format&fit=crop" 
                alt="Anime Art" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
            <div className="absolute -top-6 -right-6 bg-primary text-black w-24 h-24 rounded-full flex items-center justify-center font-black text-xs uppercase tracking-widest -rotate-12 shadow-2xl">
              Top Rated
            </div>
          </motion.div>
        </div>
      </section>

      {/* Anime I Watched Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <span className="text-primary font-black uppercase tracking-[0.4em] text-xs">Recently Logged</span>
            <h2 className="text-5xl font-black mt-2">ANIME I WATCHED</h2>
          </div>
          <Link to="/anime" className="group flex items-center space-x-2 text-primary font-black uppercase tracking-widest text-sm bg-primary/10 px-6 py-3 rounded-xl border border-primary/20 hover:bg-primary hover:text-black transition-all">
            <span>View Full List</span> <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {animes.length > 0 ? (
            animes.map((anime) => (
              <AnimeCard key={anime._id} anime={anime} onLike={fetchAnimes} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/20">
              <p className="text-gray-500 font-bold italic">No anime logged yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
