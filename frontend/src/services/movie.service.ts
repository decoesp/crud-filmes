import { api } from '@/lib/api';

export interface Movie {
  tagline: string;
  id: string;
  title: string;
  originalTitle: string;
  releaseDate: string;
  description: string;
  duration: number;
  budget?: number;
  revenue?: number;
  posterUrl?: string;
  backdropUrl?: string;
  trailerUrl?: string;
  genre?: string;
  director?: string;
  cast?: string;
  rating?: number;
  status?: string;
  voteCount?: number;
  voteAverage?: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface ListMoviesParams {
  page?: number;
  limit?: number;
  search?: string;
  genre?: string;
  minDuration?: number;
  maxDuration?: number;
  startDate?: string;
  endDate?: string;
}

export interface ListMoviesResponse {
  movies: Movie[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CreateMovieData {
  title: string;
  originalTitle: string;
  releaseDate: string;
  description: string;
  duration: number;
  budget?: number;
  revenue?: number;
  genre?: string;
  director?: string;
  cast?: string;
  rating?: number;
  status?: string;
  voteCount?: number;
  voteAverage?: number;
  trailerUrl?: string;
  poster?: File;
  backdrop?: File;
}

export const movieService = {
  async list(params?: ListMoviesParams): Promise<ListMoviesResponse> {
    const response = await api.get<ListMoviesResponse>('/movies', { params });
    return response.data;
  },

  async getById(id: string): Promise<Movie> {
    const response = await api.get<Movie>(`/movies/${id}`);
    return response.data;
  },

  async create(data: CreateMovieData): Promise<Movie> {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === 'poster' || key === 'backdrop') {
          formData.append(key, value as File);
        } else {
          formData.append(key, String(value));
        }
      }
    });

    const response = await api.post<Movie>('/movies', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  async update(id: string, data: Partial<CreateMovieData>): Promise<Movie> {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === 'poster' || key === 'backdrop') {
          formData.append(key, value as File);
        } else {
          formData.append(key, String(value));
        }
      }
    });

    const response = await api.put<Movie>(`/movies/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/movies/${id}`);
  },
};
