import React from "react"
import Navbar from './Navbar'
import {connect} from 'react-redux'
import Sidebar from './Sidebar'
import { MDBBtn } from "mdbreact";
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
          <div className="my-mod_component" >
            <div className="my-mod-form">
              <form onSubmit={this.handleSubmit}>
              <h4>Create Mod</h4>
              <input onChange={this.handleInput} value={this.state.mod_name} type="text" name="mod_name" placeholder="New Mod Name" />
              <input type="submit" value="create new mod" />
              </form>
            </div>


          <div className="admin-all-mod">
            <h4>ALL MOD</h4>
            <ul>
            {this.props.all_mod.map((mod)=>{
              return <div>{mod.name}</div>
            })}
            </ul>
          </div>


          <div className="admin-pending-req">
           <h4> PENDING USER FOR MOD</h4>
            <ul>
            {this.props.all_pending_user.map((user_mod)=>{
              return <div> <div className="user-name">{user_mod.user.name}</div>-----{user_mod.mod.name}
              <br />
              <MDBBtn style={{height:"30px",padding:"0", width:"56px"}} onClick={()=>this.handleUserAccept(user_mod.id)} rounded color="secondary">ACCEPT</MDBBtn>
              <MDBBtn style={{height:"30px",padding:"0", width:"56px"}} onClick={()=>this.handleUserReject(user_mod.id)} rounded color="danger">REJECT</MDBBtn>
              </div>
            })}
            </ul>
          </div>  
                

          </div>
          <Sidebar />
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
