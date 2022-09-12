import React from "react";
import { ClickAwayListener, Card, Button } from "@mui/material";

const NewWorkoutCard = ({ newWorkoutOpen, onAddWorkout, onClickAway }) => {
  return newWorkoutOpen ? (
    <ClickAwayListener onClickAway={onClickAway}>
      <Card
        sx={{
          display: open ? "block" : "none",
          position: "fixed",
          zIndex: 10,
          top: "10vh",
          overflowY: "scroll",
          maxHeight: "75vh",
        }}
      >
        <Button onClick={() => onAddExercise(exerciseType, workoutId)}>
          Start
        </Button>
      </Card>
    </ClickAwayListener>
  ) : null;
};

export default NewWorkoutCard;
