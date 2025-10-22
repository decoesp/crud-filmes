import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { movieService } from '@/services/movie.service';
import { Sidebar } from '@/components/ui/Sidebar';
import { Button } from '@/components/ui/Button';

const movieSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  originalTitle: z.string().min(1, 'Título original é obrigatório'),
  releaseDate: z.string().min(1, 'Data de lançamento é obrigatória'),
  description: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres'),
  duration: z.coerce.number().positive('Duração deve ser positiva'),
  budget: z.coerce.number().optional(),
  revenue: z.coerce.number().optional(),
  genre: z.string().optional(),
  director: z.string().optional(),
  cast: z.string().optional(),
  rating: z.coerce.number().min(0).max(10).optional(),
  status: z.string().optional(),
  voteCount: z.coerce.number().optional(),
  voteAverage: z.coerce.number().min(0).max(10).optional(),
  trailerUrl: z.string().url('URL inválida').optional().or(z.literal('')),
});

type MovieFormData = z.infer<typeof movieSchema>;

interface MovieFormSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  movieId?: string;
}

export function MovieFormSidebar({ isOpen, onClose, onSuccess, movieId }: MovieFormSidebarProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [backdropFile, setBackdropFile] = useState<File | null>(null);
  const isEditing = !!movieId;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<MovieFormData>({
    resolver: zodResolver(movieSchema),
  });

  const loadMovie = useCallback(async () => {
    try {
      const movie = await movieService.getById(movieId!);
      setValue('title', movie.title);
      setValue('originalTitle', movie.originalTitle);
      setValue('releaseDate', movie.releaseDate.split('T')[0]);
      setValue('description', movie.description);
      setValue('duration', movie.duration);
      setValue('budget', movie.budget ? Number(movie.budget) : undefined);
      setValue('revenue', movie.revenue ? Number(movie.revenue) : undefined);
      setValue('genre', movie.genre || '');
      setValue('director', movie.director || '');
      setValue('cast', movie.cast || '');
      setValue('rating', movie.rating ? Number(movie.rating) : undefined);
      setValue('status', movie.status || '');
      setValue('voteCount', movie.voteCount ? Number(movie.voteCount) : undefined);
      setValue('voteAverage', movie.voteAverage ? Number(movie.voteAverage) : undefined);
      setValue('trailerUrl', movie.trailerUrl || '');
    } catch (error) {
      toast.error('Erro ao carregar filme');
      onClose();
    }
  }, [movieId, setValue, onClose]);

  useEffect(() => {
    if (isOpen && movieId) {
      loadMovie();
    } else if (isOpen) {
      reset();
      setPosterFile(null);
      setBackdropFile(null);
    }
  }, [isOpen, movieId, loadMovie, reset]);

  const onSubmit = async (data: MovieFormData) => {
    try {
      setIsLoading(true);
      
      const releaseDate = new Date(data.releaseDate);
      const movieData = {
        ...data,
        releaseDate: releaseDate.toISOString(),
        poster: posterFile || undefined,
        backdrop: backdropFile || undefined,
      };

      if (isEditing) {
        await movieService.update(movieId!, movieData);
        toast.success('Filme atualizado com sucesso!');
      } else {
        await movieService.create(movieData);
        toast.success('Filme criado com sucesso!');
      }

      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao salvar filme');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Editar Filme' : 'Adicionar Filme'}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-4 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Título *
            </label>
            <input
              type="text"
              className="w-full rounded-lg border px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1"
              style={{ background: '#232225', borderColor: '#6F6D78' }}
              {...register('title')}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Título Original *
            </label>
            <input
              type="text"
              className="w-full rounded-lg border px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1"
              style={{ background: '#232225', borderColor: '#6F6D78' }}
              {...register('originalTitle')}
            />
            {errors.originalTitle && (
              <p className="mt-1 text-sm text-red-400">{errors.originalTitle.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Descrição *
          </label>
          <textarea
            rows={4}
            className="w-full rounded-lg border px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 resize-none"
            style={{ background: '#232225', borderColor: '#6F6D78' }}
            {...register('description')}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-400">{errors.description.message}</p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Data de Lançamento *
            </label>
            <input
              type="date"
              className="w-full rounded-lg border px-4 py-2.5 text-white focus:outline-none focus:ring-1"
              style={{ background: '#232225', borderColor: '#6F6D78' }}
              {...register('releaseDate')}
            />
            {errors.releaseDate && (
              <p className="mt-1 text-sm text-red-400">{errors.releaseDate.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Duração (min) *
            </label>
            <input
              type="number"
              className="w-full rounded-lg border px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1"
              style={{ background: '#232225', borderColor: '#6F6D78' }}
              {...register('duration')}
            />
            {errors.duration && (
              <p className="mt-1 text-sm text-red-400">{errors.duration.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Situação
            </label>
            <input
              type="text"
              placeholder="Ex: Lançado"
              className="w-full rounded-lg border px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1"
              style={{ background: '#232225', borderColor: '#6F6D78' }}
              {...register('status')}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Gênero
            </label>
            <input
              type="text"
              placeholder="Ex: Ação, Aventura"
              className="w-full rounded-lg border px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1"
              style={{ background: '#232225', borderColor: '#6F6D78' }}
              {...register('genre')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Diretor
            </label>
            <input
              type="text"
              className="w-full rounded-lg border px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1"
              style={{ background: '#232225', borderColor: '#6F6D78' }}
              {...register('director')}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Elenco
          </label>
          <input
            type="text"
            placeholder="Ex: Ator 1, Ator 2, Ator 3"
            className="w-full rounded-lg border px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1"
            style={{ background: '#232225', borderColor: '#6F6D78' }}
            {...register('cast')}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Nota IMDB (0-10)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              className="w-full rounded-lg border px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1"
              style={{ background: '#232225', borderColor: '#6F6D78' }}
              {...register('rating')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Média de Votos (0-10)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              className="w-full rounded-lg border px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1"
              style={{ background: '#232225', borderColor: '#6F6D78' }}
              {...register('voteAverage')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Total de Votos
            </label>
            <input
              type="number"
              className="w-full rounded-lg border px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1"
              style={{ background: '#232225', borderColor: '#6F6D78' }}
              {...register('voteCount')}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Orçamento (USD)
            </label>
            <input
              type="number"
              className="w-full rounded-lg border px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1"
              style={{ background: '#232225', borderColor: '#6F6D78' }}
              {...register('budget')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Receita (USD)
            </label>
            <input
              type="number"
              className="w-full rounded-lg border px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1"
              style={{ background: '#232225', borderColor: '#6F6D78' }}
              {...register('revenue')}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            URL do Trailer (YouTube)
          </label>
          <input
            type="text"
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full rounded-lg border px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1"
            style={{ background: '#232225', borderColor: '#6F6D78' }}
            {...register('trailerUrl')}
          />
          {errors.trailerUrl && (
            <p className="mt-1 text-sm text-red-400">{errors.trailerUrl.message}</p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Poster
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPosterFile(e.target.files?.[0] || null)}
              className="w-full rounded-lg border px-4 py-2.5 text-white file:mr-4 file:rounded file:border-0 file:px-4 file:py-1 file:text-sm file:text-white file:bg-purple-600 file:hover:bg-purple-700 file:cursor-pointer"
              style={{ background: '#232225', borderColor: '#6F6D78' }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Backdrop
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setBackdropFile(e.target.files?.[0] || null)}
              className="w-full rounded-lg border px-4 py-2.5 text-white file:mr-4 file:rounded file:border-0 file:px-4 file:py-1 file:text-sm file:text-white file:bg-purple-600 file:hover:bg-purple-700 file:cursor-pointer"
              style={{ background: '#232225', borderColor: '#6F6D78' }}
            />
          </div>
        </div>

        <div className="pt-4 border-t border-white/10">
          <div className="flex justify-end items-center gap-4 h-[44px] max-w-[533px] ml-auto">
            <Button
              type="button"
              onClick={onClose}
              variant="soft"
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
            >
              {isLoading ? 'Salvando...' : isEditing ? 'Editar Filme' : 'Adicionar Filme'}
            </Button>
          </div>
        </div>
      </form>
    </Sidebar>
  );
}
