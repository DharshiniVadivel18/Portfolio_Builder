import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home.jsx';
import Builder from './components/Builder.jsx';
import Portfolio from './components/Portfolio.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/builder" element={<ProtectedRoute><Builder /></ProtectedRoute>} />
          <Route path="/portfolio/:id" element={<Portfolio />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;