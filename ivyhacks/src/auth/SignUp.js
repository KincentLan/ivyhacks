import React, {useCallback, useContext, useState} from "react";
import {withRouter} from "react-router";
import app from "../base";
import "../css/navbar-login.css"
import {Link} from "react-router-dom";

const SignUp = ({history}) => {
    const [error, setError] = useState("");

    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const {firstname, lastname, email, password, confirm_password } = event.target.elements;
        try {
            if (password.value !== confirm_password.value) {
                throw new Error("Passwords do not match.");
            }
            const userAuth = await app
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value);
            const user = {
                uid: userAuth.user.uid,
                email: userAuth.user.email,
                firstname: firstname.value,
                lastname: lastname.value,
                userType: 'student',
            }
            pushUserData(user);
          history.push("/home");
        } catch (error) {
            setError(error.toString());
        }
    }, [history]);

    function pushUserData(user) {
        app.database().ref('users/' + user.uid).set(user).catch(error =>
            console.log(error.message));
    }

    return (
        <div id="loginPage">
            <div className="navbar-login">
                <button id="homeButton"><Link className="white" to="/">Home</Link></button>
            </div>
            <div className="formBox">
                <h1>Sign up</h1>
                {error && (
                    <div className="error">{error}</div>
                )}
                <div className="inputBox">
                    <form onSubmit={handleSignUp}>
                        <div className="inputField">
                            <label>First Name</label>
                            <input name="firstname" placeholder="First Name"/>
                        </div>
                        <div className="inputField">
                            <label>Last Name</label>
                            <input name="lastname" placeholder="Last Name"/>
                        </div>
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
                        <h5>Have an account? <Link to="/login">Log in.</Link></h5>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default withRouter(SignUp);
