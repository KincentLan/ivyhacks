import React from "react";
import {Link} from "react-router-dom";
import "./css/welcome.css";

const Welcome = () => {
  return (
      <div id="welcome">
          <button id="login"><Link to="/login"><label>Log in</label></Link></button>
          <button id="signup"><Link to="/signup"><label>Sign up</label></Link></button>
      </div>
  )
};

export default Welcome;