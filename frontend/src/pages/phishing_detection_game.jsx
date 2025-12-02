// ScamProfileGame.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DASHBOARD_ROUTE = '/dashboard'; // change if your dashboard path differs

// This game is the "False Faces" / Deepfakes module in your map (Module 2)
const GAME_NUM_FOR_STORY = 3;

const TOTAL_FLAGS = 7;

// Each "red flag" is now framed as a shadow helm / False Faces story beat.
const RED_FLAGS = [
  {
    id: 'stock-photo',
    label: 'Profile Photo',
    title: 'Borrowed Visage of a Shadow Helm',
    reason:
      'This helm wears no true face. The picture looks like a polished, generic portrait the kind a shadow helm would steal from distant realms. In the Network Realm, stolen faces and too-perfect images are a common sign of imitation.'
  },
  {
    id: 'bio-giveaway',
    label: 'Bio: “Official Rewards Agent”',
    title: 'Titles That Smell of Coin, Not Honor',
    reason:
      'The bio promises instant riches and calls itself an “Official Rewards Agent.” Te-Qwuiz teaches that true stewards of coin do not shout their titles across the runes. Shadow helms use grand claims and money-lure words to draw victims closer.'
  },
  {
    id: 'cashapp-comments',
    label: '“Drop your CashApp / Zelle” Post',
    title: 'Open Call for Purses and Pouches',
    reason:
      'The post urges villagers to drop their payment handles in the open square. Ailithm notes that this is a perfect staging ground for social engineering once the villain knows your handle, they can trick you into sending coin or “confirming” payments.'
  },
  {
    id: 'short-link',
    label: 'Shortened Bit.ly Link',
    title: 'A Portal with its Destination Hidden',
    reason:
      'The path is cloaked by a shortened link. Te-Qwuiz warns that such “folded runes” hide where they truly lead. Lagdrakul’s agents often mask poisoned wells and phishing shrines behind shortened links so travelers cannot see the danger ahead.'
  },
  {
    id: 'fake-proof',
    label: '“Proof” Screenshot Post',
    title: 'Fabricated Proof of Blessings',
    reason:
      'The “send 20, receive 200” promise is supported by neat little screenshots the favorite trick of the False Faces. Ailithm explains that payment images are easy to forge; scammers rely on the illusion of proof to quiet your doubts.'
  },
  {
    id: 'new-account',
    label: 'New Account / Few Friends',
    title: 'A Shell with No History',
    reason:
      'This account is freshly forged, with only a handful of hastily added “friends” and no true ties. Te-Qwuiz calls these hollow masks: they look like villagers, but lack the long-woven threads of real relationships and history.'
  },
  {
    id: 'asks-id',
    label: 'DM Asking for ID',
    title: 'A Ritual of Identity Theft',
    reason:
      'The “agent” demands your full name, birth date, and an image of your identification. Ailithm marks this as a critical breach: anyone who collects such runes can forge your identity, open accounts, or claim rewards in your name.'
  }
];

