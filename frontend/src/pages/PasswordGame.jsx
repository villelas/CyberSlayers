import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom"; 
import "../App.css"; 

const PasswordGame = () => {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("weak");
  const [feedback, setFeedback] = useState("");
  const [hints, setHints] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [stats, setStats] = useState({ attempts: 0, passes: 0 });

  const navigate = useNavigate(); 

  useEffect(() => {
    const savedStats = JSON.parse(localStorage.getItem("passwordStats"));
    if (savedStats) setStats(savedStats);
  }, []);

  useEffect(() => {
    localStorage.setItem("passwordStats", JSON.stringify(stats));
  }, [stats]);

  const checkPassword = () => {
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecials = /[!@#$%^&*]/.test(password);
    const isLongEnough = password.length >= 8;
    const isMediumLength = password.length >= 6;

    let newStrength = "weak";

    if (isLongEnough && hasLetters && hasNumbers && hasSpecials) {
      newStrength = "strong";
    } else if (
      (isMediumLength && hasLetters && hasNumbers) ||
      (isMediumLength && hasLetters && hasSpecials)
    ) {
      newStrength = "medium";
    }

    setStrength(newStrength);

    setFeedback(
      newStrength === "strong"
        ? "🎉 Your password is strong!"
        : newStrength === "medium"
        ? "⚠️ Your password is medium — add more variety!"
        : "❌ Your password is weak!"
    );

    setHints(getHints(password, newStrength));
    setShowConfetti(newStrength === "strong");

    setStats((prev) => ({
      attempts: prev.attempts + 1,
      passes: prev.passes + (newStrength === "strong" ? 1 : 0),
    }));
  };

  const getHints = (pwd, strength) => {
    const hints = [];
    if (pwd.length < 8) hints.push("Make it longer!");
    if (!/[0-9]/.test(pwd)) hints.push("Add a number!");
    if (!/[!@#$%^&*]/.test(pwd)) hints.push("Try a special character like ! or #");

    if (strength === "medium") {
      hints.push("Almost there! Add more variety for a strong password.");
    }

    return hints;
  };

  const successRate =
    stats.attempts > 0 ? ((stats.passes / stats.attempts) * 100).toFixed(1) : 0;

  const resetStats = () => {
    setStats({ attempts: 0, passes: 0 });
    localStorage.removeItem("passwordStats");
  };

  return (
    <div className="cyber-container bg-gradient-primary flex-center">
      <div className="glass-card card-elevated">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter a password"
          className="input-field"
        />

        {/* Buttons side by side */}
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "15px" }}>
          <button onClick={checkPassword} className="btn-primary">
            Test Password
          </button>
          <button onClick={resetStats} className="btn-primary">
            🔄 Start Over
          </button>
          <button onClick={() => navigate("/dashboard")} className="btn-primary">
            🚪 Exit
          </button>
        </div>

        {showConfetti && <Confetti recycle={false} />}

        <p
          className={
            strength === "strong"
              ? "text-gradient-primary"
              : strength === "medium"
              ? "text-highlight-purple"
              : "text-highlight-pink"
          }
        >
          {feedback}
        </p>

        {hints.length > 0 && (
          <ul>
            {hints.map((hint, i) => (
              <li key={i} className="text-highlight-purple">{hint}</li>
            ))}
          </ul>
        )}

        {/* Stats Display - all on one row */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
          marginTop: "30px",
          fontSize: "18px"
        }}>
          <p><strong>Attempts:</strong> {stats.attempts}</p>
          <p><strong>Passes:</strong> {stats.passes}</p>
          <p><strong>Success Rate:</strong> {successRate}%</p>
        </div>
      </div>
    </div>
  );
};

export default PasswordGame;
