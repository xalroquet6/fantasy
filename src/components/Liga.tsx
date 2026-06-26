import { useState } from 'react';
import { type JornadaLiga } from '../tipos';

interface LigaProps {
  clasificacion: Array<{ nombre: string; puntos: number }>;
  PARTICIPANTES: Array<{ id: string; nombre: string }>;
  JORNADAS: JornadaLiga[]
  verPerfilJugador: (idJugador: string) => void;
  tituloEstilo: string;
}

export default function Liga({ clasificacion, PARTICIPANTES, JORNADAS, verPerfilJugador, tituloEstilo }: LigaProps) {
  
  // Buscamos cuál es la última jornada que tiene datos reales apuntados
  const jornadasConDatos = JORNADAS.filter(j => j.resultados && j.resultados.length > 0);
  
  const ultimaJornadaId = jornadasConDatos.length > 0 
    ? Math.max(...jornadasConDatos.map(j => j.numeroJornada)) 
    : 1;

  // Estado controlado para saber qué jornada elige el usuario
  const [jornadaSeleccionadaId, setJornadaSeleccionadaId] = useState<number>(ultimaJornadaId);

  // Buscamos el objeto de la jornada elegida en el desplegable
  const jornadaActual = JORNADAS.find(j => j.numeroJornada === jornadaSeleccionadaId);

  // Construimos la lista de puntos de esta jornada específica para cada participante
  const clasificacionJornada = PARTICIPANTES.map(player => {
    const resultado = jornadaActual?.resultados.find(r => r.participanteID === player.id);
    return {
      id: player.id, // Guardamos el ID para poder usarlo en el click del botón
      nombre: player.nombre,
      puntos: resultado ? resultado.puntos : 0
    };
  });
  
  clasificacionJornada.sort((a, b) => b.puntos - a.puntos); // Ordenados de mayor a menor puntuación en esta jornada

  let textoNombre = "flex items-center justify-between border-b border-slate-100 py-3 last:border-0 last:pb-0 hover:bg-slate-50/80 px-2 rounded-lg transition-colors"
  let selectNombre = "font-bold text-slate-700 hover:text-red-600 hover:underline transition-colors text-left"
  
  return (
    <div className="max-w-5xl mx-auto">
      
      {/* Layout flexible en cuadrícula */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* ================= COLUMNA IZQUIERDA: CLASIFICACIÓN GENERAL ================= */}
        <div>
          <h2 className={tituloEstilo}>
            <span className="w-1.5 h-6 bg-indigo-600 inline-block"></span>
            Clasificación General
          </h2>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <ul className="space-y-1"> 
              {clasificacion.map((item, index) => (
                <li 
                  key={item.nombre}
                  className={textoNombre}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 font-bold w-6 text-center">{index + 1}º</span>
                    <button 
                      onClick={() => {
                        const playerReal = PARTICIPANTES.find(p => p.nombre === item.nombre);
                        if (playerReal) verPerfilJugador(playerReal.id);
                      }}
                      className={selectNombre}
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

        {/* ================= COLUMNA DERECHA: MARCADOR POR JORNADA ================= */}
        <div>
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-6">
            <h2 className="text-xl md:text-2xl font-bold tracking-wide text-slate-800 flex items-center gap-3">
              <span className="w-1.5 h-6 bg-red-600 inline-block"></span>
              Puntos Jornada
            </h2>
            
            <select 
              value={jornadaSeleccionadaId}
              onChange={(e) => setJornadaSeleccionadaId(Number(e.target.value))}
              className="bg-white border border-slate-200 text-slate-700 font-bold rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:border-red-500 shadow-sm transition-colors cursor-pointer"
            >
              {JORNADAS.map(j => (
                <option key={j.numeroJornada} value={j.numeroJornada}>Jornada {j.numeroJornada}</option>
              ))}
            </select>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <ul className="space-y-1"> 
              {clasificacionJornada.map((item, index) => (
                <li 
                  key={item.nombre}
                  className={textoNombre}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 font-bold w-6 text-center">{index + 1}º</span>

                    <button 
                      onClick={() => verPerfilJugador(item.id)}
                      className={selectNombre}
                    >
                      {item.nombre}
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="font-extrabold text-red-600 text-lg">{item.puntos}</span>
                    <span className="text-xs text-slate-400 ml-1 font-semibold uppercase tracking-wider">pts</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}