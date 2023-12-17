import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard';
import TaskList from './components/tasklist';
import TaskForm from './components/taskform';
import Settings from './components/Settings'
import Navbar from './components/navbar';
import Footer from './components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  return (
    <Router>
      <Navbar /> 
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasklist" element={<TaskList />} />
          <Route path="/taskform" element={<TaskForm />} />
          <Route path="/Settings" element={<Settings />} />
        </Routes>
      </div>
      <Footer /> 
    </Router>
  );
}

export default App;
