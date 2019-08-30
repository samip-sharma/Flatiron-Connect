import React from 'react'
import {connect} from 'react-redux'


 class UpcommingEvents extends React.Component{
    render(){
        let eventDate
        let nowDate =String(new Date()).split(" ").slice(1,5).join(" ")
        let arr=this.props.all_mod_events.filter((event)=>{
            eventDate=event.start.split(" " ).slice(0,2).join(" ")
            return new Date(eventDate).getTime() >  new Date(nowDate).getTime()
        })

        arr=arr.map((event)=>{
            return <li>{event.title}-{event.start}</li>
        })
        return(
            <React.Fragment>
                Upcomming Events
                <ul>
                {arr}
                </ul>
            </React.Fragment>
        )
    }
}


const mapStateToProps=(state)=>{
    return {
      all_mod_events:state.all_mod_events
    }
  }
  
  
  export default connect(mapStateToProps)(UpcommingEvents)
  