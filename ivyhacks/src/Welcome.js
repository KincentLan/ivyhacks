import React from "react";
import { Link } from "react-router-dom";
import "./css/welcome.css";

const Welcome = () => {
  return (
      <div id="welcome">
          <Link to="/login"><label>Log in</label></Link>
          <Link to="/signup"><label>Sign up</label></Link>
      </div>
  )
};

export default Welcome;