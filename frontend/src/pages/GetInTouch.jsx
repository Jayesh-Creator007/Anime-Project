import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ExternalLink, Send } from 'lucide-react';

const GetInTouch = () => {
  return (
    <div className="bg-black text-white min-h-screen pt-32">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <span className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-4 inline-block">Connect with me</span>
          <h1 className="text-7xl md:text-9xl font-black mb-8 tracking-tighter leading-none italic">
            GET IN <br />
            <span className="text-primary drop-shadow-[0_0_20px_rgba(255,215,0,0.4)]">TOUCH</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl font-medium leading-relaxed mx-auto">
            I'm always open to discussing new anime, projects, or creative opportunities.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8"
        >
          <a 
            href="https://www.instagram.com/jayesh.aswani07/" 
            target="_blank" 
            rel="noreferrer"
            className="bg-primary text-black px-12 py-6 rounded-3xl font-black text-2xl hover:bg-yellow-400 transition-all flex items-center group shadow-[0_0_30px_rgba(255,215,0,0.3)]"
          >
            VIEW INSTAGRAM <ExternalLink className="ml-3 w-7 h-7 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
          
          <a 
            href="https://ig.me/m/jayesh.aswani07" 
            target="_blank" 
            rel="noreferrer"
            className="bg-white/5 border border-white/10 text-white px-12 py-6 rounded-3xl font-black text-2xl hover:bg-white/10 transition-all flex items-center group"
          >
            MESSAGE ME <MessageCircle className="ml-3 w-7 h-7 group-hover:scale-110 transition-transform text-primary" />
          </a>
        </motion.div>

        {/* Decorative elements */}
        <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-12 opacity-30">
          <div className="flex flex-col items-center">
            <Instagram className="w-8 h-8 mb-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Social</span>
          </div>
          <div className="flex flex-col items-center">
            <Send className="w-8 h-8 mb-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Direct</span>
          </div>
          <div className="flex flex-col items-center">
            <Star className="w-8 h-8 mb-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Favorite</span>
          </div>
          <div className="flex flex-col items-center">
            <MessageCircle className="w-8 h-8 mb-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Chat</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
