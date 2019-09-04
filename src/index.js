import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import Reducer from './redux/reducer'
import thunk from 'redux-thunk'
import {BrowserRouter} from 'react-router-dom'
import {createStore, applyMiddleware, compose } from 'redux'

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
    loggedIn_user:{}
}

const middleware=[thunk]

const store = createStore(
    Reducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );

ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
