// components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'Features', 'Pricing', 'Contact'];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CN</span>
            </div>
            <span className="text-white font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              ChatNova
            </span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ y: -2 }}
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium relative group"
              >
                {item}
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"
                  initial={false}
                />
              </motion.a>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-300 hover:text-white font-medium px-4 py-2 transition-colors duration-200"
            >
              Login
            </motion.button>
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 py-2 rounded-lg transition-all duration-200"
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden text-gray-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-gray-800/95 backdrop-blur-xl rounded-lg mt-2 overflow-hidden"
            >
              <div className="py-4 space-y-4">
                {navItems.map((item) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </motion.a>
                ))}
                <div className="px-4 pt-4 border-t border-gray-700 space-y-3">
                  <button className="w-full text-center text-gray-300 hover:text-white py-2">
                    Login
                  </button>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg">
                    Get Started
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;