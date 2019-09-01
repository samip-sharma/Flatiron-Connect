import React from "react"
import {connect} from 'react-redux'

class Admin extends React.Component {
render(){
    return(
        <React.Fragment>
          Create Mod
          <form>
            <input type="text" />
          </form>
        </React.Fragment>
    )
}
}


const mapStateToProps=(state)=>{
    return {
        // current_user:state.current_user
    }
  }


  const mapDispatchToProps = {
    // getCurrentUser:getCurrentUser,
  }


export default connect(mapStateToProps,mapDispatchToProps)(Admin)

