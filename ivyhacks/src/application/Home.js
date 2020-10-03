import React, {useEffect, useState} from "react";
import app from "../base";
import 'firebase/auth';
import firebase from 'firebase/app';
import {Link} from "react-router-dom";
import {useAuthState} from 'react-firebase-hooks/auth';

const Home = () => {
    const auth = firebase.auth();
    const [courses, setCourses] = useState(null);
    const [user] = useAuthState(auth);

    useEffect(() => {
        app.database().ref('users/' + user.uid).once('value').then(function (snapshot) {
            const getCourses = snapshot.val()['classes'];
            if (getCourses !== undefined && getCourses.length > 0) {
                setCourses(getCourses);
            }
            else {
                setCourses([]);
            }
            return;
        });
    }, []);

    return (
        <div className="dashboard">
            {courses && (
                <div className="courses">
                    <h1>Home</h1>
                    {courses.length === 0 && (
                        <div className="message">No classes</div>
                    )}
                    {courses.length > 0 && courses.map((value) => {
                        return <Link to={"/chat/" + value}> {value} </Link>
                    })}
                    <button onClick={() => app.auth().signOut()}>Sign out</button>
                </div>)}
        </div>
    );
};

export default Home;
