import React, { Component } from 'react';
import axios from 'axios';
import qs from 'querystring';

import { connect } from 'react-redux';
import { SET_TODO_LIST, UPDATE_TODO_LIST, ADD_NEW_TODO, FILTERS_TODO_TYPE } from '../../actions/actionTypes';
import { setUserId, setSelectedUserTodo, addNewTodoInUser, filterTodoWithType } from '../../actions/TodoAction';

class UserTodo extends Component {

    state = {
        isEditable: true,
        todoText: '',
        isAddNewTodoForm: false,
        newTodoValue: '',
        allTodosList: undefined
    }


    componentDidMount() {
        // let sendUserId = this.props.location.pathname.split('/');
        // sendUserId = sendUserId[sendUserId.length - 1];
        // this.props.storeUserTodoInformation(sendUserId);
        this.props.storeUserTodoInformation(this._getUserId());        
    }
    

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            let sendUserId = nextProps.location.pathname.split('/');
            sendUserId = sendUserId[sendUserId.length - 1];
            this.props.storeUserTodoInformation(sendUserId);            
        }        
    }

    _getUserId = () => {
        let sendUserId = this.props.location.pathname.split('/');
        sendUserId = sendUserId[sendUserId.length - 1];
        return sendUserId;
    }


    editTodoItem = (getSelectedTodoDetails) => {
        getSelectedTodoDetails.isEditable = true;

        this.setState({
            isEditable: true,
            todoText: getSelectedTodoDetails.title
        });
    };

    onChangeTodo = (e) => {
        this.setState({
            todoText: e.target.value
        });
    }

    onSubmitUpdateTodo = (e, todoList) => {
        e.preventDefault();
        let sendUpdateTodoList = todoList;
        sendUpdateTodoList.title = this.state.todoText;
        sendUpdateTodoList.isEditable = false;

        this.props.storeSelectedTodoInformation({
            type: UPDATE_TODO_LIST,
            sendUpdateTodoList,
            eventType: 'onSubmit'
        });
    }

    onChangeComplet = (e, getItem) => {
        console.log('getItem', getItem);
        e.preventDefault();
        let sendTodoCompleted = getItem;
        sendTodoCompleted.completed = true;
        this.props.storeSelectedTodoInformation({
            type: UPDATE_TODO_LIST,
            sendTodoCompleted,
            eventType: 'onCheckbox'
        });
    }

    onSubmitOpenNewTodoBox = (e) => {
        e.preventDefault();
        // alert('Hello I am Open');
        this.setState({
            isAddNewTodoForm: true
        });
    }

    onChangeWriteNewTodo = (e) => {
        this.setState({
            newTodoValue: e.target.value
        });
    }

    onSubmitAddNewTodo = (e) => {
        e.preventDefault();
        // console.log('this.state.newTodoValue', this.state.newTodoValue);
        // console.log('this._getUserId()', this._getUserId());
        let newTodoInfo = {
            title: this.state.newTodoValue,
            userId: this._getUserId()
        }
        this.props.storeAddNewTodoInformation({
            type: ADD_NEW_TODO,
            newTodoInfo
        });

        this.setState({
            newTodoValue: ''
        });
    }

    onClickCloseAddTodoForm = (e) => {
        e.preventDefault();
        this.setState({
            isAddNewTodoForm: false
        });
    }

    /*------------ Filter todo with type ------------*/
    onClickTodoFilter = (e, filterType) => {                
        // filterDetails['send_type'] = filterType;
        this.props.storeFilterTodoWithType({
            type: FILTERS_TODO_TYPE,
            filterType: filterType,
            userId: this._getUserId()
        });

        // switch (filterType){
        //     case 'all':
        //         console.log('all');
        //         this.props.storeFilterTodoWithType({
        //             type: FILTERS_TODO_TYPE,
        //             filterType
        //         });
        //         break;

        //     case 'completed':
        //         console.log('completed');
        //         this.props.storeFilterTodoWithType({
        //             type: FILTERS_TODO_TYPE,
        //             filterType
        //         });
        //         break;
            
        //     default:
        //         console.log('pending');
                // this.props.storeFilterTodoWithType({
                //     type: FILTERS_TODO_TYPE,
                //     filterType
                // });
        // }
    }
    /*------------ Filter todo with type end ------------*/
    

    // startLootItems = (resGet) =>{        
    //     console.log('resGet', resGet.data);
    //     if(resGet.data !== null){            
    //         let myData = resGet.data;            
    //         console.log(Object.keys(myData));
    //         let objValue = Object.keys(myData).map( (item) => {                
    //             return myData[item];
    //         })
    //         console.log('objValue', objValue);


    //     }        
    // }


    render() {        
        // console.log('this.props.todoList1', this.props.todosList);        

        let selectedUserTodoList = undefined;
        if (this.props.todosList !== null) {            
            selectedUserTodoList = this.props.todosList.map((item) => {
                if (item.completed) {
                    return (
                        <li key={item.id} className="list-group-item list-group-item-primary d-flex justify-content-between align-items-center">
                            <label>{item.title}</label>
                        </li>
                    );
                } else {
                    return (
                        item.isEditable ?
                            <li key={item.id} className="list-group-item add_background">
                                <form className="text-center" onSubmit={(e) => this.onSubmitUpdateTodo(e, item)}>
                                    <input onChange={(e) => this.onChangeTodo(e, item.title)} value={this.state.todoText} type="text" className="form-control" />
                                    <input type="submit" className="btn btn-primary" value="Save"></input>
                                </form>
                            </li>
                            :
                            <li key={item.id} className="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center">
                                <input type="checkbox" onChange={(e) => this.onChangeComplet(e, item)} />
                                <label>{item.title}</label>
                                <span onClick={() => this.editTodoItem(item)} className="badge badge-primary badge-pill">edit</span>
                            </li>
                    );
                }
            });
        }

        let addNewTodoEvent = <form onSubmit={(e) => this.onSubmitOpenNewTodoBox(e)}>
            <div className="form-group text-right">
                <input type="submit" className="btn btn-primary" value="Add New Todo"></input>
            </div>
        </form>;

        let addNewTodoForm = <form onSubmit={(e) => this.onSubmitAddNewTodo(e)}>
            <div className="form-group">
                <input type="text" value={this.state.newTodoValue} onChange={(e) => this.onChangeWriteNewTodo(e)} className="form-control" placeholder="Write Your Todo..." />
                {/* <input type="text" value='hello' className="form-control" placeholder="Write Your Todo..." /> */}
            </div>
            <div className="form-group text-right">
                <input type="button" onClick={(e) => this.onClickCloseAddTodoForm(e)} className="btn btn-secondary" value="Cancel"></input>
                <input type="submit" className="btn btn-primary" value="Save New Todo"></input>
            </div>
        </form>;

        let newTodoBoxDom = this.state.isAddNewTodoForm ? addNewTodoForm : addNewTodoEvent;



        return (
            <div>
                <h2>Hello</h2>
                <div className="add_new_todo text-center">
                    {newTodoBoxDom}
                    <br />
                </div>
                <div className="filter_todo_with_type">
                    <ul className="list-group list-group-horizontal">
                        <li onClick={(e) => this.onClickTodoFilter(e, 'all')} className="list-group-item list-group-item-secondary">
                            <span>All</span>
                        </li>
                        <li onClick={(e) => this.onClickTodoFilter(e, 'completed')} className="list-group-item list-group-item-secondary">
                            <span>Completed</span>
                        </li>
                        <li onClick={(e) => this.onClickTodoFilter(e, 'pending')} className="list-group-item list-group-item-secondary">
                            <span>Pending</span>
                        </li>
                    </ul>                    
                </div>
                <ul className="list-group list-group-flush">
                    {selectedUserTodoList}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todosList: state.todoReducer.todoList
    }
};

const mapDispatchToProps = dispatch => {
    return {
        storeUserTodoInformation: (info) => dispatch(setUserId(info)),
        storeSelectedTodoInformation: (info) => dispatch(setSelectedUserTodo(info)),
        storeAddNewTodoInformation: (info) => dispatch(addNewTodoInUser(info)),
        storeFilterTodoWithType: (info) => dispatch(filterTodoWithType(info)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTodo);