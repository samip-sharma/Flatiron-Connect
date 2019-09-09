import React from 'react'
import {connect} from "react-redux"
import {HEADERS,API} from '../constants/constants'
import {getGlobalMessage,sendGlobalMessage} from '../redux/action'
import { ActionCable } from 'react-actioncable-provider';

class GlobalChat extends React.Component{

    state={
        text:''
    }

    componentDidMount(){
        this.props.getGlobalMessage()
    }

    handleReceivedMessage=(data)=>{
        // debugger
        console.log(data)
        this.props.sendGlobalMessage(data)
    }

    handleMessageSubmit=(e)=>{
        e.preventDefault()
        fetch(API+"/global_messages",{
            method:"POST",
            headers:{
              ...HEADERS,
              "Authorization":localStorage.token
            },
            body:JSON.stringify(
             { user_id:localStorage.current_user,
                text:this.state.text
              }
            )
          })
          .then(()=>this.setState({text:''}))
    }

    handleInputChange=(e)=>{
        this.setState({
            text:e.target.value
        })
    }

    render(){
        // console.log(this.props)
        let messageArr
        if (this.props.global_messages.length>0){
            messageArr=this.props.global_messages.map((message)=>{
                return<p>{message.user.name}-{message.text}</p>
            })
        }
        return(
        <React.Fragment>
            <ActionCable
            channel={{ channel: 'GlobalMessagesChannel' }}
            onReceived={this.handleReceivedMessage}
            />

            <div className="global-messages">
            {messageArr}
            </div>

            <div className="global-chat-form">
            <form onSubmit={this.handleMessageSubmit}>
                    <input onChange={this.handleInputChange} value={this.state.text} type="text" placeholder="type message" />
                    <input type="submit" value="send" />
                </form>
            </div>
        </React.Fragment>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        loggedIn_user : state.loggedIn_user,
        global_messages:state.global_messages
    }
  }
  
  const mapDispatchToProps = {
    getGlobalMessage:getGlobalMessage,
    sendGlobalMessage:sendGlobalMessage
  }
  
export default connect(mapStateToProps,mapDispatchToProps)(GlobalChat)
  