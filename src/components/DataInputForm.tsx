import React, { useState } from "react";
import { Box, TextField, Button, Alert, Stack } from "@mui/material";

type DataInputFormProps = {
  onAdd: (data: { title: string; value: string }) => void;
};

const DataInputForm: React.FC<DataInputFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !value.trim()) {
      setError("Both fields are required.");
      return;
    }
    setError("");
    onAdd({ title: title.trim(), value: value.trim() });
    setTitle("");
    setValue("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%", maxWidth: 400 }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Title"
            variant="outlined"
            size="small"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
              if (error) setError(""); // Clear error when user starts typing
            }}
            sx={{ flex: 1 }}
          />
          <TextField
            label="Value"
            variant="outlined"
            size="small"
            value={value}
            onChange={e => {
              setValue(e.target.value);
              if (error) setError(""); // Clear error when user starts typing
            }}
            sx={{ flex: 1 }}
          />
        </Stack>
        
        {error && (
          <Alert severity="error" sx={{ fontSize: "0.875rem" }}>
            {error}
          </Alert>
        )}
        
        <Button
          type="submit"
          variant="contained"
          color="success"
          sx={{ alignSelf: "flex-start" }}
        >
          Add Data
        </Button>
      </Stack>
    </Box>
  );
};

export default DataInputForm;