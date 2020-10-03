import 'firebase/firestore';
import {AuthContext} from "../auth/Auth.js";
import React, {useContext} from "react";
import {Redirect} from "react-router";

const Chat = (props) => {
    const {course, assignment, question} = props;
    const {currentUser} = useContext(AuthContext);

    console.log(currentUser);

    if (currentUser.courses === undefined || !currentUser.courses.includes(course)) {
        return <Redirect to="/home"/>;
    }

    return (
        <div>Works!</div>
    );
};

export default Chat;