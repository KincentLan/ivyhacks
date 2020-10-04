import React from "react";
import app from "./base";
import {useAuthState} from 'react-firebase-hooks/auth';
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import {AuthContext} from "./auth/Auth.js";
import {Redirect} from "react-router";

const RegisterClass = () => {
    const auth = app.auth();
    const [currentUser] = useAuthState(auth);

    const usrClassRef = app.database().ref("users/" + currentUser.uid + "/classes/")

    var numClasses = 0
    usrClassRef.once("value")
    .then(snapshot => {
        snapshot.forEach(item => {
            numClasses = numClasses + 1
            console.log(numClasses)
        })
    })

    const classes = []
    
    const classRef = app.database().ref("classes/")
    classRef.once("value")
    .then(snapshot => {
        snapshot.forEach(item => {
            var temp = { class : item.key }
            classes.push(temp);
            return false;
        })
    })
    
    const [value, setValue] = React.useState(classes[0]);

    const addUserToClass = (value) => {
        usrClassRef.push().update({
            value
        })
    }

    return (
        <div>
        <h1>Register yourself to a class</h1>
        <form>
        <Autocomplete
        id="choose-class"
        value={value}
        onChange={(event, newValue) => {
            setValue(newValue);
            console.log(value);
          }}
        options={classes}
        getOptionLabel={(option) => option.class}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Choose Class" variant="outlined" />}
        />
        <button onClick={() => addUserToClass(value)}>Register</button>
        </form>
        </div>
        )
    }
    
    export default RegisterClass 