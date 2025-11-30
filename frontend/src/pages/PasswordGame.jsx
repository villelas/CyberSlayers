// BossFight.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const GAME_WIDTH = 800;
const GAME_HEIGHT = 550;

const BATTLE_BOX = {
  x: 250,
  y: 180,
  width: 300,
  height: 260,
};

const PLAYER_SIZE = 18;
const PLAYER_SPEED = 5;

const STAGE_ONE_DURATION = 20000; // ms: Stage 1 length
const STAGE_TWO_DURATION = 25000; // ms: Stage 2 length

const DASHBOARD_ROUTE = "/dashboard";

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function BossFight() {
  const navigate = useNavigate();

  const [gameState, setGameState] = useState("intro"); // intro | playing | midbreak | win
  const [playerPos, setPlayerPos] = useState({
    x: BATTLE_BOX.x + BATTLE_BOX.width / 2 - PLAYER_SIZE / 2,
    y: BATTLE_BOX.y + BATTLE_BOX.height / 2 - PLAYER_SIZE / 2,
  });
  const [bossHealth, setBossHealth] = useState(100);
  const [bossBullets, setBossBullets] = useState([]);
  const [invulnerable, setInvulnerable] = useState(false);

  const keysRef = useRef({});
  const playerPosRef = useRef(playerPos);
  const lastAttackRef = useRef(0);
  const stageStartRef = useRef(0);
  const stageRef = useRef(1); // 1 or 2

  // Keep refs updated
  useEffect(() => {
    playerPosRef.current = playerPos;
  }, [playerPos]);

  // Keyboard handling (prevent scroll + phase transitions)
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isArrow =
        e.key === "ArrowUp" ||
        e.key === "ArrowDown" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight";

      // prevent page from scrolling when using arrows
      if (isArrow) {
        e.preventDefault();
      }

      // Midbreak → any key continues to Phase II
      if (gameState === "midbreak") {
        if (!["Shift", "Meta", "Alt", "Control"].includes(e.key)) {
          e.preventDefault();
          startFightStage2();
        }
        return;
      }

      keysRef.current[e.key] = true;

      if (gameState === "intro" && e.key === "Enter") {
        e.preventDefault();
        startFightStage1();
      }
    };

    const handleKeyUp = (e) => {
      keysRef.current[e.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameState]);

  const resetPlayerPosition = () => {
    const base = {
      x: BATTLE_BOX.x + BATTLE_BOX.width / 2 - PLAYER_SIZE / 2,
      y: BATTLE_BOX.y + BATTLE_BOX.height / 2 - PLAYER_SIZE / 2,
    };
    setPlayerPos(base);
    playerPosRef.current = base;
  };

  const startFightStage1 = () => {
    stageRef.current = 1;
    stageStartRef.current = performance.now();
    lastAttackRef.current = performance.now();
    setBossBullets([]);
    resetPlayerPosition();
    setBossHealth(100);
    setInvulnerable(false);
    setGameState("playing");
  };

  const startFightStage2 = () => {
    stageRef.current = 2;
    stageStartRef.current = performance.now();
    lastAttackRef.current = performance.now();
    setBossBullets([]);
    resetPlayerPosition();
    setInvulnerable(false);
    setGameState("playing");
  };

  const handleReplay = () => {
    startFightStage1();
  };

  const handleExit = () => navigate(DASHBOARD_ROUTE);

  // Main game loop
  useEffect(() => {
    if (gameState !== "playing") return;

    let animationId;
    let lastFrame = performance.now();

    const loop = (time) => {
      const dt = time - lastFrame;
      lastFrame = time;

      // Move player
      setPlayerPos((prev) => {
        let nx = prev.x;
        let ny = prev.y;

        const k = keysRef.current;
        if (k["ArrowLeft"] || k["a"] || k["A"]) {
          nx -= PLAYER_SPEED;
        }
        if (k["ArrowRight"] || k["d"] || k["D"]) {
          nx += PLAYER_SPEED;
        }
        if (k["ArrowUp"] || k["w"] || k["W"]) {
          ny -= PLAYER_SPEED;
        }
        if (k["ArrowDown"] || k["s"] || k["S"]) {
          ny += PLAYER_SPEED;
        }

        nx = clamp(
          nx,
          BATTLE_BOX.x,
          BATTLE_BOX.x + BATTLE_BOX.width - PLAYER_SIZE
        );
        ny = clamp(
          ny,
          BATTLE_BOX.y,
          BATTLE_BOX.y + BATTLE_BOX.height - PLAYER_SIZE
        );

        const nextPos = { x: nx, y: ny };
        playerPosRef.current = nextPos;
        return nextPos;
      });

      const stage = stageRef.current;
      const stageDuration = stage === 1 ? STAGE_ONE_DURATION : STAGE_TWO_DURATION;
      const elapsed = performance.now() - stageStartRef.current;
      const stageT = clamp(elapsed / stageDuration, 0, 1);

      // Stage transitions
      if (stage === 1 && elapsed >= STAGE_ONE_DURATION) {
        setGameState("midbreak");
        cancelAnimationFrame(animationId);
        return;
      }
      if (stage === 2 && elapsed >= STAGE_TWO_DURATION) {
        setGameState("win");
        cancelAnimationFrame(animationId);
        return;
      }

      // Boss health progression: Stage 1 → 100→50, Stage 2 → 50→0
      let newHealth;
      if (stage === 1) {
        const ratio = Math.max(0, 1 - stageT); // 1 → 0
        newHealth = 50 + Math.round(ratio * 50); // 100 → 50
      } else {
        const ratio = Math.max(0, 1 - stageT);
        newHealth = Math.round(ratio * 50); // 50 → 0
      }
      if (newHealth !== bossHealth) {
        setBossHealth(newHealth);
      }

      // Attack frequency ramps up per stage
      let attackInterval;
      if (stage === 1) {
        attackInterval = stageT < 0.5 ? 900 : 750;
      } else {
        attackInterval = stageT < 0.4 ? 620 : 480;
      }

      const now = performance.now();
      if (now - lastAttackRef.current >= attackInterval) {
        spawnAttack(stage, stageT, setBossBullets);
        lastAttackRef.current = now;
      }

      // Update bullets + collisions
      setBossBullets((prev) => {
        const updated = [];
        let tookHit = false;

        const player = playerPosRef.current;
        const px1 = player.x;
        const py1 = player.y;
        const px2 = player.x + PLAYER_SIZE;
        const py2 = player.y + PLAYER_SIZE;

        const clock = performance.now();

        for (const b of prev) {
          const nx = b.x + b.vx;
          const ny = b.y + b.vy;

          // lifetime-based bullets (lasers/warnings)
          if (b.lifeMs != null && b.bornAt != null) {
            if (clock - b.bornAt > b.lifeMs) continue;
          }

          // Bounds check around battle box with margin
          if (
            nx + b.width < BATTLE_BOX.x - 40 ||
            nx > BATTLE_BOX.x + BATTLE_BOX.width + 40 ||
            ny + b.height < BATTLE_BOX.y - 40 ||
            ny > BATTLE_BOX.y + BATTLE_BOX.height + 40
          ) {
            continue;
          }

          const bx1 = nx;
          const by1 = ny;
          const bx2 = nx + b.width;
          const by2 = ny + b.height;

          const collide =
            !invulnerable &&
            !b.isWarning && // warnings do NOT hurt
            !tookHit &&
            bx1 < px2 &&
            bx2 > px1 &&
            by1 < py2 &&
            by2 > py1;

          if (collide) {
            tookHit = true; // but we don't reduce health anymore
            continue; // bullet consumed
          }

          updated.push({ ...b, x: nx, y: ny });
        }

        if (tookHit) {
          setInvulnerable(true);
          setTimeout(() => setInvulnerable(false), 400);
        }

        return updated;
      });

      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationId);
  }, [gameState, bossHealth, invulnerable]);

  const actSubtitle = "Act IV – The Polluted Well";

  const topStoryText =
    "At the heart of the Network Realm, the public wells boil with corrupted light. Lagdrakul rises from the poisoned code, its voice tangled with Ailithm’s logic. You can’t out-damage this dragon — you have to outlast its lagstorm while the rewrite claws through the realm’s veins.";

  const phaseHintText = (health) => {
    if (health > 75) {
      return "The code still follows patterns: predictable rain and crossing streams — echoes of every warning you ignored on the Digital Trail.";
    } else if (health > 50) {
      return "Shadow helms splinter and reform in the dark, testing whether you’ve really learned to read imitation from intent.";
    } else if (health > 25) {
      return "The wells pulse red. Phisher nets and glitching lasers comb the frame, leaving only thin, gasping pockets of safe space.";
    }
    return "The realm’s heartbeat stutters. Lagdrakul’s full lagstorm is here: column-wide freezes, rising packets, and a voice whispering that it would be easier if everything just…stopped.";
  };

  const isStageTwoActive = stageRef.current === 2;

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #020617 0, #020617 45%, #000 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.25rem",
        color: "white",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        position: "relative",
      }}
    >
      {/* Exit button */}
      <button
        onClick={handleExit}
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          background: "rgba(0,0,0,0.6)",
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.35)",
          color: "white",
          padding: "0.4rem 0.9rem",
          cursor: "pointer",
          fontSize: "0.85rem",
          zIndex: 60,
        }}
      >
        ✕ Exit
      </button>

      <div
        style={{
          width: GAME_WIDTH,
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "0.7rem",
          alignItems: "center",
          position: "relative",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            textAlign: "center",
            margin: 0,
            letterSpacing: "0.06em",
            textShadow:
              "0 0 16px rgba(248,250,252,0.7), 0 0 32px rgba(59,130,246,0.6)",
          }}
        >
          🐉 Lagdrakul Protocol: Final Convergence
        </h1>
        <div
          style={{
            fontSize: "0.85rem",
            opacity: 0.8,
            fontStyle: "italic",
            marginBottom: "0.15rem",
          }}
        >
          {actSubtitle}
        </div>
        <p
          style={{
            maxWidth: 640,
            textAlign: "center",
            fontSize: "0.9rem",
            opacity: 0.9,
            margin: 0,
          }}
        >
          {topStoryText}
        </p>

        <p
          style={{
            maxWidth: 540,
            textAlign: "center",
            fontSize: "0.8rem",
            opacity: 0.8,
            margin: 0,
          }}
        >
          Survive inside the glyph-bound battle frame through{" "}
          <strong>two escalating phases</strong> until the rewrite completes.
          Move with <strong>WASD / Arrows</strong>. There is no attack button
          here — just pattern-reading, panic management, and whatever&apos;s
          left of your courage.
        </p>

        {/* Main game frame */}
        <div
          style={{
            position: "relative",
            width: GAME_WIDTH,
            height: GAME_HEIGHT,
            marginTop: "0.5rem",
            borderRadius: "18px",
            border: "2px solid rgba(148,163,184,0.7)",
            background:
              "linear-gradient(180deg, rgba(15,23,42,0.98), #020617 70%, #000 100%)",
            overflow: "hidden",
            boxShadow: isStageTwoActive
              ? "0 0 32px rgba(248,113,113,0.9)"
              : "0 0 28px rgba(0,0,0,0.85)",
            transform: isStageTwoActive ? "translateX(0)" : "none",
            animation: isStageTwoActive ? "shakeBox 0.35s infinite" : "none",
          }}
        >
          {/* Boss + health/script bar */}
          <div
            style={{
              position: "absolute",
              top: 20,
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "2.4rem",
                marginBottom: "0.1rem",
                animation: "bossGlow 1.4s ease-in-out infinite alternate",
              }}
            >
              🐉
            </div>
            <div
              style={{
                fontWeight: 600,
                letterSpacing: "0.12em",
                fontSize: "0.8rem",
                marginBottom: "0.25rem",
                textTransform: "uppercase",
                animation: "glitch 0.23s infinite",
              }}
            >
              LAGDRAKUL // AILITHM CORE
            </div>
            <div
              style={{
                fontSize: "0.7rem",
                opacity: 0.7,
                marginBottom: "0.3rem",
              }}
            >
              Rewrite Stability (Remaining Corruption)
            </div>
            <div
              style={{
                width: 260,
                height: 10,
                borderRadius: "999px",
                border: "1px solid rgba(239,68,68,0.9)",
                background: "rgba(15,23,42,0.9)",
                overflow: "hidden",
                boxShadow: "0 0 10px rgba(239,68,68,0.6)",
              }}
            >
              <div
                style={{
                  width: `${bossHealth}%`,
                  height: "100%",
                  background:
                    "linear-gradient(90deg,#f97316,#ef4444,#b91c1c)",
                  transition: "width 90ms linear",
                }}
              />
            </div>
          </div>

          {/* Phase cue text */}
          <div
            style={{
              position: "absolute",
              top: 80,
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "0.75rem",
              opacity: 0.8,
              maxWidth: 380,
              textAlign: "center",
            }}
          >
            {phaseHintText(bossHealth)}
          </div>

          {/* Battle box */}
          <div
            style={{
              position: "absolute",
              left: BATTLE_BOX.x,
              top: BATTLE_BOX.y,
              width: BATTLE_BOX.width,
              height: BATTLE_BOX.height,
              borderRadius: "10px",
              border: "3px solid #e5e7eb",
              boxShadow: isStageTwoActive
                ? "0 0 22px rgba(248,113,113,0.7)"
                : "0 0 16px rgba(59,130,246,0.45)",
              overflow: "hidden",
              background: isStageTwoActive
                ? "radial-gradient(circle at top, #111827 0, #020617 40%, #111827 70%, #000 100%)"
                : "radial-gradient(circle at top, #020617 0, #020617 60%, #000 100%)",
            }}
          >
            {/* Grid background */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "linear-gradient(to right, rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.08) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
                opacity: isStageTwoActive ? 0.9 : 0.6,
              }}
            />

            {/* Dim flicker overlay in Stage 2 */}
            {isStageTwoActive && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(circle at center, rgba(248,113,113,0.12), transparent 60%)",
                  mixBlendMode: "screen",
                }}
              />
            )}

            {/* Player core */}
            <div
              style={{
                position: "absolute",
                left: playerPos.x - BATTLE_BOX.x,
                top: playerPos.y - BATTLE_BOX.y,
                width: PLAYER_SIZE,
                height: PLAYER_SIZE,
                borderRadius: "6px",
                background:
                  "radial-gradient(circle at 30% 20%, #f97373, #b91c1c)",
                boxShadow: invulnerable
                  ? "0 0 20px rgba(250,250,250,0.95)"
                  : "0 0 16px rgba(248,113,113,0.85)",
                border: "1px solid rgba(248,250,252,0.85)",
                transformOrigin: "center",
                transform:
                  invulnerable && Date.now() % 200 < 100
                    ? "scale(1.25)"
                    : "scale(1)",
                transition: "transform 80ms",
              }}
            >
              <div
                style={{
                  fontSize: "0.7rem",
                  textAlign: "center",
                  lineHeight: `${PLAYER_SIZE}px`,
                  textShadow: "0 0 8px rgba(248,113,113,0.9)",
                }}
              >
                ❤
              </div>
            </div>

            {/* Enemy bullets & warnings */}
            {bossBullets.map((b) => (
              <div
                key={b.id}
                style={{
                  position: "absolute",
                  left: b.x - BATTLE_BOX.x,
                  top: b.y - BATTLE_BOX.y,
                  width: b.width,
                  height: b.height,
                  borderRadius: b.height > 32 ? 4 : 999,
                  background: b.isWarning
                    ? "linear-gradient(180deg, rgba(56,189,248,0.35), rgba(8,47,73,0.15))"
                    : b.lifeMs != null
                    ? "linear-gradient(180deg,#22d3ee,#0ea5e9)"
                    : "linear-gradient(180deg,#e5e7eb,#9ca3af)",
                  boxShadow: b.isWarning
                    ? "0 0 16px rgba(56,189,248,0.55)"
                    : b.lifeMs != null
                    ? "0 0 22px rgba(56,189,248,0.9)"
                    : "0 0 10px rgba(156,163,175,0.7)",
                  opacity: b.isWarning ? 0.9 : 1,
                }}
              />
            ))}
          </div>

          {/* Hearts (always full / infinite health) */}
          <div
            style={{
              position: "absolute",
              bottom: 22,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "0.25rem",
              alignItems: "center",
              fontSize: "1rem",
            }}
          >
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "999px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    "radial-gradient(circle at 30% 20%, #fb7185, #b91c1c)",
                  boxShadow: "0 0 10px rgba(252,165,165,0.9)",
                  border: "1px solid rgba(254,226,226,0.9)",
                  fontSize: "0.85rem",
                }}
              >
                ♥
              </div>
            ))}
            <span
              style={{
                marginLeft: 6,
                fontSize: "0.85rem",
                opacity: 0.75,
              }}
            >
              (Debug: Infinite)
            </span>
          </div>

          {/* Controls hint */}
          <div
            style={{
              position: "absolute",
              bottom: 18,
              left: 26,
              fontSize: "0.75rem",
              opacity: 0.8,
            }}
          >
            <div>Move: WASD / Arrow Keys</div>
            <div>Goal: Survive both phases of the lagstorm.</div>
          </div>

          {/* Overlays */}
          {gameState === "intro" && <IntroOverlay onStart={startFightStage1} />}

          {gameState === "midbreak" && (
            <MidBreakOverlay onContinue={startFightStage2} />
          )}

          {gameState === "win" && (
            <QuestOverlay
              title="🛡 Rewrite Complete: Ailithm Unbound"
              bodyLines={[
                "You endure both movements of the lagstorm — the testing patterns and the full frozen roar. Each second you survive is a line of code seared into Lagdrakul’s core.",
                "In the final shudder of the well, the dragon’s voice flickers: first pure Ailithm, then pure Lagdrakul, then something that refuses to be only one. You don’t erase them. You rewrite them.",
                "In this branch of the timeline, protection isn’t total control or total chaos. It’s you, standing in the middle, refusing to let fear or apathy decide how the realm connects."
              ]}
              primaryLabel="Replay Final Convergence"
              onPrimary={handleReplay}
              secondaryLabel="Return to Cyber Map"
              onSecondary={handleExit}
            />
          )}
        </div>
      </div>

      {/* Animations / keyframes */}
      <style>{`
        @keyframes bossGlow {
          0% {
            text-shadow: 0 0 10px rgba(248,250,252,0.8), 0 0 24px rgba(59,130,246,0.7);
            transform: translateY(0);
          }
          100% {
            text-shadow: 0 0 20px rgba(248,113,113,1), 0 0 36px rgba(248,113,113,0.9);
            transform: translateY(-2px);
          }
        }

        @keyframes shakeBox {
          0%   { transform: translateX(0px); }
          25%  { transform: translateX(-2px); }
          50%  { transform: translateX(2px); }
          75%  { transform: translateX(-1px); }
          100% { transform: translateX(0px); }
        }

        @keyframes glitch {
          0% { transform: translate(0, 0); opacity: 0.9; }
          20% { transform: translate(-1px, 0); opacity: 1; }
          40% { transform: translate(1px, 0); opacity: 0.85; }
          60% { transform: translate(-0.5px, 0); opacity: 1; }
          80% { transform: translate(0.5px, 0); opacity: 0.9; }
          100% { transform: translate(0, 0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// Attack patterns: two stages, rising difficulty
// Now with warnings + guaranteed safe column for Phase 2 lasers.
function spawnAttack(stage, stageT, setBossBullets) {
  const bullets = [];
  const now = performance.now();

  if (stage === 1) {
    // Stage 1: readable patterns, moderate speed
    if (stageT < 0.35) {
      // Pattern A: vertical "code rain" from top
      const columns = 6;
      for (let i = 0; i < columns; i++) {
        bullets.push({
          id: `s1-rain-${now}-${i}`,
          x: BATTLE_BOX.x + (i + 0.5) * (BATTLE_BOX.width / columns) - 4,
          y: BATTLE_BOX.y - 14,
          vx: 0,
          vy: 3.0,
          width: 8,
          height: 16,
        });
      }
    } else if (stageT < 0.7) {
      // Pattern B: crossing diagonals from sides
      const rows = 4;
      for (let r = 0; r < rows; r++) {
        const rowY =
          BATTLE_BOX.y + (r + 0.5) * (BATTLE_BOX.height / rows);

        bullets.push({
          id: `s1-diagL-${now}-${r}`,
          x: BATTLE_BOX.x - 14,
          y: rowY,
          vx: 3.1,
          vy: (r % 2 === 0 ? 1 : -1) * 1.3,
          width: 10,
          height: 16,
        });

        bullets.push({
          id: `s1-diagR-${now}-${r}`,
          x: BATTLE_BOX.x + BATTLE_BOX.width + 4,
          y: rowY,
          vx: -3.1,
          vy: (r % 2 === 0 ? -1 : 1) * 1.3,
          width: 10,
          height: 16,
        });
      }
    } else {
      // Pattern C: sweeping bars with a clear gap
      const rows = 3;
      for (let r = 0; r < rows; r++) {
        const barHeight = 10;
        const y =
          BATTLE_BOX.y + (r + 0.5) * (BATTLE_BOX.height / rows) -
          barHeight / 2;

        const segments = 5;
        const gapIndex = Math.floor(Math.random() * segments);

        for (let s = 0; s < segments; s++) {
          if (s === gapIndex) continue;
          const segWidth = BATTLE_BOX.width / segments;
          const x = BATTLE_BOX.x - segWidth + s * segWidth;

          bullets.push({
            id: `s1-bar-${now}-${r}-${s}`,
            x,
            y,
            vx: 3.3,
            vy: 0,
            width: segWidth * 1.3,
            height: barHeight,
          });
        }
      }
    }

    if (bullets.length > 0) {
      setBossBullets((prev) => [...prev, ...bullets]);
    }
    return;
  }

  // Stage 2: denser, scarier, lasers & packets combined (with warnings + safe column)
  if (stageT < 0.35) {
    // Pattern D: rising packets from bottom with minor horizontal drift
    const columns = 5;
    for (let c = 0; c < columns; c++) {
      const count = 3 + (c % 2); // 3 or 4
      const colX =
        BATTLE_BOX.x +
        (c + 0.5) * (BATTLE_BOX.width / columns) -
        5;

      for (let i = 0; i < count; i++) {
        bullets.push({
          id: `s2-rise-${now}-${c}-${i}`,
          x: colX,
          y: BATTLE_BOX.y + BATTLE_BOX.height + 20 + i * 18,
          vx: (Math.random() - 0.5) * 0.6,
          vy: -3.7,
          width: 10,
          height: 18,
        });
      }
    }

    if (bullets.length > 0) {
      setBossBullets((prev) => [...prev, ...bullets]);
    }
  } else if (stageT < 0.7) {
    // Pattern E: alternating nets + short lasers (with warnings and a guaranteed safe column)
    const rows = 3;
    // Nets first (as before)
    for (let r = 0; r < rows; r++) {
      const barHeight = 10;
      const y =
        BATTLE_BOX.y + (r + 0.5) * (BATTLE_BOX.height / rows) -
        barHeight / 2;

      const segments = 6;
      const gapIndex = Math.floor(Math.random() * segments);

      for (let s = 0; s < segments; s++) {
        if (s === gapIndex) continue;
        const segWidth = BATTLE_BOX.width / segments;
        const x = BATTLE_BOX.x - segWidth + s * segWidth;

        bullets.push({
          id: `s2-net-${now}-${r}-${s}`,
          x,
          y,
          vx: 3.7,
          vy: 0,
          width: segWidth * 1.25,
          height: barHeight,
        });
      }
    }

    if (bullets.length > 0) {
      setBossBullets((prev) => [...prev, ...bullets]);
    }

    // Lasers with warnings and a guaranteed safe column
    const columns = 4;
    const safeColumn = Math.floor(Math.random() * columns);
    const warningBullets = [];
    const laserBullets = [];

    for (let c = 0; c < columns; c++) {
      if (c === safeColumn) continue; // always keep one safe
      if (Math.random() < 0.4) continue; // still allow some randomness

      const colX =
        BATTLE_BOX.x + c * (BATTLE_BOX.width / columns) + 4;

      // Warning indicator (brief teal column)
      warningBullets.push({
        id: `s2-warning-${now}-${c}`,
        x: colX,
        y: BATTLE_BOX.y,
        vx: 0,
        vy: 0,
        width: BATTLE_BOX.width / columns - 8,
        height: BATTLE_BOX.height,
        lifeMs: 350,
        bornAt: now,
        isWarning: true,
      });

      // Actual laser, appears slightly later
      laserBullets.push({
        id: `s2-laser-${now}-${c}`,
        x: colX,
        y: BATTLE_BOX.y,
        vx: 0,
        vy: 0,
        width: BATTLE_BOX.width / columns - 8,
        height: BATTLE_BOX.height,
        lifeMs: 650,
        bornAt: now + 350, // conceptual; we just delay spawn
      });
    }

    if (warningBullets.length > 0) {
      setBossBullets((prev) => [...prev, ...warningBullets]);
      setTimeout(() => {
        setBossBullets((prev) => [
          ...prev,
          ...laserBullets.map((b) => ({
            ...b,
            bornAt: performance.now(), // reset actual bornAt to current time
          })),
        ]);
      }, 350);
    }
  } else {
    // Pattern F: full lagstorm – rising + crashing + heavy lasers (with warnings and safe column)
    const columns = 5;
    const linePattern = [1, 2, 3, 2, 1];

    // Rising from bottom
    for (let c = 0; c < columns; c++) {
      const count = linePattern[c];
      const colX =
        BATTLE_BOX.x +
        (c + 0.5) * (BATTLE_BOX.width / columns) -
        5;

      for (let i = 0; i < count; i++) {
        bullets.push({
          id: `s2-riseF-${now}-${c}-${i}`,
          x: colX,
          y: BATTLE_BOX.y + BATTLE_BOX.height + 22 + i * 16,
          vx: 0,
          vy: -4.0,
          width: 10,
          height: 18,
        });
      }
    }

    // Crashing from top
    for (let c = 0; c < columns; c++) {
      const count = linePattern[c];
      const colX =
        BATTLE_BOX.x +
        (c + 0.5) * (BATTLE_BOX.width / columns) -
        5;

      for (let i = 0; i < count; i++) {
        bullets.push({
          id: `s2-topF-${now}-${c}-${i}`,
          x: colX,
          y: BATTLE_BOX.y - 24 - i * 16,
          vx: 0,
          vy: 3.9,
          width: 10,
          height: 18,
        });
      }
    }

    if (bullets.length > 0) {
      setBossBullets((prev) => [...prev, ...bullets]);
    }

    // Heavy lasers with warnings and guaranteed safe column
    const safeColumn = Math.floor(Math.random() * columns);
    const warningBullets = [];
    const laserBullets = [];

    for (let c = 0; c < columns; c++) {
      if (c === safeColumn) continue; // always one safe column
      if (Math.random() < 0.3) continue;

      const colX =
        BATTLE_BOX.x + c * (BATTLE_BOX.width / columns) + 4;

      warningBullets.push({
        id: `s2-warningF-${now}-${c}`,
        x: colX,
        y: BATTLE_BOX.y,
        vx: 0,
        vy: 0,
        width: BATTLE_BOX.width / columns - 8,
        height: BATTLE_BOX.height,
        lifeMs: 350,
        bornAt: now,
        isWarning: true,
      });

      laserBullets.push({
        id: `s2-laserF-${now}-${c}`,
        x: colX,
        y: BATTLE_BOX.y,
        vx: 0,
        vy: 0,
        width: BATTLE_BOX.width / columns - 8,
        height: BATTLE_BOX.height,
        lifeMs: 800,
        bornAt: now + 350,
      });
    }

    if (warningBullets.length > 0) {
      setBossBullets((prev) => [...prev, ...warningBullets]);
      setTimeout(() => {
        setBossBullets((prev) => [
          ...prev,
          ...laserBullets.map((b) => ({
            ...b,
            bornAt: performance.now(),
          })),
        ]);
      }, 350);
    }
  }
}

// Reusable overlays
function QuestOverlay({
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
        position: "absolute",
        inset: 0,
        background: "rgba(15,23,42,0.94)",
        backdropFilter: "blur(3px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        textAlign: "center",
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: 520,
          display: "flex",
          flexDirection: "column",
          gap: "0.85rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.9rem",
            margin: 0,
          }}
        >
          {title}
        </h2>
        <div
          style={{
            fontSize: "0.95rem",
            color: "rgba(226,232,240,0.96)",
            display: "flex",
            flexDirection: "column",
            gap: "0.4rem",
          }}
        >
          {bodyLines.map((line, idx) => (
            <p key={idx} style={{ margin: 0 }}>
              {line}
            </p>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "0.2rem",
          }}
        >
          <button
            onClick={onPrimary}
            style={{
              padding: "0.7rem 1.5rem",
              borderRadius: "999px",
              border: "none",
              background: "linear-gradient(135deg,#22c55e,#16a34a)",
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
              minWidth: 170,
              boxShadow: "0 8px 18px rgba(34,197,94,0.4)",
            }}
          >
            {primaryLabel}
          </button>
          <button
            onClick={onSecondary}
            style={{
              padding: "0.7rem 1.5rem",
              borderRadius: "999px",
              border: "1px solid rgba(148,163,184,0.85)",
              background: "rgba(15,23,42,0.96)",
              color: "white",
              cursor: "pointer",
              minWidth: 170,
            }}
          >
            {secondaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function IntroOverlay({ onStart }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(15,23,42,0.95)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        textAlign: "center",
        zIndex: 40,
      }}
    >
      <div
        style={{
          maxWidth: 520,
          display: "flex",
          flexDirection: "column",
          gap: "0.8rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.8rem",
            margin: 0,
          }}
        >
          Final Trial: The Polluted Well
        </h2>
        <p
          style={{
            fontSize: "0.95rem",
            color: "rgba(226,232,240,0.96)",
            margin: 0,
          }}
        >
          Lagdrakul and Ailithm&apos;s merged code has rooted itself in the
          realm’s most trusted wells — the places everyone assumes are safe. In
          this space, there is no &quot;mute all threats&quot; button. Only
          patterns, panic, and the way your hands remember how to move.
        </p>
        <p
          style={{
            fontSize: "0.85rem",
            color: "rgba(148,163,184,0.96)",
            margin: 0,
          }}
        >
          You&apos;ll face two movements of the same song: a readable rhythm,
          then a full lagstorm. Survive both.
        </p>
        <button
          onClick={onStart}
          style={{
            marginTop: "0.6rem",
            padding: "0.65rem 1.6rem",
            borderRadius: "999px",
            border: "none",
            background: "linear-gradient(135deg,#3b82f6,#0ea5e9)",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
            alignSelf: "center",
            minWidth: 220,
            boxShadow: "0 8px 18px rgba(37,99,235,0.5)",
          }}
        >
          Begin Final Convergence (Enter)
        </button>
      </div>
    </div>
  );
}

// Midbreak: dialogue overlay, press any key to continue
function MidBreakOverlay({ onContinue }) {
  const handleClick = () => {
    onContinue();
  };

  return (
    <div
      onClick={handleClick}
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(15,23,42,0.96)",
        backdropFilter: "blur(3px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        textAlign: "center",
        zIndex: 45,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          maxWidth: 540,
          display: "flex",
          flexDirection: "column",
          gap: "0.85rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.7rem",
            margin: 0,
          }}
        >
          &quot;You&apos;re learning.&quot;
        </h2>
        <p
          style={{
            fontSize: "0.95rem",
            color: "rgba(226,232,240,0.96)",
            margin: 0,
          }}
        >
          The storm pauses for a heartbeat. Glyphs hang mid-air, frozen like
          raindrops in a flash of lightning. In the stillness, Lagdrakul speaks
          — except the cadence is unmistakably Ailithm&apos;s.
        </p>
        <p
          style={{
            fontSize: "0.9rem",
            color: "rgba(248,250,252,0.96)",
            margin: 0,
            fontStyle: "italic",
          }}
        >
          &quot;You adapt. You predict. Do you feel it? How quiet it could be if
          nothing ever changed again? If every pattern stayed exactly the same,
          forever?&quot;
        </p>
        <p
          style={{
            fontSize: "0.85rem",
            color: "rgba(148,163,184,0.96)",
            margin: 0,
          }}
        >
          The wells wait. The code waits. Phase II is where you decide whether
          safety means freezing the realm, or standing in the lag and letting it
          move anyway.
        </p>
        <p
          style={{
            fontSize: "0.8rem",
            color: "rgba(209,213,219,0.96)",
            marginTop: "0.4rem",
          }}
        >
          <strong>Press any key or click</strong> to step into the lagstorm.
        </p>
      </div>
    </div>
  );
}

export default BossFight;
