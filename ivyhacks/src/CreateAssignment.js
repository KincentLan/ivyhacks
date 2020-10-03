import React from "react";
import app from "./base";
import {AuthContext} from "./auth/Auth.js";
import {Redirect} from "react-router";

const createAssignment = () => {
    if (AuthContext.currentUser === undefined) {
      return <Redirect to="/home"/>;
    }
    const currentUser = AuthContext.currentUser.uid;
    const userStatus = app.database().ref('/users/' + currentUser);
    userStatus.once("value")
    .then(function(snapshot) {
      var key = snapshot.key;
      var userJob = snapshot.child(currentUser + "/userType").key;
      if (userJob !== "instructor") {
        return <Redirect to="/home"/>;
      }
    }); 

    const storageRef = app.storage().ref(Number(new Date()).toString());


      const addAssignToDatabase = (async event => {
          event.preventDefault();
          const {className, assignName, dueDate, file} = event.target.elements;
          storageRef.put(file);
          await app.database().ref('classes/' + className.value + "/assignments" + assignName.value).set({
              assignName: className.value,
              dueDate: dueDate.value,
          })
      }); 
  
      return (
          <div>
              <h1>Create a new assignment</h1>
              <form onSubmit={addAssignToDatabase}>
                  <label>
                      Class Name
                      <input name="className" placeholder="PHYS 2020"/>
                  </label>
                  <label>
                      Assignment Name
                      <input name="assignName" placeholder="Homework 1"/>
                  </label>
                  <label>
                      Due Date
                      <input name="dueDate" placeholder="10/4/20"/>
                  </label>
                  <label>
                      Choose File
                      <input name="file" id="uploadPdf" type="file" accept=".pdf" />
                  </label>
                  <button type='submit'>Create Assignment</button>
              </form>
          </div>
      );
  };
  
  
  export default createAssignment;