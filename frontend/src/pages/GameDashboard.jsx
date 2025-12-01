import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import hero1 from "../assets/Hero1.png";
import hero2 from "../assets/Hero2.png";
import hero3 from "../assets/Hero3.png";
import hero4 from "../assets/Hero4.png";
import AilithmG from "../assets/AilithmG.png";
import AilithmV from "../assets/AilithmV.png";
import Lagdrakul1 from "../assets/Lagdrakul1.png";
import Lagdrakul2 from "../assets/Lagdrakul2.png";
import Lagdrakul2A from "../assets/Lagdrakul2A.png";

import {
  Shield,
  Star,
  Trophy,
  Zap,
  Lock,
  Home,
  LogOut,
  X,
  Target,
  Sword,
  Eye,
  BookOpen,
  ArrowRight,
  Check,
  AlertCircle
} from 'lucide-react';
import '../App.css';

const POST_GAME_DIALOGUE = {
  2: {
    id: 'post_game_2_to_deepfakes',
    gameNum: 2,
    spriteByLine: [hero2,AilithmG,AilithmG,hero2],
    speaker: 'Te-Qwuiz & Ailithm',
    lines: [
      'Te-Qwuiz: I\'ve gained some armor and learned something too! He\'s planning to steal people\'s identities and corrupt them. Those etched runes told us a lot about Lagdrakul\'s plan.',
      'Ailithm: Lagdrakul will not just steal faces from the crowd, Te-Qwuiz. He will forge them — shadow helms, mimicking trusted figures.',
      'Ailithm: When a face or voice feels familiar, that is when you must doubt it the most. Familiarity is his favorite disguise.',
      'Te-Qwuiz: Then our next trial is clear; we learn to split truth from forged faces before his illusions reach the throne.'
    ]
  },
  3: {
    id: 'post_game_3_to_phishing',
    gameNum: 3,
    spriteByLine: [hero3,AilithmG,hero3, AilithmG],
    speaker: 'Te-Qwuiz & Ailithm',
    lines: ['Te-Qwuiz: WOW! Thanks for helping me find the fragemnts to my sword! It\'s lucky we found some of the Lagdrakul\'s shadow helms too, but the air still feels... tainted. Like something evil is on it\'s way',
      'Ailithm: Ah yes, I\'d say that his next step would be to trap us all in one area, to attempt to corrupt the kingdom.',
      'Te-Qwuiz: Well then we must prepare ourselves to face his tricks. What should we look out for?',
      'Ailithm: Lagdrakul\'s phishing scams use urgency and pressure to make us act without thinking. Try multiple paths to verify information before acting. Let us find you a steed, staying mobile and staying vigilant is key. '
    ]
  },
  4: {
    id: 'post_game_4_to_public_networks',
    gameNum: 4,
    spriteByLine: [AilithmG, hero4, AilithmG, hero4],
    speaker: 'Te-Qwuiz & Ailithm',
    lines: [
      "Ailithm: But those were just his opening moves. Now come the scrollstorms.",
      'Te-Qwuiz: Scrolls that scream "urgent," seals that look royal, coins promised for a single click… it feels like a net tightening.',
      "Ailithm: That is exactly what it is, the Phishers' Net. Lagdrakul's agents cast enchanted messages to hook the panicked and the greedy.",
      'Te-Qwuiz: Then we learn to spot the hooks inside the scrolls before they pierce anyone in the realm.'
    ]
  },
  5: {
    id: 'post_game_4_to_public_networks',
    gameNum: 5,
    spriteByLine: [hero4, AilithmG, AilithmG, hero4, Lagdrakul2, Lagdrakul2A, AilithmG, AilithmV, AilithmV],
    speaker: 'Te-Qwuiz & Ailithm',
    lines: [
      'Te-Qwuiz: The Phishers\' Net is torn, but the air still feels… fouled.',
      'Ailithm: Lagdrakul has moved on to poisoning the shared wells. The public networks where travelers drink data without shields.',
      'Ailithm: One careless login at those wells, and spies can skim every secret poured into the stream.',
      'Te-Qwuiz: Then we ride to the polluted wells and learn to guard ourselves whenever we must drink from them.',
      'Lagdrakul: ROARRR!!! You think you can stop me with your petty tricks? I will have your passwords and keys, and there is nothing you can do to stop me!',
      'Lagdrakul: Your efforts are futile! I have already won! Look at your poor companion!',
      'Ailithm: No… what have you done to me, Lagdrakul?',
      'Ailithm: ... ',
      'Ailithm: wHaT iS tHaT mElLoDy...? I see it now, abuse the weak locks, lazy runes... YES! I want to corrupt others too! Muahahaha!' 
    ]
  },
  6: {
    id: 'post_game_5_to_password_forge',
    gameNum: 5,
    spriteByLine: [AilithmG, hero4, AilithmG, hero4],
    
    speaker: 'Te-Qwuiz & Ailithm',
    lines: [
      "Ailithm: Thank you! You have seen Lagdrakul's code up close now… very few return from that gaze unchanged. I didn\'t.",
      "Te-Qwuiz: His power drips through weak locks and lazy runes. Doors meant for one soul are flung open to an army.",
      'Ailithm: Then we step out of the Password Forge — where keys are tempered, lengthened, and made unreadable to his claws.',
      "Te-Qwuiz: If our keys hold, the dragon's talons will find only cold iron and closed gates. Never able to claw his way back."
    ]
  }
};

