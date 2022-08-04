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
      <Accordion expanded={true}>
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
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Reps</TableCell>
                    <TableCell align="right">Weight</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {exerciseSets.map((set) => (
                    <TableRow
                      key={set.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {set.reps}
                      </TableCell>
                      <TableCell align="right">{set.weight}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
};

export default WorkoutExerciseCard;
