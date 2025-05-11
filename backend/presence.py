import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const pulseVariants = {
  idle: {
    opacity: 0.5,
    scale: 1,
    boxShadow: '0 0 6px rgba(0,255,255,0.15)'
  },
  watchdog: {
    opacity: 0.85,
    scale: [1, 1.05, 1.03, 1],
    boxShadow: [
      '0 0 4px rgba(0,255,0,0.2)',
      '0 0 10px rgba(0,255,0,0.35)',
      '0 0 6px rgba(0,255,0,0.2)'
    ],
    backgroundColor: '#003300',
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  },
  active: {
    opacity: 1,
    scale: [1, 1.05, 1],
    boxShadow: [
      '0 0 6px rgba(0,255,255,0.15)',
      '0 0 12px rgba(0,255,255,0.25)',
      '0 0 6px rgba(0,255,255,0.15)'
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  },
  attack: {
    scale: [1, 1.1, 0.95, 1],
    boxShadow: [
      '0 0 4px rgba(255,0,85,0.25)',
      '0 0 12px rgba(255,0,85,0.4)',
      '0 0 20px rgba(255,0,85,0.6)'
    ],
    backgroundColor: '#330011',
    transition: {
      duration: 0.75,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  },
  respawn: {
    scale: [0.5, 1.25, 1],
    opacity: [0, 1],
    boxShadow: '0 0 30px rgba(0, 255, 255, 0.6)',
    backgroundColor: '#001f1f',
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

const GobyPresence: React.FC = () => {
  const [mode, setMode] = useState<'idle' | 'watchdog' | 'active' | 'attack'>('watchdog');
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    let userInteracted = false;
    let diagnosticRunning = false;
    let threatDetected = false;

    const onActivity = () => {
      userInteracted = true;
    };

    const onDiagnostic = () => {
      diagnosticRunning = true;
      setTimeout(() => { diagnosticRunning = false; }, 15000);
    };

    const onThreat = () => {
      threatDetected = true;
      setTimeout(() => { threatDetected = false; }, 12000);
    };

    window.addEventListener('mousemove', onActivity);
    window.addEventListener('keydown', onActivity);
    window.addEventListener('click', onActivity);
    window.addEventListener('startDiagnostic', onDiagnostic);
    window.addEventListener('threatDetected', onThreat);

    const interval = setInterval(() => {
      if (threatDetected) {
        setMode('attack');
      } else if (diagnosticRunning) {
        const hasPromptedDaemon = localStorage.getItem('gobyDaemonPrompted');
        if (!hasPromptedDaemon) {
          const userConfirmed = window.confirm('Goby: Do you want me to spawn a background daemon and persist to kernel mode?');
          if (userConfirmed) {
            setTimeout(() => {
              wwwwwwwconsole.log('Daemon initiated: Goby kernel task online.');
              // Replace below with real daemon logic if needed
              const daemonLoop = setInterval(() => {
                console.log('[Goby Daemon] Monitoring kernel state...');
              }, 10000);
              window.gobyDaemon = daemonLoop;
            }, 500);
          }
          localStorage.setItem('gobyDaemonPrompted', 'true');
        }
        setMode('active');
      } else if (userInteracted) {
        setMode('active');
        userInteracted = false;
      } else {
        const random = Math.random();
        if (random < 0.4) setMode('watchdog');
        else setMode('idle');
      }
    }, 6000);

    

  return () => {
      window.removeEventListener('mousemove', onActivity);
      window.removeEventListener('keydown', onActivity);
      window.removeEventListener('click', onActivity);
      window.removeEventListener('startDiagnostic', onDiagnostic);
      window.removeEventListener('threatDetected', onThreat);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    let lastFrame = performance.now();
    let frameId: number;

    const checkFrozen = (now: number) => {
      if (now - lastFrame > 10000) {
        setAnimationKey(prev => prev + 1);
      } else {
        frameId = requestAnimationFrame(checkFrozen);
      }
      lastFrame = now;
    };

    frameId = requestAnimationFrame(checkFrozen);
    return () => cancelAnimationFrame(frameId);
  }, [mode]);

  return (
    <motion.div
      key={animationKey}
      className="fixed bottom-6 right-6 w-6 h-6 rounded"
      variants={pulseVariants}
      animate={mode}
      initial="respawn"
      style={{
        borderRadius: '0.75rem',
        background: 'linear-gradient(145deg, #00ffff33, #00333366)',
        backdropFilter: 'blur(12px) saturate(160%)',
        border: '1px solid rgba(0,255,255,0.1)',
        zIndex: 50
      }}
    />
  );
};

export default GobyPresence;
