import { login, register, recoverPassword } from './login-controller.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HttpStatusError } from 'common-errors';

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
        it('should return a token for valid credentials', () => {
            req.body = { username: 'testuser', password: 'password' };
            const user = { id: 1, username: 'testuser', password: 'hashedpassword' };
            bcrypt.compareSync.mockReturnValue(true);
            jwt.sign.mockReturnValue('token');

            const users = [user];
            const findUser = jest.fn().mockReturnValue(user);

            login(req, res, next);

            expect(res.send).toHaveBeenCalledWith({ token: 'token' });
        });

        it('should throw an error for invalid credentials', () => {
            req.body = { username: 'testuser', password: 'wrongpassword' };
            const user = { id: 1, username: 'testuser', password: 'hashedpassword' };
            bcrypt.compareSync.mockReturnValue(false);

            const users = [user];
            const findUser = jest.fn().mockReturnValue(user);

            expect(() => login(req, res, next)).toThrow(HttpStatusError);
        });
    });

    describe('register', () => {
        it('should create a new user', () => {
            req.body = { username: 'newuser', password: 'password' };
            bcrypt.hashSync.mockReturnValue('hashedpassword');

            const users = [];
            const findUser = jest.fn().mockReturnValue(undefined);
            const createUser = jest.fn().mockReturnValue({ id: 1, username: 'newuser', password: 'hashedpassword' });

            register(req, res, next);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledWith({ id: 1, username: 'newuser' });
        });

        it('should throw an error if user already exists', () => {
            req.body = { username: 'existinguser', password: 'password' };
            const user = { id: 1, username: 'existinguser', password: 'hashedpassword' };

            const users = [user];
            const findUser = jest.fn().mockReturnValue(user);

            expect(() => register(req, res, next)).toThrow(HttpStatusError);
        });
    });

    describe('recoverPassword', () => {
        it('should update the password for an existing user', () => {
            req.body = { username: 'testuser', newPassword: 'newpassword' };
            const user = { id: 1, username: 'testuser', password: 'oldhashedpassword' };
            bcrypt.hashSync.mockReturnValue('newhashedpassword');

            const users = [user];
            const findUser = jest.fn().mockReturnValue(user);

            recoverPassword(req, res, next);

            expect(user.password).toBe('newhashedpassword');
            expect(res.send).toHaveBeenCalledWith({ message: 'Password updated successfully' });
        });

        it('should throw an error if user is not found', () => {
            req.body = { username: 'nonexistentuser', newPassword: 'newpassword' };

            const users = [];
            const findUser = jest.fn().mockReturnValue(undefined);

            expect(() => recoverPassword(req, res, next)).toThrow(HttpStatusError);
        });
    });
});