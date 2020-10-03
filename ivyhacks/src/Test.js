import React from 'react';
import * as firebase from "firebase";
import app from "./base";

const Test = () => {
    app.database().ref('classes/testClass').set({
        instructor: "p"
    });

    return (
        <div>
        </div>
    );
};

export default Test;