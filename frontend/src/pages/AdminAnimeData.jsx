import React, { useEffect, useState } from 'react';
import { animeAPI } from '../api';
import { Trash2, Edit } from 'lucide-react';
import { toast } from 'react-toastify';

const AdminAnimeData = () => {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    fetchAnimes();
  }, []);

  const fetchAnimes = async () => {
    try {
      const { data } = await animeAPI.getAll();
      setAnimes(data);
    } catch (error) {
      console.error('Error fetching animes:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this anime?')) {
      try {
        await animeAPI.delete(id);
        toast.success('Anime deleted successfully');
        fetchAnimes();
      } catch (error) {
        toast.error('Failed to delete anime');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-black mb-10">ANIME <span className="text-primary">DATA</span></h1>
      
      <div className="glass rounded-[2rem] border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-accent border-b border-white/5">
                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Anime</th>
                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Seasons</th>
                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Likes</th>
                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Views</th>
                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {animes.map((anime) => (
                <tr key={anime._id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img src={anime.imageUrl} alt={anime.title} className="w-12 h-12 rounded-lg object-cover mr-4" />
                      <div>
                        <div className="font-bold text-white">{anime.title}</div>
                        <div className="text-xs text-gray-500 max-w-xs truncate">{anime.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{anime.seasonsWatched}</td>
                  <td className="px-6 py-4 font-medium">{anime.likes}</td>
                  <td className="px-6 py-4 font-medium">{anime.views}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-blue-500/20 text-blue-400 rounded-lg mr-2 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(anime._id)}
                      className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAnimeData;
