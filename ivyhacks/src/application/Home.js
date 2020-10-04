import React, {useEffect, useState} from "react";
import app from "../base";
import firebase from 'firebase/app';
import {useAuthState} from 'react-firebase-hooks/auth';
import 'firebase/auth';
import {Link} from "react-router-dom"

const Home = () => {
    const auth = firebase.auth();
    const [user] = useAuthState(auth);
    const [courses, setCourses] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [name, setName] = useState(null);
    const [userType, setType] = useState(null);

    useEffect(() => {
        if (!loaded) {
            app.database().ref('users/' + user.uid).once('value').then((snapshot) => {
                if (snapshot.val()['classes'] !== undefined) {
                    setCourses(snapshot.val()['classes']);
                }
                else {
                    setCourses([]);
                }
                setName(snapshot.val()['firstname']);
                setType(snapshot.val()['userType']);
                setLoaded(true);
            });
        }
    });

    return (
        <div id="dashboard">
            <div className="navbar">
                <button id="homeButton"><Link className="white" to="/">Home</Link></button>
                <label id ="name"> { name } </label>
                <button id="homeButton" onClick={() => app.auth().signOut()}>Sign out</button>
            </div>
            { userType === 'instructor' && (
            <div>
                <p>
                    <div id="section_label">COURSES YOU MANAGE</div>
                </p>
            </div>)}
            <div id='classes'>
            {courses && (
                courses.map((value) => {
                    return <button id="class_button"> <Link className="black" to={"/course/" + value}>{value}</Link></button>;
                })
                
            )}
            { userType === 'instructor' && (<button id='new_class_button'>
                    <Link className="black" to="/CreateClass">+ Create Another Class</Link>
                </button>) }
            </div>
            
        </div>
    )
}

export default Home;
