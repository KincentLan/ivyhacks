import React, {useContext, useState, useEffect} from 'react';
import {Redirect, useParams} from "react-router";
import app from "../base";
import firebase from 'firebase/app';
import {useAuthState} from 'react-firebase-hooks/auth';
import 'firebase/auth';


const ChatDashboard = () => {
    const auth = firebase.auth();
    const [currentUser] = useAuthState(auth);

    const {id} = useParams();
    const [redirect, setRedirect] = useState(false);
    const [assignments, setAssignments] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            app.database().ref('users/' + currentUser.uid).once('value').then((snapshot) => {
                const dbUser = snapshot.val();
                if (dbUser['classes'] === undefined || !dbUser['classes'].includes(id.toUpperCase())) {
                    setRedirect(true);
                    setLoaded(true);
                }
            })

            app.database().ref('classes/' + id.toUpperCase()).on('value', (snapshot) => {
                const curAssignments = [];
                console.log(snapshot.val());
                console.log('this ran');
                if (snapshot.val() !== null) {
                    const dbAssignments = snapshot.val()['assignments'];
                    for (const key in dbAssignments) {
                        curAssignments.push({assignment: key, question: dbAssignments[key]['question']});
                    }
                }
                setAssignments(curAssignments);
            });
        };
    }, []);



    console.log(assignments);

    if (redirect) {
        return <Redirect to="/home"/>;
    }

    return (
        <div>{assignments.map((value) => {
            return <div className="row"> {value.question.map((q) => {
                return <div className="assignment">{value.assignment} <div className="question"> {q} </div> </div>;
            })} </div>
        })}
        </div>);
}

export default ChatDashboard;