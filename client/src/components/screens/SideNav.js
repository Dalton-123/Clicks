import React from 'react'
import {Link } from 'react-router-dom'

const Side = ()=>{
  return(
    <div >
    <div class="shadow-lg p-4 mb-2 bg-white author">
    <nav id="sidebarMenu" class="collapse d-lg-block sidebar collapse bg-white">
         <div class="position-sticky">
         <div class="list-group list-group-flush mx-3 ">
                 <a
                 href="#"
                 class="list-group-tem  py-2 "
                 aria-current="true"
                 >
               <Link to="/">  <i class="fas fa-home fa-fw me-3"></i><span>For You</span></Link>
                 </a>
                 <a href="#" class="  py-2  ">
                <Link to="/following"> <i class="fas fa-users fa-fw me-3"></i><span>Following</span></Link>
                 </a>

         </div>
         </div>
</nav>


     
    </div>
   </div>
  )
}
export default  Side 