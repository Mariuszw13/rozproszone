import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import usersReducer from './store/reducers/users';
import projectsReducer from './store/reducers/projects';
import thunk from 'redux-thunk';
import {applyMiddleware, combineReducers, createStore} from "redux";
import Provider from "react-redux/es/components/Provider";

const rootReducer = combineReducers({
    projects: projectsReducer,
    users: usersReducer

});

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
