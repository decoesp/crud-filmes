import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/stores/auth.store';
import { useState } from 'react';

const registerSchema = z
  .object({
    name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
    email: z.string().email('E-mail inválido'),
    password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      const response = await authService.register(data);
      setAuth(response.user, response.token);
      toast.success('Cadastro realizado com sucesso!');
      navigate('/movies');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao fazer cadastro');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded backdrop-blur-md border border-white/10 p-4" style={{ background: '#232225', width: '412px', maxWidth: '100%' }}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Nome
          </label>
          <input
            type="text"
            placeholder="Digite seu nome"
            className="w-full rounded border px-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 transition-colors"
            style={{ background: '#232225', borderColor: '#6F6D78', minHeight: '44px', height: '44px' }}
            {...register('name')}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            E-mail
          </label>
          <input
            type="email"
            placeholder="Digite seu e-mail"
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

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Confirmar de senha
          </label>
          <input
            type="password"
            placeholder="Digite sua senha novamente"
            className="w-full rounded border px-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 transition-colors"
            style={{ background: '#232225', borderColor: '#6F6D78', minHeight: '44px', height: '44px' }}
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-400">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-[2px] px-5 py-3 text-sm font-medium text-white hover:opacity-90 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          style={{ background: '#8E4EC6' }}
        >
          {isLoading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
}
