import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary tracking-tighter">
              ANIME<span className="text-white">TRACKER</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <Link to="/anime" className="hover:text-primary transition-colors">Anime List</Link>
              <Link to="/about" className="hover:text-primary transition-colors">About</Link>
              <Link to="/contact" className="hover:text-primary transition-colors">Get in Touch</Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {isAdmin && (
                  <Link to="/admin" className="p-2 hover:bg-primary/10 rounded-full transition-colors">
                    <LayoutDashboard className="w-5 h-5 text-primary" />
                  </Link>
                )}
                <button 
                  onClick={logout}
                  className="p-2 hover:bg-primary/10 rounded-full transition-colors text-gray-400 hover:text-white"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <Link 
                to="/signup" 
                className="bg-primary text-black px-4 py-1.5 rounded-full font-semibold hover:bg-yellow-400 transition-colors"
              >
                Sign Up
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
