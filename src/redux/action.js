import {HEADERS,API} from '../constants/constants'
import {LOGIN,REGISTER,ALL_TWEETS,FRIEND_LIST,GET_MOD_EVENTS,ADD_NEW_EVENT,ADD_NEW_TWEET,GET_MOD_FRIENDS,GET_ALL_MOD,GET_MY_MOD,GET_CURRENT_USER,EDIT_CURRENT_USER,CREATE_NEW_MOD,GET_PENDING_MOD_USER,ACCEPT_PENDING_USER,REJECT_PENDING_USER,ALL_USERS,ADD_FRIEND,REMOVE_FRIEND,TROGGLE_WORKING,ADD_BLOG,GET_LOGGED_IN_USER,GET_TWO_USERS_CHAT,SEND_USER_MESSAGE,GET_GLOBAL_MESSAGE,SEND_GLOBAL_MESSAGE} from './type'

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
            if(data.token){
            localStorage.token=data.token
            document.cookie=`${localStorage.token}`
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
        fetch(API+`/follows/${localStorage.current_user}`)
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
        fetch(API+`/user_mods/${localStorage.mod_id}`)
        .then(resp=>resp.json())
        .then(data=>{
            if(!data.error){
                dispatch({"type":GET_MOD_FRIENDS,payload:data})
            }
        })
    }
}



export const getAllMod=()=>{
    return function(dispatch){
        fetch(API+`/mods`)
        .then(resp=>resp.json())
        .then(data=>{
            if(!data.error){
                dispatch({"type":GET_ALL_MOD,payload:data})
            }
        })
    }
}



export const getMyMod=()=>{
    return function(dispatch){
        fetch(API+`/mods/${localStorage.mod_id}`)
        .then(resp=>resp.json())
        .then(data=>{
            if(!data.error){
                dispatch({"type":GET_MY_MOD,payload:data})
            }
        })
    }
}


export const getCurrentUser=()=>{
    return function(dispatch){
        fetch(API+`/users/${localStorage.clicked_user}`)
        .then(resp=>resp.json())
        .then(data=>{
            // debugger
            if(!data.error){
                dispatch({"type":GET_CURRENT_USER,payload:data})
            }
        })
    }
}



export const getLoggedInUser=()=>{
    return function(dispatch){
        fetch(API+`/users/${localStorage.current_user}`)
        .then(resp=>resp.json())
        .then(data=>{
            if(!data.error){
                dispatch({"type":GET_LOGGED_IN_USER,payload:data})
            }
        })
    }
}



export const editCurrentUser=(state)=>{
    return function(dispatch){
        fetch(API+`/users/${localStorage.loggedIn_user}`,{
            method:"PATCH",
            "headers":HEADERS,
            body:JSON.stringify(
                state
            )
        })
        .then(resp=>resp.json())
        .then(data=>{
            if(!data.error){
                // debugger
                localStorage.mod_id=state.mod_id
                dispatch({"type":EDIT_CURRENT_USER,payload:data})
            }
        })
    }
}




export const createNewMod=(state)=>{
    return function(dispatch){
        fetch(API+"/mods",{
            method:"POST",
            headers:{
              ...HEADERS,
              "Authorization":localStorage.token
            },
            body:JSON.stringify(
              {...state}
            )
          })
          .then(resp =>resp.json())
          .then(data=>{
            //   console.log(data)
            if(!data.error){
                dispatch({"type":CREATE_NEW_MOD,payload:data})
            }
        })
    }
}




export const getPendingModUser=()=>{
    return function(dispatch){
        fetch(API+`/pendingModUser`)
        .then(resp=>resp.json())
        .then(data=>{
            if(!data.error){
                // debugger
                dispatch({"type":GET_PENDING_MOD_USER,payload:data})
            }
        })
    }
}


export const acceptModUser=(body)=>{
    return function(dispatch){
        fetch(API+"/acceptModUser",{
            method:"POST",
            headers:{
              ...HEADERS,
              "Authorization":localStorage.token
            },
            body:JSON.stringify(
              {...body}
            )
          })
          .then(resp =>resp.json())
          .then(data=>{
            //   console.log(data)
            if(!data.error){
                dispatch({"type":ACCEPT_PENDING_USER,payload:data})
            }
        })
    }
}



