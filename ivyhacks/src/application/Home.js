import React, {useEffect, useState} from "react";
import app from "../base";
import firebase from 'firebase/app';
import 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';

const Home = () => {
    const auth = firebase.auth();
    const [user] = useAuthState(auth);
    const [courses, setCourses] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            app.database().ref('users/' + user.uid).once('value').then((snapshot) => {
                if (snapshot.val()['classes'] !== undefined) {
                    setCourses(snapshot.val()['classes']);
                }
                else {
                    setCourses([]);
                }
                setLoaded(true);
            });
        }
    });

    return (
        <div>
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
