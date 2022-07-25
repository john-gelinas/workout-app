import React, { useState, useEffect } from "react";
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
  const [exerciseList, setExerciseList] = useState([]);
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
      selectedData: result.data?.filter((exercise) => exercise.workout == workoutId),
    }),
  });
  const {
    data: exerciseTypes = [],
    isFetching: typesIsFetching,
    isLoading: typesIsLoading,
    isSuccess: typesIsSuccess,
    isError: typesIsError,
    error: typesError,
  } = useGetExerciseTypesQuery();
  const {
    data: exerciseCategories = [],
    isFetching: categoriesIsFetching,
    isLoading: categoriesIsLoading,
    isSuccess: categoriesIsSuccess,
    isError: categoriesIsError,
    error: categoriesError,
  } = useGetExerciseCategoriesQuery();

  // console.log("workoutid", workoutId);
  // console.log("exercises", exercises);
  // console.log("exerciseList", exerciseList);

  useEffect(() => {
    const exList = exercises.map((exercise) => {
      console.log("effect run");
      console.log("exercise", exercise);
      let category, exType;
      if (typesIsSuccess) {
        console.log("types", exerciseTypes);
        console.log("type", exercise.exercisetype);

        // console.log("id", exType.id);
        exType = exerciseTypes.find(
          (eachType) => eachType.id == exercise.exercisetype
        );
        console.log("extype", exType);
      }
      if (categoriesIsSuccess && typesIsSuccess) {
        console.log("category", category);
        const category = exerciseCategories.find(
          (category) => category.id == exType.category
        );
        return {
          type: `${exType.name} (${category.name})`,
          reps: exercise.reps,
          weight: exercise.weight,
          time: exercise.date,
        };
      }
    });
    setExerciseList(exList);
  }, [exercisesIsSuccess && categoriesIsSuccess && typesIsSuccess]);
  // create exercise groups
  
  useEffect(() => {
    console.log("list", exerciseList)
  }, [exerciseList])
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
