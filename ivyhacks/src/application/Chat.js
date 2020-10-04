import 'firebase/firestore';
import React, {useRef, useEffect, useState} from "react";
import {Redirect, useParams} from "react-router";
import firebase from "firebase";
import 'firebase/firestore';
import '../css/chat.css'

import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import app from "../base";

const firestore = firebase.firestore();
const auth = firebase.auth();

const Chat = () => {
    const {id, assignment, question} = useParams();
    const [redirect, setRedirect] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [currentUser] = useAuthState(auth);
    const [name, setName] = useState("");

    useEffect(() => {
        if (!loaded) {
            app.database().ref('users/' + currentUser.uid).once('value').then((snapshot) => {
                const dbUser = snapshot.val();
                if (dbUser['classes'] === undefined || !dbUser['classes'].includes(id.toUpperCase())) {
                    setRedirect(true);
                    setName(dbUser['firstname']);
                }
            })

            app.database().ref('classes/' + id.toUpperCase()).on('value', (snapshot) => {
                if (snapshot.val() !== null) {
                    const dbAssignments = snapshot.val()['assignments'];
                    if (dbAssignments === undefined) {
                        setRedirect(true);
                    } else if (!(assignment in dbAssignments)) {
                        setRedirect(true);
                    } else if (dbAssignments[assignment]['question'] === undefined) {
                        setRedirect(true);
                    }
                } else {
                    setRedirect(true);
                }
            });
            setLoaded(true);
        }
    }, []);

    if (redirect) {
        return <Redirect to="/home"/>;
    }

    return (
        <div className="App">
            <div className="navbar">
                <div className="left-title"> {id} </div>
                <div className="dropdown">
                    <button className="dropbtn"> {name} </button>
                    <div className="dropdown-content">
                        <a href="#">
                            <button id="homeButton" onClick={() => app.auth().signOut()}>Sign out</button>
                        </a>
                    </div>
                </div>
            </div>
            {loaded &&
            (<div className="message-chatbox">
                <section>
                    <ChatRoom id={id} assignment={assignment} question={question} currentUser={currentUser}/>
                </section>
            </div>)}
        </div>
    );
};

const ChatRoom = (props) => {
    const {id, assignment, question, currentUser} = props;
    const dummy = useRef();
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt');
    const [messages] = useCollectionData(query, {idField: 'id'});
    const [formValue, setFormValue] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();

        const uid = currentUser.uid;

        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid: uid,
            assignment: assignment,
            question: question,
            course: id
        })

        setFormValue('');
        dummy.current.scrollIntoView({behavior: 'smooth'});
    }

    return (<>
        <main>
            {messages && messages.filter(data => data['course'] === id && data['assignment'] === assignment
                && data['question'] === question).map(msg => <ChatMessage key={msg.id} message={msg}/>)}
            <span ref={dummy}></span>
        </main>

        <form class="typeInput" onSubmit={sendMessage}>
            <input value={formValue} onChange={(e) => setFormValue(e.target.value)}
                   placeholder="ask your question here"/>
            <button type="submit" disabled={!formValue}>🕊️</button>
        </form>
    </>)
}


function ChatMessage(props) {
    const {text, uid} = props.message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (<>
        <div className={`message ${messageClass}`}>
            <p>{text}</p>
        </div>
    </>)
}

export default Chat;