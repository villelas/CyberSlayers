import React, { useState } from 'react';
import { Shield, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ModulesPage = () => {
  const navigate = useNavigate();

  // --- MODULE DATA ---
  const modules = [
    {
      id: 1,
      title: 'Module 1 – Digital Footprint',
      shortTitle: 'Digital Footprint',
      content:
        'In the hunt for Lagdrakul, Te-Qwuiz teaches that every “rune you etch” online becomes part of your digital footprint: (1) once posted, information is permanent, (2) enemies can track you using the details you reveal, (3) sharing personal data helps attackers build profiles, and (4) protecting your identity protects your future self. The realm learns that even heroes should think before they carve their mark into the network stone.',
      quizQuestions: [
        {
          key: 'm1q1',
          prompt: 'Is online information easily erased once posted?',
          correctIndex: 1,
          options: [
            { label: 'Yes, you can always delete it completely' },
            {
              label:
                'No — once shared, it becomes part of your permanent digital footprint'
            },
            { label: 'Only if you delete it within 24 hours' },
            { label: 'Yes, but only with special software' }
          ]
        },
        {
          key: 'm1q2',
          prompt: 'Why does oversharing online put you at risk?',
          correctIndex: 2,
          options: [
            { label: 'It makes your device slower' },
            { label: 'It uses too much data' },
            {
              label:
                'Attackers can use your information to track or target you, or pretend to be you and trick others'
            },
            { label: "It's against the law" }
          ]
        },
        {
          key: 'm1q3',
          prompt:
            'What kind of information should you protect to avoid profiling?',
          correctIndex: 1,
          options: [
            { label: 'Only your credit card numbers' },
            {
              label:
                'Personal details such as location, habits, or identity clues'
            },
            { label: 'Only your password' },
            { label: 'Your favorite color' }
          ]
        },
        {
          key: 'm1q4',
          prompt:
            'How does guarding your online presence protect your future?',
          correctIndex: 1,
          options: [
            { label: 'It makes you more popular' },
            {
              label:
                'Because posts can be used later for reputation, privacy, or security attacks'
            },
            { label: 'It helps you get more followers' },
            { label: "It doesn't really matter" }
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'Module 2 – Deepfakes (False Faces)',
      shortTitle: 'Deepfakes (False Faces)',
      content:
        'As the investigation deepens, Te-Qwuiz discovers “shadow helms” — forged faces mimicking trusted figures: (1) deepfakes can look and sound convincingly real, (2) familiarity doesn’t guarantee authenticity, (3) verifying sources before believing is essential, and (4) cross-checking information across multiple channels exposes impersonation. In a world of illusions, the sharpest weapon is skepticism.',
      quizQuestions: [
        {
          key: 'm2q1',
          prompt: 'Can a forged image or voice appear convincingly real?',
          correctIndex: 1,
          options: [
            { label: 'No, you can always tell' },
            {
              label:
                'Yes — deepfakes can imitate trusted people with high accuracy'
            },
            { label: 'Only in movies' },
            { label: 'Only for celebrities' }
          ]
        },
        {
          key: 'm2q2',
          prompt:
            'When you recognize a face or voice online, should you automatically trust it?',
          correctIndex: 1,
          options: [
            { label: 'Yes, if it looks real it must be real' },
            {
              label:
                "No — familiarity doesn't prove authenticity, especially celebrities and politicians"
            },
            { label: 'Only trust videos, not images' },
            { label: 'Always trust voices but not faces' }
          ]
        },
        {
          key: 'm2q3',
          prompt: 'What is the best defense against deepfake manipulation?',
          correctIndex: 2,
          options: [
            { label: 'Never watch any videos' },
            { label: 'Only use social media' },
            { label: 'Verify the source before believing or acting' },
            { label: 'Share everything you see' }
          ]
        },
        {
          key: 'm2q4',
          prompt: 'How can you expose a deepfake more easily?',
          correctIndex: 1,
          options: [
            { label: 'Use special software only' },
            { label: 'Compare information across multiple channels' },
            { label: 'Ask your friends' },
            { label: 'Report it immediately without checking' }
          ]
        }
      ]
    },
    {
      id: 3,
      title: 'Module 3 – Phishing Scams (The Phishers’ Net)',
      shortTitle: 'Phishing Scams (The Phishers’ Net)',
      content:
        'Lagdrakul’s agents unleash waves of enchanted scrolls that tempt the unwary: (1) phishing messages push urgency to override reason, (2) no legitimate ally asks for passwords or private keys, (3) suspicious links and attachments are a major danger, and (4) when in doubt, contact the supposed sender directly through a trusted channel. Knights learn that quick clicks can lead to quick downfall.',
      quizQuestions: [
        {
          key: 'm3q1',
          prompt:
            'What tactic do phishing messages use to make you act without thinking?',
          correctIndex: 0,
          options: [
            { label: 'Urgency or pressure' },
            { label: 'Polite requests' },
            { label: 'Long explanations' },
            { label: 'Funny jokes' }
          ]
        },
        {
          key: 'm3q2',
          prompt:
            'Should you ever give passwords, private keys, or money over messages?',
          correctIndex: 2,
          options: [
            { label: 'Yes, if they ask nicely' },
            { label: 'Only to family members' },
            {
              label:
                'No — no legitimate organization or ally will request them'
            },
            { label: "Yes, if it's urgent" }
          ]
        },
        {
          key: 'm3q3',
          prompt: 'Why are unknown links and attachments risky?',
          correctIndex: 1,
          options: [
            { label: 'They take too long to load' },
            { label: 'They may hide malware or traps' },
            { label: 'They use too much bandwidth' },
            { label: "They're not risky at all" }
          ]
        },
        {
          key: 'm3q4',
          prompt: 'How do you verify a suspicious message?',
          correctIndex: 2,
          options: [
            { label: 'Click the link to check' },
            { label: 'Reply to the message' },
            {
              label:
                'Reach out to the sender through a known, trusted channel. Double check spelling of everything'
            },
            { label: 'Ignore it completely' }
          ]
        }
      ]
    },
    {
      id: 4,
      title: 'Module 4 – Public Networks Safety (The Polluted Well)',
      shortTitle: 'Public Networks Safety (The Polluted Well)',
      content:
        'When Lagdrakul poisons public digital wells, Te-Qwuiz warns that (1) shared networks expose all users to eavesdropping, (2) logging into sensitive accounts on public access points is dangerous, (3) secure connections and encryption protect travelers, and (4) using personal defenses like firewalls and shields prevents outsiders from spying. A hero should never drink unguarded from a shared source.',
      quizQuestions: [
        {
          key: 'm4q1',
          prompt: 'What risk do public networks pose?',
          correctIndex: 1,
          options: [
            { label: "They're slower than home networks" },
            {
              label:
                'They allow attackers to intercept data from anyone connected'
            },
            { label: 'They cost money to use' },
            { label: "They don't pose any risks" }
          ]
        },
        {
          key: 'm4q2',
          prompt:
            'Should you access banking or private accounts on public networks?',
          correctIndex: 2,
          options: [
            { label: "Yes, it's always safe" },
            { label: "Only if you're in a hurry" },
            { label: 'No, it greatly increases vulnerability' },
            { label: 'Yes, but only on your phone' }
          ]
        },
        {
          key: 'm4q3',
          prompt:
            'What are some common public networks that might be like this?',
          correctIndex: 1,
          options: [
            { label: 'Home WiFi' },
            { label: 'Airports, coffee shops, and malls' },
            { label: "Your phone's hotspot" },
            { label: 'Your work network' }
          ]
        },
        {
          key: 'm4q4',
          prompt:
            'What personal protection helps block spying on public networks?',
          correctIndex: 2,
          options: [
            { label: 'Using incognito mode' },
            { label: 'Turning off your screen' },
            { label: 'Firewall or network shield equivalents or VPNs' },
            { label: 'Using a strong password' }
          ]
        }
      ]
    },
    {
      id: 5,
      title: 'Module 5 – Password Security (The Finale Forge)',
      shortTitle: 'Password Security (Finale Forge)',
      content:
        'The password is the most important piece Lagdrakul is after. To stop him, Te-Qwuiz must rescue a corrupted Ailithm and forge unbreakable passphrases: (1) strong passwords are long and complex, (2) unique passwords stop one breach from becoming many, (3) password managers help heroes remember dozens of keys, and (4) defending the “Finale Forge” means protecting the last gate to the kingdom itself.',
      quizQuestions: [
        {
          key: 'm5q1',
          prompt: 'What makes a password strong?',
          correctIndex: 2,
          options: [
            { label: 'Using your name and birthday' },
            { label: 'Short and easy to remember' },
            { label: 'Long with a mix of symbols, numbers, and letters' },
            { label: 'A single common word' }
          ]
        },
        {
          key: 'm5q2',
          prompt: 'Which of the following is the safest password?',
          correctIndex: 3,
          options: [
            { label: 'password123' },
            { label: 'Summer2024!' },
            { label: 'qwerty' },
            { label: 'G!7rP#9wL2@' }
          ]
        },
        {
          key: 'm5q3',
          prompt:
            'Why should you avoid using the same password everywhere?',
          correctIndex: 1,
          options: [
            { label: 'It’s annoying to type different passwords' },
            {
              label:
                'Hackers could access multiple accounts if one password is leaked'
            },
            { label: "Websites don’t allow reused passwords" },
            { label: 'It makes you forget your email' }
          ]
        },
        {
          key: 'm5q4',
          prompt: 'What is a password manager?',
          correctIndex: 0,
          options: [
            {
              label: 'A program that stores and helps create strong passwords'
            },
            {
              label: 'A tool that automatically sends your passwords to friends'
            },
            { label: 'A physical book where you write passwords' },
            { label: 'A type of computer virus' }
          ]
        }
      ]
    }
  ];

  // --- STATE ---
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [activeModuleId, setActiveModuleId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [percentage, setPercentage] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [totalPercentAccum, setTotalPercentAccum] = useState(0);

  const activeModule = modules.find((m) => m.id === activeModuleId);

  // Split modules so 1–4 stay in the grid, 5 is full-width at bottom
  const mainModules = modules.filter((m) => m.id !== 5);
  const finaleModule = modules.find((m) => m.id === 5);

  // --- STYLES ---
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
      fontWeight: 'bold',
      cursor: 'pointer'
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
      textTransform: 'uppercase'
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
      maxWidth: '1100px',
      margin: '3rem auto 0',
      padding: '0 2rem'
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '900',
      marginBottom: '0.5rem'
    },
    subtitle: {
      fontSize: '1rem',
      color: '#d0d0d0',
      maxWidth: '550px',
      margin: '0 auto'
    },
    badgeRow: {
      display: 'flex',
      justifyContent: 'center',
      gap: '0.75rem',
      marginTop: '1rem',
      flexWrap: 'wrap'
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.4rem',
      padding: '0.35rem 0.9rem',
      borderRadius: '999px',
      background: 'rgba(0, 188, 212, 0.15)',
      border: '1px solid rgba(0, 188, 212, 0.5)',
      fontSize: '0.85rem',
      fontWeight: 'bold',
      color: '#00bcd4'
    },
    modulesGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1.5rem',
      marginTop: '2rem'
    },
    moduleCard: {
      background: 'rgba(255, 255, 255, 0.06)',
      borderRadius: '20px',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(18px)',
      boxShadow: '0 18px 40px rgba(0, 0, 0, 0.5)',
      padding: '1.5rem 1.75rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    moduleTitle: {
      fontSize: '1.25rem',
      fontWeight: '800',
      marginBottom: '0.75rem'
    },
    moduleText: {
      fontSize: '0.98rem',
      color: '#f0f0f0',
      lineHeight: '1.7',
      marginBottom: '1rem'
    },
    startQuizBtn: {
      marginTop: '0.75rem',
      alignSelf: 'flex-start',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.8rem 1.6rem',
      background: 'linear-gradient(45deg, #00bcd4, #2196f3)',
      border: 'none',
      borderRadius: '14px',
      color: 'white',
      fontSize: '0.95rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      boxShadow: '0 10px 30px rgba(0, 188, 212, 0.5)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    },
    finaleWrapper: {
      marginTop: '2.5rem'
    },
    finaleLabel: {
      fontSize: '1rem',
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      opacity: 0.8,
      marginBottom: '0.5rem'
    },
    finaleCard: {
      background: 'rgba(255, 255, 255, 0.09)',
      borderRadius: '22px',
      border: '1px solid rgba(0, 255, 200, 0.4)',
      boxShadow: '0 22px 50px rgba(0, 0, 0, 0.7)',
      padding: '1.75rem 2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    finaleHeaderRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem',
      flexWrap: 'wrap'
    },
    finaleTitle: {
      fontSize: '1.6rem',
      fontWeight: '900'
    },
    finaleSubtitle: {
      fontSize: '0.95rem',
      color: '#d0d0d0',
      maxWidth: '500px'
    },
    quizOverlay: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    },
    quizCard: {
      width: '95%',
      maxWidth: '750px',
      maxHeight: '90vh',
      overflowY: 'auto',
      background: 'rgba(15, 52, 96, 0.96)',
      borderRadius: '22px',
      border: '1px solid rgba(0, 188, 212, 0.5)',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)',
      padding: '2rem 2.25rem',
      position: 'relative'
    },
    quizHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginBottom: '1rem'
    },
    quizTitle: {
      fontSize: '1.5rem',
      fontWeight: '800'
    },
    closeBtn: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      background: 'transparent',
      border: 'none',
      color: '#bbbbbb',
      fontSize: '1.4rem',
      cursor: 'pointer'
    },
    questionBlock: {
      marginTop: '1rem',
      marginBottom: '1rem'
    },
    questionText: {
      fontSize: '1rem',
      fontWeight: '600',
      marginBottom: '0.5rem'
    },
    optionsList: {
      listStyle: 'none',
      paddingLeft: 0,
      margin: 0
    },
    optionItem: {
      marginBottom: '0.4rem'
    },
    optionLabel: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.4rem',
      padding: '0.55rem 0.7rem',
      borderRadius: '10px',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      cursor: 'pointer'
    },
    radio: {
      marginTop: '0.2rem'
    },
    quizActions: {
      marginTop: '1.25rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '1rem',
      flexWrap: 'wrap'
    },
    submitBtn: {
      padding: '0.8rem 1.6rem',
      background: 'linear-gradient(45deg, #00bcd4, #9c27b0)',
      border: 'none',
      borderRadius: '14px',
      color: 'white',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontSize: '1rem',
      boxShadow: '0 10px 30px rgba(156, 39, 176, 0.5)',
      transition: 'transform 0.3s ease'
    },
    resultText: {
      fontSize: '0.95rem',
      color: '#e0e0e0',
      lineHeight: '1.6'
    },
    highlight: {
      color: '#00e5ff',
      fontWeight: 'bold'
    },
    passText: {
      color: '#4caf50',
      fontWeight: 'bold'
    },
    failText: {
      color: '#ff5252',
      fontWeight: 'bold'
    }
  };

  // --- HANDLERS ---
  const openQuiz = (moduleId) => {
    const module = modules.find((m) => m.id === moduleId);
    if (!module) return;

    const blankAnswers = {};
    module.quizQuestions.forEach((q) => {
      blankAnswers[q.key] = null;
    });

    setActiveModuleId(moduleId);
    setAnswers(blankAnswers);
    setScore(null);
    setPercentage(null);
    setIsQuizOpen(true);
  };

  const handleAnswerChange = (questionKey, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionKey]: value
    }));
  };

  const handleSubmitQuiz = (e) => {
    e.preventDefault();
    if (!activeModule) return;

    const questions = activeModule.quizQuestions;
    let s = 0;
    questions.forEach((q) => {
      if (answers[q.key] === q.correctIndex) {
        s += 1;
      }
    });

    const totalQuestions = questions.length;
    const perc = Math.round((s / totalQuestions) * 100);

    setScore(s);
    setPercentage(perc);

    const newAttempts = attempts + 1;
    const newTotalPercentAccum = totalPercentAccum + perc;
    setAttempts(newAttempts);
    setTotalPercentAccum(newTotalPercentAccum);
  };

  const averagePercent =
    attempts > 0 ? Math.round(totalPercentAccum / attempts) : null;

  const hasPassed = percentage !== null && percentage >= 75;

  return (
    <div style={styles.container}>
      {/* NAVBAR */}
      <nav style={styles.nav}>
        <div
          style={styles.logo}
          onClick={() => navigate('/')}
        >
          <Shield size={24} color="#00bcd4" />
          <span style={styles.titleGradient}>CyberSlayers</span>
        </div>
        <ul className="nav-links">
          <li><a href="/" className="nav-link">Home</a></li>
          <li><a href="/aboutus" className="nav-link">About Us</a></li>
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

      {/* PAGE CONTENT */}
      <div style={styles.pageWrapper}>
        <header style={styles.header}>
          <h1 style={styles.title}>
            <span style={styles.titleGradient}>
              CyberSlayers Content Modules
            </span>
          </h1>
          <p style={styles.subtitle}>
            For each module: read the story, take the quiz, score at least{' '}
            <strong>75%</strong>, and then continue your quest against Lagdrakul&apos;s
            forces.
          </p>
          <div style={styles.badgeRow}>
            <div style={styles.badge}>
              <Shield size={16} color="#00bcd4" />
              5 Story-Driven Cyber Modules
            </div>
            <div style={styles.badge}>
              <Sparkles size={16} color="#9c27b0" />
              Quizzes &amp; Progress Feedback
            </div>
          </div>
        </header>

        {/* MODULE CARDS (1–4 in grid) */}
        <div style={styles.modulesGrid}>
          {mainModules.map((mod) => (
            <section key={mod.id} style={styles.moduleCard}>
              <div>
                <h2 style={styles.moduleTitle}>{mod.title}</h2>
                <p style={styles.moduleText}>{mod.content}</p>
              </div>
              <button
                style={styles.startQuizBtn}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow =
                    '0 14px 36px rgba(0, 188, 212, 0.7)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow =
                    '0 10px 30px rgba(0, 188, 212, 0.5)';
                }}
                onClick={() => openQuiz(mod.id)}
              >
                <Sparkles size={18} />
                Start Quiz for {mod.shortTitle}
              </button>
            </section>
          ))}
        </div>

        {/* FULL-WIDTH FINALE MODULE (5) */}
        {finaleModule && (
          <div style={styles.finaleWrapper}>
            <div style={styles.finaleLabel}>Finale Module</div>
            <section style={styles.finaleCard}>
              <div style={styles.finaleHeaderRow}>
                <div>
                  <h2 style={styles.finaleTitle}>{finaleModule.title}</h2>
                  <p style={styles.finaleSubtitle}>
                    The Final Forge of the kingdom: protect your passwords, rescue Ailithm from corruption,
                    and deny Lagdrakul the keys to every gate.
                  </p>
                </div>
                <button
                  style={styles.startQuizBtn}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow =
                      '0 14px 36px rgba(0, 188, 212, 0.7)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow =
                      '0 10px 30px rgba(0, 188, 212, 0.5)';
                  }}
                  onClick={() => openQuiz(finaleModule.id)}
                >
                  <Sparkles size={18} />
                  Start Quiz for {finaleModule.shortTitle}
                </button>
              </div>
              <p style={styles.moduleText}>{finaleModule.content}</p>
            </section>
          </div>
        )}
      </div>

      {/* QUIZ POPUP */}
      {isQuizOpen && activeModule && (
        <div style={styles.quizOverlay}>
          <div style={styles.quizCard}>
            <button
              style={styles.closeBtn}
              onClick={() => setIsQuizOpen(false)}
              aria-label="Close quiz"
            >
              ×
            </button>

            <div style={styles.quizHeader}>
              <Shield size={24} color="#00bcd4" />
              <h2 style={styles.quizTitle}>
                {activeModule.title} — Quiz
              </h2>
            </div>

            <form onSubmit={handleSubmitQuiz}>
              {activeModule.quizQuestions.map((q) => (
                <div key={q.key} style={styles.questionBlock}>
                  <p style={styles.questionText}>{q.prompt}</p>
                  <ul style={styles.optionsList}>
                    {q.options.map((opt, idx) => (
                      <li key={idx} style={styles.optionItem}>
                        <label style={styles.optionLabel} htmlFor={`${q.key}-${idx}`}>
                          <input
                            id={`${q.key}-${idx}`}
                            type="radio"
                            name={q.key}
                            value={idx}
                            style={styles.radio}
                            checked={answers[q.key] === idx}
                            onChange={() =>
                              handleAnswerChange(q.key, idx)
                            }
                          />
                          <span>{opt.label}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div style={styles.quizActions}>
                <button
                  type="submit"
                  style={styles.submitBtn}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = 'scale(1.05)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = 'scale(1)')
                  }
                >
                  Submit Quiz
                </button>

                <div style={styles.resultText}>
                  {percentage !== null ? (
                    <>
                      <div>
                        Score for{' '}
                        <span style={styles.highlight}>
                          {activeModule.shortTitle}
                        </span>
                        :{' '}
                        <span style={styles.highlight}>
                          {score}/{activeModule.quizQuestions.length} ({percentage}%)
                        </span>{' '}
                        —{' '}
                        <span style={hasPassed ? styles.passText : styles.failText}>
                          {hasPassed ? 'Pass ✅' : 'Try Again ❌ (Need 75%+)'}
                        </span>
                      </div>
                      {averagePercent !== null && attempts > 1 && (
                        <div>
                          Overall average across {attempts} attempts:{' '}
                          <span style={styles.highlight}>{averagePercent}%</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <div>
                      Answer all questions, then press <strong>Submit Quiz</strong> to
                      see your score.
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModulesPage;
