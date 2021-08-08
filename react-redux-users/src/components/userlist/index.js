import React from 'react';

import SearchUser from '../userlist/SearchUser';
import UserList from '../userlist/UserList';

export default class SearchUserList extends React.Component{

    render(){
        return(
            <>
              <SearchUser />
              <UserList />
            </>
        );
    }

};