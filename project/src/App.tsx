import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Wishlist from './pages/Wishlist';
import MyGarden from './pages/MyGarden';
import Profile from './pages/Profile';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const handleLogin = (name: string) => {
    setIsLoggedIn(true);
    setUserName(name);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar isLoggedIn={isLoggedIn} userName={userName} onLogout={handleLogout} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/catalog" 
              element={
                isLoggedIn ? (
                  <Catalog userName={userName} />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            <Route 
              path="/wishlist" 
              element={
                isLoggedIn ? (
                  <Wishlist userName={userName} />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            <Route 
              path="/my-garden" 
              element={
                isLoggedIn ? (
                  <MyGarden userName={userName} />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            <Route 
              path="/profile" 
              element={
                isLoggedIn ? (
                  <Profile userName={userName} />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            <Route 
              path="/login" 
              element={
                isLoggedIn ? (
                  <Navigate to="/catalog" replace />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              } 
            />
            <Route 
              path="/signup" 
              element={
                isLoggedIn ? (
                  <Navigate to="/catalog" replace />
                ) : (
                  <SignUp onSignUp={handleLogin} />
                )
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;