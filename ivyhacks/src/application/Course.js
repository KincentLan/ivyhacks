import React, {useEffect, useState} from "react";
import app from "../base";
import firebase from 'firebase/app';
import {useAuthState} from 'react-firebase-hooks/auth';
import 'firebase/auth';
import {Redirect, useParams} from "react-router";
import {Link} from "react-router-dom"
import CreateAssignment from '../CreateAssignment';

const Course = () => {
    const auth = firebase.auth();
    const [currentUser] = useAuthState(auth);
    const {id} = useParams();
    const [redirect, setRedirect] = useState(false);
    const [assignments, setAssignments] = useState([]);
    const [isInstructor, setIsInstructor] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            app.database().ref('users/' + currentUser.uid).once('value').then((snapshot) => {
                const dbUser = snapshot.val();
                if (dbUser['classes'] === undefined || !dbUser['classes'].includes(id.toUpperCase())) {
                    setRedirect(true);
                    setLoaded(true);
                }
                setIsInstructor(snapshot.val()['userType'] === 'instructor')
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
    console.log(assignments);
    
    if (!loaded) {
        return null;
    }
    if (redirect) {
        return <Redirect to="/home"/>;
    }

    if (isInstructor) {
        return (<div>
            <div>{assignments.map((value) => {
            return <div className="assignment"> {value.assignment} { value.question !== undefined && value.question.map((q) => {
                return <button className="question" ><Link to={'/chat/' + id + '/' + value.assignment + '/' + q}> {q} </Link></button>;
            })} </div>
        })}
        </div>
        <CreateAssignment/>
        </div>)

    } else {

        return (
            <div>{assignments.map((value) => {
                return <div className="assignment"> {value.assignment} { value.question !== undefined && value.question.map((q) => {
                    return <button className="question" ><Link to={'/chat/' + id + '/' + value.assignment + '/' + q}> {q} </Link></button>;
                })} </div>
            })}
            </div>);
    }
};

export default Course