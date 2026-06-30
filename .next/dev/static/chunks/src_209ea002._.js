(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/store/gameStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ALL_NFTS",
    ()=>ALL_NFTS,
    "useGameStore",
    ()=>useGameStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
;
const ALL_NFTS = [
    // === JERSEYS ===
    {
        id: 'jersey-lakers',
        name: 'Lakers #24',
        type: 'jersey',
        rarity: 'legendary',
        price: 0.38,
        stats: {
            speed: 5,
            shoot: 8,
            defense: 4,
            dunk: 7
        },
        image: '/nft/jersey-lakers.png',
        owned: false,
        equipped: false
    },
    {
        id: 'jersey-bulls',
        name: 'Bulls #23',
        type: 'jersey',
        rarity: 'legendary',
        price: 0.40,
        stats: {
            speed: 7,
            shoot: 6,
            defense: 5,
            dunk: 9
        },
        image: '/nft/jersey-bulls.png',
        owned: false,
        equipped: false
    },
    {
        id: 'jersey-warriors',
        name: 'Warriors #30',
        type: 'jersey',
        rarity: 'epic',
        price: 0.25,
        stats: {
            speed: 6,
            shoot: 8,
            defense: 2,
            dunk: 4
        },
        image: '/nft/jersey-warriors.png',
        owned: false,
        equipped: false
    },
    {
        id: 'jersey-celtics',
        name: 'Celtics #33',
        type: 'jersey',
        rarity: 'rare',
        price: 0.12,
        stats: {
            speed: 3,
            shoot: 5,
            defense: 4,
            dunk: 3
        },
        image: '/nft/jersey-celtics.png',
        owned: false,
        equipped: false
    },
    // === SHOES ===
    {
        id: 'shoes-jordan1',
        name: 'Air Jordan 1 Retro',
        type: 'shoes',
        rarity: 'legendary',
        price: 0.40,
        stats: {
            speed: 8,
            shoot: 3,
            defense: 3,
            dunk: 10
        },
        image: '/nft/shoes-jordan1.png',
        owned: false,
        equipped: false
    },
    {
        id: 'shoes-lebron',
        name: 'LeBron XXI',
        type: 'shoes',
        rarity: 'epic',
        price: 0.28,
        stats: {
            speed: 7,
            shoot: 2,
            defense: 3,
            dunk: 8
        },
        image: '/nft/shoes-lebron.png',
        owned: false,
        equipped: false
    },
    {
        id: 'shoes-kobe',
        name: 'Kobe 6 Protro',
        type: 'shoes',
        rarity: 'epic',
        price: 0.30,
        stats: {
            speed: 9,
            shoot: 4,
            defense: 2,
            dunk: 7
        },
        image: '/nft/shoes-kobe.png',
        owned: false,
        equipped: false
    },
    {
        id: 'shoes-kd',
        name: 'KD 16',
        type: 'shoes',
        rarity: 'rare',
        price: 0.15,
        stats: {
            speed: 5,
            shoot: 3,
            defense: 2,
            dunk: 5
        },
        image: '/nft/shoes-kd.png',
        owned: false,
        equipped: false
    },
    // === HEADBANDS ===
    {
        id: 'headband-lebron',
        name: 'LeBron Headband',
        type: 'headband',
        rarity: 'rare',
        price: 0.10,
        stats: {
            speed: 2,
            shoot: 2,
            defense: 1,
            dunk: 2
        },
        image: '/nft/headband-lebron.png',
        owned: false,
        equipped: false
    },
    {
        id: 'headband-rondo',
        name: 'Championship Band',
        type: 'headband',
        rarity: 'legendary',
        price: 0.35,
        stats: {
            speed: 3,
            shoot: 4,
            defense: 3,
            dunk: 3
        },
        image: '/nft/headband-champ.png',
        owned: false,
        equipped: false
    },
    // === ACCESSORIES ===
    {
        id: 'accessory-wristband',
        name: 'Nike Pro Wristband',
        type: 'accessory',
        rarity: 'rare',
        price: 0.10,
        stats: {
            speed: 1,
            shoot: 2,
            defense: 2,
            dunk: 1
        },
        image: '/nft/wristband-nike.png',
        owned: false,
        equipped: false
    },
    {
        id: 'accessory-armband',
        name: 'Shooter Arm Sleeve',
        type: 'accessory',
        rarity: 'epic',
        price: 0.22,
        stats: {
            speed: 1,
            shoot: 5,
            defense: 3,
            dunk: 1
        },
        image: '/nft/armsleeve.png',
        owned: false,
        equipped: false
    }
];
const OPPONENT_NAMES = [
    'CryptoKing',
    'BlockShot',
    'Web3Dunk',
    'NFCSlam',
    'DeFiDribble',
    'TokenSteal',
    'ChainRebound',
    'MetaCourt',
    'HoopFi',
    'RitualRookie',
    'SatoshiSlam',
    'VitalikPass',
    'GweiGuard',
    'MintMaster',
    'GasGuru'
];
function generateOpponents() {
    const opponents = [];
    const shuffled = [
        ...OPPONENT_NAMES
    ].sort(()=>Math.random() - 0.5).slice(0, 5);
    for(let i = 0; i < 5; i++){
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
                defense: 3 + diff * 7
            },
            nfts: []
        });
    }
    return opponents;
}
const useGameStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        twitterId: '',
        avatarUrl: '',
        playerName: '',
        playerStats: {
            points: 0,
            rebounds: 0,
            assists: 0,
            steals: 0,
            blocks: 0
        },
        lang: 'en',
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
        setTwitterId: (id)=>set({
                twitterId: id
            }),
        setAvatarUrl: (url)=>set({
                avatarUrl: url
            }),
        setPlayerName: (name)=>set({
                playerName: name
            }),
        setPhase: (phase)=>set({
                phase
            }),
        setScore: (player, opponent)=>set({
                playerScore: player,
                opponentScore: opponent
            }),
        setHasBall: (has)=>set({
                hasBall: has
            }),
        setPlayerAction: (action)=>set({
                playerAction: action
            }),
        setOpponentAction: (action)=>set({
                opponentAction: action
            }),
        setShotClock: (time)=>set({
                shotClock: time
            }),
        setGameTimer: (time)=>set({
                gameTimer: time
            }),
        setCurrentRound: (round)=>set({
                currentRound: round
            }),
        setCurrentOpponent: (opponent)=>set({
                currentOpponent: opponent
            }),
        setWalletAddress: (address)=>set({
                walletAddress: address
            }),
        setWalletConnected: (connected)=>set({
                walletConnected: connected
            }),
        setRitualBalance: (balance)=>set({
                ritualBalance: balance
            }),
        addOwnedNFT: (nft)=>set((state)=>({
                    ownedNFTs: [
                        ...state.ownedNFTs,
                        {
                            ...nft,
                            owned: true
                        }
                    ]
                })),
        equipNFT: (nft)=>set((state)=>{
                const newEquipped = {
                    ...state.equippedNFTs
                };
                newEquipped[nft.type] = nft;
                return {
                    equippedNFTs: newEquipped
                };
            }),
        unequipNFT: (type)=>set((state)=>{
                const newEquipped = {
                    ...state.equippedNFTs
                };
                delete newEquipped[type];
                return {
                    equippedNFTs: newEquipped
                };
            }),
        setCombo: (combo)=>set({
                combo
            }),
        setLastAction: (action)=>set({
                lastAction: action
            }),
        setShowParticles: (show)=>set({
                showParticles: show
            }),
        addPlayerPoints: (points)=>set((state)=>({
                    playerScore: state.playerScore + points,
                    playerStats: {
                        ...state.playerStats,
                        points: state.playerStats.points + points
                    }
                })),
        addPlayerStat: (stat)=>set((state)=>({
                    playerStats: {
                        ...state.playerStats,
                        [stat]: state.playerStats[stat] + 1
                    }
                })),
        nextRound: ()=>set((state)=>{
                const nextRound = state.currentRound + 1;
                if (nextRound >= state.totalRounds) {
                    return {
                        phase: 'tournamentWin',
                        tournamentWins: state.tournamentWins + 1
                    };
                }
                return {
                    currentRound: nextRound,
                    currentOpponent: state.opponents[nextRound],
                    playerScore: 0,
                    opponentScore: 0,
                    shotClock: 24,
                    gameTimer: 180,
                    hasBall: true,
                    playerAction: 'idle',
                    opponentAction: 'idle',
                    phase: 'playing',
                    combo: 0
                };
            }),
        resetGame: ()=>set({
                playerScore: 0,
                opponentScore: 0,
                shotClock: 24,
                gameTimer: 180,
                hasBall: true,
                playerAction: 'idle',
                opponentAction: 'idle',
                combo: 0
            }),
        initTournament: ()=>{
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
                playerStats: {
                    points: 0,
                    rebounds: 0,
                    assists: 0,
                    steals: 0,
                    blocks: 0
                }
            });
        },
        getPlayerBonusStats: ()=>{
            const { equippedNFTs } = get();
            const bonus = {
                speed: 0,
                shoot: 0,
                defense: 0,
                dunk: 0
            };
            Object.values(equippedNFTs).forEach((nft)=>{
                if (nft) {
                    bonus.speed += nft.stats.speed;
                    bonus.shoot += nft.stats.shoot;
                    bonus.defense += nft.stats.defense;
                    bonus.dunk += nft.stats.dunk;
                }
            });
            return bonus;
        },
        addGameRecord: (record)=>set((state)=>({
                    gameHistory: [
                        record,
                        ...state.gameHistory
                    ]
                })),
        clearHistory: ()=>set({
                gameHistory: []
            }),
        setLang: (lang)=>set({
                lang
            })
    }));
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/game/engine/GameEngine.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GameEngine",
    ()=>GameEngine
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.module.js [app-client] (ecmascript) <locals>");
;
// ============== CONSTANTS ==============
const COURT_WIDTH = 28;
const COURT_LENGTH = 47;
const HOOP_HEIGHT = 3.05;
const HOOP_OFFSET = 5.25;
const BALL_RADIUS = 0.12;
const PLAYER_RADIUS = 0.5;
const PLAYER_HEIGHT = 1.9;
const GRAVITY = -15;
const DRIBBLE_SPEED = 0.015;
const MOVE_SPEED = 7;
const SPRINT_MULTIPLIER = 1.4;
const JUMP_FORCE = 8;
const SHOOT_POWER_MAX = 18;
const SHOOT_POWER_MIN = 8;
const STEAL_RANGE = 3.5;
const STEAL_COOLDOWN = 1.0;
const THREE_POINT_LINE = 6.75;
const GAME_SCORE_LIMIT = 11;
class GameEngine {
    scene;
    camera;
    renderer;
    clock;
    // Objects
    court;
    playerMesh;
    opponentMesh;
    ballMesh;
    playerHoop;
    opponentHoop;
    // Lights
    ambientLight;
    spotLights = [];
    // State
    player;
    opponent;
    ball;
    hoopLeft;
    hoopRight;
    // Input
    keys = new Set();
    isShootingHold = false;
    shootPower = 0;
    // Game Logic
    isRunning = false;
    playerScore = 0;
    opponentScore = 0;
    hasBall = 'player';
    scoreCooldown = 0;
    stealCooldown = 0;
    opponentThinkTimer = 0;
    opponentTarget = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    opponentHasShot = false;
    opponentShotTimer = 0;
    // Particles
    particleSystem = null;
    particles = [];
    // Callbacks
    onScore = null;
    onSteal = null;
    onAction = null;
    onGameOver = null;
    onShootPower = null;
    onContextHint = null;
    // NFT bonus stats
    playerBonus = {
        speed: 0,
        shoot: 0,
        defense: 0,
        dunk: 0
    };
    // Avatar textures
    playerAvatarTexture = null;
    opponentAvatarTexture = null;
    // Arena
    arenaFloor;
    crowdNoise = 0;
    // Dribble animation
    dribblePhase = 0;
    playerDribbleOffset = 0;
    opponentDribbleOffset = 0;
    // Trail
    ballTrailLine = null;
    ballTrailGeometry = null;
    ballTrailPositions = new Float32Array(60 * 3);
    ballTrailIndex = 0;
    // Court floor reflection
    floorMaterial;
    // Audio
    bgmAudio = null;
    bgmVolume = 0.15;
    constructor(canvas, width, height){
        // Scene
        this.scene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scene"]();
        this.scene.fog = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FogExp2"](0x0a0a1a, 0.008);
        // Camera
        this.camera = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"](60, width / height, 0.1, 200);
        this.camera.position.set(0, 12, 18);
        this.camera.lookAt(0, 0, 0);
        // Renderer
        this.renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["WebGLRenderer"]({
            canvas,
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance'
        });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PCFSoftShadowMap"];
        this.renderer.toneMapping = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ACESFilmicToneMapping"];
        this.renderer.toneMappingExposure = 1.2;
        this.clock = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Clock"]();
        // Initialize states
        this.player = this.createPlayerState(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 8));
        this.opponent = this.createPlayerState(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, -8));
        this.ball = this.createBallState();
        this.hoopLeft = {
            position: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, HOOP_HEIGHT, -COURT_LENGTH / 2 + HOOP_OFFSET),
            rimRadius: 0.45
        };
        this.hoopRight = {
            position: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, HOOP_HEIGHT, COURT_LENGTH / 2 - HOOP_OFFSET),
            rimRadius: 0.45
        };
        this.buildScene();
        this.setupInput();
    }
    createPlayerState(pos) {
        return {
            position: pos.clone(),
            velocity: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](),
            rotation: 0,
            isJumping: false,
            jumpVelocity: 0,
            hasBall: false,
            isShooting: false,
            shootPower: 0,
            shootAngle: 0,
            isDunking: false,
            isStealing: false,
            animFrame: 0,
            animTimer: 0
        };
    }
    createBallState() {
        return {
            position: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 5),
            velocity: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](),
            rotation: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Euler"](),
            isAirborne: false,
            owner: 'player',
            trail: []
        };
    }
    // ============== SCENE BUILDING ==============
    buildScene() {
        // Sky / Background
        this.buildSky();
        // Arena floor
        this.buildArena();
        // Court
        this.buildCourt();
        // Hoops
        this.playerHoop = this.buildHoop(this.hoopRight.position);
        this.opponentHoop = this.buildHoop(this.hoopLeft.position);
        this.scene.add(this.playerHoop);
        this.scene.add(this.opponentHoop);
        // Players
        this.playerMesh = this.buildPlayerMesh(0xff6b35);
        this.opponentMesh = this.buildPlayerMesh(0x2ec4b6);
        this.scene.add(this.playerMesh);
        this.scene.add(this.opponentMesh);
        // Ball
        this.ballMesh = this.buildBall();
        this.scene.add(this.ballMesh);
        // Lights
        this.buildLights();
        // Particle system
        this.buildParticleSystem();
        // Ball trail
        this.buildBallTrail();
        // Background music
        this.initBGM();
    }
    buildSky() {
        const skyGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](100, 32, 32);
        const texture = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextureLoader"]().load('/game-bg.jpg', undefined, undefined, ()=>{
        // Fallback to solid color if image fails to load
        });
        texture.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
        const skyMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
            map: texture,
            side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BackSide"]
        });
        this.scene.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](skyGeo, skyMat));
    }
    buildArena() {
        // Arena floor
        const arenaGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](80, 80);
        const arenaMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
            color: 0x080810,
            roughness: 0.95,
            metalness: 0.0
        });
        const arenaFloor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](arenaGeo, arenaMat);
        arenaFloor.rotation.x = -Math.PI / 2;
        arenaFloor.position.y = -0.02;
        arenaFloor.receiveShadow = true;
        this.scene.add(arenaFloor);
        // Neon strip along court edges
        const stripGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](COURT_WIDTH + 2, 0.15, COURT_LENGTH + 2);
        const stripMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
            color: 0xff00ff,
            emissive: 0xff00ff,
            emissiveIntensity: 0.5,
            roughness: 0.1,
            transparent: true,
            opacity: 0.4
        });
        const neonStrip = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](stripGeo, stripMat);
        neonStrip.rotation.x = -Math.PI / 2;
        neonStrip.position.y = 0.02;
        this.scene.add(neonStrip);
        this.floorMaterial = arenaMat;
        // Arena walls / stands
        this.buildStands();
    }
    buildStands() {
        const standMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
            color: 0x0a0a1a,
            roughness: 0.9,
            metalness: 0.1
        });
        // Simple back stand
        const backStand = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](60, 6, 3), standMat);
        backStand.position.set(0, 3, -26);
        this.scene.add(backStand);
        // Front stand
        const frontStand = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](60, 6, 3), standMat);
        frontStand.position.set(0, 3, 26);
        this.scene.add(frontStand);
        // Side stands
        const leftStand = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](3, 8, 56), standMat);
        leftStand.position.set(-16, 3, 0);
        this.scene.add(leftStand);
        const rightStand = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](3, 8, 56), standMat);
        rightStand.position.set(16, 3, 0);
        this.scene.add(rightStand);
        // Neon strip lights along court edges (punk feel)
        const neonColors = [
            0xff00ff,
            0x00ffff,
            0xff00ff,
            0xf72585
        ];
        const edgePositions = [
            [
                -14,
                0.1,
                -23.5
            ],
            [
                14,
                0.1,
                -23.5
            ],
            [
                -14,
                0.1,
                23.5
            ],
            [
                14,
                0.1,
                23.5
            ],
            [
                14,
                0.1,
                0
            ],
            [
                -14,
                0.1,
                0
            ],
            [
                -14,
                0.1,
                -23.5
            ],
            [
                14,
                0.1,
                23.5
            ],
            [
                14,
                0.1,
                0
            ],
            [
                -14,
                0.1,
                0
            ]
        ];
        edgePositions.forEach((pos, i)=>{
            const light = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PointLight"](neonColors[i % neonColors.length], 2, 15);
            light.position.set(...pos);
            this.scene.add(light);
        });
    }
    buildCourt() {
        this.court = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
        // Court floor - polished wood look
        const courtGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](COURT_WIDTH, COURT_LENGTH);
        const courtMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
            color: 0xc4723e,
            roughness: 0.88,
            metalness: 0.0
        });
        const courtFloor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](courtGeo, courtMat);
        courtFloor.rotation.x = -Math.PI / 2;
        courtFloor.receiveShadow = true;
        this.court.add(courtFloor);
        // Wood grain stripes overlay
        const stripeCount = 18;
        for(let i = 0; i < stripeCount; i++){
            const sx = -COURT_WIDTH / 2 + (i + 0.5) * (COURT_WIDTH / stripeCount);
            const stripeGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](COURT_WIDTH / stripeCount * 0.7, COURT_LENGTH);
            const stripeMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: i % 2 === 0 ? 0xb86840 : 0xd4844c,
                transparent: true,
                opacity: 0.15,
                side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"],
                depthWrite: false
            });
            const stripe = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](stripeGeo, stripeMat);
            stripe.rotation.x = -Math.PI / 2;
            stripe.position.set(sx, 0.002, 0);
            this.court.add(stripe);
        }
        // === RITUAL TEXT ON COURT ===
        this.addCourtText('RITUAL', 0, 0.016, -1, 12, 1.6, '#ff8c00', 0.25);
        this.addCourtText('HOOPS', 0, 0.016, 5.5, 7, 0.9, '#ff6b35', 0.15);
        // === PLAYER SIDE INDICATORS ===
        // Player's half (positive Z) - orange tint
        const playerSideGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](COURT_WIDTH, COURT_LENGTH / 2);
        const playerSideMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
            color: 0xff8c00,
            transparent: true,
            opacity: 0.07,
            side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"]
        });
        const playerSidePlane = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](playerSideGeo, playerSideMat);
        playerSidePlane.rotation.x = -Math.PI / 2;
        playerSidePlane.position.set(0, 0.005, COURT_LENGTH / 4);
        this.court.add(playerSidePlane);
        // Opponent's half (negative Z) - cyan tint
        const oppSideGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](COURT_WIDTH, COURT_LENGTH / 2);
        const oppSideMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
            color: 0x00e5ff,
            transparent: true,
            opacity: 0.07,
            side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"]
        });
        const oppSidePlane = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](oppSideGeo, oppSideMat);
        oppSidePlane.rotation.x = -Math.PI / 2;
        oppSidePlane.position.set(0, 0.005, -COURT_LENGTH / 4);
        this.court.add(oppSidePlane);
        // Direction arrow cone pointing toward player's hoop (+Z)
        const arrowGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConeGeometry"](0.3, 0.8, 8);
        const arrowMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
            color: 0x00e5ff,
            emissive: 0x00e5ff,
            emissiveIntensity: 0.5,
            roughness: 0.3,
            metalness: 0.4
        });
        const arrow = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](arrowGeo, arrowMat);
        arrow.rotation.x = -Math.PI / 2;
        arrow.position.set(0, 0.5, 5);
        arrow.name = 'directionArrow';
        this.court.add(arrow);
        // Court lines
        const lineMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineBasicMaterial"]({
            color: 0xffffff,
            linewidth: 2,
            transparent: true,
            opacity: 0.9
        });
        // Boundary
        this.addCourtLine(this.court, [
            [
                -COURT_WIDTH / 2,
                0.01,
                -COURT_LENGTH / 2
            ],
            [
                COURT_WIDTH / 2,
                0.01,
                -COURT_LENGTH / 2
            ],
            [
                COURT_WIDTH / 2,
                0.01,
                COURT_LENGTH / 2
            ],
            [
                -COURT_WIDTH / 2,
                0.01,
                COURT_LENGTH / 2
            ],
            [
                -COURT_WIDTH / 2,
                0.01,
                -COURT_LENGTH / 2
            ]
        ], lineMat);
        // Center line
        this.addCourtLine(this.court, [
            [
                -COURT_WIDTH / 2,
                0.01,
                0
            ],
            [
                COURT_WIDTH / 2,
                0.01,
                0
            ]
        ], lineMat);
        // Center circle
        this.addCourtCircle(this.court, 0, 0.01, 0, 1.8, 32, lineMat);
        // Three point lines (arcs)
        this.addThreePointLine(this.court, COURT_LENGTH / 2, 1);
        this.addThreePointLine(this.court, -COURT_LENGTH / 2, -1);
        // Free throw lanes
        this.addCourtLine(this.court, [
            [
                -2.45,
                0.01,
                COURT_LENGTH / 2 - 5.8
            ],
            [
                -2.45,
                0.01,
                COURT_LENGTH / 2
            ]
        ], lineMat);
        this.addCourtLine(this.court, [
            [
                2.45,
                0.01,
                COURT_LENGTH / 2 - 5.8
            ],
            [
                2.45,
                0.01,
                COURT_LENGTH / 2
            ]
        ], lineMat);
        this.addCourtLine(this.court, [
            [
                -2.45,
                0.01,
                COURT_LENGTH / 2 - 5.8
            ],
            [
                2.45,
                0.01,
                COURT_LENGTH / 2 - 5.8
            ]
        ], lineMat);
        this.addCourtLine(this.court, [
            [
                -2.45,
                0.01,
                -COURT_LENGTH / 2 + 5.8
            ],
            [
                -2.45,
                0.01,
                -COURT_LENGTH / 2
            ]
        ], lineMat);
        this.addCourtLine(this.court, [
            [
                2.45,
                0.01,
                -COURT_LENGTH / 2 + 5.8
            ],
            [
                2.45,
                0.01,
                -COURT_LENGTH / 2
            ]
        ], lineMat);
        this.addCourtLine(this.court, [
            [
                -2.45,
                0.01,
                -COURT_LENGTH / 2 + 5.8
            ],
            [
                2.45,
                0.01,
                -COURT_LENGTH / 2 + 5.8
            ]
        ], lineMat);
        // Free throw circles
        this.addCourtCircle(this.court, 0, 0.01, COURT_LENGTH / 2 - 5.8, 1.8, 32, lineMat);
        this.addCourtCircle(this.court, 0, 0.01, -COURT_LENGTH / 2 + 5.8, 1.8, 32, lineMat);
        this.scene.add(this.court);
        // === CLEAR SIDE LABELS ===
        const arrowGroup = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
        // YOUR HOOP - large glowing label
        const yourCanvas = document.createElement('canvas');
        yourCanvas.width = 1024;
        yourCanvas.height = 256;
        const yourCtx = yourCanvas.getContext('2d');
        yourCtx.shadowColor = '#00ffdd';
        yourCtx.shadowBlur = 30;
        yourCtx.fillStyle = '#00ffdd';
        yourCtx.font = 'bold 140px Arial, sans-serif';
        yourCtx.textAlign = 'center';
        yourCtx.textBaseline = 'middle';
        yourCtx.fillText('YOUR HOOP', 512, 128);
        yourCtx.fillText('YOUR HOOP', 512, 128);
        const yourTexture = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasTexture"](yourCanvas);
        const yourLabel = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](8, 2), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
            map: yourTexture,
            transparent: true,
            opacity: 0.9,
            side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"],
            depthWrite: false
        }));
        yourLabel.position.set(0, 0.03, 15);
        yourLabel.rotation.x = -Math.PI / 2;
        arrowGroup.add(yourLabel);
        // Arrow to YOUR HOOP
        const yourArrC = document.createElement('canvas');
        yourArrC.width = 256;
        yourArrC.height = 256;
        const yourArrCtx = yourArrC.getContext('2d');
        yourArrCtx.shadowColor = '#00ffdd';
        yourArrCtx.shadowBlur = 20;
        yourArrCtx.fillStyle = '#00ffdd';
        yourArrCtx.font = 'bold 200px Arial';
        yourArrCtx.textAlign = 'center';
        yourArrCtx.textBaseline = 'middle';
        yourArrCtx.fillText('\u25B2', 128, 128);
        const yourArrTex = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasTexture"](yourArrC);
        const yourArrMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](2, 2), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
            map: yourArrTex,
            transparent: true,
            opacity: 0.8,
            side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"],
            depthWrite: false
        }));
        yourArrMesh.position.set(0, 0.03, 13);
        yourArrMesh.rotation.x = -Math.PI / 2;
        arrowGroup.add(yourArrMesh);
        // OPPONENT label
        const oppCanvas = document.createElement('canvas');
        oppCanvas.width = 1024;
        oppCanvas.height = 256;
        const oppCtx = oppCanvas.getContext('2d');
        oppCtx.shadowColor = '#ff0066';
        oppCtx.shadowBlur = 30;
        oppCtx.fillStyle = '#ff0066';
        oppCtx.font = 'bold 140px Arial, sans-serif';
        oppCtx.textAlign = 'center';
        oppCtx.textBaseline = 'middle';
        oppCtx.fillText('OPPONENT', 512, 128);
        oppCtx.fillText('OPPONENT', 512, 128);
        const oppTexture = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasTexture"](oppCanvas);
        const oppLabel = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](8, 2), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
            map: oppTexture,
            transparent: true,
            opacity: 0.7,
            side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"],
            depthWrite: false
        }));
        oppLabel.position.set(0, 0.03, -15);
        oppLabel.rotation.x = -Math.PI / 2;
        arrowGroup.add(oppLabel);
        // Arrow to OPPONENT
        const oppArrC = document.createElement('canvas');
        oppArrC.width = 256;
        oppArrC.height = 256;
        const oppArrCtx = oppArrC.getContext('2d');
        oppArrCtx.shadowColor = '#ff0066';
        oppArrCtx.shadowBlur = 20;
        oppArrCtx.fillStyle = '#ff0066';
        oppArrCtx.font = 'bold 200px Arial';
        oppArrCtx.textAlign = 'center';
        oppArrCtx.textBaseline = 'middle';
        oppArrCtx.fillText('\u25BC', 128, 128);
        const oppArrTex = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasTexture"](oppArrC);
        const oppArrMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](2, 2), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
            map: oppArrTex,
            transparent: true,
            opacity: 0.6,
            side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"],
            depthWrite: false
        }));
        oppArrMesh.position.set(0, 0.03, -13);
        oppArrMesh.rotation.x = -Math.PI / 2;
        arrowGroup.add(oppArrMesh);
        // Colored edge strips
        const pStrip = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](COURT_WIDTH, 1.5), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
            color: 0x00ffdd,
            transparent: true,
            opacity: 0.3,
            side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"],
            depthWrite: false
        }));
        pStrip.rotation.x = -Math.PI / 2;
        pStrip.position.set(0, 0.012, COURT_LENGTH / 2 - 0.75);
        arrowGroup.add(pStrip);
        const oStrip = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](COURT_WIDTH, 1.5), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
            color: 0xff0066,
            transparent: true,
            opacity: 0.3,
            side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"],
            depthWrite: false
        }));
        oStrip.rotation.x = -Math.PI / 2;
        oStrip.position.set(0, 0.012, -COURT_LENGTH / 2 + 0.75);
        arrowGroup.add(oStrip);
        this.scene.add(arrowGroup);
    }
    addCourtLine(parent, points, material) {
        const geo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
        const posArray = [];
        points.forEach((p)=>posArray.push(p[0], p[1], p[2]));
        geo.setAttribute('position', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](posArray, 3));
        parent.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](geo, material));
    }
    addCourtCircle(parent, cx, cy, cz, radius, segments, material) {
        const points = [];
        for(let i = 0; i <= segments; i++){
            const angle = i / segments * Math.PI * 2;
            points.push(cx + Math.cos(angle) * radius, cy, cz + Math.sin(angle) * radius);
        }
        const geo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
        geo.setAttribute('position', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](points, 3));
        parent.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](geo, material));
    }
    addThreePointLine(parent, baseZ, direction) {
        const points = [];
        const segments = 40;
        const sideOffset = 1.575;
        // Start from sideline
        points.push(-COURT_WIDTH / 2, 0.01, baseZ - direction * sideOffset);
        // Arc
        const centerZ = baseZ - direction * HOOP_OFFSET;
        for(let i = 0; i <= segments; i++){
            const angle = Math.PI / 2 + i / segments * Math.PI;
            const x = Math.cos(angle) * THREE_POINT_LINE;
            const z = centerZ + Math.sin(angle) * THREE_POINT_LINE * direction;
            points.push(x, 0.01, z);
        }
        // End at sideline
        points.push(COURT_WIDTH / 2, 0.01, baseZ - direction * sideOffset);
        const geo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
        geo.setAttribute('position', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](points, 3));
        parent.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](geo, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineBasicMaterial"]({
            color: 0xffffff
        })));
    }
    addCourtText(text, cx, cy, cz, width, height, color, opacity) {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = color;
        ctx.globalAlpha = opacity;
        ctx.font = 'bold 180px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, 512, 128);
        const texture = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasTexture"](canvas);
        texture.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
        const geo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](width, height);
        const mat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
            map: texture,
            transparent: true,
            opacity: 1,
            side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"],
            depthWrite: false
        });
        const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](geo, mat);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.set(cx, cy, cz);
        this.court.add(mesh);
    }
    updateContextHints() {
        if (!this.onContextHint) return;
        const hoopPos = this.hoopLeft.position;
        const distToHoop = Math.sqrt(Math.pow(this.player.position.x - hoopPos.x, 2) + Math.pow(this.player.position.z - hoopPos.z, 2));
        const distToOpp = this.player.position.distanceTo(this.opponent.position);
        if (this.hasBall === 'player') {
            if (distToHoop < 7) {
                this.onContextHint('dunk');
            } else if (distToHoop < 14) {
                this.onContextHint('shoot');
            } else {
                this.onContextHint('move');
            }
        } else if (this.hasBall === 'opponent') {
            if (distToOpp < 4) {
                this.onContextHint('steal');
            } else {
                this.onContextHint('steal_far');
            }
        } else {
            this.onContextHint('none');
        }
    }
    buildHoop(pos) {
        const hoop = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
        // Backboard
        const backboardGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](1.8, 1.2, 0.05);
        const backboardMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
            color: 0xffffff,
            transparent: true,
            opacity: 0.92,
            roughness: 0.15,
            metalness: 0.2
        });
        const backboard = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](backboardGeo, backboardMat);
        backboard.position.set(0, 0.6, pos.z > 0 ? 0.8 : -0.8);
        hoop.add(backboard);
        // Backboard frame
        const frameMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
            color: 0x333333,
            metalness: 0.8,
            roughness: 0.2
        });
        const frameTop = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](1.9, 0.05, 0.08), frameMat);
        frameTop.position.copy(backboard.position);
        frameTop.position.y += 0.625;
        hoop.add(frameTop);
        // Pole
        const poleGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.08, 0.08, HOOP_HEIGHT + 1, 8);
        const poleMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
            color: 0x444444,
            metalness: 0.8,
            roughness: 0.3
        });
        const pole = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](poleGeo, poleMat);
        pole.position.set(0, (HOOP_HEIGHT + 1) / 2 - 0.5, pos.z > 0 ? 1.2 : -1.2);
        pole.castShadow = true;
        hoop.add(pole);
        // Rim
        const rimGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TorusGeometry"](0.45, 0.035, 12, 32);
        const rimMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
            color: 0xff6633,
            metalness: 0.85,
            roughness: 0.15
        });
        const rim = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](rimGeo, rimMat);
        rim.position.set(0, HOOP_HEIGHT, pos.z > 0 ? 0 : 0);
        rim.rotation.x = Math.PI / 2;
        rim.castShadow = true;
        hoop.add(rim);
        // Hoop glow light
        const hoopGlow = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PointLight"](pos.z < 0 ? 0xff0066 : 0x00ffdd, 3, 6);
        hoopGlow.position.set(0, HOOP_HEIGHT + 0.5, 0);
        hoop.add(hoopGlow);
        // Net (simplified with lines)
        const netMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineBasicMaterial"]({
            color: 0xffffff,
            transparent: true,
            opacity: 0.8
        });
        for(let i = 0; i < 12; i++){
            const angle = i / 12 * Math.PI * 2;
            const x = Math.cos(angle) * 0.45;
            const z = Math.sin(angle) * 0.45;
            const netGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
            netGeo.setAttribute('position', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"]([
                x,
                HOOP_HEIGHT,
                z,
                Math.cos(angle) * 0.15,
                HOOP_HEIGHT - 0.5,
                Math.sin(angle) * 0.15
            ], 3));
            hoop.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](netGeo, netMat));
        }
        // Horizontal net rings
        for(let j = 1; j <= 3; j++){
            const ringPoints = [];
            const shrink = j / 4;
            for(let i = 0; i <= 24; i++){
                const angle = i / 24 * Math.PI * 2;
                ringPoints.push(Math.cos(angle) * 0.45 * (1 - shrink), HOOP_HEIGHT - j * 0.12, Math.sin(angle) * 0.45 * (1 - shrink));
            }
            const ringGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
            ringGeo.setAttribute('position', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](ringPoints, 3));
            hoop.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](ringGeo, netMat));
        }
        hoop.position.set(pos.x, 0, pos.z);
        return hoop;
    }
    buildPlayerMesh(color) {
        const player = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
        const skinColor = 0xd4a574;
        const shortsColor = 0x1a1a2e;
        const shoeColor = color === 0xff6b35 ? 0x00e5ff : 0xff1744;
        // === HEAD ===
        const headGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](0.13, 16, 12);
        const headMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
            color: skinColor,
            roughness: 0.7,
            metalness: 0.05
        });
        const head = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](headGeo, headMat);
        head.position.y = 1.75;
        head.castShadow = true;
        head.name = 'head';
        player.add(head);
        // Neck
        const neckGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.06, 0.07, 0.08, 8);
        const neck = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](neckGeo, headMat);
        neck.position.y = 1.62;
        player.add(neck);
        // Face plane (for avatar)
        const faceGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](0.5, 0.5);
        const faceMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
            color: 0x888888,
            transparent: true,
            opacity: 0,
            side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"]
        });
        const face = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](faceGeo, faceMat);
        face.position.set(0, 1.78, 0.14);
        face.name = 'face';
        player.add(face);
        // === TORSO (jersey) ===
        const torsoGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.22, 0.18, 0.55, 10);
        const torsoMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
            color,
            roughness: 0.55,
            metalness: 0.15
        });
        const torso = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](torsoGeo, torsoMat);
        torso.position.y = 1.3;
        torso.castShadow = true;
        torso.name = 'body';
        player.add(torso);
        // === SHORTS ===
        const shortsGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.18, 0.20, 0.22, 10);
        const shortsMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
            color: shortsColor,
            roughness: 0.7,
            metalness: 0.05
        });
        const shorts = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](shortsGeo, shortsMat);
        shorts.position.y = 0.93;
        shorts.castShadow = true;
        player.add(shorts);
        // === ARMS (upper + lower + hands) ===
        const upperArmLen = 0.30;
        const lowerArmLen = 0.28;
        const handRad = 0.055;
        const armSeg = 8;
        // Shoulder-to-upper-arm pivot
        function createArm(side) {
            const armGroup = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
            armGroup.name = side < 0 ? 'leftArm' : 'rightArm';
            // Upper arm (capsule-like: cylinder + 2 hemispheres)
            const upperGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.045, 0.042, upperArmLen, armSeg);
            const upperMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                color,
                roughness: 0.55,
                metalness: 0.1
            });
            const upper = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](upperGeo, upperMat);
            upper.position.y = -upperArmLen / 2;
            upper.castShadow = true;
            armGroup.add(upper);
            // Elbow sphere
            const elbowGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](0.048, 8, 6);
            const elbow = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](elbowGeo, headMat);
            elbow.position.y = -upperArmLen;
            armGroup.add(elbow);
            // Lower arm (skin)
            const lowerGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.04, 0.038, lowerArmLen, armSeg);
            const lower = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](lowerGeo, headMat);
            lower.position.y = -upperArmLen - lowerArmLen / 2;
            lower.castShadow = true;
            armGroup.add(lower);
            // Wrist sphere
            const wristGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](0.04, 8, 6);
            const wrist = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](wristGeo, headMat);
            wrist.position.y = -upperArmLen - lowerArmLen;
            armGroup.add(wrist);
            // Hand
            const handGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](handRad, 8, 6);
            const hand = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](handGeo, headMat);
            hand.position.y = -upperArmLen - lowerArmLen - handRad;
            hand.castShadow = true;
            hand.name = side < 0 ? 'leftHand' : 'rightHand';
            armGroup.add(hand);
            return armGroup;
        }
        const leftArmGroup = createArm(-1);
        leftArmGroup.position.set(-0.28, 1.55, 0);
        leftArmGroup.rotation.z = 0.2;
        player.add(leftArmGroup);
        const rightArmGroup = createArm(1);
        rightArmGroup.position.set(0.28, 1.55, 0);
        rightArmGroup.rotation.z = -0.2;
        player.add(rightArmGroup);
        // === LEGS (upper + lower) ===
        const upperLegLen = 0.40;
        const lowerLegLen = 0.42;
        function createLeg(side) {
            const legGroup = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
            legGroup.name = side < 0 ? 'leftLeg' : 'rightLeg';
            // Upper leg (shorts-colored)
            const upperGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.085, 0.075, upperLegLen, armSeg);
            const upper = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](upperGeo, shortsMat);
            upper.position.y = -upperLegLen / 2;
            upper.castShadow = true;
            legGroup.add(upper);
            // Knee sphere
            const kneeGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](0.065, 8, 6);
            const knee = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](kneeGeo, headMat);
            knee.position.y = -upperLegLen;
            legGroup.add(knee);
            // Lower leg (skin)
            const lowerGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.065, 0.058, lowerLegLen, armSeg);
            const lower = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](lowerGeo, headMat);
            lower.position.y = -upperLegLen - lowerLegLen / 2;
            lower.castShadow = true;
            legGroup.add(lower);
            // Ankle sphere
            const ankleGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](0.05, 8, 6);
            const ankle = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](ankleGeo, headMat);
            ankle.position.y = -upperLegLen - lowerLegLen;
            legGroup.add(ankle);
            return legGroup;
        }
        const leftLegGroup = createLeg(-1);
        leftLegGroup.position.set(-0.10, 0.82, 0);
        player.add(leftLegGroup);
        const rightLegGroup = createLeg(1);
        rightLegGroup.position.set(0.10, 0.82, 0);
        player.add(rightLegGroup);
        // === SHOES ===
        const shoeMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
            color: shoeColor,
            roughness: 0.3,
            metalness: 0.4
        });
        function createShoe(side) {
            const shoeGroup = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
            shoeGroup.name = side < 0 ? 'leftShoe' : 'rightShoe';
            // Sole
            const soleGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](0.14, 0.06, 0.26);
            const soleMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                color: 0xeeeeee,
                roughness: 0.5,
                metalness: 0.1
            });
            const sole = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](soleGeo, soleMat);
            sole.position.y = 0.03;
            shoeGroup.add(sole);
            // Upper
            const upperGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](0.13, 0.10, 0.24);
            const upper = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](upperGeo, shoeMat);
            upper.position.y = 0.09;
            upper.castShadow = true;
            shoeGroup.add(upper);
            // Toe cap (hemisphere-like)
            const toeGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](0.065, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2);
            const toe = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](toeGeo, shoeMat);
            toe.rotation.x = Math.PI / 2;
            toe.position.set(0, 0.09, 0.12);
            shoeGroup.add(toe);
            return shoeGroup;
        }
        const leftShoe = createShoe(-1);
        leftShoe.position.set(-0.10, 0, 0.02);
        player.add(leftShoe);
        const rightShoe = createShoe(1);
        rightShoe.position.set(0.10, 0, 0.02);
        player.add(rightShoe);
        // Jersey number on chest
        const numGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](0.18, 0.22);
        const numMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
            color: 0xffffff,
            transparent: true,
            opacity: 0.85,
            side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"]
        });
        const num = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](numGeo, numMat);
        num.position.set(0, 1.35, 0.185);
        num.name = 'jerseyNum';
        player.add(num);
        // Jersey number on back
        const numBack = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](numGeo.clone(), numMat.clone());
        numBack.position.set(0, 1.35, -0.185);
        numBack.rotation.y = Math.PI;
        player.add(numBack);
        return player;
    }
    buildBall() {
        const ballGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](BALL_RADIUS, 16, 16);
        const ballMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
            color: 0xff8c00,
            roughness: 0.6,
            metalness: 0.1,
            bumpScale: 0.005
        });
        // Add ball lines
        const ball = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](ballGeo, ballMat);
        // Seam lines
        const seamMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineBasicMaterial"]({
            color: 0x333333
        });
        const seamPoints1 = [];
        for(let i = 0; i <= 32; i++){
            const angle = i / 32 * Math.PI * 2;
            seamPoints1.push(0, Math.cos(angle) * BALL_RADIUS, Math.sin(angle) * BALL_RADIUS);
        }
        const seamGeo1 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
        seamGeo1.setAttribute('position', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](seamPoints1, 3));
        ball.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](seamGeo1, seamMat));
        return ball;
    }
    buildLights() {
        // Ambient - very dim for moody atmosphere
        this.ambientLight = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AmbientLight"](0x222244, 0.6);
        this.scene.add(this.ambientLight);
        // Main overhead spotlight (bright white)
        const mainLight = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SpotLight"](0xffffff, 80, 50, Math.PI / 3.5, 0.6, 1);
        mainLight.position.set(0, 22, 0);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 1024;
        mainLight.shadow.mapSize.height = 1024;
        this.scene.add(mainLight);
        this.spotLights.push(mainLight);
        // Punk-colored corner lights (pink, cyan, purple, green)
        const punkLights = [
            {
                color: 0xff0066,
                pos: [
                    -12,
                    8,
                    -12
                ],
                target: [
                    -4,
                    0,
                    -8
                ]
            },
            {
                color: 0x00ffdd,
                pos: [
                    12,
                    8,
                    -12
                ],
                target: [
                    4,
                    0,
                    -8
                ]
            },
            {
                color: 0xaa00ff,
                pos: [
                    -12,
                    8,
                    12
                ],
                target: [
                    -4,
                    0,
                    8
                ]
            },
            {
                color: 0x00ff66,
                pos: [
                    12,
                    8,
                    12
                ],
                target: [
                    4,
                    0,
                    8
                ]
            }
        ];
        punkLights.forEach(({ color, pos, target })=>{
            const light = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SpotLight"](color, 40, 40, Math.PI / 3, 0.7, 1.5);
            light.position.set(...pos);
            light.target.position.set(...target);
            this.scene.add(light);
            this.spotLights.push(light);
        });
    }
    buildParticleSystem() {
        const count = 200;
        const geo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        for(let i = 0; i < count; i++){
            positions[i * 3] = 0;
            positions[i * 3 + 1] = -100;
            positions[i * 3 + 2] = 0;
            colors[i * 3] = 1;
            colors[i * 3 + 1] = 0.5;
            colors[i * 3 + 2] = 0;
            sizes[i] = 0.2;
        }
        geo.setAttribute('position', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](positions, 3));
        geo.setAttribute('color', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](colors, 3));
        geo.setAttribute('size', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](sizes, 1));
        const mat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PointsMaterial"]({
            size: 0.3,
            vertexColors: true,
            transparent: true,
            opacity: 1,
            blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"],
            depthWrite: false
        });
        this.particleSystem = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Points"](geo, mat);
        this.scene.add(this.particleSystem);
    }
    initBGM() {
        try {
            this.bgmAudio = new Audio('/bgm-nba.wav');
            this.bgmAudio.loop = true;
            this.bgmAudio.volume = this.bgmVolume;
            this.bgmAudio.play().catch(()=>{});
        } catch  {}
    }
    buildBallTrail() {
        this.ballTrailGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
        this.ballTrailGeometry.setAttribute('position', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](this.ballTrailPositions, 3));
        const mat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineBasicMaterial"]({
            color: 0xff8c00,
            transparent: true,
            opacity: 0.4,
            blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"]
        });
        this.ballTrailLine = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](this.ballTrailGeometry, mat);
        this.scene.add(this.ballTrailLine);
    }
    // ============== AVATAR ==============
    setPlayerAvatar(url) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = ()=>{
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth || img.width;
            canvas.height = img.naturalHeight || img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const texture = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasTexture"](canvas);
            texture.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
            this.playerAvatarTexture = texture;
            const face = this.playerMesh.getObjectByName('face');
            if (face) {
                const mat = face.material;
                mat.map = texture;
                mat.transparent = true;
                mat.opacity = 1;
                mat.side = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"];
                mat.needsUpdate = true;
            }
        };
        img.onerror = ()=>{
            const face = this.playerMesh.getObjectByName('face');
            if (face) {
                const mat = face.material;
                mat.color.set(0xff6b35);
                mat.opacity = 0.8;
            }
        };
        img.src = url;
    }
    setOpponentAvatar(url) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = ()=>{
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth || img.width;
            canvas.height = img.naturalHeight || img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const texture = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasTexture"](canvas);
            texture.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
            this.opponentAvatarTexture = texture;
            const face = this.opponentMesh.getObjectByName('face');
            if (face) {
                const mat = face.material;
                mat.map = texture;
                mat.transparent = true;
                mat.opacity = 1;
                mat.side = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"];
                mat.needsUpdate = true;
            }
        };
        img.onerror = ()=>{
            const face = this.opponentMesh.getObjectByName('face');
            if (face) {
                const mat = face.material;
                mat.color.set(0x2ec4b6);
                mat.opacity = 0.8;
            }
        };
        img.src = url;
    }
    // ============== INPUT ==============
    setupInput() {
        const onKeyDown = (e)=>{
            this.keys.add(e.code);
            if (e.code === 'Space') {
                e.preventDefault();
                if (!this.player.isJumping && !this.player.isShooting && !this.player.isDunking) {
                    this.player.isJumping = true;
                    this.player.jumpVelocity = JUMP_FORCE;
                }
            }
            if (e.code === 'KeyE') {
                e.preventDefault();
                if (this.hasBall === 'player' && !this.player.isShooting && !this.player.isDunking) {
                    this.startPlayerShot();
                }
            }
            if (e.code === 'KeyQ') {
                e.preventDefault();
                this.trySteal('player');
            }
            if (e.code === 'KeyF') {
                e.preventDefault();
                this.tryDunk();
            }
            if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
                this.keys.add('Sprint');
            }
        };
        const onKeyUp = (e)=>{
            this.keys.delete(e.code);
            if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
                this.keys.delete('Sprint');
            }
            if (e.code === 'KeyE' && this.player.isShooting) {
                this.releasePlayerShot();
            }
        };
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);
        // Store cleanup reference
        this._cleanupInput = ()=>{
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
        };
    }
    // ============== SHOOTING ==============
    startPlayerShot() {
        this.player.isShooting = true;
        this.shootPower = SHOOT_POWER_MIN;
        this.isShootingHold = true;
        this.onAction?.('aiming');
    }
    releasePlayerShot() {
        if (!this.player.isShooting) return;
        this.isShootingHold = false;
        this.player.isShooting = false;
        this.onShootPower?.(0);
        // Calculate direction to opponent's hoop
        const targetPos = this.hoopLeft.position.clone();
        const playerPos = this.player.position.clone();
        playerPos.y += PLAYER_HEIGHT * 0.9;
        const direction = targetPos.clone().sub(playerPos).normalize();
        const distance = playerPos.distanceTo(targetPos);
        // Check if it's a three-pointer
        const distFromHoop = Math.sqrt(Math.pow(this.player.position.x - targetPos.x, 2) + Math.pow(this.player.position.z - targetPos.z, 2));
        const isThreePointer = distFromHoop > THREE_POINT_LINE;
        // Launch ball
        const power = this.shootPower;
        this.ball.velocity.set(direction.x * power * 0.7, power * 0.8 + distance * 0.15, direction.z * power * 0.7);
        this.ball.position.copy(playerPos);
        this.ball.isAirborne = true;
        this.ball.owner = null;
        this.hasBall = 'none';
        this.onAction?.(isThreePointer ? 'three_point_shot' : 'shot');
    }
    tryDunk() {
        if (this.hasBall !== 'player' || this.player.isDunking || this.player.isShooting) return;
        const hoopPos = this.hoopLeft.position;
        const dx = Math.abs(this.player.position.x - hoopPos.x);
        const dz = Math.abs(this.player.position.z - hoopPos.z);
        if (dz < 7 && dx < 4) {
            this.player.isDunking = true;
            this.player.isJumping = true;
            this.player.jumpVelocity = JUMP_FORCE * 1.3;
            this.onAction?.('dunk');
        }
    }
    // ============== STEALING ==============
    trySteal(by) {
        if (this.stealCooldown > 0) return;
        if (by === 'player' && this.hasBall === 'opponent') {
            const dist = this.player.position.distanceTo(this.opponent.position);
            if (dist < STEAL_RANGE) {
                if (Math.random() < 0.55) {
                    this.hasBall = 'player';
                    this.ball.owner = 'player';
                    this.stealCooldown = STEAL_COOLDOWN;
                    this.onSteal?.();
                    this.onAction?.('steal');
                    this.spawnParticles(this.opponent.position, 0x00ff88, 10);
                }
            }
        }
    }
    // ============== AI ==============
    updateOpponentAI(dt) {
        this.opponentThinkTimer -= dt;
        if (this.opponentThinkTimer <= 0) {
            this.opponentThinkTimer = 0.5 + Math.random() * 1.0;
            if (this.hasBall === 'opponent') {
                // Offensive AI
                const hoopPos = this.hoopRight.position;
                const distToHoop = this.opponent.position.distanceTo(hoopPos);
                if (distToHoop < 6) {
                    // Close enough to shoot
                    if (Math.random() < 0.4) {
                        this.opponentShoot();
                        return;
                    }
                    if (distToHoop < 3 && Math.random() < 0.25) {
                        this.opponentDunk();
                        return;
                    }
                }
                // Move towards hoop
                this.opponentTarget.set(hoopPos.x + (Math.random() - 0.5) * 4, 0, hoopPos.z - 5 + Math.random() * 2);
            } else {
                // Defensive AI - try to get ball or block
                if (this.hasBall === 'player') {
                    // Follow player
                    this.opponentTarget.copy(this.player.position);
                    this.opponentTarget.x += (Math.random() - 0.5) * 2;
                    this.opponentTarget.z += (Math.random() - 0.5) * 2;
                    // Try to steal
                    const dist = this.opponent.position.distanceTo(this.player.position);
                    if (dist < STEAL_RANGE && Math.random() < 0.08) {
                        if (Math.random() < 0.25) {
                            this.hasBall = 'opponent';
                            this.ball.owner = 'opponent';
                            this.onAction?.('opponent_steal');
                        }
                    }
                } else {
                    // Ball is loose, go for it
                    this.opponentTarget.copy(this.ball.position);
                    this.opponentTarget.y = 0;
                }
            }
        }
        // Move towards target
        const dir = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]().subVectors(this.opponentTarget, this.opponent.position).normalize();
        const speed = MOVE_SPEED * 0.7;
        this.opponent.position.x += dir.x * speed * dt;
        this.opponent.position.z += dir.z * speed * dt;
        // Court bounds
        this.opponent.position.x = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(this.opponent.position.x, -COURT_WIDTH / 2 + 1, COURT_WIDTH / 2 - 1);
        this.opponent.position.z = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(this.opponent.position.z, -COURT_LENGTH / 2 + 1, COURT_LENGTH / 2 - 1);
        // Face movement direction
        if (dir.length() > 0.1) {
            this.opponent.rotation = Math.atan2(dir.x, dir.z);
        }
    }
    opponentShoot() {
        if (this.hasBall !== 'opponent') return;
        const targetPos = this.hoopRight.position.clone();
        const oppPos = this.opponent.position.clone();
        oppPos.y += PLAYER_HEIGHT * 0.9;
        const direction = targetPos.clone().sub(oppPos).normalize();
        const distance = oppPos.distanceTo(targetPos);
        const power = 10 + Math.random() * 6;
        this.ball.velocity.set(direction.x * power * 0.7, power * 0.8 + distance * 0.15, direction.z * power * 0.7);
        this.ball.position.copy(oppPos);
        this.ball.isAirborne = true;
        this.ball.owner = null;
        this.hasBall = 'none';
        this.opponentAction = 'shooting';
        this.onAction?.('opponent_shot');
    }
    opponentDunk() {
        if (this.hasBall !== 'opponent') return;
        const hoopPos = this.hoopRight.position;
        this.opponent.position.x = hoopPos.x;
        this.opponent.position.z = hoopPos.z - 1;
        this.opponent.isDunking = true;
        this.opponent.isJumping = true;
        this.opponent.jumpVelocity = JUMP_FORCE * 1.2;
        this.onAction?.('opponent_dunk');
    }
    // ============== PHYSICS ==============
    updatePhysics(dt) {
        // Player movement
        let moveX = 0, moveZ = 0;
        if (this.keys.has('KeyA') || this.keys.has('ArrowLeft')) moveX = -1;
        if (this.keys.has('KeyD') || this.keys.has('ArrowRight')) moveX = 1;
        if (this.keys.has('KeyW') || this.keys.has('ArrowUp')) moveZ = -1;
        if (this.keys.has('KeyS') || this.keys.has('ArrowDown')) moveZ = 1;
        if (moveX !== 0 || moveZ !== 0) {
            const len = Math.sqrt(moveX * moveX + moveZ * moveZ);
            moveX /= len;
            moveZ /= len;
            const speed = MOVE_SPEED * (this.keys.has('Sprint') ? SPRINT_MULTIPLIER : 1) * (1 + this.playerBonus.speed * 0.04);
            this.player.position.x += moveX * speed * dt;
            this.player.position.z += moveZ * speed * dt;
            // Face movement direction
            this.player.rotation = Math.atan2(moveX, moveZ);
            // Dribble animation
            this.dribblePhase += dt * 10;
        }
        // Court bounds for player
        this.player.position.x = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(this.player.position.x, -COURT_WIDTH / 2 + 1, COURT_WIDTH / 2 - 1);
        this.player.position.z = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(this.player.position.z, -COURT_LENGTH / 2 + 1, COURT_LENGTH / 2 - 1);
        // Jump physics - Player
        if (this.player.isJumping) {
            this.player.position.y += this.player.jumpVelocity * dt;
            this.player.jumpVelocity += GRAVITY * dt;
            if (this.player.position.y <= 0) {
                this.player.position.y = 0;
                this.player.isJumping = false;
                this.player.jumpVelocity = 0;
                if (this.player.isDunking) {
                    this.player.isDunking = false;
                    this.checkDunkScore('player');
                }
            }
        }
        // Jump physics - Opponent
        if (this.opponent.isJumping) {
            this.opponent.position.y += this.opponent.jumpVelocity * dt;
            this.opponent.jumpVelocity += GRAVITY * dt;
            if (this.opponent.position.y <= 0) {
                this.opponent.position.y = 0;
                this.opponent.isJumping = false;
                this.opponent.jumpVelocity = 0;
                if (this.opponent.isDunking) {
                    this.opponent.isDunking = false;
                    this.checkDunkScore('opponent');
                }
            }
        }
        // Shot power charge
        if (this.isShootingHold) {
            this.shootPower = Math.min(SHOOT_POWER_MAX, this.shootPower + dt * 20);
            const pct = (this.shootPower - SHOOT_POWER_MIN) / (SHOOT_POWER_MAX - SHOOT_POWER_MIN);
            this.onShootPower?.(Math.min(1, Math.max(0, pct)));
        }
        // Ball physics
        if (this.ball.isAirborne) {
            this.ball.velocity.y += GRAVITY * dt;
            this.ball.position.add(this.ball.velocity.clone().multiplyScalar(dt));
            this.ball.rotation.x += dt * 5;
            this.ball.rotation.z += dt * 3;
            // Check hoop collisions
            this.checkHoopCollision();
            // Ground bounce
            if (this.ball.position.y < BALL_RADIUS) {
                this.ball.position.y = BALL_RADIUS;
                this.ball.velocity.y = Math.abs(this.ball.velocity.y) * 0.5;
                this.ball.velocity.x *= 0.8;
                this.ball.velocity.z *= 0.8;
                // If ball is slow enough and on ground, it's a rebound
                if (this.ball.velocity.length() < 2.5) {
                    this.ball.isAirborne = false;
                    // Who picks it up?
                    const distToPlayer = this.ball.position.distanceTo(this.player.position);
                    const distToOpponent = this.ball.position.distanceTo(this.opponent.position);
                    if (distToPlayer < distToOpponent) {
                        this.hasBall = 'player';
                        this.ball.owner = 'player';
                    } else {
                        this.hasBall = 'opponent';
                        this.ball.owner = 'opponent';
                    }
                }
            }
            // Court bounds for ball
            if (Math.abs(this.ball.position.x) > COURT_WIDTH / 2 + 2) {
                this.ball.velocity.x *= -0.5;
                this.ball.position.x = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(this.ball.position.x, -COURT_WIDTH / 2 + 1, COURT_WIDTH / 2 - 1);
            }
            if (Math.abs(this.ball.position.z) > COURT_LENGTH / 2 + 2) {
                this.ball.velocity.z *= -0.5;
                this.ball.position.z = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(this.ball.position.z, -COURT_LENGTH / 2 + 1, COURT_LENGTH / 2 - 1);
            }
        } else {
            // Ball follows owner
            if (this.ball.owner === 'player') {
                const dribbleY = 0.8 + Math.abs(Math.sin(this.dribblePhase * 2)) * 0.5;
                this.ball.position.set(this.player.position.x + Math.sin(this.player.rotation) * 0.5, dribbleY, this.player.position.z + Math.cos(this.player.rotation) * 0.5);
            } else if (this.ball.owner === 'opponent') {
                const oppDribble = 0.8 + Math.abs(Math.sin(this.clock.elapsedTime * 8)) * 0.5;
                this.ball.position.set(this.opponent.position.x + Math.sin(this.opponent.rotation) * 0.5, oppDribble, this.opponent.position.z + Math.cos(this.opponent.rotation) * 0.5);
            }
        }
        // Cooldowns
        if (this.stealCooldown > 0) this.stealCooldown -= dt;
        if (this.scoreCooldown > 0) this.scoreCooldown -= dt;
        // Player-Opponent collision
        const pDist = this.player.position.distanceTo(this.opponent.position);
        if (pDist < PLAYER_RADIUS * 2.2) {
            const pushDir = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]().subVectors(this.player.position, this.opponent.position).normalize();
            const overlap = (PLAYER_RADIUS * 2.2 - pDist) / 2;
            this.player.position.add(pushDir.clone().multiplyScalar(overlap));
            this.opponent.position.sub(pushDir.clone().multiplyScalar(overlap));
        }
    }
    checkHoopCollision() {
        // Check if ball passes through player's target hoop (opponent's hoop, hoopLeft)
        const hL = this.hoopLeft;
        const dx = this.ball.position.x - hL.position.x;
        const dz = this.ball.position.z - hL.position.z;
        const distXZ = Math.sqrt(dx * dx + dz * dz);
        if (distXZ < hL.rimRadius * 1.2 && this.ball.position.y < hL.position.y + 0.5 && this.ball.position.y > hL.position.y - 0.8 && this.ball.velocity.y < 0.5) {
            // Score for player!
            const distFromHoop = Math.sqrt(Math.pow(this.player.position.x - hL.position.x, 2) + Math.pow(this.player.position.z - hL.position.z, 2));
            const isThree = distFromHoop > THREE_POINT_LINE;
            const points = isThree ? 3 : 2;
            this.playerScore += points;
            this.hasBall = 'opponent';
            this.ball.owner = 'opponent';
            this.ball.isAirborne = false;
            this.scoreCooldown = 2;
            this.spawnParticles(hL.position, 0xff6b35, 30);
            this.onScore?.('player', points, isThree ? 'three' : 'normal');
            this.onAction?.(isThree ? 'three_pointer_scored' : 'scored');
            // Check game over
            if (this.playerScore >= GAME_SCORE_LIMIT) {
                this.isRunning = false;
                this.onGameOver?.('player');
            }
            return;
        }
        // Check opponent's target hoop (player's hoop, hoopRight)
        const hR = this.hoopRight;
        const dx2 = this.ball.position.x - hR.position.x;
        const dz2 = this.ball.position.z - hR.position.z;
        const distXZ2 = Math.sqrt(dx2 * dx2 + dz2 * dz2);
        if (distXZ2 < hR.rimRadius * 1.2 && this.ball.position.y < hR.position.y + 0.5 && this.ball.position.y > hR.position.y - 0.8 && this.ball.velocity.y < 0.5) {
            // Score for opponent
            this.opponentScore += 2;
            this.hasBall = 'player';
            this.ball.owner = 'player';
            this.ball.isAirborne = false;
            this.scoreCooldown = 2;
            this.spawnParticles(hR.position, 0x2ec4b6, 30);
            this.onScore?.('opponent', 2, 'normal');
            this.onAction?.('opponent_scored');
            if (this.opponentScore >= GAME_SCORE_LIMIT) {
                this.isRunning = false;
                this.onGameOver?.('opponent');
            }
        }
    }
    checkDunkScore(dunker) {
        if (dunker === 'player') {
            const hoopPos = this.hoopLeft.position;
            const dist = Math.sqrt(Math.pow(this.player.position.x - hoopPos.x, 2) + Math.pow(this.player.position.z - hoopPos.z, 2));
            if (dist < 3) {
                this.playerScore += 2;
                this.hasBall = 'opponent';
                this.ball.owner = 'opponent';
                this.scoreCooldown = 2;
                this.spawnParticles(hoopPos, 0xff4444, 50);
                this.onScore?.('player', 2, 'dunk');
                this.onAction?.('dunk_scored');
                // Camera shake
                this.cameraShake(0.5, 0.3);
                if (this.playerScore >= GAME_SCORE_LIMIT) {
                    this.isRunning = false;
                    this.onGameOver?.('player');
                }
            }
        } else {
            const hoopPos = this.hoopRight.position;
            const dist = Math.sqrt(Math.pow(this.opponent.position.x - hoopPos.x, 2) + Math.pow(this.opponent.position.z - hoopPos.z, 2));
            if (dist < 3) {
                this.opponentScore += 2;
                this.hasBall = 'player';
                this.ball.owner = 'player';
                this.scoreCooldown = 2;
                this.spawnParticles(hoopPos, 0x2ec4b6, 40);
                this.onScore?.('opponent', 2, 'dunk');
                this.onAction?.('opponent_dunk_scored');
                this.cameraShake(0.3, 0.2);
                if (this.opponentScore >= GAME_SCORE_LIMIT) {
                    this.isRunning = false;
                    this.onGameOver?.('opponent');
                }
            }
        }
    }
    // ============== PARTICLES ==============
    spawnParticles(position, color, count) {
        if (!this.particleSystem) return;
        const positions = this.particleSystem.geometry.attributes.position;
        const colors = this.particleSystem.geometry.attributes.color;
        for(let i = 0; i < count && i < this.particles.length; i++){
            this.particles[i] = {
                position: position.clone(),
                velocity: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]((Math.random() - 0.5) * 8, Math.random() * 6 + 2, (Math.random() - 0.5) * 8),
                life: 1.0,
                maxLife: 0.8 + Math.random() * 0.5,
                color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](color).offsetHSL(Math.random() * 0.1, 0, 0)
            };
        }
    }
    updateParticles(dt) {
        if (!this.particleSystem) return;
        const positions = this.particleSystem.geometry.attributes.position;
        const colors = this.particleSystem.geometry.attributes.color;
        for(let i = 0; i < this.particles.length; i++){
            const p = this.particles[i];
            if (p.life <= 0) {
                positions.setXYZ(i, 0, -100, 0);
                continue;
            }
            p.position.add(p.velocity.clone().multiplyScalar(dt));
            p.velocity.y += GRAVITY * 0.5 * dt;
            p.life -= dt / p.maxLife;
            positions.setXYZ(i, p.position.x, p.position.y, p.position.z);
            colors.setXYZ(i, p.color.r * p.life, p.color.g * p.life, p.color.b * p.life);
        }
        positions.needsUpdate = true;
        colors.needsUpdate = true;
    }
    // ============== CAMERA ==============
    cameraShake(intensity, duration) {
        const startTime = this.clock.elapsedTime;
        const shake = ()=>{
            const elapsed = this.clock.elapsedTime - startTime;
            if (elapsed > duration) return;
            const decay = 1 - elapsed / duration;
            this.camera.position.x += (Math.random() - 0.5) * intensity * decay;
            this.camera.position.y += (Math.random() - 0.5) * intensity * decay * 0.5;
            requestAnimationFrame(shake);
        };
        shake();
    }
    updateCamera() {
        // Camera follows the action - centered between players
        const midX = (this.player.position.x + this.opponent.position.x) / 2;
        const midZ = (this.player.position.z + this.opponent.position.z) / 2;
        // If ball is in the air, look at ball
        let lookTarget;
        if (this.ball.isAirborne) {
            lookTarget = this.ball.position.clone();
        } else {
            lookTarget = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](midX, 1.5, midZ);
        }
        // Smooth camera movement
        const targetCamPos = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](midX * 0.3, 10 + Math.abs(this.player.position.z - this.opponent.position.z) * 0.15, midZ + 16);
        this.camera.position.lerp(targetCamPos, 0.03);
        const currentLook = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        this.camera.getWorldDirection(currentLook);
        this.camera.lookAt(lookTarget);
    }
    // ============== ANIMATIONS ==============
    updateAnimations(dt) {
        // Player running animation
        if (this.keys.has('KeyA') || this.keys.has('KeyD') || this.keys.has('KeyW') || this.keys.has('KeyS') || this.keys.has('ArrowLeft') || this.keys.has('ArrowRight') || this.keys.has('ArrowUp') || this.keys.has('ArrowDown')) {
            this.player.animTimer += dt * 8;
            const swing = Math.sin(this.player.animTimer) * 0.4;
            const leftArm = this.playerMesh.getObjectByName('leftArm');
            const rightArm = this.playerMesh.getObjectByName('rightArm');
            const leftLeg = this.playerMesh.getObjectByName('leftLeg');
            const rightLeg = this.playerMesh.getObjectByName('rightLeg');
            if (leftArm) leftArm.rotation.x = swing;
            if (rightArm) rightArm.rotation.x = -swing;
            if (leftLeg) leftLeg.rotation.x = -swing * 0.6;
            if (rightLeg) rightLeg.rotation.x = swing * 0.6;
        } else {
            // Reset to idle
            const leftArm = this.playerMesh.getObjectByName('leftArm');
            const rightArm = this.playerMesh.getObjectByName('rightArm');
            const leftLeg = this.playerMesh.getObjectByName('leftLeg');
            const rightLeg = this.playerMesh.getObjectByName('rightLeg');
            if (leftArm) leftArm.rotation.x *= 0.9;
            if (rightArm) rightArm.rotation.x *= 0.9;
            if (leftLeg) leftLeg.rotation.x *= 0.9;
            if (rightLeg) rightLeg.rotation.x *= 0.9;
        }
        // Shooting animation
        if (this.player.isShooting) {
            const rightArm = this.playerMesh.getObjectByName('rightArm');
            if (rightArm) rightArm.rotation.x = -Math.PI * 0.8;
        }
        // Dunk animation
        if (this.player.isDunking && this.player.isJumping) {
            const rightArm = this.playerMesh.getObjectByName('rightArm');
            if (rightArm) {
                rightArm.rotation.x = -Math.PI * 0.95;
                rightArm.rotation.z = -0.5;
            }
        }
        // Opponent running animation
        this.opponent.animTimer += dt * 6;
        const oppSwing = Math.sin(this.opponent.animTimer) * 0.3;
        const oppLeftArm = this.opponentMesh.getObjectByName('leftArm');
        const oppRightArm = this.opponentMesh.getObjectByName('rightArm');
        const oppLeftLeg = this.opponentMesh.getObjectByName('leftLeg');
        const oppRightLeg = this.opponentMesh.getObjectByName('rightLeg');
        if (oppLeftArm) oppLeftArm.rotation.x = oppSwing;
        if (oppRightArm) oppRightArm.rotation.x = -oppSwing;
        if (oppLeftLeg) oppLeftLeg.rotation.x = -oppSwing * 0.6;
        if (oppRightLeg) oppRightLeg.rotation.x = oppSwing * 0.6;
        // Update mesh positions
        this.playerMesh.position.copy(this.player.position);
        this.playerMesh.rotation.y = this.player.rotation;
        this.opponentMesh.position.copy(this.opponent.position);
        this.opponentMesh.rotation.y = this.opponent.rotation;
        // Ball mesh
        this.ballMesh.position.copy(this.ball.position);
        this.ballMesh.rotation.copy(this.ball.rotation);
        // Update ball trail
        this.updateBallTrail();
    }
    updateBallTrail() {
        if (!this.ballTrailGeometry) return;
        const i = this.ballTrailIndex % 60;
        this.ballTrailPositions[i * 3] = this.ball.position.x;
        this.ballTrailPositions[i * 3 + 1] = this.ball.position.y;
        this.ballTrailPositions[i * 3 + 2] = this.ball.position.z;
        this.ballTrailIndex++;
        this.ballTrailGeometry.attributes.position.needsUpdate = true;
    }
    // ============== GAME LOOP ==============
    update() {
        if (!this.isRunning) return;
        const dt = Math.min(this.clock.getDelta(), 0.05);
        // Update game logic
        this.updatePhysics(dt);
        this.updateOpponentAI(dt);
        this.updateAnimations(dt);
        this.updateParticles(dt);
        this.updateContextHints();
        this.updateCamera();
        // Dynamic lighting
        const time = this.clock.elapsedTime;
        if (this.spotLights.length > 2) {
            this.spotLights[1].intensity = 30 + Math.sin(time * 2) * 5;
            this.spotLights[2].intensity = 30 + Math.sin(time * 2 + 1) * 5;
            this.spotLights[3].intensity = 30 + Math.sin(time * 2 + 2) * 5;
            this.spotLights[4].intensity = 30 + Math.sin(time * 2 + 3) * 5;
        }
        // Render
        this.renderer.render(this.scene, this.camera);
    }
    // ============== LIFECYCLE ==============
    start() {
        this.isRunning = true;
        this.clock.start();
        this.gameLoop();
    }
    stop() {
        this.isRunning = false;
    }
    gameLoop() {
        if (!this.isRunning) return;
        this.update();
        requestAnimationFrame(()=>this.gameLoop());
    }
    resize(width, height) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
    reset() {
        this.playerScore = 0;
        this.opponentScore = 0;
        this.hasBall = 'player';
        this.ball.owner = 'player';
        this.ball.isAirborne = false;
        this.player.position.set(0, 0, 8);
        this.opponent.position.set(0, 0, -8);
        this.ball.position.set(0, 1, 5);
        this.player.isShooting = false;
        this.player.isDunking = false;
        this.player.isJumping = false;
        this.opponent.isShooting = false;
        this.opponent.isDunking = false;
        this.opponent.isJumping = false;
        this.scoreCooldown = 0;
        this.stealCooldown = 0;
        this.shootPower = 0;
        this.isShootingHold = false;
        this.opponentThinkTimer = 0;
        this.dribblePhase = 0;
    }
    setDifficulty(difficulty) {
    // Adjust opponent behavior based on difficulty (0-1)
    // Higher difficulty = faster, better shooting
    }
    setPlayerBonus(bonus) {
        this.playerBonus = bonus;
    }
    getScores() {
        return {
            player: this.playerScore,
            opponent: this.opponentScore
        };
    }
    destroy() {
        this.isRunning = false;
        this._cleanupInput?.();
        this.renderer.dispose();
        this.scene.traverse((obj)=>{
            if (obj instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"]) {
                obj.geometry.dispose();
                if (Array.isArray(obj.material)) {
                    obj.material.forEach((m)=>m.dispose());
                } else {
                    obj.material.dispose();
                }
            }
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/i18n.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "t",
    ()=>t
]);
const translations = {
    menu: {
        title: {
            zh: 'RITUAL HOOPS',
            en: 'RITUAL HOOPS'
        },
        subtitle: {
            zh: '链上篮球锦标赛',
            en: 'Chain Basketball Championship'
        },
        live: {
            zh: 'RITUAL链直播中',
            en: 'LIVE ON RITUAL CHAIN'
        },
        enterTwitter: {
            zh: '输入你的Twitter ID',
            en: 'Enter Your Twitter ID'
        },
        placeholder: {
            zh: '你的Twitter用户名',
            en: 'your_twitter_handle'
        },
        play: {
            zh: '开始游戏',
            en: 'PLAY'
        },
        loading: {
            zh: '加载中',
            en: 'Loading'
        },
        avatarPreview: {
            zh: '以',
            en: 'Playing as'
        },
        avatarPreviewEnd: {
            zh: '的身份游戏',
            en: ''
        },
        errorAvatar: {
            zh: '找不到该Twitter账号，请确认ID是否正确',
            en: 'Twitter account not found. Please check your ID.'
        },
        connectFirst: {
            zh: '请先连接钱包',
            en: 'Please connect wallet first'
        },
        tournament: {
            zh: '锦标赛',
            en: 'Tournament'
        },
        rounds: {
            zh: '5轮',
            en: '5 Rounds'
        },
        vs: {
            zh: '1v1',
            en: '1v1'
        },
        basketball: {
            zh: '篮球',
            en: 'Basketball'
        },
        nfts: {
            zh: 'NFT',
            en: 'NFT'
        },
        powerUp: {
            zh: '强化装备',
            en: 'Power Up'
        },
        nftShop: {
            zh: '🛒 NFT商店',
            en: '🛒 NFT Shop'
        },
        connectWallet: {
            zh: '🔗 连接钱包',
            en: '🔗 Connect Wallet'
        },
        walletConnected: {
            zh: '✅ 钱包已连接',
            en: '✅ Wallet Connected'
        },
        poweredBy: {
            zh: 'Powered by Ritual Network',
            en: 'Powered by Ritual Network'
        },
        gameRule: {
            zh: '先得11分获胜 • 每场3分钟',
            en: 'First to 11 points wins • 3 min per game'
        }
    },
    wallet: {
        connectTitle: {
            zh: '连接钱包',
            en: 'Connect Wallet'
        },
        connectDesc: {
            zh: '连接Ritual链上的钱包来铸造NFT',
            en: 'Connect your wallet on Ritual Chain to mint NFTs'
        },
        cancel: {
            zh: '取消',
            en: 'Cancel'
        }
    },
    hud: {
        you: {
            zh: '你',
            en: 'YOU'
        },
        opp: {
            zh: '对手',
            en: 'OPP'
        },
        round: {
            zh: '第{r}轮/5',
            en: 'Round {r}/5'
        },
        shotClock: {
            zh: '投篮计时',
            en: 'SHOT CLOCK'
        },
        time: {
            zh: '时间',
            en: 'TIME'
        },
        yourBall: {
            zh: '🏀 你的球',
            en: '🏀 YOUR BALL'
        },
        oppBall: {
            zh: '⚠️ 对手控球',
            en: '⚠️ OPPONENT BALL'
        },
        nftBonus: {
            zh: 'NFT加成',
            en: 'NFT BONUSES'
        },
        combo: {
            zh: '🔥 {n}连击!',
            en: '🔥 {n}x COMBO!'
        }
    },
    controls: {
        label: {
            zh: '🎮 操作说明',
            en: '🎮 CONTROLS'
        },
        move: {
            zh: '移动',
            en: 'Move'
        },
        jump: {
            zh: '跳跃',
            en: 'Jump'
        },
        shoot: {
            zh: '投篮(按住蓄力松开)',
            en: 'Shoot (hold & release)'
        },
        dunk: {
            zh: '扣篮(靠近篮筐)',
            en: 'Dunk (near hoop)'
        },
        steal: {
            zh: '抢断',
            en: 'Steal'
        },
        sprint: {
            zh: '加速',
            en: 'Sprint'
        },
        tipLine: {
            zh: '向对手篮筐(远端)得分 • 先得11分获胜',
            en: 'Score on OPPONENT hoop (far side) • First to 11 wins'
        },
        toggleHint: {
            zh: '按 [H] 切换',
            en: 'Press [H] to toggle'
        }
    },
    hints: {
        shoot: {
            zh: '按 [E] 投篮',
            en: 'Press [E] to Shoot'
        },
        dunk: {
            zh: '按 [F] 扣篮!',
            en: 'Press [F] to Dunk!'
        },
        steal: {
            zh: '按 [Q] 抢断',
            en: 'Press [Q] to Steal'
        },
        sprint: {
            zh: '按住 [SHIFT] 加速',
            en: 'Hold [SHIFT] to Sprint'
        },
        move: {
            zh: '使用 [WASD] 移动',
            en: 'Use [WASD] to Move'
        }
    },
    gameOver: {
        victory: {
            zh: '🏆 胜利!',
            en: '🏆 VICTORY!'
        },
        defeat: {
            zh: '💔 失败',
            en: '💔 DEFEAT'
        },
        roundDone: {
            zh: '第{r}轮完成',
            en: 'Round {r} Complete'
        },
        progress: {
            zh: '锦标赛进度',
            en: 'Tournament Progress'
        },
        nextRound: {
            zh: '下一轮 →',
            en: 'NEXT ROUND →'
        },
        restart: {
            zh: '重新开始',
            en: 'RESTART'
        },
        newTourney: {
            zh: '🏆 新锦标赛',
            en: '🏆 NEW TOURNAMENT'
        }
    },
    champ: {
        title: {
            zh: '冠军!',
            en: 'CHAMPION!'
        },
        subtitle: {
            zh: '你击败了全部5个对手!',
            en: 'You conquered all 5 opponents!'
        },
        tagline: {
            zh: 'Ritual链篮球冠军',
            en: 'Ritual Chain Basketball Champion'
        },
        rewards: {
            zh: '获得奖励',
            en: 'REWARDS EARNED'
        },
        trophy: {
            zh: '金奖杯NFT',
            en: 'Gold Trophy NFT'
        },
        again: {
            zh: '再来一局 🔄',
            en: 'PLAY AGAIN 🔄'
        }
    },
    shop: {
        back: {
            zh: '返回',
            en: 'Back'
        },
        tabShop: {
            zh: '🛒 商店',
            en: '🛒 Shop'
        },
        tabHistory: {
            zh: '📊 记录',
            en: '📊 History'
        },
        equippedGear: {
            zh: '已装备',
            en: 'Equipped Gear'
        },
        noItem: {
            zh: '无',
            en: 'No'
        },
        remove: {
            zh: '移除',
            en: 'Remove'
        },
        all: {
            zh: '📦 全部',
            en: '📦 All'
        },
        onRitual: {
            zh: 'Ritual链',
            en: 'On Ritual Chain'
        },
        equipped: {
            zh: '✓ 已装备',
            en: '✓ Equipped'
        },
        equip: {
            zh: '装备',
            en: 'Equip'
        },
        mintFor: {
            zh: '铸造',
            en: 'Mint for'
        },
        minting: {
            zh: '铸造中...',
            en: 'Minting...'
        },
        history: {
            zh: '游戏记录',
            en: 'Game History'
        },
        connectToView: {
            zh: '连接钱包查看游戏记录',
            en: 'Connect your wallet to view game history'
        },
        noGames: {
            zh: '还没有记录，去比赛吧！',
            en: 'No games played yet. Go compete!'
        },
        win: {
            zh: '胜利',
            en: 'WIN'
        },
        loss: {
            zh: '失败',
            en: 'LOSS'
        },
        pts: {
            zh: '得分',
            en: 'PTS'
        },
        stl: {
            zh: '抢断',
            en: 'STL'
        },
        typeJersey: {
            zh: '球衣',
            en: 'JERSEY'
        },
        typeShoes: {
            zh: '球鞋',
            en: 'SHOES'
        },
        typeHeadband: {
            zh: '头带',
            en: 'HEADBAND'
        },
        typeAccessory: {
            zh: '配件',
            en: 'ACCESSORY'
        }
    }
};
function t(key, lang, params) {
    const segs = key.split('.');
    let cur = translations;
    for (const s of segs){
        if (cur == null || typeof cur !== 'object') return key;
        cur = cur[s];
    }
    if (cur == null || typeof cur !== 'object' || !('zh' in cur)) return key;
    let result = cur[lang] ?? key;
    if (params) {
        for (const [k, v] of Object.entries(params))result = result.replaceAll(`{${k}}`, String(v));
    }
    return result;
}
const __TURBOPACK__default__export__ = translations;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/game/BasketballGame.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BasketballGame
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/gameStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$engine$2f$GameEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/engine/GameEngine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/i18n.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature(), _s7 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function BasketballGame() {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const engineRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const frameRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const { avatarUrl: avatarUrl1, currentOpponent, phase, playerScore, opponentScore, lastAction, combo, hasBall, walletConnected, playerStats, currentRound, lang, setLang, setPhase, setScore, setHasBall, setPlayerAction, setShotClock, setGameTimer, nextRound, setCombo, setLastAction, setShowParticles, addPlayerPoints, addPlayerStat, totalRounds, addGameRecord, setRitualBalance, getPlayerBonusStats } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])();
    const [shotClockDisplay, setShotClockDisplay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(24);
    const [gameTimerDisplay, setGameTimerDisplay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('3:00');
    const [shootPower, setShootPower] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [contextHint, setContextHint] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('none');
    const initEngine = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BasketballGame.useCallback[initEngine]": ()=>{
            if (!canvasRef.current || engineRef.current) return;
            const engine = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$engine$2f$GameEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GameEngine"](canvasRef.current, window.innerWidth, window.innerHeight);
            engineRef.current = engine;
            if (avatarUrl1) engine.setPlayerAvatar(avatarUrl1);
            if (currentOpponent?.avatarUrl) engine.setOpponentAvatar(currentOpponent.avatarUrl);
            engine.setPlayerBonus(getPlayerBonusStats());
            engine.onContextHint = ({
                "BasketballGame.useCallback[initEngine]": (hint)=>setContextHint(hint)
            })["BasketballGame.useCallback[initEngine]"];
            engine.onShootPower = ({
                "BasketballGame.useCallback[initEngine]": (p)=>setShootPower(p)
            })["BasketballGame.useCallback[initEngine]"];
            engine.onScore = ({
                "BasketballGame.useCallback[initEngine]": (scorer, points, type)=>{
                    setScore(scorer === 'player' ? engine.playerScore : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"].getState().playerScore, scorer === 'opponent' ? engine.opponentScore : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"].getState().opponentScore);
                    setHasBall(scorer === 'player');
                    if (scorer === 'player') {
                        addPlayerPoints(points);
                        setCombo(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"].getState().combo + 1);
                    } else {
                        setCombo(0);
                    }
                    setShowParticles(true);
                    setTimeout({
                        "BasketballGame.useCallback[initEngine]": ()=>setShowParticles(false)
                    }["BasketballGame.useCallback[initEngine]"], 1500);
                }
            })["BasketballGame.useCallback[initEngine]"];
            engine.onSteal = ({
                "BasketballGame.useCallback[initEngine]": ()=>{
                    addPlayerStat('steals');
                    setLastAction('STEAL!');
                    setHasBall(true);
                }
            })["BasketballGame.useCallback[initEngine]"];
            engine.onAction = ({
                "BasketballGame.useCallback[initEngine]": (action)=>{
                    setLastAction(action);
                    if (action === 'steal') setHasBall(true);
                    if (action === 'opponent_steal') setHasBall(false);
                }
            })["BasketballGame.useCallback[initEngine]"];
            engine.onGameOver = ({
                "BasketballGame.useCallback[initEngine]": (winner)=>{
                    setPhase('gameOver');
                    if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"].getState().walletConnected) {
                        const s = engine.getScores();
                        const isWin = s.player > s.opponent;
                        const earned = isWin ? 0.05 : 0.01;
                        addGameRecord({
                            id: Date.now().toString(),
                            date: new Date().toLocaleString(),
                            opponentName: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"].getState().currentOpponent?.name || 'Unknown',
                            playerScore: s.player,
                            opponentScore: s.opponent,
                            result: isWin ? 'win' : 'loss',
                            round: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"].getState().currentRound,
                            playerPoints: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"].getState().playerStats.points,
                            steals: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"].getState().playerStats.steals,
                            rtualEarned: earned
                        });
                        setRitualBalance(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"].getState().ritualBalance + earned);
                    }
                }
            })["BasketballGame.useCallback[initEngine]"];
            engine.start();
            let gameTimer = 180;
            let shotTimer = 24;
            const timerInterval = setInterval({
                "BasketballGame.useCallback[initEngine].timerInterval": ()=>{
                    if (!engine.isRunning || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"].getState().phase !== 'playing') return;
                    gameTimer -= 1;
                    shotTimer -= 1;
                    if (gameTimer <= 0) {
                        gameTimer = 0;
                        clearInterval(timerInterval);
                        const s = engine.getScores();
                        engine.stop();
                        setPhase('gameOver');
                        return;
                    }
                    if (shotTimer <= 0) {
                        shotTimer = 24;
                        if (engine.hasBall === 'player') {
                            engine.hasBall = 'opponent';
                            engine.ball.owner = 'opponent';
                            setHasBall(false);
                        } else {
                            engine.hasBall = 'player';
                            engine.ball.owner = 'player';
                            setHasBall(true);
                        }
                        setLastAction('SHOT CLOCK VIOLATION');
                    }
                    const mins = Math.floor(gameTimer / 60);
                    const secs = gameTimer % 60;
                    setGameTimerDisplay(`${mins}:${secs.toString().padStart(2, '0')}`);
                    setShotClockDisplay(shotTimer);
                }
            }["BasketballGame.useCallback[initEngine].timerInterval"], 1000);
            const handleResize = {
                "BasketballGame.useCallback[initEngine].handleResize": ()=>engine.resize(window.innerWidth, window.innerHeight)
            }["BasketballGame.useCallback[initEngine].handleResize"];
            window.addEventListener('resize', handleResize);
            return ({
                "BasketballGame.useCallback[initEngine]": ()=>{
                    window.removeEventListener('resize', handleResize);
                    clearInterval(timerInterval);
                }
            })["BasketballGame.useCallback[initEngine]"];
        }
    }["BasketballGame.useCallback[initEngine]"], [
        avatarUrl1,
        currentOpponent,
        setScore,
        setHasBall,
        setCombo,
        setLastAction,
        setShowParticles,
        addPlayerPoints,
        addPlayerStat,
        setPhase,
        addGameRecord,
        setRitualBalance,
        getPlayerBonusStats
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BasketballGame.useEffect": ()=>{
            const cleanup = initEngine();
            return ({
                "BasketballGame.useEffect": ()=>{
                    if (cleanup) cleanup();
                    if (engineRef.current) {
                        engineRef.current.destroy();
                        engineRef.current = null;
                    }
                }
            })["BasketballGame.useEffect"];
        }
    }["BasketballGame.useEffect"], [
        initEngine
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BasketballGame.useEffect": ()=>{
            if (phase === 'playing' && engineRef.current) engineRef.current.start();
            else if (phase !== 'playing' && engineRef.current) engineRef.current.stop();
        }
    }["BasketballGame.useEffect"], [
        phase
    ]);
    const handleNextRound = ()=>{
        if (engineRef.current) {
            engineRef.current.reset();
            const opp = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"].getState().opponents[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"].getState().currentRound + 1];
            if (opp && engineRef.current) engineRef.current.setOpponentAvatar(opp.avatarUrl);
        }
        nextRound();
    };
    const handleRestart = ()=>{
        if (engineRef.current) engineRef.current.reset();
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"].getState().initTournament();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full h-screen overflow-hidden bg-black",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                ref: canvasRef,
                className: "w-full h-full block"
            }, void 0, false, {
                fileName: "[project]/src/components/game/BasketballGame.tsx",
                lineNumber: 137,
                columnNumber: 7
            }, this),
            phase === 'playing' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GameHUD, {
                playerScore: playerScore,
                opponentScore: opponentScore,
                shotClock: shotClockDisplay,
                gameTimer: gameTimerDisplay,
                currentRound: currentRound,
                opponentName: currentOpponent?.name || '',
                lastAction: lastAction,
                combo: combo,
                hasBall: hasBall,
                shootPower: shootPower,
                getPlayerBonusStats: getPlayerBonusStats
            }, void 0, false, {
                fileName: "[project]/src/components/game/BasketballGame.tsx",
                lineNumber: 139,
                columnNumber: 9
            }, this),
            phase === 'playing' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ContextHintOverlay, {
                hint: contextHint
            }, void 0, false, {
                fileName: "[project]/src/components/game/BasketballGame.tsx",
                lineNumber: 144,
                columnNumber: 31
            }, this),
            phase === 'playing' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ControlsHelp, {}, void 0, false, {
                fileName: "[project]/src/components/game/BasketballGame.tsx",
                lineNumber: 145,
                columnNumber: 31
            }, this),
            phase === 'playing' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MiniControlsBar, {}, void 0, false, {
                fileName: "[project]/src/components/game/BasketballGame.tsx",
                lineNumber: 146,
                columnNumber: 31
            }, this),
            phase === 'gameOver' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GameOverOverlay, {
                playerScore: playerScore,
                opponentScore: opponentScore,
                opponentName: currentOpponent?.name || '',
                currentRound: currentRound,
                totalRounds: totalRounds,
                isWin: playerScore > opponentScore,
                onNextRound: handleNextRound,
                onRestart: handleRestart
            }, void 0, false, {
                fileName: "[project]/src/components/game/BasketballGame.tsx",
                lineNumber: 148,
                columnNumber: 9
            }, this),
            phase === 'tournamentWin' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TournamentWinOverlay, {
                onRestart: handleRestart
            }, void 0, false, {
                fileName: "[project]/src/components/game/BasketballGame.tsx",
                lineNumber: 152,
                columnNumber: 37
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/game/BasketballGame.tsx",
        lineNumber: 136,
        columnNumber: 5
    }, this);
}
_s(BasketballGame, "HNCN5qLm79BXIXRyMjXDAm8MEzU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"]
    ];
});
_c = BasketballGame;
// ============== Lang Toggle ==============
function LangToggle() {
    _s1();
    const lang = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "LangToggle.useGameStore[lang]": (s)=>s.lang
    }["LangToggle.useGameStore[lang]"]);
    const setLang = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "LangToggle.useGameStore[setLang]": (s)=>s.setLang
    }["LangToggle.useGameStore[setLang]"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: ()=>setLang(lang === 'zh' ? 'en' : 'zh'),
        className: "bg-black/60 backdrop-blur rounded-lg px-2.5 py-1 border border-gray-600/50 text-gray-400 hover:text-white text-xs font-bold z-50 pointer-events-auto",
        children: lang === 'en' ? '中文' : 'EN'
    }, void 0, false, {
        fileName: "[project]/src/components/game/BasketballGame.tsx",
        lineNumber: 162,
        columnNumber: 5
    }, this);
}
_s1(LangToggle, "tb7tu4xBCOECNb7+0ol7g3mo+BE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"]
    ];
});
_c1 = LangToggle;
// ============== HUD Component ==============
function GameHUD({ playerScore, opponentScore, shotClock, gameTimer, currentRound, opponentName, lastAction, combo, hasBall, shootPower, getPlayerBonusStats }) {
    _s2();
    const lang = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "GameHUD.useGameStore[lang]": (s)=>s.lang
    }["GameHUD.useGameStore[lang]"]);
    const bonus = getPlayerBonusStats();
    const actionKey = lastAction || 'none';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 pointer-events-none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-4 left-4 z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LangToggle, {}, void 0, false, {
                    fileName: "[project]/src/components/game/BasketballGame.tsx",
                    lineNumber: 181,
                    columnNumber: 51
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/game/BasketballGame.tsx",
                lineNumber: 181,
                columnNumber: 7
            }, this),
            shootPower > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute left-8 top-1/2 -translate-y-1/2 w-4 h-48 bg-black/60 backdrop-blur rounded-full border border-gray-600/50 overflow-hidden flex flex-col-reverse",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full rounded-full transition-all duration-75",
                    style: {
                        height: `${shootPower * 100}%`,
                        background: shootPower < 0.5 ? 'linear-gradient(to top, #22c55e, #f97316)' : 'linear-gradient(to top, #f97316, #ef4444)',
                        boxShadow: `0 0 ${8 + shootPower * 12}px ${shootPower < 0.5 ? 'rgba(34,197,94,0.6)' : 'rgba(239,68,68,0.6)'}`
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/game/BasketballGame.tsx",
                    lineNumber: 184,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/game/BasketballGame.tsx",
                lineNumber: 183,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-black/70 backdrop-blur-md rounded-xl px-6 py-3 flex items-center gap-6 border border-orange-500/30",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-right",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-orange-400 font-bold tracking-wider",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('hud.you', lang)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/game/BasketballGame.tsx",
                                    lineNumber: 194,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-4xl font-black text-white tabular-nums",
                                    children: playerScore
                                }, void 0, false, {
                                    fileName: "[project]/src/components/game/BasketballGame.tsx",
                                    lineNumber: 195,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/game/BasketballGame.tsx",
                            lineNumber: 193,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center gap-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-[10px] text-gray-400 uppercase tracking-widest",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('hud.round', lang, {
                                        r: currentRound + 1
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/components/game/BasketballGame.tsx",
                                    lineNumber: 198,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-lg font-bold text-gray-300",
                                    children: "VS"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/game/BasketballGame.tsx",
                                    lineNumber: 199,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-[10px] text-cyan-400 truncate max-w-[100px]",
                                    children: opponentName
                                }, void 0, false, {
                                    fileName: "[project]/src/components/game/BasketballGame.tsx",
                                    lineNumber: 200,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/game/BasketballGame.tsx",
                            lineNumber: 197,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-left",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-cyan-400 font-bold tracking-wider",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('hud.opp', lang)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/game/BasketballGame.tsx",
                                    lineNumber: 203,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-4xl font-black text-white tabular-nums",
                                    children: opponentScore
                                }, void 0, false, {
                                    fileName: "[project]/src/components/game/BasketballGame.tsx",
                                    lineNumber: 204,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/game/BasketballGame.tsx",
                            lineNumber: 202,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/game/BasketballGame.tsx",
                    lineNumber: 192,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/game/BasketballGame.tsx",
                lineNumber: 191,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-[72px] left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 border border-gray-700/40",
                children: [
                    avatarUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: avatarUrl,
                        alt: "",
                        className: "w-5 h-5 rounded-full border border-orange-400/60"
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/BasketballGame.tsx",
                        lineNumber: 210,
                        columnNumber: 23
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[11px] font-bold text-gray-300",
                        children: [
                            "@",
                            twitterId || playerName
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/game/BasketballGame.tsx",
                        lineNumber: 211,
                        columnNumber: 9
                    }, this),
                    gameHistory.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] text-yellow-400 font-bold",
                        children: [
                            gameHistory.filter((g)=>g.result === 'win').length,
                            "W-",
                            gameHistory.filter((g)=>g.result === 'loss').length,
                            "L"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/game/BasketballGame.tsx",
                        lineNumber: 213,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/game/BasketballGame.tsx",
                lineNumber: 209,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-4 right-4 flex flex-col items-end gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-black/60 backdrop-blur rounded-lg px-3 py-1.5 border border-yellow-500/40",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[10px] text-yellow-400 font-bold",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('hud.shotClock', lang)
                            }, void 0, false, {
                                fileName: "[project]/src/components/game/BasketballGame.tsx",
                                lineNumber: 218,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `text-2xl font-black tabular-nums ${shotClock <= 5 ? 'text-red-500 animate-pulse' : 'text-white'}`,
                                children: shotClock
                            }, void 0, false, {
                                fileName: "[project]/src/components/game/BasketballGame.tsx",
                                lineNumber: 219,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/game/BasketballGame.tsx",
                        lineNumber: 217,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-black/60 backdrop-blur rounded-lg px-3 py-1.5 border border-gray-500/30",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[10px] text-gray-400",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('hud.time', lang)
                            }, void 0, false, {
                                fileName: "[project]/src/components/game/BasketballGame.tsx",
                                lineNumber: 222,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xl font-bold text-white tabular-nums",
                                children: gameTimer
                            }, void 0, false, {
                                fileName: "[project]/src/components/game/BasketballGame.tsx",
                                lineNumber: 223,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/game/BasketballGame.tsx",
                        lineNumber: 221,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/game/BasketballGame.tsx",
                lineNumber: 216,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-20 left-1/2 -translate-x-1/2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-300 ${hasBall ? 'bg-orange-500/80 text-white shadow-lg shadow-orange-500/30' : 'bg-red-500/80 text-white shadow-lg shadow-red-500/30 animate-pulse'}`,
                    children: hasBall ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('hud.yourBall', lang) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('hud.oppBall', lang)
                }, void 0, false, {
                    fileName: "[project]/src/components/game/BasketballGame.tsx",
                    lineNumber: 227,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/game/BasketballGame.tsx",
                lineNumber: 226,
                columnNumber: 7
            }, this),
            lastAction && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-1/3 left-1/2 -translate-x-1/2 pointer-events-none",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "action-pop text-5xl font-black text-white drop-shadow-2xl",
                    style: {
                        textShadow: '0 0 30px rgba(255,107,53,0.8), 0 0 60px rgba(255,107,53,0.4)'
                    },
                    children: lastAction.toUpperCase().replace(/_/g, ' ')
                }, void 0, false, {
                    fileName: "[project]/src/components/game/BasketballGame.tsx",
                    lineNumber: 233,
                    columnNumber: 11
                }, this)
            }, actionKey, false, {
                fileName: "[project]/src/components/game/BasketballGame.tsx",
                lineNumber: 232,
                columnNumber: 9
            }, this),
            combo > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-28 left-1/2 -translate-x-1/2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-2xl font-black text-yellow-400 animate-pulse",
                    style: {
                        textShadow: '0 0 20px rgba(255,200,0,0.6)'
                    },
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('hud.combo', lang, {
                        n: combo
                    })
                }, void 0, false, {
                    fileName: "[project]/src/components/game/BasketballGame.tsx",
                    lineNumber: 240,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/game/BasketballGame.tsx",
                lineNumber: 239,
                columnNumber: 9
            }, this),
            (bonus.speed > 0 || bonus.shoot > 0 || bonus.defense > 0 || bonus.dunk > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-4 left-4 bg-black/50 backdrop-blur rounded-lg px-3 py-2 border border-purple-500/30",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-[10px] text-purple-400 font-bold mb-1",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('hud.nftBonus', lang)
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/BasketballGame.tsx",
                        lineNumber: 247,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3 text-xs text-gray-300",
                        children: [
                            bonus.speed > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "⚡",
                                    bonus.speed
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/game/BasketballGame.tsx",
                                lineNumber: 249,
                                columnNumber: 33
                            }, this),
                            bonus.shoot > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "🎯",
                                    bonus.shoot
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/game/BasketballGame.tsx",
                                lineNumber: 250,
                                columnNumber: 33
                            }, this),
                            bonus.defense > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "🛡️",
                                    bonus.defense
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/game/BasketballGame.tsx",
                                lineNumber: 251,
                                columnNumber: 35
                            }, this),
                            bonus.dunk > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "💥",
                                    bonus.dunk
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/game/BasketballGame.tsx",
                                lineNumber: 252,
                                columnNumber: 32
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/game/BasketballGame.tsx",
                        lineNumber: 248,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/game/BasketballGame.tsx",
                lineNumber: 246,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/game/BasketballGame.tsx",
        lineNumber: 180,
        columnNumber: 5
    }, this);
}
_s2(GameHUD, "QGyRTUabyx3sN2V8cvGgVBlRhTY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"]
    ];
});
_c2 = GameHUD;
// ============== Context Hint Overlay ==============
function ContextHintOverlay({ hint }) {
    _s3();
    const lang = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "ContextHintOverlay.useGameStore[lang]": (s)=>s.lang
    }["ContextHintOverlay.useGameStore[lang]"]);
    if (hint === 'none') return null;
    const cfg = {
        shoot: {
            text: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('hints.shoot', lang),
            cls: 'text-orange-300 drop-shadow-[0_0_20px_rgba(255,107,53,0.8)]'
        },
        dunk: {
            text: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('hints.dunk', lang),
            cls: 'text-red-400 drop-shadow-[0_0_24px_rgba(239,68,68,0.8)]'
        },
        steal: {
            text: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('hints.steal', lang),
            cls: 'text-cyan-300 drop-shadow-[0_0_16px_rgba(34,211,238,0.6)]'
        },
        steal_far: {
            text: lang === 'zh' ? '靠近对手按 [Q]' : 'Get close, press [Q]',
            cls: 'text-cyan-500/60'
        },
        move: {
            text: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('hints.move', lang),
            cls: 'text-gray-400'
        }
    };
    const c = cfg[hint];
    if (!c) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute bottom-28 left-1/2 -translate-x-1/2 pointer-events-none z-30",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `text-2xl font-black tracking-wide transition-all duration-300 ${c.cls}`,
            style: {
                animation: 'fadeIn 0.2s ease-out'
            },
            children: c.text
        }, void 0, false, {
            fileName: "[project]/src/components/game/BasketballGame.tsx",
            lineNumber: 275,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/game/BasketballGame.tsx",
        lineNumber: 274,
        columnNumber: 5
    }, this);
}
_s3(ContextHintOverlay, "QGyRTUabyx3sN2V8cvGgVBlRhTY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"]
    ];
});
_c3 = ContextHintOverlay;
// ============== Controls Help (full panel) ==============
function ControlsHelp() {
    _s4();
    const lang = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "ControlsHelp.useGameStore[lang]": (s)=>s.lang
    }["ControlsHelp.useGameStore[lang]"]);
    const [show, setShow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [dismissed, setDismissed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ControlsHelp.useEffect": ()=>{
            const h = {
                "ControlsHelp.useEffect.h": (e)=>{
                    if (e.key === 'h' || e.key === 'H') {
                        setShow({
                            "ControlsHelp.useEffect.h": (p)=>!p
                        }["ControlsHelp.useEffect.h"]);
                        setDismissed(false);
                    }
                }
            }["ControlsHelp.useEffect.h"];
            window.addEventListener('keydown', h);
            return ({
                "ControlsHelp.useEffect": ()=>window.removeEventListener('keydown', h)
            })["ControlsHelp.useEffect"];
        }
    }["ControlsHelp.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ControlsHelp.useEffect": ()=>{
            if (dismissed) return;
            const t = setTimeout({
                "ControlsHelp.useEffect.t": ()=>setShow(false)
            }["ControlsHelp.useEffect.t"], 15000);
            return ({
                "ControlsHelp.useEffect": ()=>clearTimeout(t)
            })["ControlsHelp.useEffect"];
        }
    }["ControlsHelp.useEffect"], [
        dismissed
    ]);
    if (!show) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute bottom-16 right-5 bg-black/85 backdrop-blur-xl rounded-2xl p-5 border border-orange-500/40 shadow-2xl shadow-orange-500/10 w-[280px] select-none",
        style: {
            animation: 'fadeIn 0.3s ease-out'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm font-black text-orange-400 tracking-wider flex items-center gap-2",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('controls.label', lang)
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/BasketballGame.tsx",
                        lineNumber: 294,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            setShow(false);
                            setDismissed(true);
                        },
                        className: "text-gray-500 hover:text-white text-xs transition-colors w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10 pointer-events-auto",
                        children: "✕"
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/BasketballGame.tsx",
                        lineNumber: 295,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/game/BasketballGame.tsx",
                lineNumber: 293,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3 text-[13px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ControlRow, {
                        icon: "🏃",
                        label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('controls.move', lang),
                        keys: "W A S D"
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/BasketballGame.tsx",
                        lineNumber: 298,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ControlRow, {
                        icon: "⬆️",
                        label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('controls.jump', lang),
                        keys: "SPACE"
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/BasketballGame.tsx",
                        lineNumber: 299,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ControlRow, {
                        icon: "🎯",
                        label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('controls.shoot', lang),
                        keys: "E",
                        highlight: true
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/BasketballGame.tsx",
                        lineNumber: 300,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ControlRow, {
                        icon: "💥",
                        label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('controls.dunk', lang),
                        keys: "F"
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/BasketballGame.tsx",
                        lineNumber: 301,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ControlRow, {
                        icon: "🤚",
                        label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('controls.steal', lang),
                        keys: "Q"
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/BasketballGame.tsx",
                        lineNumber: 302,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ControlRow, {
                        icon: "⚡",
                        label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('controls.sprint', lang),
                        keys: "SHIFT"
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/BasketballGame.tsx",
                        lineNumber: 303,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/game/BasketballGame.tsx",
                lineNumber: 297,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 pt-3 border-t border-gray-700/50 text-[11px] text-gray-500 text-center",
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('controls.tipLine', lang)
            }, void 0, false, {
                fileName: "[project]/src/components/game/BasketballGame.tsx",
                lineNumber: 305,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 text-[11px] text-gray-600 text-center",
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('controls.toggleHint', lang)
            }, void 0, false, {
                fileName: "[project]/src/components/game/BasketballGame.tsx",
                lineNumber: 306,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/game/BasketballGame.tsx",
        lineNumber: 292,
        columnNumber: 5
    }, this);
}
_s4(ControlsHelp, "I8fS1y+VKABXWFxSYkQKhO8U7s0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"]
    ];
});
_c4 = ControlsHelp;
function ControlRow({ icon, label, keys, highlight }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex justify-between items-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-gray-300 flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm",
                        children: icon
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/BasketballGame.tsx",
                        lineNumber: 314,
                        columnNumber: 63
                    }, this),
                    " ",
                    label
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/game/BasketballGame.tsx",
                lineNumber: 314,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `font-mono px-2.5 py-1 rounded-md text-xs font-bold ${highlight ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' : 'bg-white/10 text-white'}`,
                children: keys
            }, void 0, false, {
                fileName: "[project]/src/components/game/BasketballGame.tsx",
                lineNumber: 315,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/game/BasketballGame.tsx",
        lineNumber: 313,
        columnNumber: 5
    }, this);
}
_c5 = ControlRow;
// ============== Persistent Mini Controls Bar ==============
function MiniControlsBar() {
    _s5();
    const hasBall = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "MiniControlsBar.useGameStore[hasBall]": (s)=>s.hasBall
    }["MiniControlsBar.useGameStore[hasBall]"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/60 backdrop-blur-md rounded-full px-3 py-1.5 border border-gray-700/30 z-20 pointer-events-none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MiniKey, {
                label: "WASD",
                active: true
            }, void 0, false, {
                fileName: "[project]/src/components/game/BasketballGame.tsx",
                lineNumber: 325,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-px h-3.5 bg-gray-700/60"
            }, void 0, false, {
                fileName: "[project]/src/components/game/BasketballGame.tsx",
                lineNumber: 325,
                columnNumber: 45
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MiniKey, {
                label: "SPACE"
            }, void 0, false, {
                fileName: "[project]/src/components/game/BasketballGame.tsx",
                lineNumber: 326,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-px h-3.5 bg-gray-700/60"
            }, void 0, false, {
                fileName: "[project]/src/components/game/BasketballGame.tsx",
                lineNumber: 326,
                columnNumber: 32
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MiniKey, {
                label: "E",
                active: hasBall
            }, void 0, false, {
                fileName: "[project]/src/components/game/BasketballGame.tsx",
                lineNumber: 327,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-px h-3.5 bg-gray-700/60"
            }, void 0, false, {
                fileName: "[project]/src/components/game/BasketballGame.tsx",
                lineNumber: 327,
                columnNumber: 45
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MiniKey, {
                label: "F",
                active: hasBall
            }, void 0, false, {
                fileName: "[project]/src/components/game/BasketballGame.tsx",
                lineNumber: 328,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-px h-3.5 bg-gray-700/60"
            }, void 0, false, {
                fileName: "[project]/src/components/game/BasketballGame.tsx",
                lineNumber: 328,
                columnNumber: 45
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MiniKey, {
                label: "Q"
            }, void 0, false, {
                fileName: "[project]/src/components/game/BasketballGame.tsx",
                lineNumber: 329,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-px h-3.5 bg-gray-700/60"
            }, void 0, false, {
                fileName: "[project]/src/components/game/BasketballGame.tsx",
                lineNumber: 329,
                columnNumber: 28
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MiniKey, {
                label: "SHIFT"
            }, void 0, false, {
                fileName: "[project]/src/components/game/BasketballGame.tsx",
                lineNumber: 330,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/game/BasketballGame.tsx",
        lineNumber: 324,
        columnNumber: 5
    }, this);
}
_s5(MiniControlsBar, "CLtwB1DfF2Nb5vKyTuS+9LNCrg8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"]
    ];
});
_c6 = MiniControlsBar;
function MiniKey({ label, active }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `px-1.5 py-0.5 rounded text-[9px] font-mono font-bold transition-all ${active ? 'bg-orange-500/30 text-orange-300' : 'bg-white/8 text-gray-500'}`,
        children: label
    }, void 0, false, {
        fileName: "[project]/src/components/game/BasketballGame.tsx",
        lineNumber: 335,
        columnNumber: 11
    }, this);
}
_c7 = MiniKey;
// ============== Game Over Overlay ==============
function GameOverOverlay({ playerScore, opponentScore, opponentName, currentRound, totalRounds, isWin, onNextRound, onRestart }) {
    _s6();
    const lang = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "GameOverOverlay.useGameStore[lang]": (s)=>s.lang
    }["GameOverOverlay.useGameStore[lang]"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-gradient-to-b from-gray-900 to-gray-950 rounded-2xl p-8 max-w-md w-full mx-4 border border-orange-500/30 shadow-2xl shadow-orange-500/10",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `text-6xl font-black mb-2 ${isWin ? 'text-orange-400' : 'text-red-500'}`,
                        style: {
                            textShadow: `0 0 40px ${isWin ? 'rgba(255,107,53,0.5)' : 'rgba(239,68,68,0.5)'}`
                        },
                        children: isWin ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('gameOver.victory', lang) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('gameOver.defeat', lang)
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/BasketballGame.tsx",
                        lineNumber: 347,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-gray-400 text-sm mb-6",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('gameOver.roundDone', lang, {
                            r: currentRound + 1
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/BasketballGame.tsx",
                        lineNumber: 350,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-center gap-8 mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-orange-400 font-bold",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('hud.you', lang)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/game/BasketballGame.tsx",
                                        lineNumber: 352,
                                        columnNumber: 18
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-4xl font-black text-white",
                                        children: playerScore
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/game/BasketballGame.tsx",
                                        lineNumber: 352,
                                        columnNumber: 95
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/game/BasketballGame.tsx",
                                lineNumber: 352,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-3xl text-gray-600 self-center",
                                children: "-"
                            }, void 0, false, {
                                fileName: "[project]/src/components/game/BasketballGame.tsx",
                                lineNumber: 353,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-cyan-400 font-bold",
                                        children: opponentName
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/game/BasketballGame.tsx",
                                        lineNumber: 354,
                                        columnNumber: 18
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-4xl font-black text-white",
                                        children: opponentScore
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/game/BasketballGame.tsx",
                                        lineNumber: 354,
                                        columnNumber: 87
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/game/BasketballGame.tsx",
                                lineNumber: 354,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/game/BasketballGame.tsx",
                        lineNumber: 351,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-center gap-3 mb-2",
                        children: Array.from({
                            length: totalRounds
                        }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `w-3 h-3 rounded-full ${i < currentRound + 1 ? 'bg-orange-400 shadow-lg shadow-orange-400/50' : 'bg-gray-700'}`
                            }, i, false, {
                                fileName: "[project]/src/components/game/BasketballGame.tsx",
                                lineNumber: 357,
                                columnNumber: 65
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/BasketballGame.tsx",
                        lineNumber: 356,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-gray-500 mb-6",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('gameOver.progress', lang)
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/BasketballGame.tsx",
                        lineNumber: 359,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3 justify-center",
                        children: [
                            isWin && currentRound < totalRounds - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onNextRound,
                                className: "px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30 pointer-events-auto",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('gameOver.nextRound', lang)
                            }, void 0, false, {
                                fileName: "[project]/src/components/game/BasketballGame.tsx",
                                lineNumber: 361,
                                columnNumber: 58
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onRestart,
                                className: "px-6 py-3 bg-gray-800 text-gray-300 font-bold rounded-xl hover:bg-gray-700 transition-all border border-gray-600 pointer-events-auto",
                                children: isWin && currentRound >= totalRounds - 1 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('gameOver.newTourney', lang) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('gameOver.restart', lang)
                            }, void 0, false, {
                                fileName: "[project]/src/components/game/BasketballGame.tsx",
                                lineNumber: 362,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/game/BasketballGame.tsx",
                        lineNumber: 360,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/game/BasketballGame.tsx",
                lineNumber: 346,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/game/BasketballGame.tsx",
            lineNumber: 345,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/game/BasketballGame.tsx",
        lineNumber: 344,
        columnNumber: 5
    }, this);
}
_s6(GameOverOverlay, "QGyRTUabyx3sN2V8cvGgVBlRhTY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"]
    ];
});
_c8 = GameOverOverlay;
// ============== Tournament Win Overlay ==============
function TournamentWinOverlay({ onRestart }) {
    _s7();
    const lang = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])({
        "TournamentWinOverlay.useGameStore[lang]": (s)=>s.lang
    }["TournamentWinOverlay.useGameStore[lang]"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-gradient-to-b from-yellow-900/30 to-gray-950 rounded-2xl p-10 max-w-md w-full mx-4 border border-yellow-500/40 shadow-2xl shadow-yellow-500/20",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-7xl mb-4",
                        children: "👑"
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/BasketballGame.tsx",
                        lineNumber: 379,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-5xl font-black text-yellow-400 mb-2",
                        style: {
                            textShadow: '0 0 40px rgba(255,200,0,0.6)'
                        },
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('champ.title', lang)
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/BasketballGame.tsx",
                        lineNumber: 380,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-gray-400 mb-2",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('champ.subtitle', lang)
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/BasketballGame.tsx",
                        lineNumber: 381,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-yellow-500/80 text-sm mb-8",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('champ.tagline', lang)
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/BasketballGame.tsx",
                        lineNumber: 382,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-black/40 rounded-xl p-4 mb-6 border border-yellow-500/20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-yellow-400 font-bold mb-2",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('champ.rewards', lang)
                            }, void 0, false, {
                                fileName: "[project]/src/components/game/BasketballGame.tsx",
                                lineNumber: 384,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-around text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-2xl",
                                                children: "🏅"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/game/BasketballGame.tsx",
                                                lineNumber: 386,
                                                columnNumber: 20
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-gray-400",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('champ.trophy', lang)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/game/BasketballGame.tsx",
                                                lineNumber: 386,
                                                columnNumber: 54
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/game/BasketballGame.tsx",
                                        lineNumber: 386,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-2xl",
                                                children: "💎"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/game/BasketballGame.tsx",
                                                lineNumber: 387,
                                                columnNumber: 20
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-gray-400",
                                                children: "50 RTUAL"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/game/BasketballGame.tsx",
                                                lineNumber: 387,
                                                columnNumber: 54
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/game/BasketballGame.tsx",
                                        lineNumber: 387,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-2xl",
                                                children: "⭐"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/game/BasketballGame.tsx",
                                                lineNumber: 388,
                                                columnNumber: 20
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-gray-400",
                                                children: lang === 'zh' ? '冠军徽章' : 'Champion Badge'
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/game/BasketballGame.tsx",
                                                lineNumber: 388,
                                                columnNumber: 53
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/game/BasketballGame.tsx",
                                        lineNumber: 388,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/game/BasketballGame.tsx",
                                lineNumber: 385,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/game/BasketballGame.tsx",
                        lineNumber: 383,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onRestart,
                        className: "px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-black rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all shadow-lg shadow-yellow-500/30 pointer-events-auto",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('champ.again', lang)
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/BasketballGame.tsx",
                        lineNumber: 391,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/game/BasketballGame.tsx",
                lineNumber: 378,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/game/BasketballGame.tsx",
            lineNumber: 377,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/game/BasketballGame.tsx",
        lineNumber: 376,
        columnNumber: 5
    }, this);
}
_s7(TournamentWinOverlay, "QGyRTUabyx3sN2V8cvGgVBlRhTY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"]
    ];
});
_c9 = TournamentWinOverlay;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "BasketballGame");
__turbopack_context__.k.register(_c1, "LangToggle");
__turbopack_context__.k.register(_c2, "GameHUD");
__turbopack_context__.k.register(_c3, "ContextHintOverlay");
__turbopack_context__.k.register(_c4, "ControlsHelp");
__turbopack_context__.k.register(_c5, "ControlRow");
__turbopack_context__.k.register(_c6, "MiniControlsBar");
__turbopack_context__.k.register(_c7, "MiniKey");
__turbopack_context__.k.register(_c8, "GameOverOverlay");
__turbopack_context__.k.register(_c9, "TournamentWinOverlay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/ritualWallet.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Ritual Chain Configuration (from docs.ritualfoundation.org)
__turbopack_context__.s([
    "RITUAL_CHAIN",
    ()=>RITUAL_CHAIN,
    "RITUAL_RECEIVER",
    ()=>RITUAL_RECEIVER,
    "connectRitualWallet",
    ()=>connectRitualWallet,
    "getRitualBalance",
    ()=>getRitualBalance,
    "hasMetaMask",
    ()=>hasMetaMask,
    "isRitualChain",
    ()=>isRitualChain,
    "onAccountsChanged",
    ()=>onAccountsChanged,
    "onChainChanged",
    ()=>onChainChanged,
    "sendRitual",
    ()=>sendRitual,
    "shortenAddress",
    ()=>shortenAddress
]);
const RITUAL_CHAIN = {
    chainId: '0x7BB',
    chainName: 'Ritual',
    nativeCurrency: {
        name: 'Ritual',
        symbol: 'RITUAL',
        decimals: 18
    },
    rpcUrls: [
        'https://rpc.ritualfoundation.org'
    ],
    blockExplorerUrls: [
        'https://explorer.ritualfoundation.org'
    ]
};
/**
 * Get the real MetaMask provider even when Binance Wallet overrides window.ethereum.
 * Binance Wallet sets window.ethereum but the real MetaMask is in the providers array.
 */ function getMetaMaskProvider() {
    const w = window;
    const ethereum = w.ethereum;
    if (!ethereum) return null;
    // If there's a providers array, find MetaMask specifically
    if (ethereum.providers && ethereum.providers.length > 0) {
        const metaMask = ethereum.providers.find((p)=>p.isMetaMask);
        if (metaMask) return metaMask;
    }
    // No providers array — if the current one is MetaMask (and not Binance), use it
    if (ethereum.isMetaMask && !ethereum.isBinance) {
        return ethereum;
    }
    return null;
}
function hasMetaMask() {
    return ("TURBOPACK compile-time value", "object") !== 'undefined' && getMetaMaskProvider() !== null;
}
async function connectRitualWallet() {
    const provider = getMetaMaskProvider();
    if (!provider) {
        throw new Error(("TURBOPACK compile-time value", "object") !== 'undefined' && window.ethereum ? 'MetaMask not detected. You may have Binance Wallet overriding it. Try disabling Binance Wallet extension.' : 'MetaMask not installed');
    }
    // Request accounts from the real MetaMask
    const accounts = await provider.request({
        method: 'eth_requestAccounts'
    });
    if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found');
    }
    const address = accounts[0];
    // Try to switch to Ritual chain, if fails then add it
    try {
        await provider.request({
            method: 'wallet_switchEthereumChain',
            params: [
                {
                    chainId: RITUAL_CHAIN.chainId
                }
            ]
        });
    } catch (switchError) {
        const err = switchError;
        // Chain not added yet — add it
        if (err.code === 4902) {
            await provider.request({
                method: 'wallet_addEthereumChain',
                params: [
                    RITUAL_CHAIN
                ]
            });
        } else {
            throw switchError;
        }
    }
    const chainId = await provider.request({
        method: 'eth_chainId'
    });
    return {
        address,
        chainId
    };
}
async function getRitualBalance(address) {
    const provider = getMetaMaskProvider();
    if (!provider) return '0';
    const balance = await provider.request({
        method: 'eth_getBalance',
        params: [
            address,
            'latest'
        ]
    });
    // Convert from hex wei to RITUAL
    const wei = parseInt(balance, 16);
    return (wei / 1e18).toFixed(4);
}
const RITUAL_RECEIVER = '0x24568e2E1b555D1eb9b4F9b2c2f5cE8e9aC93038';
async function sendRitual(amountInEther) {
    const provider = getMetaMaskProvider();
    if (!provider) throw new Error('No wallet connected');
    const accounts = await provider.request({
        method: 'eth_accounts'
    });
    if (!accounts || accounts.length === 0) throw new Error('No accounts');
    const txHash = await provider.request({
        method: 'eth_sendTransaction',
        params: [
            {
                from: accounts[0],
                to: RITUAL_RECEIVER,
                value: '0x' + BigInt(Math.floor(parseFloat(amountInEther) * 1e18)).toString(16)
            }
        ]
    });
    return {
        txHash
    };
}
function onAccountsChanged(callback) {
    const provider = getMetaMaskProvider();
    provider?.on('accountsChanged', callback);
    return ()=>provider?.removeListener('accountsChanged', callback);
}
function onChainChanged(callback) {
    const provider = getMetaMaskProvider();
    provider?.on('chainChanged', callback);
    return ()=>provider?.removeListener('chainChanged', callback);
}
function isRitualChain(chainId) {
    return chainId.toLowerCase() === RITUAL_CHAIN.chainId.toLowerCase();
}
function shortenAddress(address) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/game/StartScreen.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StartScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/gameStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/i18n.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ritualWallet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/ritualWallet.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function WalletConnectModal({ onClose }) {
    _s();
    const { setWalletAddress, setWalletConnected, setRitualBalance, lang } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])();
    const [connecting, setConnecting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errorMsg, setErrorMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const connectWallet = async (walletType)=>{
        if (walletType === 'MetaMask' && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ritualWallet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasMetaMask"])()) {
            setErrorMsg(lang === 'zh' ? '请先安装 MetaMask 浏览器插件' : 'Please install MetaMask browser extension first');
            return;
        }
        setConnecting(true);
        setErrorMsg('');
        try {
            const { address, chainId } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ritualWallet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["connectRitualWallet"])();
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ritualWallet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRitualChain"])(chainId)) {
                setErrorMsg(lang === 'zh' ? '请切换到 Ritual 网络' : 'Please switch to Ritual network');
                setConnecting(false);
                return;
            }
            setWalletAddress(address);
            setWalletConnected(true);
            // Get real balance
            try {
                const bal = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ritualWallet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRitualBalance"])(address);
                setRitualBalance(parseFloat(bal));
            } catch  {
                setRitualBalance(0);
            }
            setConnecting(false);
            onClose();
        } catch (err) {
            const e = err;
            setErrorMsg(e.message || (lang === 'zh' ? '连接失败' : 'Connection failed'));
            setConnecting(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0
        },
        animate: {
            opacity: 1
        },
        exit: {
            opacity: 0
        },
        className: "fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                scale: 0.9,
                y: 20
            },
            animate: {
                scale: 1,
                y: 0
            },
            className: "bg-gray-900 rounded-2xl p-6 max-w-sm w-full mx-4 border border-cyan-500/30 shadow-2xl shadow-cyan-500/10",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-lg font-bold text-white mb-1",
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('wallet.connectTitle', lang)
                }, void 0, false, {
                    fileName: "[project]/src/components/game/StartScreen.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-gray-400 mb-5",
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('wallet.connectDesc', lang)
                }, void 0, false, {
                    fileName: "[project]/src/components/game/StartScreen.tsx",
                    lineNumber: 65,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3",
                    children: [
                        {
                            name: 'MetaMask',
                            icon: '🦊',
                            desc: 'Recommended'
                        },
                        {
                            name: 'WalletConnect',
                            icon: '🔗',
                            desc: 'Mobile'
                        },
                        {
                            name: 'Coinbase Wallet',
                            icon: '💎',
                            desc: ''
                        },
                        {
                            name: 'Ritual Wallet',
                            icon: '🔮',
                            desc: 'Native'
                        }
                    ].map((wallet)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>connectWallet(wallet.name),
                            disabled: connecting,
                            className: "w-full flex items-center gap-3 p-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition-all border border-gray-600/50 disabled:opacity-50",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-lg",
                                    children: wallet.icon
                                }, void 0, false, {
                                    fileName: "[project]/src/components/game/StartScreen.tsx",
                                    lineNumber: 79,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-left",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-bold text-white block",
                                            children: wallet.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/game/StartScreen.tsx",
                                            lineNumber: 83,
                                            columnNumber: 17
                                        }, this),
                                        wallet.desc && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] text-gray-500",
                                            children: wallet.desc
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/game/StartScreen.tsx",
                                            lineNumber: 84,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/game/StartScreen.tsx",
                                    lineNumber: 82,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] text-cyan-400 ml-auto font-bold",
                                    children: "Ritual"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/game/StartScreen.tsx",
                                    lineNumber: 86,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, wallet.name, true, {
                            fileName: "[project]/src/components/game/StartScreen.tsx",
                            lineNumber: 73,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/game/StartScreen.tsx",
                    lineNumber: 66,
                    columnNumber: 9
                }, this),
                errorMsg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-red-400 text-xs mt-3 text-center",
                    children: errorMsg
                }, void 0, false, {
                    fileName: "[project]/src/components/game/StartScreen.tsx",
                    lineNumber: 90,
                    columnNumber: 22
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClose,
                    className: "w-full mt-4 py-2 text-gray-400 text-sm hover:text-white transition-colors",
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('wallet.cancel', lang)
                }, void 0, false, {
                    fileName: "[project]/src/components/game/StartScreen.tsx",
                    lineNumber: 91,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/game/StartScreen.tsx",
            lineNumber: 59,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/game/StartScreen.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_s(WalletConnectModal, "HP7hfCI9bd1juPoFcVoCE+VkUAY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"]
    ];
});
_c = WalletConnectModal;
function StartScreen({ onEnterGame, onOpenShop }) {
    _s1();
    const { twitterId, setTwitterId, setAvatarUrl, setPlayerName, walletConnected, avatarUrl, lang, setLang } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])();
    const [inputId, setInputId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(twitterId);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [showWallet, setShowWallet] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSubmit = async ()=>{
        if (!inputId.trim()) {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('menu.enterTwitter', lang));
            return;
        }
        if (!walletConnected) {
            setError(lang === 'zh' ? '请先连接钱包' : 'Please connect wallet first');
            setShowWallet(true);
            return;
        }
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`/api/twitter?id=${encodeURIComponent(inputId.trim())}`);
            const data = await res.json();
            if (data.valid && data.avatarUrl) {
                setTwitterId(inputId.trim());
                setAvatarUrl(data.avatarUrl);
                setPlayerName(inputId.trim().replace('@', ''));
                onEnterGame();
            } else {
                setError(data.error || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('menu.errorAvatar', lang));
            }
        } catch  {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('menu.errorAvatar', lang));
        }
        setLoading(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full h-screen flex items-center justify-center overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-4 right-4 z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>setLang(lang === 'zh' ? 'en' : 'zh'),
                    className: "bg-black/60 backdrop-blur rounded-lg px-2.5 py-1 border border-gray-600/50 text-gray-400 hover:text-white text-xs font-bold",
                    children: lang === 'en' ? '中文' : 'EN'
                }, void 0, false, {
                    fileName: "[project]/src/components/game/StartScreen.tsx",
                    lineNumber: 143,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/game/StartScreen.tsx",
                lineNumber: 142,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-cover bg-center bg-no-repeat",
                style: {
                    backgroundImage: 'url(/home-bg.jpg)'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/game/StartScreen.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/50 backdrop-blur-[2px]"
            }, void 0, false, {
                fileName: "[project]/src/components/game/StartScreen.tsx",
                lineNumber: 154,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 overflow-hidden pointer-events-none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/15 rounded-full blur-3xl animate-pulse"
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/StartScreen.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl animate-pulse",
                        style: {
                            animationDelay: '1s'
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/StartScreen.tsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse",
                        style: {
                            animationDelay: '2s'
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/StartScreen.tsx",
                        lineNumber: 160,
                        columnNumber: 9
                    }, this),
                    [
                        ...Array(8)
                    ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute text-4xl opacity-10 animate-bounce",
                            style: {
                                left: `${10 + i * 12}%`,
                                top: `${20 + Math.sin(i) * 30}%`,
                                animationDelay: `${i * 0.5}s`,
                                animationDuration: `${3 + i * 0.3}s`
                            },
                            children: "🏀"
                        }, i, false, {
                            fileName: "[project]/src/components/game/StartScreen.tsx",
                            lineNumber: 164,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/game/StartScreen.tsx",
                lineNumber: 157,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 flex flex-col items-center max-w-lg w-full mx-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            scale: 0.5,
                            opacity: 0
                        },
                        animate: {
                            scale: 1,
                            opacity: 1
                        },
                        transition: {
                            type: 'spring',
                            stiffness: 200
                        },
                        className: "text-center mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-7xl mb-4",
                                children: "🏀"
                            }, void 0, false, {
                                fileName: "[project]/src/components/game/StartScreen.tsx",
                                lineNumber: 188,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-purple-500 mb-2",
                                style: {
                                    textShadow: '0 0 60px rgba(255,107,53,0.3)'
                                },
                                children: "RITUAL HOOPS"
                            }, void 0, false, {
                                fileName: "[project]/src/components/game/StartScreen.tsx",
                                lineNumber: 189,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-400 text-sm tracking-widest uppercase",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('menu.subtitle', lang)
                            }, void 0, false, {
                                fileName: "[project]/src/components/game/StartScreen.tsx",
                                lineNumber: 193,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center gap-2 mt-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-2 h-2 bg-green-400 rounded-full animate-pulse"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/game/StartScreen.tsx",
                                        lineNumber: 197,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-green-400 text-xs font-bold",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('menu.live', lang)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/game/StartScreen.tsx",
                                        lineNumber: 198,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/game/StartScreen.tsx",
                                lineNumber: 196,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/game/StartScreen.tsx",
                        lineNumber: 182,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            y: 30,
                            opacity: 0
                        },
                        animate: {
                            y: 0,
                            opacity: 1
                        },
                        transition: {
                            delay: 0.3
                        },
                        className: "w-full bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-bold text-gray-300 mb-2",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('menu.enterTwitter', lang)
                            }, void 0, false, {
                                fileName: "[project]/src/components/game/StartScreen.tsx",
                                lineNumber: 209,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-500",
                                                children: "@"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/game/StartScreen.tsx",
                                                lineNumber: 214,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: inputId,
                                                onChange: (e)=>setInputId(e.target.value),
                                                onKeyDown: (e)=>e.key === 'Enter' && handleSubmit(),
                                                placeholder: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('menu.placeholder', lang),
                                                className: "w-full bg-black/50 border border-gray-600 rounded-xl pl-8 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 transition-all"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/game/StartScreen.tsx",
                                                lineNumber: 215,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/game/StartScreen.tsx",
                                        lineNumber: 213,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleSubmit,
                                        disabled: loading,
                                        className: "px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all shadow-lg shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap",
                                        children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "animate-spin h-4 w-4",
                                                    viewBox: "0 0 24 24",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                            className: "opacity-25",
                                                            cx: "12",
                                                            cy: "12",
                                                            r: "10",
                                                            stroke: "currentColor",
                                                            strokeWidth: "4",
                                                            fill: "none"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/game/StartScreen.tsx",
                                                            lineNumber: 232,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            className: "opacity-75",
                                                            fill: "currentColor",
                                                            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/game/StartScreen.tsx",
                                                            lineNumber: 233,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/game/StartScreen.tsx",
                                                    lineNumber: 231,
                                                    columnNumber: 19
                                                }, this),
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('menu.loading', lang)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/game/StartScreen.tsx",
                                            lineNumber: 230,
                                            columnNumber: 17
                                        }, this) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('menu.play', lang)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/game/StartScreen.tsx",
                                        lineNumber: 224,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/game/StartScreen.tsx",
                                lineNumber: 212,
                                columnNumber: 11
                            }, this),
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-red-400 text-xs mt-2",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/src/components/game/StartScreen.tsx",
                                lineNumber: 240,
                                columnNumber: 21
                            }, this),
                            avatarUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: avatarUrl,
                                        alt: "Avatar",
                                        className: "w-10 h-10 rounded-full border-2 border-orange-500"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/game/StartScreen.tsx",
                                        lineNumber: 245,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-gray-300 text-sm",
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('menu.avatarPreview', lang),
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                className: "text-orange-400",
                                                children: inputId.replace('@', '')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/game/StartScreen.tsx",
                                                lineNumber: 246,
                                                columnNumber: 87
                                            }, this),
                                            lang === 'zh' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('menu.avatarPreviewEnd', lang) : ''
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/game/StartScreen.tsx",
                                        lineNumber: 246,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/game/StartScreen.tsx",
                                lineNumber: 244,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/game/StartScreen.tsx",
                        lineNumber: 203,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            y: 30,
                            opacity: 0
                        },
                        animate: {
                            y: 0,
                            opacity: 1
                        },
                        transition: {
                            delay: 0.5
                        },
                        className: "w-full bg-gray-900/40 backdrop-blur rounded-xl p-4 border border-gray-700/30 mb-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-4 text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-2xl mb-1",
                                            children: "🏆"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/game/StartScreen.tsx",
                                            lineNumber: 260,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-gray-400",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('menu.rounds', lang)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/game/StartScreen.tsx",
                                            lineNumber: 261,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-gray-500 text-xs",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('menu.tournament', lang)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/game/StartScreen.tsx",
                                            lineNumber: 262,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/game/StartScreen.tsx",
                                    lineNumber: 259,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-px h-12 bg-gray-700"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/game/StartScreen.tsx",
                                    lineNumber: 264,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-2xl mb-1",
                                            children: "⚔️"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/game/StartScreen.tsx",
                                            lineNumber: 266,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-gray-400",
                                            children: "1v1"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/game/StartScreen.tsx",
                                            lineNumber: 267,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-gray-500 text-xs",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('menu.basketball', lang)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/game/StartScreen.tsx",
                                            lineNumber: 268,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/game/StartScreen.tsx",
                                    lineNumber: 265,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-px h-12 bg-gray-700"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/game/StartScreen.tsx",
                                    lineNumber: 270,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-2xl mb-1",
                                            children: "💎"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/game/StartScreen.tsx",
                                            lineNumber: 272,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-gray-400",
                                            children: "NFTs"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/game/StartScreen.tsx",
                                            lineNumber: 273,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-gray-500 text-xs",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('menu.powerUp', lang)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/game/StartScreen.tsx",
                                            lineNumber: 274,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/game/StartScreen.tsx",
                                    lineNumber: 271,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/game/StartScreen.tsx",
                            lineNumber: 258,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/StartScreen.tsx",
                        lineNumber: 252,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            y: 30,
                            opacity: 0
                        },
                        animate: {
                            y: 0,
                            opacity: 1
                        },
                        transition: {
                            delay: 0.7
                        },
                        className: "flex gap-3 w-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onOpenShop,
                                className: "flex-1 py-3 bg-gray-800/60 border border-purple-500/30 text-purple-300 font-bold rounded-xl hover:bg-purple-900/40 transition-all",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('menu.nftShop', lang)
                            }, void 0, false, {
                                fileName: "[project]/src/components/game/StartScreen.tsx",
                                lineNumber: 286,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowWallet(true),
                                className: `flex-1 py-3 border font-bold rounded-xl transition-all ${walletConnected ? 'bg-green-900/40 border-green-500/50 text-green-300' : 'bg-gray-800/60 border-cyan-500/30 text-cyan-300 hover:bg-cyan-900/40'}`,
                                children: walletConnected ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('menu.walletConnected', lang) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('menu.connectWallet', lang)
                            }, void 0, false, {
                                fileName: "[project]/src/components/game/StartScreen.tsx",
                                lineNumber: 292,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/game/StartScreen.tsx",
                        lineNumber: 280,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 text-center text-xs text-gray-600",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('menu.poweredBy', lang)
                            }, void 0, false, {
                                fileName: "[project]/src/components/game/StartScreen.tsx",
                                lineNumber: 306,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('menu.gameRule', lang)
                            }, void 0, false, {
                                fileName: "[project]/src/components/game/StartScreen.tsx",
                                lineNumber: 307,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/game/StartScreen.tsx",
                        lineNumber: 305,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/game/StartScreen.tsx",
                lineNumber: 180,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: showWallet && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WalletConnectModal, {
                    onClose: ()=>setShowWallet(false)
                }, void 0, false, {
                    fileName: "[project]/src/components/game/StartScreen.tsx",
                    lineNumber: 313,
                    columnNumber: 24
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/game/StartScreen.tsx",
                lineNumber: 312,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/game/StartScreen.tsx",
        lineNumber: 140,
        columnNumber: 5
    }, this);
}
_s1(StartScreen, "WeAjR2VpQOk9iams2RsDTg2h/50=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"]
    ];
});
_c1 = StartScreen;
var _c, _c1;
__turbopack_context__.k.register(_c, "WalletConnectModal");
__turbopack_context__.k.register(_c1, "StartScreen");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/game/NFTShop.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NFTShop
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/gameStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/i18n.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ritualWallet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/ritualWallet.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
/* ── type-specific visual config ── */ const TYPE_VISUAL = {
    jersey: {
        icon: '\uD83D\uDC55',
        label: 'JERSEY',
        shape: 'hex',
        accent: 'from-orange-500 via-red-500 to-rose-600',
        badgeBg: 'bg-orange-500/20',
        ring: 'ring-orange-500/40',
        textColor: 'text-orange-400'
    },
    shoes: {
        icon: '\uD83D\uDC5F',
        label: 'SHOES',
        shape: 'diamond',
        accent: 'from-emerald-400 via-cyan-500 to-blue-600',
        badgeBg: 'bg-emerald-500/20',
        ring: 'ring-emerald-500/40',
        textColor: 'text-emerald-400'
    },
    headband: {
        icon: '\uD83C\uDFAF',
        label: 'HEADBAND',
        shape: 'circle',
        accent: 'from-violet-500 via-purple-500 to-fuchsia-600',
        badgeBg: 'bg-violet-500/20',
        ring: 'ring-violet-500/40',
        textColor: 'text-violet-400'
    },
    accessory: {
        icon: '\uD83D\uDCAA',
        label: 'ACCESSORY',
        shape: 'shield',
        accent: 'from-amber-400 via-yellow-500 to-orange-500',
        badgeBg: 'bg-amber-500/20',
        ring: 'ring-amber-500/40',
        textColor: 'text-amber-400'
    }
};
const RARITY_CFG = {
    common: {
        border: 'border-gray-500/60',
        glow: '',
        label: '\u26AA COMMON'
    },
    rare: {
        border: 'border-blue-500/50',
        glow: 'shadow-blue-500/25 shadow-lg',
        label: '\uD83D\uDD35 RARE'
    },
    epic: {
        border: 'border-purple-500/50',
        glow: 'shadow-purple-500/25 shadow-lg',
        label: '\uD83D\uDFE3 EPIC'
    },
    legendary: {
        border: 'border-yellow-400/60',
        glow: 'shadow-yellow-400/30 shadow-xl',
        label: '\uD83D\uDFE1 LEGENDARY'
    }
};
/* ── Shape SVG ── */ function ShapeIcon({ type, size = 72 }) {
    const v = TYPE_VISUAL[type];
    if (!v) return null;
    const s = size;
    const h = s / 2;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: s,
        height: s,
        viewBox: `0 0 ${s} ${s}`,
        className: "drop-shadow-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                    id: `sg-${type}`,
                    x1: "0%",
                    y1: "0%",
                    x2: "100%",
                    y2: "100%",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            offset: "0%",
                            stopColor: "#f97316"
                        }, void 0, false, {
                            fileName: "[project]/src/components/game/NFTShop.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            offset: "100%",
                            stopColor: "#ec4899"
                        }, void 0, false, {
                            fileName: "[project]/src/components/game/NFTShop.tsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/game/NFTShop.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/game/NFTShop.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            v.shape === 'circle' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: h,
                cy: h,
                r: s * 0.44,
                fill: `url(#sg-${type})`,
                fillOpacity: 0.12,
                stroke: `url(#sg-${type})`,
                strokeWidth: 2
            }, void 0, false, {
                fileName: "[project]/src/components/game/NFTShop.tsx",
                lineNumber: 64,
                columnNumber: 9
            }, this) : v.shape === 'hex' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                points: `${h},${s * 0.06} ${s * 0.94},${h * 0.66} ${s * 0.94},${s - h * 0.66} ${h},${s * 0.94} ${s * 0.06},${s - h * 0.66} ${s * 0.06},${h * 0.66}`,
                fill: `url(#sg-${type})`,
                fillOpacity: 0.12,
                stroke: `url(#sg-${type})`,
                strokeWidth: 2
            }, void 0, false, {
                fileName: "[project]/src/components/game/NFTShop.tsx",
                lineNumber: 66,
                columnNumber: 9
            }, this) : v.shape === 'diamond' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                points: `${h},4 ${s - 4},${h} ${h},${s - 4} 4,${h}`,
                fill: `url(#sg-${type})`,
                fillOpacity: 0.12,
                stroke: `url(#sg-${type})`,
                strokeWidth: 2
            }, void 0, false, {
                fileName: "[project]/src/components/game/NFTShop.tsx",
                lineNumber: 68,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: `M${h},4 L${s - 6},${s * 0.25} L${s - 6},${h} Q${s - 6},${s - 4} ${h},${s - 4} Q6,${s - 4} 6,${h} L6,${s * 0.25} Z`,
                fill: `url(#sg-${type})`,
                fillOpacity: 0.12,
                stroke: `url(#sg-${type})`,
                strokeWidth: 2
            }, void 0, false, {
                fileName: "[project]/src/components/game/NFTShop.tsx",
                lineNumber: 70,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                x: h,
                y: h + 8,
                textAnchor: "middle",
                fontSize: s * 0.38,
                children: v.icon
            }, void 0, false, {
                fileName: "[project]/src/components/game/NFTShop.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/game/NFTShop.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
_c = ShapeIcon;
/* ── stat bar ── */ function StatBlock({ label, value, color }) {
    const pct = Math.min(100, value / 10 * 100);
    const c = {
        green: 'bg-green-500',
        yellow: 'bg-yellow-500',
        blue: 'bg-blue-500',
        red: 'bg-red-500'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between text-xs mb-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-gray-400",
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/NFTShop.tsx",
                        lineNumber: 83,
                        columnNumber: 58
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-white font-bold",
                        children: [
                            "+",
                            value
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/game/NFTShop.tsx",
                        lineNumber: 83,
                        columnNumber: 104
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/game/NFTShop.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-2 bg-gray-800 rounded-full overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `h-full ${c[color]} rounded-full transition-all`,
                    style: {
                        width: `${pct}%`
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/game/NFTShop.tsx",
                    lineNumber: 84,
                    columnNumber: 69
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/game/NFTShop.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/game/NFTShop.tsx",
        lineNumber: 82,
        columnNumber: 5
    }, this);
}
_c1 = StatBlock;
function NFTShop({ onBack }) {
    _s();
    const { ownedNFTs, equippedNFTs, walletConnected, walletAddress, equipNFT, unequipNFT, addOwnedNFT, ritualBalance, gameHistory, lang, setLang } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])();
    const [selectedType, setSelectedType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [minting, setMinting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showWalletModal, setShowWalletModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('shop');
    const types = [
        'all',
        'jersey',
        'shoes',
        'headband',
        'accessory'
    ];
    const filteredNFTs = selectedType === 'all' ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALL_NFTS"] : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALL_NFTS"].filter((n)=>n.type === selectedType);
    const handleMint = async (nftId, price)=>{
        if (!walletConnected) {
            setShowWalletModal(true);
            return;
        }
        setMinting(nftId);
        try {
            const { txHash } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ritualWallet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendRitual"])(price.toString());
            console.log(`NFT mint tx: ${txHash}`);
            const nft = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALL_NFTS"].find((n)=>n.id === nftId);
            if (nft) {
                addOwnedNFT(nft);
            }
        } catch (err) {
            const e = err;
            alert(lang === 'zh' ? `购买失败: ${e.message || '交易被拒绝'}` : `Purchase failed: ${e.message || 'Transaction rejected'}`);
        }
        setMinting(null);
    };
    const isOwned = (id)=>ownedNFTs.some((n)=>n.id === id);
    const isEquipped = (id)=>Object.values(equippedNFTs).some((n)=>n?.id === id);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full h-screen overflow-y-auto",
        style: {
            background: 'linear-gradient(180deg, #0a0a1a 0%, #1a0a2e 100%)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: showWalletModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    className: "fixed inset-0 bg-black/70 flex items-center justify-center z-50",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WalletConnectModal, {
                        onClose: ()=>setShowWalletModal(false)
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/NFTShop.tsx",
                        lineNumber: 119,
                        columnNumber: 204
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/game/NFTShop.tsx",
                    lineNumber: 119,
                    columnNumber: 44
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/game/NFTShop.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-gray-800",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-5xl mx-auto px-4 py-3 flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onBack,
                            className: "flex items-center gap-2 text-gray-400 hover:text-white transition-colors",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-5 h-5",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M15 19l-7-7 7-7"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/game/NFTShop.tsx",
                                        lineNumber: 124,
                                        columnNumber: 92
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/game/NFTShop.tsx",
                                    lineNumber: 124,
                                    columnNumber: 13
                                }, this),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('shop.back', lang)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/game/NFTShop.tsx",
                            lineNumber: 123,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-1 bg-gray-900 rounded-lg p-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setTab('shop'),
                                    className: `px-4 py-1.5 rounded-md text-sm font-bold transition-all ${tab === 'shop' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'}`,
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('shop.tabShop', lang)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/game/NFTShop.tsx",
                                    lineNumber: 128,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setTab('history'),
                                    className: `px-4 py-1.5 rounded-md text-sm font-bold transition-all ${tab === 'history' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'}`,
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('shop.tabHistory', lang)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/game/NFTShop.tsx",
                                    lineNumber: 129,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/game/NFTShop.tsx",
                            lineNumber: 127,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setLang(lang === 'zh' ? 'en' : 'zh'),
                                    className: "bg-black/60 backdrop-blur rounded-lg px-2.5 py-1 border border-gray-600/50 text-gray-400 hover:text-white text-xs font-bold",
                                    children: lang === 'en' ? '中文' : 'EN'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/game/NFTShop.tsx",
                                    lineNumber: 132,
                                    columnNumber: 13
                                }, this),
                                walletConnected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-green-400 bg-green-900/30 px-2 py-1 rounded-full",
                                    children: [
                                        walletAddress?.slice(0, 6),
                                        "...",
                                        walletAddress?.slice(-4)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/game/NFTShop.tsx",
                                    lineNumber: 133,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-yellow-400 bg-yellow-900/30 px-2 py-1 rounded-full font-bold",
                                    children: [
                                        ritualBalance.toFixed(2),
                                        " RITUAL"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/game/NFTShop.tsx",
                                    lineNumber: 134,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/game/NFTShop.tsx",
                            lineNumber: 131,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/game/NFTShop.tsx",
                    lineNumber: 122,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/game/NFTShop.tsx",
                lineNumber: 121,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-5xl mx-auto px-4 py-6",
                children: tab === 'shop' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-sm font-bold text-gray-400 uppercase tracking-wider mb-3",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('shop.equippedGear', lang)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/game/NFTShop.tsx",
                                    lineNumber: 143,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-4 gap-3",
                                    children: [
                                        'jersey',
                                        'shoes',
                                        'headband',
                                        'accessory'
                                    ].map((slot)=>{
                                        const item = equippedNFTs[slot];
                                        const tv = TYPE_VISUAL[slot];
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `rounded-xl p-3 border text-center transition-all ring-1 ${item ? `${tv.ring} ${tv.badgeBg}` : 'border-gray-700/50 bg-gray-900/30 ring-gray-700/30'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-3xl mb-1",
                                                    children: item ? tv.icon : '+'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/game/NFTShop.tsx",
                                                    lineNumber: 149,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `text-[11px] font-bold ${item ? 'text-white' : 'text-gray-600'}`,
                                                    children: item ? item.name : `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('shop.noItem', lang)} ${tv.label}`
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/game/NFTShop.tsx",
                                                    lineNumber: 150,
                                                    columnNumber: 21
                                                }, this),
                                                item && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>unequipNFT(slot),
                                                    className: "text-[10px] text-red-400 hover:text-red-300 mt-1",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('shop.remove', lang)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/game/NFTShop.tsx",
                                                    lineNumber: 151,
                                                    columnNumber: 30
                                                }, this)
                                            ]
                                        }, slot, true, {
                                            fileName: "[project]/src/components/game/NFTShop.tsx",
                                            lineNumber: 148,
                                            columnNumber: 19
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/components/game/NFTShop.tsx",
                                    lineNumber: 144,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/game/NFTShop.tsx",
                            lineNumber: 142,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2 mb-6 overflow-x-auto pb-2",
                            children: types.map((type)=>{
                                const active = selectedType === type;
                                const tv = type === 'all' ? null : TYPE_VISUAL[type];
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSelectedType(type),
                                    className: `px-5 py-2 rounded-full text-xs font-bold uppercase transition-all whitespace-nowrap border ${active ? type === 'all' ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/30' : `bg-gradient-to-r ${tv.accent} text-white border-transparent shadow-lg` : 'bg-gray-800 text-gray-400 hover:bg-gray-700 border-gray-700'}`,
                                    children: type === 'all' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('shop.all', lang) : `${tv.icon} ${tv.label}`
                                }, type, false, {
                                    fileName: "[project]/src/components/game/NFTShop.tsx",
                                    lineNumber: 163,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/components/game/NFTShop.tsx",
                            lineNumber: 158,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 sm:grid-cols-2 gap-5",
                            children: filteredNFTs.map((nft, i)=>{
                                const owned = isOwned(nft.id);
                                const equipped = isEquipped(nft.id);
                                const rc = RARITY_CFG[nft.rarity];
                                const tv = TYPE_VISUAL[nft.type];
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        y: 20,
                                        opacity: 0
                                    },
                                    animate: {
                                        y: 0,
                                        opacity: 1
                                    },
                                    transition: {
                                        delay: i * 0.04
                                    },
                                    className: `rounded-xl border-2 overflow-hidden transition-all hover:scale-[1.02] bg-gray-950/80 ${rc.border} ${rc.glow} ${equipped ? `ring-2 ${tv.ring}` : ''}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `h-44 flex items-center justify-center relative bg-gradient-to-br ${tv.accent} opacity-20`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute inset-0 bg-gradient-to-br ${tv.accent} opacity-10"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/game/NFTShop.tsx",
                                                    lineNumber: 179,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative z-10",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ShapeIcon, {
                                                        type: nft.type,
                                                        size: 90
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/game/NFTShop.tsx",
                                                        lineNumber: 180,
                                                        columnNumber: 52
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/game/NFTShop.tsx",
                                                    lineNumber: 180,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "absolute top-2.5 right-2.5 text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-black/60 text-white/90 backdrop-blur-sm",
                                                    children: rc.label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/game/NFTShop.tsx",
                                                    lineNumber: 181,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `absolute top-2.5 left-2.5 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${tv.badgeBg} text-white backdrop-blur-sm ring-1 ${tv.ring}`,
                                                    children: tv.label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/game/NFTShop.tsx",
                                                    lineNumber: 182,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "absolute bottom-2.5 text-sm font-black text-white/90 drop-shadow-lg",
                                                    children: nft.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/game/NFTShop.tsx",
                                                    lineNumber: 183,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/game/NFTShop.tsx",
                                            lineNumber: 178,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "text-base font-black text-white mb-0.5",
                                                    children: nft.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/game/NFTShop.tsx",
                                                    lineNumber: 186,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: `text-xs mb-3 ${tv.textColor}`,
                                                    children: [
                                                        tv.label,
                                                        " · ",
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('shop.onRitual', lang)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/game/NFTShop.tsx",
                                                    lineNumber: 187,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-2 gap-x-4 gap-y-2.5 mb-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatBlock, {
                                                            label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('controls.move', lang),
                                                            value: nft.stats.speed,
                                                            color: "green"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/game/NFTShop.tsx",
                                                            lineNumber: 189,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatBlock, {
                                                            label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('controls.shoot', lang).split('(')[0].trim(),
                                                            value: nft.stats.shoot,
                                                            color: "yellow"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/game/NFTShop.tsx",
                                                            lineNumber: 190,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatBlock, {
                                                            label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('controls.steal', lang),
                                                            value: nft.stats.defense,
                                                            color: "blue"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/game/NFTShop.tsx",
                                                            lineNumber: 191,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatBlock, {
                                                            label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('controls.dunk', lang).split('(')[0].trim(),
                                                            value: nft.stats.dunk,
                                                            color: "red"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/game/NFTShop.tsx",
                                                            lineNumber: 192,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/game/NFTShop.tsx",
                                                    lineNumber: 188,
                                                    columnNumber: 21
                                                }, this),
                                                owned ? equipped ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>unequipNFT(nft.type),
                                                    className: "w-full py-2.5 bg-gray-700/50 text-gray-300 text-sm font-bold rounded-lg hover:bg-gray-600/50 transition-all",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('shop.equipped', lang)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/game/NFTShop.tsx",
                                                    lineNumber: 195,
                                                    columnNumber: 23
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>equipNFT(nft),
                                                    className: `w-full py-2.5 text-white text-sm font-bold rounded-lg transition-all bg-gradient-to-r ${tv.accent}`,
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('shop.equip', lang)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/game/NFTShop.tsx",
                                                    lineNumber: 197,
                                                    columnNumber: 23
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleMint(nft.id, nft.price),
                                                    disabled: minting === nft.id,
                                                    className: "w-full py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50",
                                                    children: minting === nft.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex items-center justify-center gap-1.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: "animate-spin h-3.5 w-3.5",
                                                                viewBox: "0 0 24 24",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                        className: "opacity-25",
                                                                        cx: "12",
                                                                        cy: "12",
                                                                        r: "10",
                                                                        stroke: "currentColor",
                                                                        strokeWidth: "4",
                                                                        fill: "none"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/game/NFTShop.tsx",
                                                                        lineNumber: 200,
                                                                        columnNumber: 169
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        className: "opacity-75",
                                                                        fill: "currentColor",
                                                                        d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/game/NFTShop.tsx",
                                                                        lineNumber: 200,
                                                                        columnNumber: 275
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/game/NFTShop.tsx",
                                                                lineNumber: 200,
                                                                columnNumber: 107
                                                            }, this),
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('shop.minting', lang)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/game/NFTShop.tsx",
                                                        lineNumber: 200,
                                                        columnNumber: 48
                                                    }, this) : `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('shop.mintFor', lang)} ${nft.price} RITUAL`
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/game/NFTShop.tsx",
                                                    lineNumber: 199,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/game/NFTShop.tsx",
                                            lineNumber: 185,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, nft.id, true, {
                                    fileName: "[project]/src/components/game/NFTShop.tsx",
                                    lineNumber: 176,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/components/game/NFTShop.tsx",
                            lineNumber: 171,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-black text-white mb-4",
                            children: lang === 'zh' ? '对战记录' : 'Game History'
                        }, void 0, false, {
                            fileName: "[project]/src/components/game/NFTShop.tsx",
                            lineNumber: 208,
                            columnNumber: 13
                        }, this),
                        !walletConnected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-16 bg-gray-900/40 rounded-xl border border-gray-800",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-4xl mb-3",
                                    children: "🔗"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/game/NFTShop.tsx",
                                    lineNumber: 209,
                                    columnNumber: 118
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-400",
                                    children: lang === 'zh' ? '连接钱包查看对战记录' : 'Connect your wallet to view game history'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/game/NFTShop.tsx",
                                    lineNumber: 209,
                                    columnNumber: 157
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/game/NFTShop.tsx",
                            lineNumber: 209,
                            columnNumber: 34
                        }, this) : gameHistory.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-16 bg-gray-900/40 rounded-xl border border-gray-800",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-4xl mb-3",
                                    children: "🏀"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/game/NFTShop.tsx",
                                    lineNumber: 210,
                                    columnNumber: 127
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-400",
                                    children: lang === 'zh' ? '还没有对战记录' : 'No games played yet'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/game/NFTShop.tsx",
                                    lineNumber: 210,
                                    columnNumber: 166
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/game/NFTShop.tsx",
                            lineNumber: 210,
                            columnNumber: 43
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: gameHistory.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `rounded-xl p-4 border ${r.result === 'win' ? 'border-green-500/30 bg-green-900/10' : 'border-red-500/30 bg-red-900/10'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between mb-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `text-xs font-black px-2 py-0.5 rounded ${r.result === 'win' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`,
                                                            children: r.result === 'win' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('shop.win', lang) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('shop.loss', lang)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/game/NFTShop.tsx",
                                                            lineNumber: 211,
                                                            columnNumber: 313
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm font-bold text-white",
                                                            children: [
                                                                "vs ",
                                                                r.opponentName
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/game/NFTShop.tsx",
                                                            lineNumber: 211,
                                                            columnNumber: 532
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/game/NFTShop.tsx",
                                                    lineNumber: 211,
                                                    columnNumber: 272
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-gray-500",
                                                    children: r.date
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/game/NFTShop.tsx",
                                                    lineNumber: 211,
                                                    columnNumber: 611
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/game/NFTShop.tsx",
                                            lineNumber: 211,
                                            columnNumber: 216
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-2xl font-black text-white",
                                                            children: r.playerScore
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/game/NFTShop.tsx",
                                                            lineNumber: 211,
                                                            columnNumber: 754
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-gray-600",
                                                            children: "-"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/game/NFTShop.tsx",
                                                            lineNumber: 211,
                                                            columnNumber: 825
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-2xl font-black text-gray-400",
                                                            children: r.opponentScore
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/game/NFTShop.tsx",
                                                            lineNumber: 211,
                                                            columnNumber: 865
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/game/NFTShop.tsx",
                                                    lineNumber: 211,
                                                    columnNumber: 713
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-4 text-xs text-gray-400",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                "PTS: ",
                                                                r.playerPoints
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/game/NFTShop.tsx",
                                                            lineNumber: 211,
                                                            columnNumber: 997
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                "STL: ",
                                                                r.steals
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/game/NFTShop.tsx",
                                                            lineNumber: 211,
                                                            columnNumber: 1031
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-yellow-400",
                                                            children: [
                                                                "+",
                                                                r.rtualEarned,
                                                                " RITUAL"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/game/NFTShop.tsx",
                                                            lineNumber: 211,
                                                            columnNumber: 1059
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/game/NFTShop.tsx",
                                                    lineNumber: 211,
                                                    columnNumber: 947
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/game/NFTShop.tsx",
                                            lineNumber: 211,
                                            columnNumber: 672
                                        }, this)
                                    ]
                                }, r.id, true, {
                                    fileName: "[project]/src/components/game/NFTShop.tsx",
                                    lineNumber: 211,
                                    columnNumber: 66
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/game/NFTShop.tsx",
                            lineNumber: 211,
                            columnNumber: 16
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/game/NFTShop.tsx",
                    lineNumber: 207,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/game/NFTShop.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/game/NFTShop.tsx",
        lineNumber: 118,
        columnNumber: 5
    }, this);
}
_s(NFTShop, "EpkHwDitDroQ1OA8rgS4fbXNoXs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"]
    ];
});
_c2 = NFTShop;
/* ══════════════  WALLET MODAL  ══════════════ */ function WalletConnectModal({ onClose }) {
    _s1();
    const { setWalletAddress, setWalletConnected, setRitualBalance, lang } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])();
    const [connecting, setConnecting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errorMsg, setErrorMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const connectWallet = async (walletType)=>{
        if (walletType === 'MetaMask' && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ritualWallet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasMetaMask"])()) {
            setErrorMsg(lang === 'zh' ? '请先安装 MetaMask 浏览器插件' : 'Please install MetaMask first');
            return;
        }
        setConnecting(true);
        setErrorMsg('');
        try {
            const { address, chainId } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ritualWallet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["connectRitualWallet"])();
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ritualWallet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRitualChain"])(chainId)) {
                setErrorMsg(lang === 'zh' ? '请切换到 Ritual 网络' : 'Please switch to Ritual network');
                setConnecting(false);
                return;
            }
            setWalletAddress(address);
            setWalletConnected(true);
            try {
                const bal = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ritualWallet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRitualBalance"])(address);
                setRitualBalance(parseFloat(bal));
            } catch  {
                setRitualBalance(0);
            }
            setConnecting(false);
            onClose();
        } catch (err) {
            const e = err;
            setErrorMsg(e.message || (lang === 'zh' ? '连接失败' : 'Connection failed'));
            setConnecting(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-gray-900 rounded-2xl p-6 max-w-sm w-full mx-4 border border-cyan-500/30 shadow-2xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-lg font-bold text-white mb-1",
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('wallet.connectTitle', lang)
            }, void 0, false, {
                fileName: "[project]/src/components/game/NFTShop.tsx",
                lineNumber: 235,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-gray-400 mb-5",
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('wallet.connectDesc', lang)
            }, void 0, false, {
                fileName: "[project]/src/components/game/NFTShop.tsx",
                lineNumber: 236,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: [
                    {
                        n: 'MetaMask',
                        i: '\uD83E\uDD8A',
                        d: lang === 'zh' ? '推荐' : 'Recommended'
                    },
                    {
                        n: 'WalletConnect',
                        i: '\uD83D\uDD17',
                        d: 'Mobile'
                    },
                    {
                        n: 'Coinbase Wallet',
                        i: '\uD83D\uDC8E',
                        d: ''
                    },
                    {
                        n: 'Ritual Wallet',
                        i: '\uD83D\uDD2E',
                        d: 'Native'
                    }
                ].map((w)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>connectWallet(w.n),
                        disabled: connecting,
                        className: "w-full flex items-center gap-3 p-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition-all border border-gray-600/50 disabled:opacity-50",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-lg",
                                children: w.i
                            }, void 0, false, {
                                fileName: "[project]/src/components/game/NFTShop.tsx",
                                lineNumber: 245,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-left",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-bold text-white block",
                                        children: w.n
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/game/NFTShop.tsx",
                                        lineNumber: 246,
                                        columnNumber: 40
                                    }, this),
                                    w.d && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-gray-500",
                                        children: w.d
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/game/NFTShop.tsx",
                                        lineNumber: 246,
                                        columnNumber: 113
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/game/NFTShop.tsx",
                                lineNumber: 246,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] text-cyan-400 ml-auto font-bold",
                                children: "Ritual"
                            }, void 0, false, {
                                fileName: "[project]/src/components/game/NFTShop.tsx",
                                lineNumber: 247,
                                columnNumber: 13
                            }, this)
                        ]
                    }, w.n, true, {
                        fileName: "[project]/src/components/game/NFTShop.tsx",
                        lineNumber: 244,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/game/NFTShop.tsx",
                lineNumber: 237,
                columnNumber: 7
            }, this),
            errorMsg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-red-400 text-xs mt-3 text-center",
                children: errorMsg
            }, void 0, false, {
                fileName: "[project]/src/components/game/NFTShop.tsx",
                lineNumber: 250,
                columnNumber: 20
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onClose,
                className: "w-full mt-4 py-2 text-gray-400 text-sm hover:text-white transition-colors",
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])('wallet.cancel', lang)
            }, void 0, false, {
                fileName: "[project]/src/components/game/NFTShop.tsx",
                lineNumber: 251,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/game/NFTShop.tsx",
        lineNumber: 234,
        columnNumber: 5
    }, this);
}
_s1(WalletConnectModal, "HP7hfCI9bd1juPoFcVoCE+VkUAY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"]
    ];
});
_c3 = WalletConnectModal;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "ShapeIcon");
__turbopack_context__.k.register(_c1, "StatBlock");
__turbopack_context__.k.register(_c2, "NFTShop");
__turbopack_context__.k.register(_c3, "WalletConnectModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/gameStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2f$BasketballGame$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/game/BasketballGame.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2f$StartScreen$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/game/StartScreen.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2f$NFTShop$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/game/NFTShop.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function Home() {
    _s();
    const { phase, setPhase, initTournament, setTwitterId, setAvatarUrl, setPlayerName, avatarUrl } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"])();
    const handleEnterGame = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Home.useCallback[handleEnterGame]": ()=>{
            initTournament();
        }
    }["Home.useCallback[handleEnterGame]"], [
        initTournament
    ]);
    const handleOpenShop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Home.useCallback[handleOpenShop]": ()=>{
            setPhase('nftShop');
        }
    }["Home.useCallback[handleOpenShop]"], [
        setPhase
    ]);
    const handleBackToMenu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Home.useCallback[handleBackToMenu]": ()=>{
            setPhase('menu');
        }
    }["Home.useCallback[handleBackToMenu]"], [
        setPhase
    ]);
    // Prevent scroll on game pages
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            if (phase === 'playing' || phase === 'gameOver' || phase === 'tournamentWin') {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
            return ({
                "Home.useEffect": ()=>{
                    document.body.style.overflow = '';
                }
            })["Home.useEffect"];
        }
    }["Home.useEffect"], [
        phase
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "w-full h-screen overflow-hidden bg-black",
        children: [
            phase === 'menu' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2f$StartScreen$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                onEnterGame: handleEnterGame,
                onOpenShop: handleOpenShop
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 37,
                columnNumber: 9
            }, this),
            (phase === 'playing' || phase === 'paused' || phase === 'scored' || phase === 'gameOver' || phase === 'tournamentWin') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2f$BasketballGame$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 41,
                columnNumber: 9
            }, this),
            phase === 'nftShop' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2f$NFTShop$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                onBack: handleBackToMenu
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 45,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
_s(Home, "hq6vjOt9Fp6IgAKHDGVT73rNDsw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$gameStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameStore"]
    ];
});
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_209ea002._.js.map