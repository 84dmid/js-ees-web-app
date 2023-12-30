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

const App = observer(() => {
    const { user, basket, isLoading } = useContext(AppContext);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        Promise.all([userAPI.check(), basketAPI.fetchBasket()])
            .then(
                axios.spread((userData, basketData) => {
                    if (userData) {
                        user.login(userData);
                    }
                    if (basketData.basketVariants) {
                        basket.variants = basketData.basketVariants;
                    }
                })
            )
            .catch((error) =>
                console.error(
                    `Ошибка проверки данных пользователя или загрузки корзины: ${error}`
                )
            )
            .finally(() => setFetching(false));
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        isLoading.state = fetching ? true : false;
        // eslint-disable-next-line
    }, [fetching]);

    if (fetching) {
        return null;
    }

    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
        </BrowserRouter>
    );
});

export default App;
