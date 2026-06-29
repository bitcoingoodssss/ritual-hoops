'use client';

import { useState } from 'react';
import { useGameStore, ALL_NFTS } from '@/store/gameStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function NFTShop({ onBack }: { onBack: () => void }) {
  const { ownedNFTs, equippedNFTs, walletConnected, walletAddress, equipNFT, unequipNFT, addOwnedNFT, ritualBalance } = useGameStore();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [minting, setMinting] = useState<string | null>(null);
  const [showWalletModal, setShowWalletModal] = useState(false);

  const types = ['all', 'jersey', 'shoes', 'headband', 'accessory'];
  
  const filteredNFTs = selectedType === 'all' 
    ? ALL_NFTS 
    : ALL_NFTS.filter(n => n.type === selectedType);

  const rarityColors = {
    common: 'border-gray-500 bg-gray-900/50',
    rare: 'border-blue-500 bg-blue-900/20',
    epic: 'border-purple-500 bg-purple-900/20',
    legendary: 'border-yellow-500 bg-yellow-900/20',
  };

  const rarityText = {
    common: 'text-gray-400',
    rare: 'text-blue-400',
    epic: 'text-purple-400',
    legendary: 'text-yellow-400',
  };

  const rarityGlow = {
    common: '',
    rare: 'shadow-blue-500/20',
    epic: 'shadow-purple-500/20',
    legendary: 'shadow-yellow-500/30',
  };

  const handleMint = async (nftId: string, price: number) => {
    if (!walletConnected) {
      setShowWalletModal(true);
      return;
    }

    const state = useGameStore.getState();
    if (state.ritualBalance < price) {
      alert('Insufficient RTUAL balance!');
      return;
    }

    setMinting(nftId);
    
    // Simulate minting
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const nft = ALL_NFTS.find(n => n.id === nftId);
    if (nft) {
      addOwnedNFT(nft);
      useGameStore.setState({ ritualBalance: state.ritualBalance - price });
    }
    setMinting(null);
  };

  const handleEquip = (nftId: string) => {
    const nft = ALL_NFTS.find(n => n.id === nftId);
    if (nft) equipNFT(nft);
  };

  const handleUnequip = (type: 'jersey' | 'shoes' | 'accessory' | 'headband') => {
    unequipNFT(type);
  };

  const isOwned = (nftId: string) => ownedNFTs.some(n => n.id === nftId);
  const isEquipped = (nftId: string) => {
    return Object.values(equippedNFTs).some(n => n?.id === nftId);
  };

  const getNFTIcon = (type: string) => {
    switch (type) {
      case 'jersey': return '👕';
      case 'shoes': return '👟';
      case 'headband': return '🎯';
      case 'accessory': return '💪';
      default: return '📦';
    }
  };

  return (
    <div className="relative w-full h-screen overflow-y-auto"
         style={{ background: 'linear-gradient(180deg, #0a0a1a 0%, #1a0a2e 100%)' }}>
      
      {/* Wallet Modal */}
      <AnimatePresence>
        {showWalletModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          >
            <WalletConnectModal onClose={() => setShowWalletModal(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back
          </button>
          <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            🛒 NFT SHOP
          </h2>
          <div className="flex items-center gap-2">
            {walletConnected ? (
              <span className="text-xs text-green-400 bg-green-900/30 px-2 py-1 rounded-full">
                {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
              </span>
            ) : null}
            <span className="text-xs text-yellow-400 bg-yellow-900/30 px-2 py-1 rounded-full">
              {ritualBalance} RTUAL
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Equipped Items */}
        <div className="mb-8">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Equipped Gear</h3>
          <div className="grid grid-cols-4 gap-3">
            {(['jersey', 'shoes', 'headband', 'accessory'] as const).map(slot => {
              const item = equippedNFTs[slot];
              return (
                <div
                  key={slot}
                  className={`rounded-xl p-3 border text-center transition-all ${
                    item 
                      ? 'border-orange-500/50 bg-orange-900/20' 
                      : 'border-gray-700/50 bg-gray-900/30'
                  }`}
                >
                  <div className="text-2xl mb-1">{item ? getNFTIcon(slot) : '➕'}</div>
                  <div className={`text-xs font-bold ${item ? 'text-orange-300' : 'text-gray-600'}`}>
                    {item ? item.name : `No ${slot}`}
                  </div>
                  {item && (
                    <button
                      onClick={() => handleUnequip(slot)}
                      className="text-[10px] text-red-400 hover:text-red-300 mt-1"
                    >
                      Remove
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Type Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {types.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase transition-all whitespace-nowrap ${
                selectedType === type
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {type === 'all' ? '📦 All' : `${getNFTIcon(type)} ${type}`}
            </button>
          ))}
        </div>

        {/* NFT Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNFTs.map((nft, i) => {
            const owned = isOwned(nft.id);
            const equipped = isEquipped(nft.id);
            
            return (
              <motion.div
                key={nft.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-xl border p-4 transition-all hover:scale-[1.02] ${
                  rarityColors[nft.rarity]
                } ${equipped ? 'ring-2 ring-orange-400' : ''} shadow-lg ${rarityGlow[nft.rarity]}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl">{getNFTIcon(nft.type)}</div>
                  <span className={`text-[10px] font-bold uppercase ${rarityText[nft.rarity]} bg-black/30 px-2 py-0.5 rounded-full`}>
                    {nft.rarity}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white mb-1">{nft.name}</h4>
                <p className="text-xs text-gray-500 mb-3">On Ritual Chain</p>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-1 mb-3">
                  <StatBar label="SPD" value={nft.stats.speed} color="text-green-400" />
                  <StatBar label="SHT" value={nft.stats.shoot} color="text-yellow-400" />
                  <StatBar label="DEF" value={nft.stats.defense} color="text-blue-400" />
                  <StatBar label="DNK" value={nft.stats.dunk} color="text-red-400" />
                </div>

                {/* Action */}
                {owned ? (
                  equipped ? (
                    <button
                      onClick={() => handleUnequip(nft.type)}
                      className="w-full py-2 bg-gray-700/50 text-gray-300 text-xs font-bold rounded-lg hover:bg-gray-600/50 transition-all"
                    >
                      Equipped ✓
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEquip(nft.id)}
                      className="w-full py-2 bg-orange-500/80 text-white text-xs font-bold rounded-lg hover:bg-orange-500 transition-all"
                    >
                      Equip
                    </button>
                  )
                ) : (
                  <button
                    onClick={() => handleMint(nft.id, nft.price)}
                    disabled={minting === nft.id}
                    className="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50"
                  >
                    {minting === nft.id ? (
                      <span className="flex items-center justify-center gap-1">
                        <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Minting...
                      </span>
                    ) : (
                      `Mint • ${nft.price} RTUAL`
                    )}
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="text-center">
      <div className={`text-[10px] font-bold ${color}`}>{label}</div>
      <div className="flex gap-0.5 justify-center mt-0.5">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-2 rounded-sm ${i < Math.ceil(value / 2) ? color.replace('text-', 'bg-') + '/60' : 'bg-gray-700'}`}
          />
        ))}
      </div>
    </div>
  );
}

function WalletConnectModal({ onClose }: { onClose: () => void }) {
  const { setWalletAddress, setWalletConnected, setRitualBalance } = useGameStore();
  const [connecting, setConnecting] = useState(false);

  const connectWallet = async (walletType: string) => {
    setConnecting(true);
    
    // Simulate wallet connection
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const fakeAddress = '0x' + Array.from({ length: 40 }, () => 
      '0123456789abcdef'[Math.floor(Math.random() * 16)]
    ).join('');
    
    setWalletAddress(fakeAddress);
    setWalletConnected(true);
    setRitualBalance(200);
    setConnecting(false);
    onClose();
  };

  return (
    <div className="bg-gray-900 rounded-2xl p-6 max-w-sm w-full mx-4 border border-gray-700 shadow-2xl">
      <h3 className="text-lg font-bold text-white mb-4">Connect Wallet</h3>
      <p className="text-sm text-gray-400 mb-4">Connect your wallet on Ritual Chain to mint NFTs</p>
      
      <div className="space-y-3">
        {['MetaMask', 'WalletConnect', 'Coinbase Wallet', 'Ritual Wallet'].map(wallet => (
          <button
            key={wallet}
            onClick={() => connectWallet(wallet)}
            disabled={connecting}
            className="w-full flex items-center gap-3 p-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition-all border border-gray-600/50 disabled:opacity-50"
          >
            <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center text-lg">
              {wallet === 'MetaMask' ? '🦊' : wallet === 'WalletConnect' ? '🔗' : wallet === 'Coinbase Wallet' ? '💎' : '🔮'}
            </div>
            <span className="text-sm font-bold text-white">{wallet}</span>
            <span className="text-[10px] text-gray-500 ml-auto">Ritual</span>
          </button>
        ))}
      </div>
      
      <button
        onClick={onClose}
        className="w-full mt-4 py-2 text-gray-400 text-sm hover:text-white transition-colors"
      >
        Cancel
      </button>
    </div>
  );
}