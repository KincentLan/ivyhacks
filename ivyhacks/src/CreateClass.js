import React from "react";
import app from "./base";
import {AuthContext} from "./auth/Auth.js";
import {Redirect} from "react-router";

const CreateClass = () => {
  // if (AuthContext.currentUser === undefined) {
  //   return <Redirect to="/home"/>;
  // } 
  // const currentUser = AuthContext.currentUser.uid;
  // const userStatus = app.database().ref('/users/' + currentUser);
  // userStatus.once("value")
  // .then(function(snapshot) {
  //   var key = snapshot.key;
  //   var userJob = snapshot.child(currentUser + "/userType").key;
  //   if (userJob !== "instructor") {
  //     return <Redirect to="/home"/>;
  //   }
  // }); 
  
  const addClassToDatabase = (async event => {
    event.preventDefault();
    const {className, sectionID, professorName} = event.target.elements;
    await app.database().ref('classes/' + className.value).set({
      className: className.value,
      sectionID: sectionID.value,
      professorName: professorName.value
    })
  });
  
  return (
    <div id="loginPage">
    <h1>Create a new class</h1>
    <form onSubmit={addClassToDatabase}>
    <label>
    Class Name
    <input name="className" placeholder="PHYS 2020"/>
    </label>
    <label>
    Section ID
    <input name="sectionID" placeholder="10480"/>
    </label>
    <label>
    Professor
    <input name="professorName" placeholder="Mary Jane"/>
    </label>
    <button type='submit'>Create Class</button>
    </form>
    </div>
    );
};


export default CreateClass;
