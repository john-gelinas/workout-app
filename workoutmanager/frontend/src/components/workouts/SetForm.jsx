import React from "react";
import { TextField, Stack, Typography, Button } from "@mui/material";

const SetForm = ({exercise}) => {
  return (
    <Stack sx={{ m: 2 }} spacing={2} alignItems="center" component="form">
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

export default SetForm;
