import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { workoutData } from '../data/workoutData';

export const Dashboard = ({ 
  suggestedWorkoutId, 
  activeDay, 
  setActiveDay, 
  getCompletionPercentage 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-6"
    >
      {/* Banner de Sugestão de Hoje */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl shadow-blue-900/20 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute left-0 bottom-0 w-24 h-24 bg-blue-400/20 rounded-full blur-xl transform -translate-x-1/2 translate-y-1/2" />
        
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <Calendar size={20} className="text-blue-200" />
          <span className="font-semibold text-blue-100 uppercase tracking-wider text-xs">Sugestão para hoje</span>
        </div>

        {suggestedWorkoutId === 0 ? (
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-2">Descanso</h2>
            <p className="text-blue-100 text-sm leading-relaxed">A recuperação é quando o músculo cresce. Foque na nutrição e sono!</p>
          </div>
        ) : (
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-1">{workoutData.find(d => d.id === suggestedWorkoutId)?.title}</h2>
            <p className="text-blue-200 text-sm font-medium mb-6">{workoutData.find(d => d.id === suggestedWorkoutId)?.subtitle}</p>
            <button 
              onClick={() => setActiveDay(suggestedWorkoutId)}
              className="bg-white text-blue-700 px-6 py-2.5 rounded-xl font-bold hover:bg-neutral-50 transition-colors shadow-sm text-sm"
            >
              Começar Treino
            </button>
          </div>
        )}
      </div>

      <div>
        <h3 className="font-bold text-neutral-800 dark:text-white mb-4 text-lg">Todos os Planos</h3>
        <div className="grid grid-cols-2 gap-3">
          {workoutData.map(day => {
            const completion = getCompletionPercentage(day.id);
            const isCompleted = completion === 100;
            return (
              <button
                key={day.id}
                onClick={() => setActiveDay(day.id)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  activeDay === day.id 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-500/20 dark:ring-blue-500/40' 
                  : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-600'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    day.id % 2 === 0 ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                  }`}>
                    {day.id % 2 === 0 ? 'Inferior' : 'Superior'}
                  </span>
                  {isCompleted && (
                    <CheckCircle2 size={16} className="text-green-500" />
                  )}
                </div>
                <h3 className="font-bold text-sm leading-tight text-neutral-900 dark:text-white">{day.title}</h3>
                
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-1.5 flex-1 bg-neutral-100 dark:bg-neutral-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-blue-500'}`} 
                      style={{ width: `${completion}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-neutral-400">{completion}%</span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </motion.div>
  );
};
