import {LOGIN,REGISTER,ALL_TWEETS,FRIEND_LIST} from './type.js'

const initialState={
    current_user:null,
    all_tweets:[],
    events:[],
    mod_tweets:[],
    all_friends:[]

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
        default:
            return state
        
    }
}