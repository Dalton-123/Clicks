import React,{useState,useEffect} from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'
const CretePost = ()=>{
    const history = useHistory()
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    const [cat, setCat] = useState("")
    useEffect(()=>{
       if(url){
        fetch("http://localhost:4000/createpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title,
                body,
             
                pic:url,
                categories:cat,
            })
        }).then(res=>res.json())
        .then(data=>{
    
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               M.toast({html:"Created post Successfully",classes:"#43a047 green darken-1"})
               history.push('/')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    },[url])
  
   const postDetails = ()=>{

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
          setUrl(data.url)
       })
       .catch(err=>{
           console.log(err)
       })

    
   }
 

   return(
   
 


<main class="mt-4 mb-5">
  <div class="container">
 
    <div class="row">
    
      <div class="col-md-8 mb-4">
     
        <section class="border-bottom mb-4">
          <img src="https://mdbootstrap.com/img/Photos/Slides/img%20(144).jpg"
            class="img-fluid shadow-2-strong rounded-5 mb-4" alt="" />
            
       </section>
     
      
          <p class="text-center"><strong>Create Your Post</strong></p>

          <div>
          
            <div class="form-outline mb-4">
            <label class="form-label" for="form4Example1">Title</label>
              <input type="text" id="form4Example1" class="form-control"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
              
              />
              
            </div>

           
            {/* <div class="form-outline mb-4">
              <input type="email" id="form4Example2" class="form-control" />
              <label class="form-label" for="form4Example2">Email address</label>
            </div> */}

            <div class="form-outline mb-4">
            <label class="form-label" for="form4Example3">Body</label>
              <textarea class="form-control" id="form4Example3" rows="4"
              value={body}
              onChange={(e)=>setBody(e.target.value)}
              
              
              ></textarea>
             
            </div>

            <label class="form-label" for="form4Example3">Category</label>
            <select class="form-select orm-outline mb-4"
             onChange={(e)=>setCat(e.target.value)}
             aria-label="Default select example">
              <option selected>{cat}</option>
              <option value="Music">Music</option>
              <option value="Love">Love</option>
              <option value="Sport">Sport</option>
              <option value="Relationship">Relationship</option>
              <option value="Romance">Romance</option>
              <option value="Politics">Politics</option>
              <option value="Religious">Religious</option>
              <option value="Drama">Drama</option>
              <option value="Ideas">Ideas</option>
              <option value="Finance">Finance</option>
              <option value="Purpose">Purpose</option>
              <option value="Nutrition">Nutrition</option>
              <option value="Business">Business</option>
            

    </select>
           
            		<div className="mb-3">
				<label htmlFor="formFile" className="form-label">Upload Image</label>
			<input className="form-control" type="file" id="formFile"
				   onChange={(e)=>setImage(e.target.files[0])} />
			</div>

     
            <button type="submit" class="btn btn-primary btn-block mb-4" onClick={()=>postDetails()}>
              Publish
            </button>
          </div>
        
       
      </div>
    
   



      </div>
      </div>
    
  
 
</main>
   )
}


export default CretePost