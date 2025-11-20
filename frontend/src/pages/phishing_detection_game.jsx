// ScamProfileGame.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DASHBOARD_ROUTE = '/dashboard'; // change if your dashboard path differs

const TOTAL_FLAGS = 7;

const RED_FLAGS = [
  {
    id: 'stock-photo',
    label: 'Profile Photo',
    title: 'Suspicious Profile Picture',
    reason:
      'The profile photo looks like a generic stock photo/model shot – scammers often use stolen or stock images instead of real photos.'
  },
  {
    id: 'bio-giveaway',
    label: 'Bio: “Official Rewards Agent”',
    title: 'Too-Good-To-Be-True Bio',
    reason:
      'The bio claims “Official Rewards Agent” and promises instant money – this is classic language for giveaway/money-flip scams.'
  },
  {
    id: 'cashapp-comments',
    label: '“Drop your CashApp / Zelle” Post',
    title: 'Requesting Payment Handles in Comments',
    reason:
      'Asking people to comment their CashApp or Zelle is a way to socially engineer financial transfers or trick people into sending money.'
  },
  {
    id: 'short-link',
    label: 'Shortened Bit.ly Link',
    title: 'Hidden Destination Link',
    reason:
      'Shortened links (like bit.ly) hide where you are going. Scammers use them to disguise phishing pages or malware sites.'
  },
  {
    id: 'fake-proof',
    label: '“Proof” Screenshot Post',
    title: 'Fake Proof of Payouts',
    reason:
      'The “send $20, get $200” post uses screenshots as fake proof. Scammers often fabricate payment screenshots to gain trust.'
  },
  {
    id: 'new-account',
    label: 'New Account / Few Friends',
    title: 'Bare Social Graph',
    reason:
      'The account has very few friends, all added recently, with no real history or family/friend tags – a common sign of a throwaway scam account.'
  },
  {
    id: 'asks-id',
    label: 'DM Asking for ID',
    title: 'Requesting Personal ID',
    reason:
      'Asking for a photo of your driver’s license or personal documents in DMs is a major identity theft risk.'
  }
];

