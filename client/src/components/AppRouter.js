import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SurveyCatalog from '../pages/SurveyCatalog.js';
import Login from '../pages/Login.js';
import Signup from '../pages/Signup.js';
import Basket from '../pages/Basket.js';
import User from '../pages/User.js';
import Admin from '../pages/Admin.js';

const AppRouter = () => {
    const isAuth = true;
    const isAdmin = false;

    return (
        <Routes>
            <Route path="/" element={<SurveyCatalog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/basket" element={<Basket />} />
            {isAuth && (
                <>
                    <Route path="/user" element={<User />} />
                </>
            )}
            {isAdmin && (
                <>
                    <Route path="/admin" element={<Admin />} />
                </>
            )}
        </Routes>
    );
};

export default AppRouter;
