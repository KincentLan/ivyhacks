import React, { useEffect, useState } from "react";
import app from "./base";
import {useAuthState} from 'react-firebase-hooks/auth';
import {Redirect} from "react-router";
import firebase from 'firebase/app';

const CreateClass = () => {
  const auth = firebase.auth();
  const [currentUser] = useAuthState(auth);
  const [loaded, setLoaded] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!loaded) {
      app.database().ref('users/' + currentUser.uid).once('value').then((snapshot) => {
        const dbUser = snapshot.val();
        if (dbUser['userType'] !== 'instructor') {
            setRedirect(true);
            setLoaded(true);
        }
    })
      setLoaded(true);
    }

  }, []);

  if (redirect) {
    return <Redirect to="/home"/>; 
  }


  const addClassToDatabase = (async event => {
    event.preventDefault();
    const {className, sectionID, professorName} = event.target.elements;
    await app.database().ref('classes/' + className.value).set({
      className: className.value,
      sectionID: sectionID.value,
      professorName: professorName.value,
      assignments: {general: {question: ["general"]}},
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
