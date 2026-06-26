import { TEXTO_REGLAMENTO } from '../data/textoReglamento'; // Ajusta la ruta si es necesario

interface ReglamentoProps {
  tituloEstilo: string;
}

export default function Reglamento({ tituloEstilo }: ReglamentoProps) {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      
      {/* Cabecera */}
      <div>
        <h2 className={tituloEstilo}>
          <span className="w-1.5 h-6 bg-indigo-600 inline-block"></span>
          Reglamento Oficial de la Competición
        </h2>
        <p className="text-sm text-slate-500 font-medium -mt-4">
          Última actualización: Temporada 2026/2027
        </p>
      </div>

      {/* ÍNDICE */}
      <div className="bg-slate-100/80 border border-slate-200 rounded-xl p-5">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Índice</h3>
        <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm font-semibold text-slate-600">
          
          {TEXTO_REGLAMENTO.map(sec => (
            <a key={sec.id} href={`#${sec.id}`} className="hover:text-indigo-600 transition-colors">
              {sec.numero}. {sec.titulo}
            </a>))
          }

        </nav>
      </div>

      {/* SECCIONES RENDERIZADAS POR ÍNDICES DINÁMICOS */}
      <div className="space-y-6">
        {TEXTO_REGLAMENTO.map(seccion => (
          <section 
            key={seccion.id} 
            id={seccion.id} 
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm scroll-mt-6"
          >
            {/* Cabecera de la Sección */}
            <div className="flex items-center gap-2.5 mb-3">
              <span className="flex items-center justify-center bg-slate-100 text-slate-700 text-xs font-black w-6 h-6 rounded-lg">
                {seccion.numero}
              </span>
              <h3 className="text-lg font-bold text-slate-800">{seccion.titulo}</h3>
            </div>

            {/* Párrafos de la Sección (Bucle interno) */}
            <div className="text-slate-600 text-sm leading-relaxed space-y-3 font-medium">
              {seccion.parrafos.map((parrafo, index) => (
                <p key={index}>{parrafo}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

    </div>
  );
}