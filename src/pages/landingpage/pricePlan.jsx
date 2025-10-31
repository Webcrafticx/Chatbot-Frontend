// components/PricingPlans.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, Star, Zap } from 'lucide-react';

const PricingPlans = () => {
  const [isYearly, setIsYearly] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const plans = [
    // {
    //   name: 'Starter',
    //   price: { monthly: 29, yearly: 24 },
    //   description: 'Perfect for small businesses getting started',
    //   features: [
    //     'Up to 1,000 conversations/mo',
    //     'Basic Q&A training',
    //     'Email support',
    //     'Standard analytics',
    //     '1 chatbot instance'
    //   ],
    //   popular: false,
    //   color: 'from-gray-500 to-gray-600'
    // },
    {
      name: 'Pro',
      price: { monthly: 79, yearly: 66 },
      description: 'Advanced features for growing businesses',
      features: [
        'Up to 10,000 conversations/mo',
        'Advanced AI training',
        'Priority support',
        'Advanced analytics',
        '5 chatbot instances',
        'CRM integrations',
        'Custom branding'
      ],
      popular: true,
      color: 'from-blue-500 to-purple-500'
    },
    // {
    //   name: 'Enterprise',
    //   price: { monthly: 199, yearly: 166 },
    //   description: 'For large organizations with custom needs',
    //   features: [
    //     'Unlimited conversations',
    //     'Custom AI model training',
    //     '24/7 dedicated support',
    //     'Custom analytics',
    //     'Unlimited instances',
    //     'All integrations',
    //     'White-label solution',
    //     'SLA guarantee'
    //   ],
    //   popular: false,
    //   color: 'from-purple-500 to-pink-500'
    // }
  ];

  return (
    <section id="pricing" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Plan</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Flexible pricing that scales with your business
          </p>

          {/* Toggle Switch */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={`text-lg ${!isYearly ? 'text-white' : 'text-gray-500'}`}>
              Monthly
            </span>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsYearly(!isYearly)}
              className="w-16 h-8 bg-gray-700 rounded-full p-1 flex items-center cursor-pointer"
            >
              <motion.div
                animate={{ x: isYearly ? 32 : 0 }}
                className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg"
              />
            </motion.button>
            <span className={`text-lg ${isYearly ? 'text-white' : 'text-gray-500'}`}>
              Yearly <span className="text-green-400 text-sm">(Save 20%)</span>
            </span>
          </div>
        </motion.div>

        <div className="flex justify-center items-center max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className={`relative ${
                plan.popular ? 'scale-105 z-10' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full flex items-center space-x-1 text-sm font-semibold">
                    <Star className="w-4 h-4 fill-current" />
                    <span>MOST POPULAR</span>
                  </div>
                </motion.div>
              )}

              {/* Glow Effect for Popular Plan */}
              {plan.popular && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-lg opacity-30"></div>
              )}

              <div className={`relative bg-gray-800/50 flex justify-center items-center backdrop-blur-sm border mt-8 ${
                plan.popular ? 'border-blue-500/50' : 'border-gray-700/50'
              } rounded-2xl p-8 h-full flex flex-col`}>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                    {plan.popular && <Zap className="w-6 h-6 text-yellow-400" />}
                  </div>
                  
                  <p className="text-gray-300 mb-6">{plan.description}</p>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">
                      Rs {isYearly ? plan.price.yearly : plan.price.monthly}
                    </span>
                    <span className="text-gray-400">/month</span>
                    {isYearly && (
                      <div className="text-green-400 text-sm mt-1">
                        Billed annually (${plan.price.yearly * 12})
                      </div>
                    )}
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: plan.popular ? "0 0 30px rgba(59, 130, 246, 0.4)" : "0 0 20px rgba(255, 255, 255, 0.1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                      : 'bg-gray-700/50 text-white hover:bg-gray-600/50 border border-gray-600'
                  }`}
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;