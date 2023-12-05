import AppError from '../errors/AppError.js';

const admin = (req, res, next) => {
    try {
        if (req.auth.role !== 'ADMIN') {
            throw new Error('Только для администратора');
        }
        next();
    } catch (error) {
        next(AppError.forbidden(error.message));
    }
}

export default admin;