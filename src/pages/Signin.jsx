import { useNavigate } from "react-router-dom";
import { useState,useContext } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { UserContext } from "../Context/Usercontext";
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CircularProgress from "@mui/material/CircularProgress";

function Login(){
  
    const {loading ,setLoading, user,updateUser}=useContext(UserContext)
    const navigate = useNavigate();
    const[errors,seterrors]=useState({
      Email:'',
      password:''
    })
    const [showPassword,setshowPassword]=useState(false)
    const [formvalues,setformvalues]=useState({
        User_name:"",
        Email:"",
        password:""
    });
    const handleClickShowPassword = () => {
      setshowPassword((prev) => !prev);
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    const handleMouseUpPassword = (event) => {
      event.preventDefault();
    }
    const validateform=()=>{
      let newerror={};
      let isvalid=true
    
    const emailregex=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailregex.test(formvalues.Email)){
      newerror.Email='please enter a valid Email'
      isvalid=false
      window.alert(newerror.Email);
    }else{
      newerror.Email=''
    }
    if (formvalues.password.length<8){
      newerror.password='your password must be at least 8 characters '
      isvalid=false
      window.alert(newerror.password); 
    }else{
      newerror.password=''
    }
    seterrors(newerror);
    return isvalid
  }
  
    
    const handlelogin=async()=>{
      if (!validateform()){
        return 
      }
      try{
        setLoading(true);
        const token= "S4c7JmsM7J775trpIzmBvRUHL6bTJDpOi77Zm5O9FHomtyuOZiixvpAIdLfghzHtS4c7JmsM7J775trpIzmBvRUHL6bTJDpOi77Zm5O9FHomtyuOZiixvpAIdLfghzHt"
        localStorage.setItem("loggedInUser",JSON.stringify({
        User_name :formvalues.User_name,Email:formvalues.Email,LoggedIn:true
        } )),
        console.log(user ,"user")
      
        updateUser({ User_name:formvalues. User_name,Email:formvalues.Email,LoggedIn:true})
        navigate("/tasks");
    }catch(error){
        console.log(error)
    }
    finally{
        setLoading(false);
    }}
    
    const handleChange= (e) => {
      
        setformvalues((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
        
    };
    return(
      <>
      {loading && <CircularProgress />}
      <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card sx={{ maxWidth: 400, padding: 6 }}>
        <cardContent>
          <Typography variant="h4" component="div" gutterBottom align="center">
            Sign In
          </Typography>
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <CircularProgress />
            </Box>
          )}
  <Box sx={{ '& > :not(style)': { m: 1, width: '100%' } }}>
    <FormControl variant="standard" fullWidth>
      <InputLabel htmlFor="input-with-icon-adornment"></InputLabel>
      <TextField
        id="input-with-icon-adornment-outlined-required"
        name="User_name"
        label="User name"
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        fullWidth
        sx={{mb:2}}
      />
      <TextField
        name="Email"
        type="email"
        id="outlined-required"
        label="Email"
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        fullWidth
      />
    </FormControl>
    <FormControl sx={{ width: '100%' }} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        name="password"
        id="outlined-adornment-password-required"
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={showPassword ? 'hide the password' : 'display the password'}
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              onMouseUp={handleMouseUpPassword}
              edge="end"
              
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        
        label="Password"
        onChange={handleChange}
        fullWidth
      />
    </FormControl>
  </Box>
    <Button onClick={handlelogin} variant="contained" fullWidth>
      Login
    </Button>
    </cardContent>
    </Card>
  </Box>
</>

      )
        
}
export default Login;












