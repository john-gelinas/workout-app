import React from "react";
import WorkoutCard from "./WorkoutCard";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button"
import { useGetWorkoutsQuery } from "../../api/apiSlice";
import { useNavigate } from "react-router-dom";

const Workouts = () => {
  let navigate = useNavigate();
  const {
    data: workouts = [],
    isFetching,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetWorkoutsQuery();

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
        <Button>Start Workout</Button>
        {workouts.map((workout) => (
          <div onClick={(() => navigate(`workout/${workout.id}`))} key={workout.id}>
            <WorkoutCard
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
