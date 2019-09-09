import {LOGIN,REGISTER,ADD_NEW_TWEET,ALL_TWEETS,FRIEND_LIST,GET_MOD_EVENTS,ADD_NEW_EVENT,GET_MOD_FRIENDS,GET_ALL_MOD,GET_MY_MOD,GET_CURRENT_USER,EDIT_CURRENT_USER,CREATE_NEW_MOD,GET_PENDING_MOD_USER,ACCEPT_PENDING_USER,REJECT_PENDING_USER,ALL_USERS,ADD_FRIEND,REMOVE_FRIEND,TROGGLE_WORKING,ADD_BLOG,GET_LOGGED_IN_USER,GET_TWO_USERS_CHAT,SEND_USER_MESSAGE,GET_GLOBAL_MESSAGE,SEND_GLOBAL_MESSAGE} from './type.js'

const initialState={
    current_user:{},
    loggedIn_user:{},
    all_tweets:[],
    events:[],
    mod_tweets:[],
    all_friends:[],
    all_mod_events:[],
    all_mod_friends:[],
    all_mod:[],
    my_mod:{},
    all_pending_user:[],
    all_users:[],
    two_users_chat:[],
    global_messages:[]

}

export default function reducer(state=initialState,action){
    switch (action.type){
        case LOGIN:
            return{...state,
            current_user:action.payload
            }
        case REGISTER:
            return{
                ...state,
                current_user:action.payload
            }
        case ALL_TWEETS:
            return{
                ...state,
                all_tweets:action.payload
            }
        case FRIEND_LIST:
            return{
                ...state,
                all_friends:action.payload
            }
        case GET_MOD_EVENTS:
            return{
                ...state,
                all_mod_events:action.payload
            }
        case ADD_NEW_EVENT:
            return{
                ...state,
                all_mod_events:[...state.all_mod_events,action.payload]
            }
        case ADD_NEW_TWEET:
            return{
                ...state,
                all_tweets:[...state.all_tweets,action.payload]
            }
        case GET_MOD_FRIENDS:
            return{
                ...state,
                all_mod_friends:action.payload
            }
        case GET_ALL_MOD:
            return {
                ...state,
                all_mod:action.payload
            }
        case GET_MY_MOD:
            return{
                ...state,
                my_mod:action.payload
            }
        case GET_CURRENT_USER:
            return{
                ...state,
                current_user:action.payload
            }
        case EDIT_CURRENT_USER:
            return{
                ...state,
                current_user:action.payload
            }
        case CREATE_NEW_MOD:
            return{
                ...state,
                all_mod:[...state.all_mod,action.payload]
            }

        case GET_PENDING_MOD_USER:
        return{
            ...state,
            all_pending_user:action.payload

        }
        case ACCEPT_PENDING_USER:
            return{
                ...state,
                all_pending_user:action.payload
            }
        case REJECT_PENDING_USER:
            return{
                ...state,
                all_pending_user:action.payload
            }
        case ALL_USERS:
            return{
                ...state,
                all_users:action.payload
            }
        case ADD_FRIEND:
            return{
                ...state,
                all_friends:[...state.all_friends,action.payload]
            }
        case REMOVE_FRIEND:
            return{
                ...state,
                all_friends:action.payload
            }
        case TROGGLE_WORKING:
            return{
                ...state,
                current_user:action.payload
            }
        case ADD_BLOG:
            return{
                ...state,
                current_user:{
                    ...state.current_user,
                    blogs:[...state.current_user.blogs,action.payload]
                }
            }
        case GET_LOGGED_IN_USER:
            return{
                ...state,
                loggedIn_user:action.payload
            }
        case GET_TWO_USERS_CHAT:
            return{
                ...state,
                two_users_chat:action.payload
            }
        case SEND_USER_MESSAGE:
            return{
                ...state,
                two_users_chat:{
                    ...state.two_users_chat,
                    two_users_messages:[...state.two_users_chat.two_users_messages,action.payload]

                }
            }
        case GET_GLOBAL_MESSAGE:
            return{
                ...state,
                global_messages:action.payload
            }
        case SEND_GLOBAL_MESSAGE:
            return{
                ...state,
                global_messages:[...state.global_messages,action.payload]
            }
        default:
            return state
        
    }
}