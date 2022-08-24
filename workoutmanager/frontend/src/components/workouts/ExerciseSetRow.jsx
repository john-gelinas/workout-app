import React from "react";
import { TableRow, TableCell, Button } from "@mui/material";
import oneRepMaxCalc from "./oneRepMaxCalc";
import paceCalc from "./paceCalc";
import totalWeightCalc from "./totalWeightCalc";
import { useDeleteExercisesMutation } from "../../api/apiSlice";

const ExerciseSetRow = ({ set, fields, assistedOption }) => {
  const [deleteExercise, deleteMetadata] = useDeleteExercisesMutation();
  const deleteExerciseClicked = async (id) => {
    try {
      await deleteExercise(id).unwrap();
      console.log(`Deleted: ${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TableRow
      key={set.id}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      {fields.map((field) => {
        if (field === "1RM") {
          return (
            <TableCell key={field}>
              {oneRepMaxCalc(set["weight"], set["reps"])}
            </TableCell>
          );
        } else if (field === "Total Weight") {
          return (
            <TableCell key={field}>
              {totalWeightCalc(set["weight"], set["reps"])}
            </TableCell>
          );
        } else if (field === "Pace") {
          return (
            <TableCell key={field}>
              {paceCalc(set["distance"], set["duration"])}
            </TableCell>
          );
        } else {
          return <TableCell key={field}>{set[field.toLowerCase()]}</TableCell>;
        }
      })}
      {assistedOption ? (
        <TableCell>{set.assisted ? "yes" : "no"}</TableCell>
      ) : (
        ""
      )}
      <TableCell>
        {" "}
        <Button onClick={() => deleteExerciseClicked(set.id)}>X</Button>
      </TableCell>
    </TableRow>
  );
};

export default ExerciseSetRow;
