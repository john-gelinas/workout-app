import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../api/apiSlice";
import { userLoginSuccess } from "./authSlice";
import { useDispatch } from "react-redux/es/exports";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [apiRegister, apiRegisterResult] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filled = [username, email, password, password2].every(Boolean);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== password2) {
        throw new Error("Passwords Must Match");
      }
      if (!filled) {
        throw new Error("Please Fill All Fields");
      }
      const regData = await apiRegister({ email, username, password }).unwrap();
      dispatch(userLoginSuccess(regData));
      // redirect user to "from" page
      navigate("/", { replace: true });
    } catch (error) {
      dispatch(userLoginFail());
      if (!error?.data) {
        console.error("error", error.toString());
      } else {
        error = error?.data?.[first];
        console.error("error", error.toString());
      }
    }
  };

  return (
    <div className="col-md-6 m-auto">
      <div className="card card-body mt-5">
        <h2 className="text-center">Register</h2>
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
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <label>Re-Type Password</label>
            <input
              type="password"
              className="form-control"
              name="password2"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary mt-1" type="submit ">
              Register
            </button>
          </div>
          <p>
            Already have an account? <Link to="/leadmanager/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
