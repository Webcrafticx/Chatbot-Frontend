// components/Features.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Upload, BarChart3, Share2, Zap } from 'lucide-react'; // Fixed imports

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: Upload,
      title: 'Custom Q&A Upload',
      description: 'Easily upload your custom questions and answers. Train your chatbot with specific knowledge about your business.',
      image: '/api/placeholder/400/250'
    },
    {
      icon: BarChart3, // Changed from Dashboard to BarChart3
      title: 'Dashboard Analytics',
      description: 'Monitor chatbot performance with real-time analytics. Track conversations, satisfaction rates, and key metrics.',
      image: '/api/placeholder/400/250'
    },
    {
      icon: Share2,
      title: 'Sharable Chatbot Link',
      description: 'Get a unique link to share your chatbot anywhere - website, social media, or messaging platforms.',
      image: '/api/placeholder/400/250'
    },
    {
      icon: Zap, // Changed from Integration to Zap
      title: 'Lead Generation',
      description: 'Capture leads directly through chatbot interactions. ',
      image: '/api/placeholder/400/250'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Powerful <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Features</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to create, manage, and optimize your AI chatbots
          </p>
        </motion.div>

        <div ref={ref} className="space-y-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
            >
              <div className="lg:w-1/2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              </div>
              
              <div className="lg:w-1/2">
                <motion.div
                  whileHover={{ 
                    rotateY: 10,
                    transition: { duration: 0.3 }
                  }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-lg opacity-20"></div>
                  <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 aspect-video flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <feature.icon className="w-10 h-10 text-white" />
                      </div>
                      <p className="text-gray-300 text-lg">
                        {feature.title} Preview
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;