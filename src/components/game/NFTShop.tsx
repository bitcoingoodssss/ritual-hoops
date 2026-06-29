'use client';

import { useState } from 'react';
import { useGameStore, ALL_NFTS } from '@/store/gameStore';
import { motion, AnimatePresence } from 'framer-motion';

function StatBlock({ label, value, color }: { label: string; value: number; color: string }) {
  const maxVal = 10;
  const pct = Math.min(100, (value / maxVal) * 100);
  const colors: Record<string, string> = {
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    blue: 'bg-blue-500',
    red: 'bg-red-500',
  };
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-400">{label}</span>
        <span className="text-white font-bold">+{value}</span>
      </div>
      <div className="h-2.5 bg-gray-800 rounded-full overflow-hidden">
        <div className={`h-full ${colors[color]} rounded-full transition-all`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function NFTShop({ onBack }: { onBack: () => void }) {
  const { ownedNFTs, equippedNFTs, walletConnected, walletAddress, equipNFT, unequipNFT, addOwnedNFT, ritualBalance, gameHistory } = useGameStore();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [minting, setMinting] = useState<string | null>(null);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [tab, setTab] = useState<'shop' | 'history'>('shop');

  const types = ['all', 'jersey', 'shoes', 'headband', 'accessory'];
  const filteredNFTs = selectedType === 'all' ? ALL_NFTS : ALL_NFTS.filter(n => n.type === selectedType);

  const rarityConfig = {
    common: { border: 'border-gray-500/60', bg: 'bg-gray-900/60', text: 'text-gray-300', headerBg: 'bg-gradient-to-br from-gray-700/80 to-gray-800/80', glow: '' },
    rare: { border: 'border-blue-500/50', bg: 'bg-blue-950/30', text: 'text-blue-300', headerBg: 'bg-gradient-to-br from-blue-900/70 to-cyan-900/50', glow: 'shadow-blue-500/20 shadow-lg' },
    epic: { border: 'border-purple-500/50', bg: 'bg-purple-950/30', text: 'text-purple-300', headerBg: 'bg-gradient-to-br from-purple-900/70 to-pink-900/50', glow: 'shadow-purple-500/20 shadow-lg' },
    legendary: { border: 'border-yellow-500/50', bg: 'bg-yellow-950/20', text: 'text-yellow-300', headerBg: 'bg-gradient-to-br from-yellow-900/70 to-amber-800/50', glow: 'shadow-yellow-500/30 shadow-xl' },
  };

  const handleMint = async (nftId: string, price: number) => {
    if (!walletConnected) { setShowWalletModal(true); return; }
    if (useGameStore.getState().ritualBalance < price) { alert('Insufficient RTUAL balance!'); return; }
    setMinting(nftId);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const nft = ALL_NFTS.find(n => n.id === nftId);
    if (nft) {
      addOwnedNFT(nft);
      useGameStore.setState({ ritualBalance: useGameStore.getState().ritualBalance - price });
    }
    setMinting(null);
  };

  const isOwned = (nftId: string) => ownedNFTs.some(n => n.id === nftId);
  const isEquipped = (nftId: string) => Object.values(equippedNFTs).some(n => n?.id === nftId);

  const getNFTIcon = (type: string) => {
    switch (type) {
      case 'jersey': return '👕';
      case 'shoes': return '👟';
      case 'headband': return '🎯';
      case 'accessory': return '💪';
      default: return '📦';
    }
  };

  const getNFTLabel = (type: string) => {
    switch (type) {
      case 'jersey': return 'JERSEY';
      case 'shoes': return 'SHOES';
      case 'headband': return 'HEADBAND';
      case 'accessory': return 'ACCESSORY';
      default: return 'ITEM';
    }
  };

  return (
    <div className="relative w-full h-screen overflow-y-auto" style={{ background: 'linear-gradient(180deg, #0a0a1a 0%, #1a0a2e 100%)' }}>
      <AnimatePresence>
        {showWalletModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <WalletConnectModal onClose={() => setShowWalletModal(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back
          </button>
          <div className="flex gap-1 bg-gray-900 rounded-lg p-1">
            <button onClick={() => setTab('shop')} className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${tab === 'shop' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'}`}>🛒 Shop</button>
            <button onClick={() => setTab('history')} className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${tab === 'history' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'}`}>📊 History</button>
          </div>
          <div className="flex items-center gap-2">
            {walletConnected && <span className="text-xs text-green-400 bg-green-900/30 px-2 py-1 rounded-full">{walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}</span>}
            <span className="text-xs text-yellow-400 bg-yellow-900/30 px-2 py-1 rounded-full font-bold">{ritualBalance} RTUAL</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {tab === 'shop' ? (
          <>
            {/* Equipped Items */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Equipped Gear</h3>
              <div className="grid grid-cols-4 gap-3">
                {(['jersey', 'shoes', 'headband', 'accessory'] as const).map(slot => {
                  const item = equippedNFTs[slot];
                  const rc = item ? rarityConfig[item.rarity] : null;
                  return (
                    <div key={slot} className={`rounded-xl p-3 border text-center transition-all ${item ? `${rc!.border} ${rc!.bg}` : 'border-gray-700/50 bg-gray-900/30'}`}>
                      <div className="text-3xl mb-1">{item ? getNFTIcon(slot) : '➕'}</div>
                      <div className={`text-[11px] font-bold ${item ? rc!.text : 'text-gray-600'}`}>{item ? item.name : `No ${getNFTLabel(slot)}`}</div>
                      {item && <button onClick={() => unequipNFT(slot)} className="text-[10px] text-red-400 hover:text-red-300 mt-1">Remove</button>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Type Filter */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {types.map(type => (
                <button key={type} onClick={() => setSelectedType(type)}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase transition-all whitespace-nowrap ${selectedType === type ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
                  {type === 'all' ? '📦 All' : `${getNFTIcon(type)} ${getNFTLabel(type)}`}
                </button>
              ))}
            </div>

            {/* NFT Grid - 2 columns for bigger cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {filteredNFTs.map((nft, i) => {
                const owned = isOwned(nft.id);
                const equipped = isEquipped(nft.id);
                const rc = rarityConfig[nft.rarity];
                return (
                  <motion.div key={nft.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.04 }}
                    className={`rounded-xl border overflow-hidden transition-all hover:scale-[1.02] ${rc.bg} ${rc.border} ${rc.glow} ${equipped ? 'ring-2 ring-orange-400' : ''}`}>
                    {/* Large Icon Header */}
                    <div className={`h-36 flex flex-col items-center justify-center ${rc.headerBg} relative`}>
                      <span className="text-7xl mb-1 drop-shadow-lg">{getNFTIcon(nft.type)}</span>
                      <span className="absolute top-2 right-2 text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-black/40 text-white/80">{nft.rarity}</span>
                      <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/40 text-white/60">{getNFTLabel(nft.type)}</span>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h4 className="text-base font-black text-white mb-1">{nft.name}</h4>
                      <p className="text-xs text-gray-500 mb-3">On Ritual Chain</p>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 mb-4">
                        <StatBlock label="Speed" value={nft.stats.speed} color="green" />
                        <StatBlock label="Shoot" value={nft.stats.shoot} color="yellow" />
                        <StatBlock label="Defense" value={nft.stats.defense} color="blue" />
                        <StatBlock label="Dunk" value={nft.stats.dunk} color="red" />
                      </div>

                      {/* Action */}
                      {owned ? (
                        equipped ? (
                          <button onClick={() => unequipNFT(nft.type)} className="w-full py-2.5 bg-gray-700/50 text-gray-300 text-sm font-bold rounded-lg hover:bg-gray-600/50 transition-all">✓ Equipped</button>
                        ) : (
                          <button onClick={() => equipNFT(nft)} className="w-full py-2.5 bg-orange-500/80 text-white text-sm font-bold rounded-lg hover:bg-orange-500 transition-all">Equip</button>
                        )
                      ) : (
                        <button onClick={() => handleMint(nft.id, nft.price)} disabled={minting === nft.id}
                          className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50">
                          {minting === nft.id ? (
                            <span className="flex items-center justify-center gap-1.5">
                              <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                              Minting...
                            </span>
                          ) : `Mint for ${nft.price} RTUAL`}
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </>
        ) : (
          /* Game History Tab */
          <div>
            <h3 className="text-lg font-black text-white mb-4">Game History</h3>
            {!walletConnected ? (
              <div className="text-center py-16 bg-gray-900/40 rounded-xl border border-gray-800">
                <div className="text-4xl mb-3">🔗</div>
                <p className="text-gray-400">Connect your wallet to view game history</p>
              </div>
            ) : gameHistory.length === 0 ? (
              <div className="text-center py-16 bg-gray-900/40 rounded-xl border border-gray-800">
                <div className="text-4xl mb-3">🏀</div>
                <p className="text-gray-400">No games played yet. Go compete!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {gameHistory.map((record) => (
                  <div key={record.id} className={`rounded-xl p-4 border ${record.result === 'win' ? 'border-green-500/30 bg-green-900/10' : 'border-red-500/30 bg-red-900/10'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-black px-2 py-0.5 rounded ${record.result === 'win' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{record.result.toUpperCase()}</span>
                        <span className="text-sm font-bold text-white">vs {record.opponentName}</span>
                        <span className="text-xs text-gray-500">Round {record.round + 1}</span>
                      </div>
                      <span className="text-xs text-gray-500">{record.date}</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-black text-white">{record.playerScore}</span>
                        <span className="text-gray-600">-</span>
                        <span className="text-2xl font-black text-gray-400">{record.opponentScore}</span>
                      </div>
                      <div className="flex gap-4 text-xs text-gray-400">
                        <span>PTS: {record.playerPoints}</span>
                        <span>STL: {record.steals}</span>
                        <span className="text-yellow-400">+{record.rtualEarned} RTUAL</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function WalletConnectModal({ onClose }: { onClose: () => void }) {
  const { setWalletAddress, setWalletConnected, setRitualBalance } = useGameStore();
  const [connecting, setConnecting] = useState(false);
  const connectWallet = async () => {
    setConnecting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const addr = '0x' + Array.from({ length: 40 }, () => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('');
    setWalletAddress(addr);
    setWalletConnected(true);
    setRitualBalance(1.0);
    setConnecting(false);
    onClose();
  };
  return (
    <div className="bg-gray-900 rounded-2xl p-6 max-w-sm w-full mx-4 border border-cyan-500/30 shadow-2xl">
      <h3 className="text-lg font-bold text-white mb-1">Connect Wallet</h3>
      <p className="text-sm text-gray-400 mb-5">Connect on Ritual Chain to mint NFTs</p>
      <div className="space-y-3">
        {[{ n: 'MetaMask', i: '🦊' }, { n: 'WalletConnect', i: '🔗' }, { n: 'Coinbase Wallet', i: '💎' }, { n: 'Ritual Wallet', i: '🔮' }].map(w => (
          <button key={w.n} onClick={connectWallet} disabled={connecting} className="w-full flex items-center gap-3 p-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition-all border border-gray-600/50 disabled:opacity-50">
            <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-lg">{w.i}</div>
            <span className="text-sm font-bold text-white">{w.n}</span>
            <span className="text-[10px] text-gray-500 ml-auto">Ritual</span>
          </button>
        ))}
      </div>
      <button onClick={onClose} className="w-full mt-4 py-2 text-gray-400 text-sm hover:text-white transition-colors">Cancel</button>
    </div>
  );
}