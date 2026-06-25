interface ReglamentoProps {
  tituloEstilo: string;
}

export default function Reglamento({ tituloEstilo }: ReglamentoProps) {
  const normas = [
    "Norma 1: Las alineaciones deben guardarse antes del primer partido de la jornada.",
    "Norma 2: Las sanciones por no alinear restan puntos directos en la clasificación.",
    "Norma 3: Los empates en la Copa se resolverán por la puntuación del miembro con mayor puntuación individual."
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className={tituloEstilo}>
        <span className="w-1.5 h-6 bg-indigo-600 rounded-full inline-block"></span>
        Reglamento Oficial de la Liga
      </h2>
      <div className="space-y-3">
        {normas.map((norma, index) => (
          <p key={index} className="bg-white text-slate-700 border border-slate-200/60 p-4 rounded-xl shadow-sm font-medium">
            {norma}
          </p>
        ))}
      </div>
    </div>
  );
}