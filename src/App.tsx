import { useState } from 'react';
import { PARTICIPANTES, JORNADAS } from './datos';

// Importamos nuestros nuevos componentes limpios
import Navbar from './components/NavBar';
import Liga from './components/Liga';
import Reglamento from './components/Reglamento';
import Champions from './components/Champions';
import Copa from './components/Copa';
import Jugadores from './components/Jugadores';



const ESTILOS = {
  tituloSeccion: "text-xl md:text-2xl font-bold tracking-wide text-slate-800 flex items-center gap-3 mb-6 border-b border-slate-200 pb-3",
  tarjetaContenedora: "bg-white border border-slate-200 rounded-2xl p-6 shadow-sm",
  textoSecundario: "text-slate-500 font-medium"
};

export default function App() {
  const [pestanaActiva, setPestanaActiva] = useState<string>('liga');
  const [jugadorSeleccionado, setJugadorSeleccionado] = useState<string | null>(null);

  const verPerfilJugador = (idJugador: string) => {
    setJugadorSeleccionado(idJugador);
    setPestanaActiva('jugadores');
  };
  
  // Procesamiento de datos de la liga
  const puntosTotales: Record<string, number> = {};
  PARTICIPANTES.forEach(player => { puntosTotales[player.id] = 0; });
  
  JORNADAS.forEach(jornada => {
    jornada.resultados.forEach(resultado => {
      puntosTotales[resultado.participanteID] += resultado.puntos;
    });
  });

  const clasificacion = PARTICIPANTES.map(player => ({
    nombre: player.nombre,
    puntos: puntosTotales[player.id]
  })).sort((a, b) => b.puntos - a.puntos);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased p-6">
      
      <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-red-700 tracking-wider text-center my-8 uppercase drop-shadow-sm">
        🏆 La Liga Fantasy PALOS FC 🏆
      </h1>

      {/* Menú Superior */}
      <Navbar pestanaActiva={pestanaActiva} setPestanaActiva={setPestanaActiva} />

      {/* --- VISTAS CONDICIONALES MODULARIZADAS --- */}
      {pestanaActiva === 'liga' && (
        <Liga 
          clasificacion={clasificacion} 
          PARTICIPANTES={PARTICIPANTES} 
          verPerfilJugador={verPerfilJugador} 
          tituloEstilo={ESTILOS.tituloSeccion} 
        />
      )}

      {pestanaActiva === 'copa' && (
        <Copa 
          titulo="Copa PALOS FC" 
          descripcion="Aquí programaremos los cruces y las puntuaciones de las parejas en su jornada." 
          tituloEstilo={ESTILOS.tituloSeccion}
          tarjetaEstilo={ESTILOS.tarjetaContenedora}
          textoEstilo={ESTILOS.textoSecundario}
        />
      )}

      {pestanaActiva === 'champions' && (
        <Champions 
          titulo="Champions PALOS FC" 
          descripcion="Aquí programaremos los cruces y las puntuaciones de cada jornada." 
          tituloEstilo={ESTILOS.tituloSeccion}
          tarjetaEstilo={ESTILOS.tarjetaContenedora}
          textoEstilo={ESTILOS.textoSecundario}
        />
      )}

      {pestanaActiva === 'reglamento' && (
        <Reglamento tituloEstilo={ESTILOS.tituloSeccion} />
      )}

      {pestanaActiva === 'jugadores' && (
        <Jugadores 
          titulo="Estadísticas de Jugadores" 
          descripcion="Selecciona un jugador en la clasificación general para auditar sus números de la temporada." 
          tituloEstilo={ESTILOS.tituloSeccion}
          tarjetaEstilo={ESTILOS.tarjetaContenedora}
          textoEstilo={ESTILOS.textoSecundario}
        />
      )}

    </div>
  );
}