const PRE_GAME_STORY = {
  1: {
    id: 'pregame_1_snake_intro',
    gameNum: 1, 
    spriteByLine: [hero1,AilithmG, AilithmG, hero1, Lagdrakul1, Lagdrakul2, hero1, AilithmG],
    speaker: 'Te-Qwuiz & Ailithm',
    lines: [
      "Te-Qwuiz: Hi there, I've heard rumors that Lagdrakul is planning some shenanigans for the kingdom. Do you know anything about him or how to stop it?",
      "Ailithm: Why of course! He's planning to steal information about influential people like myself to impersonate them and then corrupt everything.",
      "Ailithm: Your digital footprint is the first piece of armor against malicious people. Every careless mark you leave makes his job easier.",
      "Te-Qwuiz: Then we tighten our armor first. Show me how to keep a good digital footprint so we can hunt him without being hunted.",
      "Te-Qwuiz: Hi there, I've heard rumors that Lagdrakul is planning some shenanigans for the kingdom. Do you know anything about him or how to stop it?",
      "Ailithm: Why of course! He's planning to steal information about influential people like myself to impersonate them and then corrupt everything.",
      "Ailithm: Your digital footprint is the first piece of armor against malicious people. Every careless mark you leave makes his job easier.",
      "Te-Qwuiz: Then we tighten our armor first. Show me how to keep a good digital footprint so we can hunt him without being hunted."
    ]
  }, 
};

const EDUCATIONAL_MODULES = {
  1: {
    title: 'Module 1 — Digital Footprint',
    subtitle: '(Etched Runes)',
    content:
      'In the hunt for Lagdrakul, Te-Qwuiz teaches that every "rune you etch" online becomes part of your digital footprint: (1) once posted, information is permanent, (2) enemies can track you using the details you reveal, (3) sharing personal data helps attackers build profiles, and (4) protecting your identity protects your future self. The realm learns that even heroes should think before they carve their mark into the network stone.',
    quiz: [
      {
        question: 'Is online information easily erased once posted?',
        options: [
          'Yes, you can always delete it completely',
          'No — once shared, it becomes part of your permanent digital footprint',
          'Only if you delete it within 24 hours',
          'Yes, but only with special software'
        ],
        correctIndex: 1
      },
      {
        question: 'Why does oversharing online put you at risk?',
        options: [
          'It makes your device slower',
          'It uses too much data',
          'Attackers can use your information to track or target you, or pretend to be you and trick others',
          "It's against the law"
        ],
        correctIndex: 2
      },
      {
        question: 'What kind of information should you protect to avoid profiling?',
        options: [
          'Only your credit card numbers',
          'Personal details such as location, habits, or identity clues',
          'Only your password',
          'Your favorite color'
        ],
        correctIndex: 1
      },
      {
        question: 'How does guarding your online presence protect your future?',
        options: [
          'It makes you more popular',
          'Because posts can be used later for reputation, privacy, or security attacks',
          'It helps you get more followers',
          "It doesn't really matter"
        ],
        correctIndex: 1
      }
    ]
  },
  2: {
    title: 'Module 2 — Deepfakes',
    subtitle: '(False Faces)',
    content:
      'As the investigation deepens, Te-Qwuiz discovers "shadow helms" — forged faces mimicking trusted figures: (1) deepfakes can look and sound convincingly real, (2) familiarity doesn\'t guarantee authenticity, (3) verifying sources before believing is essential, and (4) cross-checking information across multiple channels exposes impersonation. In a world of illusions, the sharpest weapon is skepticism.',
    quiz: [
      {
        question: 'Can a forged image or voice appear convincingly real?',
        options: [
          'No, you can always tell',
          'Yes — deepfakes can imitate trusted people with high accuracy',
          'Only in movies',
          'Only for celebrities'
        ],
        correctIndex: 1
      },
      {
        question:
          'When you recognize a face or voice online, should you automatically trust it?',
        options: [
          'Yes, if it looks real it must be real',
          "No — familiarity doesn't prove authenticity, especially celebrities and politicians",
          'Only trust videos, not images',
          'Always trust voices but not faces'
        ],
        correctIndex: 1
      },
      {
        question: 'What is the best defense against deepfake manipulation?',
        options: [
          'Never watch any videos',
          'Only use social media',
          'Verify the source before believing or acting',
          'Share everything you see'
        ],
        correctIndex: 2
      },
      {
        question: 'How can you expose a deepfake more easily?',
        options: [
          'Use special software only',
          'Compare information across multiple channels',
          'Ask your friends',
          'Report it immediately without checking'
        ],
        correctIndex: 1
      }
    ]
  },
  3: {
    title: 'Module 3 — Phishing Scams',
    subtitle: "(The Phishers' Net)",
    content:
      'When Lagdrakul poisons public digital wells, Te-Qwuiz warns that (1) shared networks expose all users to eavesdropping, (2) logging into sensitive accounts on public access points is dangerous, (3) secure connections and encryption protect travelers, and (4) using personal defenses like firewalls and shields prevents outsiders from spying. A hero should never drink unguarded from a shared source. You\'re best bet is to tame a horse and locate a safer source',
    quiz: [
      {
        question:
          'What tactic do phishing messages use to make you act without thinking?',
        options: [
          'Urgency or pressure',
          'Polite requests',
          'Long explanations',
          'Funny jokes'
        ],
        correctIndex: 0
      },
      {
        question:
          'Should you ever give passwords, private keys, or money over messages?',
        options: [
          'Yes, if they ask nicely',
          'Only to family members',
          'No — no legitimate organization or ally will request them',
          "Yes, if it's urgent"
        ],
        correctIndex: 2
      },
      {
        question: 'Why are unknown links and attachments risky?',
        options: [
          'They take too long to load',
          'They may hide malware or traps',
          'They use too much bandwidth',
          "They're not risky at all"
        ],
        correctIndex: 1
      },
      {
        question: 'How do you verify a suspicious message?',
        options: [
          'Click the link to check',
          'Reply to the message',
          'Reach out to the sender through a known, trusted channel. Double check spelling of everything',
          'Ignore it completely'
        ],
        correctIndex: 2
      }
    ]
  },
  4: {
    title: 'Module 4 — Public Networks Safety',
    subtitle: '(The Polluted Well)',
    content:
      "Lagdrakul's agents unleash waves of enchanted scrolls that tempt the unwary: (1) phishing messages push urgency to override reason, (2) no legitimate ally asks for passwords or private keys, (3) suspicious links and attachments are a major danger, and (4) when in doubt, contact the supposed sender directly through a trusted channel. Knights learn that quick clicks can lead to quick downfall.",
    quiz: [
      {
        question: 'What risk do public networks pose?',
        options: [
          "They're slower than home networks",
          'They allow attackers to intercept data from anyone connected',
          'They cost money to use',
          "They don't pose any risks"
        ],
        correctIndex: 1
      },
      {
        question:
          'Should you access banking or private accounts on public networks?',
        options: [
          "Yes, it's always safe",
          "Only if you're in a hurry",
          'No, it greatly increases vulnerability',
          'Yes, but only on your phone'
        ],
        correctIndex: 2
      },
      {
        question: 'What are some common public networks that might be like this?',
        options: [
          'Home WiFi',
          'Airports, coffee shops, and malls',
          "Your phone's hotspot",
          'Your work network'
        ],
        correctIndex: 1
      },
      {
        question:
          'What personal protection helps block spying on public networks?',
        options: [
          'Using incognito mode',
          'Turning off your screen',
          'Firewall or network shield equivalents or VPNs',
          'Using a strong password'
        ],
        correctIndex: 2
      }
    ]
  },
  5: {
    title: 'Module 5 — Password Security',
    subtitle: '(The Finale Forge)',
    content:
      'The password is the most important piece Lagdrakul is after, know what to do in order to stop him. Ailithm has been courrpted and needs you to rescue him. Create a safe password, survive his onslaught, and save your ally! and you might be able to save the kingdom!',
    quiz: [
      {
        question: 'What makes a password strong?',
        options: [
          'Using your name and birthday',
          'Short and easy to remember',
          'Long with a mix of symbols, numbers, and letters',
          'A single common word'
        ],
        correctIndex: 2
      },
      {
        question: 'Which of the following is the safest password?',
        options: ['password123', 'Summer2024!', 'qwerty', 'G!7rP#9wL2@'],
        correctIndex: 3
      },
      {
        question: 'Why should you avoid using the same password everywhere?',
        options: [
          'Its annoying to type different passwords',
          'Hackers could access multiple accounts if one password is leaked',
          "Websites dont allow reused passwords",
          'It makes you forget your email'
        ],
        correctIndex: 1
      },
      {
        question: 'What is a password manager?',
        options: [
          'A program that stores and helps create strong passwords',
          'A tool that automatically sends your passwords to friends',
          'A physical book where you write passwords',
          'A type of computer virus'
        ],
        correctIndex: 0
      }
    ]
  }
};

