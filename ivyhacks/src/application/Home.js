import React, {useEffect, useState} from "react";
import app from "../base";
import firebase from 'firebase/app';
import {useAuthState} from 'react-firebase-hooks/auth';
import 'firebase/auth';
import CreateClass from "../CreateClass"

const Home = () => {
    const auth = firebase.auth();
    const [user] = useAuthState(auth);
    const [courses, setCourses] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [name, setName] = useState(null);
    const [userType, setType] = useState(null);

    useEffect(() => {
        if (!loaded) {
            app.database().ref('users/' + user.uid).once('value').then((snapshot) => {
                if (snapshot.val()['classes'] !== undefined) {
                    setCourses(snapshot.val()['classes']);
                }
                else {
                    setCourses([]);
                }
                setName(snapshot.val()['firstname']);
                setType(snapshot.val()['userType']);
                setLoaded(true);
            });
        }
    });

    return (
        <div>
            <p>Name: {name} </p>
            { userType === 'instructor' && "Instuctor role"}
            {courses && (
                courses.map((value) => {
                    return <div> {value} </div>;
                })
            )}
            <button onClick={() => app.auth().signOut()}>Sign out</button>
        </div>
    )
}

export default Home;
