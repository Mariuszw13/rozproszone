import * as actionTypes from '../actions/actionTypes';

const initialState = {
    rentals: [],
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.UPDATE_RENTALS:
            return {
                ...state,
                rentals: action.rentals
            };
        default:
            return state;


    }

}

export default reducer;