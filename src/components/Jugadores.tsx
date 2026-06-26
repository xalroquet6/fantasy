import { type JornadaLiga } from '../tipos';

interface JugadoresProps {
  PARTICIPANTES: Array<{ id: string; nombre: string }>;
  JORNADAS: JornadaLiga[];
  jugadorSeleccionado: string | null;
  setJugadorSeleccionado: (id: string | null) => void;
  tituloEstilo: string;
}

export default function Jugadores({ 
  PARTICIPANTES, 
  JORNADAS, 
  jugadorSeleccionado, 
  setJugadorSeleccionado, 
  tituloEstilo 
}: JugadoresProps) {

  const ganadoresPorJornada: Record<number, string[]> = {}; // Guarda jornadaId -> [idGanador1, idGanador2...] (por si hay empates)

  JORNADAS.forEach(jornada => {
    if (!jornada.resultados || jornada.resultados.length === 0) return;
    
    // Encontramos la puntuación máxima de esta jornada
    const maxPuntos = Math.max(...jornada.resultados.map(r => r.puntos));
    
    // Filtramos quién o quiénes consiguieron esa puntuación máxima
    const ganadores = jornada.resultados
      .filter(r => r.puntos === maxPuntos)
      .map(r => r.participanteID);
      
    ganadoresPorJornada[jornada.numeroJornada] = ganadores;
  });

  // Función manejadora del acordeón
  const toggleJugador = (id: string) => {
    // Si el jugador ya estaba abierto, al clicarlo lo cerramos (ponemos null), si no, lo abrimos
    if (jugadorSeleccionado === id) {
      setJugadorSeleccionado(null);
    } else {
      setJugadorSeleccionado(id);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className={tituloEstilo}>
        <span className="w-1.5 h-6 bg-indigo-600 inline-block"></span>
        Estadísticas de Jugadores
      </h2>

      <div className="space-y-3">
        {PARTICIPANTES.map(jugador => {
          
          // --- MÁQUINA DE CÁLCULO PARA EL JUGADOR ACTUAL ---
          const todasMisPuntuaciones = JORNADAS.map(jornada => {
            const res = jornada.resultados.find(r => r.participanteID === jugador.id);
            return res ? res.puntos : null;
          }).filter((p): p is number => p !== null);  // Filtramos jornadas no jugadas o sin datos

          const puntosTotales = todasMisPuntuaciones.reduce((acc, p) => acc + p, 0);
          const jornadasJugadas = todasMisPuntuaciones.length;
          const mediaPuntos = jornadasJugadas > 0 ? (puntosTotales / jornadasJugadas).toFixed(1) : '0';
          const maxPuntos = jornadasJugadas > 0 ? Math.max(...todasMisPuntuaciones) : 0;

          // Contamos cuántas veces su ID aparece en la lista de ganadores de jornada
          let jornadasGanadas = 0;
          JORNADAS.forEach(jornada => {
            if (ganadoresPorJornada[jornada.numeroJornada]?.includes(jugador.id)) {
              jornadasGanadas++;
            }
          });

          const estaAbierto = jugadorSeleccionado === jugador.id;

          return (
            <div 
              key={jugador.id} 
              className={`border rounded-xl transition-all duration-200 overflow-hidden ${
                estaAbierto 
                  ? 'bg-white border-red-600 shadow-md shadow-amber-500/5' 
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              {/* Botón de la cabecera del acordeón */}
              <button
                onClick={() => toggleJugador(jugador.id)}
                className="w-full flex items-center justify-between px-5 py-4 font-bold text-slate-700 text-left"
              >
                <span className="text-base md:text-lg">{jugador.nombre}</span>
                <span className={`text-xl transition-transform duration-200 text-slate-400 ${estaAbierto ? 'rotate-180 text-amber-500' : ''}`}>
                  ▼
                </span>
              </button>

              {/* Contenido desplegable con las estadísticas */}
              <div 
                className={`transition-all duration-300 ease-in-out ${
                  estaAbierto ? 'max-h-96 border-t border-slate-100 bg-slate-50/50' : 'max-h-0 pointer-events-none'
                } overflow-hidden`}
              >
                <div className="p-5 grid grid-cols-2 gap-4 text-center">
                  
                  <div className="bg-white p-3 border border-slate-100 rounded-xl shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Puntos Totales</p>
                    <p className="text-2xl font-black text-indigo-600">{puntosTotales}</p>
                  </div>

                  <div className="bg-white p-3 border border-slate-100 rounded-xl shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Jornadas Ganadas</p>
                    <p className="text-2xl font-black text-emerald-600">{jornadasGanadas}</p>
                  </div>

                  <div className="bg-white p-3 border border-slate-100 rounded-xl shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Media por Partido</p>
                    <p className="text-2xl font-black text-slate-700">{mediaPuntos} <span className="text-xs text-slate-400 font-bold">pts</span></p>
                  </div>

                  <div className="bg-white p-3 border border-slate-100 rounded-xl shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Récord Jornada</p>
                    <p className="text-2xl font-black text-red-500">{maxPuntos}</p>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}