import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { SAVE_USER_INFO } from '../../actions/actionTypes';

import {setUserInfo} from '../../actions/userAction';

class CreateAccount extends Component{

    state = {
        userInfo: {
            id: this.props.users.length+1,
            name: '',
            userName: '',
            email: '',            
            address: 'Azamgarh',
            phone: '',
            website: 'www.google.com',
            company: 'faGift.com'
        }
    }

    name = React.createRef();
    username = React.createRef();
    email = React.createRef();
    phone = React.createRef();


    onChangeUserDetails = (e) => {
        let userInformation = this.state.userInfo;
        userInformation[e.target.name] = e.target.value;
        this.setState({
            userInfo: userInformation
        });
    }

    onSubmitUserInfo = (e) => {     
        e.preventDefault();
        console.log('Before Submit', this.props.users.length);
        let userInformation = this.state.userInfo;
        let isValidationTrue = userInformation.name !== '' && userInformation.userName !== '' && userInformation.email !== '' && userInformation.phone !== '';        
        if(isValidationTrue){            
            this.props.storeUserInformation(userInformation); 
            // console.log('After Submit', this.props.users.length);
            // this.onChangeUserDetails(e);            
        }else{
            alert('Please fill the all details...');
        }
        // console.log('this.userInfo', this.state.userInfo);
        // console.log('this.props.users', this.props.users.length);
    }

    componentWillReceiveProps (nextProps) {        
        console.log('this.props.users', this.props.users);
        console.log('recive_peops_value', nextProps);
        if(nextProps.users.length !==this.props.users.length){
            console.log('Length not same');
            let userInformation = this.state.userInfo;
            userInformation.id = this.props.users.length+1;
            userInformation.name = '';
            userInformation.userName= '';
            userInformation.email= '';            
            userInformation.address= 'Azamgarh';
            userInformation.phone= '';
            userInformation.website= 'www.google.com';
            userInformation.company= 'faGift.com';

            this.setState({
                userInfo: userInformation
            });
        }
    }

    render(){
        return(
            <form onSubmit={(e) => this.onSubmitUserInfo(e)}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" className="form-control" ref={this.name} onChange={(e) => this.onChangeUserDetails(e)} />
                </div>
                <div className="form-group">
                    <label>UserName</label>
                    <input type="text" name="userName" className="form-control" ref={this.username} onChange={(e) => this.onChangeUserDetails(e)} />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" ref={this.email} onChange={(e) => this.onChangeUserDetails(e)} />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input type="text" name="phone" className="form-control" ref={this.phone} onChange={(e) => this.onChangeUserDetails(e)} />
                </div>

                <div className="form-group text-center">                    
                    <input type="submit" className="btn btn-primary" value="Save" />
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      users: state.userReducer.userList
    }
};

const mapDispatchToProps = dispatch => {
    return {
        storeUserInformation : (info) => dispatch(setUserInfo(info))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);