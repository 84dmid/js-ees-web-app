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

const App = observer(() => {
    const { user, basket, isLoading, catalog } = useContext(AppContext);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        Promise.all([userAPI.check(), basketAPI.fetchBasket()])
            .then(
                axios.spread((userData, basketData) => {
                    if (userData) {
                        user.login(userData);
                    }
                    basket.isObjectTypeLine = basketData.isObjectTypeLine;
                    basket.lendAreaInSqM = basketData.lendAreaInSqM;
                    basket.trackWidthInM = basketData.trackWidthInM;
                    basket.trackLengthInM = basketData.trackLengthInM;
                    basket.testingSitesNumberPerFiveHa =
                        basketData.testingSitesNumberPerFiveHa;
                    basket.variants = basketData.basketVariants;
                })
            )
            .catch((error) =>
                console.error(
                    `Ошибка проверки данных пользователя или загрузки корзины: ${error}`
                )
            )
            .then(() => {
                return fetchCatalog({
                    categoryIds: catalog.checkedCategories,
                    subcategoryIds: catalog.checkedSubcategories,
                    objectTypeIds: catalog.checkedObjectTypes,
                    surveyIds: catalog.surveyFilter,
                    variantIds: catalog.variantFilter,
                    isObjectTypeLine: basket.isObjectTypeLine,
                });
            })
            .then((data) => (catalog.content = data))
            .finally(() => setFetching(false));
        // eslint-disable-next-line
    }, [
        catalog.checkedCategories,
        catalog.checkedSubcategories,
        catalog.checkedObjectTypes,
        catalog.surveyFilter,
        catalog.variantFilter,
        basket.isObjectTypeLine,
    ]);

    useEffect(() => {
        isLoading.state = fetching;
        // eslint-disable-next-line
    }, [fetching]);

    if (fetching) {
        return null;
    }

    return (
        <BrowserRouter>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <NavBar />
                <AppRouter />
                <Footer />
            </div>
        </BrowserRouter>
    );
});

export default App;
