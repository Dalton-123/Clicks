import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'
const Update  = ()=>{
    const [data,setData] = useState([])
    const {state,dispatch} = useContext(UserContext)
  
    useEffect(()=>{
       fetch('http://localhost:4000/allusers',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
           setData(result.users)
       })
    },[])
   

 
   return (
    <div>
  
<div class="rightbarProfileImgContainer " >
    <div class="row">
        <div class=" layout-spacing">
            <div class="card">
                <div class="widget-header">
                    <div class="row">
                        {/* <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                            <h4 class="pb-0">Stories</h4>
                        </div> */}
                    </div>
                </div>
                <div class="widget-content widget-content-area">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <div id="content_2" class="tabcontent"> 
                                <div class="story-container-2">
                                    <p class="">Recently Added</p>

                                    { 
                                        data.map(item=>{
                                            return(
                                                <div>



                                                <div>
                                                            {item._id !== state._id
                                                                ? <div class="single-story">
                                                                <div class="story-dp unseen">
                                                                <img src={item.pic}/>
                                                                </div>
                                                                <div class="story-author">
                                                                <Link to={`/profile/${item._id}`} style={{textDecoration: 'none'}}> <p class="name">{item.name}</p></Link>
                                                                    <p class="time">{item.followers.length} followers</p>
                                                                </div>
                                                            </div>
                                                                : <div></div>
                                                            }
                                                    </div>
                                                    
                                                 
                                                
                                                

                                              
                                              
                                              
                                                </div>
                                               
                                            )
                                        })
                                    }
                                   <div class=" ">
                    <a class="text-primary strong" href="#">View All</a>
                </div>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               
            </div>
        </div>
    </div>
</div>



    </div> 

   

    
   )
}


export default Update

