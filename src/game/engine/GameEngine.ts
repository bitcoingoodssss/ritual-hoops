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
const STEAL_RANGE = 2.0;
const STEAL_COOLDOWN = 1.5;
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
    const skyMat = new THREE.ShaderMaterial({
      uniforms: {
        topColor: { value: new THREE.Color(0x0a0a2e) },
        bottomColor: { value: new THREE.Color(0x1a0a2e) },
        offset: { value: 20 },
        exponent: { value: 0.4 },
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        uniform float offset;
        uniform float exponent;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition + offset).y;
          gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
        }
      `,
      side: THREE.BackSide,
    });
    this.scene.add(new THREE.Mesh(skyGeo, skyMat));
    
    // Stars
    const starsGeo = new THREE.BufferGeometry();
    const starPositions: number[] = [];
    for (let i = 0; i < 2000; i++) {
      const r = 80 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 0.5;
      starPositions.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi) + 10,
        r * Math.sin(phi) * Math.sin(theta)
      );
    }
    starsGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
    const starsMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.15, transparent: true, opacity: 0.8 });
    this.scene.add(new THREE.Points(starsGeo, starsMat));
  }

  private buildArena() {
    // Arena floor (dark surface around the court)
    const arenaGeo = new THREE.PlaneGeometry(80, 80);
    this.floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x111122,
      roughness: 0.7,
      metalness: 0.3,
    });
    this.arenaFloor = new THREE.Mesh(arenaGeo, this.floorMaterial);
    this.arenaFloor.rotation.x = -Math.PI / 2;
    this.arenaFloor.position.y = -0.01;
    this.arenaFloor.receiveShadow = true;
    this.scene.add(this.arenaFloor);
    
    // Arena walls / stands
    this.buildStands();
  }

  private buildStands() {
    const standMat = new THREE.MeshStandardMaterial({ color: 0x1a1a2e, roughness: 0.9, metalness: 0.1 });
    
    // Back stand
    const backStand = new THREE.Mesh(new THREE.BoxGeometry(60, 8, 3), standMat);
    backStand.position.set(0, 3, -28);
    this.scene.add(backStand);
    
    // Front stand
    const frontStand = new THREE.Mesh(new THREE.BoxGeometry(60, 8, 3), standMat);
    frontStand.position.set(0, 3, 28);
    this.scene.add(frontStand);
    
    // Side stands
    const leftStand = new THREE.Mesh(new THREE.BoxGeometry(3, 8, 56), standMat);
    leftStand.position.set(-16, 3, 0);
    this.scene.add(leftStand);
    
    const rightStand = new THREE.Mesh(new THREE.BoxGeometry(3, 8, 56), standMat);
    rightStand.position.set(16, 3, 0);
    this.scene.add(rightStand);
    
    // Audience dots (colored points simulating crowd)
    const crowdGeo = new THREE.BufferGeometry();
    const crowdPositions: number[] = [];
    const crowdColors: number[] = [];
    const colors = [
      [0xff6b35, 0x2ec4b6, 0xe71d36, 0xff9f1c, 0x7b2d8e, 0xf72585, 0x4cc9f0]
    ];
    
    for (let stand = 0; stand < 4; stand++) {
      const count = 500;
      for (let i = 0; i < count; i++) {
        let x, y, z;
        if (stand === 0) { x = -28 + Math.random() * 56; y = 0.5 + Math.random() * 7; z = -26 - Math.random() * 2; }
        else if (stand === 1) { x = -28 + Math.random() * 56; y = 0.5 + Math.random() * 7; z = 26 + Math.random() * 2; }
        else if (stand === 2) { x = -14 - Math.random() * 2; y = 0.5 + Math.random() * 7; z = -26 + Math.random() * 52; }
        else { x = 14 + Math.random() * 2; y = 0.5 + Math.random() * 7; z = -26 + Math.random() * 52; }
        
        crowdPositions.push(x, y, z);
        const c = colors[0][Math.floor(Math.random() * colors[0].length)];
        const color = new THREE.Color(c);
        crowdColors.push(color.r, color.g, color.b);
      }
    }
    
    crowdGeo.setAttribute('position', new THREE.Float32BufferAttribute(crowdPositions, 3));
    crowdGeo.setAttribute('color', new THREE.Float32BufferAttribute(crowdColors, 3));
    const crowdMat = new THREE.PointsMaterial({
      size: 0.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
    });
    const crowd = new THREE.Points(crowdGeo, crowdMat);
    crowd.userData.isCrowd = true;
    this.scene.add(crowd);
  }

  private buildCourt() {
    this.court = new THREE.Group();
    
    // Court floor - polished wood look
    const courtGeo = new THREE.PlaneGeometry(COURT_WIDTH, COURT_LENGTH);
    const courtMat = new THREE.MeshStandardMaterial({
      color: 0xcd8844,
      roughness: 0.35,
      metalness: 0.15,
    });
    const courtFloor = new THREE.Mesh(courtGeo, courtMat);
    courtFloor.rotation.x = -Math.PI / 2;
    courtFloor.receiveShadow = true;
    this.court.add(courtFloor);
    
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
    
    // Body
    const bodyGeo = new THREE.CylinderGeometry(0.3, 0.35, 1.0, 8);
    const bodyMat = new THREE.MeshStandardMaterial({ color, roughness: 0.6, metalness: 0.2 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 1.0;
    body.castShadow = true;
    player.add(body);
    body.name = 'body';
    
    // Head
    const headGeo = new THREE.SphereGeometry(0.28, 16, 16);
    const headMat = new THREE.MeshStandardMaterial({ color: 0xffcc99, roughness: 0.7, metalness: 0.1 });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = 1.78;
    head.castShadow = true;
    player.add(head);
    head.name = 'head';
    
    // Face plane (for avatar)
    const faceGeo = new THREE.PlaneGeometry(0.35, 0.35);
    const faceMat = new THREE.MeshBasicMaterial({ color: 0x888888, transparent: true, opacity: 0 });
    const face = new THREE.Mesh(faceGeo, faceMat);
    face.position.set(0, 1.78, 0.26);
    face.name = 'face';
    player.add(face);
    
    // Left arm
    const armGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.6, 6);
    const armMat = new THREE.MeshStandardMaterial({ color: 0xffcc99, roughness: 0.7 });
    const leftArm = new THREE.Mesh(armGeo, armMat);
    leftArm.position.set(-0.42, 1.15, 0);
    leftArm.rotation.z = 0.3;
    leftArm.castShadow = true;
    leftArm.name = 'leftArm';
    player.add(leftArm);
    
    const rightArm = new THREE.Mesh(armGeo, armMat);
    rightArm.position.set(0.42, 1.15, 0);
    rightArm.rotation.z = -0.3;
    rightArm.castShadow = true;
    rightArm.name = 'rightArm';
    player.add(rightArm);
    
    // Legs
    const legGeo = new THREE.CylinderGeometry(0.1, 0.09, 0.7, 6);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x222244, roughness: 0.7 });
    const leftLeg = new THREE.Mesh(legGeo, legMat);
    leftLeg.position.set(-0.15, 0.35, 0);
    leftLeg.castShadow = true;
    leftLeg.name = 'leftLeg';
    player.add(leftLeg);
    
    const rightLeg = new THREE.Mesh(legGeo, legMat);
    rightLeg.position.set(0.15, 0.35, 0);
    rightLeg.castShadow = true;
    rightLeg.name = 'rightLeg';
    player.add(rightLeg);
    
    // Shoes
    const shoeGeo = new THREE.BoxGeometry(0.2, 0.12, 0.35);
    const shoeMat = new THREE.MeshStandardMaterial({ color: 0xff4444, roughness: 0.4, metalness: 0.3 });
    const leftShoe = new THREE.Mesh(shoeGeo, shoeMat);
    leftShoe.position.set(-0.15, 0.06, 0.05);
    leftShoe.name = 'leftShoe';
    player.add(leftShoe);
    
    const rightShoe = new THREE.Mesh(shoeGeo, shoeMat);
    rightShoe.position.set(0.15, 0.06, 0.05);
    rightShoe.name = 'rightShoe';
    player.add(rightShoe);
    
    // Jersey number (small box on chest)
    const numGeo = new THREE.PlaneGeometry(0.2, 0.25);
    const numMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 });
    const num = new THREE.Mesh(numGeo, numMat);
    num.position.set(0, 1.15, 0.31);
    num.name = 'jerseyNum';
    player.add(num);
    
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
    this.ambientLight = new THREE.AmbientLight(0x334466, 0.6);
    this.scene.add(this.ambientLight);
    
    // Main spotlight from above
    const mainLight = new THREE.SpotLight(0xffffff, 100, 60, Math.PI / 4, 0.5, 1);
    mainLight.position.set(0, 20, 0);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.camera.near = 1;
    mainLight.shadow.camera.far = 40;
    this.scene.add(mainLight);
    this.spotLights.push(mainLight);
    
    // Colored accent lights
    const colors = [0xff6b35, 0x2ec4b6, 0xf72585, 0x4cc9f0];
    const positions = [
      [-15, 12, -15], [15, 12, -15], [-15, 12, 15], [15, 12, 15]
    ];
    
    colors.forEach((color, i) => {
      const light = new THREE.SpotLight(color, 30, 50, Math.PI / 3, 0.6, 1.5);
      light.position.set(...positions[i]);
      light.target.position.set(0, 0, 0);
      this.scene.add(light);
      this.scene.add(light.target);
      this.spotLights.push(light);
    });
    
    // Rim lights at court edges
    const rimLight1 = new THREE.PointLight(0xff6b35, 5, 30);
    rimLight1.position.set(0, 2, COURT_LENGTH / 2);
    this.scene.add(rimLight1);
    this.spotLights.push(rimLight1 as unknown as THREE.SpotLight);
    
    const rimLight2 = new THREE.PointLight(0x2ec4b6, 5, 30);
    rimLight2.position.set(0, 2, -COURT_LENGTH / 2);
    this.scene.add(rimLight2);
    this.spotLights.push(rimLight2 as unknown as THREE.SpotLight);
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
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = 'anonymous';
    loader.load(url, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      this.playerAvatarTexture = texture;
      const face = this.playerMesh.getObjectByName('face') as THREE.Mesh;
      if (face) {
        (face.material as THREE.MeshBasicMaterial).map = texture;
        (face.material as THREE.MeshBasicMaterial).opacity = 1;
        (face.material as THREE.MeshBasicMaterial).needsUpdate = true;
      }
    }, undefined, () => {
      // Fallback: use a colored circle
      const face = this.playerMesh.getObjectByName('face') as THREE.Mesh;
      if (face) {
        (face.material as THREE.MeshBasicMaterial).color.set(0xff6b35);
        (face.material as THREE.MeshBasicMaterial).opacity = 0.8;
      }
    });
  }

  setOpponentAvatar(url: string) {
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = 'anonymous';
    loader.load(url, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      this.opponentAvatarTexture = texture;
      const face = this.opponentMesh.getObjectByName('face') as THREE.Mesh;
      if (face) {
        (face.material as THREE.MeshBasicMaterial).map = texture;
        (face.material as THREE.MeshBasicMaterial).opacity = 1;
        (face.material as THREE.MeshBasicMaterial).needsUpdate = true;
      }
    });
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
    
    if (dz < 5 && dx < 3) {
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
        if (Math.random() < 0.35) {
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
      
      const speed = MOVE_SPEED * (this.keys.has('Sprint') ? SPRINT_MULTIPLIER : 1);
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
        if (this.ball.velocity.length() < 1) {
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
    
    if (distXZ < hL.rimRadius * 0.8 && 
        this.ball.position.y < hL.position.y + 0.3 &&
        this.ball.position.y > hL.position.y - 0.5 &&
        this.ball.velocity.y < 0) {
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
    
    if (distXZ2 < hR.rimRadius * 0.8 && 
        this.ball.position.y < hR.position.y + 0.3 &&
        this.ball.position.y > hR.position.y - 0.5 &&
        this.ball.velocity.y < 0) {
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