import { z } from 'zod';

export const createMovieSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  originalTitle: z.string().min(1, 'Original title is required'),
  releaseDate: z.string().datetime('Invalid date format'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  duration: z.coerce.number().int().positive('Duration must be a positive number'),
  budget: z.coerce.number().optional(),
  revenue: z.coerce.number().optional(),
  genre: z.string().optional(),
  director: z.string().optional(),
  cast: z.string().optional(),
  rating: z.coerce.number().min(0).max(10).optional(),
  status: z.string().optional(),
  voteCount: z.coerce.number().int().nonnegative().optional(),
  voteAverage: z.coerce.number().min(0).max(10).optional(),
  trailerUrl: z.preprocess(
    (val) => (val === '' ? undefined : val),
    z.string().url('Invalid URL format').optional()
  ),
});

export const updateMovieSchema = createMovieSchema.partial();

export const listMoviesSchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(50).optional(),
  search: z.string().optional(),
  genre: z.string().optional(),
  duration: z.coerce.number().int().positive().optional(),
  minDuration: z.coerce.number().int().positive().optional(),
  maxDuration: z.coerce.number().int().positive().optional(),
  releaseDate: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});
