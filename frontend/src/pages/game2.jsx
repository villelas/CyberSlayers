import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

// EmojiShape component
function EmojiShape({ emoji, x, y, onClick, disabled }) {
  const [scale, setScale] = useState(1);

  return (
    <div
      style={{
        position: "absolute",
        left: x - 45,
        top: y - 45,
        fontSize: 90 * scale,
        cursor: disabled ? "default" : "pointer",
        userSelect: "none",
        transition: "transform 0.15s",
        pointerEvents: disabled ? "none" : "auto",
      }}
      onClick={() => !disabled && onClick()}
      onMouseOver={() => !disabled && setScale(1.2)}
      onMouseOut={() => !disabled && setScale(1)}
    >
      {emoji}
    </div>
  );
}

// ImageShape component
function ImageShape({ src, x, y, onClick, disabled }) {
  const [scale, setScale] = useState(1);

  return (
    <img
      src={src}
      alt=""
      style={{
        position: "absolute",
        left: x - 45,
        top: y - 45,
        width: 250 * scale,
        height: 250 * scale,
        cursor: disabled ? "default" : "pointer",
        transition: "transform 0.15s",
        pointerEvents: disabled ? "none" : "auto",
      }}
      onClick={() => !disabled && onClick()}
      onMouseOver={() => !disabled && setScale(1.2)}
      onMouseOut={() => !disabled && setScale(1)}
    />
  );
}

