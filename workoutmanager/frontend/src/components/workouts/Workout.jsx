import React, { useState, useMemo } from "react";
import { Button, Stack } from "@mui/material";
import ExerciseList from "./ExerciseList";
import { useParams } from "react-router-dom";
import {
  useGetExercisesQuery,
  useGetExerciseTypesQuery,
  useGetExerciseCategoriesQuery,
} from "../../api/apiSlice";

const Workout = () => {
  const [selectExerciseOpen, setSelectExerciseOpen] = useState(false);
  let { workoutId } = useParams();
  // fetch exercises for given workout
  const {
    data: exercises = [],
    isFetching,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetExercisesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data?.filter((exercise) => exercise.workout == workoutId),
    }),
  });
  const {
    data: exerciseTypes = [],
    typesIsFetching,
    typesIsLoading,
    typesIsSuccess,
    typesIsError,
    typesError,
  } = useGetExerciseTypesQuery();
  const {
    data: exerciseCategories = [],
    categoriesIsFetching,
    categoriesIsLoading,
    categoriesIsSuccess,
    categoriesIsError,
    categoriesError,
  } = useGetExerciseCategoriesQuery();

  console.log(workoutId);
  console.log(exercises);
  console.log(exerciseList);

  const exerciseList = useMemo(() => {
    const exerciseList = exercises.forEach((exercise) => {
      console.log("exercise", exercise);
      const type = exerciseTypes.find(
        (type) => type.id == exercise.exercisetype
      );
      console.log("type", type);
      const category = exerciseCategories.find(
        (category) => category.id == type.category
      );
      console.log("category", category);
      return {
        type: `${exercise.name} (${category.name})`,
        reps: [exercise.reps],
        weight: [exercise.weight],
      };
    });
    return exerciseList;
  }, [exerciseCategories]);
  // create exercise groups

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
