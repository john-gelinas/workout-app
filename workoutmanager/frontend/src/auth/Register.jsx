import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation, useLogoutMutation, useRegisterMutation } from "../api/apiSlice";
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
import EmailIcon from '@mui/icons-material/Email';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [apiRegister, apiRegisterResult] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filled = [username, email, password, password2].every(Boolean);
  const [apiLogout, apiLogoutResult] = useLogoutMutation();
  const [useLogin, useLoginResult] = useLoginMutation();
  const authState = useSelector((state) => state.auth);

  const logoutUser = () => {
    apiLogout();
    dispatch(userLogout());
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== password2) {
        throw new Error("Passwords Must Match");
      }
      if (!filled) {
        throw new Error("Please Fill All Fields");
      }
      if (authState.isAuthenticated) {
        logoutUser();
      }
      const regData = await apiRegister({ email, username, password }).unwrap();
      dispatch(userLoginSuccess(regData));
      // redirect user to home page
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
              Register
            </Typography>
            <Container
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TextField
                required
                id="username"
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
                id="email"
                label="Email"
                variant="standard"
                value={username}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
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
                id="password"
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
                id="password2"
                label="Re-Type Password"
                type="password"
                autoComplete="current-password"
                variant="standard"
                value={password}
                onChange={(e) => setPassword2(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyIcon />
                    </InputAdornment>
                  ),
                }}
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
                Register
              </Button>
            </Container>

            <Container
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 2,
              }}
            >
              <Typography>Already have an account?</Typography>
            </Container>
            <Container
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                sx={{ color: "primary.main" }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </Container>
          </form>
        </CardContent>
      </Paper>
    </Box>
  );
};

export default Register;


