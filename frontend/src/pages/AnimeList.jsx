import React, { useEffect, useState } from 'react';
import AnimeCard from '../components/AnimeCard';
import { animeAPI } from '../api';
import { Search } from 'lucide-react';

const AnimeList = () => {
  const [animes, setAnimes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredAnimes = animes.filter(anime => 
    anime.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-white">Full Collection</h1>
          <p className="text-gray-500">Discover and explore your favorite anime series</p>
        </div>
        
        <div className="relative max-w-md w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search anime..." 
            className="w-full bg-accent border border-white/10 rounded-full py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredAnimes.map((anime) => (
          <AnimeCard key={anime._id} anime={anime} onLike={fetchAnimes} />
        ))}
      </div>
      
      {filteredAnimes.length === 0 && (
        <div className="text-center py-20 text-gray-500 text-lg">
          No anime found matching your search.
        </div>
      )}
    </div>
  );
};

export default AnimeList;
