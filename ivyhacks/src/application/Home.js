import React, {useContext, useEffect, useState} from "react";
import * as firebase from "firebase/app";
import app from "../base";
import {AuthContext} from "../auth/Auth.js";

const Home = () => {
    const [courses, setCourses] = useState([]);
    const [role, setRole] = useState([]);
    const {currentUser} = useContext(AuthContext);

    useEffect(() => {
        app.database().ref('users/' + currentUser.uid).once('value').then(
          function (snapshot) {
            const courses = snapshot.val()['classes'];
            if (courses.length > 0) {
                setCourses(courses);
            }
        })
    }, []);

    useEffect(() => {
      app.database().ref('users/' + currentUser.uid).once('value').then(
        function (snapshot) {
          setRole(snapshot.val()['userType']);
      })
  }, []);

    return (
        <div className="dashboard">
            {courses.length > 0 && (
                <div className="courses">
                    <h1>Home</h1>
                    <div className='role'>{ role }</div>
                    {courses.map((value, i) => {
                        return <div className="class">{value}</div>
                    })}
                    <button onClick={() => app.auth().signOut()}>Sign out</button>
                </div>)}
        </div>
    );
};

export default Home;
