import React, {useContext, useState, useEffect} from 'react';
import {Redirect, useParams} from "react-router";
import app from "../base";
import firebase from 'firebase/app';
import {useAuthState} from 'react-firebase-hooks/auth';
import 'firebase/auth';


const ChatDashboard = () => {
    const auth = firebase.auth();
    const uid = auth.user.uid;
    const [courses, setCourses] = useState([]);
    app.database().ref('users')
    return (
        <div>Hello</div>
    );
};

export default ChatDashboard;