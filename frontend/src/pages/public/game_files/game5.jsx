/*
 * SETUP INSTRUCTIONS FOR USING THIS IN YOUR OWN PROJECT:
 * 
 * This is a React component that requires dependencies to be installed in your project.
 * You CANNOT just add imports at the top - you must install packages via npm/yarn first.
 * 
 * STEP 1: Check if you have a React project
 * - Look for package.json and node_modules folder in your project
 * - If you don't have a React project, create one first:
 *   npx create-react-app my-game
 *   cd my-game
 * 
 * STEP 2: Install required dependencies
 * Open terminal in your project folder and run:
 *   npm install react react-dom lucide-react
 *   npm install -D tailwindcss
 * 
 * STEP 3: Set up Tailwind CSS
 * Run:
 *   npx tailwindcss init
 * 
 * Edit tailwind.config.js:
 *   module.exports = {
 *     content: ["./src/** /*.{js,jsx,ts,tsx}"],
 *     theme: { extend: {} },
 *     plugins: [],
 *   }
 * 
 * Add to your main CSS file (src/index.css or src/App.css):
 *   @tailwind base;
 *   @tailwind components;
 *   @tailwind utilities;
 * 
 * STEP 4: Use this component
 * - Save this file as src/BossFight.jsx
 * - Import it in your App.js:
 *   import BossFight from './BossFight';
 *   function App() {
 *     return <BossFight />;
 *   }
 * 
 * STEP 5: Run your project
 *   npm start
 * 
 * NOTE: This artifact works directly in Claude.ai chat interface.
 * The setup instructions above are only needed if you want to run it
 * in your own React project outside of Claude.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Heart } from 'lucide-react';

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const BATTLE_BOX = { x: 250, y: 300, width: 300, height: 250 };
const PLAYER_WIDTH = 15;
const PLAYER_HEIGHT = 30;
const PLAYER_SPEED = 5;
const BULLET_SPEED = 8;
const BOSS_BULLET_SPEED = 2.5;
const BULLET_SIZE = 6;

const BossFight = () => {
  const [gameState, setGameState] = useState('playing');
  const [playerPos, setPlayerPos] = useState({ 
    x: BATTLE_BOX.x + BATTLE_BOX.width / 2 - PLAYER_WIDTH / 2, 
    y: BATTLE_BOX.y + BATTLE_BOX.height / 2 
  });
  const [playerBullets, setPlayerBullets] = useState([]);
  const [bossBullets, setBossBullets] = useState([]);
  const [bossHealth, setBossHealth] = useState(100);
  const [playerHealth, setPlayerHealth] = useState(7);
  const [invulnerable, setInvulnerable] = useState(false);
  
  const keysPressed = useRef({});
  const lastShot = useRef(0);
  const gameLoop = useRef(null);
  const attackPattern = useRef(0);
  const lastAttack = useRef(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      keysPressed.current[e.key] = true;
      
      if ((e.key === 'z' || e.key === 'Z' || e.key === ' ') && Date.now() - lastShot.current > 200) {
        lastShot.current = Date.now();
        setPlayerBullets(prev => [...prev, {
          x: playerPos.x + PLAYER_WIDTH / 2 - 2,
          y: playerPos.y,
          id: Date.now()
        }]);
      }
    };

    const handleKeyUp = (e) => {
      keysPressed.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [playerPos]);

  const spawnBossAttack = useCallback(() => {
    const now = Date.now();
    if (now - lastAttack.current < 2000) return;
    
    lastAttack.current = now;
    
    // Custom sequence: Tidal, Vwaves, Tidal, then cycle through all
    let pattern;
    if (attackPattern.current === 0) {
      pattern = 4; // Tidal
    } else if (attackPattern.current === 1) {
      pattern = 3; // Vwaves
    } else if (attackPattern.current === 2) {
      pattern = 4; // Tidal
    } else {
      pattern = (attackPattern.current - 3) % 5; // Normal cycle after initial sequence
    }
    attackPattern.current++;

    const newBullets = [];

    if (pattern === 0) {
      // Horizontal
      for (let i = 0; i < 4; i++) {
        const spacing = BATTLE_BOX.width / 5;
        newBullets.push({
          x: BATTLE_BOX.x + spacing + (i * spacing),
          y: BATTLE_BOX.y,
          vx: 0,
          vy: BOSS_BULLET_SPEED,
          id: `boss-${now}-${i}`
        });
      }
    } else if (pattern === 1) {
      // Vertical
      for (let i = 0; i < 3; i++) {
        const spacing = BATTLE_BOX.height / 4;
        newBullets.push({
          x: BATTLE_BOX.x,
          y: BATTLE_BOX.y + spacing * (i + 0.5),
          vx: BOSS_BULLET_SPEED,
          vy: 0,
          id: `boss-${now}-${i}`
        });
      }
    } else if (pattern === 2) {
      // Hwaves - horizontal waves
      const platformHeights = [
        BATTLE_BOX.y + BATTLE_BOX.height * 0.25,
        BATTLE_BOX.y + BATTLE_BOX.height * 0.5,
        BATTLE_BOX.y + BATTLE_BOX.height * 0.75
      ];
      
      platformHeights.forEach((height, idx) => {
        for (let j = 0; j < 6; j++) {
          newBullets.push({
            x: BATTLE_BOX.x + (j * BATTLE_BOX.width / 5),
            y: height,
            vx: (idx % 2 === 0) ? BOSS_BULLET_SPEED * 0.7 : -BOSS_BULLET_SPEED * 0.7,
            vy: 0,
            id: `hwave-${now}-${idx}-${j}`
          });
        }
      });
    } else if (pattern === 3) {
      // Vwaves - vertical waves rising from bottom
      for (let wave = 0; wave < 3; wave++) {
        setTimeout(() => {
          setBossBullets(prev => {
            const waveYStart = BATTLE_BOX.y + BATTLE_BOX.height;
            const waveBullets = [];
            
            const gapPosition = Math.floor(Math.random() * 4);
            for (let i = 0; i < 5; i++) {
              if (i !== gapPosition) {
                waveBullets.push({
                  x: BATTLE_BOX.x + (i * BATTLE_BOX.width / 5) + BATTLE_BOX.width / 10,
                  y: waveYStart,
                  vx: 0,
                  vy: -BOSS_BULLET_SPEED * 1.2,
                  id: `vwave-${now}-${wave}-${i}`
                });
              }
            }
            
            return [...prev, ...waveBullets];
          });
        }, wave * 600);
      }
      return;
    } else {
      // Tidal - three waves crossing the screen
      // Wave 1: Rising from bottom (. .. ... .. .)
      setTimeout(() => {
        setBossBullets(prev => {
          const tidalBullets = [];
          const linePattern = [1, 2, 3, 2, 1];
          
          linePattern.forEach((count, colIdx) => {
            const lineX = BATTLE_BOX.x + (colIdx * BATTLE_BOX.width / 5) + BATTLE_BOX.width / 10;
            
            for (let i = 0; i < count; i++) {
              const verticalSpacing = BATTLE_BOX.height / (count + 1);
              tidalBullets.push({
                x: lineX,
                y: BATTLE_BOX.y + BATTLE_BOX.height + 20 + (i * 15),
                vx: 0,
                vy: -BOSS_BULLET_SPEED * 1.3,
                id: `tidal1-${now}-${colIdx}-${i}`
              });
            }
          });
          
          return [...prev, ...tidalBullets];
        });
      }, 400);
      
      // Wave 2: Crashing from top (. .. ... .. .)
      setTimeout(() => {
        setBossBullets(prev => {
          const tidalBullets = [];
          const linePattern = [1, 2, 3, 2, 1];
          
          linePattern.forEach((count, colIdx) => {
            const lineX = BATTLE_BOX.x + (colIdx * BATTLE_BOX.width / 5) + BATTLE_BOX.width / 10;
            
            for (let i = 0; i < count; i++) {
              tidalBullets.push({
                x: lineX,
                y: BATTLE_BOX.y - 20 - (i * 15),
                vx: 0,
                vy: BOSS_BULLET_SPEED * 1.3,
                id: `tidal2-${now}-${colIdx}-${i}`
              });
            }
          });
          
          return [...prev, ...tidalBullets];
        });
      }, 1200);
      
      // Wave 3: Rising from bottom again (. .. ... .. .)
      setTimeout(() => {
        setBossBullets(prev => {
          const tidalBullets = [];
          const linePattern = [1, 2, 3, 2, 1];
          
          linePattern.forEach((count, colIdx) => {
            const lineX = BATTLE_BOX.x + (colIdx * BATTLE_BOX.width / 5) + BATTLE_BOX.width / 10;
            
            for (let i = 0; i < count; i++) {
              tidalBullets.push({
                x: lineX,
                y: BATTLE_BOX.y + BATTLE_BOX.height + 20 + (i * 15),
                vx: 0,
                vy: -BOSS_BULLET_SPEED * 1.3,
                id: `tidal3-${now}-${colIdx}-${i}`
              });
            }
          });
          
          return [...prev, ...tidalBullets];
        });
      }, 2000);
      
      return;
    }

    setBossBullets(prev => [...prev, ...newBullets]);
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const update = () => {
      setPlayerPos(prev => {
        let newX = prev.x;
        let newY = prev.y;

        if (keysPressed.current['ArrowLeft'] || keysPressed.current['a'] || keysPressed.current['A']) {
          newX = Math.max(BATTLE_BOX.x, prev.x - PLAYER_SPEED);
        }
        if (keysPressed.current['ArrowRight'] || keysPressed.current['d'] || keysPressed.current['D']) {
          newX = Math.min(BATTLE_BOX.x + BATTLE_BOX.width - PLAYER_WIDTH, prev.x + PLAYER_SPEED);
        }
        if (keysPressed.current['ArrowUp'] || keysPressed.current['w'] || keysPressed.current['W']) {
          newY = Math.max(BATTLE_BOX.y, prev.y - PLAYER_SPEED);
        }
        if (keysPressed.current['ArrowDown'] || keysPressed.current['s'] || keysPressed.current['S']) {
          newY = Math.min(BATTLE_BOX.y + BATTLE_BOX.height - PLAYER_HEIGHT, prev.y + PLAYER_SPEED);
        }

        return { x: newX, y: newY };
      });

      setPlayerBullets(prev => {
        const updated = prev
          .map(b => ({ ...b, y: b.y - BULLET_SPEED }))
          .filter(b => b.y > 0);
        
        const hits = updated.filter(b => 
          b.y < 200 && b.x > 300 && b.x < 500
        );
        
        if (hits.length > 0) {
          setBossHealth(h => Math.max(0, h - hits.length * 2));
          return updated.filter(b => !hits.includes(b));
        }
        
        return updated;
      });

      setBossBullets(prev => {
        const now = Date.now();
        return prev
          .filter(b => {
            if (b.lifetime && b.spawnTime && now - b.spawnTime > b.lifetime) {
              return false;
            }
            return true;
          })
          .map(b => ({ ...b, x: b.x + b.vx, y: b.y + b.vy }))
          .filter(b => 
            b.x > BATTLE_BOX.x - 20 && 
            b.x < BATTLE_BOX.x + BATTLE_BOX.width + 20 &&
            b.y > BATTLE_BOX.y - 20 && 
            b.y < BATTLE_BOX.y + BATTLE_BOX.height + 20
          );
      });

      if (!invulnerable) {
        setBossBullets(prev => {
          const hit = prev.find(b => 
            b.x > playerPos.x - BULLET_SIZE && 
            b.x < playerPos.x + PLAYER_WIDTH + BULLET_SIZE &&
            b.y > playerPos.y - BULLET_SIZE && 
            b.y < playerPos.y + PLAYER_HEIGHT + BULLET_SIZE
          );

          if (hit) {
            setPlayerHealth(h => Math.max(0, h - 1));
            setInvulnerable(true);
            setTimeout(() => setInvulnerable(false), 1000);
            return prev.filter(b => b.id !== hit.id);
          }
          return prev;
        });
      }

      spawnBossAttack();

      gameLoop.current = requestAnimationFrame(update);
    };

    gameLoop.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(gameLoop.current);
  }, [gameState, playerPos, invulnerable, spawnBossAttack]);

  useEffect(() => {
    if (bossHealth <= 0) {
      setGameState('won');
    } else if (playerHealth <= 0) {
      setGameState('lost');
    }
  }, [bossHealth, playerHealth]);

  const resetGame = () => {
    setGameState('playing');
    setPlayerPos({ 
      x: BATTLE_BOX.x + BATTLE_BOX.width / 2 - PLAYER_WIDTH / 2, 
      y: BATTLE_BOX.y + BATTLE_BOX.height / 2 
    });
    setPlayerBullets([]);
    setBossBullets([]);
    setBossHealth(100);
    setPlayerHealth(7);
    setInvulnerable(false);
    attackPattern.current = 0;
    lastAttack.current = 0;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="relative" style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}>
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center">
          <div className="text-6xl mb-2">🐉</div>
          <div className="text-white font-bold mb-1">SKELETAL DRAGON</div>
          <div className="bg-red-900 h-4 rounded overflow-hidden" style={{ width: 200 }}>
            <div 
              className="bg-red-500 h-full transition-all duration-300"
              style={{ width: `${bossHealth}%` }}
            />
          </div>
        </div>

        <div 
          className="absolute border-4 border-white"
          style={{
            left: BATTLE_BOX.x,
            top: BATTLE_BOX.y,
            width: BATTLE_BOX.width,
            height: BATTLE_BOX.height
          }}
        >
          <div 
            className={`absolute ${invulnerable ? 'opacity-50 animate-pulse' : ''}`}
            style={{
              left: playerPos.x - BATTLE_BOX.x,
              top: playerPos.y - BATTLE_BOX.y,
              width: PLAYER_WIDTH,
              height: PLAYER_HEIGHT,
              backgroundColor: '#ff0000',
              transition: invulnerable ? 'none' : 'all 0.05s'
            }}
          />

          {bossBullets.map(bullet => (
            <div
              key={bullet.id}
              className="absolute bg-white rounded-full"
              style={{
                left: bullet.x - BATTLE_BOX.x - BULLET_SIZE / 2,
                top: bullet.y - BATTLE_BOX.y - BULLET_SIZE / 2,
                width: BULLET_SIZE,
                height: BULLET_SIZE
              }}
            />
          ))}
        </div>

        {playerBullets.map(bullet => (
          <div
            key={bullet.id}
            className="absolute bg-yellow-400"
            style={{
              left: bullet.x,
              top: bullet.y,
              width: 4,
              height: 12
            }}
          />
        ))}

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
          {Array.from({ length: playerHealth }).map((_, i) => (
            <Heart key={i} className="w-6 h-6 fill-red-500 text-red-500" />
          ))}
        </div>

        <div className="absolute bottom-8 left-8 text-white text-sm">
          <div>Arrow Keys / WASD: Move</div>
          <div>Z / Space: Shoot</div>
        </div>

        {gameState !== 'playing' && (
          <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center">
            <div className="text-center">
              <div className="text-white text-4xl font-bold mb-4">
                {gameState === 'won' ? 'YOU WON!' : 'GAME OVER'}
              </div>
              <button
                onClick={resetGame}
                className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BossFight;
