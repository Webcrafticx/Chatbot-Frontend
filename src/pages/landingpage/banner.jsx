// components/Banner.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles } from 'lucide-react';

const Banner = () => {
  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full px-4 py-2 mb-8"
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-300">AI-Powered Chatbot Platform</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Build Smart{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Chatbots
            </span>{' '}
            for Your Business
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Easily create, train, and share chatbots that boost your customer engagement 
            and lead generation. No coding required.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(59, 130, 246, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl flex items-center space-x-2 transition-all duration-200"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-gray-600 text-white font-semibold px-8 py-4 rounded-xl flex items-center space-x-2 transition-all duration-200"
            >
              <Play className="w-5 h-5" />
              <span>View Demo</span>
            </motion.button>
          </motion.div>

          {/* Animated Chatbot Illustration */}
          <motion.div
            animate={floatingAnimation}
            className="relative max-w-4xl mx-auto"
          >
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
              {/* Chat Simulation */}
              <div className="space-y-4">
                <div className="flex justify-start">
                  <div className="bg-gray-700/50 rounded-2xl rounded-bl-none px-4 py-3 max-w-xs">
                    <p className="text-gray-300">Hi! How can I help you today?</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl rounded-br-none px-4 py-3 max-w-xs">
                    <p className="text-white">I want to learn about your pricing</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                    className="bg-gray-700/50 rounded-2xl rounded-bl-none px-4 py-3 max-w-md"
                  >
                    <p className="text-gray-300">
                      We offer flexible plans starting at $29/month. Would you like me to show you the features?
                    </p>
                  </motion.div>
                </div>
              </div>
              
              {/* Typing Indicator */}
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex items-center space-x-1 mt-4 text-gray-400"
              >
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span className="text-sm ml-2">ChatNova is typing...</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400"
      >
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Banner;