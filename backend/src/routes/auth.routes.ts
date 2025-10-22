import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post('/register', authController.register);
authRoutes.post('/login', authController.login);
authRoutes.get('/me', authController.me);

export { authRoutes };
