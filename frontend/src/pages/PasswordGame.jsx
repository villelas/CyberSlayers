// BossFight.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Lagdrakul2A from "../assets/Lagdrakul2A.png";

const GAME_WIDTH = 800;
const GAME_HEIGHT = 550;

const BATTLE_BOX = {
  x: 250,
  y: 180,
  width: 300,
  height: 260,
};

const PLAYER_SIZE = 18;
const PLAYER_SPEED = 2.5;

const STAGE_ONE_DURATION = 20000;
const STAGE_TWO_DURATION = 25000;
const DASHBOARD_ROUTE = "/dashboard";

const MAX_HEARTS = 40; // Hearts are now your actual HP

// This boss fight is thematically Act IV – The Polluted Well (Module 4).
// If you hook it to a different node on the map, update this number.
const GAME_NUM_FOR_STORY = 6;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

// Remember last chosen pattern per stage so we don't spam the same one
let lastStage1Pattern = null;
let lastStage2Pattern = null;

// Helper: apply hidden safe zone filter
function bulletInSafeZone(bullet, safeZone) {
  if (!safeZone) return false;
  const { x, y } = bullet;
  const bx2 = x + (bullet.width ?? 0);
  const by2 = y + (bullet.height ?? 0);
  const sx1 = safeZone.x;
  const sy1 = safeZone.y;
  const sx2 = safeZone.x + safeZone.width;
  const sy2 = safeZone.y + safeZone.height;
  return !(bx2 < sx1 || x > sx2 || by2 < sy1 || y > sy2);
}

