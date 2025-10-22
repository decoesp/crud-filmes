import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { updateProfileSchema } from '../validators/user.validator';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getProfile = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const user = await this.userService.getProfile(userId);
    return res.json(user);
  };

  updateProfile = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const data = updateProfileSchema.parse(req.body);
    const user = await this.userService.updateProfile(userId, data);
    return res.json(user);
  };
}
