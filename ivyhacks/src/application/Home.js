import React, {useEffect, useState} from "react";
import app from "../base";
import firebase from 'firebase/app';
import {useAuthState} from 'react-firebase-hooks/auth';
import 'firebase/auth';
import '../css/home.css';
import {Link} from "react-router-dom"

const Home = () => {
    const auth = firebase.auth();
    const [user] = useAuthState(auth);
    const [courses, setCourses] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [name, setName] = useState(null);
    const [isInstructor, setIsInstructor] = useState(false);

    useEffect(() => {
        if (!loaded) {
            app.database().ref('users/' + user.uid).once('value').then((snapshot) => {
                if (snapshot.val()['classes'] !== undefined) {
                    setCourses(snapshot.val()['classes']);
                } else {
                    setCourses([]);
                }
                setName(snapshot.val()['firstname']);
                setIsInstructor(snapshot.val()['userType'] === 'instructor');
                setLoaded(true);
            });
        }
    });

    if (!loaded) {
        return null;
    }

    if (isInstructor) {
        return (
            <div id="dashboard">
                <div className="navbar">
                    <div className="dropdown">
                        <button className="dropbtn"> {name} </button>
                        <div className="dropdown-content">
                            <a href="#">
                                <button id="homeButton" onClick={() => app.auth().signOut()}>Sign out</button>
                            </a>
                        </div>
                    </div>
                </div>

                <div id='classes'>
                    <h1>Courses you manage</h1>
                    <div className="wrapper"> {courses && (
                        courses.map((value) => {
                            return <div className="option">
                                <button id="class_button"><Link className="black"
                                                                to={"/course/" + value}>{value}</Link></button>
                            </div>;
                        })

                    )}
                        <div className="option">
                            <button id='new_class_button'>
                                <Link className="black" to="/CreateClass">+ Create Another Class</Link>
                            </button>
                        </div>
                    </div>
                </div>

            </div>)
    } else {
        return (
            <div id="dashboard">
                <div className="navbar">
                    <div className="dropdown">
                        <button className="dropbtn"> {name} </button>
                        <div className="dropdown-content">
                            <a href="#">
                                <button id="homeButton" onClick={() => app.auth().signOut()}>Sign out</button>
                            </a>
                        </div>
                    </div>
                </div>

                <div id='classes'>
                    <h1>Courses you are in</h1>
                    <div className="wrapper"> {courses && (
                        courses.map((value) => {
                            return <div className="option">
                                <button id="class_button"><Link className="black"
                                                                to={"/course/" + value}>{value}</Link></button>
                            </div>;
                        })

                    )}
                    </div>
                </div>

            </div>)
    }
}

export default Home;
