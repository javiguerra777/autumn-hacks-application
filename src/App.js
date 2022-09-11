<<<<<<< HEAD

import './App.css';

function App() {
  return (
    <div className="App">
     <h1>Hello</h1>
    </div>
=======
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home/> }/>
      </Route>
    </Routes>
>>>>>>> 4df31fe6b80b5eb34b0a67db23defc10ef34dca5
  );
}

export default App;
