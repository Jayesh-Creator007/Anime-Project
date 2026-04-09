import React from 'react';
import { motion } from 'framer-motion';
import { History, BookOpen, Heart, Users } from 'lucide-react';

const About = () => {
  const features = [
    { icon: <History className="w-8 h-8 text-primary" />, title: 'Rich History', desc: 'Anime has evolved from traditional hand-drawn animation to cutting-edge digital masterpieces.' },
    { icon: <BookOpen className="w-8 h-8 text-primary" />, title: 'Diverse Genres', desc: 'From Shonen to Slice of Life, anime covers a vast range of storytelling and themes.' },
    { icon: <Heart className="w-8 h-8 text-primary" />, title: 'Global Impact', desc: 'A cultural phenomenon that has connected millions of fans across the globe.' },
    { icon: <Users className="w-8 h-8 text-primary" />, title: 'Community', desc: 'Built by fans, for fans. Join a growing community of enthusiasts.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <section className="mb-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-5xl font-black mb-8 tracking-tight">
              THE STORY OF <span className="text-primary">ANIME</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Anime, the distinctive style of Japanese animation, has grown from a niche art form in the early 20th century to a global entertainment powerhouse today. 
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              What sets anime apart is its ability to tell complex, mature, and deeply emotional stories that resonate with audiences of all ages. It's not just "cartoons"—it's a medium of infinite possibilities.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="aspect-square rounded-2xl overflow-hidden glass border border-primary/20">
              <img src="https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=1974&auto=format&fit=crop" alt="Anime Art" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden glass border border-primary/20 mt-8">
              <img src="https://images.unsplash.com/photo-1578632292335-df3abbb0d586?q=80&w=1974&auto=format&fit=crop" alt="Anime Character" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 border-t border-white/5">
        <h2 className="text-3xl font-bold mb-12 text-center">Why We Love It</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-3xl border border-white/5 hover:border-primary/20 transition-all"
            >
              <div className="mb-6">{f.icon}</div>
              <h3 className="text-xl font-bold mb-4">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-accent rounded-[3rem] p-12 text-center border border-white/5">
        <h2 className="text-4xl font-bold mb-6 text-primary">Join the Journey</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
          Whether you're a seasoned otaku or just starting your first series, Anime Tracker is here to help you manage your collection and find your next favorite show.
        </p>
        <button className="bg-white text-black px-10 py-4 rounded-full font-black text-lg hover:bg-primary transition-all transform hover:scale-105">
          GET STARTED NOW
        </button>
      </section>
    </div>
  );
};

export default About;
