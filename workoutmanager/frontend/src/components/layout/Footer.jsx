import { AppBar, Typography, Stack } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <AppBar position="static" color="primary" sx={{ top: "auto", bottom: 0, p: 2, mt: 2 }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography sx={{ color: "white" }} variant="footer" component="span">
          &copy; John Gelinas 2022
        </Typography>
        <Typography sx={{ color: "white" }} variant="footer" component="span">
          Dark Mode
        </Typography>
      </Stack>
    </AppBar>
  );
};

export default Footer;
