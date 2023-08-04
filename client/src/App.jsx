import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Addstud from './pages/addstud';
import Addbranch from './pages/Addbranch';
import Addclg from './pages/Addclg';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/addcollege" element={ <Addclg/> } />
        <Route path="/addbranch" element={ <Addbranch/> } />
        <Route path="/addstudent" element={ <Addstud/> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
