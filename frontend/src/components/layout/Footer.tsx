import { useTheme } from '@/contexts/ThemeContext';

export function Footer() {
  const { theme } = useTheme();
  
  return (
    <footer 
      className="px-6 py-4 text-center" 
      style={{ background: theme === 'light' ? 'rgba(255, 255, 255, 0.8)' : '#12111380' }}
    >
      <p className="text-sm" style={{ color: theme === 'light' ? '#6b7280' : '#9ca3af' }}>
        2025 © Todos os direitos reservados • <span className="font-semibold">Cubos Movies</span>
      </p>
    </footer>
  );
}
