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
    type: 'series',
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
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-3 ml-2">Content Type</label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'series' })}
                className={`flex-1 py-4 rounded-2xl font-black transition-all border ${formData.type === 'series' ? 'bg-primary text-black border-primary shadow-[0_0_20px_rgba(255,215,0,0.3)]' : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'}`}
              >
                SERIES
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'movie' })}
                className={`flex-1 py-4 rounded-2xl font-black transition-all border ${formData.type === 'movie' ? 'bg-primary text-black border-primary shadow-[0_0_20px_rgba(255,215,0,0.3)]' : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'}`}
              >
                MOVIE
              </button>
            </div>
          </div>
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
          {formData.type === 'series' && (
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-3 ml-2">Seasons Watched</label>
              <input 
                name="seasonsWatched"
                type="number" 
                min="0"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-primary transition-all font-bold"
                value={formData.seasonsWatched}
                onChange={handleChange}
              />
            </div>
          )}
          
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
