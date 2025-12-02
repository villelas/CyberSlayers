// GalagaGame.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const DASHBOARD_ROUTE = '/dashboard';

const GAME_NUM_FOR_STORY = 5;

const GAME_WIDTH = 600;
const GAME_HEIGHT = 540; // was 700

const PLAYER_WIDTH = 50;
const PLAYER_HEIGHT = 40;
const PLAYER_SPEED = 6;

const BULLET_WIDTH = 6;
const BULLET_HEIGHT = 16;
const BULLET_SPEED = 10;
const ENEMY_BULLET_SPEED = 5;

const ENEMY_WIDTH = 44;
const ENEMY_HEIGHT = 36;

const TICK_MS = 16;
const PLAYER_LIVES = 5;

// Enemy types with different behaviors
const ENEMY_TYPES = {
  MALWARE: {
    name: '🦠',
    color: 'linear-gradient(135deg, #dc2626, #991b1b)',
    border: '#ef4444',
    points: 100,
    speed: 2,
    canShoot: false,
    canDive: true,
    attackType: 'dive',
  },
  PHISHING: {
    name: '📧',
    color: 'linear-gradient(135deg, #f59e0b, #d97706)',
    border: '#fbbf24',
    points: 150,
    speed: 1.5,
    canShoot: true,
    canDive: true,
    attackType: 'diveShoot',
  },
  BAD_CONNECTION: {
    name: '📡',
    color: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
    border: '#a78bfa',
    points: 200,
    speed: 1,
    canShoot: true,
    canDive: false,
    attackType: 'spread',
  },
  MALICIOUS_ADS: {
    name: '💰',
    color: 'linear-gradient(135deg, #f97316, #db2777)',
    border: '#fb7185',
    points: 250,
    speed: 2.5,
    canShoot: true,
    canDive: false,
    attackType: 'laser',
  },
};

// Wave configurations - Galaga-style grid formations
// Rows ordered from top (furthest) to bottom (closest to player)
const WAVES = [
  {
    name: 'Malware Outbreak',
    rows: [
      { type: 'MALWARE', count: 8 },
      { type: 'MALWARE', count: 8 },
      { type: 'MALWARE', count: 8 },
    ],
  },
  {
    name: 'Phishing Campaign',
    rows: [
      { type: 'PHISHING', count: 8 },
      { type: 'PHISHING', count: 8 },
      { type: 'MALWARE', count: 8 },
      { type: 'MALWARE', count: 8 },
    ],
  },
  {
    name: 'Network Attack',
    rows: [
      { type: 'BAD_CONNECTION', count: 8 },
      { type: 'PHISHING', count: 8 },
      { type: 'PHISHING', count: 8 },
      { type: 'MALWARE', count: 8 },
      { type: 'MALWARE', count: 8 },
    ],
  },
  {
    name: 'Full Assault',
    rows: [
      { type: 'MALICIOUS_ADS', count: 8 },
      { type: 'BAD_CONNECTION', count: 8 },
      { type: 'BAD_CONNECTION', count: 8 },
      { type: 'MALWARE', count: 8 },
      { type: 'MALWARE', count: 8 },
    ],
  },
];

