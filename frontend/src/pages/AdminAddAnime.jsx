import React, { useState } from 'react';
import { animeAPI } from '../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminAddAnime = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    seasonsWatched: 0
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await animeAPI.create(formData);
      toast.success('Anime added successfully!');
      navigate('/admin/data');
    } catch (error) {
      toast.error('Failed to add anime');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-10 rounded-[3rem] border border-primary/20"
      >
        <h1 className="text-4xl font-black mb-10 text-center uppercase tracking-tighter">
          ADD NEW <span className="text-primary">ANIME</span>
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Anime Title</label>
            <input 
              name="title"
              type="text" 
              required
              className="w-full bg-accent border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-primary transition-all"
              placeholder="e.g. One Piece"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Description</label>
            <textarea 
              name="description"
              required
              rows="4"
              className="w-full bg-accent border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-primary transition-all resize-none"
              placeholder="Short description of the anime..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Image URL</label>
            <input 
              name="imageUrl"
              type="url" 
              required
              className="w-full bg-accent border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-primary transition-all"
              placeholder="https://images.unsplash.com/..."
              value={formData.imageUrl}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Seasons Watched</label>
            <input 
              name="seasonsWatched"
              type="number" 
              min="0"
              className="w-full bg-accent border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-primary transition-all"
              value={formData.seasonsWatched}
              onChange={handleChange}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-black py-5 rounded-2xl font-black text-xl hover:bg-yellow-400 transition-all disabled:opacity-50 mt-4"
          >
            {loading ? 'ADDING...' : 'ADD ANIME'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminAddAnime;
