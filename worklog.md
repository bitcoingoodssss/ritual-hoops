---
Task ID: 1
Agent: Main Agent
Task: Build 3D Basketball Game "Ritual Hoops" on Ritual Chain

Work Log:
- Initialized Next.js 16 project with Three.js, cannon-es, ethers.js, zustand, framer-motion
- Built comprehensive Zustand game store with tournament system, NFT items, player stats
- Created full 3D basketball engine with Three.js (court, hoops, players, ball physics, AI)
- Implemented Twitter avatar integration via API route (unavatar.io fallback to DiceBear)
- Built StartScreen with animated UI, Twitter ID input, wallet connect modal
- Built 3D game scene: basketball court with lines, hoops with nets, player meshes, ball with seams
- Added sky dome with stars, arena stands with crowd particles, dynamic colored lighting
- Implemented game mechanics: WASD movement, Space jump, E shoot (hold for power), F dunk, Q steal, Shift sprint
- Built AI opponent system with offensive/defensive behavior, shooting, dunking, stealing
- Created 5-round tournament system with random opponents (CryptoKing, BlockShot, Web3Dunk, etc.)
- Built NFT Shop with 12 items (jerseys, shoes, headbands, accessories) across 4 rarities
- Implemented wallet connection modal (MetaMask, WalletConnect, Coinbase, Ritual Wallet)
- Built game HUD: scoreboard, shot clock, game timer, ball indicator, action popups, combo counter
- Added game over overlay with tournament progress, victory/defeat screens
- Added tournament champion celebration with rewards display
- Integrated user's 391.jpg as home page background with dark overlay
- Integrated user's 380.jpg as game scene sky texture
- Fixed React lint errors (setState in effect, memoization dependencies)
- Verified all features via agent browser: home screen, wallet connect, NFT shop, game loading

Stage Summary:
- Complete 3D basketball game running on Next.js 16 with Three.js
- Features: Twitter avatar → character face, 5-round tournament, AI opponents, shooting/dunking/stealing
- NFT system: 12 items, 4 rarities, equip system with stat bonuses
- Wallet integration: 4 wallet providers, simulated Ritual Chain minting
- Both user images integrated as backgrounds
- All lint checks passing, no runtime errors