import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import EventManagement from "../Components/EventManagement";
import RegistrationManagement from "../Components/RegistrationManagement";
import Home from "../Components/Home";
import Admin from "../Components/Admin";
import User from "../Components/User";
import Login from "../Components/Login";
import Profile from "../Components/Profile";
import RegisteredEvents from "../Components/RegisteredEvents";
function AppRouter(){
    return(
        <Router>
        <Routes>
            <Route path="/" element={<Login/>}></Route>
            <Route path="/home" element={<Home/>}></Route>
            <Route path="/admin" element={<Admin/>}></Route>
            <Route path="/user" element={<User/>}></Route>
            <Route path="/event" element={<EventManagement/>}></Route>
            <Route path="/register" element={<RegistrationManagement/>}></Route>
            <Route path="/profile" element={<Profile/>}></Route>
            <Route path="/registeredEvents" element={<RegisteredEvents/>}></Route>
        </Routes>
        </Router>
    )
}
export default AppRouter;