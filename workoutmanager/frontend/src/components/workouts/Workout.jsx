import React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const Workout = ({ name, date, duration }) => {
  return (
    <Card sx={{ minWidth: 300, display: 'flex' }}>
      <CardActionArea>
        <CardContent>
          <Typography variant="h4" color="initial">
            {name}
          </Typography>
          <Typography variant="body1" color="initial">
            {date}
          </Typography>
          <Typography variant="subtitle1" color="initial">
            {duration}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Workout;
