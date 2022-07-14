import React from "react";
import { TextField, Stack, Typography } from "@mui/material";

const WorkoutForm = () => {
  return (
    <Stack sx={{ m: 2 }} spacing={2} alignItems="center" component="form">
      <Typography variant="h2" component="div">
        Workout
      </Typography>
      <div>
        <TextField id="workoutName" label="Workout Name" variant="outlined" />
      </div>
      <div>
        <TextField id="reps" label="Reps" variant="outlined" sx={{ mr: 1 }} />
        <TextField id="weight" label="Weight" variant="outlined" />
      </div>
      <div>
        <TextField
          id="duration"
          label="Duration"
          variant="outlined"
          sx={{ mr: 1 }}
        />
        <TextField id="distance" label="Distance" variant="outlined" />
      </div>
    </Stack>
  );
};

export default WorkoutForm;
