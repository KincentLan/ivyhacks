import React, {useEffect, useState} from "react";
import app from "../base";
import firebase from 'firebase/app';
import {useAuthState} from 'react-firebase-hooks/auth';
import 'firebase/auth';
import {Redirect, useParams} from "react-router";
import {Link} from "react-router-dom"
import CreateAssignment from '../CreateAssignment';
import "../css/chatdashboard.css";
import ChatDashboard from './ChatDashboard'

const Course = () => {
    const auth = firebase.auth();
    const [currentUser] = useAuthState(auth);
    const {id} = useParams();
    const [redirect, setRedirect] = useState(false);
    const [assignments, setAssignments] = useState([]);
    const [isInstructor, setIsInstructor] = useState(false);
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
                setIsInstructor(snapshot.val()['userType'] === 'instructor');
                console.log(snapshot.val()['userType'])
                setName(snapshot.val()['firstname']);
            })
            app.database().ref('classes/' + id.toUpperCase()).on('value', (snapshot) => {
                const curAssignments = [];
                if (snapshot.val() !== null) {
                    const dbAssignments = snapshot.val()['assignments'];
                    for (const key in dbAssignments) {
                        curAssignments.push({assignment: key, question: dbAssignments[key]['question']});
                    }
                }
                setAssignments(curAssignments);
            });
            setLoaded(true);
        };
    }, []);

    if (!loaded) {
        return null;
    }
    else if (redirect) {
        return <Redirect to="/home"/>;
    }

    else if (isInstructor) {
        return (<div className="chatDashboard">
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
            <CreateAssignment course={id}/>
        </div>)
    } else {
        return <ChatDashboard/>;
        //<Redirect to={"/chat/" + id}/>
        // return (
        //     <div className="chatDashboard">
        //         <div className="navbar">
        //             <div className="left-title"> {id} </div>
        //             <div className="dropdown">
        //                 <button className="dropbtn"> {name} </button>
        //                 <div className="dropdown-content">
        //                     <a href="#">
        //                         <button id="homeButton" onClick={() => app.auth().signOut()}>Sign out</button>
        //                     </a>
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="discussion">
        //             <h1>Current Discussion Rooms</h1>
        //             {assignments.map((value) => {
        //                 return <div
        //                     className="assignment"> {value.assignment} {value.question !== undefined && value.question.map((q) => {
        //                     return <button className="question"><Link
        //                         to={'/chat/' + id + '/' + value.assignment + '/' + q}> {q} </Link></button>;
        //                 })} </div>
        //             })}
        //         </div>
        //     </div>);
    }
};

export default Course