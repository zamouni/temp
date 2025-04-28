import './bars.css';
import {NavLink} from 'react-router-dom';
import { Menu } from '../../context/MenuContext';
import { WindowSize } from '../../context/WindowContext';

import { useContext } from 'react';
import { GiCampingTent } from "react-icons/gi";
import { useUser } from '../../context/UserContext';
import LoadingSubmit from '../Loading/loading';
import { FaUser} from "react-icons/fa";


export default function SideBar() {
  const { user, loading, isAuthenticated } = useUser();

const menu =useContext(Menu);
const isOpen=menu.isOpen;
const WindowContext =useContext(WindowSize);
const windowSize =WindowContext.windowSize;

if (loading) {
  return <LoadingSubmit />;
} 

if (!isAuthenticated()) {
  return <Navigate to="/login" replace />;
}



  return (
  <><div  style={{position:'fixed' ,  left:'0',
  width:'100%',minHeight:'100dvh', backgroundColor:'rgba(0,0,0,0.2)',
   display:windowSize<'768' && isOpen? "block" : "none"}}></div>
    <div className="side-bar pt-3" style={{
    left:windowSize<'768' ? isOpen ? 0: '-100%':0,
    width:isOpen? "250px":"70px",
    position:windowSize<'768' ? "fixed" : "sticky",
    color:'#038edc',transition: 'left 0.5s ease, width 0.5s ease'
    }}>
    <div className="{` d-flex align-items-center logo ${isOpen ? 'side-bar-expanded' : 'side-bar-collapsed'}`}">
    <GiCampingTent className='sidebar-icon icon-collapsed'/>
     <h4 className=" m-0" style={{ display: isOpen ? "block" : "none" }}>Dashboard</h4>
    </div>
    
    { user.type==="admin" && 
     <NavLink 
  
  to="/dashboard/users"
  className={`side-bar-link d-flex align-items-center gap-2 ${isOpen ? 'side-bar-expanded' : 'side-bar-collapsed'}`}
>
  <FaUser 
    className='sidebar-icon icon-collapsed'
    
  />
  <p className="m-0" style={{ display: isOpen ? "block" : "none" }}>
    Users
  </p>
</NavLink>}

<NavLink 
  
  to="/dashboard/camps"
  className={`side-bar-link d-flex align-items-center gap-2 ${isOpen ? 'side-bar-expanded' : 'side-bar-collapsed'}`}
>
  <GiCampingTent 
    className='sidebar-icon icon-collapsed'
    
  />
  <p className="m-0" style={{ display: isOpen ? "block" : "none" }}>
    Camps
  </p>
</NavLink>


   
    </div></>
  );
}
