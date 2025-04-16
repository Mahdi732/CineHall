import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Films from './pages/Films';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Booking from './pages/Booking';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/films" element={<Films />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/booking/:id" element={<Booking />} />
            {/* Add more routes as needed */}
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
