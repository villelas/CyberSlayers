// SnakeGame.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const BOARD_SIZE = 12;
const WIN_SCORE = 12;
const DASHBOARD_ROUTE = "/dashboard";
const TICK_SPEED = 180; // slower than before

// This forge run is an early-game module; adjust if needed.
const GAME_NUM_FOR_STORY = 2;

// Armor stages: how many ingots needed to "forge" each piece
const ARMOR_STAGES = [
  { label: "Helm", threshold: 3 },
  { label: "Chestplate", threshold: 6 },
  { label: "Gauntlets", threshold: 9 },
  { label: "Greaves", threshold: 12 },
];

function getRandomFood() {
  const x = Math.floor(Math.random() * BOARD_SIZE);
  const y = Math.floor(Math.random() * BOARD_SIZE);
  return { x, y };
}

const getCenter = () => {
  const c = Math.floor(BOARD_SIZE / 2);
  return { x: c, y: c };
};

// Side panel showing forged armor progress
function ArmorMeter({ score }) {
  const totalStages = ARMOR_STAGES.length;
  const filledStages = ARMOR_STAGES.filter((s) => score >= s.threshold).length;

  return (
    <div
      style={{
        minWidth: "190px",
        padding: "0.9rem 1rem",
        borderRadius: "12px",
        border: "1px solid rgba(148,163,184,0.6)",
        background:
          "radial-gradient(circle at top, rgba(15,23,42,0.95), rgba(2,6,23,0.95))",
        boxShadow: "0 0 18px rgba(15,23,42,0.9)",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: "0.5rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "0.25rem",
        }}
      >
        <span style={{ fontSize: "1.9rem" }}>🛡</span>
        <div style={{ fontSize: "0.9rem", lineHeight: 1.2 }}>
          <div style={{ fontWeight: "600" }}>Forge Armor</div>
          <div style={{ opacity: 0.75 }}>
            {filledStages}/{totalStages} pieces forged
          </div>
        </div>
      </div>

      <div
        style={{
          height: "4px",
          borderRadius: "999px",
          overflow: "hidden",
          background: "rgba(30,64,175,0.65)",
          marginBottom: "0.25rem",
        }}
      >
        <div
          style={{
            width: `${Math.min(score / WIN_SCORE, 1) * 100}%`,
            height: "100%",
            background: "linear-gradient(90deg, #22c55e, #a3e635)",
            transition: "width 150ms linear",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.35rem",
          fontSize: "0.8rem",
        }}
      >
        {ARMOR_STAGES.map((piece, index) => {
          const filled = score >= piece.threshold;
          return (
            <div
              key={piece.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                opacity: filled ? 1 : 0.5,
                transform: filled ? "translateX(2px)" : "none",
                transition: "opacity 150ms ease, transform 150ms ease",
              }}
            >
              <div
                style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "4px",
                  border: "1px solid rgba(148,163,184,0.85)",
                  background: filled
                    ? "linear-gradient(135deg,#22c55e,#a3e635)"
                    : "transparent",
                  boxShadow: filled
                    ? "0 0 8px rgba(34,197,94,0.85)"
                    : "none",
                }}
              />
              <span>
                {index + 1}. {piece.label}
              </span>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: "0.25rem",
          fontSize: "0.75rem",
          opacity: 0.6,
        }}
      >
        Each ingot ⚒⛁ strengthens your forged armor.
      </div>
    </div>
  );
}

