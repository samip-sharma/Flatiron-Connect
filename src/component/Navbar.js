import React from "react"
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getLoggedInUser,getCurrentUser} from '../redux/action'



class Navbar extends React.Component {
    handleLogout(){
        localStorage.clear()
    }

    componentDidMount(){
        this.props.getLoggedInUser()
    }

    render(){
        return(
                <div className="navbar-container">
                    <Link to="/home" >Home</Link>
                    <Link to="/calender" >Calender</Link>
                    <Link to="/friends" >Friends</Link>
                    <Link to="/mymod" >My Mod</Link>
                    <a onClick={()=>localStorage.clicked_user=localStorage.current_user} href="/profile" >Profile</a>
                    <Link to="/setting" >Setting</Link>
                    {this.props.loggedIn_user.admin ?
                    <Link to="/admin" >AdminSection</Link>
                    :
                    null
                
                    }
                    <Link to="/chat" >Chat</Link>
                    <Link to="/" onClick={this.handleLogout} >Logout</Link>
                </div>
        )
    }
}


const mapStateToProps=(state)=>{
    return {
        loggedIn_user:state.loggedIn_user,
        current_user:state.current_user
    }
  }


  const mapDispatchToProps = {
    getLoggedInUser:getLoggedInUser,
    getCurrentUser:getCurrentUser
  }
  export default connect(mapStateToProps,mapDispatchToProps)(Navbar)
