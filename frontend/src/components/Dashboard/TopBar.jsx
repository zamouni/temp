import './bars.css';
import { useContext } from 'react';
import { GiCampingTent } from "react-icons/gi";
import { Menu } from '../../context/MenuContext';
import { WindowSize } from '../../context/WindowContext';
import { IoLogOut } from "react-icons/io5";

import { FaBars , FaUser} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";

import { DropdownButton, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Cookie from 'cookie-universal';
import LoadingSubmit from '../Loading/loading';

import { useUser } from '../../context/UserContext';

export default function TopBar() {
    const { user, loading, isAuthenticated } = useUser();
  
  const menu = useContext(Menu);
  const { isOpen, setIsOpen } = menu;
  
  const WindowContext =useContext(WindowSize);
  const windowSize =WindowContext.windowSize;

  const cookie = Cookie();

  if (loading) {
    return <LoadingSubmit />;
  } 

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  async function handleLogout() {
    try {
      //await Axios.get(`/${LOGOUT}`);
      cookie.remove('camp');
      cookie.remove('user');
      window.location.pathname = '/login';
    } catch (err) {
      console.log(err);
    }
  }

  return (
  
<div className="top-bar"   style={{
  width: windowSize >'768' ? `calc(100% - ${isOpen ? '270px' : '90px'})` : `calc(100% - ${isOpen ? '00px' : '0px'})` ,
  
}}>
  <div className="d-flex align-items-center h-100 justify-content-between px-3" >
   
    <div className="d-flex align-items-center"  style={{
  marginLeft: windowSize <'768' && isOpen ? '260px' :'0px', transition:' margin-left 0.5s ease' ,
  
}}>
      <FaBars 
        onClick={() => setIsOpen(prev => !prev)}
        cursor={'pointer'}
        
        className="menu-icon"
      />
    </div>
    
    <div className=" d-flex align-items-center justify-content-end" >
<DropdownButton id=" dropdown-basic-button"  variant="transparent" title={<FaUser  className='fs-4 d-inline' />}>
    <div className="user-info"> 
        <FaUser className='fs-4'/>
        <div>
            <strong>{user.name}</strong>
            <div>{user.mail}</div>
        </div>
    </div>
     <div className="dropdown-divider"></div>
     {user.type==="admin" &&
        <Dropdown.Item className="dropdown-item p-2 d-flex align-items-center">
            <IoSettingsSharp className="me-2 fs-4" /> 
            <Link className="text-decoration-none text-body" to={`/dashboard/users/${user.id}`}>
                Setting
            </Link>
        </Dropdown.Item>
} 
    <Dropdown.Item className="dropdown-item p-2 d-flex align-items-center" onClick={handleLogout}>
        <IoLogOut  className="me-2 fs-4" /> 
        Logout
    </Dropdown.Item>
</DropdownButton>

    </div>
  </div>
</div>

  );
}
