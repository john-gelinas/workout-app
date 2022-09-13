import React from "react";
import { ClickAwayListener, Card, Button, TextField } from "@mui/material";
import { useState } from "react";

const NewWorkoutCard = ({ newWorkoutOpen, onAddWorkout, onClickAway }) => {
  const [newWorkoutName, setNewWorkoutName] = useState("New Workout");
  const onNameChange = (e) => {
    setNewWorkoutName(e.target.value);
  };

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
        <TextField
          id="Workout Name"
          label="Workout Name"
          name="Workout Name"
          variant="outlined"
          sx={{ mr: 1 }}
          onChange={onNameChange}
          value={newWorkoutName}
        />
        <Button onClick={() => onAddWorkout(newWorkoutName)}>Start</Button>
      </Card>
    </ClickAwayListener>
  ) : null;
};

export default NewWorkoutCard;
