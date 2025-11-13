import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Star, Trophy, Zap, Play, Lock, Home, LogOut } from 'lucide-react';

export default function GameDashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user data from localStorage (set during login)
    const storedUser = localStorage.getItem('cyberslayers_user');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    } else {
      // If no user data, redirect to login
      navigate('/login');
    }
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('cyberslayers_user');
    navigate('/');
  };

  const getProgressColor = (progress) => {
    if (progress <= 25) return '#ff6b6b'; // Red
    if (progress <= 50) return '#ffa726'; // Orange  
    if (progress <= 75) return '#ffee58'; // Yellow
    return '#66bb6a'; // Green
  };

  const getGameStatus = (score) => {
    if (score === 0) return { status: 'locked', color: '#94a3b8', icon: Lock };
    if (score <= 300) return { status: 'bronze', color: '#cd7f32', icon: Star };
    if (score <= 600) return { status: 'silver', color: '#c0c0c0', icon: Star };
    if (score <= 800) return { status: 'gold', color: '#ffd700', icon: Trophy };
    return { status: 'diamond', color: '#00bcd4', icon: Zap };
  };

  const handleGameClick = (gameNumber) => {
    // Add navigation to specific games later
    console.log(`Navigate to game ${gameNumber}`);
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '1.5rem'
      }}>
        Loading your cyber adventure... 🛡️
      </div>
    );
  }

  if (!userData) return null;

  const progressColor = getProgressColor(userData.overall_game_progress);
  const games = userData.games || {};

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      padding: '2rem'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      padding: '1.5rem',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    userName: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      background: 'linear-gradient(45deg, #fff, #00bcd4)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    navButtons: {
      display: 'flex',
      gap: '1rem'
    },
    navButton: {
      padding: '0.75rem 1rem',
      background: 'rgba(255, 255, 255, 0.2)',
      border: 'none',
      borderRadius: '12px',
      color: 'white',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.9rem',
      fontWeight: 'bold'
    },
    progressSection: {
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      padding: '2rem',
      marginBottom: '3rem',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      textAlign: 'center'
    },
    progressTitle: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      textShadow: '0 2px 4px rgba(0,0,0,0.3)'
    },
    progressBarContainer: {
      width: '100%',
      height: '30px',
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '15px',
      overflow: 'hidden',
      position: 'relative',
      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
    },
    progressBar: {
      height: '100%',
      background: `linear-gradient(90deg, ${progressColor}, ${progressColor}dd)`,
      borderRadius: '15px',
      transition: 'width 1s ease-in-out',
      position: 'relative',
      animation: 'shimmer 2s infinite linear'
    },
    progressText: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontWeight: 'bold',
      fontSize: '1rem',
      textShadow: '0 1px 2px rgba(0,0,0,0.5)',
      zIndex: 2
    },
    gameMap: {
      position: 'relative',
      maxWidth: '800px',
      margin: '0 auto',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderRadius: '30px',
      padding: '3rem',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
    },
    pathSvg: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 1,
      pointerEvents: 'none'
    },
    gamesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '2rem',
      position: 'relative',
      zIndex: 2
    },
    gameCard: {
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '20px',
      padding: '2rem',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: '2px solid transparent',
      position: 'relative',
      overflow: 'hidden'
    },
    gameCardHover: {
      transform: 'scale(1.05)',
      background: 'rgba(255, 255, 255, 0.3)',
      boxShadow: '0 15px 30px rgba(0,0,0,0.2)'
    },
    gameIcon: {
      width: '80px',
      height: '80px',
      margin: '0 auto 1rem',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '2rem',
      fontWeight: 'bold',
      color: 'white',
      textShadow: '0 2px 4px rgba(0,0,0,0.3)',
      position: 'relative'
    },
    gameTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
      textShadow: '0 2px 4px rgba(0,0,0,0.3)'
    },
    gameScore: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      marginBottom: '1rem'
    },
    gameButton: {
      padding: '0.75rem 1.5rem',
      background: 'linear-gradient(45deg, #00bcd4, #2196f3)',
      border: 'none',
      borderRadius: '25px',
      color: 'white',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      margin: '0 auto'
    },
    lockedOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      borderRadius: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 3
    },
    tooltip: {
      position: 'absolute',
      bottom: '110%',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(0, 0, 0, 0.9)',
      color: 'white',
      padding: '1rem',
      borderRadius: '12px',
      fontSize: '0.9rem',
      whiteSpace: 'nowrap',
      zIndex: 10,
      opacity: 0,
      transition: 'opacity 0.3s ease'
    },
    tooltipVisible: {
      opacity: 1
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.userInfo}>
          <Shield size={40} color="#00bcd4" />
          <div>
            <div style={styles.userName}>
              Welcome back, {userData.email.split('@')[0]}!
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
              Cyber Warrior Level {Math.floor(userData.overall_game_progress / 25) + 1}
            </div>
          </div>
        </div>
        <div style={styles.navButtons}>
          <button 
            style={styles.navButton}
            onClick={() => navigate('/')}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
          >
            <Home size={18} />
            Home
          </button>
          <button 
            style={styles.navButton}
            onClick={handleLogout}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255, 69, 58, 0.3)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Overall Progress */}
      <div style={styles.progressSection}>
        <div style={styles.progressTitle}>
          🛡️ Your Cyber Adventure Progress 🛡️
        </div>
        <div style={styles.progressBarContainer}>
          <div 
            style={{
              ...styles.progressBar,
              width: `${userData.overall_game_progress}%`
            }}
          />
          <div style={styles.progressText}>
            {userData.overall_game_progress}% Complete
          </div>
        </div>
        <div style={{ marginTop: '1rem', fontSize: '1.1rem', opacity: 0.9 }}>
          {userData.overall_game_progress < 25 && "🌱 Just getting started! Keep going!"}
          {userData.overall_game_progress >= 25 && userData.overall_game_progress < 50 && "🚀 Great progress! You're on fire!"}
          {userData.overall_game_progress >= 50 && userData.overall_game_progress < 75 && "⭐ Amazing work! Almost there!"}
          {userData.overall_game_progress >= 75 && userData.overall_game_progress < 100 && "🏆 So close to mastery!"}
          {userData.overall_game_progress >= 100 && "👑 Cyber Security Master!"}
        </div>
      </div>

      {/* Game Map */}
      <div style={styles.gameMap}>
        {/* Connecting Path SVG */}
        <svg style={styles.pathSvg}>
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00bcd4" />
              <stop offset="100%" stopColor="#9c27b0" />
            </linearGradient>
          </defs>
          <path
            d="M 150 120 Q 300 50 450 120 Q 600 190 450 280 Q 300 350 150 280"
            stroke="url(#pathGradient)"
            strokeWidth="6"
            fill="none"
            strokeDasharray="10,5"
            opacity="0.7"
          />
        </svg>

        <div style={styles.gamesGrid}>
          {[1, 2, 3, 4].map((gameNum) => {
            // Handle the typo in game3_scroe vs game3_score
            const scoreField = gameNum === 3 ? 'game3_scroe' : `game${gameNum}_score`;
            const score = games[scoreField] || 0;
            const gameStatus = getGameStatus(score);
            const isLocked = gameNum > 1 && (gameNum === 2 ? games['game1_score'] === 0 : 
                            gameNum === 3 ? games['game2_score'] === 0 : 
                            gameNum === 4 ? games['game3_scroe'] === 0 : false);
            const StatusIcon = gameStatus.icon;

            return (
              <GameCard
                key={gameNum}
                gameNum={gameNum}
                score={score}
                gameStatus={gameStatus}
                isLocked={isLocked}
                onClick={() => !isLocked && handleGameClick(gameNum)}
                styles={styles}
                StatusIcon={StatusIcon}
              />
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200px 0; }
          100% { background-position: 200px 0; }
        }
        
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

// Separate GameCard component for better organization
function GameCard({ gameNum, score, gameStatus, isLocked, onClick, styles, StatusIcon }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const gameNames = {
    1: "Password Fortress",
    2: "Phishing Detective", 
    3: "Malware Hunter",
    4: "Network Guardian"
  };

  const gameEmojis = {
    1: "🔐",
    2: "🕵️",
    3: "🛡️",
    4: "🌐"
  };

  return (
    <div
      style={{
        ...styles.gameCard,
        ...(isHovered && !isLocked ? styles.gameCardHover : {}),
        borderColor: gameStatus.color,
        cursor: isLocked ? 'not-allowed' : 'pointer'
      }}
      onClick={onClick}
      onMouseEnter={() => {
        setIsHovered(true);
        setShowTooltip(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowTooltip(false);
      }}
    >
      {/* Game Icon */}
      <div 
        style={{
          ...styles.gameIcon,
          background: `linear-gradient(135deg, ${gameStatus.color}, ${gameStatus.color}aa)`,
          boxShadow: `0 8px 16px ${gameStatus.color}44`
        }}
      >
        {gameEmojis[gameNum]}
      </div>

      {/* Game Info */}
      <div style={styles.gameTitle}>
        {gameNames[gameNum]}
      </div>
      
      <div style={styles.gameScore}>
        {isLocked ? (
          <span style={{ opacity: 0.6 }}>Locked</span>
        ) : (
          <>
            <StatusIcon size={20} color={gameStatus.color} style={{ marginRight: '0.5rem' }} />
            Score: {score}
          </>
        )}
      </div>

      {!isLocked && (
        <button 
          style={styles.gameButton}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          <Play size={18} />
          Play Now!
        </button>
      )}

      {/* Locked Overlay */}
      {isLocked && (
        <div style={styles.lockedOverlay}>
          <Lock size={40} color="#fff" style={{ marginBottom: '1rem' }} />
          <div style={{ fontSize: '1rem', textAlign: 'center' }}>
            Complete {gameNames[gameNum - 1]} first!
          </div>
        </div>
      )}

      {/* Tooltip */}
      {showTooltip && !isLocked && (
        <div style={{
          ...styles.tooltip,
          ...(showTooltip ? styles.tooltipVisible : {})
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
            {gameNames[gameNum]}
          </div>
          <div>Progress: {score > 0 ? `${Math.min(Math.floor(score / 10), 100)}%` : '0%'}</div>
          <div>Status: {gameStatus.status.toUpperCase()}</div>
          <div style={{ marginTop: '0.5rem', color: '#00bcd4' }}>
            Click to play now! 🎮
          </div>
        </div>
      )}
    </div>
  );
}