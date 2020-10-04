import React, { useEffect, useState } from "react";
import app from "./base";
import firebase from 'firebase/app';
import {useAuthState} from 'react-firebase-hooks/auth';
import 'firebase/auth';

const CreateQuestion = (props) => {

    const {course} = props
    const [loaded, setLoaded] = useState(false);
    const [courses, setCourses] = useState([]);
    const [questions, setQuestions] = useState([]);

    // useEffect(() => {
    //     if (!loaded) {
    //         app.database().ref('classes/' + course + "/assignments/" ).once('value').then((snapshot) => {
    //             setQuestions(snapshot.val());
    //         });
    //         setLoaded(true);
    //     }
    // })
    
    const addQToDatabase = (async event => {
        event.preventDefault();
        const {assignName, questionTitle} = event.target.elements;
        await app.database().ref('classes/' + course + "/assignments/" + assignName.value + '/question/').once('value').then((snapshot) => {
            setQuestions(snapshot.val());
            setLoaded(true);
        });

        console.log(questions)

        // await app.database().ref('classes/' + course + "/assignments/" + assignName.value).set({
        //     question : questions,
        // })
    }); 

    
    return (
        <div>
        <h1>Create a new question</h1>
        <form onSubmit={addQToDatabase}>
        <label>
        Assignment Name
        <input name="assignName" placeholder="general"/>
        </label>
        <label>
        Question
        <input name="questionTitle" placeholder="q1"/>
        </label>
        <button type='submit'>Create Question</button>
        </form>
        </div>
        );
    };
    
    
    export default CreateQuestion;