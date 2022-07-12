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
        main: '#1a237e',
      },
      secondary: {
        main: '#81c784',
      },
    },
    typography: {
      footer: {
        fontFamily: ['monospace', 'Arial'].join(","),
        fontSize: '20px'
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
