// TrickLevelGame.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DASHBOARD_ROUTE = '/dashboard'; // change if your dashboard route differs

// Simple 2D grid level
// 0 = empty, 1 = solid ground, 2 = spikes, 3 = goal, 4 = fake ground (collapses)
const LEVEL_LAYOUT = [
  // y = 0 (top row)
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  // y = 1
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  // y = 2
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  // y = 3
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  // y = 4
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  // y = 5
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  // y = 6
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  // y = 7
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  // y = 8
  [0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 3], // fake tile at x=3, goal at right side
  // y = 9 (bottom row with ground, spikes)
  [1, 1, 1, 1, 1, 2, 1, 1, 4, 1, 1, 1]
];

const GRAVITY = 0.15;
const MOVE_SPEED = 0.18;
const JUMP_FORCE = -0.4;
const TICK_MS = 25;

export default function TrickLevelGame() {
  const navigate = useNavigate();

  // Player physics: x, y in grid space but continuous
  const [player, setPlayer] = useState({
    x: 0.5,
    y: 7.5,
    vx: 0,
    vy: 0
  });

  const [keys, setKeys] = useState({
    left: false,
    right: false,
    jump: false
  });

  const [level, setLevel] = useState(LEVEL_LAYOUT);
  const [onGround, setOnGround] = useState(false);
  const [gameState, setGameState] = useState('playing'); // 'playing' | 'dead' | 'win'
  const [message, setMessage] = useState('');

  const width = level[0].length;
  const height = level.length;

  // Input handling (WASD + arrows + Space)
  useEffect(() => {
    const down = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        setKeys((k) => ({ ...k, left: true }));
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        setKeys((k) => ({ ...k, right: true }));
      } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === ' ') {
        setKeys((k) => ({ ...k, jump: true }));
      }
    };

    const up = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        setKeys((k) => ({ ...k, left: false }));
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        setKeys((k) => ({ ...k, right: false }));
      } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === ' ') {
        setKeys((k) => ({ ...k, jump: false }));
      }
    };

    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const interval = setInterval(() => {
      setPlayer((prev) => {
        let { x, y, vx, vy } = prev;

        // Horizontal input
        if (keys.left && !keys.right) {
          vx = -MOVE_SPEED;
        } else if (keys.right && !keys.left) {
          vx = MOVE_SPEED;
        } else {
          vx = 0;
        }

        // Jump only if on ground
        if (keys.jump && onGround) {
          vy = JUMP_FORCE;
        }

        // Gravity
        vy += GRAVITY;

        let newX = x + vx;
        let newY = y + vy;

        // Keep inside bounds horizontally
        if (newX < 0) newX = 0;
        if (newX > width - 1) newX = width - 1;

        // Collision checks
        const nextTileX = Math.floor(newX);
        const nextTileY = Math.floor(newY + 0.4); // slightly below center

        const tileBelow = getTile(level, Math.floor(newX), Math.floor(newY + 0.6));
        const tileAt = getTile(level, nextTileX, nextTileY);

        let landed = false;

        // Floor collision (ground or fake ground or goal still acts as floor)
        if (
          tileBelow === 1 || // ground
          tileBelow === 3 || // goal
          tileBelow === 4    // fake ground (will break)
        ) {
          // Snap to top of tile
          const tileY = Math.floor(newY + 0.6);
          newY = tileY - 0.5;
          vy = 0;
          landed = true;

          // If it's fake ground, collapse it after landing
          if (tileBelow === 4) {
            setLevel((prevLevel) => {
              const clone = prevLevel.map((row) => [...row]);
              clone[tileY][Math.floor(newX)] = 0; // becomes empty
              return clone;
            });
          }
        }

        // Ceil collision (if we jump into a solid tile)
        const tileAbove = getTile(level, Math.floor(newX), Math.floor(newY - 0.6));
        if (tileAbove === 1 || tileAbove === 4) {
          const tileY = Math.floor(newY - 0.6) + 1;
          newY = tileY - 0.5;
          vy = 0.05;
        }

        // Spikes kill if we overlap them
        if (tileAt === 2) {
          triggerDeath('You trusted the floor... and it bit back. 😈');
          return prev;
        }

        // Reaching the goal
        if (tileAt === 3) {
          setGameState('win');
          setMessage('You reached the door! But can you trust the next level? 👀');
          return { x: newX, y: newY, vx, vy };
        }

        setOnGround(landed);

        // Out-of-bounds vertically (fell off level)
        if (newY > height) {
          triggerDeath('You fell into the void. Classic. 💀');
          return prev;
        }

        return { x: newX, y: newY, vx, vy };
      });
    }, TICK_MS);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keys, onGround, level, gameState]);

  const triggerDeath = (msg) => {
    setGameState('dead');
    setMessage(msg);
  };

  const handleRestart = () => {
    setPlayer({ x: 0.5, y: 7.5, vx: 0, vy: 0 });
    setLevel(LEVEL_LAYOUT.map((row) => [...row])); // reset fake tiles
    setOnGround(false);
    setGameState('playing');
    setMessage('');
  };

  const handleExit = () => {
    navigate(DASHBOARD_ROUTE);
  };

  // RENDER
  const tileSize = 32;
  const boardStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${width}, ${tileSize}px)`,
    gridTemplateRows: `repeat(${height}, ${tileSize}px)`,
    background: '#020617',
    border: '4px solid #4b5563',
    borderRadius: '8px',
    boxShadow: '0 0 20px rgba(0,0,0,0.7)',
    position: 'relative'
  };

  const tileBase = {
    width: `${tileSize}px`,
    height: `${tileSize}px`,
    boxSizing: 'border-box'
  };

  const tiles = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const val = level[y][x];
      let background = '#020617';
      let border = '1px solid #0f172a';

      if (val === 1) {
        background = 'linear-gradient(180deg,#334155,#020617)';
        border = '1px solid #020617';
      } else if (val === 2) {
        background = 'radial-gradient(circle,#ef4444,#7f1d1d)';
        border = '1px solid #b91c1c';
      } else if (val === 3) {
        background = 'linear-gradient(135deg,#22c55e,#a3e635)';
        border = '1px solid #4ade80';
      } else if (val === 4) {
        background = 'linear-gradient(180deg,#eab308,#451a03)';
        border = '1px dashed #facc15';
      }

      tiles.push(
        <div
          key={`${x}-${y}`}
          style={{
            ...tileBase,
            background,
            border
          }}
        />
      );
    }
  }

  const playerScreenX = player.x * tileSize;
  const playerScreenY = player.y * tileSize;

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top,#0f172a 0,#020617 50%,#000 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontFamily:
          '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
        padding: '1rem',
        gap: '1rem',
        position: 'relative'
      }}
    >
      {/* Exit button to go back to dashboard */}
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

      <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>
        😈 Trick Level Arena
      </h1>
      <p style={{ opacity: 0.8, marginBottom: '0.5rem', textAlign: 'center' }}>
        Reach the <strong>green door</strong>. Beware: some tiles are fake, and
        spikes love surprises. <br />
        Move with <strong>← → / A D</strong>, jump with <strong>↑ / W / Space</strong>.
      </p>

      <div style={boardStyle}>
        {tiles}

        {/* Player */}
        <div
          style={{
            position: 'absolute',
            width: tileSize * 0.7,
            height: tileSize * 0.9,
            left: playerScreenX + tileSize * 0.15,
            top: playerScreenY + tileSize * 0.05,
            background:
              'linear-gradient(135deg,#38bdf8,#1d4ed8)',
            borderRadius: '6px',
            boxShadow: '0 0 10px rgba(56,189,248,0.7)',
            border: '2px solid #0ea5e9'
          }}
        />
      </div>

      {/* Status + controls */}
      {gameState !== 'playing' && (
        <div
          style={{
            marginTop: '1rem',
            padding: '0.9rem 1.3rem',
            background: 'rgba(15,23,42,0.9)',
            borderRadius: '10px',
            border:
              gameState === 'win'
                ? '1px solid #4ade80'
                : '1px solid #f97373',
            maxWidth: '360px',
            textAlign: 'center'
          }}
        >
          <div style={{ marginBottom: '0.5rem' }}>{message}</div>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
            <button
              onClick={handleRestart}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '999px',
                border: 'none',
                background:
                  'linear-gradient(135deg,#22c55e,#16a34a)',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Try Again
            </button>
            <button
              onClick={handleExit}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '999px',
                border: '1px solid rgba(148,163,184,0.6)',
                background: 'rgba(15,23,42,0.7)',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}

      {gameState === 'playing' && (
        <button
          onClick={handleRestart}
          style={{
            marginTop: '0.5rem',
            padding: '0.35rem 0.9rem',
            borderRadius: '999px',
            border: '1px solid rgba(148,163,184,0.6)',
            background: 'rgba(15,23,42,0.7)',
            color: 'white',
            fontSize: '0.85rem',
            cursor: 'pointer'
          }}
        >
          Reset Level
        </button>
      )}
    </div>
  );
}

// helper to safely get tile
function getTile(level, x, y) {
  if (
    y < 0 ||
    y >= level.length ||
    x < 0 ||
    x >= level[0].length
  ) {
    return 0;
  }
  return level[y][x];
}
