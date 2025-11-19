import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Shield, Lock, Code, Zap, ChevronRight, PlayCircle, Users, BookOpen } from 'lucide-react';
import '../App.css';

export default function HomePage() {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);

  const styles = {
    main: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '3rem',
      alignItems: 'center',
      padding: '3rem',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    leftContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem'
    },
    title: {
      fontSize: '4rem',
      fontWeight: '900',
      lineHeight: '1.1',
      margin: '1rem 0'
    },
    description: {
      fontSize: '1.25rem',
      lineHeight: '1.6'
    },
    buttonContainer: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap'
    },
    rightContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2rem'
    },
    logoContainer: {
      position: 'relative'
    }
  };

  return (
    <div className="cyber-container bg-gradient-primary">
      {/* Navigation */}
      <nav className="cyber-nav glass-nav">
        <div className="cyber-logo">
          <Shield size={24} color="#00bcd4" />
          <span className="text-gradient-primary">CyberSlayers</span>
        </div>
        <ul className="nav-links">
          <li><a href="/" className="nav-link">Home</a></li>
          <li><a href='/aboutus' className="nav-link">About Us</a></li>
          <li><a href="/games" className="nav-link">Games</a></li>
        </ul>
        <button 
          className="btn-primary"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
      </nav>

      {/* Main Content */}
      <div style={styles.main}>
        {/* Left Content */}
        <div style={styles.leftContent}>
          <div className="cyber-badge">
            <Zap size={16} color="#ffc107" />
            Level Up Your Cyber Skills!
          </div>
          
          <h1 style={styles.title}>
            <div className="text-gradient-primary">Welcome to</div>
            <div>CyberSlayers</div>
          </h1>
          
          <p style={styles.description} className="text-secondary">
            🛡️ This platform helps kids learn{' '}
            <span className="text-highlight">cybersecurity</span> through{' '}
            <span className="text-highlight-purple">epic adventures</span> and{' '}
            <span className="text-highlight-pink">interactive challenges!</span>
          </p>

          <div style={styles.buttonContainer}>
            <button className="btn-large">
              <PlayCircle size={24} />
              Start Playing
              <ChevronRight size={20} />
            </button>
            
            <button className="btn-secondary">
              Watch Demo Video
            </button>
          </div>

          <div className="stats-container">
            {[
              { icon: Users, value: '10K+', label: 'Young Hackers' },
              { icon: Shield, value: '50+', label: 'Challenges' },
              { icon: BookOpen, value: '100%', label: 'Fun Guaranteed' }
            ].map((stat, i) => (
              <div key={i} className="stat-item">
                <stat.icon size={32} color="#00bcd4" style={{marginBottom: '0.5rem'}} />
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content */}
        <div style={styles.rightContent}>
          <div style={styles.logoContainer} className="card-elevated">
            <div className="logo-box">
              <Shield size={80} color="white" />
              <div className="logo-text">
                <div>CYBER</div>
                <div>SLAYERS</div>
              </div>
              
              {/* Corner accents */}
              <div className="corner-accent-tl" />
              <div className="corner-accent-br" />
            </div>

            {/* Floating Icons */}
            <div className="floating-icon" style={{top: '-10px', left: '-30px'}}>
              <Lock size={24} color="#00bcd4" />
            </div>
            <div className="floating-icon" style={{top: '-10px', right: '-30px'}}>
              <Code size={24} color="#9c27b0" />
            </div>
            <div className="floating-icon" style={{bottom: '-10px', left: '-30px'}}>
              <Shield size={24} color="#e91e63" />
            </div>
            <div className="floating-icon" style={{bottom: '-10px', right: '-30px'}}>
              <Zap size={24} color="#ffc107" />
            </div>
          </div>

          <div className="card-video">
            <PlayCircle size={64} color="#9c27b0" style={{marginBottom: '1rem'}} />
            <div style={{fontSize: '1.2rem', fontWeight: 'bold'}}>
              Video of us playing the game
            </div>
            <div style={{fontSize: '0.9rem', color: '#999', marginTop: '0.5rem'}}>
              See CyberSlayers in action! 🎮
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}