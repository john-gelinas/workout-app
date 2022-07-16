import { AppBar, Typography, Stack, IconButton } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { switchTheme } from "../../app/themeSlice";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";

const Footer = () => {
  const theme = useTheme();
  const currentMode = useSelector((state) => state.theme.mode)
  const dispatch = useDispatch();
  const toggleDarkMode = (currentMode) => {
    const newMode = currentMode === "dark" ? "light" : "dark"
    dispatch(switchTheme(newMode))
  }
  return (
    <AppBar
      position="static"
      color="primary"
      sx={{ top: "auto", bottom: 0, p: 1, pl: 2, pr: 2, mt: "auto" }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography
          sx={{ color: "white", display: "inline", verticalAlign: "bottom" }}
          variant="footer"
        >
          &copy; John Gelinas 2022
        </Typography>
        <IconButton variant="contained" onClick={(e) => toggleDarkMode(currentMode, e)}>
          <Typography variant="footer" component="span">
            {currentMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </Typography>
        </IconButton>

      </Stack>
    </AppBar>
  );
};

export default Footer;
