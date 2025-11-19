import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Star, Trophy, Zap, Play, Lock, Home, LogOut, X, Target, Sword, Eye } from 'lucide-react';
import '../App.css';

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
      <div className="loading-container" style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
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
      position: { top: '65%', left: '8%' },
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
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.8rem 1rem',
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
      fontWeight: 'bold'
    },
    navButtons: {
      display: 'flex',
      gap: '0.5rem'
    },
    mapCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      padding: 'clamp(1rem, 2vw, 2rem)',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0,
      overflow: 'hidden'
    },
    mapTitle: {
      fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '1rem',
      background: 'linear-gradient(45deg, #00bcd4, #9c27b0, #f093fb)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      textShadow: '0 0 30px rgba(0,188,212,0.3)'
    },
    mapContainer: {
      position: 'relative',
      flex: 1,
      background: 'linear-gradient(135deg, rgba(26,26,46,0.4) 0%, rgba(22,33,62,0.4) 50%, rgba(15,52,96,0.4) 100%)',
      borderRadius: '15px',
      border: '2px solid rgba(0, 188, 212, 0.3)',
      boxShadow: '0 0 40px rgba(0,188,212,0.2), inset 0 0 60px rgba(0,0,0,0.3)',
      minHeight: '400px',
      overflow: 'hidden'
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
    gameCard: {
      position: 'absolute',
      width: 'clamp(80px, 12vw, 120px)',
      height: 'clamp(80px, 12vw, 120px)',
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(15px)',
      borderRadius: '15px',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(0.5rem, 1vw, 0.8rem)',
      zIndex: 2,
      transform: 'translate(-50%, -50%)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
    },
    gameCardHover: {
      transform: 'translate(-50%, -50%) scale(1.15)',
      boxShadow: '0 15px 50px rgba(0,188,212,0.6)',
      border: '2px solid rgba(0,188,212,0.8)'
    },
    gameCardLocked: {
      opacity: 0.5,
      cursor: 'not-allowed',
      filter: 'grayscale(0.7)'
    },
    gameNumber: {
      position: 'absolute',
      top: '5px',
      left: '5px',
      background: 'rgba(0, 0, 0, 0.7)',
      borderRadius: '50%',
      width: 'clamp(20px, 3vw, 24px)',
      height: 'clamp(20px, 3vw, 24px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'clamp(0.7rem, 1.2vw, 0.85rem)',
      fontWeight: 'bold',
      border: '1px solid rgba(255, 255, 255, 0.3)'
    },
    statusBadge: {
      position: 'absolute',
      top: '5px',
      right: '5px',
      borderRadius: '50%',
      width: 'clamp(22px, 3.5vw, 28px)',
      height: 'clamp(22px, 3.5vw, 28px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px solid white',
      boxShadow: '0 2px 10px rgba(0,0,0,0.5)'
    },
    gameIcon: {
      fontSize: 'clamp(2rem, 4vw, 2.5rem)',
      marginBottom: '0.3rem'
    },
    gameTitle: {
      fontSize: 'clamp(0.65rem, 1.2vw, 0.85rem)',
      fontWeight: 'bold',
      textAlign: 'center',
      lineHeight: '1.2',
      textShadow: '0 2px 4px rgba(0,0,0,0.8)'
    }
  };

  return (
    <div className="cyber-container bg-gradient-primary" style={{padding: '1rem', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', overflow: 'hidden'}}>
      {/* Header */}
      <div className="glass-card" style={styles.header}>
        <div style={styles.userInfo}>
          <Shield size={32} color="#00bcd4" />
          <div>
            <div className="text-gradient-secondary" style={styles.userName}>
              {userData.email.split('@')[0]}'s Cyber Dashboard
            </div>
            <div className="text-muted" style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)' }}>
              Security Level {Math.floor(userData.overall_game_progress / 25) + 1} Analyst
            </div>
          </div>
        </div>
        <div style={styles.navButtons}>
          <button 
            className="btn-nav"
            onClick={() => navigate('/')}
          >
            <Home size={16} />
            Home
          </button>
          <button 
            className="btn-nav"
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
      <div className="progress-container">
        <div className="progress-title">
          🛡️ Cyber Security Mastery Progress 🛡️
        </div>
        <div className="progress-bar-wrapper">
          <div 
            className="progress-bar"
            style={{
              width: `${userData.overall_game_progress}%`,
              background: `linear-gradient(90deg, ${progressColor}, ${progressColor}dd)`
            }}
          />
          <div className="progress-text">
            {userData.overall_game_progress}% Complete
          </div>
        </div>
        <div className="progress-message">
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
                <stop offset="0%" stopColor="#1a1a2e" stopOpacity="0.8" />
                <stop offset="33%" stopColor="#16213e" stopOpacity="0.8" />
                <stop offset="66%" stopColor="#0f3460" stopOpacity="0.8" />
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
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setShowModal(false)}
            >
              <X size={20} />
            </button>
            
            <div className="modal-header">
              <div className="modal-emoji">{selectedArena.emoji}</div>
              <div className="modal-title">{selectedArena.name}</div>
              <div className="modal-description">{selectedArena.description}</div>
            </div>

            <div className="modal-stats">
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

            <div className="modal-buttons">
              <button 
                className="modal-button modal-button-play"
                onClick={handlePlayGame}
              >
                <Play size={20} />
                Access System!
              </button>
              <button 
                className="modal-button modal-button-cancel"
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