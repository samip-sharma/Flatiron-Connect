import React from 'react'
import {connect} from 'react-redux'
import {getAllMod,getMyMod,getCurrentUser,editCurrentUser} from '../redux/action'
import NavBar from './Navbar'


 class Setting extends React.Component{
    state={
        user_id:localStorage.current_user,
        name:'',
        user_name:'',
        password:'',
        mod_id:localStorage.mod_id
    }

    handleFormChange=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSelectChange=(e)=>{
        this.setState({
            mod_id: e.target.value
        })
    }

    componentDidMount(){
        this.props.getAllMod()
        this.props.getCurrentUser()
    }

    handleSubmit= (e)=>{
        e.preventDefault()
        this.props.editCurrentUser(this.state)
    }


    render(){
        // console.log(this.handleSubmit())
        return(
            <React.Fragment>
                <NavBar />
            <form  onSubmit={this.handleSubmit}>
                name:<input onChange={this.handleFormChange} type="text" value={this.state.name} name="name" placeholder={this.props.current_user.name} />
                User Name:<input onChange={this.handleFormChange} type="text" value={this.state.user_name} name="user_name" placeholder={this.props.current_user.user_name} />
                Password:<input onChange={this.handleFormChange} type="password" value={this.state.password} name="password" />

           Mod <select onChange={this.handleSelectChange} value={this.state.mod_id}>
                {this.props.all_mod.map((mod)=> <option value={mod.id}>{mod.name}</option> )}
            </select>

            <input type="submit" value="edit" />

            </form>
            </React.Fragment>
        )
    }
}



const mapStateToProps=(state)=>{
    return {
        all_mod:state.all_mod,
        my_mod:state.my_mod,
        current_user:state.current_user
    }
  }
  
  const mapDispatchToProps = {
    getAllMod:getAllMod,
    getMyMod:getMyMod,
    getCurrentUser:getCurrentUser,
    editCurrentUser:editCurrentUser
  }
  
export default connect(mapStateToProps,mapDispatchToProps)(Setting)
  