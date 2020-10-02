import React from "react";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import Home from "../Home";
import Login from "./Login";
import SignUp from "./SignUp";
import Welcome from "../Welcome";
import {AuthProvider} from "./Auth";
import PrivateRoute from "./PrivateRoute";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <PrivateRoute exact path="/home" component={Home}/>
                    <Route exact path="/" component={Welcome}/>
                    <Route exact path="/signup" component={SignUp}/>
                    <Route exact path="/login" component={Login}/>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;