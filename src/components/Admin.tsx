import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

interface AdminProps {
  participantes: Array<{ id: string; nombre: string }>;
  refrescarDatosGlobales: () => Promise<void>;
}

interface JornadaCombo {
  id: string;
  numero_jornada: number;
}

export default function Admin({ participantes, refrescarDatosGlobales }: AdminProps) {
  const [jornadas, setJornadas] = useState<JornadaCombo[]>([]);
  const [jornadaSeleccionadaId, setJornadaSeleccionadaId] = useState<string>('');
  
  const [puntosForm, setPuntosForm] = useState<Record<string, number>>({});
  const [guardando, setGuardando] = useState(false);

  async function cargarJornadasAdmin() {
    const { data } = await supabase
      .from('jornadas')
      .select('id, numero_jornada')
      .order('numero_jornada', { ascending: true });
    
    if (data && data.length > 0) {
      setJornadas(data);
      if (!jornadaSeleccionadaId) {
        setJornadaSeleccionadaId(data[0].id);
      }
    }
  }

  useEffect(() => {
    cargarJornadasAdmin();
  }, []);

  useEffect(() => {
    if (!jornadaSeleccionadaId) return;

    async function cargarPuntosDeJornada() {
      const { data } = await supabase
        .from('resultados')
        .select('participante_id, puntos')
        .eq('jornada_id', jornadaSeleccionadaId); 

      const mapeoInicial: Record<string, number> = {};
      participantes.forEach(p => { mapeoInicial[p.id] = 0; });
      
      if (data) {
        data.forEach(r => {
          mapeoInicial[r.participante_id] = r.puntos;
        });
      }
      setPuntosForm(mapeoInicial);
    }

    cargarPuntosDeJornada();
  }, [jornadaSeleccionadaId, participantes]);

  async function crearNuevaJornada() {
    const siguienteNumero = jornadas.length > 0 
      ? Math.max(...jornadas.map(j => j.numero_jornada)) + 1 
      : 1;

    const { data, error } = await supabase
      .from('jornadas')
      .insert({ numero_jornada: siguienteNumero })
      .select()
      .single();

    if (!error && data) {
      setJornadas([...jornadas, data]);
      setJornadaSeleccionadaId(data.id);
      alert(`✅ Jornada ${siguienteNumero} creada con éxito`);
    }
  }

  const cambiarPuntos = (participanteId: string, valor: number) => {
    setPuntosForm({
      ...puntosForm,
      [participanteId]: valor
    });
  };

  async function guardarPuntuaciones(e: React.FormEvent) {
    e.preventDefault();
    if (!jornadaSeleccionadaId) return;

    try {
      setGuardando(true);

      const filasAInsertar = Object.entries(puntosForm).map(([participanteId, puntos]) => ({
        jornada_id: jornadaSeleccionadaId,
        participante_id: participanteId,
        puntos: puntos
      }));

      const { error } = await supabase
        .from('resultados')
        .upsert(filasAInsertar, { onConflict: 'jornada_id,participante_id' });

      if (error) throw error;

      await refrescarDatosGlobales();
      alert("¡Puntuaciones guardadas y sincronizadas en la nube!");

    } catch (error) {
      console.error(error);
      alert("Error al guardar las puntuaciones");
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div>
          <h2 className="text-xl font-black text-slate-800 uppercase tracking-wide">Panel de Control</h2>
          <p className="text-xs font-semibold text-slate-400 mt-0.5">Introduce las puntuaciones de la jornada</p>
        </div>
        <button
          type="button"
          onClick={crearNuevaJornada}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-3 py-2 rounded transition-colors cursor-pointer"
        >
          + Nueva Jornada
        </button>
      </div>

      {jornadas.length === 0 ? (
        <p className="text-center text-sm text-slate-400 py-4 font-medium">No hay jornadas creadas. Haz clic en "+ Nueva Jornada" arriba.</p>
      ) : (
        <form onSubmit={guardarPuntuaciones} className="space-y-4">
          <div className="flex items-center justify-between bg-slate-50 p-3 rounded border border-slate-100">
            <label className="text-sm font-bold text-slate-600">Jornada a editar:</label>
            <select
              value={jornadaSeleccionadaId}
              onChange={(e) => setJornadaSeleccionadaId(e.target.value)}
              className="bg-white border border-slate-200 text-slate-700 font-bold rounded px-2.5 py-1 text-sm focus:outline-none"
            >
              {jornadas.map(j => (
                <option key={j.id} value={j.id}>Jornada {j.numero_jornada}</option>
              ))}
            </select>
          </div>

          <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto pr-1">
            {participantes.map(p => (
              <div key={p.id} className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0">
                <span className="text-sm font-bold text-slate-700">{p.nombre}</span>
                <input
                  type="number"
                  required
                  min="0"
                  value={puntosForm[p.id] ?? 0}
                  onChange={(e) => cambiarPuntos(p.id, Number(e.target.value))}
                  className="w-20 px-2.5 py-1 border border-slate-200 rounded text-sm text-center font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={guardando}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded text-sm transition-all cursor-pointer disabled:opacity-50"
          >
            {guardando ? 'Guardando cambios...' : 'Guardar Cambios'}
          </button>
        </form>
      )}
    </div>
  );
}