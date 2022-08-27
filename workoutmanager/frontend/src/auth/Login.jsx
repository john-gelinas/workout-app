import React from "react";
import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation, useLogoutMutation } from "../api/apiSlice";
import { userLoginSuccess, userLoginFail, userLogout } from "./authSlice";
import { useDispatch, useSelector } from "react-redux/es/exports";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const [useLogin, useLoginResult] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const [apiLogout, apiLogoutResult] = useLogoutMutation();

  const logoutUser = () => {
    apiLogout();
    dispatch(userLogout());
  };
  // set from variable to redirect user back to page they came from/were intending to visit
  // https://stackblitz.com/github/remix-run/react-router/tree/main/examples/auth?file=src%2FApp.tsx
  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (authState.isAuthenticated) {
        logoutUser();
      }
      const loginData = await useLogin({ username, password }).unwrap();
      dispatch(userLoginSuccess(loginData));
      // redirect user to "from" page
      navigate(from, { replace: true });
    } catch (error) {
      dispatch(userLoginFail());
      console.error("error", "Incorrect Credentials");
    } finally {
    }
  };

  return (
    <div className="col-md-6 m-auto">
      <div className="card card-body mt-5">
        <h2 className="text-center">Login</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary mt-1" type="submit ">
              Login
            </button>
          </div>
          <p>
            Don't have an account?{" "}
            <Link to="/leadmanager/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
