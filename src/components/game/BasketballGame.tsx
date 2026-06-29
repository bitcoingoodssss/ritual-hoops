'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { GameEngine } from '@/game/engine/GameEngine';

export default function BasketballGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const frameRef = useRef<number>(0);
  const {
    avatarUrl,
    currentOpponent,
    phase,
    playerScore,
    opponentScore,
    setPhase,
    setScore,
    setHasBall,
    setPlayerAction,
    setShotClock,
    setGameTimer,
    nextRound,
    setCombo,
    setLastAction,
    setShowParticles,
    addPlayerPoints,
    addPlayerStat,
    currentRound,
    getPlayerBonusStats,
  } = useGameStore();

  const [shotClockDisplay, setShotClockDisplay] = useState(24);
  const [gameTimerDisplay, setGameTimerDisplay] = useState('3:00');

  const initEngine = useCallback(() => {
    if (!canvasRef.current || engineRef.current) return;

    const engine = new GameEngine(canvasRef.current, window.innerWidth, window.innerHeight);
    engineRef.current = engine;

    // Set avatars
    if (avatarUrl) {
      engine.setPlayerAvatar(avatarUrl);
    }
    if (currentOpponent?.avatarUrl) {
      engine.setOpponentAvatar(currentOpponent.avatarUrl);
    }

    // Set callbacks
    engine.onScore = (scorer, points, type) => {
      setScore(
        scorer === 'player' ? engine.playerScore : useGameStore.getState().playerScore,
        scorer === 'opponent' ? engine.opponentScore : useGameStore.getState().opponentScore,
      );
      
      if (scorer === 'player') {
        addPlayerPoints(points);
        const newCombo = useGameStore.getState().combo + 1;
        setCombo(newCombo);
      } else {
        setCombo(0);
      }
      
      setShowParticles(true);
      setTimeout(() => setShowParticles(false), 1500);
    };

    engine.onSteal = () => {
      addPlayerStat('steals');
      setLastAction('STEAL!');
    };

    engine.onAction = (action) => {
      setLastAction(action);
    };

    engine.onGameOver = (winner) => {
      setPhase(winner === 'player' ? 'gameOver' : 'gameOver');
    };

    // Start
    engine.start();

    // Timer
    let gameTimer = 180;
    let shotTimer = 24;
    const timerInterval = setInterval(() => {
      if (!engine.isRunning || useGameStore.getState().phase !== 'playing') return;
      
      gameTimer -= 1;
      shotTimer -= 1;
      
      if (gameTimer <= 0) {
        gameTimer = 0;
        clearInterval(timerInterval);
        const s = engine.getScores();
        engine.stop();
        setPhase(s.player >= s.opponent ? 'gameOver' : 'gameOver');
        return;
      }
      
      if (shotTimer <= 0) {
        shotTimer = 24;
        // Turnover
        if (engine.hasBall === 'player') {
          engine.hasBall = 'opponent';
          engine.ball.owner = 'opponent';
        } else {
          engine.hasBall = 'player';
          engine.ball.owner = 'player';
        }
        setLastAction('SHOT CLOCK VIOLATION');
      }
      
      const mins = Math.floor(gameTimer / 60);
      const secs = gameTimer % 60;
      setGameTimerDisplay(`${mins}:${secs.toString().padStart(2, '0')}`);
      setShotClockDisplay(shotTimer);
    }, 1000);

    // Handle resize
    const handleResize = () => {
      engine.resize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(timerInterval);
    };
  }, [avatarUrl, currentOpponent]);

  useEffect(() => {
    const cleanup = initEngine();
    return () => {
      if (cleanup) cleanup();
      if (engineRef.current) {
        engineRef.current.destroy();
        engineRef.current = null;
      }
    };
  }, [initEngine]);

  // Handle phase changes
  useEffect(() => {
    if (phase === 'playing' && engineRef.current) {
      engineRef.current.start();
    } else if (phase !== 'playing' && engineRef.current) {
      engineRef.current.stop();
    }
  }, [phase]);

  // Handle next round
  const handleNextRound = () => {
    if (engineRef.current) {
      engineRef.current.reset();
      const opp = useGameStore.getState().opponents[useGameStore.getState().currentRound + 1];
      if (opp && engineRef.current) {
        engineRef.current.setOpponentAvatar(opp.avatarUrl);
      }
    }
    nextRound();
  };

  const handleRestart = () => {
    if (engineRef.current) {
      engineRef.current.reset();
    }
    useGameStore.getState().initTournament();
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
      
      {/* Game HUD - only show during playing */}
      {phase === 'playing' && (
        <GameHUD
          playerScore={playerScore}
          opponentScore={opponentScore}
          shotClock={shotClockDisplay}
          gameTimer={gameTimerDisplay}
          currentRound={currentRound}
          opponentName={currentOpponent?.name || ''}
          lastAction={useGameStore.getState().lastAction}
          combo={useGameStore.getState().combo}
          hasBall={useGameStore.getState().hasBall}
          getPlayerBonusStats={getPlayerBonusStats}
        />
      )}

      {/* Controls Help */}
      {phase === 'playing' && <ControlsHelp />}

      {/* Game Over Overlay */}
      {phase === 'gameOver' && (
        <GameOverOverlay
          playerScore={playerScore}
          opponentScore={opponentScore}
          opponentName={currentOpponent?.name || ''}
          currentRound={currentRound}
          totalRounds={useGameStore.getState().totalRounds}
          isWin={playerScore > opponentScore}
          onNextRound={handleNextRound}
          onRestart={handleRestart}
        />
      )}

      {/* Tournament Win Overlay */}
      {phase === 'tournamentWin' && (
        <TournamentWinOverlay onRestart={handleRestart} />
      )}
    </div>
  );
}

