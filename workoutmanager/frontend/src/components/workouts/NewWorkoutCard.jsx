import React from "react";
import { ClickAwayListener, Card, Button } from "@mui/material";
import { useState } from "react";

const NewWorkoutCard = ({ newWorkoutOpen, onAddWorkout, onClickAway }) => {
  const [newWorkoutName, setNewWorkoutName] = useState("New Workout");

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
        <Button onClick={() => onAddWorkout(newWorkoutName)}>Start</Button>
        {newWorkoutName}
      </Card>
    </ClickAwayListener>
  ) : null;
};

export default NewWorkoutCard;
