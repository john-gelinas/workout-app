import React, { useEffect, useState } from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import ThreeDotSpinner from "../components/layout/ThreeDotSpinner";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { loadUserToken, loadUser, userLoading } from "./authSlice";
import { useGetUserQuery } from "../api/apiSlice";

const PrivateRoute = ({ children }) => {
  let location = useLocation();
  const authState = useSelector((state) => state.auth);

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
