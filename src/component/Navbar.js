import React from "react"
import {Link} from 'react-router-dom'


export default class Navbar extends React.Component {
    handleLogout(){
        localStorage.clear()
    }

    render(){
        return(
                <div className="Navbar-container">
                    <Link to="/home" >home</Link>
                    <Link to="/calender" >Calender</Link>
                    <Link to="/friends" >friends</Link>
                    <Link to="/" onClick={this.handleLogout} >logout</Link>
                </div>
        )
    }
}