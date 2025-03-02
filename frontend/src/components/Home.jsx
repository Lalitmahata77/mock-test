import React from 'react';
import { FaBook, FaChartLine, FaTrophy, FaMobileAlt, FaRegSmileBeam, FaArrowRight } from 'react-icons/fa'; // Added FaArrowRight
import { useNavigate } from 'react-router-dom'; // Import useNavigate to courses
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const features = [
    {
      icon: <FaBook />,
      title: "Realistic Mock Tests",
      description: "Timed exams with NEC-style questions",
      color: "#2980b9"
    },
    {
      icon: <FaChartLine />,
      title: "Smart Analytics",
      description: "Track progress",
      color: "#27ae60"
    },
    {
      icon: <FaTrophy />,
      title: "Live Leaderboards",
      description: "Compete with peers nationwide",
      color: "#f1c40f"
    },
    {
      icon: < FaMobileAlt/>,
      title: "Higher Accessibility",
      description: "Your Practice, Your Place",
      color: "#e74c3c"
    }
  ];

  const handleTryTestClick = () => {
    navigate('/courses'); // Navigate to /courses
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="gradient-text">Master Your NEC License Exam</h1>
            <p className="hero-subtitle">Join 10,000+ engineers who boosted their scores by 40%</p>
            <button className="hero-cta" onClick={handleTryTestClick}> {/* Add onClick */}
            Try Test <FaArrowRight className="cta-icon" />
            </button>
          </div>
          <div className="hero-illustration">
            <div className="glowing-card">
              <FaRegSmileBeam className="main-illustration" />
              <div className="glow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features">
        <h2 className="section-title">Why Engineers Choose Us</h2>
        <div className="feature-grid">
          {features.map((feature, index) => (
            <div 
              className="feature-card" 
              key={index}
              style={{ '--accent': feature.color }} // Dynamic color for each card
            >
              <div className="feature-icon-wrapper">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className="feature-wave"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stat-card">
          <h3>95%</h3>
          <p>Pass Rate Success</p>
        </div>
        <div className="stat-card">
          <h3>Many</h3>
          <p>Practice Questions</p>
        </div>
        <div className="stat-card">
          <h3>24/7</h3>
          <p>Accessibility</p>
        </div>
      </section>
    </div>
  );
};

export default Home;