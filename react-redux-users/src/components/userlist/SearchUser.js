import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SELECTED_USER } from '../../actions/actionTypes';
import NoRecardFound from './noRecardFound';
import CreateAccount from '../createAccount/index';
// import { stat } from 'fs';

class SearchUser extends Component {

  state = {
    selectValue: undefined,
    searchValue: '',
    isEmailEmpty: false,
    isClickCreateAccount : false
  }

  onClickCreateAccount = (e) => {
    this.setState({
      isClickCreateAccount : true
    });
  }


  onChangeUserSearch = (e) => {
    this.setState({
      searchValue: e.target.value
    });
    if (this.state.searchValue.length === 0) {
      this.setState({
        isEmailEmpty: true
      });
    } else {
      this.setState({
        isEmailEmpty: false
      });
    }
  }


  onClickSearchUser = (e) => {
    e.preventDefault();

    if (this.state.searchValue.length === 0) {
      this.setState({
        isEmailEmpty: true
      });
    }

    let selectedUser = this.props.users.filter((item) => {
      return item.email === this.state.searchValue;
    });

    console.log('selectedUser', selectedUser);

    this.props.dispatch({
      type: SELECTED_USER,
      selectedUser
    });
  }

  render() {    
    

    let searchUser = <form onSubmit={(e) => this.onClickSearchUser(e)}>
      <div className="form-group">
        <label>Search User</label>
        <input type="text" className="form-control" value={this.state.searchValue} onChange={(e) => this.onChangeUserSearch(e)} />
        {
          this.state.isEmailEmpty ? <small className="form-text error">Please enter email</small> : ''
        }
      </div>
      <div className="form-group text-center">
        <input type="button" className="btn btn-secondary" value="Create Account" onClick = { (e) => this.onClickCreateAccount(e)} />
        <input type="submit" className="btn btn-primary" value="Search User" />        
      </div>
    </form>;
    
    let renderOutPut = undefined;
    if(this.props.users !== null){
      renderOutPut = searchUser;
      if(this.props.users.length === 0){
        renderOutPut = <NoRecardFound />;
      }
    }
    if(this.state.isClickCreateAccount){
      renderOutPut = <CreateAccount />;
    }

    return (
      <>
        {renderOutPut}        
      </>
    );
  }

};

const mapStateToProps = (state) => {
  return {
    users: state.userReducer.userList
  }
};

export default connect(mapStateToProps)(SearchUser);