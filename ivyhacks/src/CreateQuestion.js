import React, { useEffect, useState } from "react";
import app from "./base";
import firebase from 'firebase/app';
import {useAuthState} from 'react-firebase-hooks/auth';
import 'firebase/auth';

const CreateQuestion = (props) => {

    const {course, assigns} = props


    
    const addQToDatabase = (async event => {
        console.log(assigns)
        event.preventDefault();
        const {assignName, questionTitle} = event.target.elements;
        var temp = {}
        assigns.forEach(hw => {
            if (hw['assignment'] === assignName.value) {
                console.log('yes')
                if (hw['question'] === undefined) {
                    hw['question'] = [questionTitle.value]
                } else {
                    hw['question'].push(questionTitle.value)
                }
                temp = hw['question']
            }
        })
        console.log(assigns)
        console.log(temp)
        // await app.database().ref('classes/' + course + "/assignments/" + assignName.value + '/question/').once('value').then((snapshot) => {
        //     setQuestions(snapshot.val());
        //     setLoaded(true);
        // });

        // console.log(questions)

        await app.database().ref('classes/' + course + '/assignments/' + assignName.value).set({
            question : temp,
        })
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