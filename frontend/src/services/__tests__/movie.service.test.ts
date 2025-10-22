import { describe, it, expect, vi, beforeEach } from 'vitest';
import { movieService, type CreateMovieData } from '../movie.service';
import { api } from '@/lib/api';

vi.mock('@/lib/api');

describe('Movie Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('list', () => {
    it('fetches movies list without params', async () => {
      const mockResponse = {
        data: {
          movies: [],
          pagination: {
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 0,
          },
        },
      };

      vi.mocked(api.get).mockResolvedValueOnce(mockResponse);

      const result = await movieService.list();

      expect(api.get).toHaveBeenCalledWith('/movies', { params: undefined });
      expect(result).toEqual(mockResponse.data);
    });

    it('fetches movies list with search params', async () => {
      const params = { search: 'Inception', page: 1, limit: 10 };
      const mockResponse = {
        data: {
          movies: [{ id: '1', title: 'Inception' }],
          pagination: {
            page: 1,
            limit: 10,
            total: 1,
            totalPages: 1,
          },
        },
      };

      vi.mocked(api.get).mockResolvedValueOnce(mockResponse);

      const result = await movieService.list(params);

      expect(api.get).toHaveBeenCalledWith('/movies', { params });
      expect(result.movies).toHaveLength(1);
    });

    it('fetches movies list with filter params', async () => {
      const params = {
        genre: 'Action',
        minDuration: 90,
        maxDuration: 180,
        startDate: '2020-01-01',
        endDate: '2023-12-31',
      };

      const mockResponse = {
        data: {
          movies: [],
          pagination: {
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 0,
          },
        },
      };

      vi.mocked(api.get).mockResolvedValueOnce(mockResponse);

      await movieService.list(params);

      expect(api.get).toHaveBeenCalledWith('/movies', { params });
    });
  });

  describe('getById', () => {
    it('fetches a single movie by id', async () => {
      const mockMovie = {
        data: {
          id: '123',
          title: 'Inception',
          originalTitle: 'Inception',
          description: 'A mind-bending thriller',
          releaseDate: '2010-07-16',
          duration: 148,
        },
      };

      vi.mocked(api.get).mockResolvedValueOnce(mockMovie);

      const result = await movieService.getById('123');

      expect(api.get).toHaveBeenCalledWith('/movies/123');
      expect(result).toEqual(mockMovie.data);
    });

    it('throws error when movie not found', async () => {
      vi.mocked(api.get).mockRejectedValueOnce(new Error('Not found'));

      await expect(movieService.getById('invalid')).rejects.toThrow('Not found');
    });
  });

  describe('create', () => {
    it('creates a new movie with form data', async () => {
      const movieData: CreateMovieData = {
        title: 'New Movie',
        originalTitle: 'New Movie',
        description: 'A new movie',
        releaseDate: '2024-01-01',
        duration: 120,
        genre: 'Action',
      };

      const mockResponse = {
        data: {
          id: '123',
          ...movieData,
        },
      };

      vi.mocked(api.post).mockResolvedValueOnce(mockResponse);

      const result = await movieService.create(movieData);

      expect(api.post).toHaveBeenCalledWith(
        '/movies',
        expect.any(FormData),
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      expect(result).toEqual(mockResponse.data);
    });

    it('creates a movie with poster and backdrop files', async () => {
      const posterFile = new File(['poster'], 'poster.jpg', { type: 'image/jpeg' });
      const backdropFile = new File(['backdrop'], 'backdrop.jpg', { type: 'image/jpeg' });

      const movieData: CreateMovieData = {
        title: 'New Movie',
        originalTitle: 'New Movie',
        description: 'A new movie',
        releaseDate: '2024-01-01',
        duration: 120,
        poster: posterFile,
        backdrop: backdropFile,
      };

      const mockResponse = {
        data: {
          id: '123',
          ...movieData,
          posterUrl: 'http://example.com/poster.jpg',
          backdropUrl: 'http://example.com/backdrop.jpg',
        },
      };

      vi.mocked(api.post).mockResolvedValueOnce(mockResponse);

      const result = await movieService.create(movieData);

      expect(api.post).toHaveBeenCalled();
      expect(result.posterUrl).toBe('http://example.com/poster.jpg');
    });
  });

  describe('update', () => {
    it('updates an existing movie', async () => {
      const updateData: Partial<CreateMovieData> = {
        title: 'Updated Title',
        description: 'Updated description',
      };

      const mockResponse = {
        data: {
          id: '123',
          title: 'Updated Title',
          description: 'Updated description',
        },
      };

      vi.mocked(api.put).mockResolvedValueOnce(mockResponse);

      const result = await movieService.update('123', updateData);

      expect(api.put).toHaveBeenCalledWith(
        '/movies/123',
        expect.any(FormData),
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      expect(result).toEqual(mockResponse.data);
    });

    it('updates movie with new poster', async () => {
      const newPoster = new File(['new'], 'new.jpg', { type: 'image/jpeg' });
      const updateData: Partial<CreateMovieData> = {
        poster: newPoster,
      };

      const mockResponse = {
        data: {
          id: '123',
          posterUrl: 'http://example.com/new.jpg',
        },
      };

      vi.mocked(api.put).mockResolvedValueOnce(mockResponse);

      await movieService.update('123', updateData);

      expect(api.put).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('deletes a movie by id', async () => {
      vi.mocked(api.delete).mockResolvedValueOnce({ data: null });

      await movieService.delete('123');

      expect(api.delete).toHaveBeenCalledWith('/movies/123');
    });

    it('throws error when delete fails', async () => {
      vi.mocked(api.delete).mockRejectedValueOnce(new Error('Delete failed'));

      await expect(movieService.delete('123')).rejects.toThrow('Delete failed');
    });
  });
});
