import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { registerSchema, loginSchema } from '../validators/auth.validator';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = async (req: Request, res: Response) => {
    const data = registerSchema.parse(req.body);
    const result = await this.authService.register(data);
    return res.status(201).json(result);
  };

  login = async (req: Request, res: Response) => {
    const data = loginSchema.parse(req.body);
    const result = await this.authService.login(data);
    return res.json(result);
  };

  me = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await this.authService.getUserById(userId);
    return res.json(user);
  };
}
