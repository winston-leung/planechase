
import { useState } from 'react';
import './App.css';
import planes from "./planes.json";
import Header from './Header';
import Main from './Main';
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/:path" element={<div></div>} />
        <Route path="">404: Oops!</Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
