import {Routes, Route, Navigate} from 'react-router-dom';

import AdminPanel from './components/Dashboard/AdminPanel';
import Camp from './components/Dashboard/Camp';
import CustomToaster from './components/CustomToast';
import RequireAuth from './pages/Auth/Protecting/RequireAuth';
import RequireBack from './pages/Auth/Protecting/RequireBack';
import Login from './pages/Auth/Auth/Login';
import Register from './pages/Auth/Auth/Register';
import Err403 from './pages/Auth/Error/403';
import Dashboard from './pages/Dashboard/Dashboard';


export default function App() {
  return (
    <div>
      <CustomToaster />
    <Routes>
   				 {/* Public Routes */}
    <Route path='/' element={<Navigate to="/login" replace /> } />

    <Route element={<RequireBack/>}>
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
    </Route>
     <Route path='/*' element={<Err403 />} />
     
     					{/* Protected Routes */}			
   <Route element={<RequireAuth allowedRole={["user","admin"]}/>}>
   						{/* Dashboard */}
   <Route path='/dashboard' element={<Dashboard />}>
   <Route element={<RequireAuth allowedRole={["admin"]} />}>
 					  {/* User */}
   		<Route path='users' element={<AdminPanel/>} />
    </Route>
    <Route element={<RequireAuth allowedRole={["user","admin"]}/>}>
   						 {/* Camp */}
    	<Route path='camps' element={<Camp />} />
    	
    </Route>
 
   </Route>
   </Route>
    </Routes>
    </div>
  );
}
