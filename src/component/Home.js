import React from 'react'
import Navbar from './Navbar'

export default class Home extends React.Component{

    componentDidMount(){
        this.props.allTweets()
    }
    render(){
        if (!localStorage.token) this.props.history.push("/")
        return(
            <React.Fragment>
                <Navbar />
                {
                this.props.all_tweets.map((tweet)=> {
                return <div className="each-Tweet"> 
                {tweet.content}
                </div>}
                )}
            </React.Fragment>
        )
    }
}