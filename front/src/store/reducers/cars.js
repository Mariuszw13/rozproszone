import * as actionTypes from '../actions/actionTypes';

const initialState = {
    cars: [],
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.UPDATE_CARS:
            return {
                ...state,
                cars: action.cars
            };
        default:
            return state;


    }

}

export default reducer;