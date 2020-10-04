import React, {useEffect, useState} from "react";
import app from "../base";
import firebase from 'firebase/app';
import {useAuthState} from 'react-firebase-hooks/auth';
import 'firebase/auth';
import {Redirect, useParams} from "react-router";
import {Link} from "react-router-dom"
import "../css/chatdashboard.css";


const ChatDashboard = () => {
    const auth = firebase.auth();
    const [currentUser] = useAuthState(auth);

    const {id} = useParams();
    const [redirect, setRedirect] = useState(false);
    const [assignments, setAssignments] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [name, setName] = useState(null);

    useEffect(() => {
        if (!loaded) {
            app.database().ref('users/' + currentUser.uid).once('value').then((snapshot) => {
                const dbUser = snapshot.val();
                if (dbUser['classes'] === undefined || !dbUser['classes'].includes(id.toUpperCase())) {
                    setRedirect(true);
                    setLoaded(true);
                }
                setName(snapshot.val()['firstname']);
            })
            app.database().ref('classes/' + id.toUpperCase()).on('value', (snapshot) => {
                const curAssignments = [];
                console.log(snapshot.val());
                console.log('this ran');
                if (snapshot.val() !== null) {
                    const dbAssignments = snapshot.val()['assignments'];
                    if (dbAssignments !== undefined) {
                        for (const key in dbAssignments) {
                            curAssignments.push({assignment: key, question: dbAssignments[key]['question']});
                        }
                    }
                }
                setAssignments(curAssignments);
                setLoaded(true);
            });
            setLoaded(true);
        };
    }, []);

    if (redirect) {
        return <Redirect to="/home"/>;
    }

    return  (<div className="chatDashboard">
    <div className="navbar">
        <div className="left-title"> {id} </div>
        <div className="dropdown">
            <button className="dropbtn"> {name} </button>
            <div className="dropdown-content">
                <a href="#">
                    <button id="homeButton" onClick={() => app.auth().signOut()}>Sign out</button>
                </a>
            </div>
        </div>
    </div>
    <div className="discussion">
        <h1>Current Discussion Rooms</h1>
        {assignments.map((value) => {
            return <div
                className="assignment"> {value.assignment} {value.question !== undefined && value.question.map((q) => {
                return <button className="question"><Link
                    to={'/chat/' + id + '/' + value.assignment + '/' + q}> {q} </Link></button>;
            })} </div>
        })}
    </div>
</div>)
}

export default ChatDashboard;