import React from "react";
import app from "./fire";

const Home = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={() => app.auth().signOut()}>Sign Out</button>
        </div>
    );
};

export default Home;