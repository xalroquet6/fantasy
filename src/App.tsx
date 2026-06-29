import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { type Participante, type JornadaLiga } from './tipos';

// Importamos componentes
import Navbar from './components/NavBar';
import Liga from './components/Liga';
import Reglamento from './components/Reglamento';
import Champions from './components/Champions';
import Copa from './components/Copa';
import Jugadores from './components/Jugadores';
import Login from './components/Login'; // ⬅️ Nuevo
import Admin from './components/Admin'; // ⬅️ Nuevo

const ESTILOS = {
  tituloSeccion: "text-xl md:text-2xl font-bold tracking-wide text-slate-800 flex items-center gap-3 mb-6 border-b border-slate-200 pb-3",
  tarjetaContenedora: "bg-white border border-slate-200 rounded-2xl p-6 shadow-sm",
  textoSecundario: "text-slate-500 font-medium"
};

export default function App() {
  const [pestanaActiva, setPestanaActiva] = useState<string>('liga');
  const [jugadorSeleccionado, setJugadorSeleccionado] = useState<string | null>(null);

  // Estados de datos
  const [participantes, setParticipantes] = useState<Participante[]>([]);
  const [jornadas, setJornadas] = useState<JornadaLiga[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  // 🔐 ESTADOS DE AUTENTICACIÓN
  const [sesionActiva, setSesionActiva] = useState<boolean>(false);
  const [mostrarLogin, setMostrarLogin] = useState<boolean>(false);

  const verPerfilJugador = (idJugador: string) => {
    setJugadorSeleccionado(idJugador);
    setPestanaActiva('jugadores');
  };

  // Encapsulamos la descarga de datos en una función reutilizable
  async function descargarDatosDeSupabase() {
    try {
      const [resParticipantes, resJornadas, resResultados] = await Promise.all([
        supabase.from('participantes').select('id, nombre'),
        supabase.from('jornadas').select('id, numero_jornada').order('numero_jornada', { ascending: true }),
        supabase.from('resultados').select('jornada_id, participante_id, puntos')
      ]);

      if (resParticipantes.error) throw resParticipantes.error;
      if (resJornadas.error) throw resJornadas.error;
      if (resResultados.error) throw resResultados.error;

      const listaParticipantes: Participante[] = resParticipantes.data || [];
      const listaJornadas: JornadaLiga[] = (resJornadas.data || []).map(j => {
        const resultadosDeEstaJornada = (resResultados.data || [])
          .filter(r => r.jornada_id === j.id)
          .map(r => ({
            participanteID: r.participante_id,
            puntos: r.puntos
          }));

        return {
          numeroJornada: j.numero_jornada,
          resultados: resultadosDeEstaJornada
        };
      });

      setParticipantes(listaParticipantes);
      setJornadas(listaJornadas);
    } catch (error) {
      console.error("Error cargando Supabase:", error);
    }
  }

  useEffect(() => {
    async function inicializarApp() {
      setCargando(true);
      // 1. Descargar puntuaciones
      await descargarDatosDeSupabase();
      
      // 2. Comprobar si el navegador ya tenía una sesión de admin guardada en las cookies/localStorage
      const { data: { session } } = await supabase.auth.getSession();
      setSesionActiva(!!session);
      
      setCargando(false);
    }
    inicializarApp();
  }, []);

  // Función para cerrar sesión
  async function manejarLogout() {
    await supabase.auth.signOut();
    setSesionActiva(false);
    if (pestanaActiva === 'admin') setPestanaActiva('liga');
  }

  // Lógica de clasificación
  const puntosTotales: Record<string, number> = {};
  participantes.forEach(player => { puntosTotales[player.id] = 0; });
  jornadas.forEach(jornada => {
    jornada.resultados.forEach(resultado => {
      if (puntosTotales[resultado.participanteID] !== undefined) {
        puntosTotales[resultado.participanteID] += resultado.puntos;
      }
    });
  });
  const clasificacion = participantes.map(player => ({
    nombre: player.nombre,
    puntos: puntosTotales[player.id] || 0
  })).sort((a, b) => b.puntos - a.puntos);

  if (cargando) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center font-sans">
        <div className="text-indigo-600 font-black text-xl animate-pulse tracking-widest uppercase">🏆 Liga Fantasy 🏆</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased p-6 flex flex-col">
      
      <div className="grow">
        <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-700 to-red-700 tracking-wider text-center my-8 uppercase drop-shadow-sm">
          🏆 La Liga Fantasy PALOS FC 🏆
        </h1>

        {/* Menú Superior */}
        <Navbar pestanaActiva={pestanaActiva} setPestanaActiva={setPestanaActiva} />

        {/* 🛠️ MENÚ EXTRA EXCLUSIVO SI HAY SESIÓN DE ADMIN */}
        {sesionActiva && (
          <div className="flex justify-center mb-6 -mt-4">
            <button
              onClick={() => setPestanaActiva('admin')}
              className={`px-4 py-1.5 rounded font-bold text-xs transition-all cursor-pointer border ${
                pestanaActiva === 'admin'
                  ? 'bg-slate-800 text-white border-slate-800 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Ir al Panel Admin
            </button>
          </div>
        )}

        {/* Muestra el formulario de login si hiciste clic abajo */}
        {mostrarLogin && !sesionActiva ? (
          <Login 
            onLoginSuccess={() => { setSesionActiva(true); setMostrarLogin(false); setPestanaActiva('admin'); }}
            onCancelar={() => setMostrarLogin(false)}
          />
        ) : (
          <>
            {/* --- VISTAS CONDICIONALES --- */}
            {pestanaActiva === 'liga' && (
              <Liga clasificacion={clasificacion} PARTICIPANTES={participantes} JORNADAS={jornadas} verPerfilJugador={verPerfilJugador} tituloEstilo={ESTILOS.tituloSeccion} />
            )}
            {pestanaActiva === 'copa' && (
              <Copa titulo="Copa PALOS FC" descripcion="En construcción..." tituloEstilo={ESTILOS.tituloSeccion} tarjetaEstilo={ESTILOS.tarjetaContenedora} textoEstilo={ESTILOS.textoSecundario} />
            )}
            {pestanaActiva === 'champions' && (
              <Champions titulo="Champions PALOS FC" descripcion="En construcción..." tituloEstilo={ESTILOS.tituloSeccion} tarjetaEstilo={ESTILOS.tarjetaContenedora} textoEstilo={ESTILOS.textoSecundario} />
            )}
            {pestanaActiva === 'reglamento' && <Reglamento tituloEstilo={ESTILOS.tituloSeccion} />}
            {pestanaActiva === 'jugadores' && (
              <Jugadores PARTICIPANTES={participantes} JORNADAS={jornadas} jugadorSeleccionado={jugadorSeleccionado} setJugadorSeleccionado={setJugadorSeleccionado} tituloEstilo={ESTILOS.tituloSeccion} />
            )}
            {/* VISTA DEL PANEL DE ADMINISTRACIÓN PROTÉGIDA */}
            {pestanaActiva === 'admin' && sesionActiva && (
              <Admin participantes={participantes} refrescarDatosGlobales={descargarDatosDeSupabase} />
            )}
          </>
        )}
      </div>

      <footer className="mt-12 text-center border-t border-slate-200 pt-4 pb-2">
        {sesionActiva ? (
          <button 
            onClick={manejarLogout}
            className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors cursor-pointer"
          >
            Cerrar Sesión Administrador
          </button>
        ) : (
          <button 
            onClick={() => setMostrarLogin(true)}
            className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            Acceso Administrador
          </button>
        )}
      </footer>

    </div>
  );
}