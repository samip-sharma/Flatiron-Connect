import React from 'react'
import {connect} from 'react-redux'
import {} from '../redux/action'
import Chat from './Chat'

class Sidebar extends React.Component{
    render(){
        return(
            <div className="side-bar">
            <div className="profile-in-side-bar" >
                {this.props.loggedIn_user.image?
                <div className='sidebar-header'>
                    <div> 
                    <img className="sidebar-image" src={this.props.loggedIn_user.image.url} alt="profile pic" />
                    </div>
                    Name:{this.props.loggedIn_user.name}
                    <br />
                    User Name:{this.props.loggedIn_user.user_name}
                </div>
            :
            null
            }
            </div>
            <div className="friend-list">

            <Chat />
            {/* <UpcommingEvents /> */}
            </div>
            </div>
        )
    }
}


const mapStateToProps=(state)=>{
    return {
        loggedIn_user:state.loggedIn_user
    }
}


const mapDispatchToProps = {

}

export default connect(mapStateToProps,mapDispatchToProps)(Sidebar)
