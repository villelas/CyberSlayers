import React, { useState } from 'react';
import { Shield, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();

  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [answers, setAnswers] = useState({
    q1: '',
    q2: '',
    q3: '',
    q4: ''
  });
  const [score, setScore] = useState(null);
  const [percentage, setPercentage] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [totalPercentAccum, setTotalPercentAccum] = useState(0);

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
      maxWidth: '900px',
      width: '100%',
      margin: '3rem auto 0',
      padding: '2.5rem 2rem',
      background: 'rgba(255, 255, 255, 0.06)',
      borderRadius: '20px',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(18px)',
      boxShadow: '0 18px 40px rgba(0, 0, 0, 0.5)'
    },
    header: {
      textAlign: 'center',
      marginBottom: '1.75rem'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '900',
      marginBottom: '0.5rem'
    },
    subtitle: {
      fontSize: '1rem',
      color: '#d0d0d0',
      maxWidth: '500px',
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
    sectionTitle: {
      fontSize: '1.4rem',
      fontWeight: '800',
      marginTop: '1.5rem',
      marginBottom: '0.5rem'
    },
    text: {
      fontSize: '1rem',
      color: '#f0f0f0',
      lineHeight: '1.7',
      marginBottom: '0.75rem'
    },
    startQuizBtn: {
      marginTop: '1.75rem',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.9rem 1.8rem',
      background: 'linear-gradient(45deg, #00bcd4, #2196f3)',
      border: 'none',
      borderRadius: '14px',
      color: 'white',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      boxShadow: '0 10px 30px rgba(0, 188, 212, 0.5)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
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
      maxWidth: '700px',
      background: 'rgba(15, 52, 96, 0.95)',
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

  const handleAnswerChange = (questionKey, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionKey]: value
    }));
  };

  const handleSubmitQuiz = (e) => {
    e.preventDefault();

    const correctAnswers = {
      q1: 'correct',
      q2: 'correct',
      q3: 'correct',
      q4: 'correct'
    };

    let s = 0;
    Object.keys(correctAnswers).forEach(q => {
      if (answers[q] === correctAnswers[q]) s += 1;
    });

    const totalQuestions = Object.keys(correctAnswers).length;
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
      {/* NAVBAR FROM HOMEPAGE */}
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

      {/* PAGE CONTENT */}
      <div style={styles.pageWrapper}>
        {/* Header */}
        <header style={styles.header}>
          <h1 style={styles.title}>
            <span style={styles.titleGradient}>
              Welcome to CyberSlayers Content Modules
            </span>
          </h1>
          <p style={styles.subtitle}>
            For every module: read the content, take the quiz, score at least{' '}
            <strong>75/100</strong>, then unlock the next game encounter.
          </p>
          <div style={styles.badgeRow}>
            <div style={styles.badge}>
              <Shield size={16} color="#00bcd4" />
              Module 1 – Digital Footprint
            </div>
            <div style={styles.badge}>
              <Sparkles size={16} color="#9c27b0" />
              Story-Based Cyber Lessons
            </div>
          </div>
        </header>

        {/* Module Content */}
        <section>
          <h2 style={styles.sectionTitle}>Module 1 – Digital Footprint</h2>
          <p style={styles.text}>
            In the hunt for Lagdrakul, Te-Qwuiz teaches that every “rune you etch” online
            becomes part of your digital footprint: (1) once posted, information is
            permanent, (2) enemies can track you using the details you reveal, (3) sharing
            personal data helps attackers build profiles, and (4) protecting your identity
            protects your future self. The realm learns that even heroes should think before
            they carve their mark into the network stone.
          </p>

          {/* Button to open quiz */}
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
            onClick={() => setIsQuizOpen(true)}
          >
            <Sparkles size={18} />
            Start Quiz for Module 1
          </button>
        </section>
      </div>

      {/* Quiz Popup Overlay */}
      {isQuizOpen && (
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
              <h2 style={styles.quizTitle}>Module 1 Quiz – Digital Footprint</h2>
            </div>

            <form onSubmit={handleSubmitQuiz}>
              {/* Question 1 */}
              <div style={styles.questionBlock}>
                <p style={styles.questionText}>
                  1. Is online information easily erased once posted?
                </p>
                <ul style={styles.optionsList}>
                  <li style={styles.optionItem}>
                    <label style={styles.optionLabel} htmlFor="q1a">
                      <input
                        id="q1a"
                        type="radio"
                        name="q1"
                        value="wrong"
                        style={styles.radio}
                        checked={answers.q1 === 'wrong'}
                        onChange={() => handleAnswerChange('q1', 'wrong')}
                      />
                      <span>
                        Yes — once deleted, it disappears from your permanent digital
                        footprint.
                      </span>
                    </label>
                  </li>
                  <li style={styles.optionItem}>
                    <label style={styles.optionLabel} htmlFor="q1b">
                      <input
                        id="q1b"
                        type="radio"
                        name="q1"
                        value="correct"
                        style={styles.radio}
                        checked={answers.q1 === 'correct'}
                        onChange={() => handleAnswerChange('q1', 'correct')}
                      />
                      <span>
                        No — once shared, it becomes part of your permanent digital
                        footprint.
                      </span>
                    </label>
                  </li>
                </ul>
              </div>

              {/* Question 2 */}
              <div style={styles.questionBlock}>
                <p style={styles.questionText}>
                  2. Why does oversharing online put you at risk?
                </p>
                <ul style={styles.optionsList}>
                  <li style={styles.optionItem}>
                    <label style={styles.optionLabel} htmlFor="q2a">
                      <input
                        id="q2a"
                        type="radio"
                        name="q2"
                        value="wrong"
                        style={styles.radio}
                        checked={answers.q2 === 'wrong'}
                        onChange={() => handleAnswerChange('q2', 'wrong')}
                      />
                      <span>
                        It does not — the internet is already a collection of information.
                      </span>
                    </label>
                  </li>
                  <li style={styles.optionItem}>
                    <label style={styles.optionLabel} htmlFor="q2b">
                      <input
                        id="q2b"
                        type="radio"
                        name="q2"
                        value="correct"
                        style={styles.radio}
                        checked={answers.q2 === 'correct'}
                        onChange={() => handleAnswerChange('q2', 'correct')}
                      />
                      <span>
                        Attackers can use your information to track or target you, or
                        pretend to be you and trick others.
                      </span>
                    </label>
                  </li>
                </ul>
              </div>

              {/* Question 3 */}
              <div style={styles.questionBlock}>
                <p style={styles.questionText}>
                  3. What kind of information should you protect to avoid profiling?
                </p>
                <ul style={styles.optionsList}>
                  <li style={styles.optionItem}>
                    <label style={styles.optionLabel} htmlFor="q3a">
                      <input
                        id="q3a"
                        type="radio"
                        name="q3"
                        value="wrong"
                        style={styles.radio}
                        checked={answers.q3 === 'wrong'}
                        onChange={() => handleAnswerChange('q3', 'wrong')}
                      />
                      <span>Video game scores.</span>
                    </label>
                  </li>
                  <li style={styles.optionItem}>
                    <label style={styles.optionLabel} htmlFor="q3b">
                      <input
                        id="q3b"
                        type="radio"
                        name="q3"
                        value="correct"
                        style={styles.radio}
                        checked={answers.q3 === 'correct'}
                        onChange={() => handleAnswerChange('q3', 'correct')}
                      />
                      <span>
                        Personal details such as location, habits, or identity clues. Don’t
                        post anything you wouldn’t want a parent, teacher, or future boss
                        to see.
                      </span>
                    </label>
                  </li>
                </ul>
              </div>

              {/* Question 4 */}
              <div style={styles.questionBlock}>
                <p style={styles.questionText}>
                  4. How does guarding your online presence protect your future?
                </p>
                <ul style={styles.optionsList}>
                  <li style={styles.optionItem}>
                    <label style={styles.optionLabel} htmlFor="q4a">
                      <input
                        id="q4a"
                        type="radio"
                        name="q4"
                        value="wrong"
                        style={styles.radio}
                        checked={answers.q4 === 'wrong'}
                        onChange={() => handleAnswerChange('q4', 'wrong')}
                      />
                      <span>
                        It makes it so that you can share information freely with
                        strangers.
                      </span>
                    </label>
                  </li>
                  <li style={styles.optionItem}>
                    <label style={styles.optionLabel} htmlFor="q4b">
                      <input
                        id="q4b"
                        type="radio"
                        name="q4"
                        value="correct"
                        style={styles.radio}
                        checked={answers.q4 === 'correct'}
                        onChange={() => handleAnswerChange('q4', 'correct')}
                      />
                      <span>
                        Because posts can be used later for reputation, privacy, or
                        security attacks.
                      </span>
                    </label>
                  </li>
                </ul>
              </div>

              {/* Actions + Results */}
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
                  {percentage !== null && (
                    <>
                      <div>
                        Score:{' '}
                        <span style={styles.highlight}>
                          {score}/4 ({percentage}%)
                        </span>{' '}
                        —{' '}
                        <span style={hasPassed ? styles.passText : styles.failText}>
                          {hasPassed ? 'Pass ✅' : 'Try Again ❌ (Need 75%+)'}
                        </span>
                      </div>
                      {averagePercent !== null && attempts > 1 && (
                        <div>
                          Avg over {attempts} attempts:{' '}
                          <span style={styles.highlight}>{averagePercent}%</span>
                        </div>
                      )}
                    </>
                  )}
                  {percentage === null && (
                    <div>Answer all questions, then hit Submit to see your score.</div>
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

export default AboutUs;
