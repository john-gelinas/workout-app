import React, { useState, useEffect, useMemo } from "react";
import { Button, Stack } from "@mui/material";
import ExerciseList from "./ExerciseList";
import { useParams } from "react-router-dom";
import ThreeDotSpinner from "../layout/ThreeDotSpinner";
import WorkoutExercise from "./WorkoutExercise";
import { useGetExercisesQuery } from "../../api/apiSlice";

const Workout = () => {
  const [selectExerciseOpen, setSelectExerciseOpen] = useState(false);
  const [workoutList, setWorkoutList] = useState([]);
  const [loader, setLoader] = useState([]);
  const [empty, setEmpty] = useState([]);
  let { workoutId } = useParams();
  // fetch exercises for given workout
  const {
    selectedData: exercises = [],
    isFetching: exercisesIsFetching,
    isLoading: exercisesIsLoading,
    isSuccess: exercisesIsSuccess,
    isError: exercisesIsError,
    error: exercisesError,
  } = useGetExercisesQuery(undefined, {
    selectFromResult: (result) => ({
      ...result,
      selectedData: result.data?.filter(
        (exercise) => exercise.workout == workoutId
      ),
    }),
  });

  // sort exercises then group them based on exercise type
  const groupedExercises = useMemo(() => {
    if (exercises !== []) {
      const sortedExercises = exercises.slice();
      sortedExercises.sort((a, b) => {
        return Date.parse(b.date) - Date.parse(a.date);
      });
      const grouped = sortedExercises.reduce((group, exercise) => {
        const full_type = `${exercise.type} (${exercise.category_name})`;
        // add new group for exercise type if it is not in the object yet
        if (!group[full_type]) {
          group[full_type] = []
        }
        group[full_type].push(exercise);
        return group;
      }, {});
      console.log(grouped);
      //   ({ type, category_name }) => `${type} (${category_name})`
      // );
      return grouped;
    }
  }, [exercisesIsFetching]);

  useEffect(() => {
    if (exercisesIsFetching) {
      setLoader(<ThreeDotSpinner />);
    } else if (exercisesIsSuccess) {
      for (const exerciseType in groupedExercises) {
        console.log(workoutList);
        setWorkoutList(workoutList.push(exerciseType));
      }
      // setWorkoutList(
      //   exerciseList.map((ex) => <WorkoutExercise key={ex.id} exercise={ex} />)
      // );
      setLoader("");
      setEmpty("");
      if (!exercises) {
        setEmpty("No Exercises");
      } else {
        setEmpty("");
      }
    } else if (exercisesIsError) {
      setLoader("");
      setEmpty("");
    }
  }, [groupedExercises]);

  // create set group for each exercise
  // card
  // if new set(s) exist, add form for new set(s) in correct exercise group
  // setform
  // useselector for new set state

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
      {loader}
      {/* workout exercise components */}
      {workoutList}
      {empty}
      <ExerciseList
        selectExerciseOpen={selectExerciseOpen}
        onClickAway={onClickAway}
        onAddExercise={onAddExercise}
      />
    </Stack>
  );
};

export default Workout;
