import React from 'react'
import Navbar from './Navbar'
// import UpcommingEvents from './UpcommingEvents'
import Sidebar from './Sidebar'



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
        this.setState({
            content:""
        })
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
            <div className="homepage-container">
                <div className="homepage-tweet-form">
                    <form onSubmit={this.handlePostSubmit}>
                        <input value={this.state.content} onChange={this.handleInputChange} type="text" name="content" placeholder={`What's in mind, ${this.props.loggedIn_user.name}?`} />
                        <input  type="submit" value="post" />
                        
                    </form>
                    

                    <div className="homepage-tweets">
                        {
                        this.props.all_tweets.map((tweet)=> {
                        return <div className="each-Tweet"> 
                        <span onClick={()=>this.handleUserClick(tweet.user.id)}><span className="user-name">{tweet.user.name}</span></span>
                        -{tweet.content}
                        </div>}
                        )}
                    </div>
                </div>
                

                <div>
                    <div>

                </div>

                <Sidebar />
                </div>
                
            </div>

            </React.Fragment>
        )
    }
}