import React from "react";
import {Link} from "react-router-dom";

const Welcome = () => {
    return (
        <div id="welcome">
            <div className="textbox">
                <button id="loginButton" className="wellink"><Link className="white" to="/login">Log in</Link></button>
                <button id="signupButton" className="wellink"><Link className="white" to="/signup">Sign up</Link></button>
            </div>
        </div>
    )
};

export default Welcome;