import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { movieService, type Movie } from '@/services/movie.service';
import { PaginationData } from '@/types';

interface UseMoviesParams {
  searchParams: URLSearchParams;
}

export function useMovies({ searchParams }: UseMoviesParams) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const loadMovies = useCallback(async () => {
    try {
      setIsLoading(true);
      const params = Object.fromEntries(searchParams);
      const response = await movieService.list(params);
      setMovies(response.movies);
      setPagination(response.pagination);
    } catch (error) {
      toast.error('Erro ao carregar filmes');
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  return {
    movies,
    isLoading,
    pagination,
    refetch: loadMovies,
  };
}
