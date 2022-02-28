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
       fetch('http://localhost:4000/test' + search,{
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
    <div className="container">
       
                    <section className="hero">
                    <div className="container">
                     <div className="row">	
                     {
                         data.map(item=>{
                         return(
                      <div >
                       
                       <div className="cardbox shadow-lg bg-white">
                        
                        <div className="cardbox-heading">
                       
                         <div className="dropdown float-right">
                          <button className="btn btn-flat btn-flat-icon" type="button" data-toggle="dropdown" aria-expanded="false">
                           <em className="fa fa-ellipsis-h"></em>
                          </button>
                          {/* <div className="dropdown-menu dropdown-scale dropdown-menu-right me" role="menu" >
                           <a className="dropdown-item" href="#">Hide post</a>
                           <a className="dropdown-item" href="#">Stop following</a>
                           <a className="dropdown-item" href="#">Report</a>
                          </div> */}
                         </div>
                         <div className="media m-0">
                          <div className="d-flex mr-3">
                           <a href="#"><img className="img-fluid rounded-circle" src={item.postedBy.pic}/></a>
                          </div>
                          <div className="media-body">
                          <Link to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id :"/profile"  }> <p className="m-0">{item.postedBy.name}</p></Link>
                         
                           <small><span><i className="icon ion-md-pin"></i> <span class="badge badge-secondary">{item.categories}</span></span></small>
                           <small><span><i className="icon ion-md-time"></i>{moment(item.createdAt).fromNow()}</span></small>
                          </div>
                         </div>
                        </div>
                        <h5 className='pl-3 pr-3' style={{fontWeight:'bold'}}>{item.title}</h5>	
                        <div className="cardbox-item">
                        <Link to={`/post/${item._id}`}>
                            <img className="img-fluid post-img"   src={item.photo}  alt="Image"/></Link>
                        </div>
                        <div className="cardbox-base">
                         <ul className="float-right">
                          <li><a><i className="fa fa-comments"></i></a></li>
                          <li><a><em className="mr-5">{item.comments.length}</em></a></li>
                          {item.postedBy._id == state._id 
                            &&
                            
                            <li  onClick={()=>deletePost(item._id)}><a><i className="fa fa-trash" ></i></a></li>

                            }
                        


                         
                          {/* <i className="material-icons" style={{
                                float:"right"
                            }} 
                            onClick={deletePost(item._id)}
                            >delete</i> */}
 
                        
                         </ul>
                        
                         <ul>

                         

                        
                           
                         <li>
                         {item.likes.includes(state._id)
                            ? 
                            <a><i className="fa fa-thumbs-down"   onClick={()=>{unlikePost(item._id)}}></i></a>
                            : 
                            <a><i className="fa fa-thumbs-up" onClick={()=>{likePost(item._id)}}></i></a>
                            }
                           
                         </li>
                            <li><a><span>{item.likes.length} persons had this experience</span></a></li>
                         </ul>	

                      
                         <p className='pl-3 pr-3'>{item.body.slice(0, 200)} <i  style={{float: 'right',cursor: 'pointer'}} className="fa fa-ellipsis-h mt-2" aria-hidden="true"></i></p>		   
                        </div>
                        <div className="p-3">
                        <h4 class="mb-4 text-center"> Advice  for {item.postedBy.name}</h4>

                            {
                            
                                    (item.comments.slice((item.comments.length - 3), item.comments.length)).map(record=>{

                                        return(

                                            
                        //                 <h6 key={record._id} >
                        //                        <div className="d-flex mr-3">
                        //    <a href="#"><img className="img-fluid rounded-circle" src={record.postedBy.pic}/></a>
                        //   </div>
                        //                     <span style={{fontWeight:"500"}}>{record.postedBy.name}</span> {record.text}
                                            
                        //                   </h6>

                        <section >
                        <div class="">
                            <div class="row d-flex justify-content-center">
                            <div class="">
                            
                                <div class=" text-dark">
                                <div class="">
                                
                                

                                    <div class="d-flex flex-start">
                                    {/* <img
                                        class="rounded-circle shadow-1-strong me-3"
                                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(23).webp"
                                        alt="avatar"
                                        width="60"
                                        height="60"
                                    /> */}
                                    <div>
                                        <h6 class="fw-bold mb-1">{record.postedBy.name} </h6>
                                        <div class="d-flex align-items-center mb-3">
                                        <p class="mb-0">
                                        {record.text}
                                            {/* <span class="badge bg-primary">Pending</span> */}
                                        </p>
                                        
                                        </div>
                                    
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </section>


                                        )
                                    })
                                }</div>
                        <form className="p-2" onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,item._id)
                                }}>
                                 <input type="text"   id="" className="form-control form-control-md mw-100"
                        placeholder="leave  an advice" /> 
                         </form>



                      
              
                    
                       </div>
                      </div>
                      
                )
            })
        }
                      
 </div>
                    </div>
                   </section>
               


    </div>

    
   )
}


export default Posts