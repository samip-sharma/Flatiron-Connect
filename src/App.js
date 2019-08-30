import React from 'react';
import './App.css';
import Login from './component/Login'
import Register from './component/Register'
import Calender from './component/Calender'
import Home from './component/Home'
import FriendList from './component/FriendList'

import { Switch, Route } from 'react-router-dom'
import {connect} from 'react-redux'
import {login,register, allTweets,getAllFriends,getModEvents,addNewEvent,addNewTweet} from './redux/action'

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

  render() {
    return (
      <Switch>
        <Route exact path='/' render={(routerProps)=> <Login  {...routerProps} handleLoginSubmit={this.handleLoginSubmit} />} />
        <Route exact path='/calender' render={(routerProps)=> <Calender addNewEvent={this.props.addNewEvent} getModEvents={this.props.getModEvents} all_mod_events={this.processEventDates()}  {...routerProps}  />} />
        <Route exact path='/home' render={(routerProps)=> <Home allTweets={this.props.allTweets} addNewTweet={this.props.addNewTweet} getModEvents={this.props.getModEvents} all_tweets={this.props.all_tweets}  {...routerProps}  />} />
        <Route exact path='/friends' render={(routerProps)=> <FriendList all_friends={this.props.all_friends} getAllFriends={this.props.getAllFriends}  {...routerProps}  />} />
        <Route  path='/register' render={(routerProps)=> <Register  {...routerProps} handleRegisterSubmit={this.handleRegisterSubmit} />} />
      </Switch>
    )
  }
}



const mapStateToProps=(state)=>{
  return {
    current_user:state.current_user,
    all_tweets:state.all_tweets,
    all_friends:state.all_friends,
    all_mod_events:state.all_mod_events
  }
}

const mapDispatchToProps= {
    login:login,
    register:register,
    allTweets:allTweets,
    getAllFriends:getAllFriends,
    getModEvents:getModEvents,
    addNewEvent:addNewEvent,
    addNewTweet:addNewTweet
  }

export default connect(mapStateToProps,mapDispatchToProps)(App)
