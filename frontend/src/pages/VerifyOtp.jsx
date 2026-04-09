import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authAPI } from '../api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Session expired. Please signup again.');
      return navigate('/signup');
    }
    
    setLoading(true);
    try {
      const { data } = await authAPI.verifyOtp({ email, otp });
      login(data);
      toast.success('Verified successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20 min-h-[80vh] flex flex-col justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-10 rounded-[2.5rem] border border-primary/20"
      >
        <h1 className="text-4xl font-black mb-2 text-center">VERIFY <span className="text-primary">OTP</span></h1>
        <p className="text-gray-500 text-center mb-10 font-medium">Enter the 6-digit code sent to {email}</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">OTP Code</label>
            <input 
              type="text" 
              required
              maxLength="6"
              className="w-full bg-accent border border-white/10 rounded-2xl py-4 px-6 text-white text-center text-3xl font-black tracking-[1rem] focus:outline-none focus:border-primary transition-all"
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-black py-4 rounded-2xl font-black text-lg hover:bg-yellow-400 transition-all disabled:opacity-50"
          >
            {loading ? 'VERIFYING...' : 'VERIFY & LOGIN'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default VerifyOtp;
