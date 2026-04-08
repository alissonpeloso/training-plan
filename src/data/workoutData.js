export const workoutData = [
  {
    id: 1,
    title: "Dia 1: Superior A",
    subtitle: "Tensão Mecânica",
    description: "Foco em cargas elevadas e exercícios multiarticulares.",
    exercises: [
      { name: "Supino Reto (Barra/Halter)", sets: 3, reps: "6-8", rest: "3 min", restSeconds: 180, note: "Mecanotransdução máxima." },
      { name: "Barra Fixa ou Pulley Frente", sets: 3, reps: "6-8", rest: "3 min", restSeconds: 180, note: "Foco no alongamento no topo." },
      { name: "Supino Inclinado (Halter)", sets: 3, reps: "8-10", rest: "90 seg", restSeconds: 90, note: "Bi-set 1 (Mesmo Banco)", biSet: true },
      { name: "Remada Apoiada (Halter)", sets: 3, reps: "8-10", rest: "90 seg", restSeconds: 90, note: "Bi-set 1 (Mesmo Banco)", biSet: true },
      { name: "Elevação Lateral (Polia)", sets: 3, reps: "12-15", rest: "60 seg", restSeconds: 60, note: "Bi-set 2 (Polia)", biSet: true },
      { name: "Crucifixo Inverso (Polia)", sets: 3, reps: "12-15", rest: "60 seg", restSeconds: 60, note: "Bi-set 2 (Polia)", biSet: true },
    ]
  },
  {
    id: 2,
    title: "Dia 2: Inferior A",
    subtitle: "Dominante de Quadríceps",
    description: "Foco em amplitude total e alongamento sob carga.",
    exercises: [
      { name: "Agachamento (Livre/Hack)", sets: 3, reps: "6-8", rest: "3-5 min", restSeconds: 240, note: "Flexão profunda de joelho." },
      { name: "Stiff (RDL)", sets: 3, reps: "8-10", rest: "3 min", restSeconds: 180, note: "Alongamento máximo dos isquios." },
      { name: "Agachamento Búlgaro", sets: 3, reps: "10-12", rest: "90 seg", restSeconds: 90, note: "Unilateral: equilíbrio e simetria." },
      { name: "Cadeira Extensora", sets: 3, reps: "12-15", rest: "60 seg", restSeconds: 60, note: "Bi-set (Quadríceps)", biSet: true },
      { name: "Panturrilha em Pé", sets: 3, reps: "12-15", rest: "60 seg", restSeconds: 60, note: "Bi-set (Pausa 2s no fundo)", biSet: true },
    ]
  },
  {
    id: 3,
    title: "Dia 3: Superior B",
    subtitle: "Estresse Metabólico",
    description: "Foco em volume e estação de polia para praticidade.",
    exercises: [
      { name: "Desenvolvimento (Halter/Barra)", sets: 3, reps: "8-10", rest: "3 min", restSeconds: 180, note: "Empurrão vertical." },
      { name: "Remada Cavalinho", sets: 3, reps: "10-12", rest: "2 min", restSeconds: 120, note: "Espessura de costas." },
      { name: "Crossover", sets: 3, reps: "12-15", rest: "90 seg", restSeconds: 90, note: "Bi-set 1 (Polia)", biSet: true },
      { name: "Pulldown", sets: 3, reps: "12-15", rest: "90 seg", restSeconds: 90, note: "Bi-set 1 (Polia)", biSet: true },
      { name: "Tríceps Corda", sets: 3, reps: "10-12", rest: "60 seg", restSeconds: 60, note: "Bi-set 2 (Polia)", biSet: true },
      { name: "Rosca Polia Baixa", sets: 3, reps: "10-12", rest: "60 seg", restSeconds: 60, note: "Bi-set 2 (Polia)", biSet: true },
      { name: "Abdominal Infra (Paralela)", sets: 3, reps: "15-20", rest: "60 seg", restSeconds: 60, note: "Frequência 2x (Core)." },
    ]
  },
  {
    id: 4,
    title: "Dia 4: Inferior B",
    subtitle: "Cadeia Posterior",
    description: "Foco em força de glúteos e estabilidade.",
    exercises: [
      { name: "Levantamento Terra", sets: 3, reps: "5-8", rest: "3-5 min", restSeconds: 240, note: "Carga sistêmica alta." },
      { name: "Cadeira Flexora", sets: 3, reps: "10-12", rest: "2 min", restSeconds: 120, note: "Hipertrofia via alongamento." },
      { name: "Hip Thrust (Elevação Pélvica)", sets: 3, reps: "8-10", rest: "2 min", restSeconds: 120, note: "Ativação máxima de glúteo." },
      { name: "Panturrilha Leg Press", sets: 3, reps: "15-20", rest: "60 seg", restSeconds: 60, note: "Bi-set (Volume alto)", biSet: true },
      { name: "Abdominal Rollout (Rodinha)", sets: 3, reps: "15-20", rest: "60 seg", restSeconds: 60, note: "Bi-set (Core: Anti-extensão)", biSet: true },
    ]
  }
];

export const scheduleMap = {
  1: 1, // Segunda -> Dia 1
  2: 2, // Terça -> Dia 2
  3: 0, // Quarta -> Descanso
  4: 3, // Quinta -> Dia 3
  5: 4, // Sexta -> Dia 4
  6: 0, // Sábado -> Descanso
  0: 0, // Domingo -> Descanso
};
