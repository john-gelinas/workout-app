import React from "react";
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
import About from "./layout/About";
import PrivateRoute from "../auth/PrivateRoute";

const App = () => {
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
                element={<PersonalRecords />}
              ></Route>
              <Route path="/" element={<Home />}></Route>
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
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
