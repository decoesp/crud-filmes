import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Router } from './routes';
import { ThemeProvider } from './contexts/ThemeContext';

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Router />
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </ThemeProvider>
  );
}
