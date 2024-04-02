import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import axios from 'axios';

import AppRouter from './components/AppRouter.js';
import NavBar from './components/NavBar.js';
import { AppContext } from './components/AppContext.js';
import userAPI from './http/userAPI.js';
import basketAPI from './http/basketAPI.js';
import Footer from './components/Footer.js';
import { fetchCatalog } from './http/catalogAPI.js';
import { fetchScenarios } from './http/scenarioAPI.js';
import regions from './initData/regions.js';
import { fetchRegions } from './http/regionAPI.js';

const App = observer(() => {
    const { user, isLoading, catalog, EESCalculator, regionEditor } =
        useContext(AppContext);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        Promise.all([
            userAPI.check(),
            fetchCatalog({}),
            fetchScenarios(),
            fetchRegions({}),
            basketAPI.fetchBasket(),
        ])
            .then(
                axios.spread(
                    (userData, catalogData, scenariosData, regionsData, basketData) => {
                        if (userData) {
                            user.login(userData);
                        }
                        catalog.initCatalog = catalogData;

                        catalog.generalData = {
                            ...catalog.generalData,
                            ...basketData.generalData,
                        };
                        catalog.customerData = {
                            ...catalog.customerData,
                            ...basketData.customerData,
                        };
                        catalog.contractorData = {
                            ...catalog.contractorData,
                            ...basketData.contractorData,
                        };

                        catalog.projectParams = basketData;
                        catalog.projectVariants = basketData.basketVariants;
                        catalog.regionId = basketData.regionId;

                        regionEditor.regions = regionsData;
                        catalog.initRegions = EESCalculator.initRegions = regionsData;

                        EESCalculator.initScenarios = scenariosData;
                        EESCalculator.regions = regions;
                    }
                )
            )
            .catch((error) => {
                console.error(
                    `Ошибка проверки данных пользователя или загрузки каталога загрузки корзины: ${error}`
                );
            })
            .finally(() => {
                setFetching(false);
            });
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        isLoading.state = fetching;
        // eslint-disable-next-line
    }, [fetching]);

    if (fetching) {
        return null;
    }

    return (
        <BrowserRouter>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                }}
                className="vh-100"
            >
                <NavBar />
                <AppRouter />
                <Footer />
            </div>
        </BrowserRouter>
    );
});

export default App;
