import { useEffect, useState } from "react";
import {Link } from 'react-router-dom';
import axios from "axios";
import { BASEURL } from "../../../api/api";

export default function Users() {

  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

 
  
    useEffect(() => {
     setLoading(true);
    axios.get(`${BASEURL}/users/all/all`)
    .then((response) => {
    console.log(response)
    })
    .catch((err) => console.log(err))
    .finally(()=>setLoading(false))
  }, []);

const header=[

{
key:"name",
	name:"Username",
},
{
key:"email",
	name:"Email",
},
{
key:"role",
	name:"Role",
},
{
key:"created_at",
	name:"Created",
},
{
key:"updated_at",
	name:"Last Login",
},
]
/*async function handleDelete(id){

try{
	const res=await Axios.delete(`${USER}/${id}`);
	setUsers(prev=>prev.filter(item=> item.id!==id))
	}catch(err){
console.log(err)
}
}*/
  return (
    <div className="bg-white p-2 w-100">
    <div className="d-flex align-items-center justify-content-between">
    <h1>Users Page</h1>
     <Link to="/dashboard/user/add" className="btn btn-primary">Add User</Link>
    <div>
     {/*<TableShow linkName={USER} search="name" page={page} setPage={setPage} limit={limit} setLimit={setLimit} header={header} data={users} delete={handleDelete} currentUser={currentUser} loading={loading} total={total}/>*/}
    </div>
    </div>
    </div>
  );
}