export default function SnakeGame() {
  const navigate = useNavigate();

  const [snakeHead, setSnakeHead] = useState(getCenter);
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [food, setFood] = useState(getRandomFood);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState("playing"); // 'playing' | 'win'

  // Guard against double-scoring if two ticks happen on the same food
  const justAteRef = useRef(false);

  // Unified movement controls (with scroll prevention)
  useEffect(() => {
    if (gameState === "win") return; // pause controls on win

    const handleKeyDown = (e) => {
      // Stop arrow keys from scrolling the page
      if (
        e.key === "ArrowUp" ||
        e.key === "ArrowDown" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight"
      ) {
        e.preventDefault();
      }

      if (gameOver) return;

      if ((e.key === "ArrowUp" || e.key === "w") && direction.y !== 1)
        setDirection({ x: 0, y: -1 });
      else if ((e.key === "ArrowDown" || e.key === "s") && direction.y !== -1)
        setDirection({ x: 0, y: 1 });
      else if ((e.key === "ArrowLeft" || e.key === "a") && direction.x !== 1)
        setDirection({ x: -1, y: 0 });
      else if ((e.key === "ArrowRight" || e.key === "d") && direction.x !== -1)
        setDirection({ x: 1, y: 0 });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction, gameOver, gameState]);

  // Game loop
  useEffect(() => {
    if (gameOver || gameState === "win") return;

    const intervalId = setInterval(() => {
      setSnakeHead((prev) => {
        const newHead = { x: prev.x + direction.x, y: prev.y + direction.y };

        // Wall collision
        if (
          newHead.x < 0 ||
          newHead.x >= BOARD_SIZE ||
          newHead.y < 0 ||
          newHead.y >= BOARD_SIZE
        ) {
          setGameOver(true);
          return prev;
        }

        const isEating = newHead.x === food.x && newHead.y === food.y;

        // Food collection: only allow a single +1 per ingot even if
        // multiple ticks try to process this position.
        if (isEating && !justAteRef.current) {
          justAteRef.current = true;
          setScore((prevScore) => prevScore + 1);
          setFood(getRandomFood());
        } else if (!isEating) {
          // Reset guard when snake moves away from food tile
          justAteRef.current = false;
        }

        return newHead;
      });
    }, TICK_SPEED);

    return () => clearInterval(intervalId);
  }, [direction, food, gameOver, gameState]);

  // Win condition → trigger overlay when full set is forged
  useEffect(() => {
    if (!gameOver && gameState !== "win" && score >= WIN_SCORE) {
      setGameState("win");
    }
  }, [score, gameOver, gameState]);

  const handleRestart = () => {
    setSnakeHead(getCenter());
    setDirection({ x: 1, y: 0 });
    setFood(getRandomFood());
    setGameOver(false);
    setScore(0);
    justAteRef.current = false;
    setGameState("playing");
  };

  // Exit helper, optionally marking a successful completion for the dashboard
  const handleExit = (isSuccessful = false) => {
    if (isSuccessful) {
      try {
        localStorage.setItem(
          "cyberslayers_last_completed_game",
          String(GAME_NUM_FOR_STORY)
        );
        localStorage.setItem(
          "cyberslayers_last_completion_status",
          "success"
        );
      } catch (e) {
        // fail silently
      }
    }

    navigate(DASHBOARD_ROUTE);
  };

  // Layout
  const boardStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${BOARD_SIZE}, 44px)`,
    gridTemplateRows: `repeat(${BOARD_SIZE}, 44px)`,
    background: "#020617",
    padding: "6px",
    border: "4px solid #4b5563",
    borderRadius: "12px",
    boxShadow: "0 0 24px rgba(0,0,0,0.7)",
  };

  const cellStyleBase = {
    width: "44px",
    height: "44px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "36px", // bigger sprites
    userSelect: "none",
  };

  const cells = [];
  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      const isHead = snakeHead.x === x && snakeHead.y === y;
      const isFood = food.x === x && food.y === y;

      cells.push(
        <div key={`${x}-${y}`} style={cellStyleBase}>
          {isHead ? "⚒" : isFood ? "⛁" : ""}
        </div>
      );
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #0f172a 0, #020617 50%, #000 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        padding: "1rem",
        gap: "1rem",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        position: "relative",
      }}
    >
      {/* Exit button */}
      <button
        onClick={() => handleExit(false)}
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          background: "rgba(0,0,0,0.6)",
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.3)",
          color: "white",
          padding: "0.4rem 0.7rem",
          cursor: "pointer",
        }}
      >
        ✕ Exit
      </button>

      <h1 style={{ fontSize: "2rem" }}>⚒ Cyber Forge Run</h1>
      <p style={{ opacity: 0.8, textAlign: "center", maxWidth: "480px" }}>
        In a hidden corner of the Network Realm, Te-Qwuiz keeps an ancient
        forge humming beneath the code. Guide your hammer through the glowing
        grid, collecting <strong>{WIN_SCORE}</strong> enchanted ingots to forge
        your first full set of armor. Every ingot makes you a little harder for
        Lagdrakul&apos;s corruption to crack.
      </p>

      <div style={{ fontSize: "1.15rem", marginBottom: "0.3rem" }}>
        Ingots: <strong>{score}</strong> / {WIN_SCORE}
      </div>

      {/* Game board (left) + armor meter (right) */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "1.5rem",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "nowrap", // keep them side-by-side
        }}
      >
        <div style={boardStyle}>{cells}</div>
        <ArmorMeter score={score} />
      </div>

      {gameOver && gameState !== "win" && (
        <div
          style={{
            marginTop: "1rem",
            padding: "0.75rem 1.25rem",
            background: "rgba(239, 68, 68, 0.15)",
            border: "1px solid rgba(248, 113, 113, 0.8)",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          💀 You crashed in the forge!
          <br />
          <button
            onClick={handleRestart}
            style={{
              marginTop: "0.6rem",
              padding: "0.5rem 1rem",
              borderRadius: "999px",
              border: "none",
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Restart
          </button>
        </div>
      )}

      {/* Closing module / win overlay */}
      {gameState === "win" && (
        <QuestCompleteOverlay
          title="🛡 Armor Forged to Completion!"
          bodyLines={[
            `You gathered all ${WIN_SCORE} ingots and tempered each one in Te-Qwuiz's hidden forge.`,
            "Your helm, chestplate, gauntlets, and greaves now hum with warding runes — every careless rune and shadow helm will have a harder time cutting through your defenses.",
            "This was only your first trial, but the Realm already feels a little safer with your armor online.",
          ]}
          primaryLabel="Run the Forge Again"
          onPrimary={handleRestart}
          secondaryLabel="Return to Cyber Map"
          // Mark this game as successfully completed for the dashboard story system
          onSecondary={() => handleExit(true)}
        />
      )}
    </div>
  );
}

