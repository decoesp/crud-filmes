import { z } from 'zod';

export const updateProfileSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').optional(),
  email: z.string().email('Invalid email address').optional(),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(6, 'Password must be at least 6 characters').optional(),
}).refine(
  (data) => {
    // Se está tentando mudar a senha, ambos os campos devem estar presentes
    if (data.newPassword && !data.currentPassword) {
      return false;
    }
    return true;
  },
  {
    message: 'Current password is required to change password',
    path: ['currentPassword'],
  }
);
