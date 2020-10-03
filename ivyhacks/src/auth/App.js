import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "../application/Home";
import Login from "./Login";
import SignUp from "./SignUp";
import Test from "../Test";
import Welcome from "../Welcome";
import CreateClass from "../CreateClass"
import {AuthProvider} from "./Auth";
import PrivateRoute from "./PrivateRoute";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="bodyDiv">
                    <PrivateRoute exact path="/home" component={Home}/>
                    <Route exact path="/" component={Welcome}/>
                    <Route exact path="/test" component={Test}/>
                    <Route exact path="/signup" component={SignUp}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/CreateClass" component={CreateClass}/>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
