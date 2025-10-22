import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useState } from 'react';

const forgotPasswordSchema = z.object({
  email: z.string().email('E-mail inválido'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('E-mail de recuperação enviado! Verifique sua caixa de entrada.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error: any) {
      toast.error('Erro ao enviar e-mail de recuperação');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded backdrop-blur-md border border-white/10 p-4" style={{ background: '#232225', width: '412px', maxWidth: '100%' }}>
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Recuperar Senha</h2>
        <p className="text-sm text-gray-400">
          Digite seu e-mail para receber as instruções de recuperação
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

        <div className="flex flex-col gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-[2px] px-5 py-3 text-sm font-medium text-white transition-colors hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: '#8E4EC6' }}
          >
            {isLoading ? 'Enviando...' : 'Enviar E-mail'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full rounded-[2px] px-5 py-3 text-sm font-medium transition-colors"
            style={{ color: '#9A5CD0', background: 'transparent', border: '1px solid #6F6D78' }}
          >
            Voltar para Login
          </button>
        </div>
      </form>
    </div>
  );
}
