import React, { useState, useEffect } from 'react';
import { Dumbbell, LayoutDashboard, History, RotateCcw, Moon, Sun } from 'lucide-react';
import confetti from 'canvas-confetti';

import { useLocalStorage } from './hooks/useLocalStorage';
import { workoutData, scheduleMap } from './data/workoutData';
import { Dashboard } from './components/Dashboard';
import { WorkoutView } from './components/WorkoutView';
import { RestTimer } from './components/RestTimer';
import { AnimatePresence, motion } from 'framer-motion';

const App = () => {
  const [activeDay, setActiveDay] = useState(null);
  const [view, setView] = useState('dashboard'); // 'dashboard' | 'workout' | 'history'
  
  // Persistência
  const [sessionState, setSessionState] = useLocalStorage('training_session', {});
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  // Timer State
  const [timerSettings, setTimerSettings] = useState({ isOpen: false, seconds: 0 });

  const todayNum = new Date().getDay();
  const suggestedWorkoutId = scheduleMap[todayNum] || 0;

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const currentWorkout = workoutData.find(d => d.id === activeDay);

  const getCompletionPercentage = (dayId) => {
    const workout = workoutData.find(d => d.id === dayId);
    if (!workout) return 0;
    
    // Pega o progresso daquele treino do LocalStorage
    const dayData = sessionState[dayId] || {};
    const totalExercises = workout.exercises.length;
    
    const completedExercises = workout.exercises.filter((ex, index) => {
      const exData = dayData[index] || [];
      return exData.length === ex.sets && exData.every(set => set.done);
    }).length;

    return Math.round((completedExercises / totalExercises) * 100);
  };

  const updateExerciseData = (exIndex, newExData) => {
    setSessionState(prev => {
      const dayData = prev[activeDay] || {};
      const updatedDayData = {
        ...dayData,
        [exIndex]: newExData
      };
      
      const newState = {
        ...prev,
        [activeDay]: updatedDayData
      };

      // Check if workout is complete after update
      const workout = workoutData.find(d => d.id === activeDay);
      const totalExercises = workout.exercises.length;
      const completedExercises = workout.exercises.filter((ex, idx) => {
        const data = idx === exIndex ? newExData : (updatedDayData[idx] || []);
        return data.length === ex.sets && data.every(set => set.done);
      }).length;

      if (completedExercises === totalExercises && typeof window !== 'undefined') {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#3b82f6', '#10b981', '#f59e0b']
        });
      }

      return newState;
    });
  };

  const handleStartRest = (seconds) => {
    setTimerSettings({ isOpen: true, seconds });
  };

  const resetProgress = () => {
    if (confirm("Deseja limpar todo o progresso do plano?")) {
      setSessionState({});
    }
  };

  const navToWorkout = (dayId) => {
    setActiveDay(dayId);
    setView('workout');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 pb-24 ${theme === 'dark' ? 'bg-neutral-950 text-neutral-100' : 'bg-neutral-50 text-neutral-900'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-20 px-4 py-4 backdrop-blur-md border-b ${theme === 'dark' ? 'bg-neutral-950/80 border-neutral-800' : 'bg-white/80 border-neutral-200'}`}>
        <div className="max-w-md mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-black tracking-tight">Hipertrofia</h1>
            <p className="text-[10px] text-blue-500 uppercase tracking-widest font-bold">Plano Científico</p>
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={toggleTheme}
              className="p-2 text-neutral-400 hover:text-blue-500 transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={resetProgress}
              className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
              title="Resetar progresso"
            >
              <RotateCcw size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4 overflow-hidden">
        <AnimatePresence mode="wait">
          {view === 'dashboard' && (
            <Dashboard 
              key="dashboard"
              suggestedWorkoutId={suggestedWorkoutId}
              activeDay={activeDay}
              setActiveDay={navToWorkout}
              getCompletionPercentage={getCompletionPercentage}
            />
          )}

          {view === 'workout' && currentWorkout && (
            <WorkoutView 
              key="workout"
              workout={currentWorkout}
              sessionData={sessionState[activeDay] || {}}
              updateExerciseData={updateExerciseData}
              onStartRest={handleStartRest}
            />
          )}

          {view === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center py-20"
            >
              <History size={48} className="mx-auto text-neutral-300 dark:text-neutral-700 mb-4" />
              <h3 className="text-xl font-bold mb-2">Evolução</h3>
              <p className="text-neutral-500 text-sm max-w-[250px] mx-auto">Em breve: Acompanhe seu volume e progressão de carga ao longo do tempo.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <RestTimer 
        isOpen={timerSettings.isOpen} 
        seconds={timerSettings.seconds} 
        onClose={() => setTimerSettings({ ...timerSettings, isOpen: false })} 
      />

      {/* Nav */}
      <nav className={`fixed bottom-0 inset-x-0 border-t pb-safe pt-2 px-6 flex justify-around items-center z-30 transition-colors ${theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]'}`}>
        <button 
          onClick={() => {
            if (activeDay) setView('workout');
            else setView('dashboard');
          }}
          className={`flex flex-col items-center gap-1.5 p-2 transition-colors ${view === 'workout' ? 'text-blue-500' : 'text-neutral-400 dark:text-neutral-500'}`}
        >
          <Dumbbell size={24} strokeWidth={view === 'workout' ? 2.5 : 2} />
          <span className="text-[10px] font-bold">Treino</span>
        </button>
        <button 
          onClick={() => setView('dashboard')}
          className={`flex flex-col items-center gap-1.5 p-2 transition-colors ${view === 'dashboard' ? 'text-blue-500' : 'text-neutral-400 dark:text-neutral-500'}`}
        >
          <LayoutDashboard size={24} strokeWidth={view === 'dashboard' ? 2.5 : 2} />
          <span className="text-[10px] font-bold">Planos</span>
        </button>
        <button 
          onClick={() => setView('history')}
          className={`flex flex-col items-center gap-1.5 p-2 transition-colors ${view === 'history' ? 'text-blue-500' : 'text-neutral-400 dark:text-neutral-500'}`}
        >
          <History size={24} strokeWidth={view === 'history' ? 2.5 : 2} />
          <span className="text-[10px] font-bold">Evolução</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
