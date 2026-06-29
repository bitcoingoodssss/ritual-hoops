'use client';

import { useCallback, useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';
import BasketballGame from '@/components/game/BasketballGame';
import StartScreen from '@/components/game/StartScreen';
import NFTShop from '@/components/game/NFTShop';

export default function Home() {
  const { phase, setPhase, initTournament, setTwitterId, setAvatarUrl, setPlayerName, avatarUrl } = useGameStore();

  const handleEnterGame = useCallback(() => {
    initTournament();
  }, [initTournament]);

  const handleOpenShop = useCallback(() => {
    setPhase('nftShop');
  }, [setPhase]);

  const handleBackToMenu = useCallback(() => {
    setPhase('menu');
  }, [setPhase]);

  // Prevent scroll on game pages
  useEffect(() => {
    if (phase === 'playing' || phase === 'gameOver' || phase === 'tournamentWin') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [phase]);

  return (
    <main className="w-full h-screen overflow-hidden bg-black">
      {phase === 'menu' && (
        <StartScreen onEnterGame={handleEnterGame} onOpenShop={handleOpenShop} />
      )}
      
      {(phase === 'playing' || phase === 'paused' || phase === 'scored' || phase === 'gameOver' || phase === 'tournamentWin') && (
        <BasketballGame />
      )}
      
      {phase === 'nftShop' && (
        <NFTShop onBack={handleBackToMenu} />
      )}
    </main>
  );
}