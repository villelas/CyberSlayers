import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, ArrowLeft, Mail, AlertTriangle, CheckCircle, XCircle, Trophy, Zap, Target, Shield, Search, Link } from 'lucide-react';
import '../App.css';

export default function PhishingDetectionGame() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Quiz questions
  const quizQuestions = [
    {
      question: "You get an email saying 'URGENT! Your Roblox account will be deleted unless you click here NOW!' What should you do? 🎮",
      options: [
        "Click the link immediately to save my account!",
        "Reply with my username and password",
        "DELETE IT! It's a phishing scam",
        "Forward it to all my friends"
      ],
      correct: 2,
      explanation: "Perfect! This is a classic phishing trick! Real companies like Roblox will NEVER threaten to delete your account in scary emails. They want to keep you as a player! Delete and ignore! 🗑️"
    },
    {
      question: "An email says you won a FREE iPhone! But the email address is 'appl3-prizes@yahoo.com'. Is this real? 📱",
      options: [
        "Yes! I won! Let me claim it!",
        "FAKE! Real Apple emails come from @apple.com",
        "Maybe real, I should click to find out",
        "I should ask my friends to click first"
      ],
      correct: 1,
      explanation: "Great detective work! 🕵️ Notice the sneaky '3' instead of 'e' in Apple? And it's from Yahoo, not Apple! Scammers copy real company names but can't fake the official email address. Always check!"
    },
    {
      question: "Your 'friend' sends you a Discord message: 'OMG check out this funny video of you! [link]' but the link looks weird. What do you do?",
      options: [
        "Click it - my friend sent it so it's safe!",
        "Don't click! Message my friend first to ask if they really sent it",
        "Click it but don't download anything",
        "Share it with others to check if it's real"
      ],
      correct: 1,
      explanation: "Smart move! 🧠 Your friend's account might be hacked! Hackers send links to your friends to spread viruses. Always double-check with your friend using a DIFFERENT app or in person before clicking!"
    },
    {
      question: "Which of these website URLs is a PHISHING site trying to steal your info? 🌐",
      options: [
        "https://www.youtube.com",
        "https://www.yout0be.com",
        "https://youtube.com",
        "https://m.youtube.com"
      ],
      correct: 1,
      explanation: "Eagle eyes! 👀 'yout0be' uses a ZERO instead of the letter O! Scammers make fake websites that LOOK almost identical to real ones. Always check the URL carefully before logging in!"
    },
    {
      question: "You get a text message: 'Your package is waiting! Click here to schedule delivery.' But you didn't order anything. What's happening?",
      options: [
        "Maybe someone sent me a surprise gift!",
        "It's a PHISHING text (called 'smishing')",
        "I should click to see what it is",
        "It must be a mistake, I'll forward it"
      ],
      correct: 1,
      explanation: "Exactly right! 📱 Phishing through text messages is called 'SMISHING' (SMS + phishing). Scammers send fake delivery texts hoping you'll click the link. If you didn't order it, DELETE IT!"
    },
    {
      question: "An email says 'Netflix: Update your payment info or your account will be suspended.' The link is 'netflix-billing.net'. Real or fake?",
      options: [
        "Real - I better update it!",
        "FAKE! Real Netflix emails use netflix.com",
        "I'll click but won't enter any info",
        "Real - it has Netflix in the name"
      ],
      correct: 1,
      explanation: "You're a phishing detective! 🔍 Real Netflix only uses netflix.com. The '.net' at the end is a red flag! Scammers buy domain names that LOOK similar. When in doubt, go directly to the real website by typing it yourself!"
    },
    {
      question: "You see a pop-up on a website: 'WARNING! Your computer has 5 viruses! Download our antivirus NOW!' What should you do?",
      options: [
        "Download it quickly before the viruses spread!",
        "Close the pop-up! It's a fake scare tactic",
        "Share it with my parents immediately",
        "Click to scan my computer"
      ],
      correct: 1,
      explanation: "Perfect thinking! 🛡️ This is called 'SCAREWARE' - fake pop-ups designed to scare you into downloading their 'antivirus'... which is actually malware! Real antivirus programs don't use scary pop-ups. Just close it and move on!"
    },
    {
      question: "Which email is MOST LIKELY a phishing scam?",
      options: [
        "Email from your school with your school's logo and @schoolname.edu address",
        "Email saying 'Verify your Instagram account NOW!' with tons of spelling mistakes",
        "Newsletter you subscribed to with an 'unsubscribe' button",
        "Receipt from Amazon for something you actually bought"
      ],
      correct: 1,
      explanation: "Nice catch! 🎯 Spelling mistakes are a HUGE red flag! Professional companies like Instagram have editors and spellcheck. Scammers often write in a hurry and make lots of typos. Also, real companies don't use urgent all-caps threats!"
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
      border: '1px solid rgba(33, 150, 243, 0.3)',
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
      color: '#2196f3'
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
      border: '1px solid rgba(33, 150, 243, 0.3)',
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
      color: '#2196f3',
      fontWeight: 'bold'
    },
    scoreDisplay: {
      fontSize: '1rem',
      color: '#4caf50',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center'
    },
    question: {
      fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
      fontWeight: 'bold',
      marginBottom: '2rem',
      padding: '1.5rem',
      background: 'rgba(33, 150, 243, 0.1)',
      borderRadius: '12px',
      border: '1px solid rgba(33, 150, 243, 0.3)'
    },
    optionsGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '1rem'
    },
    option: {
      padding: '1.2rem',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '10px',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    optionCorrect: {
      background: 'rgba(76, 175, 80, 0.2)',
      borderColor: '#4caf50',
      boxShadow: '0 0 20px rgba(76, 175, 80, 0.3)'
    },
    optionWrong: {
      background: 'rgba(244, 67, 54, 0.2)',
      borderColor: '#f44336',
      boxShadow: '0 0 20px rgba(244, 67, 54, 0.3)'
    },
    explanation: {
      marginTop: '2rem',
      padding: '1.5rem',
      background: 'rgba(33, 150, 243, 0.1)',
      borderRadius: '12px',
      border: '1px solid rgba(33, 150, 243, 0.3)',
      display: 'flex',
      gap: '1rem',
      alignItems: 'flex-start'
    },
    nextButton: {
      marginTop: '2rem',
      padding: '1rem 2rem',
      background: 'linear-gradient(135deg, #2196f3, #1976d2)',
      border: 'none',
      borderRadius: '10px',
      color: 'white',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'transform 0.2s ease',
      width: '100%'
    },
    completionCard: {
      textAlign: 'center',
      padding: '2rem'
    },
    completionEmoji: {
      fontSize: '5rem',
      marginBottom: '1rem'
    },
    completionTitle: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      background: 'linear-gradient(45deg, #2196f3, #00bcd4)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    completionScore: {
      fontSize: '1.5rem',
      marginBottom: '1rem',
      color: '#2196f3'
    },
    gameSection: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      border: '1px solid rgba(33, 150, 243, 0.2)',
      padding: 'clamp(2rem, 4vw, 3rem)',
      textAlign: 'center'
    },
    gameComingSoon: {
      fontSize: '5rem',
      marginBottom: '1rem'
    },
    gameTitle: {
      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
      fontWeight: 'bold',
      marginBottom: '1rem',
      color: '#2196f3'
    },
    gameDescription: {
      fontSize: '1.1rem',
      color: '#cccccc',
      maxWidth: '700px',
      margin: '0 auto 2rem',
      lineHeight: '1.6'
    }
  };

  return (
    <div className="cyber-container bg-gradient-primary" style={styles.container}>
      <button 
        className="btn-back"
        style={styles.backButton}
        onClick={() => navigate('/dashboard')}
      >
        <ArrowLeft size={20} />
        Back to Dashboard
      </button>

      <div style={styles.header}>
        <h1 className="text-gradient-secondary" style={styles.title}>
          <Eye size={48} color="#2196f3" />
          Phishing Detection Hub 🎣
          <Shield size={48} color="#2196f3" />
        </h1>
        <p style={styles.subtitle}>
          Learn to spot fake emails, scam websites, and digital traps! Become a Phishing Detective! 🕵️
        </p>
      </div>

      <div style={styles.contentGrid}>
        {/* Info Section */}
        <div style={styles.infoSection}>
          <h2 style={styles.sectionTitle}>
            <Search size={28} color="#2196f3" />
            What is Phishing? 🎣
          </h2>
          <p style={{...styles.infoCardText, marginBottom: '1.5rem', fontSize: '1.05rem'}}>
            Imagine a fisherman throwing out bait to catch fish. Phishing is when bad guys throw out FAKE emails, 
            texts, or websites to catch YOU! They pretend to be someone you trust (like YouTube, Instagram, or your 
            favorite game) to steal your passwords or personal info. But YOU can outsmart them! 🧠
          </p>

          <div style={styles.infoGrid}>
            <div 
              style={styles.infoCard}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={styles.infoCardIcon}>
                <Mail size={40} color="#2196f3" />
              </div>
              <h3 style={styles.infoCardTitle}>Fake Emails 📧</h3>
              <p style={styles.infoCardText}>
                Scammers send emails that LOOK real but aren't! They might say "Your account is locked!" 
                or "You won a prize!" to trick you into clicking. Always check who sent it and look for 
                spelling mistakes!
              </p>
            </div>

            <div 
              style={styles.infoCard}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={styles.infoCardIcon}>
                <Link size={40} color="#ff9800" />
              </div>
              <h3 style={styles.infoCardTitle}>Suspicious Links 🔗</h3>
              <p style={styles.infoCardText}>
                Before clicking ANY link, hover over it (don't click!) to see where it REALLY goes. 
                Does 'youtube.com' look like 'yout0be.com'? That sneaky zero means it's FAKE! 
                Scammers love making lookalike websites!
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
              <h3 style={styles.infoCardTitle}>Red Flags! 🚩</h3>
              <p style={styles.infoCardText}>
                Watch for: URGENT messages, threats, spelling errors, asking for passwords, 
                prizes you didn't enter to win, emails from weird addresses, and anything that 
                seems "too good to be true!" Trust your gut!
              </p>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <div style={styles.quizSection}>
          <h2 style={styles.sectionTitle}>
            <Target size={28} color="#2196f3" />
            Test Your Phishing Detection Skills! 🕵️
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
                        e.currentTarget.style.background = 'rgba(33, 150, 243, 0.1)';
                        e.currentTarget.style.borderColor = '#2196f3';
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
                        {selectedAnswer === quizQuestions[currentQuestion].correct ? 'Phishing Detected! Great Work!' : 'Oops! Almost Got Phished!'}
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
                {score === quizQuestions.length ? '🏆' : score >= quizQuestions.length * 0.7 ? '🌟' : '🎣'}
              </div>
              <h3 style={styles.completionTitle}>
                {score === quizQuestions.length ? 'Perfect! Master Phishing Detective!' : score >= quizQuestions.length * 0.7 ? 'Awesome! You Dodged the Bait!' : 'Keep Learning, Cyber Warrior!'}
              </h3>
              <p style={styles.completionScore}>
                You scored {score} out of {quizQuestions.length}! 🎯
              </p>
              <p style={{...styles.infoCardText, marginBottom: '2rem'}}>
                {score === quizQuestions.length 
                  ? "🎉 WOW! You can spot a phishing scam from a mile away! You're officially a Phishing Detection Expert! Share what you learned with friends and family!" 
                  : score >= quizQuestions.length * 0.7
                  ? "⭐ Great job! You caught most of the scams! Review the tricky ones and you'll be unstoppable. The internet is safer because of YOU!"
                  : "🚀 Every detective starts somewhere! Learn from the questions you missed. The more you practice, the better you'll get at spotting scams!"}
              </p>
              <button
                style={styles.nextButton}
                onClick={resetQuiz}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                <Zap size={20} style={{display: 'inline', marginRight: '0.5rem'}} />
                Practice Again! 🔄
              </button>
            </div>
          )}
        </div>

        {/* Interactive Game Section - Coming Soon */}
        <div style={styles.gameSection}>
          <div style={styles.gameComingSoon}>🎮</div>
          <h2 style={styles.gameTitle}>
            Phishing Buster Adventure Game! 🕵️
          </h2>
          <p style={styles.gameDescription}>
            Get ready to become the ultimate email detective! Sort through real and fake emails, 
            investigate suspicious websites, and save people from getting scammed. Can you catch all 
            the phishers before they steal someone's data? It's gonna be epic! 🔥
          </p>
          <div style={{
            padding: '2rem',
            background: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '12px',
            border: '2px dashed rgba(33, 150, 243, 0.5)'
          }}>
            <Zap size={48} color="#2196f3" style={{marginBottom: '1rem'}} />
            <h3 style={{fontSize: '1.2rem', color: '#2196f3', marginBottom: '0.5rem'}}>
              Under Construction! 🚧
            </h3>
            <p style={{color: '#999', fontSize: '0.9rem'}}>
              Our cyber detectives are building this game right now! Come back soon for the adventure!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}