import React from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Workouts from "./workouts/Workouts";
import Workout from "./workouts/Workout";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { Paper, Box } from "@mui/material";

const App = () => {
  const currentMode = useSelector((state) => state.theme.mode);
  let mode = "dark";
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
        <Paper elevation={1} sx={{ minHeight: "100vh", borderRadius: 0, display: "flex", flexDirection: "column" }}>
          <Header />
          <Box sx={{ mb: 3 }}>
          <Routes>
            <Route path="/" element={<Workouts />}></Route>
            <Route path="/workout">
              <Route path=":id" element={<Workout />}></Route>
            </Route>
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p style={{ textAlign: "center" }}>There's nothing here!</p>
                </main>
              }
            />
          </Routes></Box>
          <Footer />
        </Paper>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
