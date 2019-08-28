import {HEADERS,API} from '../constants/constants'
import {LOGIN,REGISTER,ALL_TWEETS,FRIEND_LIST} from './type'

export const login=(login_state)=>{
    return function(dispatch){
        fetch(API+"/tokens",{
            method:"POST",
            headers:HEADERS,
            body:JSON.stringify(
                login_state
            )
        })
        .then(resp=>resp.json())
        .then(data=>{
            console.log(data)
            localStorage.token=data.token
            localStorage.current_user=data.user_id
            localStorage.clicked_user=data.user_id
            dispatch({"type":LOGIN,payload:data})})
    }
}

export const register=(register_state)=>{
    return function(dispatch){
        fetch(API+"/users",{
            method:"POST",
            headers:HEADERS,
            body:JSON.stringify(
                register_state
            )
        })
        .then(resp=>resp.json())
        .then(data=>dispatch({"type":REGISTER,payload:data}))
    }
}


export const allTweets=()=>{
    return function(dispatch){
        fetch(API+"/tweets")
        .then(resp=>resp.json())
        .then(data=>dispatch({"type":ALL_TWEETS,payload:data}))
    }
}

export const getAllFriends=()=>{
    return function(dispatch){
        fetch(API+`/follows/${localStorage.clicked_user}`)
        .then(resp=>resp.json())
        .then(data=>dispatch({"type":FRIEND_LIST,payload:data}))
    }
}

// export const getModEvents=()=>{
//     return function(dispatch){
//         fetch(API+`/createEvent/${localStorage.user_id}/${localStorage.mod_id}`)
//         .then(resp=>resp.json())
//         .then(data=>dispatch({"type":FRIEND_LIST,payload:data}))
//     }
// }