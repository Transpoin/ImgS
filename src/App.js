import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Search from './components/pages/Search';
import Testimonial from './components/pages/Testimonial';
import Register from './components/pages/Register';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


function App() {
  return (
    <>
      <Router>
        <Navbar />
          <Routes>
          <Route path='/' element={<Home />}/>
            <Route path='/search' element={<Search />} />
            <Route path='/testimonial' element={<Testimonial />} />
            <Route path='/register' element={<Register />} />
          </Routes>
      </Router>
    </>
  );
}

export default App;
