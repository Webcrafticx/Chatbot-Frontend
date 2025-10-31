// components/Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Facebook, Instagram, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' }
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' }
  ];

  const companyLinks = [
    { name: 'About Us', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Documentation', href: '#' }
  ];

  return (
    <footer className="relative overflow-hidden border-t border-gray-800/50">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CN</span>
              </div>
              <span className="text-white font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ChatNova
              </span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Building the future of customer engagement with AI-powered chatbots that transform how businesses connect with their customers.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ 
                    scale: 1.2,
                    y: -2
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gray-800/50 border border-gray-700/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500/50 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates.
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm">
            © {currentYear} ChatNova. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
            >
              Terms of Service
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
            >
              Cookie Policy
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;