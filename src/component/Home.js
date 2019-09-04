import React from 'react'
import Navbar from './Navbar'
import UpcommingEvents from './UpcommingEvents'



export default class Home extends React.Component{

    state={
        content:''
    }

    componentDidMount(){
        this.props.allTweets()
        this.props.getModEvents()
    }

    handleInputChange=(e)=>{
        this.setState({
            content:e.target.value
        })
    }

    handlePostSubmit=(e)=>{
        e.preventDefault()
        this.props.addNewTweet(this.state)
    }

    handleUserClick=(id)=>{
        localStorage.clicked_user=id
        this.props.history.push("/profile")
    }

    render(){
        if (!localStorage.token) this.props.history.push("/")
        // console.log(this.props)
        return(
            <React.Fragment>
                <Navbar />
                <UpcommingEvents />
                <form onSubmit={this.handlePostSubmit}>
                    <input value={this.state.content} onChange={this.handleInputChange} type="text" name="content" placeholder="Anything in mind?.." />
                    <input type="submit" value="post" />
                </form>
                {
                this.props.all_tweets.map((tweet)=> {
                return <div className="each-Tweet"> 
                <span onClick={()=>this.handleUserClick(tweet.user.id)}>{tweet.user.name}</span>
                -{tweet.content}
                </div>}
                )}
            </React.Fragment>
        )
    }
}