import React from 'react'
import {connect} from 'react-redux'
import {getAllImage,changeProfilePic} from '../redux/action'


class ProfilPic extends React.Component{

    componentDidMount(){
        this.props.getAllImage()
    }

    handlePpChange=(id)=>{
        this.props.changeProfilePic(id)
    }

    render(){
        let arr=this.props.all_image.map(image=>{
            return <img onClick={(e)=>this.handlePpChange(image.id)} key={image.id} className="each-profile-pic" src={image.url} alt="profile pic" />
        })
        return(
            <React.Fragment>
            <div className="modale">
                <header>
                    <button onClick={this.props.handleProfileChangeClose}>X</button>
                </header>
                {arr}
            
            </div>
            </React.Fragment>
        )
    }
}


const mapStateToProps=(state)=>{
    return {
        all_image:state.all_image
    }
  }
  
  const mapDispatchToProps = {
    getAllImage:getAllImage,
    changeProfilePic:changeProfilePic
  }
  
export default connect(mapStateToProps,mapDispatchToProps)(ProfilPic)
  