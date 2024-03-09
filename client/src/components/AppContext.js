import React, { createContext } from 'react';
import UserStore from '../store/UserStore.js';
import CatalogStore from '../store/CatalogStore.js';
import IsLoadingStore from '../store/IsLoadingStore.js';
import BasketStore from '../store/BasketStore.js';
import CatalogEditorStore from '../store/CatalogEditorStore.js';
import EESCalculatorStore from '../store/EESCalculatorStore.js';

const context = {
    user: new UserStore(),
    isLoading: new IsLoadingStore(),
    catalog: new CatalogStore(),
    basket: new BasketStore(),
    catalogEditor: new CatalogEditorStore(),
    EESCalculator: new EESCalculatorStore(),
};

const AppContext = createContext();

const AppContextProvider = (props) => {
    return <AppContext.Provider value={context}>{props.children}</AppContext.Provider>;
};

export { AppContext, AppContextProvider };
