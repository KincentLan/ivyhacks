import React, {useEffect, useState} from "react";
import app from "./base";

const CreateAssignment = (props) => {

    const {course} = props

    const storageRef = app.storage().ref(Number(new Date()).toString());


    const addAssignToDatabase = (async event => {
        event.preventDefault();
        const {assignName, dueDate, file} = event.target.elements;
        await app.database().ref('classes/' + course + "/assignments/" + assignName.value).set({
            assignName: course,
            dueDate: dueDate.value,
        })
    });

    return (
        <div className="createItem">
            <h1>Create a new assignment</h1>
            <form onSubmit={addAssignToDatabase}>
                <label>
                    Assignment Name
                    <input name="assignName" placeholder="Homework 1"/>
                </label>
                <label>
                    Due Date
                    <input name="dueDate" placeholder="10/4/20"/>
                </label>
                <label>
                    Choose File
                    <input name="file" id="uploadPdf" type="file" accept=".pdf"/>
                </label>
                <button type='submit'>Create Assignment</button>
            </form>
        </div>
    );
};


export default CreateAssignment;