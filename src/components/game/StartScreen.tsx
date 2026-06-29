'use client';

import { useState } from 'react';
import { useGameStore, ALL_NFTS } from '@/store/gameStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function StartScreen({ onEnterGame, onOpenShop }: { onEnterGame: () => void; onOpenShop: () => void }) {
  const { twitterId, setTwitterId, setAvatarUrl, setPlayerName, walletConnected, avatarUrl } = useGameStore();
  const [inputId, setInputId] = useState(twitterId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!inputId.trim()) {
      setError('Please enter your Twitter ID');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch(`/api/twitter?id=${encodeURIComponent(inputId.trim())}`);
      const data = await res.json();
      
      if (data.avatarUrl) {
        setTwitterId(inputId.trim());
        setAvatarUrl(data.avatarUrl);
        setPlayerName(inputId.trim().replace('@', ''));
        onEnterGame();
      } else {
        setError('Could not load avatar. Please try again.');
      }
    } catch {
      // Fallback - still allow entry
      setTwitterId(inputId.trim());
      const fallbackUrl = `https://api.dicebear.com/9.x/adventurer/svg?seed=${inputId.trim()}&backgroundColor=ff6b35`;
      setAvatarUrl(fallbackUrl);
      setPlayerName(inputId.trim().replace('@', ''));
      onEnterGame();
    }
    
    setLoading(false);
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden"
         style={{ background: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0a1a2e 100%)' }}>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Floating basketball emojis */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl opacity-10 animate-bounce"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + Math.sin(i) * 30}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.3}s`,
            }}
          >
            🏀
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center max-w-lg w-full mx-4">
        {/* Logo / Title */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="text-center mb-8"
        >
          <div className="text-7xl mb-4">🏀</div>
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-purple-500 mb-2"
              style={{ textShadow: '0 0 60px rgba(255,107,53,0.3)' }}>
            RITUAL HOOPS
          </h1>
          <p className="text-gray-400 text-sm tracking-widest uppercase">
            Chain Basketball Championship
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-xs font-bold">LIVE ON RITUAL CHAIN</span>
          </div>
        </motion.div>

        {/* Twitter ID Input */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 mb-4"
        >
          <label className="block text-sm font-bold text-gray-300 mb-2">
            Enter Your Twitter ID
          </label>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">@</span>
              <input
                type="text"
                value={inputId}
                onChange={(e) => setInputId(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="your_twitter_handle"
                className="w-full bg-black/50 border border-gray-600 rounded-xl pl-8 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 transition-all"
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all shadow-lg shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Loading
                </span>
              ) : 'PLAY'}
            </button>
          </div>
          {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
          
          {/* Preview */}
          {avatarUrl && (
            <div className="mt-4 flex items-center gap-3">
              <img src={avatarUrl} alt="Avatar" className="w-10 h-10 rounded-full border-2 border-orange-500" />
              <span className="text-gray-300 text-sm">Playing as <strong className="text-orange-400">{inputId.replace('@', '')}</strong></span>
            </div>
          )}
        </motion.div>

        {/* Tournament Info */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full bg-gray-900/40 backdrop-blur rounded-xl p-4 border border-gray-700/30 mb-4"
        >
          <div className="flex items-center gap-4 text-sm">
            <div className="flex-1 text-center">
              <div className="text-2xl mb-1">🏆</div>
              <div className="text-gray-400">5 Rounds</div>
              <div className="text-gray-500 text-xs">Tournament</div>
            </div>
            <div className="w-px h-12 bg-gray-700" />
            <div className="flex-1 text-center">
              <div className="text-2xl mb-1">⚔️</div>
              <div className="text-gray-400">1v1</div>
              <div className="text-gray-500 text-xs">Basketball</div>
            </div>
            <div className="w-px h-12 bg-gray-700" />
            <div className="flex-1 text-center">
              <div className="text-2xl mb-1">💎</div>
              <div className="text-gray-400">NFTs</div>
              <div className="text-gray-500 text-xs">Power Up</div>
            </div>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex gap-3 w-full"
        >
          <button
            onClick={onOpenShop}
            className="flex-1 py-3 bg-gray-800/60 border border-purple-500/30 text-purple-300 font-bold rounded-xl hover:bg-purple-900/40 transition-all"
          >
            🛒 NFT Shop
          </button>
          <button
            onClick={() => useGameStore.getState().setPhase('nftShop')}
            className="flex-1 py-3 bg-gray-800/60 border border-cyan-500/30 text-cyan-300 font-bold rounded-xl hover:bg-cyan-900/40 transition-all"
          >
            🔗 Connect Wallet
          </button>
        </motion.div>

        {/* Chain info */}
        <div className="mt-6 text-center text-xs text-gray-600">
          <p>Powered by Ritual Network</p>
          <p className="mt-1">First to 11 points wins • 3 min per game</p>
        </div>
      </div>
    </div>
  );
}