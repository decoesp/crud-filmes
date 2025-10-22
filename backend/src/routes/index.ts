import { Router } from 'express';
import { authRoutes } from './auth.routes';
import { movieRoutes } from './movie.routes';
import { userRoutes } from './user.routes';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/movies', movieRoutes);
routes.use('/users', userRoutes);

export { routes };
