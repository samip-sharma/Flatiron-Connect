import React from 'react'
import {connect} from 'react-redux'
import {getAllMod,getMyMod,getLoggedInUser,editCurrentUser} from '../redux/action'
import NavBar from './Navbar'


 class Setting extends React.Component{
    state={
        user_id:localStorage.current_user,
        name:'',
        user_name:'',
        working_at:'',
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
        this.props.getLoggedInUser()
    }

    handleSubmit= (e)=>{
        e.preventDefault()
        this.props.editCurrentUser(this.state)
        alert("saves changed")
    }


    render(){
        return(
            <React.Fragment>
                <NavBar />
            <div className="edit-form-container">
                <form className="edit-form"  onSubmit={this.handleSubmit}>
                    <div>
                        Name:<input onChange={this.handleFormChange} type="text" value={this.state.name} name="name" placeholder={this.props.loggedIn_user.name} />
                    </div>
                    <div>
                        User Name:<input onChange={this.handleFormChange} type="text" value={this.state.user_name} name="user_name" placeholder={this.props.loggedIn_user.user_name} />
                    </div>
                    <div>
                        Working At<input onChange={this.handleFormChange} type="text" value={this.state.working_at} name="working_at" placeholder={this.props.loggedIn_user.working_at} />
                    </div>
                    <div>
                        Password:<input onChange={this.handleFormChange} type="password" value={this.state.password} name="password" />
                    </div>
                    <div>
                        Mod <select onChange={this.handleSelectChange} value={this.state.mod_id}>
                        {this.props.all_mod.map((mod)=> <option value={mod.id}>{mod.name}</option> )}
                        </select>
                    </div>
                    <input type="submit" value="edit" />
                </form>
            </div>
            </React.Fragment>
        )
    }
}



const mapStateToProps=(state)=>{
    return {
        all_mod:state.all_mod,
        my_mod:state.my_mod,
        loggedIn_user:state.loggedIn_user,
    }
  }
  
  const mapDispatchToProps = {
    getAllMod:getAllMod,
    getMyMod:getMyMod,
    getLoggedInUser:getLoggedInUser,
    editCurrentUser:editCurrentUser,
  }
  
export default connect(mapStateToProps,mapDispatchToProps)(Setting)
  