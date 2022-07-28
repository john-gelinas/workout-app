import React from "react";
import SetForm from "./SetForm";

const WorkoutExerciseSet = ({ exercise }) => {
  return (
    <div>
      <div>{exercise.reps}</div>
      <div>{exercise.weight}</div>
      <hr />
    </div>
  );
};

export default WorkoutExerciseSet;
