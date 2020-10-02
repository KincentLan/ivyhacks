import React, {useCallback, useContext} from "react";
import {withRouter, Redirect} from "react-router";
import app from "./base.js";
import {AuthContext} from "./Auth.js";
import {Link} from "react-router-dom";

const Login = ({history}) => {
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const {email, password} = event.target.elements;
            try {
                await app
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                history.push("/home");
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    const {currentUser} = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/home"/>;
    }

    return (
        <div class="formBox">
            <h1>Log in</h1>
            <form onSubmit={handleLogin}>
                <label>
                    Email
                    <input name="email" type="email" placeholder="Email"/>
                </label>
                <label>
                    Password
                    <input name="password" type="password" placeholder="Password"/>
                </label>
                <button type="submit">Log in</button>
                <h5>Don't have an account? <Link to to="/signup">Sign up.</Link></h5>
            </form>
        </div>
    );
};

export default withRouter(Login);
