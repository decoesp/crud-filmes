import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { movieService, type Movie } from '@/services/movie.service';

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

interface MovieFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  movieId?: string;
}

export function MovieFormModal({ isOpen, onClose, onSuccess, movieId }: MovieFormModalProps) {
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

  useEffect(() => {
    if (isOpen && movieId) {
      loadMovie();
    } else if (isOpen) {
      reset();
      setPosterFile(null);
      setBackdropFile(null);
    }
  }, [isOpen, movieId]);

  const loadMovie = async () => {
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
  };

  const onSubmit = async (data: MovieFormData) => {
    try {
      setIsLoading(true);
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          formData.append(key, String(value));
        }
      });

      if (posterFile) formData.append('poster', posterFile);
      if (backdropFile) formData.append('backdrop', backdropFile);

      if (isEditing) {
        await movieService.update(movieId!, formData);
        toast.success('Filme atualizado com sucesso!');
      } else {
        await movieService.create(formData);
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-lg border border-white/10" style={{ background: '#232225' }}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <h2 className="text-xl font-semibold text-white">
            {isEditing ? 'Editar Filme' : 'Adicionar Filme'}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)] px-6 py-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-white placeholder:text-gray-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
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
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-white placeholder:text-gray-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
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
                  className="w-full rounded-lg border px-4 py-2.5 text-white file:mr-4 file:rounded file:border-0 file:px-4 file:py-1 file:text-sm file:text-white"
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
                  className="w-full rounded-lg border px-4 py-2.5 text-white file:mr-4 file:rounded file:border-0 file:px-4 file:py-1 file:text-sm file:text-white"
                  style={{ background: '#232225', borderColor: '#6F6D78' }}
                />
              </div>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-white/10 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
            className="rounded-[2px] px-6 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            style={{ background: '#8E4EC6' }}
          >
            {isLoading ? 'Salvando...' : 'SALVAR'}
          </button>
        </div>
      </div>
    </div>
  );
}