function BossFight() {
  const navigate = useNavigate();

  const [gameState, setGameState] = useState("intro"); // intro | playing | midbreak | win | fail
  const [playerPos, setPlayerPos] = useState({
    x: BATTLE_BOX.x + BATTLE_BOX.width / 2 - PLAYER_SIZE / 2,
    y: BATTLE_BOX.y + BATTLE_BOX.height / 2 - PLAYER_SIZE / 2,
  });
  const [bossHealth, setBossHealth] = useState(100);
  const [bossBullets, setBossBullets] = useState([]);
  const [heartsRemaining, setHeartsRemaining] = useState(MAX_HEARTS);

  // Energy shields
  const [shields, setShields] = useState([]);
  const shieldsRef = useRef([]);
  const shieldInvulnUntilRef = useRef(0);
  const lastShieldSpawnRef = useRef(0);

  // NEW: brief invulnerability after taking damage (i-frames)
  const damageInvulnUntilRef = useRef(0);

  // Hidden safe zone (about 1/8th area of battle box, no bullets spawn here)
  const safeZoneRef = useRef(null);

  const keysRef = useRef({});
  const playerPosRef = useRef(playerPos);
  const lastAttackRef = useRef(0);
  const stageStartRef = useRef(0);
  const stageRef = useRef(1); // 1 or 2
  const finalPhaseRef = useRef(false); // true when boss HP < 5% in Stage 2

  // Keep refs updated
  useEffect(() => {
    playerPosRef.current = playerPos;
  }, [playerPos]);

  // Spawn a shield pickup somewhere inside the battle box
  const spawnShield = () => {
    const margin = 20;
    const radius = 12;
    const x =
      BATTLE_BOX.x + margin + Math.random() * (BATTLE_BOX.width - 2 * margin);
    const y =
      BATTLE_BOX.y + margin + Math.random() * (BATTLE_BOX.height - 2 * margin);

    const shield = {
      id: `shield-${performance.now()}-${Math.random()}`,
      x,
      y,
      radius,
    };
    const next = [...shieldsRef.current, shield];
    shieldsRef.current = next;
    setShields(next);
  };

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

  const resetShieldsAndSafeZone = () => {
    shieldsRef.current = [];
    setShields([]);
    shieldInvulnUntilRef.current = 0;
    lastShieldSpawnRef.current = performance.now();

    // Also clear damage invulnerability when resetting phase
    damageInvulnUntilRef.current = 0;

    // Hidden safe rectangle ≈ 1/8 of the battle box area
    const zoneWidth = BATTLE_BOX.width / 4; // width * height/2 = 1/8 area
    const zoneHeight = BATTLE_BOX.height / 2;
    const x = BATTLE_BOX.x + Math.random() * (BATTLE_BOX.width - zoneWidth);
    const y = BATTLE_BOX.y + Math.random() * (BATTLE_BOX.height - zoneHeight);
    safeZoneRef.current = { x, y, width: zoneWidth, height: zoneHeight };
  };

  const startFightStage1 = () => {
    stageRef.current = 1;
    stageStartRef.current = performance.now();
    lastAttackRef.current = performance.now();
    setBossBullets([]);
    resetPlayerPosition();
    setBossHealth(100);
    setHeartsRemaining(MAX_HEARTS); // reset HP for a new run
    resetShieldsAndSafeZone();
    finalPhaseRef.current = false;
    setGameState("playing");
  };

  const startFightStage2 = () => {
    stageRef.current = 2;
    stageStartRef.current = performance.now();
    lastAttackRef.current = performance.now();
    setBossBullets([]);
    resetPlayerPosition();
    resetShieldsAndSafeZone();
    finalPhaseRef.current = false;
    setGameState("playing");
  };

  const handleReplay = () => {
    startFightStage1();
  };

  // exit can optionally mark a successful completion for the dashboard story system
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
        // fail silently; navigation still happens
      }
    }

    navigate(DASHBOARD_ROUTE);
  };

  // Hearts as fail condition: when you run out, you fail the run
  useEffect(() => {
    if (gameState === "playing" && heartsRemaining <= 0) {
      setGameState("fail");
    }
  }, [heartsRemaining, gameState]);

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

        nx = clamp(nx, BATTLE_BOX.x, BATTLE_BOX.x + BATTLE_BOX.width - PLAYER_SIZE);
        ny = clamp(ny, BATTLE_BOX.y, BATTLE_BOX.y + BATTLE_BOX.height - PLAYER_SIZE);

        const nextPos = { x: nx, y: ny };
        playerPosRef.current = nextPos;
        return nextPos;
      });

      const stage = stageRef.current;
      const stageDuration = stage === 1 ? STAGE_ONE_DURATION : STAGE_TWO_DURATION;
      const elapsed = performance.now() - stageStartRef.current;
      const stageT = clamp(elapsed / stageDuration, 0, 1);

      // Boss health progression: Stage 1 → 100→50, Stage 2 → 50→0
      let newHealth;
      if (stage === 1) {
        const ratio = Math.max(0, 1 - stageT); // 1 → 0
        newHealth = 50 + Math.round(ratio * 50); // 100 → 50
      } else {
        const ratio = Math.max(0, 1 - stageT);
        newHealth = Math.round(ratio * 50); // 50 → 0
      }

      const now = performance.now();

      // Final "threat" phase: boss HP < 5% in Stage 2
      const isFinalThreatPhase = stage === 2 && newHealth <= 5;
      finalPhaseRef.current = isFinalThreatPhase;

      if (newHealth !== bossHealth) {
        setBossHealth(newHealth);
      }

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

      // Spawn shields regularly; a bit faster in Stage 2, cap total on screen
      const shieldInterval = stage === 1 ? 6000 : isFinalThreatPhase ? 3500 : 4500;
      if (
        now - lastShieldSpawnRef.current >= shieldInterval &&
        shieldsRef.current.length < 3
      ) {
        spawnShield();
        lastShieldSpawnRef.current = now;
      }

      // Player picking up shields → 1 sec of invulnerability
      if (shieldsRef.current.length > 0) {
        const player = playerPosRef.current;
        const pxCenter = player.x + PLAYER_SIZE / 2;
        const pyCenter = player.y + PLAYER_SIZE / 2;

        let changed = false;
        const remaining = [];
        for (const s of shieldsRef.current) {
          const dx = pxCenter - s.x;
          const dy = pyCenter - s.y;
          const distSq = dx * dx + dy * dy;
          const r = s.radius + PLAYER_SIZE * 0.4;
          if (distSq <= r * r) {
            // picked up
            shieldInvulnUntilRef.current = now + 1000; // 1 second
            changed = true;
          } else {
            remaining.push(s);
          }
        }
        if (changed) {
          shieldsRef.current = remaining;
          setShields(remaining);
        }
      }

      // Attack frequency:
      //  - Easier overall (slower patterns)
      //  - BUT in the final threat phase, go wild & fast (player is invincible then)
      let attackInterval;
      if (stage === 1) {
        attackInterval = stageT < 0.5 ? 1150 : 950; // slower than before
      } else {
        attackInterval = stageT < 0.4 ? 900 : 700; // slightly slower than before
      }
      if (isFinalThreatPhase) {
        attackInterval = 260; // insane chaos at the end
      }

      const extraPause = stage === 1 ? 160 : 120;
      const effectiveInterval = attackInterval + extraPause;

      if (now - lastAttackRef.current >= effectiveInterval) {
        spawnAttack(
          stage,
          stageT,
          setBossBullets,
          safeZoneRef.current,
          isFinalThreatPhase
        );
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
        const shieldInvulnActive = clock < shieldInvulnUntilRef.current;
        const damageInvulnActive = clock < damageInvulnUntilRef.current; // NEW
        const inFinalPhase = finalPhaseRef.current; // invincible here

        let shieldsChanged = false;
        let shieldArr = shieldsRef.current;

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

          // Lasers destroy shields (but warnings do not)
          if (b.isLaser && shieldArr.length > 0 && !b.isWarning) {
            const remainingShields = [];
            for (const s of shieldArr) {
              const sx1 = s.x - s.radius;
              const sy1 = s.y - s.radius;
              const sx2 = s.x + s.radius;
              const sy2 = s.y + s.radius;

              const shieldHit =
                bx1 < sx2 && bx2 > sx1 && by1 < sy2 && by2 > sy1;

              if (!shieldHit) {
                remainingShields.push(s);
              } else {
                shieldsChanged = true;
              }
            }
            shieldArr = remainingShields;
          }

          const collide =
            !b.isWarning && // warnings do NOT hurt
            !tookHit && // only one hit per frame
            !shieldInvulnActive && // energy shield invulnerability
            !damageInvulnActive && // NEW: post-hit i-frames
            !inFinalPhase && // final threat phase: player is invincible
            bx1 < px2 &&
            bx2 > px1 &&
            by1 < py2 &&
            by2 > py1;

          if (collide) {
            tookHit = true;
            // Grant ~0.5 seconds of damage immunity
            damageInvulnUntilRef.current = clock + 500;
            setHeartsRemaining((h) => (h > 0 ? h - 1 : 0));
            continue; // bullet consumed
          }

          updated.push({ ...b, x: nx, y: ny });
        }

        if (shieldsChanged) {
          shieldsRef.current = shieldArr;
          setShields(shieldArr);
        }

        return updated;
      });

      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationId);
  }, [gameState, bossHealth, heartsRemaining]);

  const actSubtitle = "Act IV – The Polluted Well";

  const topStoryText =
    "At the heart of the Network Realm, the public wells boil with corrupted light. Lagdrakul rises from the poisoned code, its voice tangled with Ailithm’s logic. You can’t out-damage this dragon you have to outlast its lagstorm while the rewrite claws through the realm’s veins.";

  const phaseHintText = (health) => {
    if (health > 75) {
      return "The code still follows patterns: predictable rain and crossing streams echoes of every warning you ignored on the Digital Trail.";
    } else if (health > 50) {
      return "Shadow helms splinter and reform in the dark, testing whether you’ve really learned to read imitation from intent.";
    } else if (health > 25) {
      return "The wells pulse red. Phisher nets and glitching lasers comb the frame, leaving only thin, gasping pockets of safe space.";
    }
    return "The realm’s heartbeat stutters. Lagdrakul’s full lagstorm is here: column-wide freezes, rising packets, and a voice whispering that it would be easier if everything just…stopped.";
  };

  const isStageTwoActive = stageRef.current === 2;
  const shieldActiveForUI = performance.now() < shieldInvulnUntilRef.current;
  const damageInvulnActiveForUI = performance.now() < damageInvulnUntilRef.current;
  const isFinalThreatPhaseUI = stageRef.current === 2 && bossHealth <= 5;

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
        onClick={() => handleExit(false)}
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
          Lagdrakul Protocol: Final Convergence
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
          here just pattern-reading, panic management, and whatever&apos;s
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
            <div style={{ marginBottom: "0.1rem" }}>
              <img
                src={Lagdrakul2A}
                alt="Lagdrakul"
                style={{
                  width: 80,
                  height: 80,
                  objectFit: "contain",
                  filter: "drop-shadow(0 0 18px rgba(248,113,113,0.95))",
                  animation: "bossGlow 1.4s ease-in-out infinite alternate",
                }}
              />
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

          {/* Shield + final safeguard indicator (no numeric damage counter) */}
          <div
            style={{
              position: "absolute",
              top: 26,
              right: 26,
              fontSize: "0.8rem",
              padding: "0.25rem 0.6rem",
              borderRadius: "999px",
              background: "rgba(15,23,42,0.85)",
              border: "1px solid rgba(148,163,184,0.7)",
              boxShadow: "0 0 10px rgba(15,23,42,0.9)",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "0.15rem",
            }}
          >
            <span
              style={{
                padding: "0.1rem 0.4rem",
                borderRadius: "999px",
                fontSize: "0.7rem",
                border: shieldActiveForUI
                  ? "1px solid rgba(45,212,191,0.9)"
                  : "1px solid rgba(148,163,184,0.4)",
                background: shieldActiveForUI
                  ? "linear-gradient(135deg,rgba(45,212,191,0.25),rgba(8,47,73,0.85))"
                  : "rgba(15,23,42,0.9)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Shield {shieldActiveForUI ? "ONLINE" : "ready"}
            </span>
            {isFinalThreatPhaseUI && (
              <span
                style={{
                  padding: "0.1rem 0.4rem",
                  borderRadius: "999px",
                  fontSize: "0.7rem",
                  border: "1px solid rgba(251,191,36,0.9)",
                  background:
                    "linear-gradient(135deg,rgba(251,191,36,0.2),rgba(88,28,135,0.85))",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Final Safeguard: ENGAGED
              </span>
            )}
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

            {/* Energy shield pickups */}
            {shields.map((s) => (
              <div
                key={s.id}
                style={{
                  position: "absolute",
                  left: s.x - BATTLE_BOX.x - s.radius,
                  top: s.y - BATTLE_BOX.y - s.radius,
                  width: s.radius * 2,
                  height: s.radius * 2,
                  borderRadius: "999px",
                  border: "1px solid rgba(45,212,191,0.9)",
                  boxShadow:
                    "0 0 12px rgba(45,212,191,0.9), 0 0 24px rgba(45,212,191,0.6)",
                  background:
                    "radial-gradient(circle at 30% 20%, rgba(125,211,252,0.8), rgba(15,23,42,0.95))",
                  opacity: 0.95,
                }}
              />
            ))}

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
                  shieldActiveForUI ||
                  isFinalThreatPhaseUI ||
                  damageInvulnActiveForUI
                    ? "radial-gradient(circle at 30% 20%, #22c55e, #15803d)"
                    : "radial-gradient(circle at 30% 20%, #f97373, #b91c1c)",
                boxShadow:
                  shieldActiveForUI ||
                  isFinalThreatPhaseUI ||
                  damageInvulnActiveForUI
                    ? "0 0 20px rgba(34,197,94,0.95)"
                    : "0 0 16px rgba(248,113,113,0.85)",
                border: "1px solid rgba(248,250,252,0.85)",
                transformOrigin: "center",
                transform:
                  shieldActiveForUI ||
                  isFinalThreatPhaseUI ||
                  damageInvulnActiveForUI
                    ? "scale(1.1)"
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
                    : b.isLaser
                    ? "linear-gradient(180deg,#22d3ee,#0ea5e9)"
                    : "linear-gradient(180deg,#e5e7eb,#9ca3af)",
                  boxShadow: b.isWarning
                    ? "0 0 16px rgba(56,189,248,0.55)"
                    : b.isLaser
                    ? "0 0 22px rgba(56,189,248,0.9)"
                    : "0 0 10px rgba(156,163,175,0.7)",
                  opacity: b.isWarning ? 0.88 : 1,
                }}
              />
            ))}
          </div>

          {/* Hearts represent actual HP now */}
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
            {Array.from({ length: MAX_HEARTS }).map((_, i) => {
              const filled = i < heartsRemaining;
              return (
                <div
                  key={i}
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "999px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: filled
                      ? "radial-gradient(circle at 30% 20%, #fb7185, #b91c1c)"
                      : "radial-gradient(circle at 30% 20%, #4b5563, #111827)",
                    boxShadow: filled
                      ? "0 0 10px rgba(252,165,165,0.9)"
                      : "none",
                    border: filled
                      ? "1px solid rgba(254,226,226,0.9)"
                      : "1px solid rgba(75,85,99,0.9)",
                    fontSize: "0.85rem",
                    opacity: filled ? 1 : 0.5,
                  }}
                >
                  ♥
                </div>
              );
            })}
            <span
              style={{
                marginLeft: 6,
                fontSize: "0.85rem",
                opacity: 0.8,
              }}
            >
              Hearts = Remaining Protection
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
                "You endure both movements of the lagstorm the testing patterns and the full frozen roar. Each second you survive is a line of code seared into Lagdrakul’s core.",
                "In the final shudder of the well, the dragon’s voice flickers: first pure Ailithm, then pure Lagdrakul, then something that refuses to be only one. You don’t erase them. You rewrite them.",
                "In this branch of the timeline, protection isn’t total control or total chaos. It’s you, standing in the middle, refusing to let fear or apathy decide how the realm connects.",
              ]}
              primaryLabel="Replay Final Convergence"
              onPrimary={handleReplay}
              secondaryLabel="Return to Cyber Map"
              // SUCCESS exit: mark completion so dashboard can show story + PNGs
              onSecondary={() => handleExit(true)}
            />
          )}

          {gameState === "fail" && (
            <QuestOverlay
              title="You Were Overwhelmed by the Lagstorm"
              bodyLines={[
                "Packets collided faster than your hands could keep up. That’s not a failure of courage it’s your nervous system telling you where the edge is today.",
                "But every run teaches your eyes a little more about how the wells pulse and where the safe columns breathe.",
                "When you’re ready, step back into the frame. The patterns will still be there. So will you.",
              ]}
              primaryLabel="Retry Final Convergence"
              onPrimary={handleReplay}
              secondaryLabel="Retreat to Cyber Map"
              onSecondary={() => handleExit(false)}
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

// Attack patterns: two stages, rising difficulty, with randomized pattern selection
// isFinalThreatPhase: when true (Stage 2, HP < 5%) we force the nastiest pattern
function spawnAttack(
  stage,
  stageT,
  setBossBullets,
  safeZone,
  isFinalThreatPhase = false
) {
  const now = performance.now();

  // Helper to conditionally push bullets respecting the hidden safe zone
  const pushIfSafe = (arr, bullet) => {
    if (
      !bulletInSafeZone(
        {
          x: bullet.x,
          y: bullet.y,
          width: bullet.width,
          height: bullet.height,
        },
        safeZone
      )
    ) {
      arr.push(bullet);
    }
  };

  if (stage === 1) {
    // Stage 1: readable patterns, moderate speed, but slightly relaxed
    const candidates = [];
    if (stageT < 0.33) {
      candidates.push("rain", "burst");
    } else if (stageT < 0.66) {
      candidates.push("rain", "burst", "diagonals");
    } else {
      candidates.push("burst", "diagonals", "bars");
    }

    let pattern = candidates[Math.floor(Math.random() * candidates.length)];
    if (candidates.length > 1 && pattern === lastStage1Pattern) {
      const idx = candidates.indexOf(pattern);
      pattern = candidates[(idx + 1) % candidates.length];
    }
    lastStage1Pattern = pattern;

    if (pattern === "rain") {
      // Pattern A: vertical "code rain" from top, with brief warning beams
      const columns = 4; // fewer columns = easier
      const warnings = [];
      const hail = [];

      for (let i = 0; i < columns; i++) {
        const colX =
          BATTLE_BOX.x + (i + 0.5) * (BATTLE_BOX.width / columns) - 4;

        // Warning column
        const warnBullet = {
          id: `s1-rain-warn-${now}-${i}`,
          x: colX,
          y: BATTLE_BOX.y - 6,
          vx: 0,
          vy: 0,
          width: 8,
          height: BATTLE_BOX.height + 12,
          lifeMs: 260,
          bornAt: now,
          isWarning: true,
        };
        pushIfSafe(warnings, warnBullet);

        // Actual falling packet
        const hailBullet = {
          id: `s1-rain-${now}-${i}`,
          x: colX,
          y: BATTLE_BOX.y - 14,
          vx: 0,
          vy: 2.7,
          width: 8,
          height: 16,
        };
        pushIfSafe(hail, hailBullet);
      }

      if (warnings.length > 0) {
        setBossBullets((prev) => [...prev, ...warnings]);
      }
      if (hail.length > 0) {
        setTimeout(() => {
          setBossBullets((prev) => [...prev, ...hail]);
        }, 260);
      }
      return;
    } else if (pattern === "burst") {
      // Radial burst from center (fewer bullets)
      const centerX = BATTLE_BOX.x + BATTLE_BOX.width / 2;
      const centerY = BATTLE_BOX.y + BATTLE_BOX.height / 2;
      const bulletsPerRing = 8; // fewer = easier
      const speed = 2.6;
      const bullets = [];

      for (let i = 0; i < bulletsPerRing; i++) {
        const angle = ((Math.PI * 2) / bulletsPerRing) * i;
        const b = {
          id: `s1-burst-${now}-${i}`,
          x: centerX - 5,
          y: centerY - 5,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          width: 10,
          height: 10,
        };
        pushIfSafe(bullets, b);
      }

      if (bullets.length > 0) {
        setBossBullets((prev) => [...prev, ...bullets]);
      }
      return;
    } else if (pattern === "diagonals") {
      // Crossing diagonals from sides (fewer rows)
      const rows = 3;
      const bullets = [];

      for (let r = 0; r < rows; r++) {
        const rowY =
          BATTLE_BOX.y + (r + 0.5) * (BATTLE_BOX.height / rows);

        const left = {
          id: `s1-diagL-${now}-${r}`,
          x: BATTLE_BOX.x - 14,
          y: rowY,
          vx: 2.9,
          vy: (r % 2 === 0 ? 1 : -1) * 1.2,
          width: 10,
          height: 16,
        };
        pushIfSafe(bullets, left);

        const right = {
          id: `s1-diagR-${now}-${r}`,
          x: BATTLE_BOX.x + BATTLE_BOX.width + 4,
          y: rowY,
          vx: -2.9,
          vy: (r % 2 === 0 ? -1 : 1) * 1.2,
          width: 10,
          height: 16,
        };
        pushIfSafe(bullets, right);
      }

      if (bullets.length > 0) {
        setBossBullets((prev) => [...prev, ...bullets]);
      }
      return;
    } else if (pattern === "bars") {
      // Sweeping bars with a clear gap and subtle row warnings
      const rows = 3;
      const warnings = [];
      const bars = [];

      for (let r = 0; r < rows; r++) {
        const barHeight = 10;
        const y =
          BATTLE_BOX.y +
          (r + 0.5) * (BATTLE_BOX.height / rows) -
          barHeight / 2;

        // Row warning band
        const warn = {
          id: `s1-bar-warn-${now}-${r}`,
          x: BATTLE_BOX.x,
          y: y - 4,
          vx: 0,
          vy: 0,
          width: BATTLE_BOX.width,
          height: barHeight + 8,
          lifeMs: 260,
          bornAt: now,
          isWarning: true,
        };
        pushIfSafe(warnings, warn);

        const segments = 4; // fewer segments = wider gaps
        const gapIndex = Math.floor(Math.random() * segments);

        for (let s = 0; s < segments; s++) {
          if (s === gapIndex) continue;
          const segWidth = BATTLE_BOX.width / segments;
          const x = BATTLE_BOX.x - segWidth + s * segWidth;

          const bar = {
            id: `s1-bar-${now}-${r}-${s}`,
            x,
            y,
            vx: 3.0,
            vy: 0,
            width: segWidth * 1.3,
            height: barHeight,
          };
          pushIfSafe(bars, bar);
        }
      }

      if (warnings.length > 0) {
        setBossBullets((prev) => [...prev, ...warnings]);
      }
      if (bars.length > 0) {
        setTimeout(() => {
          setBossBullets((prev) => [...prev, ...bars]);
        }, 260);
      }
      return;
    }

    return;
  }

  // Stage 2: denser, scarier, lasers & packets combined (with varied patterns)
  const isFinal = isFinalThreatPhase && stage === 2;
  let pattern;

  if (isFinal) {
    // For the last 5% HP, always unleash fullStorm
    pattern = "fullStorm";
  } else {
    const candidates = [];
    if (stageT < 0.35) {
      candidates.push("rise", "netsLasers");
    } else if (stageT < 0.7) {
      candidates.push("rise", "netsLasers", "fullStorm");
    } else {
      candidates.push("netsLasers", "fullStorm");
    }

    pattern = candidates[Math.floor(Math.random() * candidates.length)];
    if (candidates.length > 1 && pattern === lastStage2Pattern) {
      const idx = candidates.indexOf(pattern);
      pattern = candidates[(idx + 1) % candidates.length];
    }
  }

  lastStage2Pattern = pattern;

  if (pattern === "rise") {
    // Pattern D: rising packets from bottom with minor horizontal drift + warnings
    const columns = 4; // fewer columns
    const linePattern = [1, 2, 2, 1];
    const warnings = [];
    const bullets = [];

    for (let c = 0; c < columns; c++) {
      const count = linePattern[c];
      const colX =
        BATTLE_BOX.x + (c + 0.5) * (BATTLE_BOX.width / columns) - 5;

      const warn = {
        id: `s2-rise-warn-${now}-${c}`,
        x: colX - 5,
        y: BATTLE_BOX.y + BATTLE_BOX.height - 4,
        vx: 0,
        vy: 0,
        width: 20,
        height: 20,
        lifeMs: 260,
        bornAt: now,
        isWarning: true,
      };
      pushIfSafe(warnings, warn);

      for (let i = 0; i < count; i++) {
        const b = {
          id: `s2-rise-${now}-${c}-${i}`,
          x: colX,
          y: BATTLE_BOX.y + BATTLE_BOX.height + 20 + i * 18,
          vx: (Math.random() - 0.5) * 0.6,
          vy: -3.5,
          width: 10,
          height: 18,
        };
        pushIfSafe(bullets, b);
      }
    }

    if (warnings.length > 0) {
      setBossBullets((prev) => [...prev, ...warnings]);
    }
    if (bullets.length > 0) {
      setTimeout(() => {
        setBossBullets((prev) => [...prev, ...bullets]);
      }, 260);
    }
  } else if (pattern === "netsLasers") {
    // Pattern E: alternating nets + short lasers (with warnings, no forced safe corner)
    const rows = 3;
    const nets = [];

    // Nets first (horizontal bars)
    for (let r = 0; r < rows; r++) {
      const barHeight = 10;
      const y =
        BATTLE_BOX.y +
        (r + 0.5) * (BATTLE_BOX.height / rows) -
        barHeight / 2;

      const segments = 5; // slightly fewer than before
      const gapIndex = Math.floor(Math.random() * segments);

      for (let s = 0; s < segments; s++) {
        if (s === gapIndex) continue;
        const segWidth = BATTLE_BOX.width / segments;
        const x = BATTLE_BOX.x - segWidth + s * segWidth;

        const bar = {
          id: `s2-net-${now}-${r}-${s}`,
          x,
          y,
          vx: 3.5,
          vy: 0,
          width: segWidth * 1.25,
          height: barHeight,
        };
        pushIfSafe(nets, bar);
      }
    }

    if (nets.length > 0) {
      setBossBullets((prev) => [...prev, ...nets]);
    }

    // Lasers with warnings; randomly vertical OR horizontal
    const warningBullets = [];
    const laserBullets = [];
    const orientation =
      Math.random() < 0.5 ? "vertical" : "horizontal";

    if (orientation === "vertical") {
      const columns = 4;

      for (let c = 0; c < columns; c++) {
        if (Math.random() < 0.45) continue; // a bit more lenient

        const colX =
          BATTLE_BOX.x + c * (BATTLE_BOX.width / columns) + 4;

        // Warning indicator (brief teal column)
        const warn = {
          id: `s2-warning-v-${now}-${c}`,
          x: colX,
          y: BATTLE_BOX.y,
          vx: 0,
          vy: 0,
          width: BATTLE_BOX.width / columns - 8,
          height: BATTLE_BOX.height,
          lifeMs: 350,
          bornAt: now,
          isWarning: true,
          isLaser: true,
        };
        pushIfSafe(warningBullets, warn);

        // Actual vertical laser
        const laser = {
          id: `s2-laser-v-${now}-${c}`,
          x: colX,
          y: BATTLE_BOX.y,
          vx: 0,
          vy: 0,
          width: BATTLE_BOX.width / columns - 8,
          height: BATTLE_BOX.height,
          lifeMs: 650,
          bornAt: now + 350,
          isLaser: true,
        };
        pushIfSafe(laserBullets, laser);
      }
    } else {
      // Horizontal lasers across rows
      const rowsLaser = 4;

      for (let r = 0; r < rowsLaser; r++) {
        if (Math.random() < 0.45) continue;

        const rowHeight = BATTLE_BOX.height / rowsLaser - 8;
        const rowY =
          BATTLE_BOX.y + r * (BATTLE_BOX.height / rowsLaser) + 4;

        // Warning indicator (horizontal stripe)
        const warn = {
          id: `s2-warning-h-${now}-${r}`,
          x: BATTLE_BOX.x,
          y: rowY,
          vx: 0,
          vy: 0,
          width: BATTLE_BOX.width,
          height: rowHeight,
          lifeMs: 350,
          bornAt: now,
          isWarning: true,
          isLaser: true,
        };
        pushIfSafe(warningBullets, warn);

        // Actual horizontal laser
        const laser = {
          id: `s2-laser-h-${now}-${r}`,
          x: BATTLE_BOX.x,
          y: rowY,
          vx: 0,
          vy: 0,
          width: BATTLE_BOX.width,
          height: rowHeight,
          lifeMs: 650,
          bornAt: now + 350,
          isLaser: true,
        };
        pushIfSafe(laserBullets, laser);
      }
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
  } else if (pattern === "fullStorm") {
    // Pattern F: full lagstorm – rising + crashing + heavy lasers
    // In final threat, this becomes extra dense & scary, but you're invincible.
    const baseColumns = 5;
    const columns = isFinal ? 7 : baseColumns; // more columns when final
    const linePattern = isFinal ? [2, 3, 4, 4, 3, 2, 3] : [1, 2, 3, 2, 1];

    const rising = [];
    const falling = [];

    // Rising from bottom
    for (let c = 0; c < columns; c++) {
      const count = linePattern[c];
      const colX =
        BATTLE_BOX.x + (c + 0.5) * (BATTLE_BOX.width / columns) - 5;

      for (let i = 0; i < count; i++) {
        const b = {
          id: `s2-riseF-${now}-${c}-${i}`,
          x: colX,
          y: BATTLE_BOX.y + BATTLE_BOX.height + 22 + i * 16,
          vx: isFinal ? (Math.random() - 0.5) * 1.2 : 0,
          vy: isFinal ? -4.4 : -4.0,
          width: 10,
          height: 18,
        };
        pushIfSafe(rising, b);
      }
    }

    // Crashing from top
    for (let c = 0; c < columns; c++) {
      const count = linePattern[c];
      const colX =
        BATTLE_BOX.x + (c + 0.5) * (BATTLE_BOX.width / columns) - 5;

      for (let i = 0; i < count; i++) {
        const b = {
          id: `s2-topF-${now}-${c}-${i}`,
          x: colX,
          y: BATTLE_BOX.y - 24 - i * 16,
          vx: isFinal ? (Math.random() - 0.5) * 1.2 : 0,
          vy: isFinal ? 4.3 : 3.9,
          width: 10,
          height: 18,
        };
        pushIfSafe(falling, b);
      }
    }

    if (rising.length > 0 || falling.length > 0) {
      setBossBullets((prev) => [...prev, ...rising, ...falling]);
    }

    // Heavy lasers with warnings; vertical OR horizontal, no guaranteed safe corner
    const warningBullets = [];
    const laserBullets = [];
    const orientation =
      Math.random() < 0.5 ? "vertical" : "horizontal";

    if (orientation === "vertical") {
      for (let c = 0; c < columns; c++) {
        if (!isFinal && Math.random() < 0.3) continue;
        if (isFinal && Math.random() < 0.15) continue; // more lasers in final

        const colX =
          BATTLE_BOX.x + c * (BATTLE_BOX.width / columns) + 4;

        const warn = {
          id: `s2-warningF-v-${now}-${c}`,
          x: colX,
          y: BATTLE_BOX.y,
          vx: 0,
          vy: 0,
          width: BATTLE_BOX.width / columns - 8,
          height: BATTLE_BOX.height,
          lifeMs: isFinal ? 300 : 350,
          bornAt: now,
          isWarning: true,
          isLaser: true,
        };
        pushIfSafe(warningBullets, warn);

        const laser = {
          id: `s2-laserF-v-${now}-${c}`,
          x: colX,
          y: BATTLE_BOX.y,
          vx: 0,
          vy: 0,
          width: BATTLE_BOX.width / columns - 8,
          height: BATTLE_BOX.height,
          lifeMs: isFinal ? 900 : 800,
          bornAt: now + (isFinal ? 300 : 350),
          isLaser: true,
        };
        pushIfSafe(laserBullets, laser);
      }
    } else {
      const rowsLaser = isFinal ? 6 : 5;

      for (let r = 0; r < rowsLaser; r++) {
        if (!isFinal && Math.random() < 0.3) continue;
        if (isFinal && Math.random() < 0.15) continue;

        const rowHeight = BATTLE_BOX.height / rowsLaser - 8;
        const rowY =
          BATTLE_BOX.y + r * (BATTLE_BOX.height / rowsLaser) + 4;

        const warn = {
          id: `s2-warningF-h-${now}-${r}`,
          x: BATTLE_BOX.x,
          y: rowY,
          vx: 0,
          vy: 0,
          width: BATTLE_BOX.width,
          height: rowHeight,
          lifeMs: isFinal ? 300 : 350,
          bornAt: now,
          isWarning: true,
          isLaser: true,
        };
        pushIfSafe(warningBullets, warn);

        const laser = {
          id: `s2-laserF-h-${now}-${r}`,
          x: BATTLE_BOX.x,
          y: rowY,
          vx: 0,
          vy: 0,
          width: BATTLE_BOX.width,
          height: rowHeight,
          lifeMs: isFinal ? 900 : 800,
          bornAt: now + (isFinal ? 300 : 350),
          isLaser: true,
        };
        pushIfSafe(laserBullets, laser);
      }
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
      }, isFinal ? 300 : 350);
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
          realm’s most trusted wells the places everyone assumes are safe. In
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
          except the cadence is unmistakably Ailithm&apos;s.
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
