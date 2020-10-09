import React from "react";
import Routes from "./routes";
import './styles/styles.css';
import Header from "./components/Header";

const App = () => (
    <div className="App">
    	<div className="stars"></div>
        <div className="twinkling"></div>
        <Header />
        <Routes />
    </div>
);

export default App;
