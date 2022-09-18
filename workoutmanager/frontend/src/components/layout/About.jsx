import React from "react";
import { Card, CardContent } from "@mui/material";

const About = () => {
  return (
    <Card>
      <CardContent>
        <h1>About</h1>
        <p>
          This website is a personal project built by John Gelinas. It provides
          a place to track workouts and individual exercises. Calculated one rep
          maxes, total weight lifted, running pace, and other statistics can be
          calculated with the data.
        </p>
        <h2>Built with:</h2>
        <ul>
          <li>Django</li>
          <li>Django Rest Framework</li>
          <li>Knox Token Authentication</li>
          <li>React.js</li>
          <li>Redux Toolkit & RTK Query</li>
          <li>Material UI</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default About;
