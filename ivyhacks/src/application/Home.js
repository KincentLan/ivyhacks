import React, {useContext, useEffect, useState} from "react";
import app from "../base";
import {AuthContext} from "../auth/Auth.js";
import {Link} from "react-router-dom";
import createClass from '../CreateClass.js'

const Home = () => {
    const [courses, setCourses] = useState(null);
    const [name, setName] = useState(null);
    const [role, setRole] = useState(null);
    const {currentUser} = useContext(AuthContext);

    useEffect(() => {
        app.database().ref('users/' + currentUser.uid).once('value').then(function (snapshot) {
            const getName = snapshot.val()['firstname'];
            const getRole = snapshot.val()['userType']
            const getCourses = snapshot.val()['classes'];
            if (getCourses !== undefined && getCourses.length > 0) {
                setCourses(getCourses);
            }
            else {
                setCourses([]);
            }
            setName(getName)
            setRole(getRole)
            return;
        });
    }, []);


    return (
        <div className="dashboard">
            {courses && (
                <div className="courses">
                    <h1>Home</h1>
                    <p>Name: { name }</p>
                    {role === 'instructor' && createClass()}
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