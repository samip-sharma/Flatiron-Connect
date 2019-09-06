import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {BrowserRouter} from 'react-router-dom'
import {createStore, applyMiddleware, compose } from 'redux'
import reducer from './redux/reducer';

let initialState={
    current_user:{},
    tweets:[],
    events:[],
    mod_tweets:[],
    all_tweets:[],
    all_friends:[],
    all_mod_events:[],
    all_mod_friends:[],
    all_mod:[],
    my_mod:{},
    all_pending_user:[],
    all_users:[],
    loggedIn_user:{},
    two_users_chat:[]
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
