import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HttpStatusError } from 'common-errors';
import { login, register, recoverPassword } from '../src/controllers/login-controller.js';
import User from '../src/models/user.js';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../src/models/user.js');

describe('User Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {} };
    res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should return a token for valid credentials', async () => {
      req.body = { username: 'testuser', password: 'password' };
      const mockUser = { _id: '123', username: 'testuser', password: 'hashedpass', role: 'comprador' };

      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compareSync.mockReturnValue(true);
      jwt.sign.mockReturnValue('token123');

      await login(req, res, next);

      expect(res.send).toHaveBeenCalledWith({
        token: 'token123',
        id: '123',
        role: 'comprador'
      });
    });

    it('should call next with error on invalid credentials', async () => {
      req.body = { username: 'testuser', password: 'wrongpass' };
      User.findOne.mockResolvedValue({ _id: '123', username: 'testuser', password: 'hashedpass', role: 'comprador' });
      bcrypt.compareSync.mockReturnValue(false);

      await login(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(HttpStatusError));
    });
  });

  describe('register', () => {
    it('should create new user', async () => {
      req.body = { username: 'newuser', password: '1234' };

      User.findOne.mockResolvedValue(null);
      bcrypt.hashSync.mockReturnValue('hashed');

      const mockSave = jest.fn().mockResolvedValue(true);
      User.mockImplementation(() => ({
        save: mockSave,
        _id: '456',
        username: 'newuser',
        role: 'comprador'
      }));

      jwt.sign.mockReturnValue('token456');

      await register(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({
        id: '456',
        username: 'newuser',
        role: 'comprador',
        token: 'token456'
      });
    });

    it('should fail if user already exists', async () => {
      req.body = { username: 'existing', password: '1234' };
      User.findOne.mockResolvedValue({ username: 'existing' });

      await register(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(HttpStatusError));
    });
  });

  describe('recoverPassword', () => {
    it('should update password if user exists', async () => {
      req.body = { username: 'testuser', newPassword: 'nueva' };
      const mockUser = {
        _id: '789',
        username: 'testuser',
        role: 'comprador',
        save: jest.fn()
      };

      User.findOne.mockResolvedValue(mockUser);
      bcrypt.hashSync.mockReturnValue('newhashed');
      jwt.sign.mockReturnValue('token789');

      await recoverPassword(req, res, next);

      expect(mockUser.save).toHaveBeenCalled();
      expect(res.send).toHaveBeenCalledWith({
        message: 'Password updated successfully',
        token: 'token789',
        id: '789',
        role: 'comprador'
      });
    });

    it('should fail if user not found', async () => {
      req.body = { username: 'unknown', newPassword: '1234' };
      User.findOne.mockResolvedValue(null);

      await recoverPassword(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(HttpStatusError));
    });
  });
});