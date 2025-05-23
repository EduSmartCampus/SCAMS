import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.scss';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to SCAMS</h1>
          <p>Smart Class and Meeting Scheduler - Effortless room booking for lecturers</p>
          <div className="cta-buttons single-btn">
            <button className="primary-btn" onClick={handleLoginClick}>Login</button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="feature-card">
            <div className="icon">🚀</div>
            <h3>Fast & Efficient</h3>
            <p>Experience lightning-fast performance with our optimized platform.</p>
          </div>
          <div className="feature-card">
            <div className="icon">🔒</div>
            <h3>Secure & Reliable</h3>
            <p>Your data is protected with enterprise-grade security measures.</p>
          </div>
          <div className="feature-card">
            <div className="icon">💡</div>
            <h3>Smart Solutions</h3>
            <p>Intelligent features that adapt to your needs.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;