interface NavbarProps {
  pestanaActiva: string;
  setPestanaActiva: (id: string) => void;
}

const configPestanas = [
  { id: 'liga', label: 'Liga Regular' },
  { id: 'copa', label: 'Copa PALOS FC' },
  { id: 'champions', label: 'Champions PALOS FC' },
  { id: 'reglamento', label: 'Reglamento' },
  { id: 'jugadores', label: 'Jugadores' },
];

export default function Navbar({ pestanaActiva, setPestanaActiva }: NavbarProps) {
  return (
    <nav className="flex justify-center flex-wrap gap-2 mb-8 bg-white p-2 rounded-xl max-w-2xl mx-auto border border-slate-200 shadow-sm">
      {configPestanas.map((pestana) => {
        const isActive = pestanaActiva === pestana.id;
        return (
          <button
            key={pestana.id}
            onClick={() => setPestanaActiva(pestana.id)}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all cursor-pointer ${
              isActive 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {pestana.label}
          </button>
        );
      })}
    </nav>
  );
}