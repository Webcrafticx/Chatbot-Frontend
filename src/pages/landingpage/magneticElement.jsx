// components/MagneticElements.jsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const MagneticElements = () => {
  const elementsRef = useRef([]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      elementsRef.current.forEach((element) => {
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const distanceX = event.clientX - centerX;
        const distanceY = event.clientY - centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        if (distance < 200) {
          const force = (200 - distance) / 200;
          const moveX = distanceX * force * 0.1;
          const moveY = distanceY * force * 0.1;
          
          element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
          element.style.transform = 'translate(0px, 0px)';
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {/* Floating gradient orbs */}
      <motion.div
        ref={el => elementsRef.current[0] = el}
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
      />
      
      <motion.div
        ref={el => elementsRef.current[1] = el}
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"
      />
      
      <motion.div
        ref={el => elementsRef.current[2] = el}
        animate={{
          x: [0, 60, 0],
          y: [0, -80, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute top-3/4 left-3/4 w-72 h-72 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
      />
    </div>
  );
};

export default MagneticElements;