import React from 'react'

export default class ChatBoxForUser extends React.Component{
   state={
       text:"",
       user:localStorage.clicked_user
   }

    loop = setInterval(() => {
                this.props.getChat(localStorage.clicked_user)
        },2000)


   componentWillUnmount(){
    clearInterval(this.loop)
   }

   componentDidUpdate(){
       if(this.state.user!==localStorage.clicked_user){
           clearInterval(this.loop)
           this.loop = setInterval(() => {
            this.props.getChat(localStorage.clicked_user)
            var objDiv = document.getElementById("test");
            objDiv.scrollBottom = objDiv.scrollHeight;
            }, 20000)

            var objDiv = document.querySelector(".two-user-messages")
      objDiv.scrollTop = objDiv.scrollHeight;

       }
   }

    handleChatSubmit=(e)=>{
        e.preventDefault()
        this.props.sendUserMessage(this.props.chat.id,this.state.text)
        this.setState({
          text:""
        })
    }

    handleChatInputChange=(e)=>{
        this.setState({
            text:e.target.value
        })
    }


    render(){
        var objDiv = document.querySelector(".two-user-messages")
      if (objDiv) {objDiv.scrollTop = objDiv.scrollHeight};
        let messageArr
            if (this.props.chat.two_users_messages){
                messageArr=this.props.chat.two_users_messages.map((message)=>{
                    return <p>{message.sender}-{message.text}</p>
                })
            }
        return(
            <div className='chat-single'>
                {this.props.chat.two_users_messages?
                 <div>
                    <div id="test" className="two-user-messages">
                        {messageArr}
                    </div>

                    <div className="two-user-messages-form">
                    <form onSubmit={this.handleChatSubmit}>
                        <input onChange={this.handleChatInputChange} value={this.state.text} type="text" placeholder="type your message" />
                        <input type="submit" value="submit" />
                    </form>
                    </div>

                </div>
                :
                null
                }
            </div>
        )
    }
}







// {this.props.two_users_chat.two_users_messages.map((message)=>{
//     return <p>{message.text}</p>
//     })}
