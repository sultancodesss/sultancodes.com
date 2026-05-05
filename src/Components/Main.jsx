import React, { useEffect, useRef } from 'react';
import sultan from '../assets/sultan.png';
import { motion } from 'framer-motion';
import Scene3D from './Scene3D';
import './Main.css';

/* ── Typing animation hook ── */
function useTyping(words, speed = 100, pause = 2000) {
  const ref = useRef(null);
  useEffect(() => {
    let wordIdx = 0, charIdx = 0, deleting = false;
    let timer;
    function tick() {
      const word = words[wordIdx];
      if (!ref.current) return;
      if (deleting) {
        charIdx--;
        ref.current.textContent = word.substring(0, charIdx);
        if (charIdx === 0) {
          deleting = false;
          wordIdx = (wordIdx + 1) % words.length;
          timer = setTimeout(tick, 400);
          return;
        }
      } else {
        charIdx++;
        ref.current.textContent = word.substring(0, charIdx);
        if (charIdx === word.length) {
          deleting = true;
          timer = setTimeout(tick, pause);
          return;
        }
      }
      timer = setTimeout(tick, deleting ? speed / 2 : speed);
    }
    tick();
    return () => clearTimeout(timer);
  }, []);
  return ref;
}

function Main() {
  const typingRef = useTyping(['Web Developer', 'UI Designer', 'React Expert', 'Creative Coder'], 80, 2000);

  return (
    <section className="hero" id="hero-section">
      {/* 3D Background */}
      <Scene3D />

      {/* Content Overlay */}
      <div className="hero-content">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="hero-greeting">Hello, I'm</p>
          <h1 className="hero-name">
            SULTAN<span className="hero-accent">_CODES</span>
          </h1>
          <div className="hero-role">
            <span ref={typingRef} className="typing-text"></span>
            <span className="cursor">|</span>
          </div>
          <p className="hero-desc">
            I break down complex user experience problems to create
            integrity-focused solutions that connect billions of people.
          </p>

          <div className="hero-buttons">
            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download CV ⬇️
            </motion.button>
            <motion.button
              className="btn-outline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work →
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="hero-image-wrapper"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          <div className="hero-image-glow"></div>
          <img src={sultan} alt="Sultan Codes" className="hero-image" />
        </motion.div>
      </div>

      {/* Stats Bar */}
      <motion.div
        className="hero-stats"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="stat-item">
          <h3>3</h3>
          <p>Months of Experience</p>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <h3>10+</h3>
          <p>Projects Completed</p>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <h3>1.2k</h3>
          <p>Happy Clients</p>
        </div>
      </motion.div>
    </section>
  );
}

export default Main;