export default function App() {
  // Game state
  const [levelIndex, setLevelIndex] = useState(0);
  const [xp, setXp] = useState(0);
  const [message, setMessage] = useState("Click the correct item!");
  const [levelCompleted, setLevelCompleted] = useState(false);

  // Info-page state (full-screen "lesson" before the level)
  const [showPreInfo, setShowPreInfo] = useState(false);

  const levels = [
    {
      name: "Bots",
      type: "image",
      info: "bots", 
      objects: [
        { src: "/images/abby.png", correct: true, pos: [-1, 0] },
        { src: "/images/iphone.png", correct: false, pos: [1, 0] },
      ],
    },
    {
      name: "Oversharing",
      type: "image",
      info: "oversharing",
      objects: [
        { src: "/images/tommy.png", correct: true, pos: [-1, 1] },
        { src: "/images/sydney.png", correct: false, pos: [1, 1] },
        { src: "/images/ashley.png", correct: false, pos: [-1, -1] },
        { src: "/images/john.png", correct: false, pos: [1, -1] },
      ],
    },
    {
      name: "Impersonation",
      type: "image",
      info: "impersonation",
      objects: [
        { src: "/images/message1.png", correct: false, pos: [-1, 1] },
        { src: "/images/message2.png", correct: false, pos: [1, 1] },
        { src: "/images/message3.png", correct: true, pos: [-1, -1] },
        { src: "/images/message4.png", correct: false, pos: [1, -1] },
      ],
    },
  ];

  const currentLevel = levels[levelIndex];
  const gameComplete = levelIndex >= levels.length;

  // Trigger the pre-info page when entering a level that has an info page
  useEffect(() => {
    // reset state for new level
    setLevelCompleted(false);
    setMessage("Click the correct item!");

    // if the level has an 'info' flag, show the pre-info page
    if (currentLevel && currentLevel.info) {
      setShowPreInfo(true);
    } else {
      setShowPreInfo(false);
    }
  }, [levelIndex]);

  // Window size for confetti sizing & object positions
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });
  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handler for clicking game objects
  const handleClick = (correct) => {
    // disabled while pre-info is visible
    if (showPreInfo) return;

    if (!levelCompleted) {
      if (correct) setXp((prev) => prev + 10);
      setMessage(correct ? "Correct! 🎉 Next Level →" : "Wrong! 😬 Try Next →");
      setLevelCompleted(true);
    }
  };

  // Move to next level
  const goToNextLevel = () => {
    setLevelIndex((prev) => prev + 1);
  };

  const bgGradient = gameComplete
    ? "linear-gradient(135deg, #f39c12, #e74c3c)"
    : "linear-gradient(135deg, #4a90e2, #8e44ad)";

  // --- Content for the full-screen pre-info pages ---
  const BotsPreInfoContent = (
    <div style={{ maxWidth: 900 }}>
      <h1 style={{ marginBottom: 18 }}>Learn some information about Bots</h1>

      <h3 style={{ marginTop: 12 }}>🤖 What Social Media Bots Are — Definition</h3>
      <p style={{ marginTop: 8 }}>
        Bots are software programs that run automated tasks on platforms like Twitter,
        Facebook, Instagram, and YouTube. They can be partially or fully autonomous,
        posting, liking, following, or commenting without human input.
      </p>
      <p style={{ fontWeight: 700 }}>Difference from Chatbots:</p>
      <p style={{ marginTop: 6 }}>
        Chatbots are designed to hold conversations (like customer service assistants),
        while social bots focus on influencing social media activity.
      </p>

      <h3 style={{ marginTop: 18 }}>⚠️ Risks and Misuses</h3>
      <ul style={{ textAlign: "left", marginTop: 8 }}>
        <li>
          <strong>Disinformation:</strong> Bots are widely used to spread false or misleading
          information, especially during elections or global events.
        </li>
        <li>
          <strong>Amplifying Outrage:</strong> Many bots deliberately amplify divisive or emotional
          content to increase visibility and engagement.
        </li>
        <li>
          <strong>Fake Popularity:</strong> Bots can inflate follower counts, likes, or views,
          creating the illusion of popularity or credibility.
        </li>
        <li>
          <strong>Ad Fraud:</strong> Some bots artificially boost viewership and engagement metrics.
        </li>
        <li>
          <strong>Consumer Manipulation:</strong> Bots generate fake reviews and comments to influence purchasing decisions.
        </li>
      </ul>

      <h3 style={{ marginTop: 18 }}>🔍 How to Spot a Bot</h3>
      <ul style={{ textAlign: "left", marginTop: 8 }}>
        <li>
          <strong>Posting frequency:</strong> Bots often post at unnatural rates (e.g., every few seconds).
        </li>
        <li>
          <strong>Generic profiles:</strong> Few personal details, stock images, or random usernames.
        </li>
        <li>
          <strong>Content style:</strong> Repetitive, overly promotional, or extreme political messaging.
        </li>
        <li>
          <strong>Engagement patterns:</strong> Following thousands of accounts but receiving little genuine interaction.
        </li>
      </ul>
    </div>
  );

  const OversharingPreInfoContent = (
    <div style={{ maxWidth: 900 }}>
      <h1 style={{ marginBottom: 18 }}>Learn some information about Oversharing</h1>

      <h3 style={{ marginTop: 12 }}>🌐 What Oversharing Is — Definition</h3>
      <p style={{ marginTop: 8 }}>
        Oversharing is revealing more personal details than necessary or appropriate on platforms
        like Instagram, Facebook, TikTok, or LinkedIn.
      </p>
      <p style={{ fontWeight: 700 }}>Examples:</p>
      <p style={{ marginTop: 6 }}>
        Sharing your daily routine, financial details, medical information, relationship struggles,
        or even vacation plans publicly.
      </p>

      <h3 style={{ marginTop: 18 }}>⚠️ Risks of Oversharing</h3>
      <ul style={{ textAlign: "left", marginTop: 8 }}>
        <li>
          <strong>Scams & Cybercrime:</strong> Public feeds become “supermarkets of personal data”
          for scammers, who use details to impersonate you, send phishing links, or run romance scams.
        </li>
        <li>
          <strong>Privacy Breaches:</strong> Posting milestones (new job, moving, birthdays) can give
          criminals clues for identity theft or even physical break-ins.
        </li>
        <li>
          <strong>Reputation Damage:</strong> Once posted, content can spread quickly and be hard to retract,
          potentially harming your professional image.
        </li>
        <li>
          <strong>Relationship Strain:</strong> Oversharing about partners or family can cause discomfort or lost trust.
        </li>
        <li>
          <strong>Mental Health Links:</strong> Psychologists note oversharing may stem from struggles like low self-esteem, depression, or a need for validation.
        </li>
      </ul>

      <h3 style={{ marginTop: 18 }}>✅ How to Avoid Oversharing</h3>
      <ul style={{ textAlign: "left", marginTop: 8 }}>
        <li>
          <strong>Pause Before Posting:</strong> Ask yourself, “Would I be comfortable if a stranger saw this?”.
        </li>
        <li>
          <strong>Limit Sensitive Details:</strong> Avoid posting addresses, financial info, or medical updates.
        </li>
        <li>
          <strong>Use Privacy Settings:</strong> Restrict who can see your posts and review your audience regularly.
        </li>
        <li>
          <strong>Soft Launching:</strong> Gen Z often “soft launches” relationships (subtle hints instead of full reveals).
        </li>
        <li>
          <strong>Alternative Outlets:</strong> Journaling or private conversations can help express feelings without broadcasting them.
        </li>
      </ul>
    </div>
  );

  const ImpersonationPreInfoContent = (
  <div style={{ maxWidth: 900 }}>
    <h1 style={{ marginBottom: 18 }}>Learn some information about Impersonation</h1>

    <h3 style={{ marginTop: 12 }}>🕵️ What Impersonation Is</h3>
    <p style={{ marginTop: 8 }}>
      Definition: Social media impersonation occurs when someone creates a fake profile or
      sends messages pretending to be someone else.
    </p>
    <ul style={{ textAlign: "left", marginTop: 8 }}>
      <li>Copying names, photos, and bios to look like the real person.</li>
      <li>Sending messages that mimic a friend, family member, or celebrity.</li>
      <li>Using look-alike usernames (swapping “O” with “0”).</li>
      <li>Targets include everyday users, businesses, influencers, and public figures.</li>
    </ul>

    <h3 style={{ marginTop: 18 }}>⚠️ Risks of Impersonation</h3>
    <ul style={{ textAlign: "left", marginTop: 8 }}>
      <li><strong>Scams & Fraud:</strong>Impersonators often ask for money, personal details, or login credentials.</li>
      <li><strong>Reputation Damage:</strong>Fake accounts can spread misinformation or offensive content under your name.</li>
      <li><strong>Privacy Breach:</strong>Impersonators may trick your contacts into revealing sensitive information.</li>
      <li><strong>Emotional Harm:</strong>Friends and family may feel betrayed or confused by fake messages.</li>
    </ul>

    <h3 style={{ marginTop: 18 }}>🔍 How to Spot Impersonation</h3>
    <ul style={{ textAlign: "left", marginTop: 8 }}>
      <li><strong>Unusual Requests:</strong>Asking for money, passwords, or urgent favors.</li>
      <li><strong>New Accounts:</strong>Messages coming from unfamiliar or recently created profiles.</li>
      <li><strong>Spelling/Grammar Errors:</strong>Many impersonators use sloppy language.</li>
      <li><strong>Verification Clues:</strong>Real accounts often have verification badges or consistent posting history.</li>
    </ul>

    <h3 style={{ marginTop: 18 }}>✅ What To Do If You’re Targeted</h3>
    <ul style={{ textAlign: "left", marginTop: 8 }}>
      <li><strong>Gather Evidence:</strong>Take screenshots of fake profiles or suspicious messages.</li>
      <li><strong>Report the Account:</strong>Use the platforms “Report” or “Block” features to alert moderators.</li>
      <li><strong>Warn Contacts:</strong>Let friends and family know not to trust messages from the impersonator.</li>
      <li><strong>Legal Action:</strong>In severe cases, consult authorities or legal experts to protect your identity.</li>
    </ul>
  </div>
);


  // Render the chosen full-screen pre-info page content based on the level
  const renderPreInfoPage = () => {
    if (!currentLevel) return null;
    if (currentLevel.info === "bots") {
      return BotsPreInfoContent;
    }
    if (currentLevel.info === "oversharing") {
      return OversharingPreInfoContent;
    }
    if (currentLevel.info === "impersonation") {
      return ImpersonationPreInfoContent;
    }
    return null;
  };


  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        background: bgGradient,
        color: "white",
        overflow: "hidden",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      {/* PRE-INFO FULL SCREEN PAGE (centered poster style) */}
      {showPreInfo && currentLevel && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflowY: "auto",
            padding: "40px 20px",
            zIndex: 40,
            display: "flex",
            justifyContent: "center",
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(6px)",
          }}
        >
        <div
          style={{
          width: "100%",
          maxWidth: 900,
          padding: "20px",
          textAlign: "center",
        }}
        >

            {renderPreInfoPage()}

            <div style={{ marginTop: 28 }}>
              <button
                onClick={() => {
                  // hide the info and allow play
                  setShowPreInfo(false);
                  setMessage("Click the correct item!");
                }}
                style={{
                  padding: "12px 28px",
                  fontSize: 18,
                  borderRadius: 10,
                  border: "none",
                  cursor: "pointer",
                  background: "white",
                  color: "#333",
                  fontWeight: 700,
                }}
              >
                Done Reading — Start Level →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HUD: show only when not showing pre-info and game not complete */}
      {!gameComplete && !showPreInfo && currentLevel && (
        <>
          <h1 style={{ position: "absolute", top: 20, left: 20 }}>
            Level: {currentLevel.name} | XP: {xp}
          </h1>
          <h2 style={{ position: "absolute", top: 100, left: 20 }}>
            {message}
          </h2>

          {levelCompleted && (
            <button
              style={{
                position: "absolute",
                top: 170,
                left: 20,
                padding: "12px 20px",
                fontSize: "1rem",
                fontWeight: "bold",
                cursor: "pointer",
                borderRadius: "8px",
                border: "none",
              }}
              onClick={() => setLevelIndex((s) => s + 1)}
            >
              Next Level →
            </button>
          )}
        </>
      )}

      {/* Game objects (disabled while pre-info is visible) */}
      {!gameComplete &&
        currentLevel &&
        currentLevel.objects.map((obj, i) => {
          // guard in case pos missing
          if (!obj.pos) return null;
          const x = windowSize.width / 2 + obj.pos[0] * 200;
          const y = windowSize.height / 2 + obj.pos[1] * 150;

          return currentLevel.type === "emoji" ? (
            <EmojiShape
              key={i}
              emoji={obj.emoji}
              x={x}
              y={y}
              onClick={() => handleClick(obj.correct)}
              disabled={showPreInfo}
            />
          ) : (
            <ImageShape
              key={i}
              src={obj.src}
              x={x}
              y={y}
              onClick={() => handleClick(obj.correct)}
              disabled={showPreInfo}
            />
          );
        })}

      {/* Game Complete */}
      {gameComplete && (
        <>
          <Confetti width={windowSize.width} height={windowSize.height} />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "2rem",
              fontWeight: "bold",
              zIndex: 100,
            }}
          >
            🎉 You are a Cyber Hero! 🎉
            <p>Total XP: {xp}</p>
          </div>
        </>
      )}
    </div>
  );
}
