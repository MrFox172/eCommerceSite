//import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    }
    return null;

};

export default Logout;