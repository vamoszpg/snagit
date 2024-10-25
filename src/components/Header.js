import React from 'react';
import './Header.css';
import { FaChartBar, FaSignOutAlt, FaMoon, FaSun } from 'react-icons/fa';
import Tooltip from './Tooltip';

const Header = ({ isDarkMode, toggleDarkMode, activeTab, setActiveTab, onLogout, isMobile }) => {
  return (
    <header className={`App-header ${isMobile ? 'mobile' : ''}`}>
      <div className="header-content">
        <h1 className="logo-container">
          <span className="logo-text">Snag It</span>
        </h1>
        <nav className="header-nav">
          <button 
            className={`nav-button ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`nav-button ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            <FaChartBar /> Reports
          </button>
          <Tooltip text={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}>
            <button className="header-button" onClick={toggleDarkMode}>
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
          </Tooltip>
          <Tooltip text="Logout">
            <button className="header-button logout-btn" onClick={onLogout}>
              <FaSignOutAlt />
            </button>
          </Tooltip>
        </nav>
      </div>
    </header>
  );
};

export default Header;
