import React, { Component } from "react";
import {HEADERS,API} from '../constants/constants'
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Navbar from './Navbar'
const localizer = momentLocalizer(moment)

class Calender extends Component {
  state = {
    events: [
      {
        start: new Date(),
        end: new Date(moment().add(2, "days")),
        title: "Some title"
      }
    ]
  };

  onSubmit(){
   
  }

  render() {
    return (
      <div>
        <Navbar/>
        <div className="Calender">
          <Calendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={this.state.events}
            style={{ height: "50vh" }}
          />
        </div>
        <br></br><br></br><br></br>
        <div>
          <form>
            <input type="text" name="title" placeholder="Event Title"/>
            <input type="text" name="start" placeholder="Event start date"/>
            <input type="text" name="end" placeholder="Event end date"/>
            <input type="submit" value="create event" />
          </form>
        </div>
      </div>
    );
  }
}

export default Calender;