import React from "react";
import { Button, Stack } from "@mui/material";
import { useParams } from "react-router-dom";

const Workout = () => {
  let { workoutId } = useParams();
  return (
    <Stack
      mt={2}
      spacing={2}
      alignItems="center"
    >
      <Button id="selectExercise" label="Select Exercise" variant="outlined">
        Add Exercise
      </Button>
      <SetForm exercise={"exercise"}/>
    </Stack>
  );
};

export default Workout;
