
import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'
import { useLocation } from "react-router";
import {Button,Modal} from 'react-bootstrap'
import GetCategory from './GetCategories'
import axios from 'axios'
import './singlePost.css'
const SinglePost = ()=>{
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [data,setData] = useState([])

  const [titles, setTitles] = useState("");
  const [bodys, setBodys] = useState("");
  const [pic, setPic] = useState("");
  const [id, setId] = useState("");
  const [user, setUser] = useState("");
  const [mycomment, setMyComment] = useState("");
  
  const [comments, setComments] = useState([]);
  const [userpic, setUserPic] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [tit, setTitle] = useState("");
  const [body, setBody] = useState("");
  useEffect(()=>{
     fetch('http://localhost:4000/post/' + path,{
         headers:{
             "Authorization":"Bearer "+localStorage.getItem("jwt")
         }
     }).then(res=>res.json())
     .then(result=>{
     setTitle(result.posts.title)
     setBody(result.posts.body)
   setPic(result.posts.photo)
   setId(result.posts._id)
   setUserPic(result.posts.postedBy.pic)
   setComments(result.posts.comments)
   setUser(result.posts.postedBy.name)
   
  })
  },[])


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


const handleUpdate = () => {
 
  const article = { title:titles,body:bodys };
  console.log(article)
  const headers = { 
      Authorization:"Bearer "+localStorage.getItem("jwt")
  };
  axios.put('http://localhost:4000/' + path, article, { headers })
      .then((response)=>{
        console.log(response)
        setTitle(response.data.title)
     setBody(response.data.body)
      }).then(()=>{
        setShow(false)
      })
  }

   
   return (
<main class=" mb-5">
<div class="container ">

  <div class="row">
    
    <div class="col-md-8 mb-4">
   
      <section class="border-bottom mb-4">
        <img src={pic}
          class="img-fluid shadow-2-strong rounded-5 mb-4 singlepost-img" width="100%" alt="" />
<div >
      <h1 class="mb-0 h4">{tit}</h1>
    </div>
        <div class="row align-items-center mb-4 mt-3">
          <div class="col-lg-6 text-center text-lg-start mb-3 m-lg-0">
            <img src={userpic} class="rounded-5 shadow-1-strong me-2  rounded-circle"
              height="35" alt="" loading="lazy" />
              
            <a href="" class="text-dark">{user}</a>
          </div>

          <div class="col-lg-6 text-center text-lg-end">
            <button type="button" class="btn btn-primary px-3 me-1" >
              <i className="fa fa-edit" onClick={handleShow}></i>
            </button>
            <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                  <div>
                  <input type="text" id="form3Example4" class="form-control form-control-lg"
                placeholder="Title" 
                value={titles}
                onChange={(e)=>setTitles(e.target.value)}
                
                
                />
                  </div>
               <div>
               <br/>
               <input type="text" id="form3Example4" class="form-control form-control-lg"
                placeholder=" body" 
                value={bodys}
                onChange={(e)=>setBodys(e.target.value)}
                
                
                />
               </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                        Close
                        </Button>
                        <Button  onClick={handleUpdate}        variant="primary">
                        Save Changes
                        </Button>
                    </Modal.Footer>
                    </Modal>
                               
            
          </div>
        </div>
      </section>
      
      <section>
        <p>
          {body}
        </p>

        
      </section>
  
      
     
     
      {/* <section class="border-bottom mb-3">
        <p class="text-center"><strong>Comments: 3</strong></p>
  
        
        {
            comments.map(record=>{
                return(
                  <div class="row mb-4">
                  <div class="col-2">
                    <img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(26).jpg"
                      class="img-fluid rounded-circle shadow-1-strong rounded-5 "  height="50" width="50"  lt="" />
                  </div>
                
                  <div class="col-10">
                    <p class="mb-2"><strong>{record.postedBy.name}</strong></p>
                    <p>
                    {record.text}
                    </p>
                  </div>
                  
                </div>
                )
            })
        }
            



       
      </section> */}
       <p class="text-center"><strong>Leave an advice</strong></p>
      <div class="container mt-5">
    <div class="d-flex row">
        <div class="col-md-8">
            <div class="d-flex flex-column comment-section">


            {
                                    comments .map(record=>{
                                        return(
                                          <div class="bg-white p-2" key={record._id}>
                                          <div class="d-flex flex-row user-info">
                                            {/* <img class="rounded-circle" src={record.postedBy.pic} width="40"/> */}
                                              <div class="d-flex flex-column justify-content-start ml-2"><span class="d-block font-weight-bold name">{record.postedBy.name}</span>
                                              {/* <span class="date text-black-50">Shared publicly - Jan 2020</span> */}
                                              </div>
                                          </div>
                                          <div class="mt-2">
                                              <p class="comment-text">{record.text}</p>
                                          </div>
                                      </div>
                                        )
                                    })
                                }

              
                {/* <div class="bg-white">
                    <div class="d-flex flex-row fs-12">
                        <div class="like p-2 cursor"><i class="fa fa-thumbs-o-up"></i><span class="ml-1">Like</span></div>
                        <div class="like p-2 cursor"><i class="fa fa-commenting-o"></i><span class="ml-1">Comment</span></div>
                        <div class="like p-2 cursor"><i class="fa fa-share"></i><span class="ml-1">Share</span></div>
                    </div>
                </div> */}
                <div class="bg-light p-2">
                    <div class="d-flex flex-row align-items-start">
                      {/* <img class="rounded-circle" src="https://i.imgur.com/RpzrMR2.jpg" width="40"/> */}
                    <textarea class="form-control ml-1 shadow-none textarea"
                     value={mycomment}
                     onChange={(e)=>setMyComment(e.target.value)}
                    
                    
                    >
                      </textarea></div>
                    <div class="mt-2 text-right"><button  onClick={()=>makeComment(mycomment,id)} class="btn btn-primary btn-sm shadow-none" type="button">Post comment</button></div>
                </div>
            </div>
        </div>
    </div>
</div>
      <section>
       

        <div>
          
  
         
         

          
        

        
          
        </div>
      </section>
     
    </div>
   

 
    <div class="col-md-4 mb-4">
    
    <GetCategory/>
    </div>
    
  
  
  
  
  </div>
  
</div>
</main>
    
   )
}


export default SinglePost


















