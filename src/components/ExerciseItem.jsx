import React, { useState } from 'react';
import { CheckCircle2, Circle, Info, Zap, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ExerciseItem = ({ 
  exercise, 
  index, 
  exerciseData, // Ex: [{reps: 8, weight: 60, done: true}, ...]
  updateExerciseData,
  onStartRest
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Calcula se o exercício inteiro está "concluído" (todas as séries feitas)
  const isDone = exerciseData.length === exercise.sets && exerciseData.every(set => set.done);

  const handleSetComplete = (setIndex, reps, weight) => {
    const newData = [...exerciseData];
    // Garante que o array tem tamanho até o setIndex
    while (newData.length <= setIndex) {
      newData.push({ reps: exercise.reps, weight: '', done: false });
    }
    
    const wasDone = newData[setIndex].done;
    newData[setIndex] = { reps, weight, done: !wasDone };
    
    updateExerciseData(newData);

    if (!wasDone && exercise.restSeconds) {
      onStartRest(exercise.restSeconds);
    }
  };

  const getSetData = (setIndex) => {
    return exerciseData[setIndex] || { reps: exercise.reps, weight: '', done: false };
  };

  return (
    <motion.div 
      layout
      className={`group relative bg-white dark:bg-neutral-800 border rounded-2xl p-4 transition-all ${
        isDone 
        ? 'border-green-200 dark:border-green-900 bg-green-50/30 dark:bg-green-900/10' 
        : 'border-neutral-200 dark:border-neutral-700 shadow-sm'
      }`}
    >
      {exercise.biSet && (
        <div className="absolute left-0 top-6 w-1 h-8 bg-orange-400 rounded-r-full shadow-sm" title="Bi-set" />
      )}
      
      {/* Cabeçalho do Exercício */}
      <div 
        className="flex items-center gap-4 cursor-pointer select-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className={`transition-colors ${isDone ? 'text-green-500' : 'text-neutral-300 dark:text-neutral-600 group-hover:text-neutral-400 dark:group-hover:text-neutral-500'}`}>
          {isDone ? <CheckCircle2 size={24} fill="currentColor" className="text-white dark:text-neutral-900 fill-green-500" /> : <Circle size={24} />}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h4 className={`font-bold transition-all ${isDone ? 'text-neutral-400 dark:text-neutral-500 line-through' : 'text-neutral-800 dark:text-neutral-100'}`}>
              {exercise.name}
            </h4>
            <button className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300">
              {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>
          
          <div className="flex flex-wrap gap-y-2 gap-x-4 mt-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
              <Zap size={14} className="text-orange-500" />
              <span>{exercise.sets} séries × {exercise.reps}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
              <Clock size={14} className="text-blue-500" />
              <span>{exercise.rest}</span>
            </div>
          </div>

          {exercise.note && !isExpanded && (
            <div className="mt-2 flex items-center gap-1 text-[11px] text-neutral-400 dark:text-neutral-500 italic">
              <Info size={12} />
              <span className="truncate">{exercise.note}</span>
            </div>
          )}
        </div>
      </div>

      {/* Área Expandida (Séries) */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-700"
          >
            {exercise.note && (
              <div className="mb-4 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl flex gap-2">
                <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />
                <span className="text-xs text-blue-800 dark:text-blue-300 font-medium leading-relaxed">{exercise.note}</span>
              </div>
            )}

            <div className="space-y-3">
              <div className="flex text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider px-2">
                <span className="w-12 text-center">Série</span>
                <span className="flex-1 text-center">Reps</span>
                <span className="flex-1 text-center">Kg</span>
                <span className="w-12 text-center">Feito</span>
              </div>

              {Array.from({ length: exercise.sets }).map((_, setIdx) => {
                const setData = getSetData(setIdx);
                return (
                  <div key={setIdx} className={`flex items-center gap-2 p-2 rounded-xl transition-colors ${setData.done ? 'bg-green-50 dark:bg-green-900/10' : 'bg-neutral-50 dark:bg-neutral-900/50'}`}>
                    <div className="w-12 text-center text-sm font-bold text-neutral-500 dark:text-neutral-400">
                      {setIdx + 1}
                    </div>
                    
                    <div className="flex-1">
                      <input 
                        type="text" 
                        value={setData.reps}
                        onChange={(e) => {
                          const newData = [...exerciseData];
                          if (!newData[setIdx]) newData[setIdx] = { reps: '', weight: '', done: false };
                          newData[setIdx].reps = e.target.value;
                          updateExerciseData(newData);
                        }}
                        className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg py-2 text-center text-sm font-bold text-neutral-800 dark:text-white disabled:opacity-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder={exercise.reps}
                        disabled={setData.done}
                      />
                    </div>

                    <div className="flex-1">
                      <input 
                        type="text" 
                        inputMode="decimal"
                        value={setData.weight}
                        onChange={(e) => {
                          const newData = [...exerciseData];
                          if (!newData[setIdx]) newData[setIdx] = { reps: exercise.reps, weight: '', done: false };
                          newData[setIdx].weight = e.target.value;
                          updateExerciseData(newData);
                        }}
                        className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg py-2 text-center text-sm font-bold text-neutral-800 dark:text-white disabled:opacity-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="--"
                        disabled={setData.done}
                      />
                    </div>

                    <div className="w-12 flex justify-center">
                      <button 
                        onClick={() => handleSetComplete(setIdx, setData.reps, setData.weight)}
                        className={`p-2 rounded-lg transition-all ${
                          setData.done 
                          ? 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400' 
                          : 'bg-neutral-200 text-neutral-400 dark:bg-neutral-700 dark:text-neutral-500 hover:bg-green-50 hover:text-green-500 dark:hover:bg-neutral-600'
                        }`}
                      >
                        <CheckCircle2 size={20} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