function WaveMeter({ currentWave, totalWaves, lives, maxLives, score }) {
  const waveProgress = (currentWave / totalWaves) * 100;
  const waveName =
    currentWave <= totalWaves ? WAVES[currentWave - 1].name : 'Complete';

  return (
    <div
      style={{
        minWidth: '200px',
        padding: '0.5rem', 
        borderRadius: '12px',
        border: '1px solid rgba(148,163,184,0.6)',
        background:
          'radial-gradient(circle at top, rgba(15,23,42,0.95), rgba(2,6,23,0.95))',
        boxShadow: '0 0 18px rgba(15,23,42,0.9)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.3rem',
        fontSize: '0.8rem', 
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '0.1rem',
        }}
      >
        <span style={{ fontSize: '1.4rem' }}>🛡️</span>
        <div style={{ lineHeight: 1.2 }}>
          <div style={{ fontWeight: '600' }}>Security Defense</div>
          <div style={{ opacity: 0.75, fontSize: '0.75rem' }}>
            Wave {Math.min(currentWave, totalWaves)} / {totalWaves}
          </div>
        </div>
      </div>

      <div
        style={{
          height: '5px',
          borderRadius: '999px',
          overflow: 'hidden',
          background: 'rgba(30,64,175,0.65)',
        }}
      >
        <div
          style={{
            width: `${waveProgress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
            transition: 'width 300ms ease',
          }}
        />
      </div>

      <div style={{ fontSize: '0.75rem', fontWeight: '600', opacity: 0.9 }}>
        {waveName}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
        <div
          style={{
            fontSize: '0.7rem',
            fontWeight: '600',
            opacity: 0.9,
          }}
        >
          Lives
        </div>
        <div
          style={{
            display: 'flex',
            gap: '0.2rem',
            flexWrap: 'wrap',
          }}
        >
          {Array.from({ length: maxLives }).map((_, i) => (
            <div
              key={i}
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '5px',
                border: '2px solid rgba(148,163,184,0.6)',
                background:
                  i < lives
                    ? 'linear-gradient(135deg, #38bdf8, #1e40af)'
                    : 'rgba(15,23,42,0.5)',
                boxShadow:
                  i < lives ? '0 0 8px rgba(56,189,248,0.5)' : 'none',
                transition: 'all 200ms ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.9rem',
              }}
            >
              {i < lives ? '🚀' : ''}
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          marginTop: '0.2rem',
          padding: '0.35rem',
          background: 'rgba(59,130,246,0.1)',
          borderRadius: '6px',
        }}
      >
        <div style={{ fontWeight: '600', fontSize: '0.8rem' }}>Score: {score}</div>
        <div style={{ opacity: 0.7, fontSize: '0.7rem' }}>
          Defend the network!
        </div>
      </div>
    </div>
  );
}

// Explosion particle component
function Explosion({ x, y, color }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: ENEMY_WIDTH,
        height: ENEMY_HEIGHT,
        pointerEvents: 'none',
      }}
    >
      {/* Central flash */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          animation: 'explosionFlash 300ms ease-out forwards',
        }}
      />
      {/* Particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: color,
            boxShadow: `0 0 10px ${color}`,
            animation: `explosionParticle${i} 400ms ease-out forwards`,
          }}
        />
      ))}
      <style>{`
        @keyframes explosionFlash {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(0.5); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(2); }
        }
        @keyframes explosionParticle0 {
          0% { opacity: 1; transform: translate(-50%, -50%); }
          100% { opacity: 0; transform: translate(calc(-50% + 30px), calc(-50% + 0px)); }
        }
        @keyframes explosionParticle1 {
          0% { opacity: 1; transform: translate(-50%, -50%); }
          100% { opacity: 0; transform: translate(calc(-50% + 21px), calc(-50% + 21px)); }
        }
        @keyframes explosionParticle2 {
          0% { opacity: 1; transform: translate(-50%, -50%); }
          100% { opacity: 0; transform: translate(calc(-50% + 0px), calc(-50% + 30px)); }
        }
        @keyframes explosionParticle3 {
          0% { opacity: 1; transform: translate(-50%, -50%); }
          100% { opacity: 0; transform: translate(calc(-50% + -21px), calc(-50% + 21px)); }
        }
        @keyframes explosionParticle4 {
          0% { opacity: 1; transform: translate(-50%, -50%); }
          100% { opacity: 0; transform: translate(calc(-50% + -30px), calc(-50% + 0px)); }
        }
        @keyframes explosionParticle5 {
          0% { opacity: 1; transform: translate(-50%, -50%); }
          100% { opacity: 0; transform: translate(calc(-50% + -21px), calc(-50% + -21px)); }
        }
        @keyframes explosionParticle6 {
          0% { opacity: 1; transform: translate(-50%, -50%); }
          100% { opacity: 0; transform: translate(calc(-50% + 0px), calc(-50% + -30px)); }
        }
        @keyframes explosionParticle7 {
          0% { opacity: 1; transform: translate(-50%, -50%); }
          100% { opacity: 0; transform: translate(calc(-50% + 21px), calc(-50% + -21px)); }
        }
      `}</style>
    </div>
  );
}

function createWaveEnemies(waveIndex) {
  // Guard against invalid wave index
  if (waveIndex < 0 || waveIndex >= WAVES.length) {
    return [];
  }

  const wave = WAVES[waveIndex];
  const enemies = [];
  let id = 0;

  const rowHeight = 44;
  const startY = 50;

  wave.rows.forEach((row, rowIndex) => {
    const type = ENEMY_TYPES[row.type];
    const count = row.count;
    const spacing = (GAME_WIDTH - 60) / count;
    const startX = 30 + spacing / 2;

    for (let col = 0; col < count; col++) {
      enemies.push({
        id: id++,
        x: startX + col * spacing - ENEMY_WIDTH / 2,
        y: startY + rowIndex * rowHeight,
        type: row.type,
        typeData: type,
        alive: true,
        moveTimer: 0,
        shootTimer: Math.random() * 2000 + 1000,
        diveTimer: Math.random() * 3000 + 2000,
        isDiving: false,
      });
    }
  });

  return enemies;
}

export default function GalagaGame() {
  const navigate = useNavigate();

  const [playerX, setPlayerX] = useState(GAME_WIDTH / 2 - PLAYER_WIDTH / 2);
  const [playerY, setPlayerY] = useState(GAME_HEIGHT - 80);
  const [bullets, setBullets] = useState([]);
  const [enemyBullets, setEnemyBullets] = useState([]);
  const [lasers, setLasers] = useState([]);
  const [enemies, setEnemies] = useState(() => createWaveEnemies(0));
  const [explosions, setExplosions] = useState([]);
  const [keys, setKeys] = useState({
    left: false,
    right: false,
    up: false,
    down: false,
    shoot: false,
  });
  const [gameState, setGameState] = useState('playing');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(PLAYER_LIVES);
  const [currentWave, setCurrentWave] = useState(1);
  const [isInvulnerable, setIsInvulnerable] = useState(false);
  const [waveTransition, setWaveTransition] = useState(false);

  const lastShotTimeRef = useRef(0);
  const shootCooldown = 250;
  const playerXRef = useRef(playerX);
  const playerYRef = useRef(playerY);
  const explosionIdRef = useRef(0);

  useEffect(() => {
    playerXRef.current = playerX;
    playerYRef.current = playerY;
  }, [playerX, playerY]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState !== 'playing') return;

      const isArrow =
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === 'ArrowUp' ||
        e.key === 'ArrowDown';

      if (isArrow || e.key === ' ') {
        e.preventDefault();
      }

      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        setKeys((k) => ({ ...k, left: true }));
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        setKeys((k) => ({ ...k, right: true }));
      } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        setKeys((k) => ({ ...k, up: true }));
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        setKeys((k) => ({ ...k, down: true }));
      } else if (e.key === ' ') {
        setKeys((k) => ({ ...k, shoot: true }));
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A')
        setKeys((k) => ({ ...k, left: false }));
      else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D')
        setKeys((k) => ({ ...k, right: false }));
      else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W')
        setKeys((k) => ({ ...k, up: false }));
      else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S')
        setKeys((k) => ({ ...k, down: false }));
      else if (e.key === ' ')
        setKeys((k) => ({ ...k, shoot: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  // Function to add explosion
  const addExplosion = (x, y, color) => {
    const id = explosionIdRef.current++;
    setExplosions((prev) => [...prev, { id, x, y, color }]);
    // Remove explosion after animation completes
    setTimeout(() => {
      setExplosions((prev) => prev.filter((e) => e.id !== id));
    }, 400);
  };

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const interval = setInterval(() => {
      // Move player
      setPlayerX((prevX) => {
        let x = prevX;
        if (keys.left && !keys.right) x -= PLAYER_SPEED;
        if (keys.right && !keys.left) x += PLAYER_SPEED;
        return Math.max(0, Math.min(x, GAME_WIDTH - PLAYER_WIDTH));
      });

      setPlayerY((prevY) => {
        let y = prevY;
        if (keys.up && !keys.down) y -= PLAYER_SPEED;
        if (keys.down && !keys.up) y += PLAYER_SPEED;
        return Math.max(
          GAME_HEIGHT / 2,
          Math.min(y, GAME_HEIGHT - PLAYER_HEIGHT - 20)
        );
      });

      // Player shooting
      if (keys.shoot) {
        const now = performance.now();
        if (now - lastShotTimeRef.current > shootCooldown) {
          lastShotTimeRef.current = now;
          setBullets((prev) => [
            ...prev,
            {
              x: playerXRef.current + PLAYER_WIDTH / 2 - BULLET_WIDTH / 2,
              y: playerYRef.current - 10,
            },
          ]);
        }
      }

      // Move bullets
      setBullets((prev) =>
        prev
          .map((b) => ({ ...b, y: b.y - BULLET_SPEED }))
          .filter((b) => b.y > 0)
      );
      setEnemyBullets((prev) =>
        prev
          .map((b) => ({
            ...b,
            y: b.y + ENEMY_BULLET_SPEED,
            x: b.x + (b.vx || 0), // Apply horizontal velocity for spread shots
          }))
          .filter((b) => b.y < GAME_HEIGHT && b.x > 0 && b.x < GAME_WIDTH)
      );

      // Move and update enemies
      setEnemies((prevEnemies) => {
        // Calculate global formation offset for synchronized movement
        const formationOffsetX = Math.sin(Date.now() / 1500) * 30;

        // Count currently attacking enemies (diving or shooting)
        const currentlyAttacking = prevEnemies.filter(
          (e) => e.alive && (e.isDiving || e.isShooting)
        ).length;
        const maxAttacking = 15;

        return prevEnemies.map((enemy) => {
          if (!enemy.alive) return enemy;

          let newX = enemy.x;
          let newY = enemy.y;
          let newMoveTimer = enemy.moveTimer + TICK_MS;
          let newShootTimer = enemy.shootTimer - TICK_MS;
          let newDiveTimer = enemy.diveTimer - TICK_MS;
          let newIsDiving = enemy.isDiving;
          let newIsShooting = enemy.isShooting || false;

          // Store original grid position on first frame
          if (enemy.baseX === undefined) {
            enemy.baseX = enemy.x;
            enemy.baseY = enemy.y;
          }

          if (newIsDiving) {
            // Diving behavior - swoop toward player
            newY += 5;
            newX += (playerXRef.current - enemy.x) * 0.04;

            // Phishing enemies shoot while diving
            if (enemy.typeData.attackType === 'diveShoot' && newShootTimer <= 0) {
              setEnemyBullets((prev) => [
                ...prev,
                {
                  x: enemy.x + ENEMY_WIDTH / 2 - BULLET_WIDTH / 2,
                  y: enemy.y + ENEMY_HEIGHT,
                  type: 'normal',
                },
              ]);
              newShootTimer = 400; // Fast shooting while diving
            }

            // Reset after dive completes
            if (newY > GAME_HEIGHT - 80) {
              newIsDiving = false;
              newDiveTimer = 3000 + Math.random() * 3000;
              // Return to formation position
              newX = enemy.baseX;
              newY = enemy.baseY;
            }
          } else {
            // Formation movement - all enemies sway together
            newX = enemy.baseX + formationOffsetX;

            // Check if this enemy can start attacking (respect the limit)
            const canStartAttack = currentlyAttacking < maxAttacking;

            // Chance to start diving (only for dive-capable enemies)
            if (
              canStartAttack &&
              enemy.typeData.canDive &&
              newDiveTimer <= 0 &&
              Math.random() < 0.003
            ) {
              newIsDiving = true;
              newDiveTimer = 4000;
            }

            // Shooting logic for non-diving enemies
            if (
              enemy.typeData.canShoot &&
              newShootTimer <= 0 &&
              !newIsDiving
            ) {
              // Only shoot if under the attack limit
              if (canStartAttack || newIsShooting) {
                const centerX = enemy.x + ENEMY_WIDTH / 2;
                const bottomY = enemy.y + ENEMY_HEIGHT;

                if (enemy.typeData.attackType === 'spread') {
                  // Purple enemies shoot a 3-shot spread
                  setEnemyBullets((prev) => [
                    ...prev,
                    {
                      x: centerX - BULLET_WIDTH / 2,
                      y: bottomY,
                      type: 'normal',
                      vx: -2,
                    },
                    {
                      x: centerX - BULLET_WIDTH / 2,
                      y: bottomY,
                      type: 'normal',
                      vx: 0,
                    },
                    {
                      x: centerX - BULLET_WIDTH / 2,
                      y: bottomY,
                      type: 'normal',
                      vx: 2,
                    },
                  ]);
                  newShootTimer = 2500 + Math.random() * 1500;
                  newIsShooting = false; // Spread is instant
                } else if (enemy.typeData.attackType === 'laser') {
                  // Money enemies shoot a laser beam
                  setLasers((prev) => [
                    ...prev,
                    {
                      x: centerX - 4,
                      y: bottomY,
                      sourceId: enemy.id,
                      duration: 1000, // 1 second duration
                      createdAt: Date.now(),
                    },
                  ]);
                  newShootTimer = 4000 + Math.random() * 2000;
                  newIsShooting = true;
                  // Mark as not shooting after laser ends
                  setTimeout(() => {
                    setEnemies((prev) =>
                      prev.map((e) =>
                        e.id === enemy.id ? { ...e, isShooting: false } : e
                      )
                    );
                  }, 1000);
                }
              } else {
                // Delay the shot attempt
                newShootTimer = 500 + Math.random() * 500;
              }
            }
          }

          // Keep in horizontal bounds
          newX = Math.max(10, Math.min(newX, GAME_WIDTH - ENEMY_WIDTH - 10));

          return {
            ...enemy,
            x: newX,
            y: newY,
            baseX: enemy.baseX,
            baseY: enemy.baseY,
            moveTimer: newMoveTimer,
            shootTimer: newShootTimer,
            diveTimer: newDiveTimer,
            isDiving: newIsDiving,
            isShooting: newIsShooting,
          };
        });
      });

      // Update lasers - remove expired ones and update position to follow enemy
      setLasers((prev) => {
        const now = Date.now();
        return prev
          .filter((laser) => now - laser.createdAt < laser.duration)
          .map((laser) => {
            const sourceEnemy = enemies.find(
              (e) => e.id === laser.sourceId && e.alive
            );
            if (sourceEnemy) {
              return {
                ...laser,
                x: sourceEnemy.x + ENEMY_WIDTH / 2 - 4,
                y: sourceEnemy.y + ENEMY_HEIGHT,
              };
            }
            return laser;
          });
      });

      // Bullet collisions
      setBullets((prevBullets) => {
        let updatedEnemies = [...enemies];
        let updatedBullets = [...prevBullets];
        let explosionsToAdd = [];

        updatedBullets.forEach((bullet, bulletIndex) => {
          if (!bullet) return;
          updatedEnemies.forEach((enemy, enemyIndex) => {
            if (!enemy.alive) return;
            if (
              bullet.x < enemy.x + ENEMY_WIDTH &&
              bullet.x + BULLET_WIDTH > enemy.x &&
              bullet.y < enemy.y + ENEMY_HEIGHT &&
              bullet.y + BULLET_HEIGHT > enemy.y
            ) {
              explosionsToAdd.push({
                x: enemy.x,
                y: enemy.y,
                color: enemy.typeData.border,
              });
              updatedEnemies[enemyIndex] = { ...enemy, alive: false };
              updatedBullets[bulletIndex] = null;
              setScore((prev) => prev + enemy.typeData.points);
            }
          });
        });

        if (explosionsToAdd.length > 0) {
          setEnemies(updatedEnemies);
          explosionsToAdd.forEach((exp) =>
            addExplosion(exp.x, exp.y, exp.color)
          );
        }

        return updatedBullets.filter((b) => b !== null);
      });

      // Player collision with enemy bullets
      if (!isInvulnerable) {
        setEnemyBullets((prevBullets) => {
          let hit = false;
          const filtered = prevBullets.filter((bullet) => {
            if (
              bullet.x < playerXRef.current + PLAYER_WIDTH &&
              bullet.x + BULLET_WIDTH > playerXRef.current &&
              bullet.y < playerYRef.current + PLAYER_HEIGHT &&
              bullet.y + BULLET_HEIGHT > playerYRef.current
            ) {
              hit = true;
              return false;
            }
            return true;
          });

          if (hit) {
            setLives((prev) => {
              const newLives = prev - 1;
              if (newLives <= 0) setGameState('lose');
              return newLives;
            });
            setIsInvulnerable(true);
            setTimeout(() => setIsInvulnerable(false), 2000);
          }

          return filtered;
        });

        // Player collision with lasers
        const laserHit = lasers.some((laser) => {
          const laserWidth = 8;
          const laserHeight = GAME_HEIGHT - laser.y;
          return (
            playerXRef.current < laser.x + laserWidth &&
            playerXRef.current + PLAYER_WIDTH > laser.x &&
            playerYRef.current < laser.y + laserHeight &&
            playerYRef.current + PLAYER_HEIGHT > laser.y
          );
        });

        if (laserHit) {
          setLives((prev) => {
            const newLives = prev - 1;
            if (newLives <= 0) setGameState('lose');
            return newLives;
          });
          setIsInvulnerable(true);
          setTimeout(() => setIsInvulnerable(false), 2000);
        }
      }

      // Player collision with enemies
      if (!isInvulnerable) {
        const playerCollision = enemies.some((enemy) => {
          if (!enemy.alive) return false;
          return (
            playerXRef.current < enemy.x + ENEMY_WIDTH &&
            playerXRef.current + PLAYER_WIDTH > enemy.x &&
            playerYRef.current < enemy.y + ENEMY_HEIGHT &&
            playerYRef.current + PLAYER_HEIGHT > enemy.y
          );
        });

        if (playerCollision) {
          setLives((prev) => {
            const newLives = prev - 1;
            if (newLives <= 0) setGameState('lose');
            return newLives;
          });
          setIsInvulnerable(true);
          setTimeout(() => setIsInvulnerable(false), 2000);
        }
      }
    }, TICK_MS);

    return () => clearInterval(interval);
  }, [
    keys,
    gameState,
    enemies,
    currentWave,
    isInvulnerable,
    waveTransition,
    lasers,
  ]);

  // Wave progression
  useEffect(() => {
    if (gameState !== 'playing') return;

    if (waveTransition) return;

    const aliveCount = enemies.filter((e) => e.alive).length;
    if (aliveCount !== 0) return;

    if (currentWave < WAVES.length) {
      setWaveTransition(true);
      const nextWaveIndex = currentWave;

      setTimeout(() => {
        setCurrentWave((prev) => prev + 1);
        setEnemies(createWaveEnemies(nextWaveIndex));
        setWaveTransition(false);
      }, 1000);
    } else {
      setGameState('win');
    }
  }, [enemies, currentWave, gameState, waveTransition]);

  const handleRestart = () => {
    setPlayerX(GAME_WIDTH / 2 - PLAYER_WIDTH / 2);
    setPlayerY(GAME_HEIGHT - 80);
    setBullets([]);
    setEnemyBullets([]);
    setLasers([]);
    setEnemies(createWaveEnemies(0));
    setExplosions([]);
    setGameState('playing');
    setScore(0);
    setLives(PLAYER_LIVES);
    setCurrentWave(1);
    setIsInvulnerable(false);
    setWaveTransition(false);
    lastShotTimeRef.current = 0;
  };

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
        // ignore storage errors
      }
    }
    navigate(DASHBOARD_ROUTE);
  };

  return (
    <div
      style={{
        height: '100vh', 
        background:
          'radial-gradient(circle at top, #0f172a 0, #020617 50%, #000 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        color: 'white',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: '0.5rem 1rem 0.75rem', 
        gap: '0.5rem', 
        position: 'relative',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => handleExit(false)}
        style={{
          position: 'absolute',
          top: '0.5rem',
          right: '0.5rem',
          background: 'rgba(0,0,0,0.6)',
          borderRadius: '999px',
          border: '1px solid rgba(255,255,255,0.3)',
          color: 'white',
          padding: '0.35rem 0.75rem',
          cursor: 'pointer',
          fontSize: '0.8rem',
          fontWeight: '500',
        }}
      >
        ✕ Exit
      </button>

      <h1
        style={{
          fontSize: '1.6rem', 
          textAlign: 'center',
          margin: 0,
        }}
      >
        🐉 Lagdrakul Protocol: Skyward Defense
      </h1>
      <p
        style={{
          opacity: 0.85,
          textAlign: 'center',
          maxWidth: 520,
          fontSize: '0.85rem',
          margin: 0,
        }}
      >
        After tracing Lagdrakul&apos;s corruption through the social runes and
        shadow helms, Te-Qwuiz and Ailithm follow the code into the open sky
        above the realm&apos;s public wells. These waves of malware, phishing
        sigils, and broken connections are the Phishers&apos; Net made visible
        — if you hold the line here, the poisoned lag never reaches the wells
        below.
      </p>

      <p
        style={{
          opacity: 0.8,
          textAlign: 'center',
          maxWidth: 500,
          fontSize: '0.8rem',
          margin: 0,
        }}
      >
        Move with <strong>WASD / Arrows</strong>, shoot with{' '}
        <strong>Space</strong>.
      </p>

      <div
        style={{
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'flex-start',
          justifyContent: 'center',
          flexWrap: 'nowrap', 
          maxHeight: GAME_HEIGHT, 
        }}
      >
        <div
          style={{
            position: 'relative',
            width: GAME_WIDTH,
            height: GAME_HEIGHT,
            background:
              'linear-gradient(180deg, #020617 0%, #020617 60%, #000 100%)',
            border: '3px solid #4b5563',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 0 24px rgba(0,0,0,0.9)',
          }}
        >
          {/* Player */}
          <div
            style={{
              position: 'absolute',
              width: PLAYER_WIDTH,
              height: PLAYER_HEIGHT,
              left: playerX,
              top: playerY,
              background:
                'linear-gradient(135deg, #38bdf8, #1e40af)',
              borderRadius: '8px',
              boxShadow: isInvulnerable
                ? '0 0 30px rgba(239,68,68,0.9)'
                : '0 0 20px rgba(56,189,248,0.9)',
              border: '2px solid #0ea5e9',
              opacity:
                isInvulnerable && Date.now() % 200 < 100 ? 0.5 : 1,
              transition: 'opacity 100ms',
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: `${PLAYER_WIDTH / 2}px solid transparent`,
                borderRight: `${PLAYER_WIDTH / 2}px solid transparent`,
                borderBottom: '14px solid #bfdbfe',
                position: 'absolute',
                top: -14,
                left: 0,
              }}
            />
          </div>

          {/* Player bullets */}
          {bullets.map((b, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: BULLET_WIDTH,
                height: BULLET_HEIGHT,
                left: b.x,
                top: b.y,
                background:
                  'linear-gradient(180deg, #facc15, #f97316)',
                boxShadow: '0 0 12px rgba(250,204,21,0.95)',
                borderRadius: '999px',
              }}
            />
          ))}

          {/* Enemy bullets */}
          {enemyBullets.map((b, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: BULLET_WIDTH,
                height: BULLET_HEIGHT,
                left: b.x,
                top: b.y,
                background:
                  'linear-gradient(180deg, #dc2626, #991b1b)',
                boxShadow: '0 0 12px rgba(220,38,38,0.95)',
                borderRadius: '999px',
              }}
            />
          ))}

          {/* Laser beams */}
          {lasers.map((laser, i) => {
            const age = Date.now() - laser.createdAt;
            const opacity =
              Math.min(1, age / 100) * (1 - (age / laser.duration) * 0.3);
            const pulseScale = 1 + Math.sin(age / 50) * 0.2;
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: laser.x,
                  top: laser.y,
                  width: 8 * pulseScale,
                  height: GAME_HEIGHT - laser.y,
                  background:
                    'linear-gradient(180deg, #f97316 0%, #dc2626 30%, #991b1b 100%)',
                  boxShadow: `0 0 20px rgba(249,115,22,${opacity}), 0 0 40px rgba(220,38,38,${
                    opacity * 0.5
                  })`,
                  opacity: opacity,
                  borderRadius: '4px 4px 0 0',
                  transform: `translateX(${(1 - pulseScale) * 4}px)`,
                }}
              />
            );
          })}

          {/* Enemies */}
          {enemies.map(
            (e) =>
              e.alive && (
                <div
                  key={e.id}
                  style={{
                    position: 'absolute',
                    width: ENEMY_WIDTH,
                    height: ENEMY_HEIGHT,
                    left: e.x,
                    top: e.y,
                    background: e.typeData.color,
                    borderRadius: '6px',
                    border: `2px solid ${e.typeData.border}`,
                    boxShadow: `0 0 14px ${e.typeData.border}99`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.6rem',
                  }}
                >
                  {e.typeData.name}
                </div>
              )
          )}

          {/* Explosions */}
          {explosions.map((exp) => (
            <Explosion
              key={exp.id}
              x={exp.x}
              y={exp.y}
              color={exp.color}
            />
          ))}

          {/* Wave transition overlay */}
          {waveTransition && gameState === 'playing' && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  animation: 'pulse 0.5s ease-in-out infinite',
                }}
              >
                Wave {currentWave + 1} incoming...
              </div>
            </div>
          )}

          {/* Story-style closing module */}
          {gameState !== 'playing' && (
            <QuestCompleteOverlay
              title={
                gameState === 'win'
                  ? '🛡 Phishers’ Net Broken!'
                  : '💀 Lagdrakul’s Lagstorm Breaks Through'
              }
              bodyLines={
                gameState === 'win'
                  ? [
                      'You held the sky above the wells, burning through each wave of malware bursts and phishing sigils before they could seep into the public networks.',
                      'Ailithm traces the last echoes of Lagdrakul’s code, murmuring about how “elegant” the attack patterns were — a hint that their curiosity is starting to mirror the dragon’s logic.',
                      'For now, the realm drinks from unpolluted wells… but the corrupted lag is still coiled somewhere deeper in the code, waiting for its next opening.',
                    ]
                  : [
                      'The sky above the wells fills with stalled packets and corrupted glyphs — Lagdrakul’s lagstorm crashes past your defenses and begins to poison the shared networks below.',
                      'Villagers’ armor and tools flicker as the virus rides each delayed connection, and Ailithm goes silent on the comms, still watching the attack patterns with unsettling fascination.',
                      'This run may be lost, but every failed defense is a map of what Lagdrakul can do. Reset your defenses and try again before the dragon’s code becomes the new normal.',
                    ]
              }
              primaryLabel={
                gameState === 'win'
                  ? 'Replay Skyward Defense'
                  : 'Try the Defense Again'
              }
              onPrimary={handleRestart}
              secondaryLabel="Return to Cyber Map"
              onSecondary={() => handleExit(gameState === 'win')}
            />
          )}
        </div>

        <WaveMeter
          currentWave={currentWave}
          totalWaves={WAVES.length}
          lives={lives}
          maxLives={PLAYER_LIVES}
          score={score}
        />
      </div>

      {gameState === 'playing' && (
        <button
          onClick={handleRestart}
          style={{
            padding: '0.35rem 0.9rem',
            borderRadius: '999px',
            border: '1px solid rgba(148,163,184,0.6)',
            background: 'rgba(15,23,42,0.7)',
            color: 'white',
            fontSize: '0.8rem',
            cursor: 'pointer',
          }}
        >
          Restart
        </button>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

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
        position: 'fixed',
        inset: 0,
        background: 'rgba(15,23,42,0.94)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        textAlign: 'center',
        zIndex: 9999,
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
          gap: '0.4rem',
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
            minWidth: 150,
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
            minWidth: 150,
          }}
        >
          {secondaryLabel}
        </button>
      </div>
    </div>
  );
}
