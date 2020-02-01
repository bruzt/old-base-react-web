import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import toastReducers from './reducers/toastReducers';
import themeReducers from './reducers/themeReducers';

const reducers = combineReducers({

    toast: toastReducers,
    theme : themeReducers

});

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export default createStore(reducers, compose(applyMiddleware(thunk), devTools));