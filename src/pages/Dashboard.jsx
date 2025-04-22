import axios from "axios"
import { useEffect,useState } from "react"
import {useNavigate} from "react-router-dom"
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';




function Dashboard(){
    const [tasks,settasks]=useState([])
    const[error,seterror]=useState(null)
    const [status, setStatus] = useState("");
    const navigate = useNavigate()
    useEffect(()=>{
  axios.get(`http://localhost:3000/tasks`)
.then((response)=>{settasks(response.data)})
.catch((error)=>{seterror("failed to get tasks");console.log(error)})

},[])
function handleDelete(id){
  axios.delete(`http://localhost:3000/tasks/${id}`)
  .then((response)=>{
    settasks(tasks.filter((task)=>task.id!==id))
  })
  .catch((error)=>{seterror("failed to delete task");console.log(error)})
}
const handleStatusChange = (event, value) => {
  setStatus(value);
  if (!value) {
    axios.get(`http://localhost:3000/tasks`)
      .then((response) => {
        settasks(response.data);
      })}
  else{
    const filteredTasks = tasks.filter((task) => task.status === value);
  settasks(filteredTasks);
}}
return(
  
  <div style={{ padding: "20px" }}>
  <Typography variant="h4" gutterBottom>
    Task List
  </Typography>
  <Autocomplete
      disablePortal
      options={["Pending", "active", "finished"]}
      value={status}
      onChange={handleStatusChange}
      sx={{ width: 300 ,marginBottom: 3 }}
      renderInput={(params) => <TextField {...params} label="status" />}
    />

  <Box
    sx={{
      position: "absolute",
      top: 16,
      right: 16,
    }}
  >
    <Button
      variant="contained"
      disableElevation
      color="primary"
      sx={{ marginTop: "20px" }}
      onClick={() => navigate("/tasks/Addtask")}
    >
      ADD TASK
    </Button>
  </Box>

  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, marginTop: 4 }}>
    {tasks.map((task) => (
      <Paper
        key={task.id}
        elevation={3}
        sx={{
          padding: 2,
          width: 300,
          minHeight: 200,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Typography variant="h6">{task.name}</Typography>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            {task.description}
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            <strong>Status:</strong> {task.status}
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            <strong>Deadline:</strong> {task.deadline}
          </Typography>
        </div>
        <Button
              onClick={() => handleDelete(task.id)}
              variant="contained"
              color="info"
              sx={{ marginLeft: "auto", marginTop: 2 }}
              size="small"
            >
              X
            </Button>
      </Paper>
    ))}
  </Box>
</div>
);
}

export default Dashboard;


