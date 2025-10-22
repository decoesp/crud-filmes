import { useNavigate } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useAuthStore } from '@/stores/auth.store';
import { useTheme } from '@/contexts/ThemeContext';
import Logo from '@/assets/icons/logo-cubos';

export function Header() {
  const navigate = useNavigate();
  const { clearAuth } = useAuthStore();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <header 
      className="flex items-center justify-between h-16 px-2 md:px-5" 
      style={{ 
        background: theme === 'light' ? 'rgba(255, 255, 255, 0.8)' : '#12111380', 
        borderBottom: theme === 'light' ? '1px solid #e5e7eb' : '1px solid #F1E6FD30'
      }}
    >
      <div 
        className="flex items-center justify-center font-semibold cursor-pointer" 
        onClick={() => navigate('/movies')}
      >
        <div className="hidden md:block w-full h-full">
          <Logo width="145" height="36" className={theme === 'light' ? 'fill-gray-900' : 'fill-white'} />
        </div>
        <div className="flex items-center md:ml-4">
          <span>
            <h1 className="font-bold text-xl" style={{ color: theme === 'light' ? '#111113' : '#ffffff' }}>Movies</h1>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={toggleTheme}
          className="w-10 h-10 flex items-center justify-center rounded-[2px] transition-all"
          style={{
            background: theme === 'dark' ? '#B744F714' : '#8E4EC6',
            backdropFilter: 'blur(4px)'
          }}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5" style={{ stroke: '#F1DDFFFA', strokeWidth: 2 }} />
          ) : (
            <Moon className="w-5 h-5" style={{ stroke: '#111113', strokeWidth: 2 }} />
          )}
        </button>
        
        <button 
          onClick={handleLogout}
          className="rounded-[2px] px-5 py-3 text-sm font-medium transition-colors hover:opacity-90"
          style={{
            background: '#8E4EC6',
            color: '#ffffff'
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
