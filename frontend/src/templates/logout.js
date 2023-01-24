import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";

function Logout(){

    const {currentUser,setCurrentUser}= useContext(UserContext);
    
    setCurrentUser(null);
    
    
    return(
        <Navigate to="/login" replace={true} />
        )

    }

    export default Logout;

