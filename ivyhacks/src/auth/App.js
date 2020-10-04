import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "../application/Home";
import Login from "./Login";
import SignUp from "./SignUp";
import Test from "../Test";
import Welcome from "../Welcome";
import CreateClass from "../CreateClass"
import CreateAssignment from "../CreateAssignment"
import RegisterClass from "../RegisterClass"
import ChatDashboard from "../application/ChatDashboard";
import Chat from "../application/Chat";
import {AuthProvider} from "./Auth";
import PrivateRoute from "./PrivateRoute";
import Course from "../application/Course";

const App = () => {
    return (
        <AuthProvider>
        <Router>
        <div className="bodyDiv">
        <PrivateRoute exact path="/home" component={Home}/>
        <PrivateRoute exact path="/chat/:id" component={ChatDashboard}/>
        <PrivateRoute exact path="/chat/:id/chatroom/:assignment/:question" component={ChatDashboard}/>
        <Route exact path="/" component={Welcome}/>
        <Route exact path="/test" component={Test}/>
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="/login" component={Login}/>
        <PrivateRoute exact path="/CreateClass" component={CreateClass}/>
        <Route exact path="/createAssignment" component={CreateAssignment}/>
        <Route exact path="/registerclass" component={RegisterClass}/>
        <PrivateRoute exact path="/course/:id" component={Course}/>
        </div>
        </Router>
        </AuthProvider>
        );
    };
    
    export default App;
    