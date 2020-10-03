import React from "react";
import app from "./base";
import { useState } from "react";
import { Link } from "react-router-dom";

const createClass = () => {
    const addClassToDatabase = (className) => {
        var newClassRef = app.database().ref('classes/' + className).set( {className : className} );
        console.log(newClassRef);
    };

    return (
    <div>
      <h1>Create a new class</h1>
      <form>
        <label>
          Class Name
          <input name="class_name" placeholder="PHYS 2020" />
        </label>
        <button onClick='addClassToDatabase()'>Create Class</button>
      </form>
    </div>
      );
};



export default createClass;