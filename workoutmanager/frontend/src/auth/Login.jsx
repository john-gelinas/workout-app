import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation, useLogoutMutation } from "../api/apiSlice";
import { userLoginSuccess, userLoginFail, userLogout } from "./authSlice";
import { useDispatch, useSelector } from "react-redux/es/exports";
import {
  TextField,
  InputAdornment,
  Typography,
  Box,
  Button,
  CardContent,
  Paper,
  Container,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";

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
  // set "from" variable to redirect user back to page they came from/were intending to visit
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
    <Box sx={{ p: 2 }}>
      <Paper elevation={3} sx={{ display: "block" }}>
        <CardContent>
          <form
            onSubmit={onSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              justifyContent: "center",
              width: "auto",
            }}
          >
            <Typography variant="h2" align="center" gutterBottom>
              Login
            </Typography>
            <Container
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TextField
                required
                id="standard-required"
                label="Username"
                variant="standard"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                margin="normal"
              />
            </Container>

            <Container
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TextField
                required
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="standard"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyIcon />
                    </InputAdornment>
                  ),
                }}
                margin="normal"
              />
            </Container>

            <Container
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 2,
              }}
            >
              <Button type="submit" variant="outlined">
                Login
              </Button>
            </Container>

            <Container
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 2,
              }}
            >
              <Typography>Don't have an account?</Typography>
            </Container>
            <Container
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                sx={{ color: "primary.main" }}
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </Container>
          </form>
        </CardContent>
      </Paper>
    </Box>
  );
};

export default Login;
