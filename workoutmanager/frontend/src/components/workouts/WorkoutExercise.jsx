import React from "react";

const WorkoutExercise = ({ exercise }) => {
  console.log(exercise);
  return (
    <>
      <div>{exercise.type}</div>
      <div>{exercise.date}</div>
      <div>{exercise.reps}</div>
      <div>{exercise.weight}</div>
    </>
  );
};

export default WorkoutExercise;
