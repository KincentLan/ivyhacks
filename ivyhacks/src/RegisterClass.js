import React from "react";
import app from "./base";
import {useAuthState} from 'react-firebase-hooks/auth';
import {AuthContext} from "./auth/Auth.js";
import {Redirect} from "react-router";

const RegisterClass = () => {
    const auth = app.auth();
    const [currentUser] = useAuthState(auth);

    const ref = app.database().ref("users/" + currentUser.uid + "/classes/")
    ref.once("value")
    .then(function(snapshot) {
        var count = snapshot.child().val();
    })
    

    const addUserToClass = (async event => {
        event.preventDefault()
        const {className} = event.target.elements;
        await ref.update({
            className : className.value
        })
    })

    return (
        <div>
        <h1>Register yourself to a class</h1>
        <form onSubmit={addUserToClass}>
        <label>
        Class Name
        <input name="className" placeholder="PHYS 2020"/>
        </label>
        </form>
        </div>
    )
}

export default RegisterClass 