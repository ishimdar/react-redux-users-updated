import React, { Component } from 'react';
// import { Link, Router, Route } from 'react-router-dom'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { connect } from 'react-redux';

import UserTodoList from '../userTodo/index';

class UserList extends Component {

    // getUserId = (getItem) => {
    //     alert('hiii');
    //     console.log('getItem', getItem);
    // }
    
    render() {
        // console.log('this.props.location', this.props);
        let userName = undefined;
        if (this.props.users !== null) {
            userName = this.props.users.map((item) => {
                return (
                    <li key={item.id} id={item.id} className="list-group-item">
                        <Link to={`/user/${item.id}`}>{item.name}</Link>
                    </li>
                );
            });
        }

        return (
            <Router>
                <div className="row">
                    <div className="col-5">
                        <ul className="list-group">
                            {
                                userName
                            }
                        </ul>
                    </div>
                    <div className="col-7">
                        <Route path="/:id" component={UserTodoList} />
                    </div>
                    <div className="clearfix"></div>
                </div>                                
            </Router>
        );
    }

};

const mapStateToProps = (state) => {
    return {
        users: state.userReducer.userList
    }
};

export default connect(mapStateToProps)(UserList);