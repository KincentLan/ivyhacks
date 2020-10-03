import React, {useContext, useEffect, useState} from 'react';
import {Redirect, useParams} from "react-router";
import {AuthContext} from "../auth/Auth.js";
import app from "../base";

const ChatDashboard = () => {
    const [courseExists, setCourseExists] = useState(null);
    console.log(useParams());
    const {id} = useParams();
    const {currentUser} = useContext(AuthContext);

    const addQuestionChat = (async event => {
        event.preventDefault();
        const {className, sectionID, professorName} = event.target.elements;
        await app.database().ref('classes/' + className.value).set({
            className: className.value,
            sectionID: sectionID.value,
            professorName: professorName.value
        })
    });

    useEffect(() => {
        app.database().ref('classes/' + id).once('value').then(function (snapshot) {
            setCourseExists(snapshot.exists());
        })
    }, []);

    if (currentUser.courses === undefined || !currentUser.courses.includes(course)) {
        return <Redirect to="/home"/>;
    }

    if (courseExists !== null && !courseExists) {
        return <Redirect to="/home"/>;
    }

    return (
        <div className="chat-dashBoard">
            {courseExists && (
                <div>
                    {id}
                    <h1>Create a new class</h1>
                    <form onSubmit={}>
                        <label>
                            Assignment name:
                            <input name="className" placeholder="PHYS 2020"/>
                        </label>
                        <label>
                            Section ID
                            <input name="sectionID" placeholder="10480"/>
                        </label>
                        <label>
                            Professor
                            <input name="professorName" placeholder="Mary Jane"/>
                        </label>
                        <button type='submit'>Create Class</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatDashboard;