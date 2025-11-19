import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft, Lock, Key, Eye, AlertTriangle, CheckCircle, XCircle, Trophy, Zap, BookOpen, Target } from 'lucide-react';
import '../App.css';

export default function PasswordSecurityGame() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Quiz questions
  const quizQuestions = [
    {
      question: "Which password is the STRONGEST? 💪",
      options: [
        "password123",
        "M!x3dUp#2024",
        "soccer",
        "12345678"
      ],
      correct: 1,
      explanation: "Great choice! Strong passwords mix uppercase letters, lowercase letters, numbers, AND symbols. This makes them super hard to crack!"
    },
    {
      question: "Should you use the SAME password for everything?",
      options: [
        "Yes, so I don't forget!",
        "No way! Different passwords for different accounts",
        "Only for important stuff",
        "It doesn't matter"
      ],
      correct: 1,
      explanation: "Correct! If a hacker gets ONE password and you use it everywhere, they can get into ALL your accounts. Use different passwords to stay safe! 🔒"
    },
    {
      question: "What is two-factor authentication (2FA)? 🔐",
      options: [
        "Using two different passwords",
        "A second security check, like a code sent to your phone",
        "Logging in from two devices",
        "Having two email accounts"
      ],
      correct: 1,
      explanation: "You got it! 2FA is like having TWO locks on your door instead of one. Even if someone steals your password, they still can't get in without the second code!"
    },
    {
      question: "Someone emails you saying 'Your account is locked! Click here and enter your password.' What do you do?",
      options: [
        "Click the link and enter my password quickly",
        "Reply with my password",
        "DELETE IT! Real companies never ask for passwords by email",
        "Forward it to my friends"
      ],
      correct: 2,
      explanation: "Smart thinking! This is called PHISHING - a trick to steal your password. Real companies like Roblox, Instagram, or Gmail will NEVER ask for your password in an email!"
    },
    {
      question: "What's the BEST way to remember all your passwords?",
      options: [
        "Write them on a sticky note on your computer",
        "Tell your best friend to remember them",
        "Use a password manager app",
        "Use the same simple password for everything"
      ],
      correct: 2,
      explanation: "Perfect! Password managers are like super-secure vaults that remember ALL your passwords. You only need to remember ONE master password! 🗝️"
    },
    {
      question: "Your friend asks to borrow your gaming account for 'just 5 minutes.' What should you do?",
      options: [
        "Give them my password - they're my friend!",
        "Never share my password with ANYONE, even friends",
        "Share it but make them promise not to tell",
        "Post it on social media so everyone can use it"
      ],
      correct: 1,
      explanation: "Exactly right! Even your best friend shouldn't know your passwords. What if they accidentally tell someone else? Keep your passwords SECRET! 🤫"
    }
  ];

  const handleAnswerClick = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);

    if (answerIndex === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizCompleted(false);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      padding: '2rem',
      paddingTop: '1rem'
    },
    backButton: {
      marginBottom: '2rem'
    },
    header: {
      textAlign: 'center',
      marginBottom: '3rem'
    },
    title: {
      fontSize: 'clamp(2rem, 5vw, 3rem)',
      fontWeight: 'bold',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      flexWrap: 'wrap'
    },
    subtitle: {
      fontSize: 'clamp(1rem, 2vw, 1.2rem)',
      color: '#cccccc',
      maxWidth: '800px',
      margin: '0 auto'
    },
    contentGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    infoSection: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      border: '1px solid rgba(0, 188, 212, 0.3)',
      padding: 'clamp(1.5rem, 3vw, 2.5rem)',
      marginBottom: '2rem'
    },
    sectionTitle: {
      fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
      fontWeight: 'bold',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    infoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
      marginTop: '1.5rem'
    },
    infoCard: {
      background: 'rgba(0, 0, 0, 0.2)',
      padding: '1.5rem',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'transform 0.3s ease'
    },
    infoCardIcon: {
      marginBottom: '1rem'
    },
    infoCardTitle: {
      fontSize: '1.1rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
      color: '#00bcd4'
    },
    infoCardText: {
      fontSize: '0.95rem',
      color: '#cccccc',
      lineHeight: '1.5'
    },
    quizSection: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      border: '1px solid rgba(156, 39, 176, 0.3)',
      padding: 'clamp(1.5rem, 3vw, 2.5rem)',
      marginBottom: '2rem'
    },
    quizHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      flexWrap: 'wrap',
      gap: '1rem'
    },
    questionNumber: {
      fontSize: '1rem',
      color: '#9c27b0',
      fontWeight: 'bold'
    },
    scoreDisplay: {
      fontSize: '1rem',
      fontWeight: 'bold',
      padding: '0.5rem 1rem',
      background: 'rgba(0, 188, 212, 0.2)',
      borderRadius: '20px',
      border: '1px solid rgba(0, 188, 212, 0.5)'
    },
    question: {
      fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
      fontWeight: 'bold',
      marginBottom: '2rem',
      lineHeight: '1.4'
    },
    optionsGrid: {
      display: 'grid',
      gap: '1rem',
      marginBottom: '2rem'
    },
    option: {
      padding: '1.5rem',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '1rem',
      textAlign: 'left'
    },
    optionHover: {
      background: 'rgba(0, 188, 212, 0.1)',
      borderColor: '#00bcd4',
      transform: 'translateX(5px)'
    },
    optionCorrect: {
      background: 'rgba(76, 175, 80, 0.2)',
      borderColor: '#4caf50'
    },
    optionWrong: {
      background: 'rgba(244, 67, 54, 0.2)',
      borderColor: '#f44336'
    },
    explanation: {
      padding: '1.5rem',
      background: 'rgba(0, 188, 212, 0.1)',
      borderRadius: '12px',
      border: '1px solid rgba(0, 188, 212, 0.3)',
      marginBottom: '1.5rem',
      display: 'flex',
      gap: '1rem',
      alignItems: 'start'
    },
    nextButton: {
      padding: '1rem 2rem',
      background: 'linear-gradient(45deg, #00bcd4, #2196f3)',
      border: 'none',
      borderRadius: '8px',
      color: 'white',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'transform 0.3s ease',
      width: '100%'
    },
    completionCard: {
      textAlign: 'center',
      padding: '3rem 2rem'
    },
    completionEmoji: {
      fontSize: '5rem',
      marginBottom: '1rem'
    },
    completionTitle: {
      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
      fontWeight: 'bold',
      marginBottom: '1rem'
    },
    completionScore: {
      fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
      color: '#00bcd4',
      marginBottom: '2rem'
    },
    gameSection: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      border: '1px solid rgba(233, 30, 99, 0.3)',
      padding: 'clamp(1.5rem, 3vw, 2.5rem)',
      textAlign: 'center',
      marginBottom: '2rem'
    },
    gameComingSoon: {
      fontSize: '4rem',
      marginBottom: '1rem'
    },
    gameTitle: {
      fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
      fontWeight: 'bold',
      marginBottom: '1rem'
    },
    gameDescription: {
      fontSize: '1rem',
      color: '#cccccc',
      marginBottom: '2rem',
      maxWidth: '600px',
      margin: '0 auto 2rem'
    }
  };

  return (
    <div className="cyber-container bg-gradient-primary" style={styles.container}>
      {/* Back Button */}
      <button 
        className="back-button"
        onClick={() => navigate('/dashboard')}
        style={styles.backButton}
      >
        <ArrowLeft size={20} />
        Back to Dashboard
      </button>

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>
          <Shield size={48} color="#00bcd4" />
          <span className="text-gradient-primary">Password Security Core</span>
        </h1>
        <p style={styles.subtitle}>
          Learn to build super-strong passwords and become a master at protecting your online world! 🚀
        </p>
      </div>

      <div style={styles.contentGrid}>
        {/* Educational Section */}
        <div style={styles.infoSection}>
          <h2 style={styles.sectionTitle}>
            <BookOpen size={28} color="#00bcd4" />
            Why Passwords Are Like Super Shields! 🛡️
          </h2>
          <p style={styles.infoCardText}>
            Imagine your passwords as magical shields protecting your favorite games, photos with friends, 
            and secret messages! Bad guys (hackers) try to break through these shields every day. 
            The stronger your shield, the safer you are online! Let's learn how to build fortress-level protection! 💪
          </p>

          <div style={styles.infoGrid}>
            <div 
              style={styles.infoCard}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={styles.infoCardIcon}>
                <Lock size={40} color="#00bcd4" />
              </div>
              <h3 style={styles.infoCardTitle}>Lock Down Your Stuff! 🔐</h3>
              <p style={styles.infoCardText}>
                Your gaming accounts, Instagram, TikTok, Snapchat - they all need strong passwords! 
                Think of them as secret codes only YOU should know. Keep the bad guys out!
              </p>
            </div>

            <div 
              style={styles.infoCard}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={styles.infoCardIcon}>
                <Key size={40} color="#9c27b0" />
              </div>
              <h3 style={styles.infoCardTitle}>Your Digital Footprint 👣</h3>
              <p style={styles.infoCardText}>
                Every time you go online, you leave footprints behind - like tracks in the snow! 
                Good passwords help control who can see and follow your tracks online.
              </p>
            </div>

            <div 
              style={styles.infoCard}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={styles.infoCardIcon}>
                <AlertTriangle size={40} color="#e91e63" />
              </div>
              <h3 style={styles.infoCardTitle}>Watch Out for Tricks! 🎣</h3>
              <p style={styles.infoCardText}>
                Scammers try to trick you with fake emails and websites that LOOK real but aren't! 
                They're like digital pickpockets trying to steal your password. Stay alert!
              </p>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <div style={styles.quizSection}>
          <h2 style={styles.sectionTitle}>
            <Target size={28} color="#9c27b0" />
            Test Your Password Powers! ⚡
          </h2>

          {!quizCompleted ? (
            <>
              <div style={styles.quizHeader}>
                <span style={styles.questionNumber}>
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </span>
                <span style={styles.scoreDisplay}>
                  <Trophy size={16} style={{display: 'inline', marginRight: '0.5rem'}} />
                  Score: {score}/{quizQuestions.length}
                </span>
              </div>

              <div style={styles.question}>
                {quizQuestions[currentQuestion].question}
              </div>

              <div style={styles.optionsGrid}>
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <div
                    key={index}
                    style={{
                      ...styles.option,
                      ...(selectedAnswer === index && index === quizQuestions[currentQuestion].correct ? styles.optionCorrect : {}),
                      ...(selectedAnswer === index && index !== quizQuestions[currentQuestion].correct ? styles.optionWrong : {}),
                      ...(showResult && index === quizQuestions[currentQuestion].correct ? styles.optionCorrect : {}),
                      cursor: showResult ? 'default' : 'pointer'
                    }}
                    onClick={() => !showResult && handleAnswerClick(index)}
                    onMouseEnter={(e) => {
                      if (!showResult) {
                        e.currentTarget.style.background = 'rgba(0, 188, 212, 0.1)';
                        e.currentTarget.style.borderColor = '#00bcd4';
                        e.currentTarget.style.transform = 'translateX(5px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!showResult) {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }
                    }}
                  >
                    {option}
                    {showResult && index === quizQuestions[currentQuestion].correct && (
                      <CheckCircle size={20} color="#4caf50" style={{float: 'right'}} />
                    )}
                    {showResult && selectedAnswer === index && index !== quizQuestions[currentQuestion].correct && (
                      <XCircle size={20} color="#f44336" style={{float: 'right'}} />
                    )}
                  </div>
                ))}
              </div>

              {showResult && (
                <>
                  <div style={styles.explanation}>
                    {selectedAnswer === quizQuestions[currentQuestion].correct ? (
                      <CheckCircle size={24} color="#4caf50" style={{flexShrink: 0}} />
                    ) : (
                      <XCircle size={24} color="#f44336" style={{flexShrink: 0}} />
                    )}
                    <div>
                      <strong style={{display: 'block', marginBottom: '0.5rem', color: selectedAnswer === quizQuestions[currentQuestion].correct ? '#4caf50' : '#f44336'}}>
                        {selectedAnswer === quizQuestions[currentQuestion].correct ? 'Correct!' : 'Not quite!'}
                      </strong>
                      <span style={{color: '#cccccc'}}>
                        {quizQuestions[currentQuestion].explanation}
                      </span>
                    </div>
                  </div>

                  <button
                    style={styles.nextButton}
                    onClick={handleNextQuestion}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    {currentQuestion + 1 < quizQuestions.length ? 'Next Question' : 'See Results'} →
                  </button>
                </>
              )}
            </>
          ) : (
            <div style={styles.completionCard}>
              <div style={styles.completionEmoji}>
                {score === quizQuestions.length ? '🏆' : score >= quizQuestions.length * 0.7 ? '🌟' : '💪'}
              </div>
              <h3 style={styles.completionTitle}>
                {score === quizQuestions.length ? 'WOW! Perfect Score!' : score >= quizQuestions.length * 0.7 ? 'Awesome Job, Cyber Warrior!' : 'You\'re Getting There!'}
              </h3>
              <p style={styles.completionScore}>
                You scored {score} out of {quizQuestions.length}! 🎯
              </p>
              <p style={{...styles.infoCardText, marginBottom: '2rem'}}>
                {score === quizQuestions.length 
                  ? "🎉 You're a PASSWORD MASTER! You know exactly how to protect your accounts and stay safe online. Keep being awesome!" 
                  : score >= quizQuestions.length * 0.7
                  ? "⭐ You've got some serious password skills! Review the ones you missed and you'll be a pro in no time!"
                  : "🚀 Great start! Every cyber warrior learns from mistakes. Try again and watch yourself improve!"}
              </p>
              <button
                style={styles.nextButton}
                onClick={resetQuiz}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                <Zap size={20} style={{display: 'inline', marginRight: '0.5rem'}} />
                Take the Challenge Again! 🔄
              </button>
            </div>
          )}
        </div>

        {/* Interactive Game Section - Coming Soon */}
        <div style={styles.gameSection}>
          <div style={styles.gameComingSoon}>🎮</div>
          <h2 style={styles.gameTitle}>
            Password Fortress Battle Game! ⚔️
          </h2>
          <p style={styles.gameDescription}>
            Get ready for an EPIC adventure where you'll become a Password Warrior! Crack weak passwords, 
            build unbreakable fortress passwords, and battle hackers trying to break into your accounts. 
            It's gonna be awesome! 🔥
          </p>
          <div style={{
            padding: '2rem',
            background: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '12px',
            border: '2px dashed rgba(233, 30, 99, 0.5)'
          }}>
            <Zap size={48} color="#e91e63" style={{marginBottom: '1rem'}} />
            <h3 style={{fontSize: '1.2rem', color: '#e91e63', marginBottom: '0.5rem'}}>
              Under Construction! 🚧
            </h3>
            <p style={{color: '#999', fontSize: '0.9rem'}}>
              Our cyber warriors are building this game right now! Come back soon for the action!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

