import React from 'react'
import {connect} from 'react-redux'
import {getCurrentUser,troggleWorking,addBlog} from '../redux/action'
import Navbar from './Navbar';
import ProfilePic from './ProfilPic'



class Profile extends React.Component{
    state={
        checked:false,
        title:'',
        url:'',
        ppChange:false
    }

    handleCheckboxChange=()=>{
    if (localStorage.clicked_user===localStorage.current_user){
        this.props.troggleWorking()
        this.setState({
            checked:!this.state.checked
        })
    }
    }

    componentDidMount(){
        this.props.getCurrentUser()
        
    }

    handleBlogFormInput=(e)=>{
    if (localStorage.clicked_user===localStorage.current_user){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    }

    handleBlogFormSubmit=(e)=>{
    e.preventDefault()
    if (localStorage.clicked_user===localStorage.current_user){
        this.props.addBlog(this.state.title, this.state.url)
    }
    }

    handleProfileChangeClick=()=>{
        if(localStorage.clicked_user===localStorage.current_user){

            this.setState({
                ppChange:true
            })
        }
    }

    handleProfileChangeClose=()=>{
        this.setState({
            ppChange:false
        })
    }



    render(){
        console.log(this.props)
        let userTweet=[]
        let userBlogs=[]
        const { user_name, name,working_at}=this.props.current_user
        if(this.props.current_user && this.state.checked!==this.props.current_user.working){
            this.setState({
                checked:this.props.current_user.working
            })

        }

        if(this.props.current_user.tweets && this.props.current_user.blogs){
            userTweet= this.props.current_user.tweets.map(tweets => <div>{tweets.content}</div>)
            userBlogs=this.props.current_user.blogs.map(blog=> {
            return <a href= {blog.url} > {blog.title} </a>})
        }



        return(
            <React.Fragment>
                <Navbar/>
                {this.state.ppChange?
                <ProfilePic handleProfileChangeClose={this.handleProfileChangeClose} />
                    :
                    null
            }

                <img className="profile-picture" src={this.props.current_user.image? this.props.current_user.image.url :"https://pbs.twimg.com/profile_images/1149340751265980417/s0j8V4p3_400x400.png" } alt="default pic"></img>
                <button onClick={this.handleProfileChangeClick}>change image</button>
                <div className="profile-detail" >
                    <div>name:{name}</div>
                    <div>user Name:{user_name}</div>
                    <div>working:

                    <input type="checkbox" onChange={this.handleCheckboxChange} checked={this.state.checked}></input>

                    </div>
                    <div>working_at:{working_at}</div>

                </div>

                <br />
                <div className="profile-tweets">
                    TWEETS
                    {userTweet}
                </div>

                <br />
                <div className="profile-blogs">
                    BLOGS 
                    {userBlogs}
                    <div className="profile-blog-form">
                        <form onSubmit={this.handleBlogFormSubmit}>
                            <input onChange={this.handleBlogFormInput} value={this.state.title} type="text" placeholder="title" name="title"  />
                            <input onChange={this.handleBlogFormInput} value={this.state.url} type="text" placeholder="url" name="url"  />
                            <input type="submit" value="post new blog" />

                        </form>
                    </div>
                </div>
                


                
            </React.Fragment>
        )
    }
}



const mapStateToProps=(state)=>{
    return {
        current_user:state.current_user
    }
  }
  
  const mapDispatchToProps = {
    getCurrentUser:getCurrentUser,
    troggleWorking:troggleWorking,
    addBlog:addBlog
  }
  
export default connect(mapStateToProps,mapDispatchToProps)(Profile)
  