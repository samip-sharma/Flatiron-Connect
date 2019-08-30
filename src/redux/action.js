import {HEADERS,API} from '../constants/constants'
import {LOGIN,REGISTER,ALL_TWEETS,FRIEND_LIST,GET_MOD_EVENTS,ADD_NEW_EVENT,ADD_NEW_TWEET} from './type'

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
            if(!data.error){
                localStorage.token=data.token
            localStorage.current_user=data.user_id
            localStorage.clicked_user=data.user_id
            localStorage.mod_id=data.mod_id
            dispatch({"type":LOGIN,payload:data})
            }
            })
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
        .then(data=>{
            if(!data.error){dispatch({"type":REGISTER,payload:data})}
            })
    }
}


export const allTweets=()=>{
    return function(dispatch){
        fetch(API+"/tweets")
        .then(resp=>resp.json())
        .then(data=>{if(!data.error){
            if(!data.error){
                dispatch({"type":ALL_TWEETS,payload:data})
            }
        }})
    }
}

export const getAllFriends=()=>{
    return function(dispatch){
        fetch(API+`/follows/${localStorage.clicked_user}`)
        .then(resp=>resp.json())
        .then(data=>{
            if(!data.error){
                dispatch({"type":FRIEND_LIST,payload:data})
            }
        })
    }
}

export const getModEvents=()=>{
    return function(dispatch){
        fetch(API+`/mod_events/${localStorage.mod_id}`)
        .then(resp=>resp.json())
        .then(data=>{
            if(!data.error){
                dispatch({"type":GET_MOD_EVENTS,payload:data})
            }
        })
    }
}

export const addNewEvent=(state)=>{
    return function(dispatch){
        fetch(API+"/mod_events",{
            method:"POST",
            headers:{
              ...HEADERS,
              "Authorization":localStorage.token
            },
            body:JSON.stringify(
              {...state,
              mod_id:localStorage.mod_id,
              user_id:localStorage.current_user}
            )
          })
          .then(resp=>resp.json())
          .then(data=>{
            if(!data.error){
                dispatch({"type":ADD_NEW_EVENT,payload:data})
            }
        })
    }
}


export const addNewTweet=(state)=>{
    return function(dispatch){
        fetch(API+"/tweets",{
            method:"POST",
            headers:{
              ...HEADERS,
              "Authorization":localStorage.token
            },
            body:JSON.stringify(
              {...state,
              user_id:localStorage.current_user}
            )
          })
          .then(resp =>resp.json())
          .then(data=>{
              console.log(data)
            if(!data.error){
                dispatch({"type":ADD_NEW_TWEET,payload:data})
            }
        })
    }
}


    export const getModFriends=()=>{
        return function(dispatch){
            // fetch(API+"mod")
        }
    }