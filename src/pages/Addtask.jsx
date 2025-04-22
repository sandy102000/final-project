import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";      
import MenuItem from "@mui/material/MenuItem";



const AddTask = ({}) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("pending");
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName && taskDescription && deadline) {
      const newTask = {
        name: taskName,
        description: taskDescription,
        deadline,
        status,
      };
      try{
        axios.post("http://localhost:3000/tasks", newTask);
        navigate("/tasks");
      }
      catch(error){
        console.log("Error adding task:", error);
        alert("Failed to add task. Please try again.");
      }
    } else {
      alert("All fields are required!");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: 5,
      }}
    >
      <Paper elevation={4} sx={{ padding: 4, width: "400px" }}>
        <Typography variant="h5" sx={{ marginBottom: 3, textAlign: "center" }}>
          Add New Task
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Task Name"
            variant="outlined"
            fullWidth
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Task Description"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            required
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Deadline"
            type="date"
            variant="outlined"
            fullWidth
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ marginBottom: 3 }}
          />
          <FormControl fullWidth required sx={{ marginBottom: 3 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="finished">Finished</MenuItem>
            </Select>
          </FormControl>              
          <Button type="submit" variant="contained" fullWidth>
            Add Task
          </Button>
        </form>
      </Paper>
    </Box>
    
  );
};

export default AddTask;
