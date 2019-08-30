import {LOGIN,REGISTER,ADD_NEW_TWEET,ALL_TWEETS,FRIEND_LIST,GET_MOD_EVENTS,ADD_NEW_EVENT,GET_MOD_FRIENDS} from './type.js'

const initialState={
    current_user:null,
    all_tweets:[],
    events:[],
    mod_tweets:[],
    all_friends:[],
    all_mod_events:[],
    all_mod_friends:[]

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
        default:
            return state
        
    }
}