'use client';

import { useState } from 'react';
import { useGameStore, ALL_NFTS } from '@/store/gameStore';
import { motion, AnimatePresence } from 'framer-motion';
import { t } from '@/lib/i18n';
import { connectRitualWallet, hasMetaMask, getRitualBalance, isRitualChain, sendRitual, RITUAL_RECEIVER } from '@/lib/ritualWallet';

/* ── type-specific visual config ── */
const TYPE_VISUAL: Record<string, {
  icon: string;
  label: string;
  shape: 'hex' | 'diamond' | 'circle' | 'shield';
  accent: string;
  badgeBg: string;
  ring: string;
  textColor: string;
}> = {
  jersey: {
    icon: '\uD83D\uDC55', label: 'JERSEY', shape: 'hex',
    accent: 'from-orange-500 via-red-500 to-rose-600',
    badgeBg: 'bg-orange-500/20', ring: 'ring-orange-500/40', textColor: 'text-orange-400',
  },
  shoes: {
    icon: '\uD83D\uDC5F', label: 'SHOES', shape: 'diamond',
    accent: 'from-emerald-400 via-cyan-500 to-blue-600',
    badgeBg: 'bg-emerald-500/20', ring: 'ring-emerald-500/40', textColor: 'text-emerald-400',
  },
  headband: {
    icon: '\uD83C\uDFAF', label: 'HEADBAND', shape: 'circle',
    accent: 'from-violet-500 via-purple-500 to-fuchsia-600',
    badgeBg: 'bg-violet-500/20', ring: 'ring-violet-500/40', textColor: 'text-violet-400',
  },
  accessory: {
    icon: '\uD83D\uDCAA', label: 'ACCESSORY', shape: 'shield',
    accent: 'from-amber-400 via-yellow-500 to-orange-500',
    badgeBg: 'bg-amber-500/20', ring: 'ring-amber-500/40', textColor: 'text-amber-400',
  },
};

const RARITY_CFG = {
  common:    { border: 'border-gray-500/60', glow: '', label: '\u26AA COMMON' },
  rare:      { border: 'border-blue-500/50',  glow: 'shadow-blue-500/25 shadow-lg',   label: '\uD83D\uDD35 RARE' },
  epic:      { border: 'border-purple-500/50', glow: 'shadow-purple-500/25 shadow-lg',  label: '\uD83D\uDFE3 EPIC' },
  legendary: { border: 'border-yellow-400/60', glow: 'shadow-yellow-400/30 shadow-xl', label: '\uD83D\uDFE1 LEGENDARY' },
};

/* ── Shape SVG ── */
function ShapeIcon({ type, size = 72 }: { type: string; size?: number }) {
  const v = TYPE_VISUAL[type];
  if (!v) return null;
  const s = size;
  const h = s / 2;

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} className="drop-shadow-lg">
      <defs>
        <linearGradient id={`sg-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      {v.shape === 'circle' ? (
        <circle cx={h} cy={h} r={s * 0.44} fill={`url(#sg-${type})`} fillOpacity={0.12} stroke={`url(#sg-${type})`} strokeWidth={2} />
      ) : v.shape === 'hex' ? (
        <polygon points={`${h},${s*0.06} ${s*0.94},${h*0.66} ${s*0.94},${s-h*0.66} ${h},${s*0.94} ${s*0.06},${s-h*0.66} ${s*0.06},${h*0.66}`} fill={`url(#sg-${type})`} fillOpacity={0.12} stroke={`url(#sg-${type})`} strokeWidth={2} />
      ) : v.shape === 'diamond' ? (
        <polygon points={`${h},4 ${s-4},${h} ${h},${s-4} 4,${h}`} fill={`url(#sg-${type})`} fillOpacity={0.12} stroke={`url(#sg-${type})`} strokeWidth={2} />
      ) : (
        <path d={`M${h},4 L${s-6},${s*0.25} L${s-6},${h} Q${s-6},${s-4} ${h},${s-4} Q6,${s-4} 6,${h} L6,${s*0.25} Z`} fill={`url(#sg-${type})`} fillOpacity={0.12} stroke={`url(#sg-${type})`} strokeWidth={2} />
      )}
      <text x={h} y={h + 8} textAnchor="middle" fontSize={s * 0.38}>{v.icon}</text>
    </svg>
  );
}

