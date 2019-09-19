import React from 'react'
import {connect} from 'react-redux'
import {getModFriends,getAllModTweets,createModTweets} from '../redux/action'
import Navbar from './Navbar'
import UpcommingEvent from './UpcommingEvents'
import Sidebar from './Sidebar'


class MyMode extends React.Component{

    state={
        content:""
    }

    componentDidMount(){
        this.props.getModFriends()
        this.props.getAllModTweets(localStorage.mod_id)
    }

    componentDidUpdate(){
        
        var objDiv = document.querySelector(".tweets")
        if(objDiv) objDiv.scrollTop = objDiv.scrollHeight;
    }

    handleUserClick=(id)=>{
        localStorage.clicked_user=id
        this.props.history.push("/profile")
    }

    handleInputChange=(e)=>{
        this.setState({
            content:e.target.value
        })
    }

    handlePostSubmit=(e)=>{
        e.preventDefault()
        this.props.createModTweets(this.state.content)
        this.setState({
            content:""
        })

    }
    render(){
        let arr=this.props.all_mod_friends.filter((user)=>{
            return user.user_mod.accepted
        })
        let modName

        if (this.props.loggedIn_user.mod){
            modName=this.props.loggedIn_user.mod.name
        }
         arr=arr.map((user)=>{
           return <li className="user-name" onClick={()=>this.handleUserClick(user.id)}>{user.name}</li>
        })
        return(
            <React.Fragment>
                <Navbar />
                
                {this.props.loggedIn_user.user_mod && this.props.loggedIn_user.user_mod.accepted? 
                <div>
                <h3 className="mod-name">{modName}</h3>
                <div className="my-mod_component">
                
                <div className="mod_users">
                    <ul>
                        All mod friends
                        <br />
                        {arr.length>0? arr : "No one in this mod"}
                    </ul>
                </div>


                <div className="mod-tweets">
                    <div className="tweets">
                        Mod Tweets
                        <ul>
                        {this.props.all_mod_tweets.map(tweet=><li><span onClick={()=>this.handleUserClick(tweet.user.id)} className="user-name">{tweet.user.name}</span>-{tweet.content}</li>)}
                        </ul>
                    </div>

                    <div className="mod-tweet-form">
                    <form onSubmit={this.handlePostSubmit}>
                                <input value={this.state.content} onChange={this.handleInputChange} type="text" name="content" placeholder={`What's in mind, ${this.props.loggedIn_user.name}?`} />
                                <input type="submit" value="post" />
                            </form>
                    </div>
                    <div className="upcomming-event">
                </div>
                </div>
                    <UpcommingEvent />



               
               </div>
               </div>
               :
               <div className="not-accepted">You are not yet accepted in a mod
                    <br/>
                Talk to your instructors about it.
                </div>
            }
               <Sidebar />
            </React.Fragment>
        )
    }
}


const mapStateToProps=(state)=>{
    return {
        all_mod_friends:state.all_mod_friends,
        loggedIn_user:state.loggedIn_user,
        all_mod_tweets:state.all_mod_tweets
    }
  }

  const mapDispatchToProps = {
    getModFriends:getModFriends,
    getAllModTweets:getAllModTweets,
    createModTweets:createModTweets
  }

export default connect(mapStateToProps,mapDispatchToProps)(MyMode)
