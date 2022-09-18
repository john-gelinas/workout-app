import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Card>
      <CardContent>
        <h1>Home</h1>
        <p>
          Record workouts, exercises, and track your PRs. Click the workouts tab
          to get started.
        </p>
        <Link to="/workouts">
          <Typography>Take Me to Workouts</Typography>
        </Link>
      </CardContent>
    </Card>
  );
};

export default Home;
