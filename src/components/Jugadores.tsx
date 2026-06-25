interface SeccionVaciaProps {
  titulo: string;
  descripcion: string;
  tituloEstilo: string;
  tarjetaEstilo: string;
  textoEstilo: string;
}

export default function SeccionVacia({ titulo, descripcion, tituloEstilo, tarjetaEstilo, textoEstilo }: SeccionVaciaProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className={tituloEstilo}>
        <span className="w-1.5 h-6 bg-indigo-600 rounded-full inline-block"></span>
        {titulo}
      </h2>
      <div className={`${tarjetaEstilo} text-center`}>
        <p className={textoEstilo}>{descripcion}</p>
      </div>
    </div>
  );
}