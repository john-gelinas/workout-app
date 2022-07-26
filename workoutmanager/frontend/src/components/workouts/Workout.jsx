import React, { useState, useEffect, useMemo } from "react";
import { Button, Stack } from "@mui/material";
import ExerciseList from "./ExerciseList";
import { useParams } from "react-router-dom";
import ThreeDotSpinner from "../layout/ThreeDotSpinner";
import WorkoutExercise from "./WorkoutExercise";
import {
  useGetExercisesQuery,
  useGetExerciseTypesQuery,
  useGetExerciseCategoriesQuery,
} from "../../api/apiSlice";

const Workout = () => {
  const [selectExerciseOpen, setSelectExerciseOpen] = useState(false);
  const [exerciseList, setExerciseList] = useState([]);
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

  useEffect(() => {
    const exList = exercises.map((exercise) => {
      let category, exType;
      if (typesIsSuccess) {
        exType = exerciseTypes.find(
          (eachType) => eachType.id == exercise.exercisetype
        );
      }
      if (categoriesIsSuccess && typesIsSuccess) {
        const category = exerciseCategories.find(
          (category) => category.id == exType.category
        );
        return {
          type: `${exType.name} (${category.name})`,
          reps: exercise.reps,
          weight: exercise.weight,
          time: exercise.date,
          id: exercise.id
        };
      }
    });
    setExerciseList(exList);
  }, [exercisesIsSuccess && categoriesIsSuccess && typesIsSuccess]);
  
  // create exercise groups
  useEffect(() => {
    if (exercisesIsLoading) {
      setLoader(<ThreeDotSpinner />);
    } else if (exercisesIsSuccess) {
      setWorkoutList(exerciseList.map((ex) => <WorkoutExercise key={ex.id} exercise={ex} />));
      setLoader("");
      setEmpty("");
      if (!exerciseList) {
        setEmpty("No No Exercises");
      } else {
        setEmpty("");
      }
    } else if (exercisesIsError) {

      setLoader("");
      setEmpty("");
    }
  }, [exerciseList]);
  // debug useeffect
  useEffect(() => {
    console.log("list", exerciseList);
  }, [exerciseList]);

  // sort exercises by type and chorologically - only computing when exercises update via useMemo
  const sortedExercises = useMemo(() => {
    const sortedExercises = exerciseList.slice();
    sortedExercises.sort((a, b) => {
      return a.date.localeCompare(b.date);
    });
    console.log(sortedExercises);
    return sortedExercises;
  }, [exerciseList]);
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
