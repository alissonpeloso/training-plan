import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Dumbbell, 
  Calendar, 
  ChevronRight, 
  Info, 
  Clock, 
  RotateCcw,
  Zap,
  LayoutDashboard
} from 'lucide-react';

const workoutData = [
  {
    id: 1,
    title: "Dia 1: Superior A",
    subtitle: "Tensão Mecânica",
    description: "Foco em cargas elevadas e exercícios multiarticulares.",
    exercises: [
      { name: "Supino Reto (Barra/Halter)", sets: 3, reps: "6-8", rest: "3 min", note: "Mecanotransdução máxima." },
      { name: "Barra Fixa ou Pulley Frente", sets: 3, reps: "6-8", rest: "3 min", note: "Foco no alongamento no topo." },
      { name: "Supino Inclinado (Halter)", sets: 3, reps: "8-10", rest: "90 seg", note: "Bi-set 1 (Mesmo Banco)", biSet: true },
      { name: "Remada Apoiada (Halter)", sets: 3, reps: "8-10", rest: "90 seg", note: "Bi-set 1 (Mesmo Banco)", biSet: true },
      { name: "Elevação Lateral (Polia)", sets: 3, reps: "12-15", rest: "60 seg", note: "Bi-set 2 (Polia)", biSet: true },
      { name: "Crucifixo Inverso (Polia)", sets: 3, reps: "12-15", rest: "60 seg", note: "Bi-set 2 (Polia)", biSet: true },
    ]
  },
  {
    id: 2,
    title: "Dia 2: Inferior A",
    subtitle: "Dominante de Quadríceps",
    description: "Foco em amplitude total e alongamento sob carga.",
    exercises: [
      { name: "Agachamento (Livre/Hack)", sets: 3, reps: "6-8", rest: "3-5 min", note: "Flexão profunda de joelho." },
      { name: "Stiff (RDL)", sets: 3, reps: "8-10", rest: "3 min", note: "Alongamento máximo dos isquios." },
      { name: "Agachamento Búlgaro", sets: 3, reps: "10-12", rest: "90 seg", note: "Unilateral: equilíbrio e simetria." },
      { name: "Cadeira Extensora", sets: 3, reps: "12-15", rest: "60 seg", note: "Bi-set (Quadríceps)", biSet: true },
      { name: "Panturrilha em Pé", sets: 3, reps: "12-15", rest: "60 seg", note: "Bi-set (Pausa 2s no fundo)", biSet: true },
    ]
  },
  {
    id: 3,
    title: "Dia 3: Superior B",
    subtitle: "Estresse Metabólico",
    description: "Foco em volume e estação de polia para praticidade.",
    exercises: [
      { name: "Desenvolvimento (Halter/Barra)", sets: 3, reps: "8-10", rest: "3 min", note: "Empurrão vertical." },
      { name: "Remada Cavalinho", sets: 3, reps: "10-12", rest: "2 min", note: "Espessura de costas." },
      { name: "Crossover", sets: 3, reps: "12-15", rest: "90 seg", note: "Bi-set 1 (Polia)", biSet: true },
      { name: "Pulldown", sets: 3, reps: "12-15", rest: "90 seg", note: "Bi-set 1 (Polia)", biSet: true },
      { name: "Tríceps Corda", sets: 3, reps: "10-12", rest: "60 seg", note: "Bi-set 2 (Polia)", biSet: true },
      { name: "Rosca Polia Baixa", sets: 3, reps: "10-12", rest: "60 seg", note: "Bi-set 2 (Polia)", biSet: true },
      { name: "Abdominal Infra (Paralela)", sets: 3, reps: "15-20", rest: "60 seg", note: "Frequência 2x (Core)." },
    ]
  },
  {
    id: 4,
    title: "Dia 4: Inferior B",
    subtitle: "Cadeia Posterior",
    description: "Foco em força de glúteos e estabilidade.",
    exercises: [
      { name: "Levantamento Terra", sets: 3, reps: "5-8", rest: "3-5 min", note: "Carga sistêmica alta." },
      { name: "Cadeira Flexora", sets: 3, reps: "10-12", rest: "2 min", note: "Hipertrofia via alongamento." },
      { name: "Hip Thrust (Elevação Pélvica)", sets: 3, reps: "8-10", rest: "2 min", note: "Ativação máxima de glúteo." },
      { name: "Panturrilha Leg Press", sets: 3, reps: "15-20", rest: "60 seg", note: "Bi-set (Volume alto)", biSet: true },
      { name: "Abdominal Rollout (Rodinha)", sets: 3, reps: "15-20", rest: "60 seg", note: "Bi-set (Core: Anti-extensão)", biSet: true },
    ]
  }
];

