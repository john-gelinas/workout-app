import React, { useEffect } from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Workouts from "./workouts/Workouts";
import Workout from "./workouts/Workout";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { Paper, Box } from "@mui/material";
import PersonalRecords from "./PersonalRecords/PersonalRecords";
import Home from "./layout/Home";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Logout from "../auth/Logout";
import About from "./layout/About";
import PrivateRoute from "../auth/PrivateRoute";
import { useDispatch } from "react-redux";
import {
  loadUserToken,
  userLoading,
  loadUser,
  authError,
} from "../auth/authSlice";
import { useGetUserQuery } from "../api/apiSlice";

const App = () => {
  const dispatch = useDispatch();
  const currentMode = useSelector((state) => state.theme.mode);
  let mode = "light";
  const theme = createTheme({
    palette: {
      mode: currentMode,
      primary: {
        main: "#4a93a6",
      },
      secondary: {
        main: "#a65d4a",
      },
    },
    typography: {
      footer: {
        fontFamily: ["monospace", "Arial"].join(","),
        fontSize: "16px",
      },
    },
  });

  // if no token in state, load user token from local storage
  dispatch(loadUserToken());

  // load user from database
  // dispatch(userLoading());
  const {
    data: user = {},
    isFetching,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserQuery();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    if (isFetching || isLoading) {
      dispatch(userLoading);
    } else if (isSuccess) {
      console.log(user);
      dispatch(loadUser({ user: user, token: authState.token }));
    } else if (isError) {
      dispatch(authError());
    }
  }, [isSuccess, isLoading, isFetching, isError]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Paper
          elevation={1}
          sx={{
            minHeight: "100vh",
            borderRadius: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Routes>
              <Route path="/workout">
                <Route
                  path=":workoutId"
                  element={
                    <PrivateRoute>
                      <Workout />
                    </PrivateRoute>
                  }
                ></Route>
              </Route>
              <Route
                element={
                  <PrivateRoute>
                    <Workouts />
                  </PrivateRoute>
                }
                path="/workouts"
              ></Route>
              <Route
                path="/personalrecords"
                element={
                  <PrivateRoute>
                    <PersonalRecords />
                  </PrivateRoute>
                }
              ></Route>
              <Route path="/" element={<Home />}></Route>
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route path="logout" element={<Logout />} />
              <Route path="about" element={<About />} />
              <Route
                path="*"
                element={
                  <main style={{ padding: "1rem" }}>
                    <p style={{ textAlign: "center" }}>There's nothing here!</p>
                  </main>
                }
              />
            </Routes>
          </Box>
        </Paper>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
