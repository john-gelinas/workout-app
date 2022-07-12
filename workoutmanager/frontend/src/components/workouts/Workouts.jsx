import React from "react";
import Workout from "./Workout";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const Workouts = () => {
  const workouts = [
    {
      id: 1,
      name: "Name",
      date: "12-15-22 12:00:00",
      duration: "47 minutes",
    },
    {
      id: 2,
      name: "Name",
      date: "12-15-22 12:00:00",
      duration: "47 minutes",
    },
    {
      id: 3,
      name: "Name",
      date: "12-15-22 12:00:00",
      duration: "47 minutes",
    },
  ];

  return (
    <div style={{ width: "fit-content", margin: "auto" }}>
      <Stack
        mt={2}
        spacing={2}
        divider={<Divider flexItem />}
        alignItems="center"
      >
      <Typography variant="h2" component="div">
        Workouts
      </Typography>
        {workouts.map((workout) => (
          <div key={workout.id}>
            <Workout
              name={workout.name}
              date={workout.date}
              duration={workout.duration}
            />
          </div>
        ))}
      </Stack>
    </div>
  );
};

export default Workouts;
