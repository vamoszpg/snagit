import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email);
  };

  return (
    <div className={`landing-page ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="landing-content">
        <h1 className="title">Snag<span>It</span></h1>
        <p className="tagline">Effortless Project Management</p>
        <div className="features-grid">
          <div className="feature-item">
            <i className="fas fa-exclamation-circle"></i>
            <p>Log Defects</p>
          </div>
          <div className="feature-item">
            <i className="fas fa-camera"></i>
            <p>Visual Snags</p>
          </div>
          <div className="feature-item">
            <i className="fas fa-file-pdf"></i>
            <p>PDF Reports</p>
          </div>
          <div className="feature-item">
            <i className="fas fa-database"></i>
            <p>Data Storage</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="email-form">
          <div className="input-wrapper">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              required
            />
            <label htmlFor="email">Enter your email</label>
            <i className="fas fa-envelope"></i>
          </div>
          <button type="submit" className="primary-cta">Start Free Trial</button>
        </form>
        <div className="trust-indicators">
          <p>Trusted by over <span className="highlight">10,000+</span> teams worldwide</p>
        </div>
        <Link to="/find-out-more" className="find-out-more-link">Learn More <i className="fas fa-arrow-right"></i></Link>
        <button onClick={() => setIsDarkMode(!isDarkMode)} className="dark-mode-toggle">
          {isDarkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
