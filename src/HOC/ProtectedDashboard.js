import { Dashboard } from "@mui/icons-material";
import IsAuthenticated from "./IsAuthunticated";
import App from "../App";

const ProtectedDashboard= IsAuthenticated(App)
export default ProtectedDashboard;