
import React,{ useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import "./sidebar.css";

const Cat = ()=> {
    const [data,setData] = useState([])
 
  

    useEffect(()=>{
       fetch('http://localhost:4000/categories',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
           setData(result.categories)
       })
    },[])

  return (
    <div className="mt-4">
    <div>
    <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse bg-white">
         <div className="position-sticky">
         <div className="list-group list-group-flush mx-3">
             <h5>Categories</h5>
         {data.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link">
               <a>
                 <i  style={{color:'black',marginBottom:'10px'}} aria-hidden="true" href="#" className={c.icon}></i><span style={{color:'grey'}}> {c.name}</span>
              </a>
            </Link>
          ))}
             </div>
         </div>
</nav>


     
    </div>
   </div>
    
  );
}
export default Cat