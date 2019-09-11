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

    }
    render(){
        let arr=this.props.all_mod_friends.filter((user)=>{
            // debugger
            return user.user_mod.accepted
        //    return parseInt(user.id)!==parseInt(localStorage.current_user)
        // return user
        })
        let modName

        if (this.props.loggedIn_user.mod){
            modName=this.props.loggedIn_user.mod.name
        }
         arr=arr.map((user)=>{
           return <li onClick={()=>this.handleUserClick(user.id)}>{user.name}</li>
        })
        console.log(this.props)
        return(
            <React.Fragment>
                <Navbar />
                <h3 className="mod-name">{modName}</h3>
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
                    {this.props.all_mod_tweets.map(tweet=><li>{tweet.user.name}-{tweet.content}</li>)}
                    </ul>
                </div>

                <div className="mod-tweet-form">
                <form onSubmit={this.handlePostSubmit}>
                            <input value={this.state.content} onChange={this.handleInputChange} type="text" name="content" placeholder={`What's in mind, ${this.props.loggedIn_user.name}?`} />
                            <input type="submit" value="post" />
                        </form>
                </div>

            </div>



               <div className="upcomming-event">
                <UpcommingEvent />
               </div>
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
