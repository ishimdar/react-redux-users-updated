import axios from 'axios';
import qs from 'querystring';

import { SET_TODO_LIST, UPDATE_TODO_LIST, ADD_NEW_TODO, FILTERS_TODO_TYPE } from './actionTypes';
import { assignmentExpression } from '@babel/types';
import { async } from 'q';

export const getTodoList = (todoList) => {
    // console.log("getTodoList", todoList);
    return {
        type: SET_TODO_LIST,
        payload: {
            todoList
        }
    }
}

export const setUserId = (userId) => dispatch => {
    axios.get(`http://localhost:3004/todos?userId=${userId}`)
        .then((res) => {
            let addEditPropertyInTodo = res.data.map((item) => {
                item['isEditable'] = false;
                return item;
            });
            return dispatch(getTodoList(addEditPropertyInTodo));
        })
        .catch((error) => {
            console.log(error);
        });
}


export const getSelectedUserTodo = (todo) => {
    return {
        type: UPDATE_TODO_LIST,
        payload: {
            todo
        }
    }
}

export const setSelectedUserTodo = (selectedTodo) => dispatch => {
    let baseURL = null;
    if (selectedTodo.eventType === 'onSubmit') {
        baseURL = `sendUpdateTodoList`;
    } else {
        baseURL = `sendTodoCompleted`
    }
    axios.put(`http://localhost:3004/todos/${selectedTodo[baseURL].id}`, {
        userId: JSON.parse(selectedTodo[baseURL].userId),
        id: selectedTodo[baseURL].id,
        title: selectedTodo[baseURL].title,
        completed: JSON.parse(selectedTodo[baseURL].completed)
    })
        .then((response) => {
            console.log('response', response);
            return dispatch(getSelectedUserTodo(response.data));
        })
        .catch((error) => {
            console.log(error);
        })
}

export const getAddNewTodo = (newTodo) => {    
    return {
        type: ADD_NEW_TODO,
        payload: {
            newTodo
        }
    }
}

export const addNewTodoInUser = (addNewTodo) => dispatch => {    
    let lastTodoDetatils = {};
    axios.get(`http://localhost:3004/todos`)
        .then((res) => {            
            let todoIndex = res.data.length;            
            lastTodoDetatils = res.data[todoIndex - 1];
        })
        .then(() => {            
            axios.post(`http://localhost:3004/todos`, {
                userId: parseInt(addNewTodo.newTodoInfo.userId),
                id: parseInt(lastTodoDetatils.id)+1,
                title: addNewTodo.newTodoInfo.title,
                completed: false
            })
                .then((response) => {
                    console.log('response', response);
                    let newTodoTypeChange = {};
                    newTodoTypeChange['completed'] = JSON.parse(response.data.completed);
                    newTodoTypeChange['id'] = parseInt(response.data.id);
                    newTodoTypeChange['title'] = response.data.title
                    newTodoTypeChange['userId'] = parseInt(response.data.userId);                    
                    return dispatch(getAddNewTodo(newTodoTypeChange));
                })
                .catch((error) => {
                    console.log(error);
                })
        })
        .catch((error) => {
            console.log(error);
        });
}


export const getTodoFilterType = (filterTest, forFilterTodosList) => {    
    return {
        type: FILTERS_TODO_TYPE,
        filterTest,
        forFilterTodosList
    }
}



export const filterTodoWithType = (filterType) => dispatch => {
    // console.log('filterType', filterType);
    // let recFilterType = {};
    // recFilterType['type'] = filterType.filterType;
    // recFilterType['name'] = 'ishimdar';
    // return dispatch(getTodoFilterType(filterType.filterDetails));    
    // console.log('filterSelectedUserTodos', filterSelectedUserTodos(parseInt(filterType.userId)));
    axios.get(`http://localhost:3004/todos?userId=${parseInt(filterType.userId)}`)
        .then((res) => {
            let forFilterTodosList = res.data.map((item) => {
                item['isEditable'] = false;
                return item;
            });            
            return dispatch(getTodoFilterType(filterType, forFilterTodosList));
        })
        .catch((error) => {
            console.log(error);
        });    
    // return dispatch(getTodoFilterType(filterType));
}

// export const filterSelectedUserTodos = (userId) => {
//     console.log('userId', userId);
//     axios.get(`http://localhost:3004/todos?userId=${userId}`)
//         .then((res) => {
//             let addEditPropertyInTodo = res.data.map((item) => {
//                 item['isEditable'] = false;
//                 return item;
//             });
//             console.log('addEditPropertyInTodo', addEditPropertyInTodo);
//             return dispatch(filterSelectedUserTodos(addEditPropertyInTodo));
//         })
//         .catch((error) => {
//             console.log(error);
//         });    
// }