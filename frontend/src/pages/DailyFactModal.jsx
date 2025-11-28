import React, { useState } from "react";
import "../App.css"; 

const cyberFacts = [
  "Phishing emails often mimic trusted companies, always check the sender’s address carefully.",
  "Using a password manager helps you create strong, unique passwords without memorizing them.",
  "Two-factor authentication adds an extra layer of security beyond your password.",
  "Public Wi-Fi can be risky, avoid logging into sensitive accounts on open networks.",
  "Software updates often patch security holes, don’t delay installing them.",
  "Cybercriminals often exploit curiosity, think twice before clicking unexpected links.",
  "Back up your data regularly to protect against ransomware attacks.",
  "Strong passwords should be at least 12 characters with a mix of letters, numbers, and symbols.",
  "Social engineering attacks rely on human trust, verify requests before sharing information.",
  "Lock your devices when unattended to prevent unauthorized access.",
  "Avoid reusing passwords across multiple accounts, one breach can compromise many.",
  "Check website URLs carefully, attackers use lookalike domains to trick users.",
  "Don’t overshare personal details on social media, attackers can use them for scams.",
  "Use antivirus and firewall protection to reduce exposure to malware.",
  "Be cautious with email attachments, they’re a common way to spread malware.",
  "Encrypt sensitive files before storing them in the cloud.",
  "Cybersecurity is everyone’s responsibility, small habits make a big difference.",
  "Hackers often target outdated systems, keep your devices updated.",
  "Always log out of accounts on shared or public computers.",
  "Think before you click, most attacks start with a single careless action."
];

function getRandomFact(facts) {
  return facts[Math.floor(Math.random() * facts.length)];
}

export default function DailyFactModal({ onClose }) {
  const [fact, setFact] = useState(getRandomFact(cyberFacts));
  const [closing, setClosing] = useState(false);

  const showAnotherFact = () => {
    const newFact = getRandomFact(cyberFacts);
    setFact(newFact);
  };

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 400);
  };

  return (
    <div className={`modal-overlay ${closing ? "fade-out" : "fade-in"}`}>
      <div className="modal-content">
        <h2 className="gradient-text">🔐 Daily Cyber Fact</h2>
        <p className="gradient-text fact-text">{fact}</p>
        <div className="modal-buttons">
          <button onClick={showAnotherFact}>Show me another fact</button>
          <button onClick={handleClose}>Got it!</button>
        </div>
      </div>
    </div>
  );
}
