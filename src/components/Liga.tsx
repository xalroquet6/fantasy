interface LigaProps {
  clasificacion: Array<{ nombre: string; puntos: number }>;
  PARTICIPANTES: Array<{ id: string; nombre: string }>;
  verPerfilJugador: (idJugador: string) => void;
  tituloEstilo: string;
}

export default function Liga({ clasificacion, PARTICIPANTES, verPerfilJugador, tituloEstilo }: LigaProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className={tituloEstilo}>
        <span className="w-1.5 h-6 bg-indigo-600 rounded-full inline-block"></span>
        Clasificación General
      </h2>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <ul className="space-y-1"> 
          {clasificacion.map((item, index) => (
            <li 
              key={item.nombre}
              className="flex items-center justify-between border-b border-slate-100 py-3 last:border-0 last:pb-0 hover:bg-slate-50/80 px-2 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-slate-400 font-bold w-6 text-center">{index + 1}º</span>
                <button 
                  onClick={() => {
                    const playerReal = PARTICIPANTES.find(p => p.nombre === item.nombre);
                    if (playerReal) verPerfilJugador(playerReal.id);
                  }}
                  className="font-bold text-slate-700 hover:text-red-600 hover:underline transition-colors text-left"
                >
                  {item.nombre}
                </button>
              </div>

              <div className="text-right">
                <span className="font-extrabold text-indigo-600 text-lg">{item.puntos}</span>
                <span className="text-xs text-slate-400 ml-1 font-semibold uppercase tracking-wider">pts</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}