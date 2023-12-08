import { jwtDecode } from 'jwt-decode';

import { guestInstance, authInstance } from './index.js';

export const signup = async (email, password) => {
    try {
        const response = await guestInstance.post('user/sign_up', {
            email,
            password,
            role: 'USER',
        });
        const token = response.data.token;
        const user = jwtDecode(token);
        localStorage.setItem('token', token);
        return user;
    } catch (error) {
        alert(error.response.data.message);
        return false;
    }
};

export const login = async (email, password) => {
    try {
        const response = await authInstance.post('user/login', {
            email,
            password,
        });
        const token = response.data.token;
        const user = jwtDecode(token);
        return user;
    } catch (error) {
        alert(error.response.data.message);
        return false;
    }
};

export const logout = () => {
    localStorage.removeItem('token');
};

export const check = async () => {
    let token, response;
    try {
        token = localStorage.getItem('token');
        if (!token) {
            response = await guestInstance.post('user/temp_sign_up');
        } else {
            response = await authInstance.get('user/check');
        }
        token = response.data.token;
        const user = jwtDecode(token);
        localStorage('token', token);
        return user;
    } catch (error) {
        localStorage.removeItem('token');
        return false;
    }
};
