import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { movieService, type Movie } from '@/services/movie.service';
import { MovieCard } from '@/components/movies/MovieCard';
import { Pagination } from '@/components/ui/Pagination';
import { FilterModal } from '@/components/movies/FilterModal';
import { MovieFormSidebar } from '@/components/movies/MovieFormSidebar';
import { SearchBar } from '@/components/ui/SearchBar';
import { EmptyState } from '@/components/ui/EmptyState';
import { useTheme } from '@/contexts/ThemeContext';

export function MoviesListPage() {
  const { theme } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [showFilters, setShowFilters] = useState(false);
  const [showMovieForm, setShowMovieForm] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const loadMovies = async () => {
    try {
      setIsLoading(true);
      const params = Object.fromEntries(searchParams);
      const response = await movieService.list(params);
      setMovies(response.movies);
      setPagination(response.pagination);
    } catch (error: any) {
      toast.error('Erro ao carregar filmes');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, [searchParams]);

  const handleSearch = (value: string) => {
    setSearch(value);
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    params.set('page', '1');
    setSearchParams(params);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    setSearchParams(params);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)]">
      <div className="mx-4 mt-4 2xl:container 2xl:mx-auto">
        <SearchBar
          onSearch={handleSearch}
          onFilterClick={() => setShowFilters(true)}
          onAddMovie={() => setShowMovieForm(true)}
          searchValue={search}
        />
      </div>
      
      <div 
        className="flex-1 mx-4 mt-4 rounded-[4px] p-4 md:p-5 2xl:container 2xl:mx-auto"
        style={{
          background: theme === 'light' ? 'rgba(243, 244, 246, 0.6)' : '#EBEAF814',
          backdropFilter: 'blur(4px)'
        }}
      >
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="shadow-lg rounded-[4px] w-full h-[241px] lg:h-[355px] animate-pulse"
                style={{ background: theme === 'light' ? 'rgba(229, 231, 235, 0.5)' : 'rgba(255, 255, 255, 0.05)' }}
              />
            ))}
          </div>
        ) : movies.length === 0 ? (
          <EmptyState
            title="Nenhum filme encontrado"
            description="Comece adicionando seu primeiro filme à coleção"
            actionLabel="Adicionar Filme"
            onAction={() => setShowMovieForm(true)}
          />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onUpdate={loadMovies} />
            ))}
          </div>
        )}
      </div>

      {!isLoading && pagination.totalPages > 1 && (
        <section className="p-6 flex justify-center 2xl:mx-auto">
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </section>
      )}

      <FilterModal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        onApply={(filters) => {
          const params = new URLSearchParams();
          Object.entries(filters).forEach(([key, value]) => {
            if (value) params.set(key, String(value));
          });
          params.set('page', '1');
          setSearchParams(params);
          setShowFilters(false);
        }}
      />

      <MovieFormSidebar
        isOpen={showMovieForm}
        onClose={() => setShowMovieForm(false)}
        onSuccess={loadMovies}
      />
    </div>
  );
}
