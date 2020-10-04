import React, {useEffect, useState} from "react";
import app from "../base";
import firebase from 'firebase/app';
import {useAuthState} from 'react-firebase-hooks/auth';
import 'firebase/auth';
import '../css/home.css';
import '../css/navbar-general.css'
import {Link} from "react-router-dom"
import RegisterClass from "../RegisterClass"

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
            <>
            <div className="navbar-home">
                <div className="left-title">Dashboard</div>
                <div className="dropdown">
                    <button className="dropbtn"> {name} </button>
                    <div className="dropdown-content">
                        <a href="#">
                            <button id="homeButton" onClick={() => app.auth().signOut()}>Sign out</button>
                        </a>
                    </div>
                </div>
            </div>
            <div id="dashboard">
                <div id='classes'>
                    <h1>Courses you manage</h1>
                    <div className="grid-box">
                        <div className="wrapper"> {courses && (
                            courses.map((value) => {
                                return <div className="option">
                                    <Link className="black"
                                          to={"/course/" + value}><button id="class_button">{value}</button></Link>
                                </div>;
                            })

                        )}
                            <div id="createClass" className="option">
                                <Link className="black" to="/CreateClass">
                                    <button id='new_class_button'>
                                        + Create Another Class
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            </>)
    } else {
        return (
            <div id="dashboard">
                <div className="navbar-home">
                    <div className="left-title">Dashboard</div>
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
                    <div className="grid-box">
                        <div className="wrapper"> {courses && (
                            courses.map((value) => {
                                return <div className="option">
                                    <Link className="black"
                                          to={"/course/" + value}><button id="class_button">{value}</button></Link>
                                </div>;
                            })

                        )}
                        </div>
                        <div id="createClass" className="option">
                                <Link className="black" to="/RegisterClass">
                                    <button id='new_class_button'>
                                        + Register Another Class
                                    </button>
                                </Link>
                            </div>
                    </div>
                </div>
            </div>)
    }
}

export default Home;