// ============== HUD Component ==============
function GameHUD({
  playerScore,
  opponentScore,
  shotClock,
  gameTimer,
  currentRound,
  opponentName,
  lastAction,
  combo,
  hasBall,
  getPlayerBonusStats,
}: {
  playerScore: number;
  opponentScore: number;
  shotClock: number;
  gameTimer: string;
  currentRound: number;
  opponentName: string;
  lastAction: string;
  combo: number;
  hasBall: boolean;
  getPlayerBonusStats: () => { speed: number; shoot: number; defense: number; dunk: number };
}) {
  const [showAction, setShowAction] = useState(false);
  const prevActionRef = useRef('');
  const actionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track action changes outside of effect to avoid lint warning
  if (lastAction !== prevActionRef.current) {
    prevActionRef.current = lastAction;
    if (actionTimerRef.current) clearTimeout(actionTimerRef.current);
    setShowAction(true);
    actionTimerRef.current = setTimeout(() => setShowAction(false), 1500);
  }

  const bonus = getPlayerBonusStats();

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Scoreboard */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
        <div className="bg-black/70 backdrop-blur-md rounded-xl px-6 py-3 flex items-center gap-6 border border-orange-500/30">
          {/* Player Score */}
          <div className="text-right">
            <div className="text-xs text-orange-400 font-bold tracking-wider">YOU</div>
            <div className="text-4xl font-black text-white tabular-nums">{playerScore}</div>
          </div>
          
          <div className="flex flex-col items-center gap-1">
            <div className="text-[10px] text-gray-400 uppercase tracking-widest">Round {currentRound + 1}/5</div>
            <div className="text-lg font-bold text-gray-300">VS</div>
            <div className="text-[10px] text-cyan-400 truncate max-w-[100px]">{opponentName}</div>
          </div>
          
          {/* Opponent Score */}
          <div className="text-left">
            <div className="text-xs text-cyan-400 font-bold tracking-wider">OPP</div>
            <div className="text-4xl font-black text-white tabular-nums">{opponentScore}</div>
          </div>
        </div>
      </div>

      {/* Shot Clock & Game Timer */}
      <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
        <div className="bg-black/60 backdrop-blur rounded-lg px-3 py-1.5 border border-yellow-500/40">
          <div className="text-[10px] text-yellow-400 font-bold">SHOT CLOCK</div>
          <div className={`text-2xl font-black tabular-nums ${shotClock <= 5 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
            {shotClock}
          </div>
        </div>
        <div className="bg-black/60 backdrop-blur rounded-lg px-3 py-1.5 border border-gray-500/30">
          <div className="text-[10px] text-gray-400">TIME</div>
          <div className="text-xl font-bold text-white tabular-nums">{gameTimer}</div>
        </div>
      </div>

      {/* Ball Indicator */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
        <div className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-300 ${
          hasBall 
            ? 'bg-orange-500/80 text-white shadow-lg shadow-orange-500/30' 
            : 'bg-red-500/80 text-white shadow-lg shadow-red-500/30 animate-pulse'
        }`}>
          {hasBall ? '🏀 YOUR BALL' : '⚠️ OPPONENT BALL'}
        </div>
      </div>

      {/* Action Popup */}
      {showAction && lastAction && (
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 pointer-events-none">
          <div className="text-5xl font-black text-white animate-bounce drop-shadow-2xl"
               style={{ textShadow: '0 0 30px rgba(255,107,53,0.8), 0 0 60px rgba(255,107,53,0.4)' }}>
            {lastAction.toUpperCase().replace(/_/g, ' ')}
          </div>
        </div>
      )}

      {/* Combo Counter */}
      {combo > 1 && (
        <div className="absolute top-28 left-1/2 -translate-x-1/2">
          <div className="text-2xl font-black text-yellow-400 animate-pulse"
               style={{ textShadow: '0 0 20px rgba(255,200,0,0.6)' }}>
            🔥 {combo}x COMBO!
          </div>
        </div>
      )}

      {/* NFT Bonuses */}
      {(bonus.speed > 0 || bonus.shoot > 0 || bonus.defense > 0 || bonus.dunk > 0) && (
        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur rounded-lg px-3 py-2 border border-purple-500/30">
          <div className="text-[10px] text-purple-400 font-bold mb-1">NFT BONUSES</div>
          <div className="flex gap-3 text-xs text-gray-300">
            {bonus.speed > 0 && <span>⚡{bonus.speed}</span>}
            {bonus.shoot > 0 && <span>🎯{bonus.shoot}</span>}
            {bonus.defense > 0 && <span>🛡️{bonus.defense}</span>}
            {bonus.dunk > 0 && <span>💥{bonus.dunk}</span>}
          </div>
        </div>
      )}

      {/* Power bar when shooting */}
      {/* This could be enhanced with actual shoot power visualization */}
    </div>
  );
}

