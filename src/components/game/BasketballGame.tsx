'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { GameEngine } from '@/game/engine/GameEngine';
import { t } from '@/lib/i18n';

export default function BasketballGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const frameRef = useRef<number>(0);
  const {
    avatarUrl, currentOpponent, phase, playerScore, opponentScore,
    lastAction, combo, hasBall, walletConnected, playerStats, currentRound,
    lang, setLang, setPhase, setScore, setHasBall, setPlayerAction,
    setShotClock, setGameTimer, nextRound, setCombo, setLastAction,
    setShowParticles, addPlayerPoints, addPlayerStat, totalRounds,
    addGameRecord, setRitualBalance, getPlayerBonusStats,
  } = useGameStore();

  const [shotClockDisplay, setShotClockDisplay] = useState(24);
  const [gameTimerDisplay, setGameTimerDisplay] = useState('3:00');
  const [shootPower, setShootPower] = useState(0);
  const [contextHint, setContextHint] = useState<string>('none');

  const initEngine = useCallback(() => {
    if (!canvasRef.current || engineRef.current) return;
    const engine = new GameEngine(canvasRef.current, window.innerWidth, window.innerHeight);
    engineRef.current = engine;

    if (avatarUrl) engine.setPlayerAvatar(avatarUrl);
    if (currentOpponent?.avatarUrl) engine.setOpponentAvatar(currentOpponent.avatarUrl);
    engine.setPlayerBonus(getPlayerBonusStats());
    engine.onContextHint = (hint: string) => setContextHint(hint);
    engine.onShootPower = (p: number) => setShootPower(p);

    engine.onScore = (scorer, points, type) => {
      setScore(
        scorer === 'player' ? engine.playerScore : useGameStore.getState().playerScore,
        scorer === 'opponent' ? engine.opponentScore : useGameStore.getState().opponentScore,
      );
      setHasBall(scorer === 'player');
      if (scorer === 'player') { addPlayerPoints(points); setCombo(useGameStore.getState().combo + 1); }
      else { setCombo(0); }
      setShowParticles(true);
      setTimeout(() => setShowParticles(false), 1500);
    };

    engine.onSteal = () => {
      addPlayerStat('steals');
      setLastAction('STEAL!');
      setHasBall(true);
    };

    engine.onAction = (action) => {
      setLastAction(action);
      if (action === 'steal') setHasBall(true);
      if (action === 'opponent_steal') setHasBall(false);
    };

    engine.onGameOver = (winner) => {
      setPhase('gameOver');
      if (useGameStore.getState().walletConnected) {
        const s = engine.getScores();
        const isWin = s.player > s.opponent;
        const earned = isWin ? 0.05 : 0.01;
        addGameRecord({
          id: Date.now().toString(),
          date: new Date().toLocaleString(),
          opponentName: useGameStore.getState().currentOpponent?.name || 'Unknown',
          playerScore: s.player, opponentScore: s.opponent,
          result: isWin ? 'win' : 'loss',
          round: useGameStore.getState().currentRound,
          playerPoints: useGameStore.getState().playerStats.points,
          steals: useGameStore.getState().playerStats.steals,
          rtualEarned: earned,
        });
        setRitualBalance(useGameStore.getState().ritualBalance + earned);
      }
    };

    engine.start();

    let gameTimer = 180;
    let shotTimer = 24;
    const timerInterval = setInterval(() => {
      if (!engine.isRunning || useGameStore.getState().phase !== 'playing') return;
      gameTimer -= 1; shotTimer -= 1;
      if (gameTimer <= 0) {
        gameTimer = 0; clearInterval(timerInterval);
        const s = engine.getScores(); engine.stop();
        setPhase('gameOver'); return;
      }
      if (shotTimer <= 0) {
        shotTimer = 24;
        if (engine.hasBall === 'player') { engine.hasBall = 'opponent'; engine.ball.owner = 'opponent'; setHasBall(false); }
        else { engine.hasBall = 'player'; engine.ball.owner = 'player'; setHasBall(true); }
        setLastAction('SHOT CLOCK VIOLATION');
      }
      const mins = Math.floor(gameTimer / 60);
      const secs = gameTimer % 60;
      setGameTimerDisplay(`${mins}:${secs.toString().padStart(2, '0')}`);
      setShotClockDisplay(shotTimer);
    }, 1000);

    const handleResize = () => engine.resize(window.innerWidth, window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => { window.removeEventListener('resize', handleResize); clearInterval(timerInterval); };
  }, [avatarUrl, currentOpponent, setScore, setHasBall, setCombo, setLastAction, setShowParticles, addPlayerPoints, addPlayerStat, setPhase, addGameRecord, setRitualBalance, getPlayerBonusStats]);

  useEffect(() => {
    const cleanup = initEngine();
    return () => { if (cleanup) cleanup(); if (engineRef.current) { engineRef.current.destroy(); engineRef.current = null; } };
  }, [initEngine]);

  useEffect(() => {
    if (phase === 'playing' && engineRef.current) engineRef.current.start();
    else if (phase !== 'playing' && engineRef.current) engineRef.current.stop();
  }, [phase]);

  const handleNextRound = () => {
    if (engineRef.current) {
      engineRef.current.reset();
      const opp = useGameStore.getState().opponents[useGameStore.getState().currentRound + 1];
      if (opp && engineRef.current) engineRef.current.setOpponentAvatar(opp.avatarUrl);
    }
    nextRound();
  };

  const handleRestart = () => {
    if (engineRef.current) engineRef.current.reset();
    useGameStore.getState().initTournament();
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {phase === 'playing' && (
        <GameHUD playerScore={playerScore} opponentScore={opponentScore} shotClock={shotClockDisplay}
          gameTimer={gameTimerDisplay} currentRound={currentRound} opponentName={currentOpponent?.name || ''}
          lastAction={lastAction} combo={combo} hasBall={hasBall} shootPower={shootPower}
          getPlayerBonusStats={getPlayerBonusStats} />
      )}
      {phase === 'playing' && <ContextHintOverlay hint={contextHint} />}
      {phase === 'playing' && <ControlsHelp />}
      {phase === 'playing' && <MiniControlsBar />}
      {phase === 'gameOver' && (
        <GameOverOverlay playerScore={playerScore} opponentScore={opponentScore}
          opponentName={currentOpponent?.name || ''} currentRound={currentRound} totalRounds={totalRounds}
          isWin={playerScore > opponentScore} onNextRound={handleNextRound} onRestart={handleRestart} />
      )}
      {phase === 'tournamentWin' && <TournamentWinOverlay onRestart={handleRestart} />}
    </div>
  );
}

