import 'firebase/firestore';
import React, {useRef, useEffect, useState} from "react";
import {Redirect, useParams} from "react-router";
import firebase from "firebase";
import 'firebase/firestore';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import app from "../base";

const firestore = firebase.firestore();
const auth = firebase.auth();

const Chat = () => {
    const {id, assignment, question} = useParams();
    const [redirect, setRedirect] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [currentUser] = useAuthState(auth);

    useEffect(() => {
        if (!loaded) {
            app.database().ref('users/' + currentUser.uid).once('value').then((snapshot) => {
                const dbUser = snapshot.val();
                if (dbUser['classes'] === undefined || !dbUser['classes'].includes(id.toUpperCase())) {
                    setRedirect(true);
                }
            })

            app.database().ref('classes/' + id.toUpperCase()).on('value', (snapshot) => {
                if (snapshot.val() !== null) {
                    const dbAssignments = snapshot.val()['assignments'];
                    if (dbAssignments === undefined) {
                        setRedirect(true);
                    }
                    else if (!(assignment in dbAssignments)){
                        setRedirect(true);
                    }
                    else {
                        let encounter = false;
                        for (const key in dbAssignments) {
                            if (dbAssignments[key]['question'] === undefined) {
                            }
                            else if (dbAssignments[key]['question'].includes(question)) {
                                encounter = true;
                            }
                        }
                        setRedirect(false);
                    }
                }
                else {
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
        <div className="chat">
            <header>
                <h1>⚛🔥💬</h1>
            </header>
            <section>
                <ChatRoom id={id} assignment={assignment} question={question} currentUser={currentUser}/>
            </section>
        </div>
    );
};

const ChatRoom = (props) => {
    const {id, assignment, question, currentUser} = props;

    const dummy = useRef();
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);

    console.log(query);
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
            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
            <span ref={dummy}></span>
        </main>

        <form onSubmit={sendMessage}>
            <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="ask your question here" />
            <button type="submit" disabled={!formValue}>🕊️</button>
        </form>
    </>)
}


function ChatMessage(props) {
    const { text, uid } = props.message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (<>
        <div className={`message ${messageClass}`}>
            <p>{text}</p>
        </div>
    </>)
}

export default Chat;