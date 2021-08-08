import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

// import UserReduce from './reducers/UserReducer';

import rootReducer from './reducers/rootReducer';

// Actions
import { setUserList } from './actions/userAction';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

// const store = createStore(UserReduce);

ReactDOM.render( <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>        
    </Provider>,
    document.getElementById('root'));

// store.dispatch({ type: 'GET_USER_DATA' });
store.dispatch(setUserList());
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
