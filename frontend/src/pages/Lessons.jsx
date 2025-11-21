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
          options: [
            {
              value: 'wrong',
              label:
                'Yes — once deleted, it disappears from your permanent digital footprint.'
            },
            {
              value: 'correct',
              label:
                'No — once shared, it becomes part of your permanent digital footprint.'
            }
          ]
        },
        {
          key: 'm1q2',
          prompt: 'Why does oversharing online put you at risk?',
          options: [
            {
              value: 'wrong',
              label:
                'It does not — the internet is already a collection of information.'
            },
            {
              value: 'correct',
              label:
                'Attackers can use your information to track or target you, or pretend to be you and trick others.'
            }
          ]
        },
        {
          key: 'm1q3',
          prompt:
            'What kind of information should you protect to avoid profiling?',
          options: [
            {
              value: 'wrong',
              label: 'Video game scores.'
            },
            {
              value: 'correct',
              label:
                'Personal details such as location, habits, or identity clues. Don’t post anything you wouldn’t want a parent or future boss to see.'
            }
          ]
        },
        {
          key: 'm1q4',
          prompt:
            'How does guarding your online presence protect your future?',
          options: [
            {
              value: 'wrong',
              label:
                'It lets you share more information with strangers more easily.'
            },
            {
              value: 'correct',
              label:
                'Because posts can be used later for reputation, privacy, or security attacks.'
            }
          ]
        },
        {
          key: 'm1q5',
          prompt:
            'Who might look up your online footprint in the future?',
          options: [
            {
              value: 'wrong',
              label:
                'Only your closest friends — no one else cares what you post.'
            },
            {
              value: 'correct',
              label:
                'Schools, employers, and others who want to understand who you are.'
            }
          ]
        },
        {
          key: 'm1q6',
          prompt:
            'How does your digital footprint affect your reputation?',
          options: [
            {
              value: 'correct',
              label:
                'Online posts can shape how people see you long before they meet you.'
            },
            {
              value: 'wrong',
              label:
                'It doesn’t — people ignore everything said online.'
            }
          ]
        },
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
          options: [
            {
              value: 'correct',
              label:
                'Yes — deepfakes can imitate trusted people with high accuracy.'
            },
            {
              value: 'wrong',
              label:
                'No — fake images and voices are always easy to spot at a glance.'
            }
          ]
        },
        {
          key: 'm2q2',
          prompt:
            'When you recognize a face or voice online, should you automatically trust it?',
          options: [
            {
              value: 'wrong',
              label:
                'Yes — if you recognize them, it’s always safe to trust the account.'
            },
            {
              value: 'correct',
              label:
                'No — familiarity doesn’t prove authenticity, especially for celebrities or politicians.'
            }
          ]
        },
        {
          key: 'm2q3',
          prompt: 'What is the best defense against deepfake manipulation?',
          options: [
            {
              value: 'correct',
              label:
                'Verify the source before believing or acting on the content.'
            },
            {
              value: 'wrong',
              label:
                'React quickly and share the content before anyone else does.'
            }
          ]
        },
        {
          key: 'm2q4',
          prompt: 'How can you expose a deepfake more easily?',
          options: [
            {
              value: 'correct',
              label: 'Compare information across multiple channels.'
            },
            {
              value: 'wrong',
              label:
                'Only look at likes and comments — if it’s popular, it must be real.'
            }
          ]
        },
        {
          key: 'm2q5',
          prompt: 'A deepfake face used by a bot is meant to:',
          options: [
            {
              value: 'correct',
              label: 'Imitate a real person.'
            },
            {
              value: 'wrong',
              label:
                'Improve video quality.'
            }
          ]
        },
        {
          key: 'm2q6',
          prompt: 'A deepfake that appears in a video call is an example of:',
          options: [
            {
              value: 'wrong',
              label: 'Signal interference.'
            },
            {
              value: 'correct',
              label:
                'Real-time impersonation'
            }
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
          options: [
            {
              value: 'correct',
              label: 'Urgency or pressure.'
            },
            {
              value: 'wrong',
              label:
                'Polite greetings and lots of emojis to seem friendly and harmless.'
            }
          ]
        },
        {
          key: 'm3q2',
          prompt:
            'Should you ever give passwords, private keys, or money over messages?',
          options: [
            {
              value: 'correct',
              label:
                'No — no legitimate organization or ally will request them this way.'
            },
            {
              value: 'wrong',
              label:
                'Yes — as long as the message looks official and has a logo.'
            }
          ]
        },
        {
          key: 'm3q3',
          prompt: 'Why are unknown links and attachments risky?',
          options: [
            {
              value: 'correct',
              label: 'They may hide malware or traps.'
            },
            {
              value: 'wrong',
              label:
                'They just make the message look more impressive and are always safe to click.'
            }
          ]
        },
        {
          key: 'm3q4',
          prompt: 'How do you verify a suspicious message?',
          options: [
            {
              value: 'correct',
              label:
                'Reach out to the sender through a known, trusted channel and double-check details.'
            },
            {
              value: 'wrong',
              label:
                'Reply directly to the message and follow any links it includes right away.'
            }
          ]
        },
        {
          key: 'm3q5',
          prompt: 'What is a common sign of a phishing scroll that pretends to be from a trusted ally?',
          options: [
            {
              value: 'correct',
              label: 'The sender’s name looks familiar, but the email address or link is slightly different.'
            },
            {
              value: 'wrong',
              label:
                'It includes perfectly spelled words and flawless grammar.'
            }
          ]
        },
        {
          key: 'm3q6',
          prompt: 'If a message promises treasure for clicking a link, what should you do?',
          options: [
            {
              value: 'wrong',
              label:
                'Click immediately — free treasure is always trustworthy!'
            },
            {
              value: 'correct',
              label:
                'Ignore the bait and check through official channels.'
            }
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
          options: [
            {
              value: 'correct',
              label:
                'They allow attackers to intercept data from anyone connected.'
            },
            {
              value: 'wrong',
              label:
                'They automatically make your internet faster and safer with no effort.'
            }
          ]
        },
        {
          key: 'm4q2',
          prompt:
            'Should you access banking or private accounts on public networks?',
          options: [
            {
              value: 'correct',
              label: 'No — it greatly increases your vulnerability.'
            },
            {
              value: 'wrong',
              label:
                'Yes — public Wi-Fi is built for handling all sensitive information.'
            }
          ]
        },
        {
          key: 'm4q3',
          prompt:
            'What are some common public networks that might be like this?',
          options: [
            {
              value: 'correct',
              label: 'Airports, coffee shops, and malls.'
            },
            {
              value: 'wrong',
              label:
                'Only your bedroom and home router — everywhere else is always safe.'
            }
          ]
        },
        {
          key: 'm4q4',
          prompt:
            'What personal protection helps block spying on public networks?',
          options: [
            {
              value: 'correct',
              label:
                'Firewalls, shield-like protections, or VPNs that encrypt your traffic.'
            },
            {
              value: 'wrong',
              label: 'Turning your screen brightness to maximum.'
            }
          ]
        },
        {
          key: 'm4q5',
          prompt:
            'Which activity is safer to do on a public network?',
          options: [
            {
              value: 'wrong',
              label: 'Entering passwords and credit cards on random websites.'
            },
            {
              value: 'correct',
              label:
                'Browsing general information that doesn’t require login.'
            }
          ]
        },
        {
          key: 'm4q6',
          prompt:
            'Why might attackers set up a fake public Wi-Fi hotspot?',
          options: [
            {
              value: 'correct',
              label:
                'To lure victims into connecting so they can steal information.'
            },
            {
              value: 'wrong',
              label: 'To make sure travelers have a pleasant browsing experience.'
            }
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
      blankAnswers[q.key] = '';
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
      if (answers[q.key] === 'correct') s += 1;
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
              4 Story-Driven Cyber Modules
            </div>
            <div style={styles.badge}>
              <Sparkles size={16} color="#9c27b0" />
              Quizzes & Progress Feedback
            </div>
          </div>
        </header>

        {/* MODULE CARDS */}
        <div style={styles.modulesGrid}>
          {modules.map((mod) => (
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
                            value={opt.value}
                            style={styles.radio}
                            checked={answers[q.key] === opt.value}
                            onChange={() =>
                              handleAnswerChange(q.key, opt.value)
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
