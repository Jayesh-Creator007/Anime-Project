import React from 'react';
import Navbar from '../components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-black">
      <Navbar />
      <main className="relative z-10">
        {children}
      </main>
      
      {/* Global Background Glow */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[150px] rounded-full"></div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{ 
          backgroundColor: '#1A1A1A', 
          border: '1px solid rgba(255, 215, 0, 0.2)',
          borderRadius: '16px',
          color: '#FFFFFF'
        }}
      />
    </div>
  );
};

export default Layout;
