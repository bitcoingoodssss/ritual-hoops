import * as THREE from 'three';

// ============== TYPES ==============
export interface PlayerState {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  rotation: number;
  isJumping: boolean;
  jumpVelocity: number;
  hasBall: boolean;
  isShooting: boolean;
  shootPower: number;
  shootAngle: number;
  isDunking: boolean;
  isStealing: boolean;
  animFrame: number;
  animTimer: number;
}

export interface BallState {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  rotation: THREE.Euler;
  isAirborne: boolean;
  owner: 'player' | 'opponent' | null;
  trail: THREE.Vector3[];
}

export interface HoopState {
  position: THREE.Vector3;
  rimRadius: number;
}

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

// ============== GAME ENGINE ==============
export class GameEngine {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  clock: THREE.Clock;
  
  // Objects
  court!: THREE.Group;
  playerMesh!: THREE.Group;
  opponentMesh!: THREE.Group;
  ballMesh!: THREE.Mesh;
  playerHoop!: THREE.Group;
  opponentHoop!: THREE.Group;
  
  // Lights
  ambientLight!: THREE.AmbientLight;
  spotLights: THREE.SpotLight[] = [];
  
  // State
  player: PlayerState;
  opponent: PlayerState;
  ball: BallState;
  hoopLeft: HoopState;
  hoopRight: HoopState;
  
  // Input
  keys: Set<string> = new Set();
  isShootingHold: boolean = false;
  shootPower: number = 0;
  
  // Game Logic
  isRunning: boolean = false;
  playerScore: number = 0;
  opponentScore: number = 0;
  hasBall: 'player' | 'opponent' = 'player';
  scoreCooldown: number = 0;
  stealCooldown: number = 0;
  opponentThinkTimer: number = 0;
  opponentTarget: THREE.Vector3 = new THREE.Vector3();
  opponentHasShot: boolean = false;
  opponentShotTimer: number = 0;
  
  // Particles
  particleSystem: THREE.Points | null = null;
  particles: { position: THREE.Vector3; velocity: THREE.Vector3; life: number; maxLife: number; color: THREE.Color }[] = [];
  
  // Callbacks
  onScore: ((scorer: 'player' | 'opponent', points: number, type: 'normal' | 'three' | 'dunk') => void) | null = null;
  onSteal: (() => void) | null = null;
  onAction: ((action: string) => void) | null = null;
  onGameOver: ((winner: 'player' | 'opponent') => void) | null = null;
  onShootPower: ((power: number) => void) | null = null;
  onContextHint: ((hint: string) => void) | null = null;
  
  // NFT bonus stats
  playerBonus: { speed: number; shoot: number; defense: number; dunk: number } = { speed: 0, shoot: 0, defense: 0, dunk: 0 };
  
  // Avatar textures
  playerAvatarTexture: THREE.Texture | null = null;
  opponentAvatarTexture: THREE.Texture | null = null;
  
  // Arena
  arenaFloor!: THREE.Mesh;
  crowdNoise: number = 0;
  
  // Dribble animation
  dribblePhase: number = 0;
  playerDribbleOffset: number = 0;
  opponentDribbleOffset: number = 0;
  
  // Trail
  ballTrailLine: THREE.Line | null = null;
  ballTrailGeometry: THREE.BufferGeometry | null = null;
  ballTrailPositions: Float32Array = new Float32Array(60 * 3);
  ballTrailIndex: number = 0;
  
  // Court floor reflection
  floorMaterial!: THREE.MeshStandardMaterial;

  constructor(canvas: HTMLCanvasElement, width: number, height: number) {
    // Scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x0a0a1a, 0.008);
    
    // Camera
    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 200);
    this.camera.position.set(0, 12, 18);
    this.camera.lookAt(0, 0, 0);
    
    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    
    this.clock = new THREE.Clock();
    
    // Initialize states
    this.player = this.createPlayerState(new THREE.Vector3(0, 0, 8));
    this.opponent = this.createPlayerState(new THREE.Vector3(0, 0, -8));
    this.ball = this.createBallState();
    this.hoopLeft = { position: new THREE.Vector3(0, HOOP_HEIGHT, -COURT_LENGTH / 2 + HOOP_OFFSET), rimRadius: 0.45 };
    this.hoopRight = { position: new THREE.Vector3(0, HOOP_HEIGHT, COURT_LENGTH / 2 - HOOP_OFFSET), rimRadius: 0.45 };
    
