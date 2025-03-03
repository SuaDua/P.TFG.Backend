import bcrypt from 'bcrypt';
import { HttpStatusError } from 'common-errors';
import jwt from 'jsonwebtoken';

import config from '../config.js';

// Simulated database functions
const users = []; // This should be replaced with actual database calls

function findUser(username) {
    return users.find(user => user.username === username);
}

function createUser(username, password) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = { id: users.length + 1, username, password: hashedPassword };
    users.push(newUser);
    return newUser;
}

export function login(req, res, next) {
    const { username, password } = req.body;

    const user = findUser(username);

    if (user) {
        if (bcrypt.compareSync(password, user.password)) {
            const userInfo = { id: user.id, name: user.username };
            const jwtConfig = { expiresIn: '1h' };
            const token = jwt.sign(userInfo, config.app.secretKey, jwtConfig);
            return res.send({ token });
        }
    }

    throw new HttpStatusError(401, 'Invalid credentials');
}

export function register(req, res, next) {
    const { username, password } = req.body;

    if (findUser(username)) {
        throw new HttpStatusError(409, 'User already exists');
    }

    const newUser = createUser(username, password);
    res.status(201).send({ id: newUser.id, username: newUser.username });
}

export function recoverPassword(req, res, next) {
    const { username, newPassword } = req.body;

    const user = findUser(username);

    if (!user) {
        throw new HttpStatusError(404, 'User not found');
    }

    user.password = bcrypt.hashSync(newPassword, 10);
    res.send({ message: 'Password updated successfully' });
}









