import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/stores/auth.store';
import { useState } from 'react';

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      const response = await authService.login(data);
      setAuth(response.user, response.token);
      toast.success('Login realizado com sucesso!');
      navigate('/movies');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded backdrop-blur-md border border-white/10 p-4" style={{ background: '#232225', width: '412px', maxWidth: '100%' }}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Nome/E-mail
          </label>
          <input
            type="email"
            placeholder="Digite seu nome/E-mail"
            className="w-full rounded border px-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 transition-colors"
            style={{ background: '#232225', borderColor: '#6F6D78', minHeight: '44px', height: '44px' }}
            {...register('email')}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Senha
          </label>
          <input
            type="password"
            placeholder="Digite sua senha"
            className="w-full rounded border px-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 transition-colors"
            style={{ background: '#232225', borderColor: '#6F6D78', minHeight: '44px', height: '44px' }}
            {...register('password')}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between gap-4">
          <Link
            to="/forgot-password"
            className="text-sm font-medium transition-colors underline"
            style={{ color: '#9A5CD0' }}
          >
            Esqueci minha senha
          </Link>
          
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-[2px] px-5 py-3 text-sm font-medium text-white transition-colors hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: '#8E4EC6' }}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </div>
      </form>
    </div>
  );
}
