//import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    setTimeout(() => {
      handleLogout();
    }, 3000);
  }, []);

  return (
    <>
      <h1>Logout</h1>
      <p>You will be automatically logged out in 3 seconds...</p>
    </>
  );
};

export default Logout;
