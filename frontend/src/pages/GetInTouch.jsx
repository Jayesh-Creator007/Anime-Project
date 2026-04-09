import React from 'react';
import { motion } from 'framer-motion';
// import { Instagram } from 'lucide-react';

const GetInTouch = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[80vh] flex flex-col items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-black mb-4">GET IN <span className="text-primary">TOUCH</span></h1>
        <p className="text-gray-500 text-lg">Connect with me on social media or send a direct message.</p>
      </motion.div>

      <div className="w-full max-w-md glass p-4 rounded-3xl border border-primary/20 shadow-2xl overflow-hidden">
        {/* Placeholder for Instagram Embed/Iframe as per requirements */}
        <div className="aspect-[3/4] w-full bg-accent rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
          {/* Real Instagram Iframe (Mocked for this sandbox environment) */}
          {/* <iframe 
            src="https://www.instagram.com/p/C-fVaf7PDKrShbIP-bCr0A0/embed" 
            className="w-full h-full border-0"
            title="Instagram Profile"
          ></iframe>
           */}
          {/* <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <Instagram className="w-16 h-16 text-primary mb-4" />
            <a 
              href="https://instagram.com/direct/inbox/" 
              target="_blank" 
              rel="noreferrer"
              className="bg-primary text-black px-8 py-3 rounded-full font-bold"
            >
              Message Me
            </a>
          </div> */}
        </div>
      </div>
      
      <div className="mt-12 flex space-x-6">
        <div className="flex flex-col items-center">
          {/* <div className="w-12 h-12 rounded-full glass flex items-center justify-center mb-2 border border-primary/20">
            <Instagram className="w-6 h-6 text-primary" />
          </div> */}
          {/* <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Instagram</span> */}
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
