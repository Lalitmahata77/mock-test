import '../styles/About.css'; // Create corresponding CSS file

const About = () => {
  const teamMembers = [
    "Arjun Mahato",
    "Ashok Saud",
    "Bijesh Dhakal",
    "Kaniska Kafle"
  ];

  const features = [
    "Realistic Mock Tests: Randomized question sets with timed sessions to replicate NEC exam conditions",
    "Personalized Progress Analytics: Visual graphs to track strengths, weaknesses, and overall growth",
    "Competitive Leaderboards: Rank users to encourage healthy competition",
  ];

  return (
    <section className="about-container">

      <div className="content-section">
        <p className="intro-text">
          We are a team of undergraduate students from the Department of Computer and Electronics Engineering
          at the INSTITUTE OF ENGINEERING(IOE), Tribhuvan University(TU), passionate about leveraging technology to address educational challenges.
        </p>
      </div>

      <div className="content-section">
        <h2 className="subsection-title">Who We Are</h2>
        <ul className="team-list">
          {teamMembers.map((member, index) => (
            <li key={index} className="team-member">{member}</li>
          ))}
        </ul>
      </div>

      <div className="content-section">
        <h2 className="subsection-title">Our Vision</h2>
        <p className="vision-text">
          To revolutionize NEC exam preparation by bridging the gap between theoretical knowledge
          and practical readiness through simulated exam environments and gamified learning experiences.
        </p>
      </div>

      <div className="content-section">
        <h2 className="subsection-title">What We Offer</h2>
        <ul className="feature-list">
          {features.map((feature, index) => (
            <li key={index} className="feature-item">{feature}</li>
          ))}
        </ul>
      </div>

    </section>
  );
};

export default About;