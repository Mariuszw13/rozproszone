import axios from "axios";
import {UPDATE_RENTALS} from "./actionTypes";

export const getRentals = (token, email) => {
    return dispatch => {
        let address = 'http://localhost:8080/rentals';
        if (email) {
            address = 'http://localhost:8080/rentals/client/' + email;
        }
        axios.get(address, {headers: {'Authentication': token}})
            .then(response => {
                dispatch(updateRentals(response.data));
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const updateRentals = (rentals) => {
    return {
        type: UPDATE_RENTALS,
        rentals
    }
}