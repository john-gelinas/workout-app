import { AppBar, Typography, Stack, Button } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{ top: "auto", bottom: 0, p: 1, pl: 2, pr: 2, mt: 2 }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography
          sx={{ color: "white", display: "inline", verticalAlign: "bottom" }}
          variant="footer"
        >
          &copy; John Gelinas 2022
        </Typography>
        <Button variant="contained" color="secondary">
          <Typography sx={{ color: "white" }} variant="footer" component="span">
            Dark Mode
          </Typography>
        </Button>
      </Stack>
    </AppBar>
  );
};

export default Footer;
