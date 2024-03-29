import React from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Card>
      <CardContent>
        <h1>Home</h1>
        <Typography>
          Record workouts, exercises, and track your PRs. Click the workouts tab
          to get started.
        </Typography>
        <hr></hr>
        <Link to="/workouts">
          <Button>
            <Typography variant="button">Take Me to Workouts</Typography>
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default Home;
