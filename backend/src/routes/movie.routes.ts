import { Router } from 'express';
import { MovieController } from '../controllers/movie.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { upload } from '../config/multer';

const movieRoutes = Router();
const movieController = new MovieController();

// Todas as rotas de filmes requerem autenticação
movieRoutes.use(authMiddleware);

movieRoutes.get('/', movieController.list);
movieRoutes.get('/:id', movieController.show);
movieRoutes.post('/', upload.fields([
  { name: 'poster', maxCount: 1 },
  { name: 'backdrop', maxCount: 1 }
]), movieController.create);
movieRoutes.put('/:id', upload.fields([
  { name: 'poster', maxCount: 1 },
  { name: 'backdrop', maxCount: 1 }
]), movieController.update);
movieRoutes.delete('/:id', movieController.delete);

export { movieRoutes };
