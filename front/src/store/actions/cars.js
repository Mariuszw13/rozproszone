import {UPDATE_CARS} from './actionTypes';
import axios from 'axios';

export const getCars = (token) => {
    return dispatch => {
        axios.get('http://localhost:8080/car', {headers: {'Authentication': token}})
            .then(response => {
                dispatch(updateCars(response.data));
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const addCar = (car, token) => {
    return dispatch => {
        axios.post('http://localhost:8080/car', car, {headers: {'Authentication': token}})
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export const updateCars = (cars) => {
    return {
        type: UPDATE_CARS,
        cars

    };
}