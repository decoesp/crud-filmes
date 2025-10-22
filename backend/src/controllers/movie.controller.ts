import { Request, Response } from 'express';
import { MovieService } from '../services/movie.service';
import { createMovieSchema, updateMovieSchema, listMoviesSchema } from '../validators/movie.validator';

export class MovieController {
  private movieService: MovieService;

  constructor() {
    this.movieService = new MovieService();
  }

  list = async (req: Request, res: Response) => {
    const query = listMoviesSchema.parse(req.query);
    const result = await this.movieService.list(query);
    return res.json(result);
  };

  show = async (req: Request, res: Response) => {
    const { id } = req.params;
    
    const movie = await this.movieService.getById(id);
    return res.json(movie);
  };

  create = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const data = createMovieSchema.parse(req.body);
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    
    const movie = await this.movieService.create({
      ...data,
      userId,
      posterFile: files?.poster?.[0],
      backdropFile: files?.backdrop?.[0],
    });
    
    return res.status(201).json(movie);
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;
    const data = updateMovieSchema.parse(req.body);
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    
    const movie = await this.movieService.update(id, userId, {
      ...data,
      posterFile: files?.poster?.[0],
      backdropFile: files?.backdrop?.[0],
    });
    
    return res.json(movie);
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;
    
    await this.movieService.delete(id, userId);
    return res.status(204).send();
  };
}
