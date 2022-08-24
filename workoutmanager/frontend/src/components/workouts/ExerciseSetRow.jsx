import React, { useState } from "react";
import {
  TableRow,
  TableCell,
  Button,
  Grow,
  ClickAwayListener,
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import oneRepMaxCalc from "./Calculations/oneRepMaxCalc";
import paceCalc from "./Calculations/paceCalc";
import totalWeightCalc from "./Calculations/totalWeightCalc";
import { useDeleteExercisesMutation } from "../../api/apiSlice";

const ExerciseSetRow = ({ set, fields, assistedOption }) => {
  const [deleteExercise, deleteMetadata] = useDeleteExercisesMutation();
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const deleteExerciseClicked = async (id) => {
    try {
      await deleteExercise(id).unwrap();
      console.log(`Deleted: ${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const openDeleteConfirm = () => {
    setDeleteConfirm((prev) => !prev);
  };

  const handleClickAway = () => {
    setDeleteConfirm(false);
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
      <TableCell sx={{"position": "relative"}}>
        {" "}
        <ClickAwayListener onClickAway={handleClickAway}>
          <div>
            <Grow in={!deleteConfirm} timeout={300} sx={{"position": "absolute",  "bottom": "10px"}}>
              <Button onClick={openDeleteConfirm}>
                <ClearIcon></ClearIcon>
              </Button>
            </Grow>
            <Grow in={deleteConfirm} timeout={300} sx={{"position": "absolute", "bottom": "10px"}}>
              <Button onClick={() => deleteExerciseClicked(set.id)}>
                delete
              </Button>
            </Grow>
          </div>
        </ClickAwayListener>
      </TableCell>
    </TableRow>
  );
};

export default ExerciseSetRow;