/**
 * Reusable: QuestCompleteOverlay
 * -------------------------------------------
 * Same pattern as the Shadow Helms game.
 * Use for other minigames by passing:
 * - title: string
 * - bodyLines: string[]
 * - primaryLabel, onPrimary
 * - secondaryLabel, onSecondary
 */
function QuestCompleteOverlay({
  title,
  bodyLines,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.94)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        textAlign: "center",
        zIndex: 9999,
      }}
    >
      <h2 style={{ fontSize: "1.9rem", marginBottom: "0.75rem" }}>{title}</h2>

      <div
        style={{
          maxWidth: 520,
          fontSize: "0.95rem",
          color: "rgba(226,232,240,0.95)",
          marginBottom: "1.25rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.4rem",
        }}
      >
        {bodyLines.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>

      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <button
          onClick={onPrimary}
          style={{
            padding: "0.7rem 1.4rem",
            borderRadius: "999px",
            border: "none",
            background: "linear-gradient(135deg,#22c55e,#16a34a)",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
            minWidth: 150,
          }}
        >
          {primaryLabel}
        </button>
        <button
          onClick={onSecondary}
          style={{
            padding: "0.7rem 1.4rem",
            borderRadius: "999px",
            border: "1px solid rgba(148,163,184,0.8)",
            background: "rgba(15,23,42,0.9)",
            color: "white",
            cursor: "pointer",
            minWidth: 150,
          }}
        >
          {secondaryLabel}
        </button>
      </div>
    </div>
  );
}
