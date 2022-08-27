import React, { useEffect, useState } from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import ThreeDotSpinner from "../UI/ThreeDotSpinner";
import { useSelector, useDispatch } from "react-redux/es/exports";

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  let location = useLocation();
  const authState = useSelector((state) => state.auth);


  if (authState) {
    if (authState.isLoading) {
      return <ThreeDotSpinner />;
    } else if (authState.isAuthenticated === true) {
      return children;
    } else if (authState.isAuthenticated === false) {
      if (!alert) {
        console.info("Please login")
      }
      return <Navigate to="/login" state={{ from: location }} />;
    } else if (authState.isAuthenticated === null) {
      return <Navigate to="/" />;
    }
  }
};

export default PrivateRoute;
