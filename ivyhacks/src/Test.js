import React from 'react';
import * as firebase from "firebase";
import app from "./base";

const Test = () => {
    const instructor = app.database().ref('classes/testClass/instructor');
    instructor.on('value', function (snapshot) {
        console.log(snapshot.val())
    });


    return (
        <div>
        </div>
    );
};

export default Test;