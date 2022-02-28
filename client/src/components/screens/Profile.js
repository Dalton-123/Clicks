import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import './profile.css'

function Profile(){
    const [mypics,setPics] = useState([])
    const {state,dispatch} = useContext(UserContext)
    const [image,setImage] = useState("")
    useEffect(()=>{
        fetch('http://localhost:4000/mypost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
            .then(result=>{
                console.log(result)
                setPics(result.mypost)
            })
    },[])
    useEffect(()=>{
        if(image){
            const data = new FormData()
            data.append("file",image)
            data.append("upload_preset","crabClick")
            data.append("cloud_name","UNISS")
            fetch("https://api.cloudinary.com/v1_1/UNISS/image/upload",{
                method:"post",
                body:data
            })
                .then(res=>res.json())
                .then(data=>{


                    fetch('http://localhost:4000/updatepic',{
                        method:"put",
                        headers:{
                            "Content-Type":"application/json",
                            "Authorization":"Bearer "+localStorage.getItem("jwt")
                        },
                        body:JSON.stringify({
                            pic:data.url                        })
                    }).then(res=>res.json())
                        .then(result=>{
                            console.log(result)
                            localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
                            dispatch({type:"UPDATEPIC",payload:result.pic})
                            //window.location.reload()
                        })

                })
                .catch(err=>{
                    console.log(err)
                })
        }
    },[image])
    const updatePhoto = (file)=>{
        setImage(file)
    }
    return(
        <div>
            <section className="section about-section gray-bg" id="about">
                <div className="container">
                    <div className="row align-items-center flex-row-reverse">
                        <div className="col-lg-6">
                            <div className="about-text go-to">
                                <h3 className="dark-color">{state?state.name:"loading"}</h3>
                                <h6 className="theme-color lead">{state?state.email:"loading"}</h6>
                             
                            </div>



                            
                        </div>
                        <div className="col-lg-3 me">
                            <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                                 src={state?state.pic:"loading"}
                            />
                            <div className="mb-3">				
                            <label htmlFor="formFile" className="form-label">Upload Image</label>
			         	<input className="form-control" type="file" id="formFile"
				    onChange={(e)=>updatePhoto(e.target.files[0])}/>
		           </div>
                          
                        </div>
                    </div>
                    <div className="counter">
                        <div className="row">
                           
                            <div className="col-6 col-lg-4">
                                <div className="count-data text-center">
                                    <h6 className="count h2" data-to="150" data-speed="150">{mypics.length}</h6>
                                    <p className="m-0px font-w-600">posts</p>
                                </div>
                            </div>
                            <div className="col-6 col-lg-4">
                                <div className="count-data text-center">
                                    <h6 className="count h2" data-to="850" data-speed="850">{state?state.followers.length:"0"}</h6>
                                    <p className="m-0px font-w-600">followers</p>
                                </div>
                            </div>
                            <div className="col-6 col-lg-4">
                                <div className="count-data text-center">
                                    <h6 className="count h2" data-to="190" data-speed="190">{state?state.following.length:"0"}</h6>
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
                                   mypics.map(item=>{
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
    )

}
export default Profile