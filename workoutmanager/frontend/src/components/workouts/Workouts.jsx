import React, { useState } from "react";
import WorkoutCard from "./WorkoutCard";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useGetWorkoutsQuery, useNewWorkoutMutation } from "../../api/apiSlice";
import { useNavigate } from "react-router-dom";
import NewWorkoutCard from "./NewWorkoutCard";
import { useSelector } from "react-redux";

const Workouts = () => {
  let navigate = useNavigate();
  const [newWorkoutOpen, setNewWorkoutOpen] = useState(false);
  const {
    data: workouts = [],
    isFetching,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetWorkoutsQuery();

  const [addWorkout, addWorkoutMetadata] = useNewWorkoutMutation();
  const userId = useSelector((state) => state.auth.user.id);

  const onAddWorkout = async (name) => {
    // post new workout to api
    const newWorkout = await addWorkout({ name: name, user: userId });
    // navigate to new workout page
    console.log(newWorkout, "new workout return")
    navigate(`/workout/${newWorkout.data.id}`);
  };

  const onClickAway = () => {
    setNewWorkoutOpen(false);
  };

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
        <Button onClick={() => setNewWorkoutOpen(true)}>Start Workout</Button>
        {workouts.map((workout) => (
          <div
            onClick={() => navigate(`/workout/${workout.id}`)}
            key={workout.id}
          >
            <WorkoutCard
              name={workout.name}
              date={workout.date}
              duration={workout.duration}
            />
          </div>
        ))}
        <NewWorkoutCard
          newWorkoutOpen={newWorkoutOpen}
          onClickAway={onClickAway}
          onAddWorkout={onAddWorkout}
        />
      </Stack>
    </div>
  );
};

export default Workouts;
