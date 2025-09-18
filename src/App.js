// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import BrowseOpportunities from './pages/BrowseOpportunities';
import PostOpportunity from './pages/PostOpportunity';
import ClubSignUp from './pages/ClubSignUp';
import ClubLogin from './pages/ClubLogin';
import Dashboard from './pages/DashBoard';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<BrowseOpportunities />} />
            <Route path="/post" element={<PostOpportunity />} />
            <Route path="/signup" element={<ClubSignUp />} />
            <Route path="/login" element={<ClubLogin />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;