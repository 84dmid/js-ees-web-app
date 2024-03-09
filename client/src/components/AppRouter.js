import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import { AppContext } from './AppContext.js';
import SurveyCatalog from '../pages/SurveyCatalog.js';
import Login from '../pages/Login.js';
import Signup from '../pages/Signup.js';
import Basket from '../pages/Basket.js';
import User from '../pages/User.js';
import Admin from '../pages/Admin.js';
import CatalogEditor from './CatalogEditor.js';
import Statistics from './Statistics.js';
import ScenariosEditor from './ScenariosEditor.js';
import HomePage from '../pages/HomePage.js';

const AppRouter = () => {
    const { user } = useContext(AppContext);

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/survey_designer" element={<SurveyCatalog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/basket" element={<Basket />} />
            {user.isAuth && (
                <>
                    <Route path="/user" element={<User />} />
                </>
            )}
            {user.isAdmin && (
                <>
                    <Route path="/admin" element={<Admin />}>
                        <Route index element={<CatalogEditor />} />
                        <Route path="edit/">
                            <Route path="catalog" element={<CatalogEditor />} />
                        </Route>
                        <Route
                            path="edit/surveyScenarios"
                            element={<ScenariosEditor />}
                        />
                        <Route path="statistics" element={<Statistics />} />
                    </Route>
                </>
            )}
        </Routes>
    );
};

export default AppRouter;
