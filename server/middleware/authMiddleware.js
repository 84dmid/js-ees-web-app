import jwt from 'jsonwebtoken';
import AppError from '../errors/AppError.js';

const decode = (token) => {
    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        return decode;
    } catch (error) {
        throw new Error('Неверная подпись токена');
    }
}

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new Error('Требуется авторизация');
        }
        const decoded = decode(token);
        req.auth = decoded;
        next();
    } catch (error) {
        next(AppError.forbidden(error.message));
    }
}

export default auth;