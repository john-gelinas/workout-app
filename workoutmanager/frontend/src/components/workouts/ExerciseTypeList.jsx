import React from "react";
import {
  Card,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ClickAwayListener,
  Button,
} from "@mui/material";
import {
  useGetExerciseTypesQuery,
  useGetExerciseCategoriesQuery,
} from "../../api/apiSlice";

const ExerciseTypeList = ({
  selectExerciseOpen,
  onAddExercise,
  onClickAway,
  workoutId,
}) => {
  const {
    data: exerciseTypes = [],
    typesIsFetching,
    typesIsLoading,
    typesIsSuccess,
    typesIsError,
    typesError,
  } = useGetExerciseTypesQuery();
  const {
    data: exerciseCategories = [],
    categoriesIsFetching,
    categoriesIsLoading,
    categoriesIsSuccess,
    categoriesIsError,
    categoriesError,
  } = useGetExerciseCategoriesQuery();
  return selectExerciseOpen ? (
    <ClickAwayListener onClickAway={onClickAway}>
      <Card
        sx={{
          display: open ? "block" : "none",
          position: "fixed",
          zIndex: 10,
          top: "10vh",
          overflowY: "scroll",
          maxHeight: "75vh",
        }}
      >
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {exerciseTypes.map((exerciseType) => (
            <ListItem key={exerciseType.id}>
                <ListItemAvatar>
                  <Avatar></Avatar>
                </ListItemAvatar>
                  <ListItemText
                    primary={exerciseType.name}
                    secondary={
                      exerciseCategories.find(
                        (category) => category.id === exerciseType.category
                      ).name
                    }
                  />
              <Button onClick={() => onAddExercise(exerciseType, workoutId)}>
                Add
              </Button>
            </ListItem>
          ))}
        </List>
      </Card>
    </ClickAwayListener>
  ) : null;
};

export default ExerciseTypeList;
