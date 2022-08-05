import React, { Fragment } from "react";
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
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMore from "@mui/icons-material/ExpandMore";

const WorkoutExerciseCard = ({ exerciseType, exerciseSets }) => {
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
                      <TableCell></TableCell>
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
                        {fields.map((field) => (
                          <TableCell key={field}>
                            {set[field.toLowerCase()]}
                      </TableCell>
                        ))}
                        <TableCell></TableCell>
                    </TableRow>
                  ))}
                    <TableRow>
                      {fields.map((field) => (
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
                      ))}
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
