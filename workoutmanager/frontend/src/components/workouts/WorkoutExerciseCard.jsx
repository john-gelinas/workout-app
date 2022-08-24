import React, { Fragment, useEffect, useState } from "react";
import { useAddExercisesMutation } from "../../api/apiSlice";
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
import oneRepMaxCalc from "./Calculations/oneRepMaxCalc";
import paceCalc from "./Calculations/paceCalc";
import totalWeightCalc from "./Calculations/totalWeightCalc";
import ExerciseSetRow from "./ExerciseSetRow";

const WorkoutExerciseCard = ({
  exerciseType,
  exerciseSets,
  fields,
  assistedOption,
  exerciseTypeId,
  userId,
  workoutId,
}) => {
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
                    {/* rows for each exercise set */}
                    {exerciseSets.map((set) => (
                      <ExerciseSetRow
                        key={set.id + "row"}
                        set={set}
                        fields={fields}
                        assistedOption={assistedOption}
                      ></ExerciseSetRow>
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