export const rejectModUser=(body)=>{
    return function(dispatch){
        fetch(API+"/rejectModUser",{
            method:"POST",
            headers:{
              ...HEADERS,
              "Authorization":localStorage.token
            },
            body:JSON.stringify(
              {...body}
            )
          })
          .then(resp =>resp.json())
          .then(data=>{
            //   console.log(data)
            if(!data.error){
                dispatch({"type":REJECT_PENDING_USER,payload:data})
            }
        })
    }
}


export const getAllUsers=()=>{
    return function(dispatch){
        fetch(API+"/users")
        .then(resp=>resp.json())
        .then(data=>{
            if(!data.error){dispatch({"type":ALL_USERS,payload:data})}
            })
    }
}


export const addFriend=(following_id,being_followed_id)=>{
    return function(dispatch){
        fetch(API+"/createFollows",{
            method:"POST",
            headers:{
              ...HEADERS,
              "Authorization":localStorage.token
            },
            body:JSON.stringify(
              {following:following_id,
            
            being_followed:being_followed_id}
            )
          })
          .then(resp =>resp.json())
          .then(data=>{
            //   console.log(data)
            if(!data.error){
                dispatch({"type":ADD_FRIEND,payload:data})
            }
        })
    }
}



export const removeFriend=(following_id,being_followed_id)=>{
    return function(dispatch){
        fetch(API+"/removeFollows",{
            method:"POST",
            headers:{
              ...HEADERS,
              "Authorization":localStorage.token
            },
            body:JSON.stringify(
              {following:following_id,
            
            being_followed:being_followed_id}
            )
          })
          .then(resp =>resp.json())
          .then(data=>{
            //   console.log(data)
            if(!data.error){
                dispatch({"type":REMOVE_FRIEND,payload:data})
            }
        })
    }
}

export const troggleWorking=()=>{
    return function(dispatch){
        fetch(API+`/working/${localStorage.clicked_user}`)
        .then(resp=>resp.json())
        .then(data=>{
            if(!data.error){
                dispatch({"type":TROGGLE_WORKING,payload:data})
            }
        })
    }
}


export const addBlog=(title,url)=>{
    return function(dispatch){
        fetch(API+"/blogs",{
            method:"POST",
            headers:{
              ...HEADERS,
              "Authorization":localStorage.token
            },
            body:JSON.stringify(
             { user_id:localStorage.current_user,
                title:title,
                url:url
              }
            )
          })
          .then(resp =>resp.json())
          .then(data=>{
            if(!data.error){
                dispatch({"type":ADD_BLOG,payload:data})
            }
        })
    }
}



export const getTwoUsersChat=(receiver_id)=>{
    return function(dispatch){
        fetch(API+`/twoUsersChat/${localStorage.current_user}/${receiver_id}`)
        .then(resp=>resp.json())
        .then(data=>{
            if(!data.error){
                dispatch({"type":GET_TWO_USERS_CHAT,payload:data})
            }
        })
    }
}

export const sendUserMessage=(id,text)=>{
    return function(dispatch){
        fetch(API+`/two_users_messages/`,{
            method:"POST",
            headers:{
              ...HEADERS,
              "Authorization":localStorage.token
            },
            body:JSON.stringify(
             { chat_id:id,
                text:text
              }
            )
          })
        .then(resp=>resp.json())
        .then(data=>{ 
            if(!data.error){
                dispatch({"type":SEND_USER_MESSAGE,payload:data})
            }
        })
    }
}




export const getGlobalMessage=()=>{
    return function(dispatch){
        fetch(API+"/global_messages")
        .then(resp=>resp.json())
        .then(data=>{
            if(!data.error){
                dispatch({"type":GET_GLOBAL_MESSAGE,payload:data})
            }
        })
    }
}


// result adding to state after we
//  get data from web sockets

export const sendGlobalMessage=(data)=>{
    return function(dispatch){
        dispatch({ "type" :SEND_GLOBAL_MESSAGE,payload:data.global_message })
       
    }
}
