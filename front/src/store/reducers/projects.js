import * as actionTypes from '../actions/actionTypes';

const initialState = {
    projects: [],
    tasks: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.UPDATE_PROJECTS:
            return {
                ...state,
                projects: action.projects
            };
        case actionTypes.UPDATE_TASKS:
            return {
                ...state,
                tasks: action.tasks
            };
        default:
            return state;


    }

}

export default reducer;