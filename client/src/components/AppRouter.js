import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import { AppContext } from './AppContext.js';
import SurveyCatalog from '../pages/SurveyCatalog.js';
import Login from '../pages/Login.js';
import Signup from '../pages/Signup.js';
import Basket from '../pages/Basket.js';
import User from '../pages/User.js';
import Admin from '../pages/Admin.js';
import Variant from '../pages/Variant.js';
import CatalogEditor from './CatalogEditor.js';
import Statistics from './Statistics.js';
import VariantEditor from './VariantEditor.js';
import ObjectTypesEditor from './ObjectTypesEditor.js';
import HandlersEditor from './HandlersEditor.js';
import SurveyScenariosEditor from './SurveyScenariosEditor.js';

const AppRouter = () => {
    const { user } = useContext(AppContext);

    return (
        <Routes>
            <Route path="/" element={<SurveyCatalog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/variant/:id" element={<Variant />} />
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
                            <Route
                                path="catalog/variant/:id"
                                element={<VariantEditor />}
                            />
                        </Route>
                        <Route path="edit/objectTypes" element={<ObjectTypesEditor />} />
                        <Route path="edit/handlers" element={<HandlersEditor />} />
                        <Route
                            path="edit/surveyScenarios"
                            element={<SurveyScenariosEditor />}
                        />
                        <Route path="statistics" element={<Statistics />} />
                    </Route>
                </>
            )}
        </Routes>
    );
};

export default AppRouter;
