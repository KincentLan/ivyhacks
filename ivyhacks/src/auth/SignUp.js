import React, {useCallback} from "react";
import {withRouter} from "react-router";
import app from "../base";
import {Link} from "react-router-dom";

const SignUp = ({history}) => {
    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const {email, password, confirm_password } = event.target.elements;
        try {
            if (password.value !== confirm_password.value) {
                throw new Error("Passwords do not match.");
            }
            await app
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value);
            history.push("/home");
        } catch (error) {
            alert(error);
        }
    }, [history]);

    return (
        <div id="loginPage">
            <div className="navbar">
                <button id="homeButton"><Link className="white" to="/">Home</Link></button>
            </div>
            <div className="formBox">
                <h1>Sign up</h1>
                <div className="inputBox">
                    <form onSubmit={handleSignUp}>
                        <div className="inputField">
                            <label>Username</label>
                            <input name="email" type="email" placeholder="Email"/>
                        </div>
                        <div className="inputField">
                            <label>Password</label>
                            <input name="password" type="password" placeholder="Password"/>
                        </div>
                        <div className="inputField">
                            <label>Confirm Password</label>
                            <input name="confirm_password" type="password" placeholder="Confirm Password"/>
                        </div>
                        <button type="submit">Sign up</button>
                        <h5>Have an account? <Link to to="/login">Log in.</Link></h5>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default withRouter(SignUp);
