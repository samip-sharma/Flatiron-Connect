import React from "react"
import {connect} from 'react-redux'
import {getAllFriends,getTwoUsersChat,sendGlobalMessage,getLoggedInUser,sendUserMessage} from '../redux/action'
import ChatBoxForUser from "./ChatBoxForUser";
import GlobalChat from "./GlobalChat"
import { MDBBtn } from "mdbreact";


class Chat extends React.Component {

// loop = setInterval(() => {

//     console.log("looping")
//     this.props.getAllFriends()
// },2000)


// componentWillUnmount(){
//     clearInterval(this.loop)
// }

    componentDidMount(){
        this.props.getLoggedInUser()
        this.props.getAllFriends()     
    }

    state={
        text:'',
        clicked:false,
        global:false
    }

    handleGlobalClick=()=>{
        this.setState({
            global:true,
            clicked:false
        })
    }



    handleUserClick=(id)=>{
        localStorage.clicked_user=id
        this.props.getTwoUsersChat(id)
        this.setState({
            clicked:true,
            global:false
        })
        // this.props.history.push("/profile")
    }


    render(){
        return(
          <>
            <div className='chat-container'>

                <div className="button-and-name">
                <MDBBtn onClick={this.handleGlobalClick} color="blue-grey">Global Chat</MDBBtn>
                <div>
                    <h4> ALL FRIENDS</h4>
                    {this.props.all_friends.map((user)=>
                    <div className="user-name" key={user.id}>
                        <div onClick={()=>this.handleUserClick(user.id)}>
                        {user.active_user?
                        <img style={{height:"10px"}} src="http://www.clker.com/cliparts/n/6/E/l/R/n/green-button-blank-md.png" alt="online"/>
                        :
                        <img style={{height:"10px"}} src="https://t4.rbxcdn.com/febc68c16e64ba11fa26981649a3ecf5" alt="offline" />

                    }
                        {user.name}</div>
                    </div>)}
                </div>

                </div>
            </div>

            <div className="chat-and-form">
                {this.state.clicked?

                <ChatBoxForUser getAllFriends={this.props.getAllFriends} getChat={this.props.getTwoUsersChat} sendUserMessage={this.props.sendUserMessage} chat={this.props.two_users_chat}/>
                :

                null}

                {this.state.global?
                <GlobalChat />
                :
                null
                 }
             </div>
          </>
        )
    }

}



const mapStateToProps=(state)=>{
    return {
        all_friends:state.all_friends,
        two_users_chat:state.two_users_chat
    }
  }


  const mapDispatchToProps = {
    getAllFriends:getAllFriends,
    getTwoUsersChat:getTwoUsersChat,
    getLoggedInUser:getLoggedInUser,
    sendUserMessage:sendUserMessage,
    sendGlobalMessage:sendGlobalMessage

  }


export default connect(mapStateToProps,mapDispatchToProps)(Chat)
