import React from 'react'
import {connect} from 'react-redux'
import {getModFriends} from '../redux/action'
import Navbar from './Navbar'
import UpcommingEvent from './UpcommingEvents'


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
                    {arr}
                 </ul>
               </div>

               <div className="upcomming-event">
                <UpcommingEvent />
               </div>

            </React.Fragment>
        )
    }
}


const mapStateToProps=(state)=>{
    return {
        all_mod_friends:state.all_mod_friends,
        loggedIn_user:state.loggedIn_user
    }
  }
  
  const mapDispatchToProps = {
    getModFriends:getModFriends
  }
  
export default connect(mapStateToProps,mapDispatchToProps)(MyMode)
  