import React, { useState, useEffect } from 'react';
import { animeAPI } from '../api';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, Loader } from 'lucide-react';

const AdminEditAnime = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    type: 'series',
    seasonsWatched: 0
  });

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const { data } = await animeAPI.getById(id);
        setFormData({
          title: data.title,
          description: data.description,
          imageUrl: data.imageUrl,
          type: data.type || 'series',
          seasonsWatched: data.seasonsWatched
        });
      } catch (error) {
        toast.error('Failed to fetch anime details');
        navigate('/admin/data');
      } finally {
        setLoading(false);
      }
    };
    fetchAnime();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await animeAPI.update(id, formData);
      toast.success('Anime updated successfully!');
      navigate('/admin/data');
    } catch (error) {
      toast.error('Failed to update anime');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <button 
        onClick={() => navigate('/admin/data')}
        className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors font-bold uppercase tracking-widest text-xs"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Data
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-10 rounded-[3rem] border border-primary/20 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
        
        <h1 className="text-4xl font-black mb-10 text-center uppercase tracking-tighter italic">
          EDIT <span className="text-primary">ANIME</span>
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
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-3 ml-2">Anime Title</label>
            <input 
              name="title"
              type="text" 
              required
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-primary transition-all font-bold"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-3 ml-2">Description</label>
            <textarea 
              name="description"
              required
              rows="4"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-primary transition-all resize-none font-medium"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-3 ml-2">Image URL</label>
            <input 
              name="imageUrl"
              type="url" 
              required
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-primary transition-all font-medium"
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
            disabled={saving}
            className="w-full bg-primary text-black py-5 rounded-2xl font-black text-xl hover:bg-yellow-400 transition-all disabled:opacity-50 mt-4 flex items-center justify-center shadow-[0_0_30px_rgba(255,215,0,0.2)]"
          >
            {saving ? (
              <Loader className="w-6 h-6 animate-spin" />
            ) : (
              <><Save className="w-6 h-6 mr-2" /> UPDATE ANIME</>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminEditAnime;
