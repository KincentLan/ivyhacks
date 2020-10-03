import React from "react";
import app from "../base";

export const AuthContext = React.createContext("light");

const Home = () => {
  return (
    <div className="dashboard">
      <h1>Home</h1>
      <button onClick={() => app.auth().signOut()}>Sign out</button>
    </div>
  );
};

export default Home;
