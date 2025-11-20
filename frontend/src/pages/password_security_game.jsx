// SnakeGame.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BOARD_SIZE = 20;
const WIN_SCORE = 25;
const DASHBOARD_ROUTE = '/dashboard'; // <-- change if your dashboard route is different

function getRandomFood(snake) {
  while (true) {
    const x = Math.floor(Math.random() * BOARD_SIZE);
    const y = Math.floor(Math.random() * BOARD_SIZE);
    const onSnake = snake.some((seg) => seg.x === x && seg.y === y);
    if (!onSnake) return { x, y };
  }
}

export default function SnakeGame() {
  const navigate = useNavigate();

  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [food, setFood] = useState(getRandomFood([{ x: 10, y: 10 }]));
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [speed] = useState(150); // ms per tick

  // === WIN CONDITION: 25 apples => go back to dashboard ======================
  useEffect(() => {
    if (score >= WIN_SCORE) {
      // You could show a toast/toaster in your layout if you want “You collected 25 apples!”
      navigate(DASHBOARD_ROUTE);
    }
  }, [score, navigate]);

  // keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return;

      if (e.key === 'ArrowUp' || e.key === 'w') {
        if (direction.y === 1) return;
        setDirection({ x: 0, y: -1 });
      } else if (e.key === 'ArrowDown' || e.key === 's') {
        if (direction.y === -1) return;
        setDirection({ x: 0, y: 1 });
      } else if (e.key === 'ArrowLeft' || e.key === 'a') {
        if (direction.x === 1) return;
        setDirection({ x: -1, y: 0 });
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        if (direction.x === -1) return;
        setDirection({ x: 1, y: 0 });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, gameOver]);

  // game loop
  useEffect(() => {
    if (gameOver) return;

    const intervalId = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = {
          x: head.x + direction.x,
          y: head.y + direction.y
        };

        // wall collision
        if (
          newHead.x < 0 ||
          newHead.x >= BOARD_SIZE ||
          newHead.y < 0 ||
          newHead.y >= BOARD_SIZE
        ) {
          setGameOver(true);
          return prevSnake;
        }

        // self collision
        const hitSelf = prevSnake.some(
          (seg) => seg.x === newHead.x && seg.y === newHead.y
        );
        if (hitSelf) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // food
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((prev) => prev + 1);
          setFood(getRandomFood(newSnake));
          return newSnake; // grow
        } else {
          newSnake.pop();
          return newSnake;
        }
      });
    }, speed);

    return () => clearInterval(intervalId);
  }, [direction, food, speed, gameOver]);

  const handleRestart = () => {
    const initialSnake = [{ x: 10, y: 10 }];
    setSnake(initialSnake);
    setDirection({ x: 1, y: 0 });
    setFood(getRandomFood(initialSnake));
    setGameOver(false);
    setScore(0); // <-- reset apples collected
  };

  const handleExit = () => {
    navigate(DASHBOARD_ROUTE);
  };

  const boardStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${BOARD_SIZE}, 20px)`,
    gridTemplateRows: `repeat(${BOARD_SIZE}, 20px)`,
    background: '#111827',
    border: '4px solid #4b5563',
    borderRadius: '8px',
    boxShadow: '0 0 20px rgba(0,0,0,0.5)'
  };

  const cellStyleBase = {
    width: '20px',
    height: '20px',
    boxSizing: 'border-box'
  };

  const snakeCells = new Set(snake.map((seg) => `${seg.x},${seg.y}`));
  const head = snake[0];

  const cells = [];
  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      const key = `${x}-${y}`;
      const isHead = head.x === x && head.y === y;
      const isSnake = snakeCells.has(`${x},${y}`);
      const isFood = food.x === x && food.y === y;

      let background = '#020617';
      let border = '1px solid #0f172a';

      if (isSnake) {
        background = isHead ? '#22c55e' : '#16a34a';
        border = '1px solid #14532d';
      } else if (isFood) {
        background = '#ef4444';
        border = '1px solid #7f1d1d';
      }

      cells.push(
        <div
          key={key}
          style={{
            ...cellStyleBase,
            background,
            border
          }}
        />
      );
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top, #0f172a 0, #020617 50%, #000 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: '1rem',
        gap: '1rem',
        position: 'relative'
      }}
    >
      {/* Exit (X) button to go back to dashboard */}
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
        🐍 Cyber-Snake Arena
      </h1>
      <p style={{ opacity: 0.8, marginBottom: '0.5rem' }}>
        Collect <strong>{WIN_SCORE}</strong> apples to complete your training.<br />
        Use <strong>Arrow keys</strong> or <strong>W/A/S/D</strong> to move.
      </p>

      <div style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>
        Apples: <strong>{score}</strong> / {WIN_SCORE}
      </div>

      <div style={boardStyle}>{cells}</div>

      {gameOver && score < WIN_SCORE && (
        <div
          style={{
            marginTop: '1rem',
            padding: '0.75rem 1.25rem',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(248, 113, 113, 0.8)',
            borderRadius: '8px',
            textAlign: 'center'
          }}
        >
          <div style={{ marginBottom: '0.5rem' }}>💀 Game Over!</div>
          <button
            onClick={handleRestart}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '999px',
              border: 'none',
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Restart
          </button>
        </div>
      )}

      {!gameOver && score < WIN_SCORE && (
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
          Reset Game
        </button>
      )}
    </div>
  );
}
