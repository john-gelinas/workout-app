import React, { Fragment, useEffect, useState } from "react";
import {
  useAddExercisesMutation,
  useDeleteExercisesMutation,
} from "../../api/apiSlice";
import {
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CardContent,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SetForm from "./SetForm";
import oneRepMaxCalc from "./oneRepMaxCalc";
import paceCalc from "./paceCalc";
import totalWeightCalc from "./totalWeightCalc";

const WorkoutExerciseCard = ({
  exerciseType,
  exerciseSets,
  fields,
  assistedOption,
  exerciseTypeId,
  userId,
  workoutId,
}) => {
  const [deleteExercise, deleteMetadata] = useDeleteExercisesMutation();
  const deleteExerciseClicked = async (id) => {
    try {
      await deleteExercise(id).unwrap();
      console.log(`Deleted: ${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  // turn fields array into object with empty fields and keys and empty values
  const blankFieldInputsObject = fields.reduce((object, currentField) => {
    object[currentField] = "";
    return object;
  }, {});
  const [inputs, setInputs] = useState(blankFieldInputsObject);
  const [calculatedValues, setCalculatedValues] = useState({
    "1RM": "",
    "Total Weight": "",
    Pace: "",
  });
  const [addExercise, addExerciseMetadata] = useAddExercisesMutation();
  const [assisted, setAssisted] = useState(false);
  const clearFields = () => {
    setInputs(blankFieldInputsObject);
    setAssisted(false);
  };

  useEffect(() => {
    clearFields();
  }, []);

  const onInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setCalculatedValues((prevCalcValues) => {
      return {
        ...prevCalcValues,
        "1RM": oneRepMaxCalc(inputs["Weight"], inputs["Reps"]),
      };
    });
    setCalculatedValues((prevCalcValues) => {
      return {
        ...prevCalcValues,
        Pace: paceCalc(inputs["Distance"], inputs["Duration"]),
      };
    });
    setCalculatedValues((prevCalcValues) => {
      return {
        ...prevCalcValues,
        "Total Weight": totalWeightCalc(inputs["Weight"], inputs["Reps"]),
      };
    });
  }, [inputs]);

  const handleAssisted = (e) => {
    setAssisted(e.target.checked);
  };

  const onAddSet = async (e) => {
    e.preventDefault();
    // check that at least one field has been entered, otherwise reject
    if (
      inputs["Reps"] ||
      inputs["Weight"] ||
      inputs["Duration"] ||
      inputs["Distance"] ||
      inputs["Elevation"]
    ) {
      await addExercise({
        exercisetype: exerciseTypeId,
        reps: inputs["Reps"] || null,
        weight: inputs["Weight"] || null,
        duration: inputs["Duration"] || null,
        distance: inputs["Distance"] || null,
        elevation: inputs["Elevation"] || null,
        user: userId,
        workout: workoutId,
        assisted: assisted,
      });
      clearFields();
    } else {
      // error state
      console.log("fill in at least one field");
    }
  };
  return (
    <Card variant="outlined">
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-label="Expand"
          aria-controls="-content"
          id="-header"
        >
          <Typography>{exerciseType}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CardContent>
            <form>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      {fields.map((field) => (
                        <TableCell key={field + "header"}>{field}</TableCell>
                      ))}
                      {assistedOption ? <TableCell>Assisted</TableCell> : ""}
                      <TableCell>Delete</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {exerciseSets.map((set) => (
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
                            return (
                              <TableCell key={field}>
                                {set[field.toLowerCase()]}
                              </TableCell>
                            );
                          }
                        })}
                        {assistedOption ? (
                          <TableCell>{set.assisted ? "yes" : "no"}</TableCell>
                        ) : (
                          ""
                        )}
                        <TableCell> <Button onClick={() => deleteExerciseClicked(set.id)}>X</Button></TableCell>
                      </TableRow>
                    ))}

                    {/* input row */}

                    <TableRow>
                      {fields.map((field) => {
                        if (field === "1RM") {
                          return (
                            <TableCell key={field}>
                              {calculatedValues["1RM"]}
                            </TableCell>
                          );
                        } else if (field === "Total Weight") {
                          return (
                            <TableCell key={field}>
                              {calculatedValues["Total Weight"]}
                            </TableCell>
                          );
                        } else if (field === "Pace") {
                          return (
                            <TableCell key={field}>
                              {calculatedValues["Pace"]}
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell key={field + "input"}>
                              <TextField
                                id={field}
                                label={field}
                                name={field}
                                variant="outlined"
                                sx={{ mr: 1 }}
                                onChange={onInputChange}
                                value={inputs[field]}
                              />
                            </TableCell>
                          );
                        }
                      })}
                      {assistedOption ? (
                        <TableCell>
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={assisted}
                                  onChange={handleAssisted}
                                />
                              }
                              label="Assisted"
                            />
                          </FormGroup>
                        </TableCell>
                      ) : (
                        ""
                      )}
                      <TableCell>
                        <Button type="submit" onClick={onAddSet}>
                          Add
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </form>
          </CardContent>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
};

export default WorkoutExerciseCard;
