import React, { Fragment } from "react";

const WorkoutExerciseHeader = ({ exerciseType }) => {
  return (
    <Fragment>
      <h1>{exerciseType}</h1>
    </Fragment>
  );
};

export default WorkoutExerciseHeader;
