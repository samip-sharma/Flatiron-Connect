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
            <div className="upcomming-events">
                {this.props.loggedIn_user.user_mod && this.props.loggedIn_user.user_mod.accepted?
                <div> 
                    <h4>Upcomming Events</h4>
                    <br />
                    <ul>
                    {arr.length>0? arr :"No upcomming events"}
                    </ul>
                </div>
                :        
                "Not accepted to Mod yet"   
                }
            </div>
        )
    }
}


const mapStateToProps=(state)=>{
    return {
      all_mod_events:state.all_mod_events,
      loggedIn_user:state.loggedIn_user
    }
  }
  
  
  export default connect(mapStateToProps)(UpcommingEvents)
  