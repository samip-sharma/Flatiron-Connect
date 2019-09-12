import React from 'react'
import { MDBAnimation } from "mdbreact";




export default class Login extends React.Component{
    state={
        name:'',
        user_name:'',
        password:'',
    }
    handleInputChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleLoginSubmit=(e)=>{
        e.preventDefault()
        this.props.handleRegisterSubmit(this.state)
        this.props.history.push("/home")
        
        
    }

    render(){
        return(
            <div className="register-container">
                <h3 className="register-login-heading">
                <MDBAnimation type="bounce" infinite> 
                 Register
                </MDBAnimation>
                </h3>
                <div className="register-form">
                    <form onSubmit={ this.handleLoginSubmit }>
                    <input onChange={ this.handleInputChange } value={ this.state.name } type="text" placeholder="Name" name="name"/>
                    <input onChange={ this.handleInputChange } value={ this.state.user_name } type="text" placeholder="User Name" name="user_name"/>
                    <input onChange={ this.handleInputChange } value={ this.state.password }  type="password" placeholder="Password" name="password"/>
                    <input type="submit" value="submit"/>
                    <button className="login-register" onClick={()=>{this.props.history.push('/')}}>LOGIN</button>
                    </form>
                    </div>
            </div>
        )
    }
}
