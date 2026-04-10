import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import About from './pages/About';
import AnimeList from './pages/AnimeList';
import GetInTouch from './pages/GetInTouch';
import Signup from './pages/Signup';
import Login from './pages/Login';
import VerifyOtp from './pages/VerifyOtp';
import AdminDashboard from './pages/AdminDashboard';
import AdminAnimeData from './pages/AdminAnimeData';
import AdminAddAnime from './pages/AdminAddAnime';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import { LayoutDashboard, Database, PlusCircle } from 'lucide-react';

const App = () => {
  const { isAdmin } = useAuth();

  return (
    <Router>
      <Layout>
        {isAdmin && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <div className="flex space-x-4 bg-accent/50 p-2 rounded-2xl border border-white/5 w-fit">
              <Link to="/admin" className="flex items-center space-x-2 px-4 py-2 hover:bg-primary/10 rounded-xl text-sm font-bold text-primary transition-colors">
                <LayoutDashboard className="w-4 h-4" /> <span>Dashboard</span>
              </Link>
              <Link to="/admin/data" className="flex items-center space-x-2 px-4 py-2 hover:bg-primary/10 rounded-xl text-sm font-bold text-primary transition-colors">
                <Database className="w-4 h-4" /> <span>Anime Data</span>
              </Link>
              <Link to="/admin/add" className="flex items-center space-x-2 px-4 py-2 hover:bg-primary/10 rounded-xl text-sm font-bold text-primary transition-colors">
                <PlusCircle className="w-4 h-4" /> <span>Add Anime</span>
              </Link>
            </div>
          </div>
        )}
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/anime" element={<AnimeList />} />
          <Route path="/contact" element={<GetInTouch />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          
          {/* Admin Routes */}
          <Route element={<ProtectedRoute adminOnly={true} />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/data" element={<AdminAnimeData />} />
            <Route path="/admin/add" element={<AdminAddAnime />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
