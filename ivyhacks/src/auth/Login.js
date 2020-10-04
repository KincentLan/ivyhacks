import React, {useCallback, useContext, useState} from "react";
import {withRouter, Redirect} from "react-router";
import app from "../base.js";
import {AuthContext} from "./Auth.js";
import {Link} from "react-router-dom";

const Login = ({history}) => {
    const [error, setError] = useState("");

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
                setError(error.toString());
            }
        },
        [history]
    );

    const {currentUser} = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/home"/>;
    }

    return (
        <div id="loginPage">
            <div className="navbar">
                <button id="homeButton"><Link className="white" to="/">Home</Link></button>
            </div>
            <div class="formBox">
                <h1>Log in</h1>
                {error && (
                    <div className="error">{error}</div>
                )}
                <div class="inputBox">
                    <form onSubmit={handleLogin}>
                        <div className="inputField">
                            <label>Username</label>
                            <input name="email" type="email" placeholder="Email"/>
                        </div>
                        <div className="inputField">
                            <label>Password</label>
                            <input name="password" type="password" placeholder="Password"/>
                        </div>
                        <button type="submit">Log in</button>
                        <h5>Don't have an account? <Link to to="/signup">Sign up.</Link></h5>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Login);
