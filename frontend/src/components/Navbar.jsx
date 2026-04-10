import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full z-[100] bg-black/80 backdrop-blur-xl border-b border-white/10 py-4">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center space-x-12">
          <Link to="/" className="text-3xl font-black text-primary tracking-tighter hover:scale-105 transition-transform">
            ANIME<span className="text-white">TRACKER</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-10">
            <Link to="/" className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 hover:text-primary transition-colors">Home</Link>
            <Link to="/anime" className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 hover:text-primary transition-colors">Anime List</Link>
            <Link to="/about" className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 hover:text-primary transition-colors">About</Link>
            <Link to="/contact" className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 hover:text-primary transition-colors">Get in Touch</Link>
          </div>
        </div>

        <div className="flex items-center space-x-6">
            {!user && (
              <Link 
                to="/login" 
                className="text-sm font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
              >
                Log In
              </Link>
            )}
            {user ? (
            <div className="flex items-center space-x-4">
              {isAdmin && (
                <Link to="/admin" className="p-3 bg-white/5 hover:bg-primary/10 rounded-2xl transition-all group">
                  <LayoutDashboard className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                </Link>
              )}
              <button 
                onClick={logout}
                className="p-3 bg-white/5 hover:bg-red-500/10 rounded-2xl transition-all group text-gray-400 hover:text-red-500"
              >
                <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </button>
            </div>
          ) : (
            <Link 
              to="/signup" 
              className="bg-primary text-black px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-yellow-400 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)]"
            >
              Sign Up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
