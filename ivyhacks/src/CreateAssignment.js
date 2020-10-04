import React, {useEffect, useState} from "react";
import app from "./base";

const CreateAssignment = (props) => {

    const {course} = props

    const storageRef = app.storage().ref(Number(new Date()).toString());


    const addAssignToDatabase = (async event => {
        event.preventDefault();
        const {assignName, dueDate, file} = event.target.elements;
        await app.database().ref('classes/' + course + "/assignments/" + assignName.value).set({
            assignName: assignName.value,
            dueDate: dueDate.value,
            question: ['general']
        })
    });

    return (
        <div className="createItem">
            <h1>Create a new assignment</h1>
            <form onSubmit={addAssignToDatabase}>
                <div className="inputBox">
                    <div className="inputField">
                        <label>
                            Assignment Name
                        </label>
                        <input name="assignName" placeholder="Homework 1"/>
                    </div>
                    <div className="inputField">
                        <label>
                            Due Date
                        </label>
                        <input name="dueDate" placeholder="10/4/20"/>
                    </div>
                    <div className="inputField">
                        <label>
                            Choose File
                        </label>
                        <input name="file" id="uploadPdf" type="file" accept=".pdf"/>
                    </div>
                </div>
                <button type='submit'>Create Assignment</button>
            </form>
        </div>
    );
};


export default CreateAssignment;