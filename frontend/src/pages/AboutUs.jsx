import React from 'react';
import { Shield, Users, BookOpen, Target, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      paddingBottom: '3rem'
    },
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.5rem 3rem',
      background: 'rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(0, 188, 212, 0.3)'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '1.5rem',
      fontWeight: 'bold'
    },
    titleGradient: {
      background: 'linear-gradient(45deg, #00bcd4, #9c27b0, #e91e63)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    navLinks: {
      display: 'flex',
      gap: '2rem',
      listStyle: 'none',
      margin: 0,
      padding: 0
    },
    navLink: {
      color: 'white',
      textDecoration: 'none',
      fontWeight: '500',
      cursor: 'pointer',
      fontSize: '0.95rem',
      letterSpacing: '0.03em',
    },
    loginBtn: {
      padding: '0.75rem 1.5rem',
      background: 'linear-gradient(45deg, #00bcd4, #9c27b0)',
      border: 'none',
      borderRadius: '25px',
      color: 'white',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'transform 0.3s ease'
    },
    pageWrapper: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '3rem 2rem',
      display: 'grid',
      gridTemplateColumns: '2fr 1.5fr',
      gap: '2.5rem'
    },
    pageHeader: {
      gridColumn: '1 / -1',
      marginBottom: '1rem',
      textAlign: 'center' // (optional but helps align header block visually)
    },
    pageTitle: {
      fontSize: '3rem',
      fontWeight: '900',
      lineHeight: '1.1',
      marginBottom: '0.75rem'
    },
    pageSubtitle: {
      fontSize: '1rem',
      color: '#cccccc',
      maxWidth: '600px',
      margin: '0 auto',      // center horizontally
      textAlign: 'center'    // center text
    },
    badgeRow: {
      display: 'flex',
      gap: '1rem',
      marginTop: '0.75rem',
      flexWrap: 'wrap',
      justifyContent: 'center' // center badges under title/subtitle
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: 'rgba(0, 188, 212, 0.15)',
      border: '1px solid rgba(0, 188, 212, 0.5)',
      borderRadius: '999px',
      padding: '0.4rem 0.9rem',
      fontSize: '0.8rem',
      fontWeight: 'bold',
      color: '#00bcd4'
    },
    sectionColumn: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.06)',
      borderRadius: '18px',
      padding: '1.5rem 1.75rem',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(18px)',
      boxShadow: '0 18px 40px rgba(0, 0, 0, 0.4)'
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginBottom: '0.75rem'
    },
    cardIcon: {
      padding: '0.6rem',
      borderRadius: '14px',
      background: 'radial-gradient(circle at top left, rgba(0, 188, 212, 0.3), transparent)',
      border: '1px solid rgba(0, 188, 212, 0.4)'
    },
    sectionTitle: {
      fontSize: '1.25rem',
      fontWeight: '800'
    },
    text: {
      fontSize: '0.98rem',
      color: '#e0e0e0',
      lineHeight: '1.6',
      marginBottom: '0.75rem',
      textAlign: 'left',       // left-align paragraph text
      paddingLeft: '0.75rem'   // indent inside card
    },
    list: {
      paddingLeft: '1.75rem',  // more indent for bullet lists
      margin: 0,
      color: '#e0e0e0',
      fontSize: '0.98rem',
      lineHeight: '1.6',
      textAlign: 'left'        // left-align list text
    },
    listItem: {
      marginBottom: '0.35rem'
    },
    questionList: {
      paddingLeft: '1.75rem',  // same indentation as other lists
      margin: '0.5rem 0 0',
      fontSize: '0.98rem',
      color: '#e0e0e0',
      lineHeight: '1.6',
      textAlign: 'left'
    },
    teamTags: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
      marginTop: '0.5rem'
    },
    teamTag: {
      padding: '0.4rem 0.8rem',
      borderRadius: '999px',
      border: '1px solid rgba(156, 39, 176, 0.6)',
      background: 'rgba(156, 39, 176, 0.15)',
      fontSize: '0.85rem'
    },
    futureGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '0.5rem',
      marginTop: '0.5rem'
    },
    futureItem: {
      padding: '0.6rem 0.8rem',
      borderRadius: '12px',
      background: 'rgba(15, 52, 96, 0.7)',
      border: '1px solid rgba(0, 188, 212, 0.3)',
      fontSize: '0.9rem'
    },
    highlight: {
      color: '#00bcd4',
      fontWeight: 'bold'
    },
    fullWidthCard: {
      gridColumn: '1 / -1',
      marginTop: '1.5rem'
    }
  };

  return (
    <div style={styles.container}>
      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.logo}>
          <Shield size={24} color="#00bcd4" />
          <span style={styles.titleGradient}>CyberSlayers</span>
        </div>
        <ul className="nav-links">
          <li><a href="/" className="nav-link">Home</a></li>
          <li><a href='/aboutus' className="nav-link">About Us</a></li>
          <li><a href="/lessons" className="nav-link">Lessons</a></li>
          <li><a href="/games" className="nav-link">Games</a></li>
        </ul>
        <button
          style={styles.loginBtn}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.07)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          onClick={() => navigate('/login')}
        >
          Login
        </button>
      </nav>

      {/* Page Content */}
      <main style={styles.pageWrapper}>
        {/* Page Header */}
        <header style={styles.pageHeader}>
          <h1 style={styles.pageTitle}>
            <span style={styles.titleGradient}>Welcome to CyberSlayers</span>
          </h1>
          <p style={styles.pageSubtitle}>
            Learn more about our mission, what we teach, and the team behind the adventure.
          </p>
          <div style={styles.badgeRow}>
            <div style={styles.badge}>
              <Sparkles size={14} color="#00bcd4" />
              Interactive Cybersecurity for Ages 8–16
            </div>
            <div style={styles.badge}>
              <Target size={14} color="#9c27b0" />
              Story-Driven Digital Safety
            </div>
          </div>
        </header>

        {/* Left Column */}
        <div style={styles.sectionColumn}>
          {/* Intro / Platform description */}
          <section style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.cardIcon}>
                <BookOpen size={20} color="#00bcd4" />
              </div>
              <h2 style={styles.sectionTitle}>About CyberSlayers</h2>
            </div>
            <p style={styles.text}>
              CyberSlayers is an interactive learning platform designed to teach cybersecurity skills to children ages 8–16 through immersive adventures, story-driven missions, and engaging mini-games. Our goal is to empower the next generation of digital explorers to recognize online risks, think critically, and build safe lifelong digital habits.
            </p>
          </section>

          {/* Mission */}
          <section style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.cardIcon}>
                <Target size={20} color="#e91e63" />
              </div>
              <h2 style={styles.sectionTitle}>Our Mission</h2>
            </div>
            <p style={styles.text}>
              We believe that cybersecurity shouldn't be taught through fear or restriction — it should be exciting, empowering, and accessible. CyberSlayers transform complex cybersecurity concepts into interactive challenges that build independence, confidence, and digital resilience.
            </p>
          </section>

          {/* Why We Created CyberSlayers */}
          <section style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.cardIcon}>
                <Shield size={20} color="#9c27b0" />
              </div>
              <h2 style={styles.sectionTitle}>Why We Created CyberSlayers</h2>
            </div>
            <p style={styles.text}>
              Today’s children spend more time online than ever, yet most schools provide little to no cybersecurity education. Current solutions focus on restriction or monitoring, not teaching skills.
            </p>
            <p style={styles.text}>We asked ourselves:</p>
            <ul style={styles.questionList}>
              <li style={styles.listItem}>How might we make cybersecurity meaningful, memorable, and fun?</li>
              <li style={styles.listItem}>How do we teach students not just what to do, but why it matters?</li>
              <li style={styles.listItem}>How do we ensure kids can recognize digital risks outside the game?</li>
            </ul>
            <p style={{ ...styles.text, marginTop: '0.75rem' }}>
              CyberSlayers is our answer — a platform that teaches real-world cybersecurity skills through the power of interactive storytelling.
            </p>
          </section>

          {/* Team */}
          <section style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.cardIcon}>
                <Users size={20} color="#00bcd4" />
              </div>
              <h2 style={styles.sectionTitle}>Our Team</h2>
            </div>
            <p style={styles.text}>
              CyberSlayers is created by a dedicated student team passionate about digital literacy and youth education:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>Donato Alvarado</li>
              <li style={styles.listItem}>Colin Clark</li>
              <li style={styles.listItem}>Osaruese Okungbowa</li>
              <li style={styles.listItem}>Stephanie Villela</li>
            </ul>
            <div style={styles.teamTags}>
              <span style={styles.teamTag}>Ideation</span>
              <span style={styles.teamTag}>Cybersecurity Education</span>
              <span style={styles.teamTag}>Youth Engagement</span>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div style={styles.sectionColumn}>
          {/* What We Teach */}
          <section style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.cardIcon}>
                <BookOpen size={20} color="#00bcd4" />
              </div>
              <h2 style={styles.sectionTitle}>What We Teach</h2>
            </div>
            <p style={styles.text}>
              Through story-based lessons and game worlds inspired by popular genres, CyberSlayers helps children learn how to:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>Manage and protect their digital footprint</li>
              <li style={styles.listItem}>Recognize fake profiles, bots, and impersonation</li>
              <li style={styles.listItem}>Identify suspicious links, scams, and malicious websites</li>
              <li style={styles.listItem}>Practice safe browsing on public Wi-Fi or shared networks</li>
              <li style={styles.listItem}>Understand cybersecurity consequences in a safe, simulated environment</li>
              <li style={styles.listItem}>Apply digital safety habits in real-world, everyday situations</li>
            </ul>
          </section>

          {/* How It Works */}
          <section style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.cardIcon}>
                <Sparkles size={20} color="#ffc107" />
              </div>
              <h2 style={styles.sectionTitle}>How CyberSlayers Works:</h2>
            </div>
            <p style={styles.text}>
              Our platform blends structured learning with gameplay to maximize engagement and retention:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>Story-Driven Lessons: A guided, step-by-step pathway that introduces cybersecurity topics through simplified, age-appropriate explanations.</li>
              <li style={styles.listItem}>Interactive Quizzes & Practice: Info pages, repeated review opportunities, and scenario-based questions that reinforce learning.</li>
              <li style={styles.listItem}>Adventure Game Worlds: A progressively challenging map with different themed levels, each representing a cybersecurity skill.</li>
              <li style={styles.listItem}>Final “Boss” Challenge: A culminating mission requiring players to use everything they’ve learned to defeat a simulated cyber threat.</li>
            </ul>
          </section>

          {/* Future */}
          <section style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.cardIcon}>
                <Target size={20} color="#9c27b0" />
              </div>
              <h2 style={styles.sectionTitle}>The Future of CyberSlayers</h2>
            </div>
            <ul style={styles.list}>
              <li style={styles.listItem}>More worlds and story arcs</li>
              <li style={styles.listItem}>Multiplayer safe practice challenges</li>
              <li style={styles.listItem}>Parent/teacher dashboards</li>
              <li style={styles.listItem}>Real-time role-playing scenarios</li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;