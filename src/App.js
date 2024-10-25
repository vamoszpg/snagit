import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Reports from './components/Reports';
import './components/Reports.css';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';
import LandingPage from './components/LandingPage';
import FindOutMore from './components/FindOutMore';
import config from './config';
import SnagForm from './components/SnagForm';
import SnagList from './components/SnagList';

function App() {
  console.log('API URL:', config.API_URL);
  const [snags, setSnags] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [savedReports, setSavedReports] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    setSnags([]);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAddSnag = (newSnag) => {
    setSnags(prevSnags => [...prevSnags, { ...newSnag, id: Date.now(), date: new Date() }]);
  };

  const handleDeleteSnag = (id) => {
    setSnags(prevSnags => prevSnags.filter(snag => snag.id !== id));
  };

  const handleSaveReport = (report) => {
    console.log("Received report in App.js:", report);
    setSavedReports(prevReports => [...prevReports, { ...report, id: Date.now() }]);
  };

  const handleDeleteReport = (reportId) => {
    setSavedReports(prevReports => prevReports.filter(report => report.id !== reportId));
  };

  const handleClearAllSnags = () => {
    if (window.confirm('Are you sure you want to clear all snags?')) {
      setSnags([]);
    }
  };

  const clearNotification = (id) => {
    setNotifications(prevNotifications => prevNotifications.filter(notif => notif.id !== id));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
    document.body.classList.toggle('dark-mode');
  };

  const handleLogin = (email) => {
    // Here you would typically validate the email or perform an API call
    // For now, we'll just set isAuthenticated to true
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('dashboard'); // Reset to dashboard when logging out
  };

  return (
    <Router>
      <div className={`App ${isDarkMode ? 'dark-mode' : ''} ${isMobile ? 'mobile' : ''}`}>
        {error && <div className="error-message">{error}</div>}
        <Routes>
          <Route path="/" element={
            isAuthenticated ? 
              <Navigate to="/dashboard" /> : 
              <LandingPage onLogin={handleLogin} />
          } />
          <Route path="/find-out-more" element={<FindOutMore />} />
          <Route path="/dashboard" element={
            isAuthenticated ? (
              <>
                <Header 
                  onAddSnag={handleAddSnag}
                  notifications={notifications}
                  clearNotification={clearNotification}
                  isDarkMode={isDarkMode}
                  toggleDarkMode={toggleDarkMode}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  onLogout={handleLogout}
                  isMobile={isMobile}
                />
                <main className="main-content">
                  {activeTab === 'dashboard' ? (
                    <Dashboard 
                      snags={snags} 
                      onAddSnag={handleAddSnag}
                      onDeleteSnag={handleDeleteSnag}
                      onSaveReport={handleSaveReport}
                      onClearAllSnags={handleClearAllSnags}
                      isMobile={isMobile}
                    />
                  ) : activeTab === 'reports' ? (
                    <Reports 
                      savedReports={savedReports}
                      onDeleteReport={handleDeleteReport}
                      isMobile={isMobile}
                    />
                  ) : null}
                </main>
                <Footer isDarkMode={isDarkMode} />
                <BackToTopButton />
              </>
            ) : <Navigate to="/" />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
