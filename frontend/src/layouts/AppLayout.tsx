import heroImage from '@/assets/images/hero.png';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useTheme } from '@/contexts/ThemeContext';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { theme } = useTheme();
  
  return (
    <div className="relative min-h-screen" style={{ background: theme === 'light' ? '#ffffff' : '#000000' }}>
      <div className="fixed inset-0 z-0" style={{
        background: theme === 'light' 
          ? 'linear-gradient(180deg, #f5f5f5 0%, rgba(245, 245, 245, 0.46) 49.48%, #f5f5f5 100%)'
          : 'linear-gradient(180deg, #121113 0%, rgba(18, 17, 19, 0.46) 49.48%, #121113 100%)'
      }}>
        <img
          src={heroImage}
          alt="Movies Background"
          className="h-full w-full object-cover"
          style={{ opacity: theme === 'light' ? 0.05 : 0.2 }}
        />
        <div 
          className="absolute inset-0" 
          style={{
            background: theme === 'light'
              ? 'linear-gradient(to bottom, rgba(255,255,255,0.4), rgba(255,255,255,0.6), rgba(255,255,255,0.8))'
              : 'linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.8), rgba(0,0,0,1))'
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />

        <main 
          className="flex-1"
        >
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}
