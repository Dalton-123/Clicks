import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'
import './profile.css'

function Profile(){
    const [userProfile,setProfile] = useState(null)
    
    const {state,dispatch} = useContext(UserContext)
    const {userid} = useParams()
    const [showfollow,setShowFollow] = useState(state?!state.following.includes(userid):true)
    useEffect(()=>{
       fetch(`http://localhost:4000/user/${userid}`,{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           //console.log(result)
         
            setProfile(result)
       })
    },[])


    const followUser = ()=>{
        fetch('http://localhost:4000/follow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
        
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
             localStorage.setItem("user",JSON.stringify(data))
             setProfile((prevState)=>{
                 return {
                     ...prevState,
                     user:{
                         ...prevState.user,
                         followers:[...prevState.user.followers,data._id]
                        }
                 }
             })
             setShowFollow(false)
        })
    }
    const unfollowUser = ()=>{
        fetch('http://localhost:4000/unfollow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
             localStorage.setItem("user",JSON.stringify(data))
            
             setProfile((prevState)=>{
                const newFollower = prevState.user.followers.filter(item=>item != data._id )
                 return {
                     ...prevState,
                     user:{
                         ...prevState.user,
                         followers:newFollower
                        }
                 }
             })
             setShowFollow(true)
             
        })
    }
    return(
        <>
        {userProfile ?
         <div>
         <section className="section about-section gray-bg" id="about">
             <div className="container">
                 <div className="row align-items-center flex-row-reverse">
                     <div className="col-lg-6">
                         <div className="about-text go-to">
                             <h3 className="dark-color">{userProfile.user.name}</h3>
                             <h6 className="theme-color lead">{userProfile.user.email}</h6>
                             {showfollow?
                             <button type="button"   onClick={()=>followUser()} class="btn btn-primary">follow</button>
                               : 
                               <button type="button"   onClick={()=>unfollowUser()} class="btn btn-danger">unfollow</button>
                            }
                         </div>



                         
                     </div>
                     <div className="col-lg-3 me">
                         <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                              src={userProfile.user.pic}
                         />
                       
                       
                     </div>
                 </div>
                 <div className="counter">
                     <div className="row">
                        
                         <div className="col-6 col-lg-4">
                             <div className="count-data text-center">
                                 <h6 className="count h2" data-to="150" data-speed="150">{userProfile.posts.length}</h6>
                                 <p className="m-0px font-w-600">posts</p>
                             </div>
                         </div>
                         <div className="col-6 col-lg-4">
                             <div className="count-data text-center">
                                 <h6 className="count h2" data-to="850" data-speed="850">{userProfile.user.followers.length}</h6>
                                 <p className="m-0px font-w-600">followers</p>
                             </div>
                         </div>
                         <div className="col-6 col-lg-4">
                             <div className="count-data text-center">
                                 <h6 className="count h2" data-to="190" data-speed="190">{userProfile.user.following.length}</h6>
                                 <p className="m-0px font-w-600">following   </p>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
         </section>
         <div class="container myprofile" >
                            <div class="row">



                            {
                   userProfile.posts.map(item=>{
                       return(
                        <div class="col-sm-4">
                        <div class="gal-detail thumb">
                            <a href="#" class="image-popup" title="Screenshot-2">
                                <img src={item.photo} class="thumb-img" alt="work-thumbnail"/>
                            </a>
                            <h4 class="text-center">{item.title}</h4>
                            <div class="ga-border"></div>
                            <p class="text-muted text-center"><small>{item.postedBy.name}</small></p>
                        </div>
                    </div>  
                       )
                   })
               }

                             



                                

                              
                            </div>
                        </div>
        
                     

     </div>
        
        : <h3>loading...!</h3>}
        
        </>
    )

}
export default Profile