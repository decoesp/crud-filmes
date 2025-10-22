import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MovieService } from '../movie.service';
import { prisma } from '../../config/database';
import { AppError } from '../../utils/app-error';

vi.mock('../../config/database', () => ({
  prisma: {
    movie: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      count: vi.fn(),
    },
  },
}));

vi.mock('../s3.service', () => ({
  S3Service: vi.fn().mockImplementation(() => ({
    uploadFile: vi.fn().mockResolvedValue('https://s3.aws.com/file.jpg'),
    deleteFile: vi.fn().mockResolvedValue(undefined),
  })),
}));

vi.mock('../email.service', () => ({
  EmailService: vi.fn().mockImplementation(() => ({
    sendEmail: vi.fn().mockResolvedValue(undefined),
  })),
}));

describe('MovieService', () => {
  let movieService: MovieService;

  beforeEach(() => {
    movieService = new MovieService();
    vi.clearAllMocks();
  });

  describe('list', () => {
    it('should return paginated movies', async () => {
      const mockMovies = [
        {
          id: '1',
          title: 'Inception',
          originalTitle: 'Inception',
          releaseDate: new Date('2010-07-16'),
          description: 'A mind-bending thriller',
          duration: 148,
          userId: 'user1',
          user: { id: 'user1', name: 'John', email: 'john@test.com' },
        },
      ];

      vi.mocked(prisma.movie.findMany).mockResolvedValue(mockMovies as any);
      vi.mocked(prisma.movie.count).mockResolvedValue(1);

      const result = await movieService.list({ page: 1, limit: 10 });

      expect(result.movies).toHaveLength(1);
      expect(result.pagination).toEqual({
        page: 1,
        limit: 10,
        total: 1,
        totalPages: 1,
      });
    });

    it('should filter movies by search term', async () => {
      vi.mocked(prisma.movie.findMany).mockResolvedValue([]);
      vi.mocked(prisma.movie.count).mockResolvedValue(0);

      await movieService.list({ search: 'Inception' });

      expect(prisma.movie.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            OR: expect.any(Array),
          }),
        })
      );
    });

    it('should filter movies by genre', async () => {
      vi.mocked(prisma.movie.findMany).mockResolvedValue([]);
      vi.mocked(prisma.movie.count).mockResolvedValue(0);

      await movieService.list({ genre: 'Action' });

      expect(prisma.movie.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            genre: expect.objectContaining({ contains: 'Action' }),
          }),
        })
      );
    });

    it('should filter movies by duration range', async () => {
      vi.mocked(prisma.movie.findMany).mockResolvedValue([]);
      vi.mocked(prisma.movie.count).mockResolvedValue(0);

      await movieService.list({ minDuration: 90, maxDuration: 180 });

      expect(prisma.movie.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            duration: expect.objectContaining({
              gte: 90,
              lte: 180,
            }),
          }),
        })
      );
    });

    it('should filter movies by date range', async () => {
      vi.mocked(prisma.movie.findMany).mockResolvedValue([]);
      vi.mocked(prisma.movie.count).mockResolvedValue(0);

      await movieService.list({
        startDate: '2020-01-01',
        endDate: '2023-12-31',
      });

      expect(prisma.movie.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            releaseDate: expect.objectContaining({
              gte: expect.any(Date),
              lte: expect.any(Date),
            }),
          }),
        })
      );
    });
  });

  describe('getById', () => {
    it('should return a movie by id', async () => {
      const mockMovie = {
        id: '1',
        title: 'Inception',
        originalTitle: 'Inception',
        description: 'A thriller',
        releaseDate: new Date('2010-07-16'),
        duration: 148,
        userId: 'user1',
        user: { id: 'user1', name: 'John', email: 'john@test.com' },
      };

      vi.mocked(prisma.movie.findUnique).mockResolvedValue(mockMovie as any);

      const result = await movieService.getById('1');

      expect(result).toEqual(mockMovie);
      expect(prisma.movie.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
        },
      });
    });

    it('should throw error if movie not found', async () => {
      vi.mocked(prisma.movie.findUnique).mockResolvedValue(null);

      await expect(movieService.getById('invalid')).rejects.toThrow(AppError);
      await expect(movieService.getById('invalid')).rejects.toThrow('Movie not found');
    });
  });

  describe('create', () => {
    it('should create a new movie', async () => {
      const movieData = {
        title: 'New Movie',
        originalTitle: 'New Movie',
        description: 'A new movie',
        releaseDate: '2024-01-01',
        duration: 120,
        userId: 'user1',
      };

      const mockCreatedMovie = {
        id: '1',
        ...movieData,
        releaseDate: new Date(movieData.releaseDate),
        user: { id: 'user1', name: 'John', email: 'john@test.com' },
      };

      vi.mocked(prisma.movie.create).mockResolvedValue(mockCreatedMovie as any);

      const result = await movieService.create(movieData);

      expect(result).toEqual(mockCreatedMovie);
      expect(prisma.movie.create).toHaveBeenCalled();
    });

    it('should upload poster and backdrop files', async () => {
      const posterFile = {
        buffer: Buffer.from('poster'),
        originalname: 'poster.jpg',
        mimetype: 'image/jpeg',
      } as Express.Multer.File;

      const backdropFile = {
        buffer: Buffer.from('backdrop'),
        originalname: 'backdrop.jpg',
        mimetype: 'image/jpeg',
      } as Express.Multer.File;

      const movieData = {
        title: 'New Movie',
        originalTitle: 'New Movie',
        description: 'A new movie',
        releaseDate: '2024-01-01',
        duration: 120,
        userId: 'user1',
        posterFile,
        backdropFile,
      };

      const mockCreatedMovie = {
        id: '1',
        title: movieData.title,
        originalTitle: movieData.originalTitle,
        description: movieData.description,
        releaseDate: new Date(movieData.releaseDate),
        duration: movieData.duration,
        userId: movieData.userId,
        posterUrl: 'https://s3.aws.com/file.jpg',
        backdropUrl: 'https://s3.aws.com/file.jpg',
        user: { id: 'user1', name: 'John', email: 'john@test.com' },
      };

      vi.mocked(prisma.movie.create).mockResolvedValue(mockCreatedMovie as any);

      const result = await movieService.create(movieData);

      expect(result.posterUrl).toBe('https://s3.aws.com/file.jpg');
      expect(result.backdropUrl).toBe('https://s3.aws.com/file.jpg');
    });
  });

  describe('update', () => {
    it('should update an existing movie', async () => {
      const existingMovie = {
        id: '1',
        title: 'Old Title',
        userId: 'user1',
      };

      const updateData = {
        title: 'Updated Title',
      };

      const updatedMovie = {
        ...existingMovie,
        ...updateData,
      };

      vi.mocked(prisma.movie.findUnique).mockResolvedValue(existingMovie as any);
      vi.mocked(prisma.movie.update).mockResolvedValue(updatedMovie as any);

      const result = await movieService.update('1', 'user1', updateData);

      expect(result.title).toBe('Updated Title');
    });

    it('should throw error if movie not found', async () => {
      vi.mocked(prisma.movie.findUnique).mockResolvedValue(null);

      await expect(movieService.update('invalid', 'user1', {})).rejects.toThrow(AppError);
    });

    it('should throw error if user is not owner', async () => {
      const existingMovie = {
        id: '1',
        userId: 'user1',
      };

      vi.mocked(prisma.movie.findUnique).mockResolvedValue(existingMovie as any);

      await expect(movieService.update('1', 'user2', {})).rejects.toThrow(AppError);
      await expect(movieService.update('1', 'user2', {})).rejects.toThrow('You do not have permission to update this movie');
    });
  });

  describe('delete', () => {
    it('should delete a movie', async () => {
      const existingMovie = {
        id: '1',
        userId: 'user1',
        posterUrl: 'https://s3.aws.com/poster.jpg',
        backdropUrl: 'https://s3.aws.com/backdrop.jpg',
      };

      vi.mocked(prisma.movie.findUnique).mockResolvedValue(existingMovie as any);
      vi.mocked(prisma.movie.delete).mockResolvedValue(existingMovie as any);

      await movieService.delete('1', 'user1');

      expect(prisma.movie.delete).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('should throw error if movie not found', async () => {
      vi.mocked(prisma.movie.findUnique).mockResolvedValue(null);

      await expect(movieService.delete('invalid', 'user1')).rejects.toThrow(AppError);
    });

    it('should throw error if user is not owner', async () => {
      const existingMovie = {
        id: '1',
        userId: 'user1',
      };

      vi.mocked(prisma.movie.findUnique).mockResolvedValue(existingMovie as any);

      await expect(movieService.delete('1', 'user2')).rejects.toThrow(AppError);
    });
  });
});
