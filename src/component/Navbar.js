import React from "react"
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getCurrentUser} from '../redux/action'



 class Navbar extends React.Component {
    handleLogout(){
        localStorage.clear()
    }

    componentDidMount(){
        this.props.getCurrentUser()
    }

    render(){
        return(
                <div className="Navbar-container">
                    <Link to="/home" >home</Link>
                    <Link to="/calender" >Calender</Link>
                    <Link to="/friends" >friends</Link>
                    <Link to="/mymod" >My Mod</Link>
                    <Link to="/setting" >setting</Link>
                    {this.props.current_user.admin ?
                    <Link to="/admin" >AdminSection</Link>
                    :
                    null
                
                    }
                    <Link to="/" onClick={this.handleLogout} >logout</Link>
                </div>
        )
    }
}


const mapStateToProps=(state)=>{
    return {
        current_user:state.current_user
    }
  }


  const mapDispatchToProps = {
    getCurrentUser:getCurrentUser,
  }
  export default connect(mapStateToProps,mapDispatchToProps)(Navbar)