// ============== Lang Toggle ==============
function LangToggle() {
  const lang = useGameStore((s) => s.lang);
  const setLang = useGameStore((s) => s.setLang);
  return (
    <button onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
      className="bg-black/60 backdrop-blur rounded-lg px-2.5 py-1 border border-gray-600/50 text-gray-400 hover:text-white text-xs font-bold z-50 pointer-events-auto">
      {lang === 'en' ? '中文' : 'EN'}
    </button>
  );
}

// ============== HUD Component ==============
function GameHUD({ playerScore, opponentScore, shotClock, gameTimer, currentRound, opponentName, lastAction, combo, hasBall, shootPower, getPlayerBonusStats }: {
  playerScore: number; opponentScore: number; shotClock: number; gameTimer: string;
  currentRound: number; opponentName: string; lastAction: string; combo: number;
  hasBall: boolean; shootPower: number;
  getPlayerBonusStats: () => { speed: number; shoot: number; defense: number; dunk: number };
}) {
  const lang = useGameStore((s) => s.lang);
  const bonus = getPlayerBonusStats();
  const actionKey = lastAction || 'none';
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-4 left-4 z-50"><LangToggle /></div>
      {shootPower > 0 && (
        <div className="absolute left-8 top-1/2 -translate-y-1/2 w-4 h-48 bg-black/60 backdrop-blur rounded-full border border-gray-600/50 overflow-hidden flex flex-col-reverse">
          <div className="w-full rounded-full transition-all duration-75" style={{
            height: `${shootPower * 100}%`,
            background: shootPower < 0.5 ? 'linear-gradient(to top, #22c55e, #f97316)' : 'linear-gradient(to top, #f97316, #ef4444)',
            boxShadow: `0 0 ${8 + shootPower * 12}px ${shootPower < 0.5 ? 'rgba(34,197,94,0.6)' : 'rgba(239,68,68,0.6)'}`,
          }} />
        </div>
      )}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
        <div className="bg-black/70 backdrop-blur-md rounded-xl px-6 py-3 flex items-center gap-6 border border-orange-500/30">
          <div className="text-right">
            <div className="text-xs text-orange-400 font-bold tracking-wider">{t('hud.you', lang)}</div>
            <div className="text-4xl font-black text-white tabular-nums">{playerScore}</div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="text-[10px] text-gray-400 uppercase tracking-widest">{t('hud.round', lang, { r: currentRound + 1 })}</div>
            <div className="text-lg font-bold text-gray-300">VS</div>
            <div className="text-[10px] text-cyan-400 truncate max-w-[100px]">{opponentName}</div>
          </div>
          <div className="text-left">
            <div className="text-xs text-cyan-400 font-bold tracking-wider">{t('hud.opp', lang)}</div>
            <div className="text-4xl font-black text-white tabular-nums">{opponentScore}</div>
          </div>
        </div>
      </div>
      {/* Player Twitter info - below score */}
      <div className="absolute top-[72px] left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 border border-gray-700/40">
        {avatarUrl && <img src={avatarUrl} alt="" className="w-5 h-5 rounded-full border border-orange-400/60" />}
        <span className="text-[11px] font-bold text-gray-300">@{twitterId || playerName}</span>
        {gameHistory.length > 0 && (
          <span className="text-[10px] text-yellow-400 font-bold">{gameHistory.filter(g => g.result === 'win').length}W-{gameHistory.filter(g => g.result === 'loss').length}L</span>
        )}
      </div>
      <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
        <div className="bg-black/60 backdrop-blur rounded-lg px-3 py-1.5 border border-yellow-500/40">
          <div className="text-[10px] text-yellow-400 font-bold">{t('hud.shotClock', lang)}</div>
          <div className={`text-2xl font-black tabular-nums ${shotClock <= 5 ? 'text-red-500 animate-pulse' : 'text-white'}`}>{shotClock}</div>
        </div>
        <div className="bg-black/60 backdrop-blur rounded-lg px-3 py-1.5 border border-gray-500/30">
          <div className="text-[10px] text-gray-400">{t('hud.time', lang)}</div>
          <div className="text-xl font-bold text-white tabular-nums">{gameTimer}</div>
        </div>
      </div>
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
        <div className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-300 ${hasBall ? 'bg-orange-500/80 text-white shadow-lg shadow-orange-500/30' : 'bg-red-500/80 text-white shadow-lg shadow-red-500/30 animate-pulse'}`}>
          {hasBall ? t('hud.yourBall', lang) : t('hud.oppBall', lang)}
        </div>
      </div>
      {lastAction && (
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 pointer-events-none" key={actionKey}>
          <div className="action-pop text-5xl font-black text-white drop-shadow-2xl" style={{ textShadow: '0 0 30px rgba(255,107,53,0.8), 0 0 60px rgba(255,107,53,0.4)' }}>
            {lastAction.toUpperCase().replace(/_/g, ' ')}
          </div>
        </div>
      )}
      {combo > 1 && (
        <div className="absolute top-28 left-1/2 -translate-x-1/2">
          <div className="text-2xl font-black text-yellow-400 animate-pulse" style={{ textShadow: '0 0 20px rgba(255,200,0,0.6)' }}>
            {t('hud.combo', lang, { n: combo })}
          </div>
        </div>
      )}
      {(bonus.speed > 0 || bonus.shoot > 0 || bonus.defense > 0 || bonus.dunk > 0) && (
        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur rounded-lg px-3 py-2 border border-purple-500/30">
          <div className="text-[10px] text-purple-400 font-bold mb-1">{t('hud.nftBonus', lang)}</div>
          <div className="flex gap-3 text-xs text-gray-300">
            {bonus.speed > 0 && <span>⚡{bonus.speed}</span>}
            {bonus.shoot > 0 && <span>🎯{bonus.shoot}</span>}
            {bonus.defense > 0 && <span>🛡️{bonus.defense}</span>}
            {bonus.dunk > 0 && <span>💥{bonus.dunk}</span>}
          </div>
        </div>
      )}
    </div>
  );
}

// ============== Context Hint Overlay ==============
function ContextHintOverlay({ hint }: { hint: string }) {
  const lang = useGameStore((s) => s.lang);
  if (hint === 'none') return null;
  const cfg: Record<string, { text: string; cls: string }> = {
    shoot: { text: t('hints.shoot', lang), cls: 'text-orange-300 drop-shadow-[0_0_20px_rgba(255,107,53,0.8)]' },
    dunk: { text: t('hints.dunk', lang), cls: 'text-red-400 drop-shadow-[0_0_24px_rgba(239,68,68,0.8)]' },
    steal: { text: t('hints.steal', lang), cls: 'text-cyan-300 drop-shadow-[0_0_16px_rgba(34,211,238,0.6)]' },
    steal_far: { text: lang === 'zh' ? '靠近对手按 [Q]' : 'Get close, press [Q]', cls: 'text-cyan-500/60' },
    move: { text: t('hints.move', lang), cls: 'text-gray-400' },
  };
  const c = cfg[hint];
  if (!c) return null;
  return (
    <div className="absolute bottom-28 left-1/2 -translate-x-1/2 pointer-events-none z-30">
      <div className={`text-2xl font-black tracking-wide transition-all duration-300 ${c.cls}`} style={{ animation: 'fadeIn 0.2s ease-out' }}>{c.text}</div>
    </div>
  );
}

// ============== Controls Help (full panel) ==============
function ControlsHelp() {
  const lang = useGameStore((s) => s.lang);
  const [show, setShow] = useState(true);
  const [dismissed, setDismissed] = useState(false);
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'h' || e.key === 'H') { setShow((p) => !p); setDismissed(false); } };
    window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h);
  }, []);
  useEffect(() => { if (dismissed) return; const t = setTimeout(() => setShow(false), 15000); return () => clearTimeout(t); }, [dismissed]);
  if (!show) return null;
  return (
    <div className="absolute bottom-16 right-5 bg-black/85 backdrop-blur-xl rounded-2xl p-5 border border-orange-500/40 shadow-2xl shadow-orange-500/10 w-[280px] select-none" style={{ animation: 'fadeIn 0.3s ease-out' }}>
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-black text-orange-400 tracking-wider flex items-center gap-2">{t('controls.label', lang)}</div>
        <button onClick={() => { setShow(false); setDismissed(true); }} className="text-gray-500 hover:text-white text-xs transition-colors w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10 pointer-events-auto">✕</button>
      </div>
      <div className="space-y-3 text-[13px]">
        <ControlRow icon="🏃" label={t('controls.move', lang)} keys="W A S D" />
        <ControlRow icon="⬆️" label={t('controls.jump', lang)} keys="SPACE" />
        <ControlRow icon="🎯" label={t('controls.shoot', lang)} keys="E" highlight />
        <ControlRow icon="💥" label={t('controls.dunk', lang)} keys="F" />
        <ControlRow icon="🤚" label={t('controls.steal', lang)} keys="Q" />
        <ControlRow icon="⚡" label={t('controls.sprint', lang)} keys="SHIFT" />
      </div>
      <div className="mt-4 pt-3 border-t border-gray-700/50 text-[11px] text-gray-500 text-center">{t('controls.tipLine', lang)}</div>
      <div className="mt-2 text-[11px] text-gray-600 text-center">{t('controls.toggleHint', lang)}</div>
    </div>
  );
}

function ControlRow({ icon, label, keys, highlight }: { icon: string; label: string; keys: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-300 flex items-center gap-2"><span className="text-sm">{icon}</span> {label}</span>
      <span className={`font-mono px-2.5 py-1 rounded-md text-xs font-bold ${highlight ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' : 'bg-white/10 text-white'}`}>{keys}</span>
    </div>
  );
}

