import { AppBar, Typography, Stack, IconButton, Icon } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { switchTheme } from "../../app/themeSlice";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  const theme = useTheme();
  const currentMode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  const toggleDarkMode = (currentMode) => {
    const newMode = currentMode === "dark" ? "light" : "dark";
    dispatch(switchTheme(newMode));
  };
  return (
    <AppBar
      position="static"
      color="primary"
      sx={{ top: "auto", bottom: 0, p: 1, pl: 2, pr: 2, mt: "auto" }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography
          sx={{ color: "white", display: "inline", verticalAlign: "bottom", mr: "auto" }}
          variant="footer"
        >
          &copy; John Gelinas 2022
        </Typography>
        <Typography sx={{ color: "white", display: "inline", verticalAlign: "bottom" }} variant="footer" component="span">
          <IconButton variant="contained">
            <GitHubIcon />
          </IconButton>
        </Typography>
        <Typography variant="footer" sx={{ color: "white", display: "inline", verticalAlign: "bottom" }} component="span">
          <IconButton
            variant="contained"
            onClick={(e) => toggleDarkMode(currentMode, e)}
          >
            {currentMode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Typography>
      </Stack>
    </AppBar>
  );
};

export default Footer;
