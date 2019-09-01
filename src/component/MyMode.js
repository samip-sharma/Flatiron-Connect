import React from 'react'
import {connect} from 'react-redux'
import {getModFriends} from '../redux/action'
import Navbar from './Navbar'


class MyMode extends React.Component{

    componentDidMount(){
        this.props.getModFriends()
    }
    render(){
        let arr=this.props.all_mod_friends.filter((user)=>{
           return parseInt(user.id)!==parseInt(localStorage.current_user)
        })
         arr=arr.map((user)=>{
           return <li>{user.name}<button>X</button></li>
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
  