// ============== Persistent Mini Controls Bar ==============
function MiniControlsBar() {
  const hasBall = useGameStore((s) => s.hasBall);
  return (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/60 backdrop-blur-md rounded-full px-3 py-1.5 border border-gray-700/30 z-20 pointer-events-none">
      <MiniKey label="WASD" active={true} /><div className="w-px h-3.5 bg-gray-700/60" />
      <MiniKey label="SPACE" /><div className="w-px h-3.5 bg-gray-700/60" />
      <MiniKey label="E" active={hasBall} /><div className="w-px h-3.5 bg-gray-700/60" />
      <MiniKey label="F" active={hasBall} /><div className="w-px h-3.5 bg-gray-700/60" />
      <MiniKey label="Q" /><div className="w-px h-3.5 bg-gray-700/60" />
      <MiniKey label="SHIFT" />
    </div>
  );
}
function MiniKey({ label, active }: { label: string; active?: boolean }) {
  return (<div className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold transition-all ${active ? 'bg-orange-500/30 text-orange-300' : 'bg-white/8 text-gray-500'}`}>{label}</div>);
}

// ============== Game Over Overlay ==============
function GameOverOverlay({ playerScore, opponentScore, opponentName, currentRound, totalRounds, isWin, onNextRound, onRestart }: {
  playerScore: number; opponentScore: number; opponentName: string; currentRound: number; totalRounds: number; isWin: boolean; onNextRound: () => void; onRestart: () => void;
}) {
  const lang = useGameStore((s) => s.lang);
  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-b from-gray-900 to-gray-950 rounded-2xl p-8 max-w-md w-full mx-4 border border-orange-500/30 shadow-2xl shadow-orange-500/10">
        <div className="text-center">
          <div className={`text-6xl font-black mb-2 ${isWin ? 'text-orange-400' : 'text-red-500'}`} style={{ textShadow: `0 0 40px ${isWin ? 'rgba(255,107,53,0.5)' : 'rgba(239,68,68,0.5)'}` }}>
            {isWin ? t('gameOver.victory', lang) : t('gameOver.defeat', lang)}
          </div>
          <div className="text-gray-400 text-sm mb-6">{t('gameOver.roundDone', lang, { r: currentRound + 1 })}</div>
          <div className="flex justify-center gap-8 mb-6">
            <div><div className="text-xs text-orange-400 font-bold">{t('hud.you', lang)}</div><div className="text-4xl font-black text-white">{playerScore}</div></div>
            <div className="text-3xl text-gray-600 self-center">-</div>
            <div><div className="text-xs text-cyan-400 font-bold">{opponentName}</div><div className="text-4xl font-black text-white">{opponentScore}</div></div>
          </div>
          <div className="flex justify-center gap-3 mb-2">
            {Array.from({ length: totalRounds }).map((_, i) => (<div key={i} className={`w-3 h-3 rounded-full ${i < currentRound + 1 ? 'bg-orange-400 shadow-lg shadow-orange-400/50' : 'bg-gray-700'}`} />))}
          </div>
          <div className="text-xs text-gray-500 mb-6">{t('gameOver.progress', lang)}</div>
          <div className="flex gap-3 justify-center">
            {isWin && currentRound < totalRounds - 1 && (<button onClick={onNextRound} className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30 pointer-events-auto">{t('gameOver.nextRound', lang)}</button>)}
            <button onClick={onRestart} className="px-6 py-3 bg-gray-800 text-gray-300 font-bold rounded-xl hover:bg-gray-700 transition-all border border-gray-600 pointer-events-auto">
              {isWin && currentRound >= totalRounds - 1 ? t('gameOver.newTourney', lang) : t('gameOver.restart', lang)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============== Tournament Win Overlay ==============
function TournamentWinOverlay({ onRestart }: { onRestart: () => void }) {
  const lang = useGameStore((s) => s.lang);
  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-b from-yellow-900/30 to-gray-950 rounded-2xl p-10 max-w-md w-full mx-4 border border-yellow-500/40 shadow-2xl shadow-yellow-500/20">
        <div className="text-center">
          <div className="text-7xl mb-4">👑</div>
          <div className="text-5xl font-black text-yellow-400 mb-2" style={{ textShadow: '0 0 40px rgba(255,200,0,0.6)' }}>{t('champ.title', lang)}</div>
          <div className="text-gray-400 mb-2">{t('champ.subtitle', lang)}</div>
          <div className="text-yellow-500/80 text-sm mb-8">{t('champ.tagline', lang)}</div>
          <div className="bg-black/40 rounded-xl p-4 mb-6 border border-yellow-500/20">
            <div className="text-xs text-yellow-400 font-bold mb-2">{t('champ.rewards', lang)}</div>
            <div className="flex justify-around text-center">
              <div><div className="text-2xl">🏅</div><div className="text-xs text-gray-400">{t('champ.trophy', lang)}</div></div>
              <div><div className="text-2xl">💎</div><div className="text-xs text-gray-400">50 RTUAL</div></div>
              <div><div className="text-2xl">⭐</div><div className="text-xs text-gray-400">{lang === 'zh' ? '冠军徽章' : 'Champion Badge'}</div></div>
            </div>
          </div>
          <button onClick={onRestart} className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-black rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all shadow-lg shadow-yellow-500/30 pointer-events-auto">{t('champ.again', lang)}</button>
        </div>
      </div>
    </div>
  );
}