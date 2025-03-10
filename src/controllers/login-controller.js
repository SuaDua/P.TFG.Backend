import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HttpStatusError } from 'common-errors';
import config from '../config.js';
import User from '../models/user.js';

export async function login(req, res, next) {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user && bcrypt.compareSync(password, user.password)) {
            const userInfo = { id: user._id, name: user.username };
            const jwtConfig = { expiresIn: '1h' };
            const token = jwt.sign(userInfo, config.app.secretKey, jwtConfig);
            return res.send({ token });
        }

        throw new HttpStatusError(401, 'Invalid credentials');
    } catch (error) {
        next(error);
    }
}

export async function register(req, res, next) {
    const { username, password } = req.body;

    try {
        if (await User.findOne({ username })) {
            throw new HttpStatusError(409, 'User already exists');
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        const userInfo = { id: newUser._id, name: newUser.username };
        const jwtConfig = { expiresIn: '1h' };
        const token = jwt.sign(userInfo, config.app.secretKey, jwtConfig);
        res.status(201).send({ id: newUser._id, username: newUser.username, token });
    } catch (error) {
        next(error);
    }
}

export async function recoverPassword(req, res, next) {
    const { username, newPassword } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            throw new HttpStatusError(404, 'User not found');
        }

        user.password = bcrypt.hashSync(newPassword, 10);
        await user.save();

        const userInfo = { id: user._id, name: user.username };
        const jwtConfig = { expiresIn: '1h' };
        const token = jwt.sign(userInfo, config.app.secretKey, jwtConfig);
        res.send({ message: 'Password updated successfully', token });
    } catch (error) {
        next(error);
    }
}