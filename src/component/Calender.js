import React, { Component } from "react";
import {HEADERS,API} from '../constants/constants'
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Navbar from './Navbar'
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
    if(this.props.all_mod_events.length===0){
      this.props.getModEvents()
    }
  }

  

  eventDatesHelper = async()=>{
    
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <Navbar/>
        <div className="Calender">
          <Calendar
            
            localizer={localizer}
            // startAccessor="start"
            // endAccessor="end"
            getNow={() => new Date()}
            events={this.props.all_mod_events}
            style={{ height: "50vh" }}
            // onSelectEvent={console.log}
          />
        </div>
        <br></br><br></br><br></br>
        <div>
          <form onSubmit={this.onSubmit}>
           Start date  
           <input onChange={this.handleFormChange} value={this.state.title} type="text" name="title" placeholder="Event Title"/>
            <input type="date" onChange={this.handleFormChange} value={this.state.start_date} name="start_date" placeholder="Start date(M/dd/YYYY)"/>
            <input type="time" onChange={this.handleFormChange} value={this.state.start_time} name="start_time" placeholder="Start time(HH:MM)"/>
            End date
            <input type="date" onChange={this.handleFormChange} value={this.state.end_date} name="end_date" placeholder="End date(M/dd/YYYY)"/>
            <input type="time" onChange={this.handleFormChange} value={this.state.end_time} name="end_time" placeholder="End time(HH:MM)"/>
            <input type="submit" value="create event" />
          </form>
        </div>
      </div>
    );
  }
}

export default Calender;