import {SET_CURRENT_USER, SET_LOGIN_ERROR, SET_CURRENT_USER_ID} from './actionTypes';
import {updateCars} from './index'
import axios from "axios/index";

export const doLogin = (email, password, onLoginSuccess, onLoginFail) => {
    return dispatch => {
        const address = 'http://localhost:8080/authenticateUser?username='+email+'&password='+password;
        console.log(address);
        axios.post(address)
            .then(response => {
                if (response.status===200 && response.data.hasOwnProperty('jws')) {
                    const currentUser = {
                        email: response.data.username,
                        token: response.data.jws,
                        role: response.data.roles[0].authority
                    };
                    dispatch(setCurrentUser(currentUser));
                    onLoginSuccess('/cars');
                } else {
                    onLoginFail();
                }
            })
            .catch(error => {
                onLoginFail(error);
            });
    }
}

export const doLogout = (token) => {
    return dispatch => {
        axios.post('http://localhost:8080/logout', null, {headers: {'Authentication': token}})
            .then(response => {
                console.log(response)
                dispatch(setCurrentUser(null));
            })
            .catch(error => console.log(error));
    }
}

export const clearStores = () => {
    return dispatch => {
        dispatch(updateCars([]));
    }
}


export const setCurrentUser = (currUser) => {
    clearStores();
    return {
        type: SET_CURRENT_USER,
        user: currUser
    }
}

export const setCurrentUserId = (id) => {
    return {
        type: SET_CURRENT_USER_ID,
        id: id
    }
}

export const setLoginError = (status) => {
    return {
        type: SET_LOGIN_ERROR,
        status: status
    }
}
