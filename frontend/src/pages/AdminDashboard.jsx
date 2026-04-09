import React, { useEffect, useState } from 'react';
import { animeAPI } from '../api';
import { Users, Heart, Eye, PlaySquare } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalLikes: 0, totalViews: 0, totalAnime: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await animeAPI.getStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Anime', value: stats.totalAnime, icon: <PlaySquare className="w-8 h-8 text-primary" /> },
    { label: 'Total Likes', value: stats.totalLikes, icon: <Heart className="w-8 h-8 text-primary" /> },
    { label: 'Total Views', value: stats.totalViews, icon: <Eye className="w-8 h-8 text-primary" /> },
    { label: 'Total Visitors', value: Math.round(stats.totalViews * 0.7), icon: <Users className="w-8 h-8 text-primary" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-black mb-10">ADMIN <span className="text-primary">DASHBOARD</span></h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {statCards.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-8 rounded-3xl border border-white/5"
          >
            <div className="mb-6 bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center">
              {stat.icon}
            </div>
            <div className="text-4xl font-black mb-2">{stat.value}</div>
            <div className="text-gray-500 uppercase tracking-widest text-xs font-bold">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
