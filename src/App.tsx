import { PARTICIPANTES, JORNADAS } from './datos';

// Esto es un Componente de React. Es una función que empieza por Mayúscula.
function App() {
  const puntosTotales: Record<string, number> = {};
  
  PARTICIPANTES.forEach(player => {
    puntosTotales[player.id] = 0;
  });

  JORNADAS.forEach(jornada => {
    jornada.resultados.forEach(resultado => {
      puntosTotales[resultado.participanteID] += resultado.puntos;
    });
  });

  const clasificacion = PARTICIPANTES.map(player => ({
    nombre: player.nombre,
    puntos: puntosTotales[player.id]
  }));
  
  clasificacion.sort((a, b) => b.puntos - a.puntos);


  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>🏆 La Liga Fantasy PALOS FC 🏆</h1>
      <h2>Clasificación General</h2>
      
      {/* AQUÍ VIENE LA MAGIA DE REACT:
        Podemos incrustar código TypeScript dentro del diseño visual 
        abriendo llaves { }.
      */}
      <ul>
        {clasificacion.map((item, index) => (
          <li key={item.nombre}>
            {index + 1}º <strong>{item.nombre}</strong> - {item.puntos} pts
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;