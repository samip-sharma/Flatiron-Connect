import React from 'react'
import Navbar from './Navbar'
import {connect} from 'react-redux'
import {getAllUsers,addFriend,getAllFriends,removeFriend} from '../redux/action'



class FriendList extends React.Component{

    componentDidMount(){
        this.props.getAllFriends()
        this.props.getAllUsers()
    }


    handleAddFriend=(id)=>{
        this.props.addFriend(localStorage.current_user,id)
    }

    handleRemoveFriend=(id)=>{
        this.props.removeFriend(localStorage.current_user,id)
    }

    handleUserClick=(id)=>{
        localStorage.clicked_user=id
        this.props.history.push("/profile")
    }

    render(){
        let arrOfFriendsId=this.props.all_friends.map((user)=>user.id)
        let notfriend=this.props.all_users.filter((user)=>!(arrOfFriendsId.includes(user.id) || user.id===parseInt(localStorage.current_user) ))
        return(
            <React.Fragment>
                <Navbar />
                <div>
                    ALL FRIENDS
                {this.props.all_friends.map((user)=>
                <p> 
                    <div onClick={()=>this.handleUserClick(user.id)}>{user.name}</div> 
                    <button onClick={()=>this.handleRemoveFriend(user.id)}>Remove Friend</button>
                </p>)}
                </div>

                <br />
                <div className="all-users">
                    ALL USERS
                {notfriend.map((user)=>
                <div>
                    <div onClick={()=>this.handleUserClick(user.id)}>{user.name}</div> 
                    <button onClick={()=>this.handleAddFriend(user.id)}>ADD FRIEND</button>
                    </div>)}
                </div>
            </React.Fragment>
        )
    }
}


const mapStateToProps=(state)=>{
    return {
        all_users:state.all_users,
        all_friends:state.all_friends
    }
  }
  
  const mapDispatchToProps = {
    getAllUsers:getAllUsers,
    getAllFriends:getAllFriends,
    addFriend:addFriend,
    removeFriend:removeFriend
  }
  
export default connect(mapStateToProps,mapDispatchToProps)(FriendList)
  