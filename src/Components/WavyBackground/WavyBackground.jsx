import React, { useEffect, useRef } from 'react';
import './WavyBackground.css';

const WavyBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const particleCount = Math.min(150, Math.floor((width * height) / 15000));

    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * height;
        this.savedX = this.x;
        this.savedY = this.y;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.speed = 0.2 + Math.random() * 0.5;
        this.velocityX = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.savedX = this.x;
        this.savedY = this.y;
      }

      update() {
        this.savedX = this.x;
        this.savedY = this.y;

        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 3;
          this.y -= Math.sin(angle) * force * 3;
        }

        this.y -= this.speed;
        this.x += this.velocityX;

        const returnSpeed = 0.05;
        this.x += (this.savedX - this.x) * returnSpeed;
        this.y += (this.savedY - this.y) * returnSpeed;

        if (this.y < -10) {
          this.y = height + 10;
          this.savedY = this.y;
        }
        if (this.x < -10 || this.x > width + 10) {
          this.x = Math.random() * width;
          this.savedX = this.x;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // Bright particles for dark background
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.8})`; 
        ctx.fill();
      }
    }

    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle());
      }
    };

    const connectParticles = () => {
      const maxDistance = 120;
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x;
          const dy = particlesRef.current[i].y - particlesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.2;
            ctx.beginPath();
            // Purple/Pink connection lines
            ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      // Clear
      ctx.clearRect(0, 0, width, height);

      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw();
      });

      connectParticles();

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    initParticles();
    animate();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="wavy-background" />;
};

export default WavyBackground;
