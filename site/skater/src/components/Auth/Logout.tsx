//import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      props.setLocalUser("");
      navigate("/");
    };
    handleLogout();
  }, []);

  return (
    <>
      <h1>Logout</h1>
      <p>You will be automatically logged out in 3 seconds...</p>
    </>
  );
};

export default Logout;
