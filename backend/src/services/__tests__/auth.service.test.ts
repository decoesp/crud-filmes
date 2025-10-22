import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthService } from '../auth.service';
import { prisma } from '../../config/database';
import { AppError } from '../../utils/app-error';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

vi.mock('../../config/database', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
  },
}));

vi.mock('bcryptjs');
vi.mock('jsonwebtoken');

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
    vi.clearAllMocks();
    process.env.JWT_SECRET = 'test-secret';
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@test.com',
        password: 'password123',
      };

      const hashedPassword = 'hashed_password';
      const mockUser = {
        id: '1',
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(prisma.user.findUnique).mockResolvedValue(null);
      vi.mocked(bcrypt.hash).mockResolvedValue(hashedPassword as never);
      vi.mocked(prisma.user.create).mockResolvedValue(mockUser);
      vi.mocked(jwt.sign).mockReturnValue('mock_token' as never);

      const result = await authService.register(userData);

      expect(result.user).toEqual({
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
      });
      expect(result.token).toBe('mock_token');
    });

    it('should throw error if email already exists', async () => {
      const existingUser = {
        id: '1',
        email: 'existing@test.com',
      };

      vi.mocked(prisma.user.findUnique).mockResolvedValue(existingUser as any);

      await expect(
        authService.register({
          name: 'Test',
          email: 'existing@test.com',
          password: 'password',
        })
      ).rejects.toThrow(AppError);
      await expect(
        authService.register({
          name: 'Test',
          email: 'existing@test.com',
          password: 'password',
        })
      ).rejects.toThrow('E-mail já cadastrado');
    });
  });

  describe('login', () => {
    it('should login with valid credentials', async () => {
      const credentials = {
        email: 'john@test.com',
        password: 'password123',
      };

      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: credentials.email,
        password: 'hashed_password',
      };

      vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser as any);
      vi.mocked(bcrypt.compare).mockResolvedValue(true as never);
      vi.mocked(jwt.sign).mockReturnValue('mock_token' as never);

      const result = await authService.login(credentials);

      expect(result.user).toEqual({
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
      });
      expect(result.token).toBe('mock_token');
    });

    it('should throw error with invalid email', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(null);

      await expect(
        authService.login({
          email: 'invalid@test.com',
          password: 'password',
        })
      ).rejects.toThrow(AppError);
      await expect(
        authService.login({
          email: 'invalid@test.com',
          password: 'password',
        })
      ).rejects.toThrow('E-mail ou senha inválidos');
    });

    it('should throw error with invalid password', async () => {
      const mockUser = {
        id: '1',
        email: 'john@test.com',
        password: 'hashed_password',
      };

      vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser as any);
      vi.mocked(bcrypt.compare).mockResolvedValue(false as never);

      await expect(
        authService.login({
          email: 'john@test.com',
          password: 'wrong_password',
        })
      ).rejects.toThrow(AppError);
      await expect(
        authService.login({
          email: 'john@test.com',
          password: 'wrong_password',
        })
      ).rejects.toThrow('E-mail ou senha inválidos');
    });
  });

  describe('forgotPassword', () => {
    it('should generate reset token for valid email', async () => {
      const email = 'john@test.com';
      const mockUser = {
        id: '1',
        email,
        name: 'John',
      };

      vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser as any);
      vi.mocked(prisma.user.update).mockResolvedValue(mockUser as any);

      const result = await authService.forgotPassword(email);

      expect(result.message).toBe('E-mail de recuperação enviado');
      expect(prisma.user.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: mockUser.id },
          data: expect.objectContaining({
            resetToken: expect.any(String),
            resetTokenExpiry: expect.any(Date),
          }),
        })
      );
    });

    it('should throw error for non-existent email', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(null);

      await expect(authService.forgotPassword('invalid@test.com')).rejects.toThrow(AppError);
      await expect(authService.forgotPassword('invalid@test.com')).rejects.toThrow(
        'Usuário não encontrado'
      );
    });
  });

  describe('resetPassword', () => {
    it('should reset password with valid token', async () => {
      const token = 'valid_token';
      const newPassword = 'new_password';
      const hashedPassword = 'hashed_new_password';

      const mockUser = {
        id: '1',
        resetToken: token,
        resetTokenExpiry: new Date(Date.now() + 3600000),
      };

      vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser as any);
      vi.mocked(bcrypt.hash).mockResolvedValue(hashedPassword as never);
      vi.mocked(prisma.user.update).mockResolvedValue(mockUser as any);

      const result = await authService.resetPassword(token, newPassword);

      expect(result.message).toBe('Senha redefinida com sucesso');
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        data: {
          password: hashedPassword,
          resetToken: null,
          resetTokenExpiry: null,
        },
      });
    });

    it('should throw error with invalid token', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(null);

      await expect(authService.resetPassword('invalid_token', 'new_password')).rejects.toThrow(
        AppError
      );
      await expect(authService.resetPassword('invalid_token', 'new_password')).rejects.toThrow(
        'Token inválido ou expirado'
      );
    });

    it('should throw error with expired token', async () => {
      const expiredUser = {
        id: '1',
        resetToken: 'valid_token',
        resetTokenExpiry: new Date(Date.now() - 1000),
      };

      vi.mocked(prisma.user.findUnique).mockResolvedValue(expiredUser as any);

      await expect(authService.resetPassword('valid_token', 'new_password')).rejects.toThrow(
        AppError
      );
      await expect(authService.resetPassword('valid_token', 'new_password')).rejects.toThrow(
        'Token inválido ou expirado'
      );
    });
  });
});
