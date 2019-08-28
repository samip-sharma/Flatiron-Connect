import React from "react"


export default class Navbar extends React.Component {
    handleLogout(){
        localStorage.clear()
    }

    render(){
        return(
                <div className="Navbar-container">
                    <a href="/home" >home</a>
                    <a href="/calender" >Calender</a>
                    <a href="/friends" >friends</a>
                    <a href="/" onClick={this.handleLogout} >logout</a>
                </div>
        )
    }
}