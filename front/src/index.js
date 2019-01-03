import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import usersReducer from './store/reducers/users';
import carsReducer from './store/reducers/cars';
import rentalsReducer from './store/reducers/rentals';
import thunk from 'redux-thunk';
import {applyMiddleware, combineReducers, createStore} from "redux";
import Provider from "react-redux/es/components/Provider";
import {loadState, saveState} from "./localStorage";

const persistedState = loadState();

const rootReducer = combineReducers({
    cars: carsReducer,
    users: usersReducer,
    rentals: rentalsReducer

});

const store = createStore(rootReducer, persistedState, applyMiddleware(thunk));

store.subscribe(() => {
    saveState(store.getState());
})

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
