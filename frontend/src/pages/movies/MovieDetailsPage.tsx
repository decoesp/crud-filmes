import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { movieService, type Movie } from '@/services/movie.service';
import { MovieFormSidebar } from '@/components/movies/MovieFormSidebar';
import { LoadingScreen } from '@/components/ui/LoadingSpinner';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Button } from '@/components/ui/Button';
import { CircularProgress } from '@/components/ui/CircularProgress';
import { formatCurrency, formatDate, formatDuration } from '@/lib/utils';

export function MovieDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadMovie = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await movieService.getById(id!);
      setMovie(data);
    } catch (error) {
      toast.error('Erro ao carregar filme');
      navigate('/movies');
    } finally {
      setIsLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    loadMovie();
  }, [loadMovie]);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await movieService.delete(id!);
      toast.success('Filme excluído com sucesso!');
      navigate('/movies');
    } catch (error) {
      toast.error('Erro ao excluir filme');
      setIsDeleting(false);
    }
  };


  if (isLoading) {
    return <LoadingScreen message="Carregando filme..." />;
  }

  if (!movie) return null;

  const votePercentage = movie.voteAverage ? Math.round(movie.voteAverage * 10) : 0;
  const profit = movie.budget && movie.revenue ? Number(movie.revenue) - Number(movie.budget) : null;

  return (
    <div className="min-h-screen bg-[#121113] md:py-8">
<section className="relative w-full bg-cover bg-center max-w-[1400px] mx-auto px-6 md:px-12 pt-8 pb-12"
 style={{
  backgroundImage: movie.backdropUrl 
    ? `url(${movie.backdropUrl})` 
    : movie.posterUrl 
    ? `url(${movie.posterUrl})` 
    : 'none',
}}>
  <div className="absolute inset-0 bg-gradient-to-r from-[#121113] via-[#121113]/95 to-[#121113]/60" />

  <div className="relative z-10 max-w-[1400px] mx-auto px-3 md:px-6 md:py-12">
    <div className="hidden md:flex justify-between items-start mb-8">
      <div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-2">
          {movie.title}
        </h1>
        <p className="text-sm md:text-base text-gray-400">
          Título original: {movie.originalTitle}
        </p>
      </div>
      <div className="flex gap-3">
        <Button 
          onClick={() => setShowDeleteDialog(true)} 
          variant="soft" 
          className="text-sm min-h-[44px] rounded-[2px]"
          style={{ 
            padding: '12px 20px',
            background: '#B744F714',
            backdropFilter: 'blur(4px)'
          }}
        >
          Deletar
        </Button>
        <Button 
          onClick={() => setShowEditModal(true)} 
          variant="primary" 
          className="text-sm min-h-[44px] rounded-[2px]"
          style={{ 
            width: '82px',
            padding: '12px 20px',
            background: '#8E4EC6'
          }}
        >
          Editar
        </Button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr_500px] gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex justify-center md:justify-start">
          {movie.posterUrl ? (
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full md:max-w-none h-auto rounded-lg shadow-2xl object-cover"
            />
          ) : (
            <div className="w-full md:w-[300px] aspect-[2/3] bg-white/5 rounded-lg flex items-center justify-center">
              <span className="text-6xl">🎬</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 md:hidden">
          <div className="flex gap-3 justify-between">
            <Button 
              onClick={() => setShowDeleteDialog(true)} 
              variant="soft" 
              className="text-sm min-h-[44px] rounded-[2px] flex-shrink-0"
              style={{ 
                width: '82px',
                padding: '12px 20px',
                background: '#B744F714',
                backdropFilter: 'blur(4px)'
              }}
            >
              Deletar
            </Button>
            <Button 
              onClick={() => setShowEditModal(true)} 
              variant="primary" 
              className="text-sm min-h-[44px] rounded-[2px] w-[283px] md:w-[82px]"
              style={{ 
                padding: '12px 20px',
                background: '#8E4EC6'
              }}
            >
              Editar
            </Button>
          </div>
          
          <div className="w-full text-center">
            <h1 className="text-2xl font-bold text-white leading-tight mb-2">
              {movie.title}
            </h1>
            <p className="text-sm text-gray-400">
              Título original: {movie.originalTitle}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
            Sinopse
          </h2>
          <p className="text-sm md:text-base text-gray-300 leading-relaxed">
            {movie.description}
          </p>
        </div>

        {movie.genre && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
              Gêneros
            </h3>
            <div className="flex flex-wrap gap-2">
              {movie.genre.split(',').map((genre, index) => (
                <span
                  key={index}
                  className="px-4 py-1.5 bg-[#8E4EC6] text-white text-xs uppercase font-medium rounded"
                >
                  {genre.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-6 md:grid-cols-3 gap-4">
        <div className="col-span-3 md:col-span-1 bg-[#23222599] backdrop-blur-sm rounded p-2 md:p-4">
          <p className="text-xs font-bold uppercase text-gray-400 mb-2">
            Classificação Indicativa
          </p>
          <p className="text-sm font-semibold text-white">{movie.rating}</p>
        </div>

        <div className="col-span-2 md:col-span-1 bg-[#23222599] backdrop-blur-sm rounded p-2 md:p-4">
          <p className="text-xs font-bold uppercase text-gray-400 mb-2">
            Votos
          </p>
          <p className="text-sm font-semibold text-white">
            {movie.voteCount ? Number(movie.voteCount).toLocaleString() : 'N/A'}
          </p>
        </div>

        <div className="col-span-1 flex justify-center items-center">
          <CircularProgress percentage={votePercentage} size="sm" />
        </div>

        <div className="col-span-6 md:col-span-3 grid grid-cols-2 gap-4">
          <div className="bg-[#23222599] backdrop-blur-sm rounded p-2 md:p-4">
            <p className="text-xs font-bold uppercase text-gray-400 mb-2">
              Lançamento
            </p>
            <p className="text-sm font-semibold text-white">{formatDate(movie.releaseDate)}</p>
          </div>

          <div className="bg-[#23222599] backdrop-blur-sm rounded p-2 md:p-4">
            <p className="text-xs font-bold uppercase text-gray-400 mb-2">
              Duração
            </p>
            <p className="text-sm font-semibold text-white">{formatDuration(movie.duration)}</p>
          </div>
        </div>

        <div className="col-span-6 md:col-span-3 grid grid-cols-2 gap-4">
          <div className="bg-[#23222599] backdrop-blur-sm rounded p-2 md:p-4">
            <p className="text-xs font-bold uppercase text-gray-400 mb-2">
              Situação
            </p>
            <p className="text-sm font-semibold text-white">{movie.status || 'Lançado'}</p>
          </div>

          <div className="bg-[#23222599] backdrop-blur-sm rounded p-2 md:p-4">
            <p className="text-xs font-bold uppercase text-gray-400 mb-2">
              Idioma
            </p>
            <p className="text-sm font-semibold text-white">Inglês</p>
          </div>
        </div>

        {(movie.budget || movie.revenue || profit !== null) && (
          <div className="col-span-6 md:col-span-3 grid grid-cols-3 gap-4">
            {movie.budget && (
              <div className="bg-[#23222599] backdrop-blur-sm rounded p-2 md:p-4">
                <p className="text-xs font-bold uppercase text-gray-400 mb-2">Orçamento</p>
                <p className="text-sm font-semibold text-white">{formatCurrency(Number(movie.budget))}</p>
              </div>
            )}
            {movie.revenue && (
              <div className="bg-[#23222599] backdrop-blur-sm rounded p-2 md:p-4">
                <p className="text-xs font-bold uppercase text-gray-400 mb-2">Receita</p>
                <p className="text-sm font-semibold text-white">{formatCurrency(Number(movie.revenue))}</p>
              </div>
            )}
            {profit !== null && profit !== undefined && (
              <div className="bg-[#23222599] backdrop-blur-sm rounded p-2 md:p-4">
                <p className="text-xs font-bold uppercase text-gray-400 mb-2">Lucro</p>
                <p className="text-sm font-semibold text-white">{formatCurrency(profit)}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
</section>


      {movie.trailerUrl && (
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-12">
          <h2 className="text-white font-bold text-2xl md:text-3xl mb-6">Trailer</h2>
          <div className="aspect-video w-full rounded-lg overflow-hidden">
            <iframe
              className="w-full h-full"
              src={movie.trailerUrl.replace('watch?v=', 'embed/')}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Trailer do filme"
            />
          </div>
        </section>
      )}

      <MovieFormSidebar
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSuccess={loadMovie}
        movieId={id}
      />

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Excluir Filme"
        message="Tem certeza que deseja excluir este filme? Esta ação não pode ser desfeita."
        confirmText="Excluir"
        cancelText="Cancelar"
        isLoading={isDeleting}
      />
    </div>
  );
}
