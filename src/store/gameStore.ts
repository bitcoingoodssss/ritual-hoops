import { create } from 'zustand';

export interface NFTItem {
  id: string;
  name: string;
  type: 'jersey' | 'shoes' | 'accessory' | 'headband';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  price: number;
  stats: { speed: number; shoot: number; defense: number; dunk: number };
  image: string;
  owned: boolean;
  equipped: boolean;
}

export interface Opponent {
  id: string;
  name: string;
  twitterId: string;
  avatarUrl: string;
 difficulty: number;
 stats: { speed: number; shoot: number; defense: number };
 nfts: string[];
}

export interface PlayerStats {
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
}

export interface GameRecord {
  id: string;
  date: string;
  opponentName: string;
  playerScore: number;
  opponentScore: number;
  result: 'win' | 'loss';
  round: number;
 playerPoints: number;
  steals: number;
  rtualEarned: number;
}

export type GamePhase = 'menu' | 'playing' | 'paused' | 'scored' | 'gameOver' | 'tournamentWin' | 'nftShop';

export type GameAction = 'idle' | 'dribbling' | 'shooting' | 'dunking' | 'stealing' | 'defending' | 'celebrating' | 'fouled';

interface GameState {
  // Player info
  twitterId: string;
  avatarUrl: string;
  playerName: string;
  playerStats: PlayerStats;
  
  // Game state
  phase: GamePhase;
  playerScore: number;
  opponentScore: number;
  shotClock: number;
  gameTimer: number;
  quarter: number;
  hasBall: boolean;
  playerAction: GameAction;
  opponentAction: GameAction;
  
  // Tournament
  currentRound: number;
  totalRounds: number;
  opponents: Opponent[];
  currentOpponent: Opponent | null;
  tournamentWins: number;
  
  // NFT
  ownedNFTs: NFTItem[];
  equippedNFTs: { jersey?: NFTItem; shoes?: NFTItem; accessory?: NFTItem; headband?: NFTItem };
  walletAddress: string | null;
  walletConnected: boolean;
  ritualBalance: number;
  
  // Effects
  showParticles: boolean;
  combo: number;
  lastAction: string;

  // History
  gameHistory: GameRecord[];
  
  // Actions
  setTwitterId: (id: string) => void;
  setAvatarUrl: (url: string) => void;
  setPlayerName: (name: string) => void;
  setPhase: (phase: GamePhase) => void;
  setScore: (player: number, opponent: number) => void;
  setHasBall: (has: boolean) => void;
  setPlayerAction: (action: GameAction) => void;
  setOpponentAction: (action: GameAction) => void;
  setShotClock: (time: number) => void;
  setGameTimer: (time: number) => void;
  setCurrentRound: (round: number) => void;
  setCurrentOpponent: (opponent: Opponent | null) => void;
  setWalletAddress: (address: string | null) => void;
  setWalletConnected: (connected: boolean) => void;
  setRitualBalance: (balance: number) => void;
  addOwnedNFT: (nft: NFTItem) => void;
  equipNFT: (nft: NFTItem) => void;
  unequipNFT: (type: 'jersey' | 'shoes' | 'accessory' | 'headband') => void;
  setCombo: (combo: number) => void;
  setLastAction: (action: string) => void;
  setShowParticles: (show: boolean) => void;
  addPlayerPoints: (points: number) => void;
  addPlayerStat: (stat: keyof PlayerStats) => void;
  nextRound: () => void;
  resetGame: () => void;
  initTournament: () => void;
  getPlayerBonusStats: () => { speed: number; shoot: number; defense: number; dunk: number };
  addGameRecord: (record: GameRecord) => void;
  clearHistory: () => void;
}

