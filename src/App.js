import React from 'react';
import './App.css';
import Login from './component/Login'
import Register from './component/Register'
import Calender from './component/Calender'
import Home from './component/Home'
import FriendList from './component/FriendList'
import Profile from './component/Profile'
import Setting from './component/Setting'
import Admin from './component/Admin'
import Chat from './component/Chat'
import { ActionCable, ActionCableConsumer } from 'react-actioncable-provider';

import { Switch, Route } from 'react-router-dom'
import {connect} from 'react-redux'
import {login,register,sendGlobalMessage, allTweets,getAllFriends,getModEvents,addNewEvent,addNewTweet} from './redux/action'
import MyMode from './component/MyMode';
// import { ActionCableProvider } from 'react-actioncable-provider';
// import {API_WS_ROOT} from './constants/constants'



class App extends React.Component {

  handleLoginSubmit=(state)=>{
    this.props.login(state)
  }

  handleRegisterSubmit=(state)=>{
    this.props.register(state)
  }


  processEventDates=()=>{
    let arr=[...this.props.all_mod_events]
    return arr.map((data) =>{
     return{
       start:data.start,
       end:data.end,
       allDay:false,
       title:data.title
     }
   })
  }

  onConnected = () => {
    console.log("I'm connected")
  }

  onDisconnected = () => {
    console.log("I'm disconnected")
  }

  handleReceivedMessage=(data)=>{
    // debugger
    console.log("got msg from action cable")
    // if (data.id===this.props.global_messages[this.props.global_messages.length-1].id){
      this.props.sendGlobalMessage(data)
    // }
}

  render() {
    return (
      <React.Fragment>
            <ActionCable
          key={localStorage.current_user}
            channel={{ channel: 'GlobalMessagesChannel', user: localStorage.current_user }}
            onReceived={this.handleReceivedMessage}
            onConnected={this.onConnected}
            onDisconnected={this.onDisconnected}
        />
      <Switch>
        <Route exact path='/' render={(routerProps)=> <Login  {...routerProps} handleLoginSubmit={this.handleLoginSubmit} />} />
        <Route exact path='/calender' render={(routerProps)=> <Calender addNewEvent={this.props.addNewEvent} loggedIn_user={this.props.loggedIn_user} getModEvents={this.props.getModEvents} all_mod_events={this.processEventDates()}  {...routerProps}  />} />
        <Route exact path='/home'
        render={(routerProps)=>

         <Home loggedIn_user={this.props.loggedIn_user} allTweets={this.props.allTweets} addNewTweet={this.props.addNewTweet} getModEvents={this.props.getModEvents} all_tweets={this.props.all_tweets}   {...routerProps}  />
         } />

        <Route exact path='/friends' render={(routerProps)=> <FriendList all_friends={this.props.all_friends} getAllFriends={this.props.getAllFriends}  {...routerProps}  />} />
        <Route  path='/register' render={(routerProps)=> <Register  {...routerProps} handleRegisterSubmit={this.handleRegisterSubmit} />} />
        <Route  path='/profile' render={(routerProps)=> <Profile  {...routerProps}  />} />
        <Route  path='/mymod' render={(routerProps)=> <MyMode  {...routerProps}  />} />
        <Route  path='/setting' render={(routerProps)=> <Setting  {...routerProps}  />} />
        <Route  path='/admin' render={(routerProps)=> <Admin  {...routerProps}  />} />
        <Route  path='/chat' render={(routerProps)=> <Chat  {...routerProps}  />} />

      </Switch>
      </React.Fragment>
    )
  }
}



const mapStateToProps=(state)=>{
  return {
    current_user:state.current_user,
    all_tweets:state.all_tweets,
    all_friends:state.all_friends,
    all_mod_events:state.all_mod_events,
    loggedIn_user:state.loggedIn_user,
    global_messages:state.global_messages
  }
}

const mapDispatchToProps= {
    login:login,
    register:register,
    allTweets:allTweets,
    getAllFriends:getAllFriends,
    getModEvents:getModEvents,
    addNewEvent:addNewEvent,
    addNewTweet:addNewTweet,
    sendGlobalMessage:sendGlobalMessage
  }

export default connect(mapStateToProps,mapDispatchToProps)(App)
