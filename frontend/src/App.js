import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import './components/styles.css';
import Header from './components/Header';
import SurveysPage from './components/SurveysPage';
import AccountPage from './components/AccountPage';
import LoginPage from './components/LoginPage';
import AdministerUsersPage from './components/AdministerUsersPage';
import PendingSurveysPage from './components/PendingSurveysPage';
import RootPage from './components/RootPage';
import MySurveysPage from './components/MySurveyPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    if (token && userRole) {
      setIsLoggedIn(true);
      setRole(userRole);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setRole(localStorage.getItem('role'));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  return (
    <Router>
      <div className="App">
        {isLoggedIn && <Header onLogout={handleLogout} />}
        <AppRoutes isLoggedIn={isLoggedIn} role={role} onLogin={handleLogin} />
      </div>
    </Router>
  );
}

function AppRoutes({ isLoggedIn, role, onLogin }) {
  const location = useLocation();

  const getRedirectPath = () => {
    if (role === 'root') {
      return '/root';
    }
    return '/surveys';
  };

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Navigate to={location.state?.from || getRedirectPath()} /> : <LoginPage onLogin={onLogin} />} />
      <Route path="/login" element={isLoggedIn ? <Navigate to={location.state?.from || getRedirectPath()} /> : <LoginPage onLogin={onLogin} />} />
      <Route path="/surveys" element={isLoggedIn ? <SurveysPage /> : <Navigate to="/login" state={{ from: location.pathname }} />} />
      <Route path="/my-surveys" element={isLoggedIn ? <MySurveysPage /> : <Navigate to="/login" state={{ from: location.pathname }} />} />
      <Route path="/account" element={isLoggedIn ? <AccountPage /> : <Navigate to="/login" state={{ from: location.pathname }} />} />
      {role === 'admin' && (
        <>
          <Route path="/administer-users" element={isLoggedIn ? <AdministerUsersPage /> : <Navigate to="/login" state={{ from: location.pathname }} />} />
          <Route path="/pending-surveys" element={isLoggedIn ? <PendingSurveysPage /> : <Navigate to="/login" state={{ from: location.pathname }} />} />
        </>
      )}
      {role === 'root' && (
        <Route path="/root" element={isLoggedIn ? <RootPage /> : <Navigate to="/login" state={{ from: location.pathname }} />} />
      )}
    </Routes>
  );
}

export default App;
