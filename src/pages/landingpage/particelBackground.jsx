// components/ParticleBackground.jsx
import React, { useEffect, useRef } from 'react';

const ParticleBackground = () => {
const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, vx: 0, vy: 0, prevX: 0, prevY: 0 });
  const particlesRef = useRef([]);
  const animationFrameRef = useRef();
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Advanced Particle Class with 3D-like properties
    class Particle {
      constructor(layer = 0) {
        this.layer = layer;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 100 + 50; // Depth
        this.size = (Math.random() * 3 + 1) * (1 - layer * 0.3);
        this.speedX = (Math.random() * 2 - 1) * (1 + layer * 0.5);
        this.speedY = (Math.random() * 2 - 1) * (1 + layer * 0.5);
        this.angle = Math.random() * Math.PI * 2;
        this.spinSpeed = Math.random() * 0.02 - 0.01;
        this.waveAmplitude = Math.random() * 3 + 1;
        this.pulseSpeed = Math.random() * 0.05 + 0.02;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.color = this.getDynamicColor();
        this.trail = [];
        this.maxTrailLength = 10;
        this.shape = Math.random() > 0.7 ? 'circle' : Math.random() > 0.5 ? 'triangle' : 'square';
      }

      getDynamicColor() {
        const time = timeRef.current;
        const hue1 = (time * 0.1 + Math.sin(time * 0.05) * 30) % 360;
        const hue2 = (hue1 + 60 + Math.cos(time * 0.03) * 40) % 360;
        
        return {
          primary: `hsla(${hue1}, 70%, 65%, ${0.4 - this.layer * 0.1})`,
          secondary: `hsla(${hue2}, 80%, 60%, ${0.6 - this.layer * 0.1})`,
          glow: `hsla(${hue1}, 100%, 70%, ${0.3 - this.layer * 0.05})`
        };
      }

      update() {
        timeRef.current += 0.016; // ~60fps
        
        // Store previous position for trail
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > this.maxTrailLength) {
          this.trail.shift();
        }

        // Advanced wave motion with multiple frequencies
        this.angle += this.spinSpeed;
        const wave1 = Math.sin(timeRef.current * 0.5 + this.pulsePhase) * this.waveAmplitude;
        const wave2 = Math.cos(timeRef.current * 0.3 + this.angle) * (this.waveAmplitude * 0.7);
        
        this.x += this.speedX + wave1;
        this.y += this.speedY + wave2;

        // Pulsing size
        const pulse = Math.sin(timeRef.current * this.pulseSpeed + this.pulsePhase) * 0.5 + 0.5;
        this.currentSize = this.size * (1 + pulse * 0.5);

        // Wrap around with depth consideration
        if (this.x > canvas.width + 100) this.x = -100;
        if (this.x < -100) this.x = canvas.width + 100;
        if (this.y > canvas.height + 100) this.y = -100;
        if (this.y < -100) this.y = canvas.height + 100;

        // Advanced mouse interaction with velocity
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const mouseSpeed = Math.sqrt(mouseRef.current.vx ** 2 + mouseRef.current.vy ** 2);
        
        if (distance < 200) {
          const force = Math.min(1, (200 - distance) / 200);
          const angle = Math.atan2(dy, dx);
          const repulsionForce = force * 8 * (1 + mouseSpeed * 0.5);
          
          // Add some randomness to make it more organic
          const randomAngle = angle + (Math.random() - 0.5) * 0.5;
          
          this.x -= Math.cos(randomAngle) * repulsionForce;
          this.y -= Math.sin(randomAngle) * repulsionForce;
          
          // Color intensity based on interaction
          this.color = this.getDynamicColor();
        }

        // Update color dynamically
        this.color = this.getDynamicColor();
      }

      draw() {
        // Draw trail
        if (this.trail.length > 1) {
          ctx.strokeStyle = this.color.glow;
          ctx.lineWidth = this.currentSize * 0.3;
          ctx.globalAlpha = 0.3;
          ctx.beginPath();
          ctx.moveTo(this.trail[0].x, this.trail[0].y);
          for (let i = 1; i < this.trail.length; i++) {
            ctx.lineTo(this.trail[i].x, this.trail[i].y);
          }
          ctx.stroke();
        }

        ctx.globalAlpha = 1;

        // Create advanced gradient
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.currentSize * 3
        );
        gradient.addColorStop(0, this.color.primary);
        gradient.addColorStop(0.7, this.color.secondary);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.shadowBlur = 25;
        ctx.shadowColor = this.color.glow;

        // Draw different shapes
        if (this.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.currentSize, 0, Math.PI * 2);
          ctx.fill();
        } else if (this.shape === 'triangle') {
          ctx.beginPath();
          for (let i = 0; i < 3; i++) {
            const angle = (i * 2 * Math.PI) / 3 + this.angle;
            const px = this.x + this.currentSize * Math.cos(angle);
            const py = this.y + this.currentSize * Math.sin(angle);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.fill();
        } else { // square
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.rotate(this.angle);
          ctx.fillRect(-this.currentSize, -this.currentSize, this.currentSize * 2, this.currentSize * 2);
          ctx.restore();
        }

        ctx.shadowBlur = 0;
      }
    }

    // Initialize multiple layers of particles
    const initParticles = () => {
      particlesRef.current = [];
      const layers = 3;
      
      for (let layer = 0; layer < layers; layer++) {
        const particleCount = Math.min(40, Math.floor((canvas.width * canvas.height) / 25000));
        
        for (let i = 0; i < particleCount; i++) {
          particlesRef.current.push(new Particle(layer));
        }
      }
    };

    // Advanced connection system
    const drawConnections = () => {
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const opacity = 1 - distance / 150;
            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            gradient.addColorStop(0, p1.color.primary);
            gradient.addColorStop(1, p2.color.secondary);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.8 * opacity;
            ctx.globalAlpha = opacity * 0.4;
            
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            
            // Curved connections for organic feel
            const cp1x = p1.x + (p2.x - p1.x) * 0.3 + Math.sin(timeRef.current * 0.1) * 20;
            const cp1y = p1.y + (p2.y - p1.y) * 0.3 + Math.cos(timeRef.current * 0.1) * 20;
            ctx.quadraticCurveTo(cp1x, cp1y, p2.x, p2.y);
            
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    // Main animation loop with advanced effects
    const animate = () => {
      // Clear with sophisticated fade effect
      ctx.fillStyle = 'rgba(15, 23, 42, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections first (behind particles)
      drawConnections();

      // Update and draw particles
      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw mouse influence area (subtle)
      if (mouseRef.current.x > 0 && mouseRef.current.y > 0) {
        const gradient = ctx.createRadialGradient(
          mouseRef.current.x, mouseRef.current.y, 0,
          mouseRef.current.x, mouseRef.current.y, 200
        );
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Advanced mouse tracking with velocity
    const handleMouseMove = (event) => {
      const now = Date.now();
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
      
      // Calculate velocity
      if (mouseRef.current.prevX !== 0 && mouseRef.current.prevY !== 0) {
        mouseRef.current.vx = mouseRef.current.x - mouseRef.current.prevX;
        mouseRef.current.vy = mouseRef.current.y - mouseRef.current.prevY;
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
      mouseRef.current.vx = 0;
      mouseRef.current.vy = 0;
    };

    // Touch support
    const handleTouchMove = (event) => {
      if (event.touches.length > 0) {
        handleMouseMove(event.touches[0]);
      }
    };

    initParticles();
    animate();

    // Event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};


export default ParticleBackground;