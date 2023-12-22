import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard';
import TaskList from './components/tasklist';
import TaskForm from './components/taskform';
import Settings from './components/Settings';
import RegisterForm from './components/registration';
import LoginForm from './components/login';
import Navbar from './components/navbar';
import Footer from './components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
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
          <Route path="/registration" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;