    this.buildScene();
    this.setupInput();
  }

  private createPlayerState(pos: THREE.Vector3): PlayerState {
    return {
      position: pos.clone(),
      velocity: new THREE.Vector3(),
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
      animTimer: 0,
    };
  }

  private createBallState(): BallState {
    return {
      position: new THREE.Vector3(0, 1, 5),
      velocity: new THREE.Vector3(),
      rotation: new THREE.Euler(),
      isAirborne: false,
      owner: 'player',
      trail: [],
    };
  }

  // ============== SCENE BUILDING ==============
  private buildScene() {
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
  }


  private buildSky() {
    const skyGeo = new THREE.SphereGeometry(100, 32, 32);
    const texture = new THREE.TextureLoader().load('/game-bg.jpg', undefined, undefined, () => {
      // Fallback to solid color if image fails to load
    });
    texture.colorSpace = THREE.SRGBColorSpace;
    const skyMat = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide,
    });
    this.scene.add(new THREE.Mesh(skyGeo, skyMat));
  }

  private buildArena() {
    // Arena floor
    const arenaGeo = new THREE.PlaneGeometry(80, 80);
    const arenaMat = new THREE.MeshStandardMaterial({
      color: 0x080810,
      roughness: 0.85,
      metalness: 0.2,
    });
    const arenaFloor = new THREE.Mesh(arenaGeo, arenaMat);
    arenaFloor.rotation.x = -Math.PI / 2;
    arenaFloor.position.y = -0.02;
    arenaFloor.receiveShadow = true;
    this.scene.add(arenaFloor);
    
    // Neon strip along court edges
    const stripGeo = new THREE.BoxGeometry(COURT_WIDTH + 2, 0.15, COURT_LENGTH + 2);
    const stripMat = new THREE.MeshStandardMaterial({
      color: 0xff00ff,
      emissive: 0xff00ff,
      emissiveIntensity: 0.5,
      roughness: 0.1,
      transparent: true,
      opacity: 0.4,
    });
    const neonStrip = new THREE.Mesh(stripGeo, stripMat);
    neonStrip.rotation.x = -Math.PI / 2;
    neonStrip.position.y = 0.02;
    this.scene.add(neonStrip);
    
    this.floorMaterial = arenaMat;
    
    // Arena walls / stands
    this.buildStands();
  }

  private buildStands() {
    const standMat = new THREE.MeshStandardMaterial({ color: 0x0a0a1a, roughness: 0.9, metalness: 0.1 });
    
    // Simple back stand
    const backStand = new THREE.Mesh(new THREE.BoxGeometry(60, 6, 3), standMat);
    backStand.position.set(0, 3, -26);
    this.scene.add(backStand);
    
    // Front stand
    const frontStand = new THREE.Mesh(new THREE.BoxGeometry(60, 6, 3), standMat);
    frontStand.position.set(0, 3, 26);
    this.scene.add(frontStand);
    
    // Side stands
    const leftStand = new THREE.Mesh(new THREE.BoxGeometry(3, 8, 56), standMat);
    leftStand.position.set(-16, 3, 0);
    this.scene.add(leftStand);
    
    const rightStand = new THREE.Mesh(new THREE.BoxGeometry(3, 8, 56), standMat);
    rightStand.position.set(16, 3, 0);
    this.scene.add(rightStand);
    
    // Neon strip lights along court edges (punk feel)
    const neonColors = [0xff00ff, 0x00ffff, 0xff00ff, 0xf72585];
    const edgePositions = [
      [-14, 0.1, -23.5], [14, 0.1, -23.5],
      [-14, 0.1, 23.5], [14, 0.1, 23.5],
      [14, 0.1, 0], [-14, 0.1, 0],
      [-14, 0.1, -23.5], [14, 0.1, 23.5],
      [14, 0.1, 0], [-14, 0.1, 0],
    ];
    edgePositions.forEach((pos, i) => {
      const light = new THREE.PointLight(neonColors[i % neonColors.length], 2, 15);
      light.position.set(...pos);
      this.scene.add(light);
    });
  }

  private buildCourt() {
    this.court = new THREE.Group();
    
    // Court floor - polished wood look
    const courtGeo = new THREE.PlaneGeometry(COURT_WIDTH, COURT_LENGTH);
    const courtMat = new THREE.MeshStandardMaterial({
      color: 0xb85c3a,
      roughness: 0.15,
      metalness: 0.3,
    });
    const courtFloor = new THREE.Mesh(courtGeo, courtMat);
    courtFloor.rotation.x = -Math.PI / 2;
    courtFloor.receiveShadow = true;
    this.court.add(courtFloor);

    // === RITUAL TEXT ON COURT ===
    this.addCourtText('RITUAL', 0, 0.015, 0, 8, 1.2, '#ffffff', 0.12);
    this.addCourtText('HOOPS', 0, 0.015, 5, 8, 0.8, '#ffffff', 0.08);

    // === PLAYER SIDE INDICATORS ===
    // Player's half (positive Z) - orange tint
    const playerSideGeo = new THREE.PlaneGeometry(COURT_WIDTH, COURT_LENGTH / 2);
    const playerSideMat = new THREE.MeshBasicMaterial({
      color: 0xff8c00,
      transparent: true,
      opacity: 0.07,
      side: THREE.DoubleSide,
    });
    const playerSidePlane = new THREE.Mesh(playerSideGeo, playerSideMat);
    playerSidePlane.rotation.x = -Math.PI / 2;
    playerSidePlane.position.set(0, 0.005, COURT_LENGTH / 4);
    this.court.add(playerSidePlane);

    // Opponent's half (negative Z) - cyan tint
    const oppSideGeo = new THREE.PlaneGeometry(COURT_WIDTH, COURT_LENGTH / 2);
    const oppSideMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.07,
      side: THREE.DoubleSide,
    });
    const oppSidePlane = new THREE.Mesh(oppSideGeo, oppSideMat);
    oppSidePlane.rotation.x = -Math.PI / 2;
    oppSidePlane.position.set(0, 0.005, -COURT_LENGTH / 4);
    this.court.add(oppSidePlane);

    // Direction arrow cone pointing toward player's hoop (+Z)
    const arrowGeo = new THREE.ConeGeometry(0.3, 0.8, 8);
    const arrowMat = new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      emissive: 0x00e5ff,
      emissiveIntensity: 0.5,
      roughness: 0.3,
      metalness: 0.4,
    });
    const arrow = new THREE.Mesh(arrowGeo, arrowMat);
    arrow.rotation.x = -Math.PI / 2;
    arrow.position.set(0, 0.5, 5);
    arrow.name = 'directionArrow';
    this.court.add(arrow);

    // Court lines
    const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
    
    // Boundary
    this.addCourtLine(this.court, [
      [-COURT_WIDTH / 2, 0.01, -COURT_LENGTH / 2],
      [COURT_WIDTH / 2, 0.01, -COURT_LENGTH / 2],
      [COURT_WIDTH / 2, 0.01, COURT_LENGTH / 2],
      [-COURT_WIDTH / 2, 0.01, COURT_LENGTH / 2],
      [-COURT_WIDTH / 2, 0.01, -COURT_LENGTH / 2],
    ], lineMat);
    
    // Center line
    this.addCourtLine(this.court, [
      [-COURT_WIDTH / 2, 0.01, 0],
      [COURT_WIDTH / 2, 0.01, 0],
    ], lineMat);
    
    // Center circle
    this.addCourtCircle(this.court, 0, 0.01, 0, 1.8, 32, lineMat);
    
    // Three point lines (arcs)
    this.addThreePointLine(this.court, COURT_LENGTH / 2, 1);
    this.addThreePointLine(this.court, -COURT_LENGTH / 2, -1);
    
    // Free throw lanes
    this.addCourtLine(this.court, [
      [-2.45, 0.01, COURT_LENGTH / 2 - 5.8],
      [-2.45, 0.01, COURT_LENGTH / 2],
    ], lineMat);
    this.addCourtLine(this.court, [
      [2.45, 0.01, COURT_LENGTH / 2 - 5.8],
      [2.45, 0.01, COURT_LENGTH / 2],
    ], lineMat);
    this.addCourtLine(this.court, [
      [-2.45, 0.01, COURT_LENGTH / 2 - 5.8],
      [2.45, 0.01, COURT_LENGTH / 2 - 5.8],
    ], lineMat);
    
    this.addCourtLine(this.court, [
      [-2.45, 0.01, -COURT_LENGTH / 2 + 5.8],
      [-2.45, 0.01, -COURT_LENGTH / 2],
    ], lineMat);
    this.addCourtLine(this.court, [
      [2.45, 0.01, -COURT_LENGTH / 2 + 5.8],
      [2.45, 0.01, -COURT_LENGTH / 2],
    ], lineMat);
    this.addCourtLine(this.court, [
      [-2.45, 0.01, -COURT_LENGTH / 2 + 5.8],
      [2.45, 0.01, -COURT_LENGTH / 2 + 5.8],
    ], lineMat);
    
    // Free throw circles
    this.addCourtCircle(this.court, 0, 0.01, COURT_LENGTH / 2 - 5.8, 1.8, 32, lineMat);
    this.addCourtCircle(this.court, 0, 0.01, -COURT_LENGTH / 2 + 5.8, 1.8, 32, lineMat);
    
    this.scene.add(this.court);
    
    // "YOUR HOOP" neon arrow indicator
    const arrowGroup = new THREE.Group();
    
    // Glowing arrow pointing to player's hoop (+Z direction)
    const neonConeGeo = new THREE.ConeGeometry(0.3, 1.5, 8);
    const neonConeMat = new THREE.MeshStandardMaterial({
      color: 0x00ffdd,
      emissive: 0x00ffdd,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.8,
    });
    const neonCone = new THREE.Mesh(neonConeGeo, neonConeMat);
    neonCone.position.set(0, 0.6, 8);
    neonCone.rotation.x = Math.PI; // Points +Z
    arrowGroup.add(neonCone);
    
    // Text label "YOUR HOOP" using canvas texture
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#00ffdd';
    ctx.font = 'bold 80px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('YOUR HOOP', 256, 80);
    
    const labelTexture = new THREE.CanvasTexture(canvas);
    const labelGeo = new THREE.PlaneGeometry(4, 1);
    const labelMat = new THREE.MeshBasicMaterial({
      map: labelTexture,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const label = new THREE.Mesh(labelGeo, labelMat);
    label.position.set(0, 0.5, 12);
    label.rotation.x = -Math.PI / 2;
    arrowGroup.add(label);
    
    // "OPPONENT" label on opponent side
    const canvas2 = document.createElement('canvas');
    canvas2.width = 512;
    canvas2.height = 128;
    const ctx2 = canvas2.getContext('2d')!;
    ctx2.fillStyle = '#ff0066';
    ctx2.font = 'bold 80px Arial, sans-serif';
    ctx2.textAlign = 'center';
    ctx2.fillText('OPPONENT', 256, 80);
    
    const labelTexture2 = new THREE.CanvasTexture(canvas2);
    const labelGeo2 = new THREE.PlaneGeometry(4, 1);
    const labelMat2 = new THREE.MeshBasicMaterial({
      map: labelTexture2,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const label2 = new THREE.Mesh(labelGeo2, labelMat2);
    label2.position.set(0, 0.5, -12);
    label2.rotation.x = -Math.PI / 2;
    arrowGroup.add(label2);
    
    this.scene.add(arrowGroup);
  }

  private addCourtLine(parent: THREE.Group, points: number[][], material: THREE.LineBasicMaterial) {
    const geo = new THREE.BufferGeometry();
    const posArray: number[] = [];
    points.forEach(p => posArray.push(p[0], p[1], p[2]));
    geo.setAttribute('position', new THREE.Float32BufferAttribute(posArray, 3));
    parent.add(new THREE.Line(geo, material));
  }

  private addCourtCircle(parent: THREE.Group, cx: number, cy: number, cz: number, radius: number, segments: number, material: THREE.LineBasicMaterial) {
    const points: number[] = [];
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      points.push(cx + Math.cos(angle) * radius, cy, cz + Math.sin(angle) * radius);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    parent.add(new THREE.Line(geo, material));
  }

  private addThreePointLine(parent: THREE.Group, baseZ: number, direction: number) {
    const points: number[] = [];
    const segments = 40;
    const sideOffset = 1.575;
    
    // Start from sideline
    points.push(-COURT_WIDTH / 2, 0.01, baseZ - direction * sideOffset);
    
    // Arc
    const centerZ = baseZ - direction * HOOP_OFFSET;
    for (let i = 0; i <= segments; i++) {
      const angle = (Math.PI / 2) + (i / segments) * Math.PI;
      const x = Math.cos(angle) * THREE_POINT_LINE;
      const z = centerZ + Math.sin(angle) * THREE_POINT_LINE * direction;
      points.push(x, 0.01, z);
    }
    
    // End at sideline
    points.push(COURT_WIDTH / 2, 0.01, baseZ - direction * sideOffset);
    
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    parent.add(new THREE.Line(geo, new THREE.LineBasicMaterial({ color: 0xffffff })));
  }

  private addCourtText(text: string, cx: number, cy: number, cz: number, width: number, height: number, color: string, opacity: number) {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;
    ctx.globalAlpha = opacity;
    ctx.font = 'bold 180px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 512, 128);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    const geo = new THREE.PlaneGeometry(width, height);
    const mat = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(cx, cy, cz);
    this.court.add(mesh);
  }

  private updateContextHints() {
    if (!this.onContextHint) return;

    const hoopPos = this.hoopLeft.position;
    const distToHoop = Math.sqrt(
      Math.pow(this.player.position.x - hoopPos.x, 2) +
      Math.pow(this.player.position.z - hoopPos.z, 2)
    );
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

  private buildHoop(pos: THREE.Vector3): THREE.Group {
    const hoop = new THREE.Group();

    // Backboard
    const backboardGeo = new THREE.BoxGeometry(1.8, 1.2, 0.05);
    const backboardMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.7,
      roughness: 0.1,
      metalness: 0.3,
    });
    const backboard = new THREE.Mesh(backboardGeo, backboardMat);
    backboard.position.set(0, 0.6, pos.z > 0 ? 0.8 : -0.8);
    hoop.add(backboard);
    
    // Backboard frame
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.8, roughness: 0.2 });
    const frameTop = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.05, 0.08), frameMat);
    frameTop.position.copy(backboard.position);
    frameTop.position.y += 0.625;
    hoop.add(frameTop);
    
    // Pole
    const poleGeo = new THREE.CylinderGeometry(0.08, 0.08, HOOP_HEIGHT + 1, 8);
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.8, roughness: 0.3 });
    const pole = new THREE.Mesh(poleGeo, poleMat);
    pole.position.set(0, (HOOP_HEIGHT + 1) / 2 - 0.5, pos.z > 0 ? 1.2 : -1.2);
    pole.castShadow = true;
    hoop.add(pole);
    
    // Rim
    const rimGeo = new THREE.TorusGeometry(0.45, 0.02, 8, 24);
    const rimMat = new THREE.MeshStandardMaterial({ color: 0xff4444, metalness: 0.9, roughness: 0.1 });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.position.set(0, HOOP_HEIGHT, pos.z > 0 ? 0 : 0);
    rim.rotation.x = Math.PI / 2;
    rim.castShadow = true;
    hoop.add(rim);
    
    // Net (simplified with lines)
    const netMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 });
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const x = Math.cos(angle) * 0.45;
      const z = Math.sin(angle) * 0.45;
      const netGeo = new THREE.BufferGeometry();
      netGeo.setAttribute('position', new THREE.Float32BufferAttribute([
        x, HOOP_HEIGHT, z,
        Math.cos(angle) * 0.15, HOOP_HEIGHT - 0.5, Math.sin(angle) * 0.15,
      ], 3));
      hoop.add(new THREE.Line(netGeo, netMat));
    }
    
    // Horizontal net rings
    for (let j = 1; j <= 3; j++) {
      const ringPoints: number[] = [];
      const shrink = j / 4;
      for (let i = 0; i <= 24; i++) {
        const angle = (i / 24) * Math.PI * 2;
        ringPoints.push(
          Math.cos(angle) * 0.45 * (1 - shrink),
          HOOP_HEIGHT - j * 0.12,
          Math.sin(angle) * 0.45 * (1 - shrink)
        );
      }
      const ringGeo = new THREE.BufferGeometry();
      ringGeo.setAttribute('position', new THREE.Float32BufferAttribute(ringPoints, 3));
      hoop.add(new THREE.Line(ringGeo, netMat));
    }
    
    hoop.position.set(pos.x, 0, pos.z);
    return hoop;
  }

  private buildPlayerMesh(color: number): THREE.Group {
    const player = new THREE.Group();

    const skinColor = 0xd4a574;
    const shortsColor = 0x1a1a2e;
    const shoeColor = color === 0xff6b35 ? 0x00e5ff : 0xff1744;

    // === HEAD ===
    const headGeo = new THREE.SphereGeometry(0.13, 16, 12);
    const headMat = new THREE.MeshStandardMaterial({ color: skinColor, roughness: 0.7, metalness: 0.05 });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = 1.75;
    head.castShadow = true;
    head.name = 'head';
    player.add(head);

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.06, 0.07, 0.08, 8);
    const neck = new THREE.Mesh(neckGeo, headMat);
    neck.position.y = 1.62;
    player.add(neck);

    // Face plane (for avatar)
    const faceGeo = new THREE.PlaneGeometry(0.5, 0.5);
    const faceMat = new THREE.MeshBasicMaterial({ color: 0x888888, transparent: true, opacity: 0, side: THREE.DoubleSide });
    const face = new THREE.Mesh(faceGeo, faceMat);
    face.position.set(0, 1.78, 0.14);
    face.name = 'face';
    player.add(face);

    // === TORSO (jersey) ===
    const torsoGeo = new THREE.CylinderGeometry(0.22, 0.18, 0.55, 10);
    const torsoMat = new THREE.MeshStandardMaterial({ color, roughness: 0.55, metalness: 0.15 });
    const torso = new THREE.Mesh(torsoGeo, torsoMat);
    torso.position.y = 1.3;
    torso.castShadow = true;
    torso.name = 'body';
    player.add(torso);

    // === SHORTS ===
    const shortsGeo = new THREE.CylinderGeometry(0.18, 0.20, 0.22, 10);
    const shortsMat = new THREE.MeshStandardMaterial({ color: shortsColor, roughness: 0.7, metalness: 0.05 });
    const shorts = new THREE.Mesh(shortsGeo, shortsMat);
    shorts.position.y = 0.93;
    shorts.castShadow = true;
    player.add(shorts);

    // === ARMS (upper + lower + hands) ===
    const upperArmLen = 0.30;
    const lowerArmLen = 0.28;
    const handRad = 0.055;
    const armSeg = 8;

    // Shoulder-to-upper-arm pivot
    function createArm(side: number): THREE.Group {
      const armGroup = new THREE.Group();
      armGroup.name = side < 0 ? 'leftArm' : 'rightArm';

      // Upper arm (capsule-like: cylinder + 2 hemispheres)
      const upperGeo = new THREE.CylinderGeometry(0.045, 0.042, upperArmLen, armSeg);
      const upperMat = new THREE.MeshStandardMaterial({ color, roughness: 0.55, metalness: 0.1 });
      const upper = new THREE.Mesh(upperGeo, upperMat);
      upper.position.y = -upperArmLen / 2;
      upper.castShadow = true;
      armGroup.add(upper);

      // Elbow sphere
      const elbowGeo = new THREE.SphereGeometry(0.048, 8, 6);
      const elbow = new THREE.Mesh(elbowGeo, headMat);
      elbow.position.y = -upperArmLen;
      armGroup.add(elbow);

      // Lower arm (skin)
      const lowerGeo = new THREE.CylinderGeometry(0.04, 0.038, lowerArmLen, armSeg);
      const lower = new THREE.Mesh(lowerGeo, headMat);
      lower.position.y = -upperArmLen - lowerArmLen / 2;
      lower.castShadow = true;
      armGroup.add(lower);

      // Wrist sphere
      const wristGeo = new THREE.SphereGeometry(0.04, 8, 6);
      const wrist = new THREE.Mesh(wristGeo, headMat);
      wrist.position.y = -upperArmLen - lowerArmLen;
      armGroup.add(wrist);

      // Hand
      const handGeo = new THREE.SphereGeometry(handRad, 8, 6);
      const hand = new THREE.Mesh(handGeo, headMat);
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

    function createLeg(side: number): THREE.Group {
      const legGroup = new THREE.Group();
      legGroup.name = side < 0 ? 'leftLeg' : 'rightLeg';

      // Upper leg (shorts-colored)
      const upperGeo = new THREE.CylinderGeometry(0.085, 0.075, upperLegLen, armSeg);
      const upper = new THREE.Mesh(upperGeo, shortsMat);
      upper.position.y = -upperLegLen / 2;
      upper.castShadow = true;
      legGroup.add(upper);

      // Knee sphere
      const kneeGeo = new THREE.SphereGeometry(0.065, 8, 6);
      const knee = new THREE.Mesh(kneeGeo, headMat);
      knee.position.y = -upperLegLen;
      legGroup.add(knee);

      // Lower leg (skin)
      const lowerGeo = new THREE.CylinderGeometry(0.065, 0.058, lowerLegLen, armSeg);
      const lower = new THREE.Mesh(lowerGeo, headMat);
      lower.position.y = -upperLegLen - lowerLegLen / 2;
      lower.castShadow = true;
      legGroup.add(lower);

      // Ankle sphere
      const ankleGeo = new THREE.SphereGeometry(0.05, 8, 6);
      const ankle = new THREE.Mesh(ankleGeo, headMat);
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
    const shoeMat = new THREE.MeshStandardMaterial({ color: shoeColor, roughness: 0.3, metalness: 0.4 });

    function createShoe(side: number): THREE.Group {
      const shoeGroup = new THREE.Group();
      shoeGroup.name = side < 0 ? 'leftShoe' : 'rightShoe';

      // Sole
      const soleGeo = new THREE.BoxGeometry(0.14, 0.06, 0.26);
      const soleMat = new THREE.MeshStandardMaterial({ color: 0xeeeeee, roughness: 0.5, metalness: 0.1 });
      const sole = new THREE.Mesh(soleGeo, soleMat);
      sole.position.y = 0.03;
      shoeGroup.add(sole);

      // Upper
      const upperGeo = new THREE.BoxGeometry(0.13, 0.10, 0.24);
      const upper = new THREE.Mesh(upperGeo, shoeMat);
      upper.position.y = 0.09;
      upper.castShadow = true;
      shoeGroup.add(upper);

      // Toe cap (hemisphere-like)
      const toeGeo = new THREE.SphereGeometry(0.065, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2);
      const toe = new THREE.Mesh(toeGeo, shoeMat);
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
    const numGeo = new THREE.PlaneGeometry(0.18, 0.22);
    const numMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85, side: THREE.DoubleSide });
    const num = new THREE.Mesh(numGeo, numMat);
    num.position.set(0, 1.35, 0.185);
    num.name = 'jerseyNum';
    player.add(num);

    // Jersey number on back
    const numBack = new THREE.Mesh(numGeo.clone(), numMat.clone());
    numBack.position.set(0, 1.35, -0.185);
    numBack.rotation.y = Math.PI;
    player.add(numBack);

    return player;
  }

  private buildBall(): THREE.Mesh {
    const ballGeo = new THREE.SphereGeometry(BALL_RADIUS, 16, 16);
    const ballMat = new THREE.MeshStandardMaterial({
      color: 0xff8c00,
      roughness: 0.6,
      metalness: 0.1,
      bumpScale: 0.005,
    });
    
    // Add ball lines
    const ball = new THREE.Mesh(ballGeo, ballMat);
    
    // Seam lines
    const seamMat = new THREE.LineBasicMaterial({ color: 0x333333 });
    const seamPoints1: number[] = [];
    for (let i = 0; i <= 32; i++) {
      const angle = (i / 32) * Math.PI * 2;
      seamPoints1.push(0, Math.cos(angle) * BALL_RADIUS, Math.sin(angle) * BALL_RADIUS);
    }
    const seamGeo1 = new THREE.BufferGeometry();
    seamGeo1.setAttribute('position', new THREE.Float32BufferAttribute(seamPoints1, 3));
    ball.add(new THREE.Line(seamGeo1, seamMat));
    
    return ball;
  }

  private buildLights() {
    // Ambient - very dim for moody atmosphere
    this.ambientLight = new THREE.AmbientLight(0x110022, 0.4);
    this.scene.add(this.ambientLight);
    
    // Main overhead spotlight (bright white)
    const mainLight = new THREE.SpotLight(0xffffff, 80, 50, Math.PI / 3.5, 0.6, 1);
    mainLight.position.set(0, 22, 0);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    this.scene.add(mainLight);
    this.spotLights.push(mainLight);
    
    // Punk-colored corner lights (pink, cyan, purple, green)
    const punkLights = [
      { color: 0xff0066, pos: [-12, 8, -12], target: [-4, 0, -8] },
      { color: 0x00ffdd, pos: [12, 8, -12], target: [4, 0, -8] },
      { color: 0xaa00ff, pos: [-12, 8, 12], target: [-4, 0, 8] },
      { color: 0x00ff66, pos: [12, 8, 12], target: [4, 0, 8] },
    ];
    
    punkLights.forEach(({ color, pos, target }) => {
      const light = new THREE.SpotLight(color, 40, 40, Math.PI / 3, 0.7, 1.5);
      light.position.set(...pos);
      light.target.position.set(...target);
      this.scene.add(light);
      this.spotLights.push(light);
    });
  }

  private buildParticleSystem() {
    const count = 200;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = -100;
      positions[i * 3 + 2] = 0;
      colors[i * 3] = 1;
      colors[i * 3 + 1] = 0.5;
      colors[i * 3 + 2] = 0;
      sizes[i] = 0.2;
    }
    
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const mat = new THREE.PointsMaterial({
      size: 0.3,
      vertexColors: true,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    
    this.particleSystem = new THREE.Points(geo, mat);
    this.scene.add(this.particleSystem);
  }

  private buildBallTrail() {
    this.ballTrailGeometry = new THREE.BufferGeometry();
    this.ballTrailGeometry.setAttribute('position', new THREE.BufferAttribute(this.ballTrailPositions, 3));
    const mat = new THREE.LineBasicMaterial({
      color: 0xff8c00,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    this.ballTrailLine = new THREE.Line(this.ballTrailGeometry, mat);
    this.scene.add(this.ballTrailLine);
  }

  // ============== AVATAR ==============
  setPlayerAvatar(url: string) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      this.playerAvatarTexture = texture;
      const face = this.playerMesh.getObjectByName('face') as THREE.Mesh;
      if (face) {
        const mat = face.material as THREE.MeshBasicMaterial;
        mat.map = texture;
        mat.transparent = true;
        mat.opacity = 1;
        mat.side = THREE.DoubleSide;
        mat.needsUpdate = true;
      }
    };
    img.onerror = () => {
      const face = this.playerMesh.getObjectByName('face') as THREE.Mesh;
      if (face) {
        const mat = face.material as THREE.MeshBasicMaterial;
        mat.color.set(0xff6b35);
        mat.opacity = 0.8;
      }
    };
    img.src = url;
  }

  setOpponentAvatar(url: string) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      this.opponentAvatarTexture = texture;
      const face = this.opponentMesh.getObjectByName('face') as THREE.Mesh;
      if (face) {
        const mat = face.material as THREE.MeshBasicMaterial;
        mat.map = texture;
        mat.transparent = true;
        mat.opacity = 1;
        mat.side = THREE.DoubleSide;
        mat.needsUpdate = true;
      }
    };
    img.onerror = () => {
      const face = this.opponentMesh.getObjectByName('face') as THREE.Mesh;
      if (face) {
        const mat = face.material as THREE.MeshBasicMaterial;
        mat.color.set(0x2ec4b6);
        mat.opacity = 0.8;
      }
    };
    img.src = url;
  }

  // ============== INPUT ==============
  private setupInput() {
    const onKeyDown = (e: KeyboardEvent) => {
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
    
    const onKeyUp = (e: KeyboardEvent) => {
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
    (this as unknown as Record<string, () => void>)._cleanupInput = () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }

  // ============== SHOOTING ==============
  private startPlayerShot() {
    this.player.isShooting = true;
    this.shootPower = SHOOT_POWER_MIN;
    this.isShootingHold = true;
    this.onAction?.('aiming');
  }

  private releasePlayerShot() {
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
    const distFromHoop = Math.sqrt(
      Math.pow(this.player.position.x - targetPos.x, 2) +
      Math.pow(this.player.position.z - targetPos.z, 2)
    );
    const isThreePointer = distFromHoop > THREE_POINT_LINE;
    
    // Launch ball
    const power = this.shootPower;
    this.ball.velocity.set(
      direction.x * power * 0.7,
      power * 0.8 + distance * 0.15,
      direction.z * power * 0.7
    );
    this.ball.position.copy(playerPos);
    this.ball.isAirborne = true;
    this.ball.owner = null;
    this.hasBall = 'none' as unknown as 'player' | 'opponent';
    
    this.onAction?.(isThreePointer ? 'three_point_shot' : 'shot');
  }

  private tryDunk() {
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
  private trySteal(by: 'player' | 'opponent') {
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
  private updateOpponentAI(dt: number) {
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
        this.opponentTarget.set(
          hoopPos.x + (Math.random() - 0.5) * 4,
          0,
          hoopPos.z - 5 + Math.random() * 2
        );
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
    const dir = new THREE.Vector3()
      .subVectors(this.opponentTarget, this.opponent.position)
      .normalize();
    
    const speed = MOVE_SPEED * 0.7;
    this.opponent.position.x += dir.x * speed * dt;
    this.opponent.position.z += dir.z * speed * dt;
    
    // Court bounds
    this.opponent.position.x = THREE.MathUtils.clamp(this.opponent.position.x, -COURT_WIDTH / 2 + 1, COURT_WIDTH / 2 - 1);
    this.opponent.position.z = THREE.MathUtils.clamp(this.opponent.position.z, -COURT_LENGTH / 2 + 1, COURT_LENGTH / 2 - 1);
    
    // Face movement direction
    if (dir.length() > 0.1) {
      this.opponent.rotation = Math.atan2(dir.x, dir.z);
    }
  }

  private opponentShoot() {
    if (this.hasBall !== 'opponent') return;
    
    const targetPos = this.hoopRight.position.clone();
    const oppPos = this.opponent.position.clone();
    oppPos.y += PLAYER_HEIGHT * 0.9;
    
    const direction = targetPos.clone().sub(oppPos).normalize();
    const distance = oppPos.distanceTo(targetPos);
    const power = 10 + Math.random() * 6;
    
    this.ball.velocity.set(
      direction.x * power * 0.7,
      power * 0.8 + distance * 0.15,
      direction.z * power * 0.7
    );
    this.ball.position.copy(oppPos);
    this.ball.isAirborne = true;
    this.ball.owner = null;
    this.hasBall = 'none' as unknown as 'player' | 'opponent';
    this.opponentAction = 'shooting';
    this.onAction?.('opponent_shot');
  }

  private opponentDunk() {
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
  private updatePhysics(dt: number) {
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
    this.player.position.x = THREE.MathUtils.clamp(this.player.position.x, -COURT_WIDTH / 2 + 1, COURT_WIDTH / 2 - 1);
    this.player.position.z = THREE.MathUtils.clamp(this.player.position.z, -COURT_LENGTH / 2 + 1, COURT_LENGTH / 2 - 1);
    
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
        this.ball.position.x = THREE.MathUtils.clamp(this.ball.position.x, -COURT_WIDTH / 2 + 1, COURT_WIDTH / 2 - 1);
      }
      if (Math.abs(this.ball.position.z) > COURT_LENGTH / 2 + 2) {
        this.ball.velocity.z *= -0.5;
        this.ball.position.z = THREE.MathUtils.clamp(this.ball.position.z, -COURT_LENGTH / 2 + 1, COURT_LENGTH / 2 - 1);
      }
    } else {
      // Ball follows owner
      if (this.ball.owner === 'player') {
        const dribbleY = 0.8 + Math.abs(Math.sin(this.dribblePhase * 2)) * 0.5;
        this.ball.position.set(
          this.player.position.x + Math.sin(this.player.rotation) * 0.5,
          dribbleY,
          this.player.position.z + Math.cos(this.player.rotation) * 0.5
        );
      } else if (this.ball.owner === 'opponent') {
        const oppDribble = 0.8 + Math.abs(Math.sin(this.clock.elapsedTime * 8)) * 0.5;
        this.ball.position.set(
          this.opponent.position.x + Math.sin(this.opponent.rotation) * 0.5,
          oppDribble,
          this.opponent.position.z + Math.cos(this.opponent.rotation) * 0.5
        );
      }
    }
    
    // Cooldowns
    if (this.stealCooldown > 0) this.stealCooldown -= dt;
    if (this.scoreCooldown > 0) this.scoreCooldown -= dt;
    
    // Player-Opponent collision
    const pDist = this.player.position.distanceTo(this.opponent.position);
    if (pDist < PLAYER_RADIUS * 2.2) {
      const pushDir = new THREE.Vector3()
        .subVectors(this.player.position, this.opponent.position)
        .normalize();
      const overlap = (PLAYER_RADIUS * 2.2 - pDist) / 2;
      this.player.position.add(pushDir.clone().multiplyScalar(overlap));
      this.opponent.position.sub(pushDir.clone().multiplyScalar(overlap));
    }
  }

  private checkHoopCollision() {
    // Check if ball passes through player's target hoop (opponent's hoop, hoopLeft)
    const hL = this.hoopLeft;
    const dx = this.ball.position.x - hL.position.x;
    const dz = this.ball.position.z - hL.position.z;
    const distXZ = Math.sqrt(dx * dx + dz * dz);
    
    if (distXZ < hL.rimRadius * 1.2 && 
        this.ball.position.y < hL.position.y + 0.5 &&
        this.ball.position.y > hL.position.y - 0.8 &&
        this.ball.velocity.y < 0.5) {
      // Score for player!
      const distFromHoop = Math.sqrt(
        Math.pow(this.player.position.x - hL.position.x, 2) +
        Math.pow(this.player.position.z - hL.position.z, 2)
      );
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
    
    if (distXZ2 < hR.rimRadius * 1.2 && 
        this.ball.position.y < hR.position.y + 0.5 &&
        this.ball.position.y > hR.position.y - 0.8 &&
        this.ball.velocity.y < 0.5) {
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

  private checkDunkScore(dunker: 'player' | 'opponent') {
    if (dunker === 'player') {
      const hoopPos = this.hoopLeft.position;
      const dist = Math.sqrt(
        Math.pow(this.player.position.x - hoopPos.x, 2) +
        Math.pow(this.player.position.z - hoopPos.z, 2)
      );
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
      const dist = Math.sqrt(
        Math.pow(this.opponent.position.x - hoopPos.x, 2) +
        Math.pow(this.opponent.position.z - hoopPos.z, 2)
      );
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
  private spawnParticles(position: THREE.Vector3, color: number, count: number) {
    if (!this.particleSystem) return;
    
    const positions = this.particleSystem.geometry.attributes.position as THREE.BufferAttribute;
    const colors = this.particleSystem.geometry.attributes.color as THREE.BufferAttribute;
    
    for (let i = 0; i < count && i < this.particles.length; i++) {
      this.particles[i] = {
        position: position.clone(),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 8,
          Math.random() * 6 + 2,
          (Math.random() - 0.5) * 8
        ),
        life: 1.0,
        maxLife: 0.8 + Math.random() * 0.5,
        color: new THREE.Color(color).offsetHSL(Math.random() * 0.1, 0, 0),
      };
    }
  }

  private updateParticles(dt: number) {
    if (!this.particleSystem) return;
    
    const positions = this.particleSystem.geometry.attributes.position as THREE.BufferAttribute;
    const colors = this.particleSystem.geometry.attributes.color as THREE.BufferAttribute;
    
    for (let i = 0; i < this.particles.length; i++) {
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
  private cameraShake(intensity: number, duration: number) {
    const startTime = this.clock.elapsedTime;
    const shake = () => {
      const elapsed = this.clock.elapsedTime - startTime;
      if (elapsed > duration) return;
      const decay = 1 - (elapsed / duration);
      this.camera.position.x += (Math.random() - 0.5) * intensity * decay;
      this.camera.position.y += (Math.random() - 0.5) * intensity * decay * 0.5;
      requestAnimationFrame(shake);
    };
    shake();
  }

  private updateCamera() {
    // Camera follows the action - centered between players
    const midX = (this.player.position.x + this.opponent.position.x) / 2;
    const midZ = (this.player.position.z + this.opponent.position.z) / 2;
    
    // If ball is in the air, look at ball
    let lookTarget: THREE.Vector3;
    if (this.ball.isAirborne) {
      lookTarget = this.ball.position.clone();
    } else {
      lookTarget = new THREE.Vector3(midX, 1.5, midZ);
    }
    
    // Smooth camera movement
    const targetCamPos = new THREE.Vector3(
      midX * 0.3,
      10 + Math.abs(this.player.position.z - this.opponent.position.z) * 0.15,
      midZ + 16
    );
    
    this.camera.position.lerp(targetCamPos, 0.03);
    
    const currentLook = new THREE.Vector3();
    this.camera.getWorldDirection(currentLook);
    this.camera.lookAt(lookTarget);
  }

  // ============== ANIMATIONS ==============
  private updateAnimations(dt: number) {
    // Player running animation
    if (this.keys.has('KeyA') || this.keys.has('KeyD') || this.keys.has('KeyW') || this.keys.has('KeyS') ||
        this.keys.has('ArrowLeft') || this.keys.has('ArrowRight') || this.keys.has('ArrowUp') || this.keys.has('ArrowDown')) {
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

  private updateBallTrail() {
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

  private gameLoop() {
    if (!this.isRunning) return;
    this.update();
    requestAnimationFrame(() => this.gameLoop());
  }

  resize(width: number, height: number) {
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

  setDifficulty(difficulty: number) {
    // Adjust opponent behavior based on difficulty (0-1)
    // Higher difficulty = faster, better shooting
  }

  setPlayerBonus(bonus: { speed: number; shoot: number; defense: number; dunk: number }) {
    this.playerBonus = bonus;
  }

  getScores() {
    return { player: this.playerScore, opponent: this.opponentScore };
  }

  destroy() {
    this.isRunning = false;
    (this as unknown as Record<string, () => void>)._cleanupInput?.();
    this.renderer.dispose();
    this.scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        if (Array.isArray(obj.material)) {
          obj.material.forEach(m => m.dispose());
        } else {
          obj.material.dispose();
        }
      }
    });
  }
}