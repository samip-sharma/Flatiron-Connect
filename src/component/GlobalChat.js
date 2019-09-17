import React from 'react'
import {connect} from "react-redux"
import {HEADERS,API} from '../constants/constants'
import {getGlobalMessage,sendGlobalMessage} from '../redux/action'

class GlobalChat extends React.Component{

    state={
        text:''
    }

    loop = setInterval(() => {
      this.props.getGlobalMessage()
    },2000)


 componentWillUnmount(){
  clearInterval(this.loop)
 }

    componentDidMount(){
        this.props.getGlobalMessage()

        var objDiv = document.querySelector(".global-messages")
        if (objDiv) {objDiv.scrollTop = objDiv.scrollHeight};
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
        var objDiv = document.querySelector(".global-messages")
        if (objDiv) {objDiv.scrollTop = objDiv.scrollHeight};
        let messageArr
        if (this.props.global_messages.length>0){
            messageArr=this.props.global_messages.map((message)=>{
                return<p key={message.id}><span className="user-name">{message.user.name}</span>-{message.text}</p>
            })
        }
        return(
        <React.Fragment>
          <div className="chat-global">

            <div className="global-messages">
            {messageArr}
            </div>

            <div className="global-chat-form">
            <form onSubmit={this.handleMessageSubmit}>
                    <input onChange={this.handleInputChange} value={this.state.text} type="text" placeholder="type message" />
                    <input type="submit" value="send" />
                </form>
            </div>
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
