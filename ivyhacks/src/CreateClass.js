import React from "react";
import * as firebase from "firebase/app";
import app from "./auth/base";
import { useState } from "react";
import { Link } from "react-router-dom";

var database = app.database();

const nameForm = () => {
    return (
    <div>
      <h1>Create a new class</h1>
      <form onSubmit={addClassToDatabase}>
        <label>
          Class Name
          <input name="class name" placeholder="PHYS 2020" />
        </label>
        <button type="submit">Create Class</button>
      </form>
    </div>
      );
};

const addClassToDatabase = (className) => {
    database.add(className);
}

export default nameForm;