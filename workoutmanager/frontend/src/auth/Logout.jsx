import React from "react";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../api/apiSlice";
import { userLogout } from "./authSlice";
import { useDispatch } from "react-redux";


const Logout = () => {
  const [apiLogout, apiLogoutResult] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutUser = () => {
    apiLogout();
    dispatch(userLogout());
  };

  useEffect(() => {
    logoutUser();
    navigate("/")
  }, []);

  return <div></div>;
};

export default Logout;
