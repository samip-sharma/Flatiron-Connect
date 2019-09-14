import React, { Component } from "react";
// import {HEADERS,API} from '../constants/constants'
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Navbar from './Navbar'
import UpcommingEvents from "./UpcommingEvents";
// import addNewEvent from '../redux/action'

// import events from "./eventexample";
const localizer = momentLocalizer(moment)

class Calender extends Component {
  state = {
    title:"",
    start_date:'',
    end_date:'',
    start_time:"",
    end_time:""
  };

  
  onSubmit=(e)=>{
    e.preventDefault()
   if(this.state.start_date.split("-").length===3 &&
   this.state.end_date.split("-").length===3 &&
   this.state.start_time.split(":").length===2 &&
   this.state.end_time.split(":").length===2 
   ) {this.props.addNewEvent(this.state)
   }
  }

  handleFormChange=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  componentDidMount=()=>{
    // if(this.props.all_mod_events.length===0){
      this.props.getModEvents()
    // }
  }

  

  eventDatesHelper = async()=>{
    
  }

  render() {
    console.log(this.props)
    return (
      <React.Fragment>
        <Navbar/>
      <div className="calender-component">
        <div className="Calender">
          <Calendar
            
            localizer={localizer}
            getNow={() => new Date()}
            events={this.props.loggedIn_user.user_mod && this.props.loggedIn_user.user_mod.accepted? this.props.all_mod_events :[]}
            style={{ height: "40vh" }}
          />
        </div>
        
        {this.props.loggedIn_user.user_mod && this.props.loggedIn_user.user_mod.accepted?
          <div className="calender-form">
          <form  onSubmit={this.onSubmit}>
            <div className="calender-flex">
                <div className="start-date">
                  <h4>Start date </h4> 
                    <input onChange={this.handleFormChange} value={this.state.title} type="text" name="title" placeholder="Event Title" required/>
                    <input type="date" onChange={this.handleFormChange} value={this.state.start_date} name="start_date" placeholder="Start date(M/dd/YYYY)" required/>
                    <input type="time" onChange={this.handleFormChange} value={this.state.start_time} name="start_time" placeholder="Start time(HH:MM)" required/>
                </div>

                <div className="end-date">
                  <h4>End date</h4>
                  <input type="date" onChange={this.handleFormChange} value={this.state.end_date} name="end_date" placeholder="End date(M/dd/YYYY)" required/>
                  <input type="time" onChange={this.handleFormChange} value={this.state.end_time} name="end_time" placeholder="End time(HH:MM)" required/>
                </div>

                <UpcommingEvents />
            </div>
          <div className="event-submit-btn">
            <input style={{width:"150px", textAlign: "center", alignSelf:"center"}} className="create-event" type="submit" value="create event" />
            </div>
          </form>
        </div>
          :

         <div className="calender-form" >"Not accepted in a Mod yet" </div>
        }
      </div>
      </React.Fragment>
    );
  }
}

export default Calender;