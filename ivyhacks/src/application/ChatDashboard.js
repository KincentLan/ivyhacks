import React, {useContext, useState, useEffect} from 'react';
import {Redirect, useParams} from "react-router";
import app from "../base";
import firebase from 'firebase/app';
import 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';

const ChatDashboard = () => {
    const auth = firebase.auth();
    const [user] = useAuthState(auth);

    return (
        <div>Hello</div>
    );
};

export default ChatDashboard;