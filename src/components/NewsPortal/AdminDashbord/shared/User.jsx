import { useContext } from "react"
import React from "react"

import { AuthContext } from "../../../../context/Auth"
import { users } from "../../../Authentication/users";
// import { Link } from "react-router-dom";
import { portalUsersDetals } from "../../userPortal/createNewPortal";

export default function User() {
    const {userId}=useContext(AuthContext);
    const portal = portalUsersDetals.find((user) => user.id === userId);
  return (
    <div>
            <h1>User:{users.filter(user=>user.id===userId)[0].name}</h1>          
                    <p>Email : {users.filter(user=>user.id===userId)[0].email}</p>     
                    <p>mobile No : {users.filter(user=>user.id===userId)[0].mobileNumber}</p> 
                    <ul>
                        {
                            portal.map((user, index) => (
                                <li key={index}>
                                    {/* <Link to={`/portal/${userId}`}>{user.name}</Link> */}
                                    <p>Total Portals : {portal.length} </p>
                                    <p>Portal {index+1}:{user.appName} </p>
                                    <p>News Agency name :{user.agencyName} </p>
                                    <p>Address :{user.address} </p>
                                    <p>Region :{user.region} </p>
                                    </li>
                                    ))
                                    }
                                    </ul> 
    </div>
  )
}
