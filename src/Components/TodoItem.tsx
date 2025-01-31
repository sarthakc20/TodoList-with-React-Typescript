// import React from "react";

import {
  Button,
  Checkbox,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

type PropsType = {
  todo: TodoItemType;
  deleteHandler: (id: TodoItemType["id"]) => void;
  completeHandler: (id: TodoItemType["id"]) => void;
  editHandler: (id: TodoItemType["id"], newTitle: TodoItemType["title"]) => void;
};

const TodoItem = ({ todo, completeHandler, deleteHandler, editHandler }: PropsType) => {
  const [editActive, setEditActive] = useState<boolean>(false);
  const [textValue, setTextValue] = useState<string>(todo.title);

  const handleSave = (): void => {
    editHandler(todo.id, textValue);
    setEditActive(false);
  };

  return (
    <Paper
      sx={{
        padding: "1rem",
      }}
    >
      <Stack direction={"row"} alignItems={"center"}>
        {editActive ? (
          <TextField
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter" && textValue !== "") {
                    editHandler(todo.id, textValue);
                    setEditActive(false);
                }
              }}
          />
        ) : (
          <Typography marginRight={"auto"}>{todo.title}</Typography>
        )}
        <Checkbox
          checked={todo.isCompleted}
          onChange={() => completeHandler(todo.id)}
        />
        <Button
          sx={{
            fontWeight: "600",
          }}
          onClick={() => {
            if (editActive) {
              handleSave();
            } else {
              setEditActive(true);
            }
          }}
        >
          {
            editActive ? "Save" : "Edit"
          }
        </Button>
        <Button
          onClick={() => deleteHandler(todo.id)}
          sx={{ opacity: 0.5, color: "black" }}
        >
          Delete
        </Button>
      </Stack>
    </Paper>
  );
};

export default TodoItem;
