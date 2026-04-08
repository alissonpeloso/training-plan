import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Info } from 'lucide-react';
import { ExerciseItem } from './ExerciseItem';

export const WorkoutView = ({
  workout,
  sessionData, // state local do treino ativo: { [exIndex]: [{reps, weight, done}] }
  updateExerciseData, // function(exIndex, newData)
  onStartRest
}) => {
  if (!workout) return null;

  const totalExercises = workout.exercises.length;
  const completedExercises = workout.exercises.filter((ex, index) => {
    const exData = sessionData[index] || [];
    return exData.length === ex.sets && exData.every(set => set.done);
  }).length;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 transform translate-x-4 -translate-y-4 opacity-10">
          <Dumbbell size={100} />
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl font-black mb-1">{workout.title}</h2>
          <p className="text-neutral-500 dark:text-neutral-400 font-medium text-sm mb-4">{workout.description}</p>
          
          <div className="flex items-center gap-2">
            <div className="h-1.5 flex-1 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-500" 
                style={{ width: `${(completedExercises / totalExercises) * 100}%` }}
              />
            </div>
            <span className="text-xs font-bold text-neutral-500 dark:text-neutral-300">
              {completedExercises} / {totalExercises}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {workout.exercises.map((ex, index) => (
          <ExerciseItem 
            key={index}
            exercise={ex}
            index={index}
            exerciseData={sessionData[index] || []}
            updateExerciseData={(newData) => updateExerciseData(index, newData)}
            onStartRest={onStartRest}
          />
        ))}
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/10 rounded-2xl p-5 border border-blue-100 dark:border-blue-900/30">
        <h4 className="font-bold text-sm mb-2 flex items-center gap-2 text-blue-800 dark:text-blue-400">
          <Info size={16} /> Lembrete Científico
        </h4>
        <ul className="text-xs text-blue-900/80 dark:text-blue-300/80 space-y-2 list-disc pl-4 leading-relaxed">
          <li><strong>Cadência:</strong> Controle a descida (2-4 seg). É no alongamento que ocorre a maior hipertrofia.</li>
          <li><strong>Progressão:</strong> Aumente o peso assim que atingir o topo das repetições em todas as séries.</li>
          <li><strong>Intensidade:</strong> Termine a 1 ou 2 repetições da falha total.</li>
        </ul>
      </div>
    </motion.div>
  );
};
