import React from "react";
import {
  ClickAwayListener,
  Card,
  Button,
  TextField,
  Stack,
  CardContent,
} from "@mui/material";
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
          position: "fixed",
          zIndex: 10,
          top: "10vh",
          overflowY: "scroll",
          maxHeight: "75vh",
        }}
      >
        <CardContent>
          <Stack direction="row" justifyContent="center" alignItems="center">
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
          </Stack>
        </CardContent>
      </Card>
    </ClickAwayListener>
  ) : null;
};

export default NewWorkoutCard;
