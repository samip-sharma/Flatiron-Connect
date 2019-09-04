import React from 'react'
import {connect} from 'react-redux'
import {getModFriends} from '../redux/action'
import Navbar from './Navbar'


class MyMode extends React.Component{

    componentDidMount(){
        this.props.getModFriends()
    }

    handleUserClick=(id)=>{
        localStorage.clicked_user=id
        this.props.history.push("/profile")
    }
    render(){
        let arr=this.props.all_mod_friends.filter((user)=>{
            // debugger
            return user.user_mod.accepted
        //    return parseInt(user.id)!==parseInt(localStorage.current_user)
        return user
        })
         arr=arr.map((user)=>{
           return <li onClick={()=>this.handleUserClick(user.id)}>{user.name}</li>
        })
        console.log(this.props)
        return(
            <React.Fragment>
                <Navbar />
                <ul>
                {arr}

                </ul>
            </React.Fragment>
        )
    }
}


const mapStateToProps=(state)=>{
    return {
        all_mod_friends:state.all_mod_friends
    }
  }
  
  const mapDispatchToProps = {
    getModFriends:getModFriends
  }
  
export default connect(mapStateToProps,mapDispatchToProps)(MyMode)
  