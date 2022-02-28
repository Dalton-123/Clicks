import React,{useContext,useRef,useEffect,useState} from 'react'
import {Link ,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import M from 'materialize-css'
import {Button,Modal} from 'react-bootstrap'
const NavBar = ()=>{
    const  searchModal = useRef(null)
    const [search,setSearch] = useState('')
    const [userDetails,setUserDetails] = useState([])
     const {state,dispatch} = useContext(UserContext)
     const history = useHistory()
     const [show, setShow] = useState(false);

     const handleClose = () => setShow(false);
     const handleShow = () => setShow(true);
     useEffect(()=>{
         M.Modal.init(searchModal.current)
     },[])
     const renderList = ()=>{
       if(state){
           return [
            
          <li class="nav-item me-3 me-lg-1" onClick={handleShow}>
       <a class="nav-link" href="#">
          <span><i class="fas fa-search fa-lg"></i></span>
        </a>
      </li>,
      <li class="nav-item me-3 me-lg-1">
        <Link to="/create"><a class="nav-link" href="#">
          <span><i class="fas fa-plus-circle fa-lg"></i></span>
        </a></Link>
      </li>,
     
      <li class="nav-item me-3 me-lg-1">
          <a class="nav-link" href="#"    onClick={()=>{
              localStorage.clear()
              dispatch({type:"CLEAR"})
              history.push('/signin')
            }}>
            <span><i class="fas fa-sign-out-alt fa-lg"></i></span>
          </a></li>,

          <li class="nav-item me-3 me-lg-1">
       <Link to="/Profile"> <a class="nav-link d-sm-flex align-items-sm-center" href="#">
       <span><i class="fas fa-user-alt fa-lg"></i></span>
          <strong class="d-none d-sm-block ms-1"></strong>
        </a></Link>
      </li>
           
         
            
           ]
       }else{
         return [
          <li class="nav-item me-3 me-lg-1">
          <a class="nav-link" href="#">
           <Link to="/signup"> <span><i class="fas fa-user-plus fa-lg"></i></span></Link>
          </a>
        </li>,
          <li class="nav-item me-3 me-lg-1">
          <a class="nav-link" href="#">
            <Link to="/signin"> <span><i class="fas fa-sign-in-alt fa-lg"></i></span></Link>
          </a>
        </li>
         
         ]
       }
     }


     const fetchUsers = (query)=>{
        setSearch(query)
        fetch('http://localhost:4000/search-users',{
          method:"post",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            query
          })
        }).then(res=>res.json())
        .then(results=>{
          setUserDetails(results.user)
        })
     }
    return(
     
      <div>
   
        <nav class="navbar navbar-expand-lg navbar-light bg-light ">
            <div class="container-fluid justify-content-between">
   
        <div class="d-flex">
      
      <Link to="/">
      <a class="navbar-brand me-2 mb-1 d-flex align-items-center" href="#">
        <img
          src="./LogoMakr.png"
          height="40"
       
          loading="lazy"
          // style="margin-top: 2px;"
        />
      </a>
      </Link>

     
     
    </div>
 
  

    <ul class="navbar-nav flex-row">
     
    {renderList()}
    </ul>
  </div>
  <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
             <input
              autocomplete="off"
              type="search"
              class="form-control rounded"
              placeholder="search users"
            value={search}
            onChange={(e)=>fetchUsers(e.target.value)}
            />
             <ul className="collection">
               {userDetails.map(item=>{
                 return <Link to={item._id !== state._id ? "/profile/"+item._id:'/profile'} >
                   <ul class="list-group">
                        <li class="list-group-item " style={{textDecoration:'none'}} aria-current="true">{item.email}</li>
                       
                  </ul>
                </Link>
               })}
               
              </ul>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
</nav>

      </div>
    )
}


export default NavBar