export default function GameDashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  

  const [selectedArena, setSelectedArena] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // which game's full-screen module is open (1–5) or null
  const [learningGameNum, setLearningGameNum] = useState(null);


  // Queue of story beats (now only post-game dialogue)
  const [storyQueue, setStoryQueue] = useState([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

    useEffect(() => {
  const storedUser = localStorage.getItem('cyberslayers_user');

  let combinedBeats = [];
  let hasPostGameDialogue = false;
  let hasVisitedDashboard = false;

  // Load which story IDs have already been shown
  let shownIds = [];
  try {
    const raw = localStorage.getItem('cyberslayers_story_shown');
    shownIds = raw ? JSON.parse(raw) : [];
  } catch (e) {
    shownIds = [];
  }

  // Track if the dashboard has ever been opened before
  try {
    hasVisitedDashboard =
      localStorage.getItem('cyberslayers_dashboard_visited') === 'true';
  } catch (e) {
    hasVisitedDashboard = false;
  }

  // Load user or redirect
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    setUserData(parsedUser);
  } else {
    navigate('/login');
    setLoading(false);
    return;
  }

  // ───────── Post-game dialogue when returning from a game ─────────
  try {
    const rawGame = localStorage.getItem('cyberslayers_last_completed_game');
    const rawStatus = localStorage.getItem(
      'cyberslayers_last_completion_status'
    );

    if (rawGame !== null && rawStatus === 'success') {
      const gameIndex = parseInt(rawGame, 10);

      if (!Number.isNaN(gameIndex)) {
        // Queue post-game dialogue beat (if defined)
        const postBeat = POST_GAME_DIALOGUE[gameIndex];
        if (postBeat) {
          hasPostGameDialogue = true;
          combinedBeats = [...combinedBeats, postBeat];

          // If you later add a specific pre-boss intro, you can still do it here
          // Example:
          // if (gameIndex === 4) {
          //   const preBossIntro = PRE_GAME_STORY[5];
          //   if (preBossIntro && !shownIds.includes(preBossIntro.id)) {
          //     combinedBeats = [...combinedBeats, preBossIntro];
          //   }
          // }
        }
      }

      // Clear so this only triggers once per completion
      localStorage.removeItem('cyberslayers_last_completed_game');
      localStorage.removeItem('cyberslayers_last_completion_status');
    }
  } catch (e) {
    // ignore localStorage errors
  }

  // ───────── FIRST-TIME DASHBOARD POPUP ─────────
  // Only if:
  //  - player has NEVER seen the dashboard before, and
  //  - we are NOT coming directly from a completed game (no post-game dialogue)
  if (!hasVisitedDashboard && !hasPostGameDialogue) {
    const dashboardIntro = PRE_GAME_STORY[1]; // your existing intro beat
    if (dashboardIntro) {
      combinedBeats = [dashboardIntro, ...combinedBeats];
    }

    // Mark dashboard as visited so this never fires again
    try {
      localStorage.setItem('cyberslayers_dashboard_visited', 'true');
    } catch (e) {
      // ignore
    }
  }

  // Start the story queue if we have any beats
  if (combinedBeats.length > 0) {
    setStoryQueue(combinedBeats);
    setCurrentStoryIndex(0);
  }

  setLoading(false);
}, [navigate]);


  const handleLogout = () => {
    localStorage.removeItem('cyberslayers_user');
    navigate('/');
  };

  const getProgressColor = (progress) => {
    if (progress <= 25) return '#ff6b6b';
    if (progress <= 50) return '#ffa726';
    if (progress <= 75) return '#ffee58';
    return '#66bb6a';
  };

  const getGameStatus = (score) => {
    if (score === 0) return { status: 'offline', color: '#94a3b8', icon: Lock };
    if (score <= 300) return { status: 'bronze', color: '#cd7f32', icon: Star };
    if (score <= 600) return { status: 'silver', color: '#c0c0c0', icon: Star };
    if (score <= 800) return { status: 'gold', color: '#ffd700', icon: Trophy };
    return { status: 'diamond', color: '#00bcd4', icon: Zap };
  };

  /**
   * When a node on the map is clicked:
   * - open the training modal
   */
  const handleArenaClick = (arenaData) => {
    setSelectedArena(arenaData);
    setShowModal(true);
  };

  const handleBeginTraining = () => {
    if (!selectedArena) return;
    setShowModal(false);
    setLearningGameNum(selectedArena.gameNum);
  };

  const handleEnterGameFromModule = (gameNum) => {
    const gameRoutes = {
      1: '/password-security-core',
      2: '/phishing-detection-hub',
      3: '/malware-analysis-lab',
      4: '/network-command-center',
      5: '/password-maker'
    };

    const route = gameRoutes[gameNum];
    if (route) {
      setLearningGameNum(null);
      navigate(route);
    }
  };

  if (loading) {
    return (
      <div
        className="loading-container"
        style={{
          background:
            'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
        }}
      >
        Loading your cyber security network... 🔐
      </div>
    );
  }

  if (!userData) return null;

  const progressColor = getProgressColor(userData.overall_game_progress);
  const games = userData.games || {};

  const arenas = [
    {
      gameNum: 1,
      name: 'Digital Footprint Protection',
      description: 'Master authentication protocols and secure access systems',
      emoji: '🛡️',
      icon: Shield,
      position: { top: '65%', left: '10%' },
      color: '#e91e63',
      terrain: 'security'
    },
    {
      gameNum: 2,
      name: 'Deepfakes/Grooming Detection',
      description: 'Scan and identify malicious network communications',
      emoji: '🔍',
      icon: Eye,
      position: { top: '45%', left: '32%' },
      color: '#2196f3',
      terrain: 'detection'
    },
    {
      gameNum: 3,
      name: 'Scam Detection',
      description: 'Reverse engineer and neutralize cyber threats',
      emoji: '🔬',
      icon: Sword,
      position: { top: '25%', left: '55%' },
      color: '#4caf50',
      terrain: 'analysis'
    },
    {
      gameNum: 4,
      name: 'Public Network Safety',
      description: 'Monitor and defend the entire cyber infrastructure',
      emoji: '🖥️',
      icon: Target,
      position: { top: '20%', left: '75%' },
      color: '#9c27b0',
      terrain: 'command'
    },
    {
      gameNum: 5,
      name: 'Password Tester',
      description: 'Learn how to build strong, secure passwords',
      emoji: '🔑',
      icon: Lock,
      position: { top: '45%', left: '90%' },
      color: '#ff9800',
      terrain: 'security'
    }
  ];

  // All games unlocked, but still show status badges based on score
  const arenasWithData = arenas.map((arena) => {
    const scoreField = `game${arena.gameNum}_score`;
    const score = games[scoreField] || 0;
    const gameStatus = getGameStatus(score);
    return {
      ...arena,
      score,
      gameStatus,
      isLocked: false
    };
  });

  // Build SVG path and node positions from arena card positions
  const sortedArenas = [...arenasWithData].sort(
    (a, b) => a.gameNum - b.gameNum
  );

  const pathD =
    sortedArenas.length > 0
      ? sortedArenas
          .map((arena, index) => {
            const x = parseFloat(arena.position.left); // "10%" -> 10
            const y = parseFloat(arena.position.top); // "65%" -> 65
            return `${index === 0 ? 'M' : 'L'} ${x} ${y + 10}`; // line runs under cards
          })
          .join(' ')
      : '';

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
      background:
        'linear-gradient(135deg, rgba(26,26,46,0.4) 0%, rgba(22,33,62,0.4) 50%, rgba(15,52,96,0.4) 100%)',
      borderRadius: '15px',
      border: '2px solid rgba(0, 188, 212, 0.3)',
      boxShadow:
        '0 0 40px rgba(0,188,212,0.2), inset 0 0 60px rgba(0,0,0,0.3)',
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

  const currentModule =
    selectedArena && EDUCATIONAL_MODULES[selectedArena.gameNum];

  return (
    <div
      className="cyber-container bg-gradient-primary"
      style={{
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <div className="glass-card" style={styles.header}>
        <div style={styles.userInfo}>
          <Shield size={32} color="#00bcd4" />
          <div>
            <div className="text-gradient-secondary" style={styles.userName}>
              {userData.email.split('@')[0]}'s Cyber Dashboard
            </div>
            <div
              className="text-muted"
              style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)' }}
            >
              Security Level{' '}
              {Math.floor(userData.overall_game_progress / 25) + 1} Analyst
            </div>
          </div>
        </div>
        <div style={styles.navButtons}>
          <button className="btn-nav" onClick={() => navigate('/')}>
            <Home size={16} />
            Home
          </button>
          <button className="btn-nav" onClick={handleLogout}>
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
          {userData.overall_game_progress < 25 &&
            '💾 Systems initializing... Building foundation!'}
          {userData.overall_game_progress >= 25 &&
            userData.overall_game_progress < 50 &&
            '🔒 Security protocols active! Excellent progress!'}
          {userData.overall_game_progress >= 50 &&
            userData.overall_game_progress < 75 &&
            '⚡ Advanced systems online! Almost there!'}
          {userData.overall_game_progress >= 75 &&
            userData.overall_game_progress < 100 &&
            '🚀 Elite level detected! Finalizing mastery!'}
          {userData.overall_game_progress >= 100 &&
            '👑 Cyber Security Expert! All systems secured!'}
        </div>
      </div>

      {/* Game Map Card */}
      <div style={styles.mapCard}>
        <div style={styles.mapTitle}>🌐 CYBER SECURITY NETWORK MAP 🌐</div>

        <div style={styles.mapContainer}>
          {/* Network lines */}
          <svg
            style={styles.pathSvg}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id="cyberPath"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#1a1a2e" stopOpacity="0.8" />
                <stop offset="33%" stopColor="#16213e" stopOpacity="0.8" />
                <stop offset="66%" stopColor="#0f3460" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#00bcd4" stopOpacity="0.8" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="0.3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Main path connecting arenas */}
            {pathD && (
              <path
                d={pathD}
                stroke="url(#cyberPath)"
                strokeWidth="0.6"
                fill="none"
                strokeDasharray="1.5,1"
                strokeLinecap="round"
                opacity="0.9"
                filter="url(#glow)"
                vectorEffect="non-scaling-stroke"
              />
            )}

            {/* Progress nodes directly under each game module */}
            {sortedArenas.map((arena) => {
              const cx = parseFloat(arena.position.left);
              const cy = parseFloat(arena.position.top) + 10; // right under the card

              const isUnlocked = !arena.isLocked;
              const isCompleted = arena.score > 0;

              const radius = isCompleted ? 1.2 : isUnlocked ? 0.9 : 0.7;

              const fillColor = isCompleted
                ? arena.color
                : isUnlocked
                ? 'rgba(15,52,96,0.8)'
                : 'rgba(15,23,42,0.8)';

              const strokeColor = isUnlocked
                ? 'rgba(255,255,255,0.9)'
                : 'rgba(148,163,184,0.8)';

              return (
                <circle
                  key={arena.gameNum}
                  cx={cx}
                  cy={cy}
                  r={radius}
                  fill={fillColor}
                  opacity="1"
                  stroke={strokeColor}
                  strokeWidth="0.2"
                />
              );
            })}
          </svg>

          {/* Game nodes */}
          {arenasWithData.map((arena) => (
            <ArenaLocation
              key={arena.gameNum}
              arena={arena}
              onClick={handleArenaClick}
              styles={styles}
            />
          ))}
        </div>
      </div>

      {/* Landing Modal: small scroll preview + "Begin Training" */}
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
              <div className="modal-description">
                {selectedArena.description}
              </div>
            </div>

            {currentModule && (
              <div className="lesson-scroll">
                <button
                  className="modal-button modal-button-play"
                  onClick={handleBeginTraining}
                >
                  Begin Training
                </button>
              </div>
            )}

            {/* Stats */}
            <div className="modal-stats">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem'
                }}
              >
                <span>Security Score:</span>
                <span
                  style={{
                    fontWeight: 'bold',
                    color: selectedArena.gameStatus.color
                  }}
                >
                  {selectedArena.score}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem'
                }}
              >
                <span>System Status:</span>
                <span
                  style={{
                    fontWeight: 'bold',
                    color: selectedArena.gameStatus.color
                  }}
                >
                  {selectedArena.gameStatus.status.toUpperCase()}
                </span>
              </div>
              <div
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <span>Security Level:</span>
                <span style={{ fontWeight: 'bold' }}>
                  {selectedArena.score > 0
                    ? `${Math.min(
                        Math.floor(selectedArena.score / 10),
                        100
                      )}%`
                    : '0%'}
                </span>
              </div>
            </div>

            <div className="modal-buttons">
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

      {/* Full-screen LearningModule for whichever game is active */}
      {learningGameNum && (
        <LearningModule
          gameNum={learningGameNum}
          module={EDUCATIONAL_MODULES[learningGameNum]}
          onEnterGame={handleEnterGameFromModule}
          onClose={() => setLearningGameNum(null)}
        />
      )}

      {/* Story dialogue popups after completing games */}
      {storyQueue.length > 0 && (
        <StoryDialoguePopup
          beat={storyQueue[currentStoryIndex]}
          onAdvance={() => {
            const currentBeat = storyQueue[currentStoryIndex];
            try {
              const raw = localStorage.getItem('cyberslayers_story_shown');
              const shownIds = raw ? JSON.parse(raw) : [];
              if (!shownIds.includes(currentBeat.id)) {
                shownIds.push(currentBeat.id);
                localStorage.setItem(
                  'cyberslayers_story_shown',
                  JSON.stringify(shownIds)
                );
              }
            } catch (e) {
              // ignore
            }

            if (currentStoryIndex < storyQueue.length - 1) {
              setCurrentStoryIndex((i) => i + 1);
            } else {
              setStoryQueue([]);
            }
          }}
        />
      )}
    </div>
  );
}

