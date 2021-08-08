import { SET_TODO_LIST, UPDATE_TODO_LIST, ADD_NEW_TODO, FILTERS_TODO_TYPE } from '../actions/actionTypes';
import { async } from 'q';
import { stat } from 'fs';

const intialState = {
    todoList: null,
}

const todoReducer = (state = intialState, action) => {    
    switch (action.type) {
        case SET_TODO_LIST:
            return {
                ...state,
                todoList: action.payload.todoList
            }

        case UPDATE_TODO_LIST:
            return {
                ...state,
                todoList: state.todoList.map((todo, index) => {
                    if (todo.id === action.payload.todo.id) {
                        todo['completed'] = JSON.parse(action.payload.todo.completed);
                        todo['id'] = action.payload.todo.id;
                        todo['isEditable'] = false;
                        todo['title'] = action.payload.todo.title;
                        todo['userId'] = parseInt(action.payload.todo.userId);
                        return todo;
                    }
                    return todo;
                })
            }

        case ADD_NEW_TODO:            
            return{
                ...state,
                todoList: state.todoList.concat(action.payload.newTodo)
            }
        
        case FILTERS_TODO_TYPE:                        
            // let filterTodos = state.todoList;
            let filterTodos = action.forFilterTodosList;
            let filterFunctionTodos = Array.from(state.todoList);
            
            // console.log('filterFunctionTodos', filterFunctionTodos);            

            if(action.filterTest.filterType === "pending"){
                filterTodos = filterTodos.filter((item) => {
                    return item.completed === false;
                })
            }else if(action.filterTest.filterType === "completed"){
                filterTodos = filterTodos.filter((item) => {
                    return item.completed === true;
                })
            }else{
                filterTodos = filterTodos;
            }
                        
            return{                
                todoList: filterTodos
            }

        default:
            return state;
    }
}

export default todoReducer;