// ============== Controls Help ==============
function ControlsHelp() {
  const [show, setShow] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur rounded-lg p-3 border border-gray-600/30 max-w-[220px]">
      <div className="text-xs font-bold text-gray-300 mb-2">CONTROLS</div>
      <div className="space-y-1 text-[11px] text-gray-400">
        <div className="flex justify-between"><span>Move</span><span className="text-white">WASD</span></div>
        <div className="flex justify-between"><span>Jump</span><span className="text-white">SPACE</span></div>
        <div className="flex justify-between"><span>Shoot</span><span className="text-white">Hold E</span></div>
        <div className="flex justify-between"><span>Dunk</span><span className="text-white">F (near hoop)</span></div>
        <div className="flex justify-between"><span>Steal</span><span className="text-white">Q</span></div>
        <div className="flex justify-between"><span>Sprint</span><span className="text-white">SHIFT</span></div>
      </div>
    </div>
  );
}

// ============== Game Over Overlay ==============
function GameOverOverlay({
  playerScore,
  opponentScore,
  opponentName,
  currentRound,
  totalRounds,
  isWin,
  onNextRound,
  onRestart,
}: {
  playerScore: number;
  opponentScore: number;
  opponentName: string;
  currentRound: number;
  totalRounds: number;
  isWin: boolean;
  onNextRound: () => void;
  onRestart: () => void;
}) {
  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-b from-gray-900 to-gray-950 rounded-2xl p-8 max-w-md w-full mx-4 border border-orange-500/30 shadow-2xl shadow-orange-500/10">
        <div className="text-center">
          <div className={`text-6xl font-black mb-2 ${
            isWin ? 'text-orange-400' : 'text-red-500'
          }`} style={{ textShadow: `0 0 40px ${isWin ? 'rgba(255,107,53,0.5)' : 'rgba(239,68,68,0.5)'}` }}>
            {isWin ? '🏆 VICTORY!' : '💔 DEFEAT'}
          </div>
          <div className="text-gray-400 text-sm mb-6">Round {currentRound + 1} Complete</div>
          
          <div className="flex justify-center gap-8 mb-6">
            <div>
              <div className="text-xs text-orange-400 font-bold">YOU</div>
              <div className="text-4xl font-black text-white">{playerScore}</div>
            </div>
            <div className="text-3xl text-gray-600 self-center">-</div>
            <div>
              <div className="text-xs text-cyan-400 font-bold">{opponentName}</div>
              <div className="text-4xl font-black text-white">{opponentScore}</div>
            </div>
          </div>

          <div className="flex justify-center gap-3 mb-2">
            {Array.from({ length: totalRounds }).map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i < currentRound + 1
                    ? 'bg-orange-400 shadow-lg shadow-orange-400/50'
                    : 'bg-gray-700'
                }`}
              />
            ))}
          </div>
          <div className="text-xs text-gray-500 mb-6">Tournament Progress</div>
          
          <div className="flex gap-3 justify-center">
            {isWin && currentRound < totalRounds - 1 ? (
              <button
                onClick={onNextRound}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30 pointer-events-auto"
              >
                NEXT ROUND →
              </button>
            ) : null}
            <button
              onClick={onRestart}
              className="px-6 py-3 bg-gray-800 text-gray-300 font-bold rounded-xl hover:bg-gray-700 transition-all border border-gray-600 pointer-events-auto"
            >
              {isWin && currentRound >= totalRounds - 1 ? '🏆 NEW TOURNAMENT' : 'RESTART'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============== Tournament Win Overlay ==============
function TournamentWinOverlay({ onRestart }: { onRestart: () => void }) {
  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-b from-yellow-900/30 to-gray-950 rounded-2xl p-10 max-w-md w-full mx-4 border border-yellow-500/40 shadow-2xl shadow-yellow-500/20">
        <div className="text-center">
          <div className="text-7xl mb-4">👑</div>
          <div className="text-5xl font-black text-yellow-400 mb-2"
               style={{ textShadow: '0 0 40px rgba(255,200,0,0.6)' }}>
            CHAMPION!
          </div>
          <div className="text-gray-400 mb-2">You conquered all 5 opponents!</div>
          <div className="text-yellow-500/80 text-sm mb-8">Ritual Chain Basketball Champion</div>
          
          <div className="bg-black/40 rounded-xl p-4 mb-6 border border-yellow-500/20">
            <div className="text-xs text-yellow-400 font-bold mb-2">REWARDS EARNED</div>
            <div className="flex justify-around text-center">
              <div>
                <div className="text-2xl">🏅</div>
                <div className="text-xs text-gray-400">Gold Trophy NFT</div>
              </div>
              <div>
                <div className="text-2xl">💎</div>
                <div className="text-xs text-gray-400">50 RTUAL</div>
              </div>
              <div>
                <div className="text-2xl">⭐</div>
                <div className="text-xs text-gray-400">Champion Badge</div>
              </div>
            </div>
          </div>
          
          <button
            onClick={onRestart}
            className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-black rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all shadow-lg shadow-yellow-500/30 pointer-events-auto"
          >
            PLAY AGAIN 🔄
          </button>
        </div>
      </div>
    </div>
  );
}