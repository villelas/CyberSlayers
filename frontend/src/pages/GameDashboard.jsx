import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Star, Trophy, Zap, Play, Lock, Home, LogOut, X, Target, Sword, Eye } from 'lucide-react';

export default function GameDashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedArena, setSelectedArena] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
    if (score === 0) return { status: 'offline', color: '#94a3b8', icon: Lock };
    if (score <= 300) return { status: 'bronze', color: '#cd7f32', icon: Star };
    if (score <= 600) return { status: 'silver', color: '#c0c0c0', icon: Star };
    if (score <= 800) return { status: 'gold', color: '#ffd700', icon: Trophy };
    return { status: 'diamond', color: '#00bcd4', icon: Zap };
  };

  const handleArenaClick = (arenaData) => {
    if (!arenaData.isLocked) {
      setSelectedArena(arenaData);
      setShowModal(true);
    }
  };

  const handlePlayGame = () => {
    // Navigate to the specific game page
    const gameRoutes = {
      1: '/password-security-core',
      2: '/phishing-detection-hub',
      3: '/malware-analysis-lab',
      4: '/network-command-center'
    };
    
    navigate(gameRoutes[selectedArena.gameNum]);
    setShowModal(false);
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
        Loading your cyber security network... 🔐
      </div>
    );
  }

  if (!userData) return null;

  const progressColor = getProgressColor(userData.overall_game_progress);
  const games = userData.games || {};

  // Arena configurations with PERCENTAGE-based positions for responsiveness
  const arenas = [
    {
      gameNum: 1,
      name: "Password Security Core",
      description: "Master authentication protocols and secure access systems",
      emoji: "🛡️",
      icon: Shield,
      position: { top: '65%', left: '8%' }, // Percentage-based positioning
      color: '#e91e63',
      terrain: 'security'
    },
    {
      gameNum: 2,
      name: "Phishing Detection Hub",
      description: "Scan and identify malicious network communications",
      emoji: "🔍", 
      icon: Eye,
      position: { top: '45%', left: '38%' },
      color: '#2196f3',
      terrain: 'detection'
    },
    {
      gameNum: 3,
      name: "Malware Analysis Lab",
      description: "Reverse engineer and neutralize cyber threats",
      emoji: "🔬",
      icon: Sword,
      position: { top: '20%', left: '62%' },
      color: '#4caf50',
      terrain: 'analysis'
    },
    {
      gameNum: 4,
      name: "Network Command Center",
      description: "Monitor and defend the entire cyber infrastructure",
      emoji: "🖥️",
      icon: Target,
      position: { top: '20%', left: '82%' },
      color: '#9c27b0',
      terrain: 'command'
    }
  ];

  // Add game data to arenas
  const arenasWithData = arenas.map(arena => {
    const scoreField = `game${arena.gameNum}_score`;
    const score = games[scoreField] || 0;
    const gameStatus = getGameStatus(score);
    const isLocked = arena.gameNum > 1 && (
      arena.gameNum === 2 ? games['game1_score'] === 0 : 
      arena.gameNum === 3 ? games['game2_score'] === 0 : 
      arena.gameNum === 4 ? games['game3_score'] === 0 : false
    );

    return {
      ...arena,
      score,
      gameStatus,
      isLocked
    };
  });

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      overflow: 'hidden'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderRadius: '15px',
      padding: '0.8rem 1rem',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      marginBottom: '0.8rem',
      flexWrap: 'wrap',
      gap: '0.5rem'
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    userName: {
      fontSize: 'clamp(1rem, 2vw, 1.3rem)',
      fontWeight: 'bold',
      background: 'linear-gradient(45deg, #fff, #00bcd4)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    navButtons: {
      display: 'flex',
      gap: '0.5rem'
    },
    navButton: {
      padding: '0.5rem 1rem',
      background: 'rgba(255, 255, 255, 0.2)',
      border: 'none',
      borderRadius: '10px',
      color: 'white',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
      fontWeight: 'bold'
    },
    progressContainer: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderRadius: '15px',
      padding: '1rem 1.5rem',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      textAlign: 'center',
      marginBottom: '0.8rem'
    },
    progressTitle: {
      fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
      fontWeight: 'bold',
      marginBottom: '0.8rem'
    },
    progressBarContainer: {
      width: '100%',
      height: '20px',
      background: 'rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      overflow: 'hidden',
      position: 'relative'
    },
    progressBar: {
      height: '100%',
      background: `linear-gradient(90deg, ${progressColor}, ${progressColor}dd)`,
      borderRadius: '10px',
      transition: 'width 1s ease-in-out'
    },
    progressText: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontWeight: 'bold',
      fontSize: '0.8rem',
      color: 'white',
      textShadow: '0 1px 2px rgba(0,0,0,0.5)'
    },
    progressMessage: {
      marginTop: '0.5rem',
      fontSize: 'clamp(0.85rem, 1.8vw, 1rem)',
      opacity: 0.9
    },
    mapCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      padding: '1.5rem',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0,
      overflow: 'hidden'
    },
    mapTitle: {
      textAlign: 'center',
      fontSize: 'clamp(1.3rem, 3vw, 2rem)',
      fontWeight: 'bold',
      marginBottom: '1rem',
      textShadow: '0 2px 4px rgba(0,0,0,0.3)'
    },
    mapContainer: {
      position: 'relative',
      flex: 1,
      width: '100%',
      background: `
        radial-gradient(circle at 8% 65%, rgba(233, 30, 99, 0.1) 0%, transparent 35%),
        radial-gradient(circle at 38% 45%, rgba(33, 150, 243, 0.1) 0%, transparent 35%),
        radial-gradient(circle at 62% 20%, rgba(76, 175, 80, 0.1) 0%, transparent 35%),
        radial-gradient(circle at 82% 20%, rgba(156, 39, 176, 0.1) 0%, transparent 35%)
      `,
      borderRadius: '15px',
      border: '2px dashed rgba(255, 255, 255, 0.3)',
      minHeight: '300px'
    },
    pathSvg: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 1
    },
    gameCard: {
      position: 'absolute',
      width: 'clamp(100px, 12vw, 130px)',
      height: 'clamp(100px, 12vw, 130px)',
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(15px)',
      borderRadius: '20px',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      cursor: 'pointer',
      transition: 'all 0.4s ease',
      zIndex: 10,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
      padding: '0.8rem',
      transform: 'translate(-50%, -50%)'
    },
    gameCardLocked: {
      filter: 'grayscale(100%) brightness(0.7)',
      cursor: 'not-allowed',
      opacity: 0.6
    },
    gameCardHover: {
      transform: 'translate(-50%, -50%) scale(1.1)',
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)',
      zIndex: 20,
      border: '2px solid rgba(255, 255, 255, 0.5)'
    },
    gameIcon: {
      fontSize: 'clamp(2rem, 4vw, 2.5rem)',
      marginBottom: '0.3rem'
    },
    gameTitle: {
      fontSize: 'clamp(0.7rem, 1.2vw, 0.85rem)',
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'white',
      textShadow: '0 1px 2px rgba(0,0,0,0.5)',
      lineHeight: '1.2'
    },
    gameNumber: {
      position: 'absolute',
      top: '-8px',
      left: '-8px',
      width: 'clamp(24px, 3vw, 28px)',
      height: 'clamp(24px, 3vw, 28px)',
      borderRadius: '50%',
      background: 'linear-gradient(145deg, #667eea, #764ba2)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)',
      fontWeight: 'bold',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
    },
    statusBadge: {
      position: 'absolute',
      top: '-8px',
      right: '-8px',
      width: 'clamp(24px, 3vw, 28px)',
      height: 'clamp(24px, 3vw, 28px)',
      borderRadius: '50%',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    },
    modalContent: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '24px',
      padding: '2rem',
      maxWidth: '500px',
      width: '100%',
      color: 'white',
      position: 'relative',
      border: '3px solid rgba(255, 255, 255, 0.3)',
      maxHeight: '90vh',
      overflowY: 'auto'
    },
    modalClose: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      background: 'rgba(255, 255, 255, 0.2)',
      border: 'none',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      color: 'white',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease'
    },
    modalHeader: {
      textAlign: 'center',
      marginBottom: '1.5rem'
    },
    modalEmoji: {
      fontSize: 'clamp(2.5rem, 6vw, 4rem)',
      marginBottom: '1rem'
    },
    modalTitle: {
      fontSize: 'clamp(1.3rem, 3vw, 2rem)',
      fontWeight: 'bold',
      marginBottom: '0.5rem'
    },
    modalDescription: {
      fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
      opacity: 0.9
    },
    modalStats: {
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      padding: '1rem',
      marginBottom: '1.5rem'
    },
    modalButtons: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    modalButton: {
      padding: '1rem 2rem',
      border: 'none',
      borderRadius: '12px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: 'clamp(0.9rem, 1.8vw, 1rem)'
    },
    playButton: {
      background: 'linear-gradient(45deg, #00bcd4, #2196f3)',
      color: 'white'
    },
    cancelButton: {
      background: 'rgba(255, 255, 255, 0.2)',
      color: 'white'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.userInfo}>
          <Shield size={32} color="#00bcd4" />
          <div>
            <div style={styles.userName}>
              {userData.email.split('@')[0]}'s Cyber Dashboard
            </div>
            <div style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)', opacity: 0.7 }}>
              Security Level {Math.floor(userData.overall_game_progress / 25) + 1} Analyst
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
            <Home size={16} />
            Home
          </button>
          <button 
            style={styles.navButton}
            onClick={handleLogout}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255, 69, 58, 0.3)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      {/* Progress Section */}
      <div style={styles.progressContainer}>
        <div style={styles.progressTitle}>
          🛡️ Cyber Security Mastery Progress 🛡️
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
        <div style={styles.progressMessage}>
          {userData.overall_game_progress < 25 && "💾 Systems initializing... Building foundation!"}
          {userData.overall_game_progress >= 25 && userData.overall_game_progress < 50 && "🔒 Security protocols active! Excellent progress!"}
          {userData.overall_game_progress >= 50 && userData.overall_game_progress < 75 && "⚡ Advanced systems online! Almost there!"}
          {userData.overall_game_progress >= 75 && userData.overall_game_progress < 100 && "🚀 Elite level detected! Finalizing mastery!"}
          {userData.overall_game_progress >= 100 && "👑 Cyber Security Expert! All systems secured!"}
        </div>
      </div>

      {/* Game Map Card Container */}
      <div style={styles.mapCard}>
        <div style={styles.mapTitle}>
          🌐 CYBER SECURITY NETWORK MAP 🌐
        </div>
        
        <div style={styles.mapContainer}>
          {/* Cyber Network Connection Lines */}
          <svg style={styles.pathSvg} viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="cyberPath" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#667eea" stopOpacity="0.8" />
                <stop offset="33%" stopColor="#764ba2" stopOpacity="0.8" />
                <stop offset="66%" stopColor="#f093fb" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#00bcd4" stopOpacity="0.8" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="0.3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Connection path using percentage coordinates: 1→2→3→4 */}
            <path
              d="M 8 65 
                 C 20 55, 28 50, 38 45
                 C 48 40, 54 30, 62 20
                 L 82 20"
              stroke="url(#cyberPath)"
              strokeWidth="0.4"
              fill="none"
              strokeDasharray="1.5,1"
              strokeLinecap="round"
              opacity="0.8"
              filter="url(#glow)"
              vectorEffect="non-scaling-stroke"
            />
            
            {/* Connection dots at game positions */}
            <circle cx="8" cy="65" r="0.5" fill="#e91e63" opacity="1" stroke="rgba(255,255,255,0.8)" strokeWidth="0.15"/>
            <circle cx="38" cy="45" r="0.5" fill="#2196f3" opacity="1" stroke="rgba(255,255,255,0.8)" strokeWidth="0.15"/>
            <circle cx="62" cy="20" r="0.5" fill="#4caf50" opacity="1" stroke="rgba(255,255,255,0.8)" strokeWidth="0.15"/>
            <circle cx="82" cy="20" r="0.5" fill="#9c27b0" opacity="1" stroke="rgba(255,255,255,0.8)" strokeWidth="0.15"/>
          </svg>

          {/* Game Cards */}
          {arenasWithData.map((arena) => (
            <ArenaLocation
              key={arena.gameNum}
              arena={arena}
              onClick={() => handleArenaClick(arena)}
              styles={styles}
            />
          ))}
        </div>
      </div>

      {/* Game Modal */}
      {showModal && selectedArena && (
        <div style={styles.modal} onClick={() => setShowModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button 
              style={styles.modalClose}
              onClick={() => setShowModal(false)}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
            >
              <X size={20} />
            </button>
            
            <div style={styles.modalHeader}>
              <div style={styles.modalEmoji}>{selectedArena.emoji}</div>
              <div style={styles.modalTitle}>{selectedArena.name}</div>
              <div style={styles.modalDescription}>{selectedArena.description}</div>
            </div>

            <div style={styles.modalStats}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Security Score:</span>
                <span style={{ fontWeight: 'bold', color: selectedArena.gameStatus.color }}>
                  {selectedArena.score}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>System Status:</span>
                <span style={{ fontWeight: 'bold', color: selectedArena.gameStatus.color }}>
                  {selectedArena.gameStatus.status.toUpperCase()}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Security Level:</span>
                <span style={{ fontWeight: 'bold' }}>
                  {selectedArena.score > 0 ? `${Math.min(Math.floor(selectedArena.score / 10), 100)}%` : '0%'}
                </span>
              </div>
            </div>

            <div style={styles.modalButtons}>
              <button 
                style={{...styles.modalButton, ...styles.playButton}}
                onClick={handlePlayGame}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                <Play size={20} />
                Access System!
              </button>
              <button 
                style={{...styles.modalButton, ...styles.cancelButton}}
                onClick={() => setShowModal(false)}
              >
                Stand By
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Game Card Component
function ArenaLocation({ arena, onClick, styles }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.gameCard,
        ...arena.position,
        ...(arena.isLocked ? styles.gameCardLocked : {}),
        ...(isHovered && !arena.isLocked ? styles.gameCardHover : {})
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Game Number Badge */}
      <div style={styles.gameNumber}>
        {arena.gameNum}
      </div>
      
      {/* Status Badge */}
      <div style={{
        ...styles.statusBadge,
        background: arena.gameStatus.color
      }}>
        <arena.gameStatus.icon size={14} color="white" />
      </div>
      
      {/* Game Icon */}
      <div style={styles.gameIcon}>
        {arena.isLocked ? '🔒' : arena.emoji}
      </div>
      
      {/* Game Title */}
      <div style={styles.gameTitle}>
        {arena.name}
      </div>
    </div>
  );
}