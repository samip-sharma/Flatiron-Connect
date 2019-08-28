import React from 'react'

export default class Login extends React.Component{
    state={
        user_name:'',
        password:''
    }
    handleInputChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleLoginSubmit=(e)=>{
        e.preventDefault()
        this.props.handleLoginSubmit(this.state)
    }

    render(){
        if (localStorage.token) {this.props.history.push('/home')}
        return(
            <div>
            <form onSubmit={ this.handleLoginSubmit }>
                <input onChange={ this.handleInputChange } value={ this.state.user_name } type="text" placeholder="User Name" name="user_name"/>
                <input onChange={ this.handleInputChange } value={ this.state.password }  type="password" placeholder="Password" name="password"/>
                <input type="submit" value="submit"/>
                </form>
                <button onClick={()=>{this.props.history.push('/register')}}>Register</button>
            </div>
        )
    }
}