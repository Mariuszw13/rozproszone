import * as actionTypes from '../actions/actionTypes';

const initialState = {
    users: [],
    currentUser: null,
    currentUserId: null,
    loginError: false
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.user
            };
        case actionTypes.SET_LOGIN_ERROR:
            return {
                ...state,
                loginError: action.status
            };
        case actionTypes.SET_CURRENT_USER_ID:
            return {
                ...state,
                currentUserId: action.id
            };
        default:
            return state;
    }

}

export default reducer;