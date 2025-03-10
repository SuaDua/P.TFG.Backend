import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HttpStatusError } from 'common-errors';
import { login, register, recoverPassword } from '../src/controllers/login-controller.js';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('User Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = { body: {} };
        res = { send: jest.fn(), status: jest.fn().mockReturnThis() };
        next = jest.fn();
    });

    describe('login', () => {
        it('should return a token for valid credentials', async () => {
            req.body = { username: 'testuser', password: 'password' };
            const user = { id: 1, username: 'testuser', password: 'hashedpassword' };
            bcrypt.compareSync.mockReturnValue(true);
            jwt.sign.mockReturnValue('token');

            await login(req, res, next);

            expect(res.send).toHaveBeenCalledWith({ token: 'token' });
        });

        it('should throw an error for invalid credentials', async () => {
            req.body = { username: 'testuser', password: 'wrongpassword' };
            bcrypt.compareSync.mockReturnValue(false);

            await expect(login(req, res, next)).rejects.toThrow(HttpStatusError);
        });
    });

    describe('register', () => {
        it('should create a new user', async () => {
            req.body = { username: 'newuser', password: 'password' };
            bcrypt.hashSync.mockReturnValue('hashedpassword');

            await register(req, res, next);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledWith({ username: 'newuser' });
        });

        it('should throw an error if user already exists', async () => {
            req.body = { username: 'existinguser', password: 'password' };

            await expect(register(req, res, next)).rejects.toThrow(HttpStatusError);
        });
    });

    describe('recoverPassword', () => {
        it('should update the password for an existing user', async () => {
            req.body = { username: 'testuser', newPassword: 'newpassword' };
            bcrypt.hashSync.mockReturnValue('newhashedpassword');

            await recoverPassword(req, res, next);

            expect(res.send).toHaveBeenCalledWith({ message: 'Password updated successfully' });
        });

        it('should throw an error if user is not found', async () => {
            req.body = { username: 'nonexistentuser', newPassword: 'newpassword' };

            await expect(recoverPassword(req, res, next)).rejects.toThrow(HttpStatusError);
        });
    });
});