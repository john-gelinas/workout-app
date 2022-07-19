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

const ExerciseList = ({ selectExerciseOpen, onAddExercise, onClickAway }) => {
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
          position: "absolute",
          zIndex: 10,
          top: "100px",
        }}
      >
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {exerciseTypes.map((exerciseType) => (
            <ListItem key={exerciseType.id}>
              <Button onClick={onAddExercise}>
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
              </Button>
            </ListItem>
          ))}
        </List>
      </Card>
    </ClickAwayListener>
  ) : null;
};

export default ExerciseList;