function StoryDialoguePopup({ beat, onAdvance }) {
  const { sprite, spriteByLine, speaker, lines } = beat;
  const [lineIndex, setLineIndex] = useState(0);

  const isLastLine = lineIndex === lines.length - 1;

  const handleNext = () => {
    if (!isLastLine) {
      setLineIndex((prev) => prev + 1);
    } else {
      onAdvance();
    }
  };

  // Decide which sprites to show for the current line
  const spritesForCurrentLine = (() => {
    // Highest priority: spriteByLine (per-line, can be 1 or many per line)
    if (spriteByLine && Array.isArray(spriteByLine)) {
      const entry =
        spriteByLine[lineIndex] ??
        spriteByLine[spriteByLine.length - 1]; // fallback to last defined

      if (Array.isArray(entry)) return entry; // e.g. [hero4, AilithmG]
      if (entry) return [entry];             // single sprite in that slot
    }

    // Fallback: sprite field
    if (!sprite) return [];
    if (Array.isArray(sprite)) return sprite; // treat as "always show these"
    return [sprite];                          // single image
  })();

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(5, 10, 25, 0.85)',
        padding: '1.5rem'
      }}
    >
      <div
        style={{
          maxWidth: '700px',
          width: '100%',
          display: 'flex',
          gap: '1.25rem',
          alignItems: 'flex-end',
          justifyContent: 'center'
        }}
      >
        {/* LEFT: one or more character sprites */}
        {spritesForCurrentLine.length > 0 && (
          <div
            style={{
              flexShrink: 0,
              maxWidth: '35%',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}
          >
            {spritesForCurrentLine.map((imgSrc, idx) => (
              <div
                key={idx}
                style={{
                  width: '180px',
                  maxWidth: '100%'
                }}
              >
                <img
                  src={imgSrc}
                  alt={speaker}
                  style={{
                    width: '100%',
                    height: 'auto',
                    imageRendering: 'pixelated',
                    filter:
                      'drop-shadow(0 0 15px rgba(0, 188, 212, 0.7))'
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* RIGHT: dialogue box */}
        <div
          style={{
            flex: 1,
            background:
              'linear-gradient(135deg, rgba(15,52,96,0.95), rgba(0,188,212,0.25))',
            borderRadius: '18px',
            border: '2px solid rgba(0,188,212,0.7)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.7)',
            padding: '1.5rem',
            color: 'white',
            position: 'relative'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-14px',
              left: '1.5rem',
              padding: '0.2rem 0.8rem',
              borderRadius: '999px',
              background: 'linear-gradient(135deg, #00bcd4, #9c27b0)',
              fontWeight: 'bold',
              fontSize: '0.85rem',
              textTransform: 'uppercase'
            }}
          >
            {speaker}
          </div>

          <div
            style={{
              minHeight: '80px',
              marginBottom: '1rem',
              fontSize: '1rem',
              lineHeight: '1.7'
            }}
          >
            {lines[lineIndex]}
          </div>

          <button
            onClick={handleNext}
            style={{
              marginTop: '0.5rem',
              padding: '0.75rem 1.4rem',
              background: 'linear-gradient(135deg, #00bcd4, #e91e63)',
              borderRadius: '999px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              color: 'white'
            }}
          >
            {isLastLine ? 'Continue Mission' : 'Next →'}
          </button>
        </div>
      </div>
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
        ...(isHovered ? styles.gameCardHover : {})
      }}
      onClick={() => onClick(arena)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.gameNumber}>{arena.gameNum}</div>

      <div
        style={{
          ...styles.statusBadge,
          background: arena.gameStatus.color
        }}
      >
        <arena.gameStatus.icon size={14} color="white" />
      </div>

      <div style={styles.gameIcon}>{arena.emoji}</div>

      <div style={styles.gameTitle}>{arena.name}</div>
    </div>
  );
}

/**
 * Generic LearningModule overlay:
 * - Uses EDUCATIONAL_MODULES data (title, content, quiz)
 * - Shows scroll, then quiz, then result
 * - Calls onEnterGame(gameNum) when passed and player presses "Enter the Game Arena!"
 */
function LearningModule({ gameNum, module, onEnterGame, onClose }) {
  const [stage, setStage] = useState('scroll'); // 'scroll' | 'quiz' | 'result'
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleScrollComplete = () => {
    setStage('quiz');
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    module.quiz.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctIndex) {
        correct++;
      }
    });
    const percentage = (correct / module.quiz.length) * 100;
    setScore(percentage);
    setStage('result');
  };

  const handleNextQuestion = () => {
    if (currentQuestion < module.quiz.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setShowExplanation(false);
    } else {
      calculateScore();
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setScore(0);
    setShowExplanation(false);
    setStage('quiz');
  };

  const currentQ = module.quiz[currentQuestion];
  const isPassed = score >= 75;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          background: 'rgba(0,0,0,0.6)',
          borderRadius: '999px',
          border: '1px solid rgba(255,255,255,0.3)',
          color: 'white',
          padding: '0.4rem 0.7rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          cursor: 'pointer'
        }}
      >
        <X size={16} /> Exit
      </button>

      {stage === 'scroll' && (
        <div
          style={{
            position: 'relative',
            maxWidth: '800px',
            width: '100%'
          }}
        >
          <div
            style={{
              position: 'relative',
              background: 'linear-gradient(135deg, #d4a574, #e8c99a, #d4a574)',
              borderRadius: '20px',
              padding: '3rem 2rem',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              border: '10px solid #4a4a4a',
              borderTop: '20px solid #4a4a4a',
              borderBottom: '20px solid #4a4a4a'
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: '20px',
                top: '30px',
                bottom: '30px',
                width: '15px',
                background: 'linear-gradient(180deg, #00bcd4, #0a5f6f)',
                opacity: 0.6
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: '20px',
                top: '30px',
                bottom: '30px',
                width: '15px',
                background: 'linear-gradient(180deg, #00bcd4, #0a5f6f)',
                opacity: 0.6
              }}
            />

            <div
              style={{
                color: '#2c1810',
                fontSize: '1.1rem',
                lineHeight: '1.8',
                fontFamily: 'Georgia, serif',
                whiteSpace: 'pre-line',
                textAlign: 'justify',
                maxHeight: '500px',
                overflowY: 'auto',
                paddingLeft: '30px',
                paddingRight: '30px'
              }}
            >
              <h2
                style={{
                  textAlign: 'center',
                  marginBottom: '1.5rem',
                  fontSize: '1.8rem',
                  color: '#1a0f0a',
                  fontWeight: 'bold',
                  textDecoration: 'underline',
                  textDecorationColor: '#00bcd4'
                }}
              >
                {module.title} {module.subtitle}
              </h2>
              {module.content}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '2rem'
            }}
          >
            <button
              onClick={handleScrollComplete}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, #00bcd4, #e91e63)',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(0,188,212,0.4)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow =
                  '0 12px 30px rgba(0,188,212,0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow =
                  '0 8px 20px rgba(0,188,212,0.4)';
              }}
            >
              Continue to Quiz <ArrowRight size={24} />
            </button>
          </div>
        </div>
      )}

      {stage === 'quiz' && (
        <div
          style={{
            maxWidth: '700px',
            width: '100%',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '2rem',
            border: '2px solid rgba(0, 188, 212, 0.5)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
          }}
        >
          <div
            style={{
              marginBottom: '2rem',
              color: 'white'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.5rem',
                fontSize: '0.9rem',
                opacity: 0.8
              }}
            >
              <span>
                Question {currentQuestion + 1} of {module.quiz.length}
              </span>
              <span>{Object.keys(selectedAnswers).length} answered</span>
            </div>
            <div
              style={{
                height: '8px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '4px',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #00bcd4, #e91e63)',
                  width: `${
                    ((currentQuestion + 1) / module.quiz.length) * 100
                  }%`,
                  transition: 'width 0.3s ease'
                }}
              />
            </div>
          </div>

          <h3
            style={{
              color: 'white',
              fontSize: '1.4rem',
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}
          >
            {currentQ.question}
          </h3>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              marginBottom: '2rem'
            }}
          >
            {currentQ.options.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestion] === index;
              const isCorrect = index === currentQ.correctIndex;
              const showResult = showExplanation;

              return (
                <button
                  key={index}
                  onClick={() => {
                    handleAnswerSelect(currentQuestion, index);
                    setShowExplanation(true);
                  }}
                  disabled={showExplanation}
                  style={{
                    padding: '1.2rem',
                    background: showResult
                      ? isCorrect
                        ? 'rgba(76, 175, 80, 0.3)'
                        : isSelected
                        ? 'rgba(244, 67, 54, 0.3)'
                        : 'rgba(255,255,255,0.1)'
                      : isSelected
                      ? 'rgba(0, 188, 212, 0.3)'
                      : 'rgba(255,255,255,0.1)',
                    border: showResult
                      ? isCorrect
                        ? '2px solid #4caf50'
                        : isSelected
                        ? '2px solid #f44336'
                        : '2px solid rgba(255,255,255,0.2)'
                      : isSelected
                      ? '2px solid #00bcd4'
                      : '2px solid rgba(255,255,255,0.2)',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '1rem',
                    cursor: showExplanation ? 'default' : 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}
                >
                  <div
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      background:
                        showResult && isCorrect
                          ? '#4caf50'
                          : 'rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    {showResult && isCorrect && <Check size={20} />}
                    {!showResult && String.fromCharCode(65 + index)}
                  </div>
                  {option}
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div
              style={{
                padding: '1rem',
                background:
                  selectedAnswers[currentQuestion] === currentQ.correctIndex
                    ? 'rgba(76, 175, 80, 0.2)'
                    : 'rgba(244, 67, 54, 0.2)',
                borderRadius: '12px',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem'
              }}
            >
              {selectedAnswers[currentQuestion] === currentQ.correctIndex ? (
                <>
                  <Check size={24} color="#4caf50" />
                  <span style={{ color: 'white' }}>
                    Correct! Well done, cyber warrior! 🛡️
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle size={24} color="#f44336" />
                  <span style={{ color: 'white' }}>
                    Not quite. The correct answer is highlighted above.
                  </span>
                </>
              )}
            </div>
          )}

          {showExplanation && (
            <button
              onClick={handleNextQuestion}
              style={{
                width: '100%',
                padding: '1rem',
                background: 'linear-gradient(135deg, #00bcd4, #e91e63)',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {currentQuestion < module.quiz.length - 1
                ? 'Next Question'
                : 'See Results'}
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      )}

      {stage === 'result' && (
        <ResultPanel
          module={module}
          score={score}
          selectedAnswers={selectedAnswers}
          isPassed={isPassed}
          onEnterGame={() => onEnterGame(gameNum)}
          onRetake={handleRetakeQuiz}
          onReview={() => setStage('scroll')}
        />
      )}
    </div>
  );
}

function ResultPanel({
  module,
  score,
  selectedAnswers,
  isPassed,
  onEnterGame,
  onRetake,
  onReview
}) {
  const correctCount = Object.values(selectedAnswers).filter(
    (ans, i) => ans === module.quiz[i].correctIndex
  ).length;

  return (
    <div
      style={{
        maxWidth: '600px',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '3rem',
        border: '2px solid rgba(0, 188, 212, 0.5)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        textAlign: 'center'
      }}
    >
      <div
        style={{
          width: '200px',
          height: '200px',
          margin: '0 auto 2rem',
          borderRadius: '50%',
          background: `conic-gradient(${
            isPassed ? '#4caf50' : '#f44336'
          } ${score}%, rgba(255,255,255,0.2) ${score}%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}
      >
        <div
          style={{
            width: '170px',
            height: '170px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}
        >
          <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>
            {Math.round(score)}%
          </div>
          <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Your Score</div>
        </div>
      </div>

      <h2
        style={{
          color: 'white',
          fontSize: '2rem',
          marginBottom: '1rem'
        }}
      >
        {isPassed ? '🎉 Quest Complete! 🎉' : '💪 Almost There! 💪'}
      </h2>

      <p
        style={{
          color: 'white',
          fontSize: '1.1rem',
          marginBottom: '2rem',
          opacity: 0.9
        }}
      >
        {isPassed
          ? 'You have proven your knowledge! The path to the game is now open, brave warrior.'
          : 'You need 75% or higher to unlock the game. Study the teachings and try again!'}
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          marginBottom: '2rem'
        }}
      >
        <div
          style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '1rem',
            borderRadius: '12px'
          }}
        >
          <div
            style={{
              color: '#00bcd4',
              fontSize: '2rem',
              fontWeight: 'bold'
            }}
          >
            {correctCount}
          </div>
          <div style={{ color: 'white', fontSize: '0.9rem' }}>Correct</div>
        </div>
        <div
          style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '1rem',
            borderRadius: '12px'
          }}
        >
          <div
            style={{
              color: '#e91e63',
              fontSize: '2rem',
              fontWeight: 'bold'
            }}
          >
            {module.quiz.length - correctCount}
          </div>
          <div style={{ color: 'white', fontSize: '0.9rem' }}>Incorrect</div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        {isPassed ? (
          <button
            onClick={onEnterGame}
            style={{
              padding: '1.2rem',
              background: 'linear-gradient(135deg, #4caf50, #8bc34a)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow =
                '0 12px 30px rgba(76,175,80,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Trophy size={24} />
            Enter the Game Arena!
          </button>
        ) : (
          <button
            onClick={onRetake}
            style={{
              padding: '1.2rem',
              background: 'linear-gradient(135deg, #00bcd4, #e91e63)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Try Again
          </button>
        )}

        <button
          onClick={onReview}
          style={{
            padding: '1rem',
            background: 'rgba(255,255,255,0.1)',
            border: '2px solid rgba(255,255,255,0.3)',
            borderRadius: '12px',
            color: 'white',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
          }}
        >
          <BookOpen size={20} />
          Review Scroll Again
        </button>
      </div>
    </div>
  );
}