/* ── stat bar ── */
function StatBlock({ label, value, color }: { label: string; value: number; color: string }) {
  const pct = Math.min(100, (value / 10) * 100);
  const c: Record<string, string> = { green: 'bg-green-500', yellow: 'bg-yellow-500', blue: 'bg-blue-500', red: 'bg-red-500' };
  return (
    <div>
      <div className="flex justify-between text-xs mb-1"><span className="text-gray-400">{label}</span><span className="text-white font-bold">+{value}</span></div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden"><div className={`h-full ${c[color]} rounded-full transition-all`} style={{ width: `${pct}%` }} /></div>
    </div>
  );
}

/* ══════════════  MAIN SHOP  ══════════════ */
export default function NFTShop({ onBack }: { onBack: () => void }) {
  const { ownedNFTs, equippedNFTs, walletConnected, walletAddress, equipNFT, unequipNFT, addOwnedNFT, ritualBalance, setRitualBalance, gameHistory, lang, setLang } = useGameStore();
  const [selectedType, setSelectedType] = useState('all');
  const [minting, setMinting] = useState<string | null>(null);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [tab, setTab] = useState<'shop' | 'history'>('shop');

  const types = ['all', 'jersey', 'shoes', 'headband', 'accessory'];
  const filteredNFTs = selectedType === 'all' ? ALL_NFTS : ALL_NFTS.filter(n => n.type === selectedType);

  const handleMint = async (nftId: string, price: number) => {
    if (!walletConnected) { setShowWalletModal(true); return; }
    setMinting(nftId);
    try {
      const { txHash } = await sendRitual(price.toString());
      console.log(`NFT mint tx: ${txHash}`);
      const nft = ALL_NFTS.find(n => n.id === nftId);
      if (nft) { addOwnedNFT(nft); }
      // Refresh balance after purchase
      try {
        const addr = useGameStore.getState().walletAddress;
        if (addr) {
          const newBal = await getRitualBalance(addr);
          setRitualBalance(parseFloat(newBal));
        }
      } catch { /* balance refresh failed, not critical */ }
    } catch (err: unknown) {
      const e = err as { message?: string };
      alert(lang === 'zh' ? `购买失败: ${e.message || '交易被拒绝'}` : `Purchase failed: ${e.message || 'Transaction rejected'}`);
    }
    setMinting(null);
  };
  const isOwned = (id: string) => ownedNFTs.some(n => n.id === id);
  const isEquipped = (id: string) => Object.values(equippedNFTs).some(n => n?.id === id);

  return (
    <div className="relative w-full h-screen overflow-y-auto" style={{ background: 'linear-gradient(180deg, #0a0a1a 0%, #1a0a2e 100%)' }}>
      <AnimatePresence>{showWalletModal && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"><WalletConnectModal onClose={() => setShowWalletModal(false)} /></motion.div>}</AnimatePresence>

      <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            {t('shop.back', lang)}
          </button>
          <div className="flex gap-1 bg-gray-900 rounded-lg p-1">
            <button onClick={() => setTab('shop')} className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${tab === 'shop' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'}`}>{t('shop.tabShop', lang)}</button>
            <button onClick={() => setTab('history')} className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${tab === 'history' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'}`}>{t('shop.tabHistory', lang)}</button>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')} className="bg-black/60 backdrop-blur rounded-lg px-2.5 py-1 border border-gray-600/50 text-gray-400 hover:text-white text-xs font-bold">{lang === 'en' ? '中文' : 'EN'}</button>
            {walletConnected && <span className="text-xs text-green-400 bg-green-900/30 px-2 py-1 rounded-full">{walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}</span>}
            <span className="text-xs text-yellow-400 bg-yellow-900/30 px-2 py-1 rounded-full font-bold">{ritualBalance.toFixed(2)} RITUAL</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {tab === 'shop' ? (<>
          {/* Equipped */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">{t('shop.equippedGear', lang)}</h3>
            <div className="grid grid-cols-4 gap-3">
              {(['jersey', 'shoes', 'headband', 'accessory'] as const).map(slot => {
                const item = equippedNFTs[slot]; const tv = TYPE_VISUAL[slot];
                return (
                  <div key={slot} className={`rounded-xl p-3 border text-center transition-all ring-1 ${item ? `${tv.ring} ${tv.badgeBg}` : 'border-gray-700/50 bg-gray-900/30 ring-gray-700/30'}`}>
                    <div className="text-3xl mb-1">{item ? tv.icon : '+'}</div>
                    <div className={`text-[11px] font-bold ${item ? 'text-white' : 'text-gray-600'}`}>{item ? item.name : `${t('shop.noItem', lang)} ${tv.label}`}</div>
                    {item && <button onClick={() => unequipNFT(slot)} className="text-[10px] text-red-400 hover:text-red-300 mt-1">{t('shop.remove', lang)}</button>}
                  </div>);
              })}
            </div>
          </div>

          {/* Filter buttons - each type has own color */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {types.map(type => {
              const active = selectedType === type;
              const tv = type === 'all' ? null : TYPE_VISUAL[type];
              return (
                <button key={type} onClick={() => setSelectedType(type)}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase transition-all whitespace-nowrap border ${active ? (type === 'all' ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/30' : `bg-gradient-to-r ${tv!.accent} text-white border-transparent shadow-lg`) : 'bg-gray-800 text-gray-400 hover:bg-gray-700 border-gray-700'}`}>
                  {type === 'all' ? t('shop.all', lang) : `${tv!.icon} ${tv!.label}`}
                </button>);
            })}
          </div>

          {/* NFT Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {filteredNFTs.map((nft, i) => {
              const owned = isOwned(nft.id); const equipped = isEquipped(nft.id);
              const rc = RARITY_CFG[nft.rarity]; const tv = TYPE_VISUAL[nft.type];
              return (
                <motion.div key={nft.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.04 }}
                  className={`rounded-xl border-2 overflow-hidden transition-all hover:scale-[1.02] bg-gray-950/80 ${rc.border} ${rc.glow} ${equipped ? `ring-2 ${tv.ring}` : ''}`}>
                  <div className={`h-44 flex items-center justify-center relative bg-gradient-to-br ${tv.accent} opacity-20`}>
                    <div className="absolute inset-0 bg-gradient-to-br ${tv.accent} opacity-10" />
                    <div className="relative z-10"><ShapeIcon type={nft.type} size={90} /></div>
                    <span className="absolute top-2.5 right-2.5 text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-black/60 text-white/90 backdrop-blur-sm">{rc.label}</span>
                    <span className={`absolute top-2.5 left-2.5 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${tv.badgeBg} text-white backdrop-blur-sm ring-1 ${tv.ring}`}>{tv.label}</span>
                    <span className="absolute bottom-2.5 text-sm font-black text-white/90 drop-shadow-lg">{nft.name}</span>
                  </div>
                  <div className="p-4">
                    <h4 className="text-base font-black text-white mb-0.5">{nft.name}</h4>
                    <p className={`text-xs mb-3 ${tv.textColor}`}>{tv.label} · {t('shop.onRitual', lang)}</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 mb-4">
                      <StatBlock label={t('controls.move', lang)} value={nft.stats.speed} color="green" />
                      <StatBlock label={t('controls.shoot', lang).split('(')[0].trim()} value={nft.stats.shoot} color="yellow" />
                      <StatBlock label={t('controls.steal', lang)} value={nft.stats.defense} color="blue" />
                      <StatBlock label={t('controls.dunk', lang).split('(')[0].trim()} value={nft.stats.dunk} color="red" />
                    </div>
                    {owned ? (equipped ? (
                      <button onClick={() => unequipNFT(nft.type)} className="w-full py-2.5 bg-gray-700/50 text-gray-300 text-sm font-bold rounded-lg hover:bg-gray-600/50 transition-all">{t('shop.equipped', lang)}</button>
                    ) : (
                      <button onClick={() => equipNFT(nft)} className={`w-full py-2.5 text-white text-sm font-bold rounded-lg transition-all bg-gradient-to-r ${tv.accent}`}>{t('shop.equip', lang)}</button>
                    )) : (
                      <button onClick={() => handleMint(nft.id, nft.price)} disabled={minting === nft.id} className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50">
                        {minting === nft.id ? (<span className="flex items-center justify-center gap-1.5"><svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>{t('shop.minting', lang)}</span>) : `${t('shop.mintFor', lang)} ${nft.price} RITUAL`}
                      </button>)}
                  </div>
                </motion.div>);
            })}
          </div>
        </>) : (
          <div>
            <h3 className="text-lg font-black text-white mb-4">{lang === 'zh' ? '对战记录' : 'Game History'}</h3>
            {!walletConnected ? (<div className="text-center py-16 bg-gray-900/40 rounded-xl border border-gray-800"><div className="text-4xl mb-3">🔗</div><p className="text-gray-400">{lang === 'zh' ? '连接钱包查看对战记录' : 'Connect your wallet to view game history'}</p></div>)
            : gameHistory.length === 0 ? (<div className="text-center py-16 bg-gray-900/40 rounded-xl border border-gray-800"><div className="text-4xl mb-3">🏀</div><p className="text-gray-400">{lang === 'zh' ? '还没有对战记录' : 'No games played yet'}</p></div>)
            : (<div className="space-y-3">{gameHistory.map(r => (<div key={r.id} className={`rounded-xl p-4 border ${r.result === 'win' ? 'border-green-500/30 bg-green-900/10' : 'border-red-500/30 bg-red-900/10'}`}><div className="flex items-center justify-between mb-2"><div className="flex items-center gap-3"><span className={`text-xs font-black px-2 py-0.5 rounded ${r.result === 'win' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{r.result === 'win' ? t('shop.win', lang) : t('shop.loss', lang)}</span><span className="text-sm font-bold text-white">vs {r.opponentName}</span></div><span className="text-xs text-gray-500">{r.date}</span></div><div className="flex items-center gap-6"><div className="flex items-center gap-2"><span className="text-2xl font-black text-white">{r.playerScore}</span><span className="text-gray-600">-</span><span className="text-2xl font-black text-gray-400">{r.opponentScore}</span></div><div className="flex gap-4 text-xs text-gray-400"><span>PTS: {r.playerPoints}</span><span>STL: {r.steals}</span><span className="text-yellow-400">+{r.rtualEarned} RITUAL</span></div></div></div>))}</div>)}
          </div>)}
      </div>
    </div>);
}

/* ══════════════  WALLET MODAL  ══════════════ */
function WalletConnectModal({ onClose }: { onClose: () => void }) {
  const { setWalletAddress, setWalletConnected, setRitualBalance, lang } = useGameStore();
  const [connecting, setConnecting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const connectWallet = async (walletType: string) => {
    if (walletType === 'MetaMask' && !hasMetaMask()) { setErrorMsg(lang === 'zh' ? '请先安装 MetaMask 浏览器插件' : 'Please install MetaMask first'); return; }
    setConnecting(true); setErrorMsg('');
    try {
      const { address, chainId } = await connectRitualWallet();
      if (!isRitualChain(chainId)) { setErrorMsg(lang === 'zh' ? '请切换到 Ritual 网络' : 'Please switch to Ritual network'); setConnecting(false); return; }
      setWalletAddress(address); setWalletConnected(true);
      try { const bal = await getRitualBalance(address); setRitualBalance(parseFloat(bal)); } catch { setRitualBalance(0); }
      setConnecting(false); onClose();
    } catch (err: unknown) { const e = err as { message?: string }; setErrorMsg(e.message || (lang === 'zh' ? '连接失败' : 'Connection failed')); setConnecting(false); }
  };
  return (
    <div className="bg-gray-900 rounded-2xl p-6 max-w-sm w-full mx-4 border border-cyan-500/30 shadow-2xl">
      <h3 className="text-lg font-bold text-white mb-1">{t('wallet.connectTitle', lang)}</h3>
      <p className="text-sm text-gray-400 mb-5">{t('wallet.connectDesc', lang)}</p>
      <div className="space-y-3">
        {[
          { n: 'MetaMask', i: '\uD83E\uDD8A', d: lang === 'zh' ? '推荐' : 'Recommended' },
          { n: 'WalletConnect', i: '\uD83D\uDD17', d: 'Mobile' },
          { n: 'Coinbase Wallet', i: '\uD83D\uDC8E', d: '' },
          { n: 'Ritual Wallet', i: '\uD83D\uDD2E', d: 'Native' },
        ].map(w => (
          <button key={w.n} onClick={() => connectWallet(w.n)} disabled={connecting} className="w-full flex items-center gap-3 p-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition-all border border-gray-600/50 disabled:opacity-50">
            <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-lg">{w.i}</div>
            <div className="text-left"><span className="text-sm font-bold text-white block">{w.n}</span>{w.d && <span className="text-[10px] text-gray-500">{w.d}</span>}</div>
            <span className="text-[10px] text-cyan-400 ml-auto font-bold">Ritual</span>
          </button>))}
      </div>
      {errorMsg && <p className="text-red-400 text-xs mt-3 text-center">{errorMsg}</p>}
      <button onClick={onClose} className="w-full mt-4 py-2 text-gray-400 text-sm hover:text-white transition-colors">{t('wallet.cancel', lang)}</button>
    </div>);
}