import axios from "axios";
import {UPDATE_RENTALS} from "./actionTypes";
import {clearStorage} from "../../localStorage";

export const getRentals = (token, email) => {
    return dispatch => {
        let address = 'http://localhost:8080/rentals';
        if (email) {
            address = 'http://localhost:8080/rentals/client/' + email;
        }
        axios.get(address, {headers: {'Authentication': token}})
            .then(response => {
                clearStorage();
                dispatch(updateRentals(response.data));
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const addRental = (rental, email, token) => {
    return dispatch => {
        axios.get('http://localhost:8080/users/' + email, {headers: {'Authentication': token}})
            .then(response => {
                if (!isNaN(response.data))
                rental.client.id = response.data;

                console.log(rental);
                axios.post('http://localhost:8080/rentals', rental, {headers: {'Authentication': token}})
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => console.log(error));
            })
            .catch(err => {
                console.log('could not find user id ' + err);
            })

    }
}

export const cancelRental = (id, token) => {
    return dispatch => {
        axios.delete('http://localhost:8080/rentals/' + id, {headers: {'Authentication': token}})
            .then(response => {
                console.log(response);
                //setTimeout(function() {dispatch(getRentals())}, 5000);

            })
            .catch(error => console.log(error))
    }
}

export const updateRentals = (rentals) => {
    return {
        type: UPDATE_RENTALS,
        rentals
    }
}