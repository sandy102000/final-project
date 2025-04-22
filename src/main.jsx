import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ProtectedDashboard from './HOC/ProtectedDashboard.js'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Signin from'./pages/Signin.jsx'
import UserProvider from './Provider/UserProvider.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AddTask from './pages/addtask.jsx'
// import CircularProgress from '@mui/material/CircularProgress';
// import Box from '@mui/material/Box';
// export default function CircularIndeterminate() {
//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CircularProgress />
//     </Box>
//   )};
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Signin/>}/>
    <Route path="/App" element={<ProtectedDashboard />}/>
    <Route path="/tasks" element={<Dashboard/>}/>
    <Route path="tasks/Addtask" element={<AddTask/>}/>
    </Routes>
    </BrowserRouter>
    </UserProvider>
  </StrictMode>
)
