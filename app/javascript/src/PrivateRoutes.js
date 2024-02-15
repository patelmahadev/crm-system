import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = (props) => {
  const token = localStorage.getItem("token")

  const {Components} =props
  if (!token) {
    return <Navigate to="/" />;
  }
  return (
    <>
    <div className="h-full ">
    <Components />

    </div>
    </>
  );
};

export default ProtectedRoutes;
