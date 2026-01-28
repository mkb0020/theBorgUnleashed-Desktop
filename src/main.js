import kaplay from "https://unpkg.com/kaplay@3001.0.0-alpha.20/dist/kaplay.mjs";

const scale = 2;
const k = kaplay({
  width: 750 * scale,
  height: 365 * scale,
  scale,
  letterbox: true,
  background: [0, 0, 0, 0],
  touchToMouse: false,
  crisp: true,
});

const gameRoot = document.getElementById("gameRoot");
gameRoot.appendChild(k.canvas);

k.canvas.tabIndex = 1;

const scoreElement = document.getElementById('score');
const muteBtn = document.getElementById('muteBtn');
const muteIcon = document.getElementById('muteIcon');
const startBtn = document.getElementById('startBtn');

function resizeGame() {
  const container = gameRoot;
  const rect = container.getBoundingClientRect();
  

  k.canvas.style.width = rect.width + 'px';
  k.canvas.style.height = rect.height + 'px';
}

k.loadSprite("inge", "assets/images/inge3.png", {
  sliceX: 6,
  sliceY: 1,
  anims: {
    idle: 0,
    run: { from: 1, to: 4, loop: true, speed: 10 },
    jump: 5
  }
});
k.loadSprite("plushie", "assets/images/plushie.png");
k.loadSprite("platform", "assets/images/platform.png");
k.loadSprite("ground", "assets/images/ground.png");
k.loadSound("bgMusic", "assets/audio/track.aac");
k.loadSound("getPlushie", "assets/audio/getPlushie.mp3");
k.loadSprite("hoodMart", "assets/images/hoodMart.png");
k.loadSprite("mcDaniels", "assets/images/mcDaniels.png");

let score = 0;
let muted = false;
let lastPlatformX = 300;
let music;
let useGround = true;
let groundSegmentCount = 0;

function updateScore() {
  scoreElement.textContent = `🍔: ${score}`;
}

const GRAVITY = 1400;
const JUMP_FORCE = 750;
const MOVE_SPEED = 750;
const MIN_PLATFORM_WIDTH = 600;
const MAX_PLATFORM_WIDTH = 800;
const GROUND_SPRITE_WIDTH = 600;
const GROUND_SEGMENTS_PER_SECTION = 5;
const PLATFORM_COUNT_PER_SECTION = 5;

const PLAYER_MAX_JUMP_DISTANCE = MOVE_SPEED * Math.sqrt((2 * JUMP_FORCE) / GRAVITY);
const SAFE_GAP_DISTANCE = PLAYER_MAX_JUMP_DISTANCE * 0.9;

function addGroundSegment() {
  const groundHeight = 60;
  
  const groundSegment = k.add([
    k.sprite("ground"),
    k.pos(lastPlatformX + 600, k.height() - groundHeight),
    k.area(),
    k.body({ isStatic: true }),
    k.anchor("topleft"),
    k.scale(1, 1),
    "ground",
    "segment"
  ]);

  groundSegment.scale = k.vec2(GROUND_SPRITE_WIDTH / groundSegment.width, groundHeight / groundSegment.height);
  
  lastPlatformX += GROUND_SPRITE_WIDTH;
  groundSegmentCount++;
}

function addPlatform() {
  const isFirstAfterGround = groundSegmentCount === 0;
  
  const width = MIN_PLATFORM_WIDTH + Math.random() * (MAX_PLATFORM_WIDTH - MIN_PLATFORM_WIDTH);
  
  const minGap = 600;
  const maxGap = 750; 
  const gap = isFirstAfterGround ? 
    (minGap * 0.8) : 
    (minGap + Math.random() * (maxGap - minGap));
  
  lastPlatformX += gap;
  
  const minHeight = k.height() - 180;
  const maxHeight = k.height() - 280;
  const height = minHeight + Math.random() * (maxHeight - minHeight);
  
  const collisionPlatform = k.add([
    k.rect(width, 10),
    k.pos(lastPlatformX, height),
    k.area(),
    k.body({ isStatic: true }),
    k.opacity(0),
    "platform",
    "segment"
  ]);
  
  const platformSprite = k.add([
    k.sprite("platform"),
    k.pos(lastPlatformX, height),
    k.anchor("topleft"),
    k.scale(1, 1),
    k.z(-1),
    "platformSprite",
    "segment"
  ]);
  
  platformSprite.scale = k.vec2(width / platformSprite.width, 1);
  
  if (Math.random() > 0.6) {
    k.add([
      k.sprite("plushie"),
      k.pos(lastPlatformX + width / 2, height - 60),
      k.area(),
      k.anchor("center"),
      k.scale(0.5),
      "plushie"
    ]);
  }
  
  lastPlatformX += width;
  groundSegmentCount++;
}

