import React, { useState, useEffect, useMemo, Fragment } from "react";
import { Button, Stack, Typography } from "@mui/material";
import ExerciseTypeList from "./ExerciseTypeList";
import { useParams } from "react-router-dom";
import ThreeDotSpinner from "../layout/ThreeDotSpinner";
import WorkoutExerciseHeader from "./WorkoutExerciseCard";
import WorkoutExerciseSet from "./WorkoutExerciseSet";
import { useGetExercisesQuery } from "../../api/apiSlice";
import WorkoutExerciseCard from "./WorkoutExerciseCard";
import { useSelector } from "react-redux";

const Workout = () => {
  const [selectExerciseOpen, setSelectExerciseOpen] = useState(false);
  const [loader, setLoader] = useState([]);
  const [empty, setEmpty] = useState([]);
  const [displayExercises, setDisplayExercises] = useState([]);
  const [newExercise, setNewExercise] = useState();
  const userId = useSelector((state) => state.auth.user.id)
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
    if (exercises.length != 0) {
      // sort exercises
      const sortedExercises = exercises.slice();
      sortedExercises.sort((a, b) => {
        return Date.parse(a.date) - Date.parse(b.date);
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
  }, [exercisesIsFetching, exercisesIsLoading]);

  useEffect(() => {
    if (exercisesIsFetching) {
      setLoader(<ThreeDotSpinner />);
    } else if (exercisesIsSuccess) {
      for (const exerciseType in groupedExercises) {
        let fields = [];
        const assistedOption =
          groupedExercises[exerciseType][0].assisted_option;
        for (const type_option of [
          "type_distance",
          "type_duration",
          "type_elevation",
          "type_reps",
          "type_weight",
        ]) {
          if (groupedExercises[exerciseType][0][type_option]) {
            const category =
              type_option.slice(5, 6).toUpperCase() + type_option.slice(6);
            fields.push(category);
          }
        }
        if (fields.includes("Reps") && fields.includes("Weight")) {
          fields.push("1RM");
          fields.push("Total Weight");
        } else if (fields.includes("Distance") && fields.includes("Duration")) {
          fields.push("Pace");
        }

        // create set group for each exercise as a card
        let exerciseCard = (
          <WorkoutExerciseCard
            key={exerciseType}
            exerciseType={exerciseType}
            exerciseSets={groupedExercises[exerciseType]}
            fields={fields}
            assistedOption={assistedOption}
            exerciseTypeId={groupedExercises[exerciseType][0]["exercisetype"]}
            userId={groupedExercises[exerciseType][0]["user"]}
            workoutId={groupedExercises[exerciseType][0]["workout"]}
          />
        );
        exerciseList
          ? exerciseList.push(exerciseCard)
          : (exerciseList = [exerciseCard]);
      }
      setDisplayExercises(exerciseList);
    setNewExercise();

      setLoader("");
      setEmpty("");
      if (exercises.length == 0) {
        setEmpty(<Typography>No Exercises</Typography>);
      } else {
        setEmpty("");
      }
    } else if (exercisesIsError) {
      setLoader("");
      setEmpty("Error - Exercises could not be fetched");
    }
  }, [groupedExercises, exercisesIsFetching, exercisesIsSuccess]);

  const onAddExercise = (exerciseType, workoutId) => {
    let fields = [];
    for (const type_option of [
      "distance",
      "duration",
      "elevation",
      "reps",
      "weight",
    ]) {
      if (exerciseType[type_option]) {
        const category =
          type_option.slice(0, 1).toUpperCase() + type_option.slice(1);
        fields.push(category);
      }
    }
    let exerciseTypeFullName = `${exerciseType.name} (${exerciseType.category_name})`;
    let newExerciseCard = (
      <WorkoutExerciseCard
        key={exerciseType.name}
        exerciseType={exerciseTypeFullName}
        exerciseSets={[]}
        fields={fields}
        assistedOption={exerciseType.assisted_option}
        exerciseTypeId={exerciseType.id}
        workoutId={workoutId}
      />
    );
    setNewExercise(newExerciseCard);

    // after submitting, close exercise list after a quick delay
    setTimeout(() => setSelectExerciseOpen(false), 200);
  };
  const onClickAway = () => {
    setSelectExerciseOpen(false);
  };

  return (
    <Stack mt={2} spacing={2} alignItems="center">
      {loader}
      {/* workout exercise components */}
      {displayExercises}
      {newExercise}
      <Button
        id="selectExercise"
        label="Select Exercise"
        variant="outlined"
        onClick={() => setSelectExerciseOpen(true)}
      >
        Add Exercise
      </Button>
      {empty}
      <ExerciseTypeList
        selectExerciseOpen={selectExerciseOpen}
        onClickAway={onClickAway}
        onAddExercise={onAddExercise}
        workoutId={workoutId}
      />
    </Stack>
  );
};

export default Workout;
