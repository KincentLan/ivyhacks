import React from "react";
import app from "./base";
import { useState } from "react";
import { Link } from "react-router-dom";

const createClass = () => {
    const addClassToDatabase = (async event => {
      event.preventDefault();
      const {className} = event.target.elements;
      console.log(className.value);
      app.database().ref('classes/' + className.value).set({
        name : "anime tiddy class"
      })
  });

    return (
    <div>
      <h1>Create a new class</h1>
      <form onSubmit={addClassToDatabase}>
        <label>
          Class Name
          <input name="className" placeholder="PHYS 2020" />
        </label>
        <button type='submit'>Create Class</button>
      </form>
    </div>
      );
};



export default createClass;