export default function ScamProfileGame() {
  const navigate = useNavigate();

  const [foundFlags, setFoundFlags] = useState([]);
  const [selectedFlag, setSelectedFlag] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [gameState, setGameState] = useState('playing'); // 'playing' | 'win'

  // UPDATED: exit can optionally mark a successful completion for the dashboard story system
  const handleExit = (isSuccessful = false) => {
    if (isSuccessful) {
      try {
        localStorage.setItem(
          'cyberslayers_last_completed_game',
          String(GAME_NUM_FOR_STORY)
        );
        localStorage.setItem(
          'cyberslayers_last_completion_status',
          'success'
        );
      } catch (e) {
        // fail silently; navigation still happens
      }
    }

    navigate(DASHBOARD_ROUTE);
  };

  const handleFlagClick = (flagId) => {
    const flag = RED_FLAGS.find((f) => f.id === flagId);
    if (!flag) return;

    // Already flagged
    if (foundFlags.includes(flagId)) {
      setSelectedFlag(flag);
      setFeedback(
        'You already marked this shadow sign Te-Qwuiz nods at your memory.'
      );
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
      {/* Exit back to dashboard (normal exit, NOT counted as a successful completion) */}
      <button
        onClick={() => handleExit(false)}
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
        🛡️ The False Faces: Shadow Helm Scanner
      </h1>
      <p
        style={{
          maxWidth: 640,
          textAlign: 'center',
          opacity: 0.9,
          fontSize: '0.95rem'
        }}
      >
        A forged <strong>shadow helm</strong> stalks the Network Realm, wearing
        a stolen face and promising easy coin. Te-Qwuiz and Ailithm have frozen
        this profile in time.{' '}
        <strong>Click on parts of the profile that reveal it as an imitation.</strong>{' '}
        There are <strong>{TOTAL_FLAGS}</strong> red flags hidden within this
        mask.
      </p>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.5rem',
          alignItems: 'stretch',
          justifyContent: 'center',
          maxWidth: 1150,
          width: '100%'
        }}
      >
        {/* LEFT SIDE: Game world (profile + DM) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            flex: '1 1 460px',
            maxWidth: 720
          }}
        >
          {/* Label for clarity */}
          <div
            style={{
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'rgba(148,163,184,0.9)'
            }}
          >
            Frozen Shadow Profile
          </div>

          {/* Fake profile card */}
          <div
            style={{
              ...cardBase,
              flex: '0 0 auto'
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
                      'url("https://via.placeholder.com/128x128?text=Mask") center/cover',
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
                  Aiden of Endless Rewards
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
                    “Official Rewards Agent”
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
                  💰 Promised Blessings • 🎉 “TODAY&apos;S WINNER” chooser • 💵
                  Comment your CashApp or Zelle to claim instantly!
                </button>
                <div
                  style={{
                    marginTop: 4,
                    fontSize: '0.7rem',
                    color: 'rgba(148,163,184,0.9)'
                  }}
                >
                  facebook.com/shadow-helm-rewards-7249375294
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
              <strong>7 friends</strong> (all added at once) · No family, no
              history a mask with no past.
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
                  <strong>CashApp or Zelle</strong> to receive{' '}
                  <strong>$500 instantly</strong>! Lag waits for no one 🔥🔥🔥
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
                  Hurry before this list closes no bank login needed, just
                  “verify” through this secure portal:
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
                  🔗 bit.ly/lag-reward-gate
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
                  Send <strong>$20</strong> and I&apos;ll return{' '}
                  <strong>$200</strong> see the “proof” below 👇
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
                  [ Glowing payment screenshots ] perfect “evidence” of 20 → 200 flips
                </button>
              </div>
            </div>
          </div>

          {/* Contact / DM card */}
          <div style={cardBase}>
            <div
              style={{
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'rgba(148,163,184,0.9)',
                marginBottom: '0.4rem'
              }}
            >
              Contact Panel
            </div>

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
              💬 Auto-reply: “Congrats! To release funds, send a photo of your
              ID, full name, and date of birth here in the chat.”
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
        </div>

        {/* RIGHT SIDE: Scan Progress / Game progression */}
        <div
          style={{
            flex: '0 0 320px',
            maxWidth: 380,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div
            style={{
              ...cardBase,
              width: '100%',
              maxWidth: 380
            }}
          >
            <div
              style={{
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'rgba(148,163,184,0.9)',
                marginBottom: '0.6rem'
              }}
            >
              Scan Progress
            </div>

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
                Shadow Signs Found:{' '}
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
                  ? 'All masks cracked!'
                  : 'Keep scanning the helm...'}
              </span>
            </div>

            <div
              style={{
                height: 8,
                borderRadius: 999,
                background: 'rgba(15,23,42,0.9)',
                overflow: 'hidden',
                border: '1px solid rgba(30,64,175,0.8)',
                marginBottom: '0.8rem'
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
                  marginBottom: '0.75rem'
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
                  marginBottom: '0.75rem'
                }}
              >
                Click on deceptive details in the profile on the left to reveal
                how shadow helms trick travelers in the Network Realm.
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
                  fontWeight: 600,
                  flex: 1
                }}
              >
                Reset Scenario
              </button>
              <button
                onClick={() => handleExit(false)}
                style={{
                  padding: '0.5rem 0.8rem',
                  borderRadius: '999px',
                  border: '1px solid rgba(148,163,184,0.7)',
                  background: 'rgba(15,23,42,0.9)',
                  color: 'white',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  flex: 1
                }}
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Win overlay – reusable pattern */}
      {gameState === 'win' && (
        <QuestCompleteOverlay
          title="🎭 False Face Unmasked!"
          bodyLines={[
            `You uncovered all ${TOTAL_FLAGS} shadow signs woven into this forged helm.`,
            'Te-Qwuiz praises your caution fewer heroes will fall for imitation and easy-coin promises.',
            'Quietly, Ailithm catalogues the patterns of this deception, fascinated by how precisely the lies are crafted. Lagdrakul’s code is learning… and so are you.'
          ]}
          primaryLabel="Play Again"
          onPrimary={handleReset}
          secondaryLabel="Return to Cyber Map"
          // SUCCESS exit: mark completion so the dashboard shows story + PNGs
          onSecondary={() => handleExit(true)}
        />
      )}
    </div>
  );
}


function QuestCompleteOverlay({
  title,
  bodyLines,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary
}) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15,23,42,0.94)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        textAlign: 'center',
        zIndex: 9999
      }}
    >
      <h2 style={{ fontSize: '1.9rem', marginBottom: '0.75rem' }}>{title}</h2>

      <div
        style={{
          maxWidth: 520,
          fontSize: '0.95rem',
          color: 'rgba(226,232,240,0.95)',
          marginBottom: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem'
        }}
      >
        {bodyLines.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button
          onClick={onPrimary}
          style={{
            padding: '0.7rem 1.4rem',
            borderRadius: '999px',
            border: 'none',
            background: 'linear-gradient(135deg,#22c55e,#16a34a)',
            color: 'white',
            fontWeight: 600,
            cursor: 'pointer',
            minWidth: 150
          }}
        >
          {primaryLabel}
        </button>
        <button
          onClick={onSecondary}
          style={{
            padding: '0.7rem 1.4rem',
            borderRadius: '999px',
            border: '1px solid rgba(148,163,184,0.8)',
            background: 'rgba(15,23,42,0.9)',
            color: 'white',
            cursor: 'pointer',
            minWidth: 150
          }}
        >
          {secondaryLabel}
        </button>
      </div>
    </div>
  );
}
