import React from 'react'
import Navbar from './Navbar'


export default class FriendList extends React.Component{

    componentDidMount(){
        this.props.getAllFriends()
    }

    render(){
        console.log(this.props.all_friends)
        return(
            <React.Fragment>
                <Navbar />
                {this.props.all_friends.map((user)=><p>{user.name}</p>)}
            </React.Fragment>
        )
    }
}