function addNextSegment() {
  if (useGround) {
    addGroundSegment();
    if (groundSegmentCount >= GROUND_SEGMENTS_PER_SECTION) {
      useGround = false;
      groundSegmentCount = 0;
    }
  } else {
    addPlatform();
    if (groundSegmentCount >= PLATFORM_COUNT_PER_SECTION) {
      useGround = true;
      groundSegmentCount = 0;
    }
  }
}

function createParticles(pos) {
  const particleCount = 15; 
  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 100 + Math.random() * 300;
    const particle = k.add([
      k.circle(4),
      k.pos(pos),
      k.color(255, 255, 255),
      k.opacity(1),
      "particle",
      {
        life: 60,
        maxLife: 60,
        velX: Math.cos(angle) * speed,
        velY: Math.sin(angle) * speed
      }
    ]);
    
    particle.onUpdate(() => {
      particle.pos.x += particle.velX * k.dt();
      particle.pos.y += particle.velY * k.dt();
      particle.life--;
      particle.opacity = particle.life / particle.maxLife;
      
      if (particle.life <= 0) {
        k.destroy(particle);
      }
    });
  }
}

k.scene("start", () => {
  document.getElementById('startScreen').style.display = 'flex';
  document.getElementById('ui').style.display = 'none';
});

k.scene("game", () => {
  document.getElementById('startScreen').style.display = 'none';
  document.getElementById('ui').style.display = 'block';
  
  k.canvas.focus();
  
  score = 0;
  lastPlatformX = 3600;
  useGround = true;
  groundSegmentCount = 0;
  updateScore();
  
  if (!music) {
    music = k.play("bgMusic", { loop: true, volume: 0.5, speed: 1 });
  }
  if (muted) {
    music.paused = true;
  }
  
  k.setGravity(GRAVITY);
  
  const groundHeight = 60;
  const groundWidth = 600;
  
  const ground = k.add([
    k.sprite("ground"),
    k.pos(0, k.height() - groundHeight),
    k.area(),
    k.body({ isStatic: true }),
    k.anchor("topleft"),
    k.scale(1, 1),
    "ground"
  ]);

  const groundSegment1 = k.add([
    k.sprite("ground"),
    k.pos(groundWidth, k.height() - groundHeight),
    k.area(),
    k.body({ isStatic: true }),
    k.anchor("topleft"),
    k.scale(1, 1),
    "ground",
    "segment1"
  ]);

  const groundSegment2 = k.add([
    k.sprite("ground"),
    k.pos(groundWidth * 2, k.height() - groundHeight),
    k.area(),
    k.body({ isStatic: true }),
    k.anchor("topleft"),
    k.scale(1, 1),
    "ground",
    "segment2"
  ]);

  const groundSegment3 = k.add([
    k.sprite("ground"),
    k.pos(groundWidth * 3, k.height() - groundHeight),
    k.area(),
    k.body({ isStatic: true }),
    k.anchor("topleft"),
    k.scale(1, 1),
    "ground",
    "segment3"
  ]);

  const groundSegment4 = k.add([
    k.sprite("ground"),
    k.pos(groundWidth * 4, k.height() - groundHeight),
    k.area(),
    k.body({ isStatic: true }),
    k.anchor("topleft"),
    k.scale(1, 1),
    "ground",
    "segment4"
  ]);

  const groundSegment5 = k.add([
    k.sprite("ground"),
    k.pos(groundWidth * 5, k.height() - groundHeight),
    k.area(),
    k.body({ isStatic: true }),
    k.anchor("topleft"),
    k.scale(1, 1),
    "ground",
    "segment5"
  ]);



  ground.scale = k.vec2(groundWidth / ground.width, groundHeight / ground.height);
  groundSegment1.scale = k.vec2(groundWidth / groundSegment1.width, groundHeight / groundSegment1.height);
  groundSegment2.scale = k.vec2(groundWidth / groundSegment2.width, groundHeight / groundSegment2.height);
  groundSegment3.scale = k.vec2(groundWidth / groundSegment3.width, groundHeight / groundSegment3.height);
  groundSegment4.scale = k.vec2(groundWidth / groundSegment4.width, groundHeight / groundSegment4.height);
  groundSegment5.scale = k.vec2(groundWidth / groundSegment5.width, groundHeight / groundSegment5.height);

  const hoodMart = k.add([
    k.sprite("hoodMart"),
    k.pos(700, k.height() - groundHeight - 490),
    k.anchor("topleft"),
    k.scale(5, 5),
    k.z(-1),
    "hoodMart"
  ]);

  const mcDaniels = k.add([
    k.sprite("mcDaniels"),
    k.pos(1700, k.height() - groundHeight - 490),
    k.anchor("topleft"),
    k.scale(5, 5),
    k.z(-1),
    "mcDaniels"
  ]);

  for (let i = 0; i < 10; i++) {
    addNextSegment();
  }
  
  const player = k.add([
    k.sprite("inge"),
    k.pos(100, 100),
    k.area(),
    k.body(),
    k.anchor("center"),
    k.scale(1),
    "player",
    {
      passthrough: true
    }
  ]);
  
  player.play("idle");
  
  player.onBeforePhysicsResolve((collision) => {
    if (collision.target.is("platform") && player.isJumping()) {
      collision.preventResolution();
    }
  });
  
  let cleanupFrameCounter = 0;
  const CLEANUP_INTERVAL = 60; 
  
  k.onUpdate(() => {
    const isMoving = k.isKeyDown("left") || k.isKeyDown("a") || 
                     k.isKeyDown("right") || k.isKeyDown("d");
    
    if (k.isKeyDown("left") || k.isKeyDown("a")) {
      player.move(-MOVE_SPEED, 0);
      player.flipX = true;
    }
    if (k.isKeyDown("right") || k.isKeyDown("d")) {
      player.move(MOVE_SPEED, 0);
      player.flipX = false;
    }
    
    if (!player.isGrounded()) {
      if (player.curAnim() !== "jump") {
        player.play("jump");
      }
    } else if (isMoving) {
      if (player.curAnim() !== "run") {
        player.play("run");
      }
    } else {
      if (player.curAnim() !== "idle") {
        player.play("idle");
      }
    }
    
    k.camPos(player.pos.x + 50, k.height() / 2);
    
    if (lastPlatformX < player.pos.x + k.width()) {
      addNextSegment();
    }
    
    if (player.pos.y > k.height() + 100) {
      player.pos = k.vec2(100, 100);
      lastPlatformX = 3600;
      useGround = true;
      groundSegmentCount = 0;
      
      k.get("segment").forEach(p => k.destroy(p));
      k.get("plushie").forEach(p => k.destroy(p));
      
      for (let i = 0; i < 10; i++) {
        addNextSegment();
      }
    }
    
    cleanupFrameCounter++;
    if (cleanupFrameCounter >= CLEANUP_INTERVAL) {
      cleanupFrameCounter = 0;
      const cleanupThreshold = player.pos.x - k.width();
      
      k.get("segment").forEach(p => {
        if (p.pos.x < cleanupThreshold) {
          k.destroy(p);
        }
      });
      k.get("plushie").forEach(p => {
        if (p.pos.x < cleanupThreshold) {
          k.destroy(p);
        }
      });
      k.get("particle").forEach(p => {
        if (p.pos.x < cleanupThreshold - 500) {
          k.destroy(p);
        }
      });
    }
  });
  
  function tryJump() {
    if (player.isGrounded()) {
      player.jump(JUMP_FORCE);
    }
  }
  
  k.onKeyPress("space", tryJump);
  k.onKeyPress("up", tryJump);
  k.onKeyPress("w", tryJump);
  
  player.onCollide("plushie", (plushie) => {
    if (plushie.exists()) {
      score++;
      updateScore();
      if (!muted) {
        k.play("getPlushie", { loop: false, volume: 0.4 });
      }
      createParticles(plushie.worldPos());
      k.destroy(plushie);
    }
  });
});

muteBtn.addEventListener('click', () => {
  muted = !muted;
  muteIcon.src = muted ? 'assets/images/mute.png' : 'assets/images/music.png';
  if (music) {
    music.paused = muted;
  }
});

startBtn.addEventListener('click', () => {
  k.go("game");
});

k.go("start");

resizeGame();

window.addEventListener("resize", resizeGame);