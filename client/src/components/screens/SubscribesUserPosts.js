import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'
import './post.css'
import moment from 'moment';

import { useLocation } from "react-router";



const Posts  = ()=>{
    const [data,setData] = useState([])
    const {state,dispatch} = useContext(UserContext)
    const { search } = useLocation();

    useEffect(()=>{
       fetch('http://localhost:4000/getsubpost' + search,{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
           setData(result.posts)
       })
    },[search])

    const likePost = (id)=>{
          fetch('http://localhost:4000/like',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId:id
              })
          }).then(res=>res.json())
          .then(result=>{
                   //   console.log(result)
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
          }).catch(err=>{
              console.log(err)
          })
    }
    const unlikePost = (id)=>{
          fetch('http://localhost:4000/unlike',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId:id
              })
          }).then(res=>res.json())
          .then(result=>{
            //   console.log(rfesult)
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
          }).catch(err=>{
            console.log(err)
        })
    }

    const makeComment = (text,postId)=>{
          fetch('http://localhost:4000/comment',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId,
                  text
              })
          }).then(res=>res.json())
          .then(result=>{
              console.log(result)
              const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
             })
            setData(newData)
          }).catch(err=>{
              console.log(err)
          })
    }

    const deletePost = (postid)=>{
        fetch(`http://localhost:4000/deletepost/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
    }
    
   return (

<section>
 
      {
          data.map(item=>{
              return(
                <div className="card mt-3" style={{maxWidth: '42rem'}}>
                  <div>
                     <div className="card-body">
     
     <div className="d-flex mb-3">
       <a href="">
         <img src={item.postedBy.pic}
           className="border rounded-circle me-2" alt="Avatar" style={{height: '40px'}} />
       </a>
       <div>
         <a href="" className="text-dark mb-0">
         <Link to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id :"/profile"  }><strong>{item.postedBy.name}</strong></Link>
         </a>
        <br/>
         <small><span><i className="icon ion-md-pin"></i> <span class="badge badge-secondary">{item.categories}</span></span> - <small className="text-muted">{moment(item.createdAt).fromNow()}</small></small>
                           
       </div>
     </div>
   
     <div>
     <h5  style={{fontWeight:'bold'}}>{item.title}</h5>	
       <p>
       {item.body.slice(0, 200)}
       </p>
     </div>
   </div>
  
   <div className="bg-image hover-overlay ripple rounded-0" data-mdb-ripple-color="light">
   <Link to={`/post/${item._id}`}><img src={item.photo}className="w-100" /></Link>
     <a href="#!">
       <div className="mask" style={{backgroundColor: 'rgba(251, 251, 251, 0.2)'}}></div>
     </a>
   </div>
   
   <div className="card-body">
  
     <div className="d-flex justify-content-between mb-3">
       <div>
            {item.likes.includes(state._id)
        ? 
        <a><i className="fa fa-thumbs-down"   onClick={()=>{unlikePost(item._id)}}></i></a>
        : 
        <a><i className="fa fa-thumbs-up" onClick={()=>{likePost(item._id)}}></i></a>
        }
       <a><span>{item.likes.length} persons had this experience</span></a>
       </div>
       <div>
       <a className="mr-3"><i className="fa fa-comments"></i>{item.comments.length}</a>
                      
           {item.postedBy._id == state._id &&
            <span onClick={()=>deletePost(item._id)}><a><i className="fa fa-trash" ></i></a></span>
          }

       </div>
     </div>
   
     {
                                     (item.comments.slice((item.comments.length - 3), item.comments.length)).map(record=>{
                                        return(
                                            <div className="d-flex mb-3">
                                            {/* <a href="">
                                              <img src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp"
                                                className="border rounded-circle me-2" alt="Avatar" style={{height: '40px'}} />
                                            </a> */}
                                            <div>
                                              <div className="bg-light rounded-3 ">
                                                <a href="" className="text-dark mb-0" style={{textDecoration: 'none'}}>
                                                  <strong>{record.postedBy.name}</strong>
                                                </a>
                                                <a  style={{textDecoration: 'none'}} href="" className="text-muted d-block">
                                                  <small>{record.text}</small>
                                                </a>
                                              </div>
                                            
                                            </div>
                                          </div>
                                        )
                                    })
                                }
    
  
     
       {/* <a href="">
         <img src="https://mdbcdn.b-cdn.net/img/new/avatars/18.webp"
           className="border rounded-circle me-2" alt="Avatar" style={{height: '40px'}} />
       </a> */}

        <form onSubmit={(e)=>{
            e.preventDefault()
            makeComment(e.target[0].value,item._id)
        }}>
           <div className="d-flex ">
       <div className="form-outline w-100">
       <input type="text"   id="" className="form-control form-control-md mw-100"
                        placeholder="leave  an advice" /> 
         <label className="form-label" for="textAreaExample">Write a comment</label>
       </div>
     </div>
       </form>
      
      
    
    
    
     </div>

     
                  </div>
                  </div>
              )
          })
          
      }

   
  
  
</section>
    
   )
}


export default Posts