export default function ScamProfileGame() {
  const navigate = useNavigate();

  const [foundFlags, setFoundFlags] = useState([]);
  const [selectedFlag, setSelectedFlag] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [gameState, setGameState] = useState('playing'); // 'playing' | 'win'

  const handleExit = () => {
    navigate(DASHBOARD_ROUTE);
  };

  const handleFlagClick = (flagId) => {
    const flag = RED_FLAGS.find((f) => f.id === flagId);
    if (!flag) return;

    // Already flagged
    if (foundFlags.includes(flagId)) {
      setSelectedFlag(flag);
      setFeedback('You already flagged this one — good memory, cyber-slayer.');
      return;
    }

    const updated = [...foundFlags, flagId];
    setFoundFlags(updated);
    setSelectedFlag(flag);
    setFeedback(flag.reason);

    if (updated.length === TOTAL_FLAGS) {
      setGameState('win');
    }
  };

  const handleReset = () => {
    setFoundFlags([]);
    setSelectedFlag(null);
    setFeedback('');
    setGameState('playing');
  };

  const cardBase = {
    borderRadius: '12px',
    border: '1px solid rgba(148,163,184,0.4)',
    background: 'rgba(15,23,42,0.9)',
    padding: '1rem',
    boxShadow: '0 10px 25px rgba(0,0,0,0.6)'
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top,#0f172a 0,#020617 45%,#000 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        color: 'white',
        fontFamily:
          '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
        position: 'relative',
        gap: '1rem'
      }}
    >
      {/* Exit back to dashboard */}
      <button
        onClick={handleExit}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'rgba(0,0,0,0.6)',
          borderRadius: '999px',
          border: '1px solid rgba(255,255,255,0.3)',
          color: 'white',
          padding: '0.4rem 0.7rem',
          cursor: 'pointer',
          fontSize: '0.85rem'
        }}
      >
        ✕ Exit
      </button>

      <h1 style={{ fontSize: '2rem', textAlign: 'center' }}>
        🕵️ Scam Profile Scanner
      </h1>
      <p
        style={{
          maxWidth: 620,
          textAlign: 'center',
          opacity: 0.9,
          fontSize: '0.95rem'
        }}
      >
        This is a fake social profile inside the Network Realm.{' '}
        <strong>Click on parts of the profile</strong> that look malicious or
        suspicious. There are <strong>{TOTAL_FLAGS}</strong> red flags total.
      </p>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'flex-start',
          justifyContent: 'center',
          maxWidth: 1100,
          width: '100%'
        }}
      >
        {/* Fake profile card */}
        <div
          style={{
            ...cardBase,
            flex: '0 0 380px',
            maxWidth: 420
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', marginBottom: '0.75rem' }}>
            {/* Profile photo (stock image flag) */}
            <div
              onClick={() => handleFlagClick('stock-photo')}
              style={{
                width: 64,
                height: 64,
                borderRadius: '999px',
                marginRight: '0.75rem',
                background:
                  'linear-gradient(135deg,#38bdf8,#0ea5e9,#22c55e)',
                border: foundFlags.includes('stock-photo')
                  ? '2px solid #22c55e'
                  : '2px solid rgba(148,163,184,0.7)',
                cursor: 'pointer',
                position: 'relative',
                boxShadow: foundFlags.includes('stock-photo')
                  ? '0 0 10px rgba(34,197,94,0.9)'
                  : '0 0 4px rgba(15,23,42,0.9)'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 3,
                  borderRadius: '999px',
                  background:
                    'url("https://via.placeholder.com/128x128?text=Stock") center/cover',
                  filter: 'brightness(1.1)'
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <button
                onClick={() => handleFlagClick('bio-giveaway')}
                style={{
                  padding: 0,
                  margin: 0,
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textAlign: 'left',
                  cursor: 'pointer',
                  textShadow: '0 1px 2px rgba(0,0,0,0.6)'
                }}
              >
                Aiden Wells
                <span
                  style={{
                    marginLeft: 6,
                    fontSize: '0.75rem',
                    padding: '0.1rem 0.4rem',
                    borderRadius: '999px',
                    background: 'rgba(56,189,248,0.18)',
                    border: '1px solid rgba(56,189,248,0.6)'
                  }}
                >
                  Giveaway Ambassador
                </span>
              </button>
              <button
                onClick={() => handleFlagClick('bio-giveaway')}
                style={{
                  marginTop: 4,
                  padding: 0,
                  border: 'none',
                  background: 'none',
                  textAlign: 'left',
                  fontSize: '0.8rem',
                  color: 'rgba(226,232,240,0.9)',
                  cursor: 'pointer'
                }}
              >
                💰 Official Rewards Agent • 🎉 “TODAY&apos;S WINNER” chooser •
                💵 Comment your CashApp or Zelle to claim instantly!
              </button>
              <div
                style={{
                  marginTop: 4,
                  fontSize: '0.7rem',
                  color: 'rgba(148,163,184,0.9)'
                }}
              >
                facebook.com/aiden-wealth-giveaway-7249375294
              </div>
            </div>
          </div>

          {/* Friends / account age */}
          <button
            onClick={() => handleFlagClick('new-account')}
            style={{
              width: '100%',
              borderRadius: '8px',
              border: foundFlags.includes('new-account')
                ? '1px solid #22c55e'
                : '1px solid rgba(148,163,184,0.5)',
              background: 'rgba(15,23,42,0.9)',
              padding: '0.5rem 0.6rem',
              fontSize: '0.78rem',
              textAlign: 'left',
              color: 'rgba(226,232,240,0.9)',
              cursor: 'pointer',
              marginBottom: '0.75rem'
            }}
          >
            <strong>About</strong> · Joined <em>3 days ago</em> ·{' '}
            <strong>7 friends</strong> (all added recently) · No tagged family
            or history
          </button>

          {/* Posts */}
          <div
            style={{
              marginTop: '0.5rem',
              borderTop: '1px solid rgba(51,65,85,0.9)',
              paddingTop: '0.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}
          >
            {/* Post 1 - CashApp comments */}
            <div
              style={{
                padding: '0.5rem',
                borderRadius: '8px',
                background: 'rgba(15,23,42,0.85)',
                border: '1px solid rgba(51,65,85,0.9)'
              }}
            >
              <div
                style={{
                  fontSize: '0.78rem',
                  color: 'rgba(148,163,184,0.9)',
                  marginBottom: 2
                }}
              >
                1 hour ago · Public
              </div>
              <button
                onClick={() => handleFlagClick('cashapp-comments')}
                style={{
                  border: 'none',
                  background: 'none',
                  padding: 0,
                  textAlign: 'left',
                  width: '100%',
                  cursor: 'pointer',
                  color: 'rgba(248,250,252,0.95)',
                  fontSize: '0.9rem'
                }}
              >
                🎉 I just picked <strong>5 MORE WINNERS!</strong> Drop your{' '}
                <strong>CashApp or Zelle</strong> in the comments to receive{' '}
                <strong>$500 instantly</strong>! Limited time only 🔥🔥🔥
              </button>
            </div>

            {/* Post 2 - Short link */}
            <div
              style={{
                padding: '0.5rem',
                borderRadius: '8px',
                background: 'rgba(15,23,42,0.85)',
                border: '1px solid rgba(51,65,85,0.9)'
              }}
            >
              <div
                style={{
                  fontSize: '0.78rem',
                  color: 'rgba(148,163,184,0.9)',
                  marginBottom: 2
                }}
              >
                3 hours ago · Public
              </div>
              <div
                style={{
                  fontSize: '0.9rem',
                  marginBottom: '0.4rem'
                }}
              >
                You MUST act quick before the next list closes! No bank login
                needed — just verify through this secure portal:
              </div>
              <button
                onClick={() => handleFlagClick('short-link')}
                style={{
                  borderRadius: '999px',
                  border: foundFlags.includes('short-link')
                    ? '1px solid #22c55e'
                    : '1px solid rgba(248,250,252,0.7)',
                  padding: '0.3rem 0.7rem',
                  fontSize: '0.78rem',
                  background: 'rgba(15,23,42,0.9)',
                  color: '#e5e7eb',
                  cursor: 'pointer'
                }}
              >
                🔗 bit.ly/ez-reward-portal
              </button>
            </div>

            {/* Post 3 - Fake proof screenshots */}
            <div
              style={{
                padding: '0.5rem',
                borderRadius: '8px',
                background: 'rgba(15,23,42,0.85)',
                border: '1px solid rgba(51,65,85,0.9)'
              }}
            >
              <div
                style={{
                  fontSize: '0.78rem',
                  color: 'rgba(148,163,184,0.9)',
                  marginBottom: 2
                }}
              >
                Yesterday · Public
              </div>
              <button
                onClick={() => handleFlagClick('fake-proof')}
                style={{
                  border: 'none',
                  background: 'none',
                  padding: 0,
                  textAlign: 'left',
                  width: '100%',
                  cursor: 'pointer',
                  color: 'rgba(248,250,252,0.95)',
                  fontSize: '0.9rem'
                }}
              >
                Send me <strong>$20</strong> and I&apos;ll return{' '}
                <strong>$200</strong> — proof below 👇
              </button>
              <button
                onClick={() => handleFlagClick('fake-proof')}
                style={{
                  marginTop: '0.4rem',
                  width: '100%',
                  borderRadius: '8px',
                  border: foundFlags.includes('fake-proof')
                    ? '1px solid #22c55e'
                    : '1px dashed rgba(248,250,252,0.7)',
                  padding: '0.4rem',
                  background:
                    'repeating-linear-gradient(45deg,#020617,#020617 6px,#0f172a 6px,#0f172a 12px)',
                  color: 'rgba(241,245,249,0.9)',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                [ Doctored payment screenshots ] — “Proof” of $20 → $200 flips
              </button>
            </div>
          </div>
        </div>

        {/* Right side: DM + Feedback */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            flex: '0 0 320px',
            maxWidth: 380
          }}
        >
          {/* Contact / message card */}
          <div style={cardBase}>
            <h3
              style={{
                fontSize: '1rem',
                marginBottom: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              Contact Panel
              <span
                style={{
                  fontSize: '0.7rem',
                  color: 'rgba(148,163,184,0.9)'
                }}
              >
                Click suspicious areas
              </span>
            </h3>

            <button
              onClick={() => handleFlagClick('asks-id')}
              style={{
                width: '100%',
                borderRadius: '8px',
                border: foundFlags.includes('asks-id')
                  ? '1px solid #22c55e'
                  : '1px solid rgba(148,163,184,0.6)',
                background:
                  'linear-gradient(135deg,rgba(15,23,42,0.9),rgba(30,64,175,0.7))',
                padding: '0.7rem 0.75rem',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.85rem',
                textAlign: 'left',
                marginBottom: '0.5rem'
              }}
            >
              💬 Auto-reply: “Congrats! To confirm you are a real person and
              release funds, send a photo of your driver&apos;s license, full
              name, and date of birth here.”
            </button>

            <button
              onClick={() => handleFlagClick('asks-id')}
              style={{
                borderRadius: '999px',
                border: '1px solid rgba(148,163,184,0.7)',
                background: 'rgba(15,23,42,0.9)',
                color: 'rgba(226,232,240,0.95)',
                padding: '0.35rem 0.75rem',
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              Message Me to Claim ✔
            </button>
          </div>

          {/* Progress & feedback */}
          <div style={cardBase}>
            <div
              style={{
                fontSize: '0.9rem',
                marginBottom: '0.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>
                Red Flags Found:{' '}
                <strong>
                  {foundFlags.length} / {TOTAL_FLAGS}
                </strong>
              </span>
              <span
                style={{
                  fontSize: '0.75rem',
                  color: 'rgba(148,163,184,0.9)'
                }}
              >
                {foundFlags.length === TOTAL_FLAGS
                  ? 'All threats exposed!'
                  : 'Keep scanning...'}
              </span>
            </div>

            <div
              style={{
                height: 8,
                borderRadius: 999,
                background: 'rgba(15,23,42,0.9)',
                overflow: 'hidden',
                border: '1px solid rgba(30,64,175,0.8)',
                marginBottom: '0.6rem'
              }}
            >
              <div
                style={{
                  width: `${(foundFlags.length / TOTAL_FLAGS) * 100}%`,
                  height: '100%',
                  background:
                    'linear-gradient(90deg,#22c55e,#a3e635,#facc15)'
                }}
              />
            </div>

            {selectedFlag ? (
              <div
                style={{
                  fontSize: '0.85rem',
                  background: 'rgba(15,23,42,0.9)',
                  borderRadius: '8px',
                  border: '1px solid rgba(148,163,184,0.7)',
                  padding: '0.6rem',
                  marginBottom: '0.5rem'
                }}
              >
                <div
                  style={{
                    fontWeight: 600,
                    marginBottom: '0.25rem',
                    color: '#e5e7eb'
                  }}
                >
                  ⚠ {selectedFlag.title}
                </div>
                <div style={{ color: 'rgba(209,213,219,0.95)' }}>
                  {feedback}
                </div>
              </div>
            ) : (
              <div
                style={{
                  fontSize: '0.8rem',
                  color: 'rgba(148,163,184,0.9)',
                  marginBottom: '0.5rem'
                }}
              >
                Click on suspicious parts of the profile to reveal why they are
                dangerous.
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={handleReset}
                style={{
                  padding: '0.5rem 0.8rem',
                  borderRadius: '999px',
                  border: 'none',
                  background:
                    'linear-gradient(135deg,#22c55e,#16a34a)',
                  color: 'white',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Reset Scenario
              </button>
              <button
                onClick={handleExit}
                style={{
                  padding: '0.5rem 0.8rem',
                  borderRadius: '999px',
                  border: '1px solid rgba(148,163,184,0.7)',
                  background: 'rgba(15,23,42,0.9)',
                  color: 'white',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Win overlay */}
      {gameState === 'win' && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15,23,42,0.9)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            textAlign: 'center',
            zIndex: 9999
          }}
        >
          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>
            🎉 All Threats Identified!
          </h2>
          <p
            style={{
              maxWidth: 500,
              fontSize: '0.95rem',
              color: 'rgba(226,232,240,0.95)',
              marginBottom: '1rem'
            }}
          >
            You spotted all <strong>{TOTAL_FLAGS}</strong> malicious indicators
            in this fake profile. Te-Qwuiz is pleased — fewer heroes will fall
            for shadow helms and poisoned giveaways.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={handleReset}
              style={{
                padding: '0.7rem 1.3rem',
                borderRadius: '999px',
                border: 'none',
                background:
                  'linear-gradient(135deg,#22c55e,#16a34a)',
                color: 'white',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Play Again
            </button>
            <button
              onClick={handleExit}
              style={{
                padding: '0.7rem 1.3rem',
                borderRadius: '999px',
                border: '1px solid rgba(148,163,184,0.8)',
                background: 'rgba(15,23,42,0.9)',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
