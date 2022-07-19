import React, { useState } from "react";
import { Button, Stack } from "@mui/material";
import ExerciseList from "./ExerciseList";
import { useParams } from "react-router-dom";

const Workout = () => {
  const [selectExerciseOpen, setSelectExerciseOpen] = useState(false);
  let { workoutId } = useParams();
  // fetch exercises

  // get list of exercises in workout

  // create exercise group
  // card
  // setform

  // create set for given exercise

  const onAddExercise = (exercise) => {
    // close exercise list after a quick delay
    setTimeout(() => setSelectExerciseOpen(false), 200);
  };
  const onClickAway = () => {
    setSelectExerciseOpen(false);
  };

  return (
    <Stack mt={2} spacing={2} alignItems="center">
      <Button
        id="selectExercise"
        label="Select Exercise"
        variant="outlined"
        onClick={() => setSelectExerciseOpen(true)}
      >
        Add Exercise
      </Button>
      {/* workout exercise components */}
      <ExerciseList
        selectExerciseOpen={selectExerciseOpen}
        onClickAway={onClickAway}
        onAddExercise={onAddExercise}
      />
    </Stack>
  );
};

export default Workout;
