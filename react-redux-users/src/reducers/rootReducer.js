import {combineReducers} from 'redux';
import userReducer from './UserReducer';
import todoReducer from './TodoReducer';

const rootReducer = combineReducers({
    userReducer,
    todoReducer
});

export default rootReducer;