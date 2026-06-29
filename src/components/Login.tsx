import { useState } from 'react';
import { supabase } from '../supabaseClient';

interface LoginProps {
  onLoginSuccess: () => void;
  onCancelar: () => void;
}

export default function Login({ onLoginSuccess, onCancelar }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  async function manejarLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      setErrorMsg(null);
      setCargando(true);

      // Llamada oficial al método de autenticación de Supabase
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      onLoginSuccess();
    } catch (err: any) {
      setErrorMsg(err.message || 'Credenciales incorrectas');
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-xl p-6 shadow-md my-12">
      <h2 className="text-xl font-black text-slate-800 text-center mb-6 uppercase tracking-wide">
        Acceso Administrador
      </h2>

      <form onSubmit={manejarLogin} className="space-y-4">
        <div>
          <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1">Correo Electrónico</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 font-medium"
            placeholder="tu@correo.com"
          />
        </div>

        <div>
          <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1">Contraseña</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 font-medium"
            placeholder="••••••••"
          />
        </div>

        {errorMsg && (
          <p className="text-xs font-semibold text-red-600 bg-red-50 p-2.5 rounded text-center">
            ❌ {errorMsg}
          </p>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onCancelar}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2 rounded text-sm transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={cargando}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded text-sm transition-all cursor-pointer disabled:opacity-50"
          >
            {cargando ? 'Iniciando...' : 'Entrar'}
          </button>
        </div>
      </form>
    </div>
  );
}