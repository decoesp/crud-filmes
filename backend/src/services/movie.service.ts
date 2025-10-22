import { Prisma } from '@prisma/client';
import { prisma } from '../config/database';
import { AppError } from '../utils/app-error';
import { S3Service } from './s3.service';
import { EmailService } from './email.service';

interface CreateMovieData {
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
  userId: string;
  posterFile?: Express.Multer.File;
  backdropFile?: Express.Multer.File;
}

interface UpdateMovieData extends Partial<CreateMovieData> {}

interface ListMoviesQuery {
  page?: number;
  limit?: number;
  search?: string;
  genre?: string;
  duration?: number;
  minDuration?: number;
  maxDuration?: number;
  releaseDate?: string;
  startDate?: string;
  endDate?: string;
}

export class MovieService {
  private s3Service: S3Service;
  private emailService: EmailService;

  constructor() {
    this.s3Service = new S3Service();
    this.emailService = new EmailService();
  }

  async list(query: ListMoviesQuery) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const where: Prisma.MovieWhereInput = {};

    if (query.search) {
      where.OR = [
        { title: { contains: query.search, mode: 'insensitive' } },
        { originalTitle: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    if (query.genre) {
      where.genre = { contains: query.genre, mode: 'insensitive' };
    }

    // Handle duration filter - single value or range
    if (query.duration) {
      where.duration = query.duration;
    } else if (query.minDuration || query.maxDuration) {
      where.duration = {};
      if (query.minDuration) where.duration.gte = query.minDuration;
      if (query.maxDuration) where.duration.lte = query.maxDuration;
    }

    // Handle release date filter - single date or range
    if (query.releaseDate) {
      const date = new Date(query.releaseDate);
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      where.releaseDate = {
        gte: date,
        lt: nextDay,
      };
    } else if (query.startDate || query.endDate) {
      where.releaseDate = {};
      if (query.startDate) where.releaseDate.gte = new Date(query.startDate);
      if (query.endDate) where.releaseDate.lte = new Date(query.endDate);
    }

    const [movies, total] = await Promise.all([
      prisma.movie.findMany({
        where,
        skip,
        take: limit,
        orderBy: { releaseDate: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
      prisma.movie.count({ where }),
    ]);

    return {
      movies,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getById(id: string) {
    const movie = await prisma.movie.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!movie) {
      throw new AppError('Movie not found', 404);
    }

    return movie;
  }

  async create(data: CreateMovieData) {
    let posterUrl: string | undefined;
    let backdropUrl: string | undefined;

    if (data.posterFile) {
      posterUrl = await this.s3Service.uploadFile(data.posterFile, 'posters');
    }

    if (data.backdropFile) {
      backdropUrl = await this.s3Service.uploadFile(data.backdropFile, 'backdrops');
    }

    const movie = await prisma.movie.create({
      data: {
        title: data.title,
        originalTitle: data.originalTitle,
        releaseDate: new Date(data.releaseDate),
        description: data.description,
        duration: data.duration,
        budget: data.budget,
        revenue: data.revenue,
        genre: data.genre,
        director: data.director,
        cast: data.cast,
        rating: data.rating,
        status: data.status,
        voteCount: data.voteCount,
        voteAverage: data.voteAverage,
        trailerUrl: data.trailerUrl,
        posterUrl,
        backdropUrl,
        userId: data.userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return movie;
  }

  async update(id: string, userId: string, data: UpdateMovieData) {
    const movie = await prisma.movie.findUnique({
      where: { id },
    });

    if (!movie) {
      throw new AppError('Movie not found', 404);
    }

    if (movie.userId !== userId) {
      throw new AppError('You do not have permission to update this movie', 403);
    }

    let posterUrl = movie.posterUrl;
    let backdropUrl = movie.backdropUrl;

    if (data.posterFile) {
      if (posterUrl) {
        await this.s3Service.deleteFile(posterUrl);
      }
      posterUrl = await this.s3Service.uploadFile(data.posterFile, 'posters');
    }

    if (data.backdropFile) {
      if (backdropUrl) {
        await this.s3Service.deleteFile(backdropUrl);
      }
      backdropUrl = await this.s3Service.uploadFile(data.backdropFile, 'backdrops');
    }

    const updatedMovie = await prisma.movie.update({
      where: { id },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.originalTitle && { originalTitle: data.originalTitle }),
        ...(data.releaseDate && { releaseDate: new Date(data.releaseDate) }),
        ...(data.description && { description: data.description }),
        ...(data.duration && { duration: data.duration }),
        ...(data.budget !== undefined && { budget: data.budget }),
        ...(data.revenue !== undefined && { revenue: data.revenue }),
        ...(data.genre && { genre: data.genre }),
        ...(data.director && { director: data.director }),
        ...(data.cast && { cast: data.cast }),
        ...(data.rating !== undefined && { rating: data.rating }),
        ...(data.status !== undefined && { status: data.status }),
        ...(data.voteCount !== undefined && { voteCount: data.voteCount }),
        ...(data.voteAverage !== undefined && { voteAverage: data.voteAverage }),
        ...(data.trailerUrl !== undefined && { trailerUrl: data.trailerUrl }),
        posterUrl,
        backdropUrl,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return updatedMovie;
  }

  async delete(id: string, userId: string) {
    const movie = await prisma.movie.findUnique({
      where: { id },
    });

    if (!movie) {
      throw new AppError('Movie not found', 404);
    }

    if (movie.userId !== userId) {
      throw new AppError('You do not have permission to delete this movie', 403);
    }

    if (movie.posterUrl) {
      await this.s3Service.deleteFile(movie.posterUrl);
    }

    if (movie.backdropUrl) {
      await this.s3Service.deleteFile(movie.backdropUrl);
    }

    await prisma.movie.delete({
      where: { id },
    });
  }
}
