import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../api';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authAPI.login({ email });
      toast.success('OTP sent to your email!');
      navigate('/verify-otp', { state: { email } });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col justify-center items-center px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md glass p-12 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
        
        <h1 className="text-5xl font-black mb-2 text-center tracking-tighter italic">WELCOME <span className="text-primary">BACK</span></h1>
        <p className="text-gray-500 text-center mb-12 font-bold uppercase tracking-widest text-xs">Access your anime collection</p>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-3 ml-2">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white focus:outline-none focus:border-primary transition-all font-bold text-lg"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-black py-6 rounded-2xl font-black text-xl hover:bg-yellow-400 transition-all disabled:opacity-50 shadow-[0_0_30px_rgba(255,215,0,0.2)]"
          >
            {loading ? 'SENDING OTP...' : 'LOGIN WITH OTP'}
          </button>
        </form>
        
        <p className="mt-10 text-center text-gray-500 font-bold">
          Don't have an account? <Link to="/signup" className="text-primary hover:underline italic">Join the hub</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
