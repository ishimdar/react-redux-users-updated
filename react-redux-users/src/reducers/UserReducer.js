import { SET_USER_LIST, SELECTED_USER, SAVE_USER_INFO } from '../actions/actionTypes';

const initialState = {
    userList: null,
};

const userReducer = (state = initialState, action) => {    
    switch (action.type) {
        case SET_USER_LIST:
            return {
                ...state,
                userList: [...action.payload.userList]
            }

        case SELECTED_USER:
            return{
                ...state,
                userList: [...action.selectedUser]
            }
        
        case SAVE_USER_INFO:
            return {
                ...state,
                userList: state.userList.concat(action.payload.userInformation)
            }


        default:
            return state;
    }
}

export default userReducer;




