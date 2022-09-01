import React, { useState } from "react";
import {
  TableRow,
  TableCell,
  Button,
  Grow,
  ClickAwayListener,
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import oneRepMaxCalc from "./Calculations/oneRepMaxCalc";
import paceCalc from "./Calculations/paceCalc";
import totalWeightCalc from "./Calculations/totalWeightCalc";
import { useDeleteExercisesMutation } from "../../api/apiSlice";

const ExerciseSetRow = ({ set, fields, assistedOption }) => {
  const [deleteExercise, deleteMetadata] = useDeleteExercisesMutation();
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [editState, setEditState] = useState(false);

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

  const handleEdit = () => {
    // when edit button is clicked, change edit icon to cancel X, change delete icon to submit icon, change delete column header to submit
    setEditState((prev) => !prev);
  };

  const submitEdit = async (id) => {
    // submit edit api request

  }

  const handleClickAwayDelete = () => {
    setDeleteConfirm(false);
  };

  const handleClickAwayEdit = () => {
    setEditState(false);
  };

  return (
    <TableRow
      key={set.id}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell>
      <ClickAwayListener onClickAway={handleClickAwayEdit}>
          <div>
            <Grow in={!editState} timeout={300}>
              <Button onClick={handleEdit}>
                <EditIcon></EditIcon>
              </Button>
            </Grow>
            <Grow in={editState} timeout={300}>
              <Button onClick={handleEdit}>
                <ClearIcon></ClearIcon>
              </Button>
            </Grow>
          </div>
        </ClickAwayListener>
      </TableCell>
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
        <ClickAwayListener onClickAway={handleClickAwayDelete}>
          <div>
            <Grow in={!deleteConfirm && !editState} timeout={300} sx={{"position": "absolute",  "bottom": "10px"}}>
              <Button onClick={openDeleteConfirm}>
                <ClearIcon></ClearIcon>
              </Button>
            </Grow>
            <Grow in={deleteConfirm && !editState} timeout={300} sx={{"position": "absolute", "bottom": "10px"}}>
              <Button onClick={() => deleteExerciseClicked(set.id)}>
                Delete
              </Button>
            </Grow>
            <Grow in={editState && !deleteConfirm} timeout={300} sx={{"position": "absolute", "bottom": "10px"}}>
              <Button onClick={() => submitEdit(set.id)}>
                Submit
              </Button>
            </Grow>
          </div>
        </ClickAwayListener>
      </TableCell>
    </TableRow>
  );
};

export default ExerciseSetRow;
