import {SET_CURRENT_USER, SET_LOGIN_ERROR, SET_CURRENT_USER_ID} from './actionTypes';
import {updateCars} from './index'
import axios from "axios/index";

export const doLogin = (username, password) => {
    return dispatch => {
        console.log('login: '+password+' passwd: '+password);

        axios.post('http://localhost:8080/authenticateUser?username='+username+'&password='+password)
            .then(response => {
                if (response.status===200) {
                    dispatch(setCurrentUser(response.data));
                }
            }).catch(error => {
            dispatch(setLoginError(true));
            console.log(error);
        });
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
