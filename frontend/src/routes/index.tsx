import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth.store';

import { AuthLayout } from '@/layouts/AuthLayout';
import { AppLayout } from '@/layouts/AppLayout';

import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage';
import { MoviesListPage } from '@/pages/movies/MoviesListPage';
import { MovieDetailsPage } from '@/pages/movies/MovieDetailsPage';
import { MovieFormPage } from '@/pages/movies/MovieFormPage';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return !isAuthenticated ? <>{children}</> : <Navigate to="/movies" replace />;
}

export function Router() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <AuthLayout>
              <RegisterPage />
            </AuthLayout>
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <AuthLayout>
              <ForgotPasswordPage />
            </AuthLayout>
          </PublicRoute>
        }
      />

      <Route
        path="/movies"
        element={
          <PrivateRoute>
            <AppLayout>
              <MoviesListPage />
            </AppLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/movies/new"
        element={
          <PrivateRoute>
            <AppLayout>
              <MovieFormPage />
            </AppLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/movies/:id"
        element={
          <PrivateRoute>
            <AppLayout>
              <MovieDetailsPage />
            </AppLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/movies/:id/edit"
        element={
          <PrivateRoute>
            <AppLayout>
              <MovieFormPage />
            </AppLayout>
          </PrivateRoute>
        }
      />

      <Route path="/" element={<Navigate to="/movies" replace />} />

      <Route path="*" element={<Navigate to="/movies" replace />} />
    </Routes>
  );
}
