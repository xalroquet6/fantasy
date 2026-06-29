import { TEXTO_REGLAMENTO } from '../data/textoReglamento';

interface ReglamentoProps {
  tituloEstilo: string;
}

export default function Reglamento({ tituloEstilo }: ReglamentoProps) {
  return (
    <div className="max-w-3xl mx-auto space-y-8 relative">
      
      {/* Cabecera */}
      <div>
        <h2 className={tituloEstilo}>
          <span className="w-1.5 h-6 bg-indigo-600 inline-block"></span>
          Reglamento Oficial de la Competición
        </h2>
        <p className="text-sm text-slate-500 font-medium -mt-4">
          Última actualización: 26-6-26
        </p>
      </div>

      {/* ÍNDICE */}
      <div id="indice" className="bg-slate-100/80 border border-slate-200 rounded-xl p-5 scroll-mt-24">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Índice del Reglamento</h3>
        <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm font-semibold text-slate-600">
          {TEXTO_REGLAMENTO.map(sec => (
            <a key={sec.id} href={`#${sec.id}`} className="hover:text-indigo-600 transition-colors">
              {sec.numero}. {sec.titulo}
            </a>
          ))}
        </nav>
      </div>

      {/* SECCIONES */}
      <div className="space-y-6">
        {TEXTO_REGLAMENTO.map(seccion => (
          <section 
            key={seccion.id} 
            id={seccion.id} 
            className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm scroll-mt-6"
          >
            {/* Cabecera de la Sección */}
            <div className="flex items-center gap-2.5 mb-4 border-b border-slate-100 pb-3">
              <span className="flex items-center justify-center bg-slate-100 text-slate-700 text-s font-black w-6 h-6 rounded-lg">
                {seccion.numero}
              </span>
              <h3 className="text-lg font-bold text-slate-800">{seccion.titulo}</h3>
            </div>

            {/* Contenido Maquetado de forma inteligente */}
            <div className="space-y-4">
              {seccion.contenido.map((elemento, index) => {
                
                // CASO 1: Es un párrafo normal
                if (elemento.tipo === 'parrafo') {
                  return (
                    <p key={index} className="text-slate-600 text-sm leading-relaxed font-medium">
                      {elemento.texto}
                    </p>
                  );
                }

                // CASO 2: Es un subapartado o punto numerado (ej: 3.1)
                if (elemento.tipo === 'punto') {
                  return (
                    <div key={index} className="flex gap-3 text-sm font-medium items-start">
                      <span className="font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 text-xs mt-0.5 min-w-10 text-center">
                        {elemento.subnumero}
                      </span>
                      <p className="text-slate-600 text-sm leading-relaxed font-medium">
                        {elemento.texto}
                      </p>
                    </div>
                  );
                }

                // CASO 3: Es una lista con viñetas (bullet points)
                if (elemento.tipo === 'lista' && Array.isArray(elemento.texto)) {
                  return (
                    <ul key={index} className="list-disc list-inside pl-4 space-y-2 text-sm text-slate-600 font-medium">
                      {elemento.texto.map((item, i) => (
                        <li key={i} className="leading-relaxed">
                          <span className="text-slate-600 text-sm leading-relaxed font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }

                return null;
              })}
            </div>
          </section>
        ))}
      </div>

      {/* FLECHA */}
      <a 
        href="#indice" 
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 bg-indigo-600/90 text-white font-bold rounded-full shadow-lg hover:bg-indigo-600 transition-all duration-200 hover:-translate-y-1 active:translate-y-0 backdrop-blur-xs"
        title="Volver al índice"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={3} 
          stroke="currentColor" 
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
        </svg>
      </a>

    </div>
  );
}