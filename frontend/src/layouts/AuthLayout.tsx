import Logo from '@/assets/icons/logo-cubos';
import heroImage from '@/assets/images/hero.png';
import { Sun } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDarkMode } from '@/hooks/useDarkMode';
import { Footer } from '@/components/layout';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  
  return (
    <div className="relative min-h-screen bg-black">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Movies Hero"
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="flex items-center justify-between h-16 px-2 md:px-5" style={{ background: '#12111380', borderBottom: '1px solid #F1E6FD30' }}>
      <div 
        className="flex items-center justify-center font-semibold cursor-pointer" 
        onClick={() => navigate('/movies')}
      >
        <div className="hidden md:block w-full h-full">
          <Logo width="145" height="36" className="fill-white" />
        </div>
        <div className="flex items-center md:ml-4">
          <span>
            <h1 className="font-bold text-xl text-white">Movies</h1>
          </span>
        </div>
      </div>
          <div className="flex items-center gap-3">
        <button 
          onClick={toggleDarkMode}
          className="w-10 h-10 flex items-center justify-center rounded-[2px] transition-all"
          style={{
            background: isDarkMode ? '#B744F714' : '#8E4EC6',
            backdropFilter: 'blur(4px)'
          }}
          aria-label="Toggle Theme"
        >
          <Sun className="w-5 h-5" style={{ stroke: '#F1DDFFFA', strokeWidth: 2 }} />
        </button>
            <button 
              onClick={() => navigate(isLoginPage ? '/register' : '/login')}
              className="rounded-[2px] px-5 py-3 text-sm font-medium text-white hover:opacity-90 transition-colors"
              style={{ background: '#8E4EC6' }}
            >
              {isLoginPage ? 'Cadastrar' : 'Login'}
            </button>
          </div>
        </header>

        <main 
          className="flex flex-1 items-center justify-center px-4 py-12"
          style={{
            background: 'linear-gradient(180deg, #121113 0%, rgba(18, 17, 19, 0.46) 49.48%, #121113 100%)'
          }}
        >
          <div className="w-full max-w-md">
            {children}
          </div>
        </main>
      <Footer/>
      </div>
    </div>
  );
}
