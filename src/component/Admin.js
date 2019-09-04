import React from "react"
import Navbar from './Navbar'
import {connect} from 'react-redux'
import {createNewMod,getAllMod,getPendingModUser,acceptModUser,rejectModUser} from '../redux/action'

class Admin extends React.Component {
  state={
    mod_name:''
  }


  handleInput=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  componentDidMount(){
    this.props.getAllMod()
    this.props.getPendingModUser()
  }

  handleSubmit=(e)=>{
    e.preventDefault()
    this.props.createNewMod(this.state)
    
  }

  handleUserAccept=(id)=>{
    // debugger
    this.props.acceptModUser({id:id})
  }

  handleUserReject=(id)=>{
    this.props.rejectModUser({id:id})
  }

render(){
    return(
        <React.Fragment>
          <Navbar></Navbar>
          Create Mod
          <form onSubmit={this.handleSubmit}>
            <input onChange={this.handleInput} value={this.state.mod_name} type="text" name="mod_name" placeholder="New Mod Name" />
            <input type="submit" value="create new mod" />
          </form>


          <div className="admin-all-mod">
            ALL MOD
            <ul>
            {this.props.all_mod.map((mod)=>{
              return <li>{mod.name}</li>
            })}
            </ul>
          </div>


          <div className="admin-pending-req">
            PENDING USER FOR MOD
            <ul>
            {this.props.all_pending_user.map((user_mod)=>{
              return <li>{user_mod.user.name}-----{user_mod.mod.name}
              <button onClick={()=>this.handleUserAccept(user_mod.id)}>ACCEPT</button>
              <button onClick={()=>this.handleUserReject(user_mod.id)} >REJECT</button>
              </li>
            })}
            </ul>
          </div>
        </React.Fragment>
    )
}
}


const mapStateToProps=(state)=>{
    return {
      all_mod:state.all_mod,
      all_pending_user:state.all_pending_user
    }
  }


  const mapDispatchToProps = {
    createNewMod:createNewMod,
    getAllMod:getAllMod,
    getPendingModUser:getPendingModUser,
    acceptModUser:acceptModUser,
    rejectModUser:rejectModUser

  }


export default connect(mapStateToProps,mapDispatchToProps)(Admin)

