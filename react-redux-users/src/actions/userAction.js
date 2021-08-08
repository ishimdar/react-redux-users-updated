import axios from 'axios';
import qs from 'querystring';

import { SET_USER_LIST, SAVE_USER_INFO } from './actionTypes';

export const updateUserList = (userList) => {
    return {
        type: SET_USER_LIST,
        payload: {
            userList
        }
    }
}

export const setUserList = () => dispatch => {
    axios.get(`http://localhost:3004/users`)
        .then((res) => {
            return dispatch(updateUserList(res.data));
        })
        .catch((error) => {
            console.log(error);
        });
}


export const saveUserInfo = (userInformation) => {    
    return {
        type: SAVE_USER_INFO,
        payload: {
            userInformation
        }
    }
}

export const setUserInfo = (userInfo) => dispatch => {    
    console.log("setUserInfo", userInfo);
    axios.post(`http://localhost:3004/users`, qs.stringify({
        id: userInfo.id,
        address: userInfo.address,
        company: userInfo.company,
        email: userInfo.email,
        name: userInfo.name,
        phone: userInfo.phone,
        userName: userInfo.userName,
        website: userInfo.website
    }))
        .then((response) => {
            console.log('response', response);
            return dispatch(saveUserInfo(response.data));
        })
        .catch((error) => {
            console.log(error);
        })
}