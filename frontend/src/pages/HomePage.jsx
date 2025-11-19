import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Shield, Lock, Code, Zap, ChevronRight, PlayCircle, Users, BookOpen } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      overflow: 'hidden',
      position: 'relative'
    },
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.5rem',
      background: 'rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(10px)'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '1.5rem',
      fontWeight: 'bold'
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
      transition: 'color 0.3s ease',
      cursor: 'pointer'
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
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: 'rgba(0, 188, 212, 0.2)',
      border: '1px solid rgba(0, 188, 212, 0.5)',
      borderRadius: '25px',
      padding: '0.5rem 1rem',
      fontSize: '0.9rem',
      fontWeight: 'bold',
      color: '#00bcd4',
      animation: 'bounce 2s infinite'
    },
    title: {
      fontSize: '4rem',
      fontWeight: '900',
      lineHeight: '1.1',
      margin: '1rem 0'
    },
    titleGradient: {
      background: 'linear-gradient(45deg, #00bcd4, #9c27b0, #e91e63)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    description: {
      fontSize: '1.25rem',
      color: '#cccccc',
      lineHeight: '1.6'
    },
    highlight: {
      color: '#00bcd4',
      fontWeight: 'bold'
    },
    buttonContainer: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap'
    },
    primaryBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '1rem 2rem',
      background: 'linear-gradient(45deg, #00bcd4, #2196f3)',
      border: 'none',
      borderRadius: '12px',
      color: 'white',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'transform 0.3s ease',
      boxShadow: '0 10px 30px rgba(0, 188, 212, 0.5)'
    },
    secondaryBtn: {
      padding: '1rem 2rem',
      background: 'transparent',
      border: '2px solid #9c27b0',
      borderRadius: '12px',
      color: 'white',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    stats: {
      display: 'flex',
      gap: '2rem',
      paddingTop: '1rem'
    },
    stat: {
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'transform 0.3s ease'
    },
    statValue: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      background: 'linear-gradient(45deg, #00bcd4, #9c27b0)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    statLabel: {
      fontSize: '0.9rem',
      color: '#999'
    },
    rightContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2rem'
    },
    logoContainer: {
      position: 'relative',
      padding: '3rem',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      border: '1px solid rgba(0, 188, 212, 0.3)',
      transition: 'transform 0.3s ease'
    },
    logoBox: {
      width: '200px',
      height: '200px',
      background: 'linear-gradient(135deg, #00bcd4, #9c27b0)',
      borderRadius: '16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    },
    logoText: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      textAlign: 'center',
      zIndex: 2
    },
    videoSection: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderRadius: '16px',
      padding: '2rem',
      border: '1px solid rgba(156, 39, 176, 0.3)',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'transform 0.3s ease'
    },
    floatingIcon: {
      position: 'absolute',
      padding: '0.75rem',
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      transition: 'transform 0.3s ease',
      cursor: 'pointer'
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
        <ul style={styles.navLinks}>
          <li><a href="/" style={styles.navLink}>Home</a></li>
          <li><a href='/aboutus' style={styles.navLink}>About Us</a></li>
          <li><a href="/games" style={styles.navLink}>Games</a></li>
        </ul>
        <button 
          style={styles.loginBtn}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          onClick={() => navigate('/login')}
        >
          Login
        </button>
      </nav>

      {/* Main Content */}
      <div style={styles.main}>
        {/* Left Content */}
        <div style={styles.leftContent}>
          <div style={styles.badge}>
            <Zap size={16} color="#ffc107" />
            Level Up Your Cyber Skills!
          </div>
          
          <h1 style={styles.title}>
            <div style={styles.titleGradient}>Welcome to</div>
            <div>CyberSlayers</div>
          </h1>
          
          <p style={styles.description}>
            🛡️ This platform helps kids learn{' '}
            <span style={styles.highlight}>cybersecurity</span> through{' '}
            <span style={{...styles.highlight, color: '#9c27b0'}}>epic adventures</span> and{' '}
            <span style={{...styles.highlight, color: '#e91e63'}}>interactive challenges!</span>
          </p>

          <div style={styles.buttonContainer}>
            <button 
              style={styles.primaryBtn}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                setIsHovering(true);
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                setIsHovering(false);
              }}
            >
              <PlayCircle size={24} />
              Start Playing
              <ChevronRight size={20} />
            </button>
            
            <button 
              style={styles.secondaryBtn}
              onMouseEnter={(e) => e.target.style.background = 'rgba(156, 39, 176, 0.2)'}
              onMouseLeave={(e) => e.target.style.background = 'transparent'}
            >
              Watch Demo Video
            </button>
          </div>

          <div style={styles.stats}>
            {[
              { icon: Users, value: '10K+', label: 'Young Hackers' },
              { icon: Shield, value: '50+', label: 'Challenges' },
              { icon: BookOpen, value: '100%', label: 'Fun Guaranteed' }
            ].map((stat, i) => (
              <div 
                key={i} 
                style={styles.stat}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                <stat.icon size={32} color="#00bcd4" style={{marginBottom: '0.5rem'}} />
                <div style={styles.statValue}>{stat.value}</div>
                <div style={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content */}
        <div style={styles.rightContent}>
          <div 
            style={styles.logoContainer}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            <div style={styles.logoBox}>
              <Shield size={80} color="white" />
              <div style={styles.logoText}>
                <div>CYBER</div>
                <div>SLAYERS</div>
              </div>
              
              {/* Corner accents */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '40px',
                height: '40px',
                borderTop: '4px solid #00bcd4',
                borderLeft: '4px solid #00bcd4'
              }} />
              <div style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '40px',
                height: '40px',
                borderBottom: '4px solid #9c27b0',
                borderRight: '4px solid #9c27b0'
              }} />
            </div>

            {/* Floating Icons */}
            <div style={{...styles.floatingIcon, top: '-10px', left: '-30px'}}>
              <Lock size={24} color="#00bcd4" />
            </div>
            <div style={{...styles.floatingIcon, top: '-10px', right: '-30px'}}>
              <Code size={24} color="#9c27b0" />
            </div>
            <div style={{...styles.floatingIcon, bottom: '-10px', left: '-30px'}}>
              <Shield size={24} color="#e91e63" />
            </div>
            <div style={{...styles.floatingIcon, bottom: '-10px', right: '-30px'}}>
              <Zap size={24} color="#ffc107" />
            </div>
          </div>

          <div 
            style={styles.videoSection}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
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

      <style>{`
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            transform: translate3d(0,-10px,0);
          }
          70% {
            transform: translate3d(0,-5px,0);
          }
          90% {
            transform: translate3d(0,-2px,0);
          }
        }
      `}</style>
    </div>
  );
}