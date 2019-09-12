import React from 'react'
import Navbar from './Navbar'
import {connect} from 'react-redux'
import {getAllUsers,addFriend,getAllFriends,removeFriend} from '../redux/action'
import Sidebar from './Sidebar'



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
        console.log(this.props)
        let arrOfFriendsId=this.props.all_friends.map((user)=>user.id)
        let notfriend=this.props.all_users.filter((user)=>!(arrOfFriendsId.includes(user.id) || user.id===parseInt(localStorage.current_user) ))
        return(
            <React.Fragment>
                    <Navbar />
                <div className="friend-list-component" >
                    <div className="all-friends-friendlist">
                        <h4>ALL FRIENDS</h4>
                    {this.props.all_friends.map((user)=>
                        <div className="each-user-friends">
                            <div onClick={()=>this.handleUserClick(user.id)}>
                                {user.active_user?
                                <img style={{height:"10px"}} src="http://www.clker.com/cliparts/n/6/E/l/R/n/green-button-blank-md.png" alt="online"/>
                                :
                                <img style={{height:"10px"}} src="https://t4.rbxcdn.com/febc68c16e64ba11fa26981649a3ecf5" alt="offline" />

                                }
                                {user.name}
                            </div>
                            <button className="add-remove-friend" onClick={()=>this.handleRemoveFriend(user.id)}> Remove Friend</button>
                        </div>)}
                    </div>

                    
                    
                    <div className="all-users">
                        <h4>ALL USERS</h4>
                    {notfriend.map((user)=>
                    <div className="each-user-friends">
                        <div onClick={()=>this.handleUserClick(user.id)}>
                        {user.active_user?
                        <img style={{height:"10px"}} src="http://www.clker.com/cliparts/n/6/E/l/R/n/green-button-blank-md.png" alt="online"/>
                        :
                        <img style={{height:"10px"}} src="https://t4.rbxcdn.com/febc68c16e64ba11fa26981649a3ecf5" alt="offline" />

                    }
                        {user.name}
                        </div>
                        <button className="add-remove-friend" onClick={()=>this.handleAddFriend(user.id)}>ADD FRIEND</button>
                        </div>)}
                    </div>
                </div>


                <Sidebar />

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
