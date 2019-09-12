import React from 'react'
import {connect} from 'react-redux'
import {getAllImage,changeProfilePic} from '../redux/action'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';



class ProfilPic extends React.Component{


    state = {
        modal14: false
      }
      
      toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
          [modalNumber]: !this.state[modalNumber]
        });
      }

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
            <MDBContainer style={{margin:"0", padding:"0"}}>
        <MDBBtn color="primary" onClick={this.toggle(14)}>Change ProfilePic</MDBBtn>
        <MDBModal isOpen={this.state.modal14} toggle={this.toggle(14)} centered>
          <MDBModalHeader toggle={this.toggle(14)}>Pictures</MDBModalHeader>
          <MDBModalBody>
          {arr}
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.toggle(14)}>Close</MDBBtn>

          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
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
  