const scheduleMap = {
  1: 1, // Segunda -> Dia 1
  2: 2, // Terça -> Dia 2
  3: 0, // Quarta -> Descanso
  4: 3, // Quinta -> Dia 3
  5: 4, // Sexta -> Dia 4
  6: 0, // Sábado -> Descanso
  0: 0, // Domingo -> Descanso
};

const App = () => {
  const [activeDay, setActiveDay] = useState(1);
  const [completedExercises, setCompletedExercises] = useState({});
  const [view, setView] = useState('today'); // 'today' | 'browse' | 'summary'

  // Determinar sugestão de hoje
  const todayNum = new Date().getDay();
  const suggestedWorkoutId = scheduleMap[todayNum];

  useEffect(() => {
    if (suggestedWorkoutId !== 0 && view === 'today') {
      setActiveDay(suggestedWorkoutId);
    }
  }, [suggestedWorkoutId, view]);

  const toggleExercise = (dayId, exIndex) => {
    const key = `${dayId}-${exIndex}`;
    setCompletedExercises(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const resetProgress = () => {
    if (confirm("Deseja limpar todo o progresso de hoje?")) {
      setCompletedExercises({});
    }
  };

  const currentWorkout = workoutData.find(d => d.id === activeDay);

  const getCompletionPercentage = (dayId) => {
    const total = workoutData.find(d => d.id === dayId).exercises.length;
    const done = workoutData.find(d => d.id === dayId).exercises.filter((_, idx) => completedExercises[`${dayId}-${idx}`]).length;
    return Math.round((done / total) * 100);
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans pb-20">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-10 px-4 py-4">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-neutral-800">Hipertrofia 4-Dias</h1>
            <p className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">Plano Científico</p>
          </div>
          <button 
            onClick={resetProgress}
            className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
            title="Resetar progresso"
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-6">
        
        {/* Banner de Sugestão de Hoje */}
        {view === 'today' && (
          <div className="bg-blue-600 rounded-2xl p-4 text-white shadow-lg shadow-blue-200">
            <div className="flex items-center gap-3 mb-2">
              <Calendar size={20} />
              <span className="font-medium text-blue-100">Sugestão para hoje:</span>
            </div>
            {suggestedWorkoutId === 0 ? (
              <div>
                <h2 className="text-2xl font-bold">Dia de Descanso</h2>
                <p className="text-blue-100 text-sm mt-1">Recuperação é essencial para a hipertrofia. Foca na nutrição e sono!</p>
              </div>
            ) : (
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-2xl font-bold">{workoutData.find(d => d.id === suggestedWorkoutId).title}</h2>
                  <p className="text-blue-100 text-sm">{workoutData.find(d => d.id === suggestedWorkoutId).subtitle}</p>
                </div>
                <button 
                  onClick={() => setView('browse')}
                  className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-xs font-bold transition-all"
                >
                  Mudar Plano
                </button>
              </div>
            )}
          </div>
        )}

        {/* Seletor de Dias (se estiver em modo navegação) */}
        {view === 'browse' && (
          <div className="grid grid-cols-2 gap-3">
            {workoutData.map(day => (
              <button
                key={day.id}
                onClick={() => { setActiveDay(day.id); setView('today'); }}
                className={`p-4 rounded-xl border text-left transition-all ${
                  activeDay === day.id 
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500/20' 
                  : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    day.id % 2 === 0 ? 'bg-orange-100 text-orange-700' : 'bg-purple-100 text-purple-700'
                  }`}>
                    {day.id % 2 === 0 ? 'Inferior' : 'Superior'}
                  </span>
                  {getCompletionPercentage(day.id) === 100 && (
                    <CheckCircle2 size={16} className="text-green-500" />
                  )}
                </div>
                <h3 className="font-bold text-sm leading-tight">{day.title}</h3>
                <div className="mt-2 h-1 w-full bg-neutral-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 transition-all duration-500" 
                    style={{ width: `${getCompletionPercentage(day.id)}%` }}
                  />
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Detalhes do Treino Ativo */}
        {suggestedWorkoutId !== 0 || view !== 'today' ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h3 className="font-bold text-neutral-500 uppercase text-xs tracking-widest flex items-center gap-2">
                <Dumbbell size={14} /> Exercícios do Dia
              </h3>
              <span className="text-xs font-bold text-neutral-400">
                {currentWorkout.exercises.filter((_, idx) => completedExercises[`${activeDay}-${idx}`]).length} / {currentWorkout.exercises.length} Concluídos
              </span>
            </div>

            <div className="space-y-3">
              {currentWorkout.exercises.map((ex, index) => {
                const isDone = completedExercises[`${activeDay}-${index}`];
                return (
                  <div 
                    key={index}
                    onClick={() => toggleExercise(activeDay, index)}
                    className={`group relative bg-white border rounded-2xl p-4 transition-all cursor-pointer select-none active:scale-[0.98] ${
                      isDone 
                      ? 'border-green-200 bg-green-50/30' 
                      : 'border-neutral-200 hover:border-neutral-300 shadow-sm'
                    }`}
                  >
                    {ex.biSet && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-orange-400 rounded-r-full shadow-sm" title="Bi-set" />
                    )}
                    
                    <div className="flex items-center gap-4">
                      <div className={`transition-colors ${isDone ? 'text-green-500' : 'text-neutral-300 group-hover:text-neutral-400'}`}>
                        {isDone ? <CheckCircle2 size={24} fill="currentColor" className="text-white fill-green-500" /> : <Circle size={24} />}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className={`font-bold transition-all ${isDone ? 'text-neutral-400 line-through' : 'text-neutral-800'}`}>
                            {ex.name}
                          </h4>
                        </div>
                        
                        <div className="flex flex-wrap gap-y-2 gap-x-4 mt-2">
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500">
                            <Zap size={14} className="text-orange-500" />
                            <span>{ex.sets} séries × {ex.reps}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500">
                            <Clock size={14} className="text-blue-500" />
                            <span>{ex.rest}</span>
                          </div>
                        </div>

                        {ex.note && (
                          <div className="mt-2 flex items-center gap-1 text-[11px] text-neutral-400 italic">
                            <Info size={12} />
                            <span>{ex.note}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}

        {/* Dicas Científicas */}
        <div className="bg-neutral-100 rounded-2xl p-5 border border-neutral-200">
          <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
            <Info size={16} className="text-blue-500" /> Lembrete Científico
          </h4>
          <ul className="text-xs text-neutral-600 space-y-2 list-disc pl-4">
            <li><strong>Cadência:</strong> Controle a descida (2-4 seg). É no alongamento que ocorre a maior hipertrofia.</li>
            <li><strong>Progressão:</strong> Aumente o peso assim que atingir o topo das repetições em todas as séries.</li>
            <li><strong>Intensidade:</strong> Termine a 1 ou 2 repetições da falha total.</li>
          </ul>
        </div>
      </main>

      {/* Navegação Inferior */}
      <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-neutral-200 px-6 py-3 flex justify-around items-center z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
        <button 
          onClick={() => setView('today')}
          className={`flex flex-col items-center gap-1 transition-colors ${view === 'today' ? 'text-blue-600' : 'text-neutral-400'}`}
        >
          <Dumbbell size={24} />
          <span className="text-[10px] font-bold">Hoje</span>
        </button>
        <button 
          onClick={() => setView('browse')}
          className={`flex flex-col items-center gap-1 transition-colors ${view === 'browse' ? 'text-blue-600' : 'text-neutral-400'}`}
        >
          <LayoutDashboard size={24} />
          <span className="text-[10px] font-bold">Planos</span>
        </button>
        <div className="flex flex-col items-center gap-1 text-neutral-400 opacity-40 grayscale">
          <CheckCircle2 size={24} />
          <span className="text-[10px] font-bold">Evolução</span>
        </div>
      </nav>
    </div>
  );
};

export default App;
