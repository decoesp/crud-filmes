import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const userRoutes = Router();
const userController = new UserController();

userRoutes.use(authMiddleware);

userRoutes.get('/profile', userController.getProfile);
userRoutes.put('/profile', userController.updateProfile);

export { userRoutes };
