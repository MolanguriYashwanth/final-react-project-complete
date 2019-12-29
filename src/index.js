import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware, compose,combineReducers } from 'redux';
import burgerReducer from "./store/reducers/burgerBuilder";
import orderReducer from "./store/reducers/order";
import authReducer from "./store/reducers/auth";
import thunk from "redux-thunk";
import {watchAuth} from './store/sagas/index';

console.log(process.env.NODE_ENV);
const sagaMiddleware = createSagaMiddleware()

const composeEnhancers =
    typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;
        

const enhancer = composeEnhancers(
    applyMiddleware(thunk,sagaMiddleware),
    // other store enhancers if any
);
const reducer = combineReducers({
    burger:burgerReducer,
    order:orderReducer,
    auth:authReducer
})
const store = createStore(
    reducer,
    enhancer
);
sagaMiddleware.run(watchAuth)

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)
ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
