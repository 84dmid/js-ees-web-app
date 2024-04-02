import React, { useContext } from 'react';

import { Routes, Route } from 'react-router-dom';
import { AppContext } from './AppContext.js';

import Home from '../pages/Home.js';
import Constructor from '../pages/Constructor.js';
import Project from '../pages/Project.js';
import OfficeProcessing from '../pages/OfficeProcessing.js';
import Contractors from '../pages/Contractors.js';
import Tender from '../store/Tender.js';
import Cooperation from '../pages/Cooperation.js';
import Contacts from '../pages/Contacts.js';
import ProjectLink from '../pages/ProjectLink.js';

import Login from '../pages/Login.js';
import Signup from '../pages/Signup.js';
import User from '../pages/User.js';
import Admin from '../pages/Admin.js';

import CatalogEditor from './CatalogEditor.js';
import Statistics from './Statistics.js';
import ScenariosEditor from './ScenariosEditor.js';
import RegionEditor from './RegionEditor.js';

const AppRouter = () => {
    const { user } = useContext(AppContext);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/constructor" element={<Constructor />} />
            <Route path="/project" element={<Project />} />
            <Route path="/office_processing" element={<OfficeProcessing />} />
            <Route path="/contractors" element={<Contractors />} />
            <Route path="/tender" element={<Tender />} />
            <Route path="/cooperation" element={<Cooperation />} />
            <Route path="/contacts" element={<Contacts />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/project_link/:id" element={<ProjectLink />} />
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
                        <Route path="edit/region" element={<RegionEditor />} />
                        <Route path="statistics" element={<Statistics />} />
                    </Route>
                </>
            )}
        </Routes>
    );
};

export default AppRouter;