const ALL_NFTS: NFTItem[] = [
  { id: 'jersey-classic', name: 'Classic Jersey', type: 'jersey', rarity: 'common', price: 0.04, stats: { speed: 0, shoot: 2, defense: 0, dunk: 0 }, image: '/nft/jersey-classic.png', owned: false, equipped: false },
  { id: 'jersey-fire', name: 'Fire Jersey', type: 'jersey', rarity: 'rare', price: 0.12, stats: { speed: 2, shoot: 3, defense: 1, dunk: 2 }, image: '/nft/jersey-fire.png', owned: false, equipped: false },
  { id: 'jersey-neon', name: 'Neon Strike Jersey', type: 'jersey', rarity: 'epic', price: 0.25, stats: { speed: 4, shoot: 5, defense: 3, dunk: 3 }, image: '/nft/jersey-neon.png', owned: false, equipped: false },
  { id: 'jersey-legend', name: 'Legend Jersey', type: 'jersey', rarity: 'legendary', price: 0.38, stats: { speed: 6, shoot: 8, defense: 5, dunk: 7 }, image: '/nft/jersey-legend.png', owned: false, equipped: false },
  { id: 'shoes-basic', name: 'Basic Kicks', type: 'shoes', rarity: 'common', price: 0.05, stats: { speed: 2, shoot: 0, defense: 0, dunk: 1 }, image: '/nft/shoes-basic.png', owned: false, equipped: false },
  { id: 'shoes-air', name: 'Air Max Pro', type: 'shoes', rarity: 'rare', price: 0.15, stats: { speed: 5, shoot: 1, defense: 1, dunk: 4 }, image: '/nft/shoes-air.png', owned: false, equipped: false },
  { id: 'shoes-phantom', name: 'Phantom Ghost', type: 'shoes', rarity: 'epic', price: 0.28, stats: { speed: 7, shoot: 2, defense: 2, dunk: 6 }, image: '/nft/shoes-phantom.png', owned: false, equipped: false },
  { id: 'shoes-cosmic', name: 'Cosmic Dunk', type: 'shoes', rarity: 'legendary', price: 0.40, stats: { speed: 10, shoot: 4, defense: 4, dunk: 10 }, image: '/nft/shoes-cosmic.png', owned: false, equipped: false },
  { id: 'headband-red', name: 'Red Headband', type: 'headband', rarity: 'common', price: 0.04, stats: { speed: 0, shoot: 1, defense: 0, dunk: 0 }, image: '/nft/headband-red.png', owned: false, equipped: false },
  { id: 'headband-gold', name: 'Gold Champion Band', type: 'headband', rarity: 'legendary', price: 0.35, stats: { speed: 2, shoot: 3, defense: 2, dunk: 2 }, image: '/nft/headband-gold.png', owned: false, equipped: false },
  { id: 'accessory-wristband', name: 'Power Wristband', type: 'accessory', rarity: 'rare', price: 0.10, stats: { speed: 1, shoot: 2, defense: 1, dunk: 1 }, image: '/nft/wristband.png', owned: false, equipped: false },
  { id: 'accessory-elbow', name: 'Elite Elbow Pad', type: 'accessory', rarity: 'epic', price: 0.22, stats: { speed: 0, shoot: 1, defense: 5, dunk: 2 }, image: '/nft/elbow-pad.png', owned: false, equipped: false },
];

const OPPONENT_NAMES = [
  'CryptoKing', 'BlockShot', 'Web3Dunk', 'NFCSlam', 'DeFiDribble',
  'TokenSteal', 'ChainRebound', 'MetaCourt', 'HoopFi', 'RitualRookie',
  'SatoshiSlam', 'VitalikPass', 'GweiGuard', 'MintMaster', 'GasGuru'
];

function generateOpponents(): Opponent[] {
  const opponents: Opponent[] = [];
  const shuffled = [...OPPONENT_NAMES].sort(() => Math.random() - 0.5).slice(0, 5);
  for (let i = 0; i < 5; i++) {
    const diff = 0.3 + i * 0.15;
    opponents.push({
      id: `opponent-${i}`,
      name: shuffled[i],
      twitterId: `@${shuffled[i].toLowerCase()}`,
      avatarUrl: `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${shuffled[i]}&backgroundColor=ff6b35,ff9f1c,2ec4b6,e71d36`,
      difficulty: diff,
      stats: {
        speed: 2 + diff * 8,
        shoot: 2 + diff * 7,
        defense: 3 + diff * 7,
      },
      nfts: [],
    });
  }
  return opponents;
}

