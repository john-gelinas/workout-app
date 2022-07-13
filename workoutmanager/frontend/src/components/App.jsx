import React from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Workouts from "./workouts/Workouts";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const App = () => {
  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#4a93a6',
      },
      secondary: {
        main: '#a65d4a',
      },
    },
    typography: {
      footer: {
        fontFamily: ['monospace', 'Arial'].join(","),
        fontSize: '16px'
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Workouts />
        <Footer/>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
