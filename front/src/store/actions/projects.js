import {UPDATE_PROJECTS, UPDATE_TASKS} from './actionTypes';
import axios from 'axios';

export const getProjects = (token) => {
    return dispatch => {
        //console.log(token);

        axios.get('http://localhost:8080/projects', {headers: {'Authentication': token}})
            .then(response => {
                //response.json();
                dispatch(updateProjects(response.data));
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const getTasks = (token) => {
    return dispatch => {
        axios.get('http://localhost:8080/tasks', {headers: {'Authentication': token}})
            .then(response => {
                //response.json();
                dispatch(updateTasks(response.data));
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const updateProjects = (newProjects) => {
    return {
        type: UPDATE_PROJECTS,
        projects: newProjects

    };
}

export const updateTasks = (newTasks) => {
    return {
        type: UPDATE_TASKS,
        tasks: newTasks
    };
}