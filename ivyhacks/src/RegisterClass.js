import React from "react";
import app from "./base";
import {AuthContext} from "./auth/Auth.js";
import {Redirect} from "react-router";

const RegisterClass = () => {
    if (AuthContext.currentUser === undefined) {
        return <Redirect to="/home"/>;
    }
    const currentUser = AuthContext.currentUser.uid;
    const userStatus = app.database().ref('/users/' + currentUser);
    userStatus.once("value")
    .then(function(snapshot) {
        var key = snapshot.key;
        var userJob = snapshot.child(currentUser + "/userType").key;
        if (userJob !== "instructor") {
            return <Redirect to="/home"/>;
        }
    }); 
}