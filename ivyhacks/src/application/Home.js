import React, {useContext, useEffect, useState} from "react";
import app from "../base";
import {AuthContext} from "../auth/Auth.js";
import {Link} from "react-router-dom";

const Home = () => {
    const [courses, setCourses] = useState(null);
    const {currentUser} = useContext(AuthContext);

    useEffect(() => {
        app.database().ref('users/' + currentUser.uid).once('value').then(function (snapshot) {
            const courses = snapshot.val()['classes'];
            if (courses !== undefined && courses.length > 0) {
                setCourses(courses);
            }
            else {
                setCourses([]);
            }
        })
    }, []);

    return (
        <div className="dashboard">
            {courses && (
                <div className="courses">
                    <h1>Home</h1>
                    {courses.length === 0 && (
                        <div className="message">No classes</div>
                    )}
                    {courses.length > 0 && courses.map((value) => {
                        return <Link to={"/chat/" + value}> {value} </Link>
                    })}
                    <button onClick={() => app.auth().signOut()}>Sign out</button>
                </div>)}
        </div>
    );
};

export default Home;
