import React, { useEffect, useState } from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import ThreeDotSpinner from "../components/layout/ThreeDotSpinner";
import { useSelector, useDispatch } from "react-redux/es/exports";

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  let location = useLocation();
  const authState = useSelector((state) => state.auth);
  // if no token in state, load user token from local storage
  // TODO
  // dispatch(loadUser)?

  // load user from database
  // TODO
  // dispatch(getUserQuery)?
  if (authState) {
    if (authState.isLoading) {
      return <ThreeDotSpinner />;
    } else if (authState.isAuthenticated === true) {
      return children;
    } else {
      if (!alert) {
        console.info("Please login");
      }
      return <Navigate to="/login" state={{ from: location }} />;
    }
  }
};

export default PrivateRoute;
