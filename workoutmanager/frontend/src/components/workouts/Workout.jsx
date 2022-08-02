import React, { useState, useEffect, useMemo, Fragment } from "react";
import { Button, Stack } from "@mui/material";
import ExerciseTypeList from "./ExerciseTypeList";
import { useParams } from "react-router-dom";
import ThreeDotSpinner from "../layout/ThreeDotSpinner";
import WorkoutExerciseHeader from "./WorkoutExerciseHeader";
import WorkoutExerciseSet from "./WorkoutExerciseSet";
import { useGetExercisesQuery } from "../../api/apiSlice";

const Workout = () => {
  const [selectExerciseOpen, setSelectExerciseOpen] = useState(false);
  const [loader, setLoader] = useState([]);
  const [empty, setEmpty] = useState([]);
  let { workoutId } = useParams();
  let exerciseList;
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
      // sort exercises, newest first
      const sortedExercises = exercises.slice();
      sortedExercises.sort((a, b) => {
        return Date.parse(b.date) - Date.parse(a.date);
      });
      // group exercises by exercise type
      const grouped = sortedExercises.reduce((group, exercise) => {
        const full_type = `${exercise.type} (${exercise.category_name})`;
        // add new group for exercise type if it is not in the object yet
        if (!group[full_type]) {
          group[full_type] = [];
        }
        group[full_type].push(exercise);
        return group;
      }, {});
      return grouped;
    }
  }, [exercisesIsFetching]);

// function to create MUI card for each exercise type and populate with the sets of that exercise type for the workout
const createExerciseCard = (exerciseType, exerciseSets) => {
  const sets = exerciseSets.map((set) => {
    return(
      <Fragment key={set.id}>
      <p>{set.reps}</p> 
      <p>{set.weight}</p> </Fragment>
    )})
    return (<div key={exerciseType}>
    <h1>{exerciseType}</h1>
    {sets}
  </div>)
}

  useEffect(() => {
    if (exercisesIsFetching) {
      setLoader(<ThreeDotSpinner />);
    } else if (exercisesIsSuccess) {
      for (const exerciseType in groupedExercises) {
        // create set group for each exercise as a card
        let exerciseCard = createExerciseCard(exerciseType, groupedExercises[exerciseType])
        console.log("exerciseCard", exerciseCard)
        exerciseList ? exerciseList.push(exerciseCard) : exerciseList = [exerciseCard]
        console.log("exerciseList", exerciseList)
      }
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
  }, [groupedExercises, exercisesIsFetching, exercisesIsSuccess]);

  // console log useffects
  useEffect(() => {
    console.log("exerciseList", exerciseList);
  }, [exerciseList]);
  useEffect(() => {
    console.log("grouped exercises", groupedExercises);
  }, [groupedExercises]);
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
      {exerciseList}
      {empty}
      <ExerciseTypeList
        selectExerciseOpen={selectExerciseOpen}
        onClickAway={onClickAway}
        onAddExercise={onAddExercise}
      />
    </Stack>
  );
};

export default Workout;
