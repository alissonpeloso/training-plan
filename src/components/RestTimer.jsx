import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Play, Pause, RotateCcw } from 'lucide-react';

export const RestTimer = ({ seconds, isOpen, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setTimeLeft(seconds);
      setIsActive(true);
    }
  }, [isOpen, seconds]);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      // Tocar som de alarme
      try {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
        audio.volume = 0.5;
        audio.play().catch(e => console.log('Audio play failed:', e));
      } catch(e) {}
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(seconds);
  };

  const formatTime = (timeInSeconds) => {
    const m = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
    const s = (timeInSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const progress = ((seconds - timeLeft) / seconds) * 100;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-2xl shadow-2xl p-4 z-50 border border-neutral-200 dark:border-neutral-700"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-blue-400">
              <Bell size={18} />
              <span className="text-sm font-bold uppercase tracking-wider">Descanso</span>
            </div>
            <button onClick={onClose} className="p-1 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800 rounded-full transition-colors">
              <X size={18} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className={`text-4xl font-mono font-bold tracking-tight ${timeLeft === 0 ? 'text-red-500 dark:text-red-400 animate-pulse' : 'text-neutral-900 dark:text-white'}`}>
              {formatTime(timeLeft)}
            </span>
            <div className="flex items-center gap-2">
              <button 
                onClick={resetTimer}
                className="p-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 rounded-xl transition-colors"
              >
                <RotateCcw size={20} />
              </button>
              <button 
                onClick={toggleTimer}
                className={`p-3 rounded-xl transition-colors ${isActive ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {isActive ? <Pause size={20} /> : <Play size={20} />}
              </button>
            </div>
          </div>

          {/* Barra de Progresso */}
          <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-1.5 rounded-full mt-4 overflow-hidden">
            <motion.div 
              className={`h-full ${timeLeft === 0 ? 'bg-red-500' : 'bg-blue-500'}`}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