export const useGameStore = create<GameState>((set, get) => ({
  twitterId: '',
  avatarUrl: '',
  playerName: '',
  playerStats: { points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0 },
  phase: 'menu',
  playerScore: 0,
  opponentScore: 0,
  shotClock: 24,
  gameTimer: 180,
  quarter: 1,
  hasBall: true,
  playerAction: 'idle',
  opponentAction: 'idle',
  currentRound: 0,
  totalRounds: 5,
  opponents: [],
  currentOpponent: null,
  tournamentWins: 0,
  ownedNFTs: [],
  equippedNFTs: {},
  walletAddress: null,
  walletConnected: false,
  ritualBalance: 0,
  showParticles: false,
  combo: 0,
  lastAction: '',
  gameHistory: [],

  setTwitterId: (id) => set({ twitterId: id }),
  setAvatarUrl: (url) => set({ avatarUrl: url }),
  setPlayerName: (name) => set({ playerName: name }),
  setPhase: (phase) => set({ phase }),
  setScore: (player, opponent) => set({ playerScore: player, opponentScore: opponent }),
  setHasBall: (has) => set({ hasBall: has }),
  setPlayerAction: (action) => set({ playerAction: action }),
  setOpponentAction: (action) => set({ opponentAction: action }),
  setShotClock: (time) => set({ shotClock: time }),
  setGameTimer: (time) => set({ gameTimer: time }),
  setCurrentRound: (round) => set({ currentRound: round }),
  setCurrentOpponent: (opponent) => set({ currentOpponent: opponent }),
  setWalletAddress: (address) => set({ walletAddress: address }),
  setWalletConnected: (connected) => set({ walletConnected: connected }),
  setRitualBalance: (balance) => set({ ritualBalance: balance }),
  
  addOwnedNFT: (nft) => set((state) => ({ ownedNFTs: [...state.ownedNFTs, { ...nft, owned: true }] })),
  
  equipNFT: (nft) => set((state) => {
    const newEquipped = { ...state.equippedNFTs };
    newEquipped[nft.type] = nft;
    return { equippedNFTs: newEquipped };
  }),
  
  unequipNFT: (type) => set((state) => {
    const newEquipped = { ...state.equippedNFTs };
    delete newEquipped[type];
    return { equippedNFTs: newEquipped };
  }),
  
  setCombo: (combo) => set({ combo }),
  setLastAction: (action) => set({ lastAction: action }),
  setShowParticles: (show) => set({ showParticles: show }),
  
  addPlayerPoints: (points) => set((state) => ({
    playerScore: state.playerScore + points,
    playerStats: { ...state.playerStats, points: state.playerStats.points + points },
  })),
  
  addPlayerStat: (stat) => set((state) => ({
    playerStats: { ...state.playerStats, [stat]: state.playerStats[stat] + 1 },
  })),
  
  nextRound: () => set((state) => {
    const nextRound = state.currentRound + 1;
    if (nextRound >= state.totalRounds) {
      return { phase: 'tournamentWin' as GamePhase, tournamentWins: state.tournamentWins + 1 };
    }
    return {
      currentRound: nextRound,
      currentOpponent: state.opponents[nextRound],
      playerScore: 0,
      opponentScore: 0,
      shotClock: 24,
      gameTimer: 180,
      hasBall: true,
      playerAction: 'idle' as GameAction,
      opponentAction: 'idle' as GameAction,
      phase: 'playing' as GamePhase,
      combo: 0,
    };
  }),
  
  resetGame: () => set({
    playerScore: 0,
    opponentScore: 0,
    shotClock: 24,
    gameTimer: 180,
    hasBall: true,
    playerAction: 'idle',
    opponentAction: 'idle',
    combo: 0,
  }),
  
  initTournament: () => {
    const opponents = generateOpponents();
    set({
      opponents,
      currentOpponent: opponents[0],
      currentRound: 0,
      playerScore: 0,
      opponentScore: 0,
      shotClock: 24,
      gameTimer: 180,
      hasBall: true,
      playerAction: 'idle',
      opponentAction: 'idle',
      phase: 'playing',
      combo: 0,
      playerStats: { points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0 },
    });
  },
  
  getPlayerBonusStats: () => {
    const { equippedNFTs } = get();
    const bonus = { speed: 0, shoot: 0, defense: 0, dunk: 0 };
    Object.values(equippedNFTs).forEach((nft) => {
      if (nft) {
        bonus.speed += nft.stats.speed;
        bonus.shoot += nft.stats.shoot;
        bonus.defense += nft.stats.defense;
        bonus.dunk += nft.stats.dunk;
      }
    });
    return bonus;
  },

  addGameRecord: (record) => set((state) => ({ gameHistory: [record, ...state.gameHistory] })),
  clearHistory: () => set({ gameHistory: [] }),
}));

export { ALL_NFTS };
