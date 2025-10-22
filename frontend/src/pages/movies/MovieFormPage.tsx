import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { movieService } from '@/services/movie.service';

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

export function MovieFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [isLoading, setIsLoading] = useState(false);
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [backdropFile, setBackdropFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MovieFormData>({
    resolver: zodResolver(movieSchema),
  });

  useEffect(() => {
    if (isEditing) {
      loadMovie();
    }
  }, [id]);

  const loadMovie = async () => {
    try {
      const movie = await movieService.getById(id!);
      reset({
        title: movie.title,
        originalTitle: movie.originalTitle,
        releaseDate: movie.releaseDate.split('T')[0],
        description: movie.description,
        duration: movie.duration,
        budget: movie.budget ? Number(movie.budget) : undefined,
        revenue: movie.revenue ? Number(movie.revenue) : undefined,
        genre: movie.genre || '',
        director: movie.director || '',
        cast: movie.cast || '',
        rating: movie.rating ? Number(movie.rating) : undefined,
        status: movie.status || '',
        voteCount: movie.voteCount ? Number(movie.voteCount) : undefined,
        voteAverage: movie.voteAverage ? Number(movie.voteAverage) : undefined,
        trailerUrl: movie.trailerUrl || '',
      });
    } catch (error) {
      toast.error('Erro ao carregar filme');
      navigate('/movies');
    }
  };

  const onSubmit = async (data: MovieFormData) => {
    try {
      setIsLoading(true);
      const formData = {
        ...data,
        releaseDate: new Date(data.releaseDate).toISOString(),
        poster: posterFile || undefined,
        backdrop: backdropFile || undefined,
      };

      if (isEditing) {
        await movieService.update(id!, formData);
        toast.success('Filme atualizado com sucesso!');
      } else {
        await movieService.create(formData);
        toast.success('Filme criado com sucesso!');
      }

      navigate('/movies');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao salvar filme');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Button variant="ghost" onClick={() => navigate('/movies')} className="mb-6">
        <ArrowLeft className="h-5 w-5" />
        Voltar
      </Button>

      <h1 className="mb-8 text-3xl font-bold">{isEditing ? 'Editar Filme' : 'Novo Filme'}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <Input label="Título" error={errors.title?.message} {...register('title')} />
          <Input
            label="Título Original"
            error={errors.originalTitle?.message}
            {...register('originalTitle')}
          />
        </div>

        <Textarea
          label="Descrição"
          error={errors.description?.message}
          {...register('description')}
        />

        <div className="grid gap-6 sm:grid-cols-3">
          <Input
            label="Data de Lançamento"
            type="date"
            error={errors.releaseDate?.message}
            {...register('releaseDate')}
          />
          <Input
            label="Duração (minutos)"
            type="number"
            error={errors.duration?.message}
            {...register('duration')}
          />
          <Input
            label="Situação"
            placeholder="Ex: Lançado, Em produção"
            error={errors.status?.message}
            {...register('status')}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <Input
            label="Nota IMDB (0-10)"
            type="number"
            step="0.1"
            error={errors.rating?.message}
            {...register('rating')}
          />
          <Input
            label="Média de Votos (0-10)"
            type="number"
            step="0.1"
            error={errors.voteAverage?.message}
            {...register('voteAverage')}
          />
          <Input
            label="Total de Votos"
            type="number"
            error={errors.voteCount?.message}
            {...register('voteCount')}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Input label="Gênero" error={errors.genre?.message} {...register('genre')} />
          <Input label="Diretor" error={errors.director?.message} {...register('director')} />
        </div>

        <Input label="Elenco" error={errors.cast?.message} {...register('cast')} />

        <Input
          label="URL do Trailer (YouTube)"
          placeholder="https://www.youtube.com/watch?v=..."
          error={errors.trailerUrl?.message}
          {...register('trailerUrl')}
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <Input
            label="Orçamento (USD)"
            type="number"
            error={errors.budget?.message}
            {...register('budget')}
          />
          <Input
            label="Receita (USD)"
            type="number"
            error={errors.revenue?.message}
            {...register('revenue')}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">Poster</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPosterFile(e.target.files?.[0] || null)}
              className="hidden"
              id="poster"
            />
            <label
              htmlFor="poster"
              className="flex h-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-light-border-ui hover:border-primary-500 dark:border-dark-border-ui"
            >
              <div className="text-center">
                <Upload className="mx-auto h-8 w-8 text-light-text-tertiary dark:text-dark-text-tertiary" />
                <p className="mt-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  {posterFile ? posterFile.name : 'Clique para fazer upload'}
                </p>
              </div>
            </label>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Backdrop</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setBackdropFile(e.target.files?.[0] || null)}
              className="hidden"
              id="backdrop"
            />
            <label
              htmlFor="backdrop"
              className="flex h-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-light-border-ui hover:border-primary-500 dark:border-dark-border-ui"
            >
              <div className="text-center">
                <Upload className="mx-auto h-8 w-8 text-light-text-tertiary dark:text-dark-text-tertiary" />
                <p className="mt-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  {backdropFile ? backdropFile.name : 'Clique para fazer upload'}
                </p>
              </div>
            </label>
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="submit" isLoading={isLoading}>
            {isEditing ? 'Atualizar' : 'Criar'} Filme
          </Button>
          <Button type="button" variant="secondary" onClick={() => navigate('/movies')}>
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
