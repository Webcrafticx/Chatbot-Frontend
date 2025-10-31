// components/WhyChooseUs.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Zap, Users, BarChart3, Brain } from 'lucide-react';

const WhyChooseUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: Zap,
      title: 'Easy No-Code Setup',
      description: 'Get your chatbot running in minutes with our intuitive drag-and-drop interface. No technical skills required.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Users,
      title: 'Lead Generation Power',
      description: 'Convert visitors into leads with smart conversation flows and seamless CRM integrations.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Brain,
      title: 'Smart AI Responses',
      description: 'Advanced NLP understands customer intent and provides accurate, context-aware responses.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Track performance with detailed analytics and insights to optimize your chatbot strategy.',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="features" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">ChatNova</span>?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience the next generation of customer engagement with our powerful AI chatbot platform
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
              <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 h-full group-hover:border-gray-600/50 transition-all duration-300">
                <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;