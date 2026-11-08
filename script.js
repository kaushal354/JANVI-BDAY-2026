// ========================================================
// JANVII'S BIRTHDAY BLOSSOM 2026 - INTERACTIVE SCRIPT
// Specially crafted with love, friendship & celebration
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. WEB AUDIO API SYNTHESIZER (ZERO-DEPENDENCY SFX) ---
  let audioCtx = null;

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Sparkle / Harpeggio chime
  function playSparkleSound() {
    if (!audioCtx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]; // C5, E5, G5, C6, E6, G6
    notes.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0.001, audioCtx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.18, audioCtx.currentTime + idx * 0.08 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + idx * 0.08 + 0.5);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(audioCtx.currentTime + idx * 0.08);
      osc.stop(audioCtx.currentTime + idx * 0.08 + 0.55);
    });
  }

  // Soft candle blow sound (filtered noise)
  function playCandleBlowSound() {
    if (!audioCtx) return;
    const bufferSize = audioCtx.sampleRate * 0.5;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, audioCtx.currentTime);
    filter.frequency.linearRampToValueAtTime(150, audioCtx.currentTime + 0.5);

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    noise.start();
  }

  // Cute bubble pop sound
  function playPopSound() {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(900, audioCtx.currentTime + 0.09);

    gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.11);
  }

  // Firework burst sound
  function playFireworkSound() {
    if (!audioCtx) return;
    // Launch whistle
    const osc = audioCtx.createOscillator();
    const oscGain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.35);

    oscGain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    oscGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);

    osc.connect(oscGain);
    oscGain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.35);

    // Boom
    setTimeout(() => {
      if (!audioCtx) return;
      const bufferSize = audioCtx.sampleRate * 0.7;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(250, audioCtx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(60, audioCtx.currentTime + 0.7);

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.7);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);
      noise.start();
    }, 320);
  }

  // --- 2. SAKURA BLOSSOM CANVAS SIMULATION ---
  const sakuraCanvas = document.getElementById('sakura-canvas');
  const ctx = sakuraCanvas.getContext('2d');
  let width = (sakuraCanvas.width = window.innerWidth);
  let height = (sakuraCanvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = sakuraCanvas.width = window.innerWidth;
    height = sakuraCanvas.height = window.innerHeight;
  });

  const PETAL_COUNT = 45;
  const petals = [];
  const petalColors = [
    'rgba(255, 183, 197, 0.85)',
    'rgba(255, 143, 171, 0.75)',
    'rgba(251, 111, 146, 0.8)',
    'rgba(255, 229, 236, 0.9)'
  ];

  class Petal {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -20;
      this.size = Math.random() * 10 + 9;
      this.speedX = Math.random() * 1.5 - 0.75;
      this.speedY = Math.random() * 1.4 + 0.8;
      this.angle = Math.random() * Math.PI * 2;
      this.angleSpeed = Math.random() * 0.03 - 0.015;
      this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
      this.oscillationSpeed = Math.random() * 0.02 + 0.01;
      this.oscillationDistance = Math.random() * 2 + 1;
      this.flip = Math.random();
      this.flipSpeed = Math.random() * 0.03 + 0.01;
    }

    update() {
      this.x += this.speedX + Math.sin(this.angle) * this.oscillationDistance;
      this.y += this.speedY;
      this.angle += this.angleSpeed;
      this.flip += this.flipSpeed;

      if (this.y > height + 20 || this.x < -30 || this.x > width + 30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.scale(1, Math.sin(this.flip));

      ctx.fillStyle = this.color;
      ctx.beginPath();
      // Organic petal shape
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size, this.size / 3, 0, this.size);
      ctx.bezierCurveTo(this.size, this.size / 3, this.size / 2, -this.size / 2, 0, 0);
      ctx.fill();

      ctx.restore();
    }
  }

  for (let i = 0; i < PETAL_COUNT; i++) {
    petals.push(new Petal());
  }

  function animateSakura() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < petals.length; i++) {
      petals[i].update();
      petals[i].draw();
    }
    requestAnimationFrame(animateSakura);
  }
  animateSakura();

  // Mouse interaction with petals
  window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    petals.forEach((p) => {
      const dx = p.x - mouseX;
      const dy = p.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        p.speedX += (dx / dist) * 0.8;
        p.speedY += (dy / dist) * 0.4;
      }
    });
  });

  // --- 3. BACKGROUND MUSIC & AUDIO CONTROLLER ---
  const musicStartTime = 22;
  const bgAudio = new Audio("./assets/audio/jashn_e_bahaaraa_flute.mp3");
  bgAudio.loop = true;
  bgAudio.volume = 0.65;
  bgAudio.preload = 'auto';
  let musicStarted = false;

  const playPauseBtn = document.getElementById('play-pause-btn');
  const playIcon = document.getElementById('play-icon');
  const pauseIcon = document.getElementById('pause-icon');
  const volumeSlider = document.getElementById('volume-slider');
  const eqVisualizer = document.getElementById('eq-visualizer');

  async function playMusic() {
    initAudioContext();
    try {
      if (!musicStarted) {
        if (bgAudio.readyState >= HTMLMediaElement.HAVE_METADATA) {
          bgAudio.currentTime = Math.min(musicStartTime, bgAudio.duration);
          musicStarted = true;
        } else {
          bgAudio.addEventListener('loadedmetadata', () => {
            if (!musicStarted) {
              bgAudio.currentTime = Math.min(musicStartTime, bgAudio.duration);
              musicStarted = true;
            }
          }, { once: true });
        }
      }
      await bgAudio.play();
      if (playIcon) playIcon.classList.add('hidden');
      if (pauseIcon) pauseIcon.classList.remove('hidden');
      if (eqVisualizer) eqVisualizer.classList.add('eq-playing');
    } catch (e) {
      console.log("Audio play blocked until gesture:", e);
    }
  }

  function pauseMusic() {
    bgAudio.pause();
    if (playIcon) playIcon.classList.remove('hidden');
    if (pauseIcon) pauseIcon.classList.add('hidden');
    if (eqVisualizer) eqVisualizer.classList.remove('eq-playing');
  }

  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
      if (bgAudio.paused) {
        playMusic();
      } else {
        pauseMusic();
      }
    });
  }

  if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
      bgAudio.volume = parseFloat(e.target.value);
    });
  }

  // --- 4. WELCOME OVERLAY / GATEWAY UNLOCK ---
  const welcomeOverlay = document.getElementById('welcome-overlay');
  const enterBtn = document.getElementById('enter-surprise-btn');

  if (enterBtn) {
    enterBtn.addEventListener('click', () => {
      window.scrollTo(0, 0);
      playMusic();

      // Launch welcoming confetti
      launchConfettiExplosion();

      // Fade out welcome screen
      welcomeOverlay.style.opacity = '0';
      welcomeOverlay.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      welcomeOverlay.style.transform = 'scale(1.05)';
      setTimeout(() => {
        welcomeOverlay.style.display = 'none';
      }, 800);
    });
  }

  // --- 5. CONFETTI CANNON (WITH BROWSER / FALLBACK SUPPORT) ---
  function launchConfettiExplosion() {
    if (typeof confetti === 'function') {
      // First wave: center burst
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      // Second wave: side streams
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 300);

      // Third wave: stars & circles
      setTimeout(() => {
        confetti({
          particleCount: 40,
          spread: 100,
          origin: { y: 0.4 },
          colors: ['#ff8fab', '#ffd166', '#a0c4ff', '#b9fbc0']
        });
      }, 600);
    }
  }

  const confettiTrigger = document.getElementById('manual-confetti-btn');
  if (confettiTrigger) {
    confettiTrigger.addEventListener('click', () => {
      initAudioContext();
      playPopSound();
      launchConfettiExplosion();
    });
  }

  // --- 6. INTERACTIVE CAKE & CANDLE BLOW CEREMONY ---
  const blowCandlesBtn = document.getElementById('blow-candles-btn');
  const candleFlames = document.querySelectorAll('.flame');
  const candleSmokes = document.querySelectorAll('.smoke');
  const wishMessageBanner = document.getElementById('wish-message-banner');
  let candlesBlown = false;

  function blowCandles() {
    if (candlesBlown) return;
    candlesBlown = true;
    initAudioContext();
    playCandleBlowSound();

    // Extinguish flames
    candleFlames.forEach((flame) => {
      flame.classList.add('extinguished');
    });

    // Animate smoke
    candleSmokes.forEach((smoke) => {
      smoke.classList.add('active');
    });

    // After 0.5s: Explosion of celebration!
    setTimeout(() => {
      playSparkleSound();
      launchConfettiExplosion();

      if (wishMessageBanner) {
        wishMessageBanner.classList.remove('hidden');
        wishMessageBanner.classList.add('animate-bounce');
        setTimeout(() => {
          wishMessageBanner.classList.remove('animate-bounce');
        }, 1500);
      }

      if (blowCandlesBtn) {
        blowCandlesBtn.textContent = '✨ Wish Made! Relight Candles ✨';
        blowCandlesBtn.classList.replace('btn-blossom', 'btn-gold');
      }
    }, 600);
  }

  function relightCandles() {
    candlesBlown = false;
    candleFlames.forEach((flame) => {
      flame.classList.remove('extinguished');
    });
    candleSmokes.forEach((smoke) => {
      smoke.classList.remove('active');
    });
    if (wishMessageBanner) {
      wishMessageBanner.classList.add('hidden');
    }
    if (blowCandlesBtn) {
      blowCandlesBtn.textContent = '🎂 Make a Wish & Blow the Candles ✨';
      blowCandlesBtn.classList.replace('btn-gold', 'btn-blossom');
    }
    playPopSound();
  }

  if (blowCandlesBtn) {
    blowCandlesBtn.addEventListener('click', () => {
      if (!candlesBlown) {
        blowCandles();
      } else {
        relightCandles();
      }
    });
  }

  // Also clicking candle flames directly blows them out
  candleFlames.forEach((flame) => {
    flame.addEventListener('click', () => {
      if (!candlesBlown) blowCandles();
    });
  });

  // --- 7. POLAROID MEMORY GALLERY & LIGHTBOX ---
  const memoryItems = [
    {
      src: './assets/images/photo_1.jpg',
      caption: 'That radiant smile that lights up the world ✨',
      desc: 'Some people just bring sunshine wherever they go — and you are definitely one of them, Janvii.'
    },
    {
      src: './assets/images/photo_2.png',
      caption: 'Grace, confidence & genuine warmth 🌸',
      desc: 'Looking back on moments where your effortless charm and good vibes shine through.'
    },
    {
      src: './assets/images/photo_3.jpg',
      caption: 'Unforgettable moments & laughter 💫',
      desc: 'Life is made of little memories, and the ones with your laughter are the sweetest.'
    },
    {
      src: './assets/images/photo_4.png',
      caption: 'Quiet strength & bright spirit 🌿',
      desc: 'Always staying true to yourself, graceful and kind through every season.'
    },
    {
      src: './assets/images/photo_5.jpg',
      caption: 'Cherished memories & pure joy ☀️',
      desc: 'May this year bring you double the reasons to smile just like this!'
    },
    {
      src: './assets/images/birthday_collage.png',
      caption: 'A Special Birthday Collage 💖',
      desc: 'A vibrant collection of your finest snapshots and cheerful moments.'
    },
    {
      src: './assets/images/janvii1.jpeg',
      caption: 'A classic favorite snapshot 📸',
      desc: 'Proof that your sweet nature and spark have always been there!'
    },
    {
      src: './assets/images/67.jpg',
      caption: 'Celebration mode & bright energy ⭐',
      desc: 'To another year of dreams fulfilled and happiness around every corner.'
    }
  ];

  let currentGalleryIndex = 0;
  const polaroidCards = document.querySelectorAll('.polaroid-card');
  const galleryModal = document.getElementById('gallery-lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const closeLightboxBtn = document.getElementById('close-lightbox-btn');
  const prevLightboxBtn = document.getElementById('lightbox-prev');
  const nextLightboxBtn = document.getElementById('lightbox-next');

  function openLightbox(index) {
    currentGalleryIndex = index;
    const item = memoryItems[index];
    if (lightboxImg) lightboxImg.src = item.src;
    if (lightboxCaption) lightboxCaption.textContent = item.caption;
    if (lightboxDesc) lightboxDesc.textContent = item.desc;

    galleryModal.classList.add('active');
    initAudioContext();
    playPopSound();
  }

  function closeLightbox() {
    galleryModal.classList.remove('active');
  }

  polaroidCards.forEach((card) => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-index'), 10) || 0;
      openLightbox(idx);
    });
  });

  if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', closeLightbox);
  if (galleryModal) {
    galleryModal.addEventListener('click', (e) => {
      if (e.target === galleryModal) closeLightbox();
    });
  }

  if (prevLightboxBtn) {
    prevLightboxBtn.addEventListener('click', () => {
      currentGalleryIndex = (currentGalleryIndex - 1 + memoryItems.length) % memoryItems.length;
      openLightbox(currentGalleryIndex);
    });
  }

  if (nextLightboxBtn) {
    nextLightboxBtn.addEventListener('click', () => {
      currentGalleryIndex = (currentGalleryIndex + 1) % memoryItems.length;
      openLightbox(currentGalleryIndex);
    });
  }

  // --- 8. VIDEO REELS MODAL ---
  const videoModal = document.getElementById('video-modal');
  const videoPlayer = document.getElementById('reel-video-player');
  const openVideoBtn1 = document.getElementById('open-video-btn-1');
  const openVideoBtn2 = document.getElementById('open-video-btn-2');
  const closeVideoBtn = document.getElementById('close-video-btn');
  const videoTitle = document.getElementById('video-title');
  let musicWasPlayingBeforeVideo = false;

  function openVideoModal(videoSrc, title) {
    if (!videoPlayer) return;
    musicWasPlayingBeforeVideo = !bgAudio.paused;
    videoPlayer.src = videoSrc;
    if (videoTitle) videoTitle.textContent = title;
    videoModal.classList.add('active');
    // Pause background song while video is playing
    pauseMusic();
    videoPlayer.play().catch(e => console.log("Video auto-play handled:", e));
  }

  function closeVideoModal() {
    if (!videoPlayer) return;
    videoPlayer.pause();
    videoPlayer.src = '';
    videoModal.classList.remove('active');
    if (musicWasPlayingBeforeVideo) {
      musicWasPlayingBeforeVideo = false;
      playMusic();
    }
  }

  if (openVideoBtn1) {
    openVideoBtn1.addEventListener('click', () => {
      openVideoModal('./assets/videos/janvii4.mp4', 'Cherished Memory Reel 📽️');
    });
  }

  if (openVideoBtn2) {
    openVideoBtn2.addEventListener('click', () => {
      openVideoModal('./assets/videos/teddy_bear_wishes.mp4', 'Teddy Bear Wishes 🧸');
    });
  }

  if (closeVideoBtn) closeVideoBtn.addEventListener('click', closeVideoModal);
  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) closeVideoModal();
    });
  }

  // --- 9. WAX SEAL & ENVELOPE / HEARTFELT LETTER ---
  const envelope = document.getElementById('interactive-envelope');
  const letterModal = document.getElementById('letter-modal');
  const closeLetterBtn = document.getElementById('close-letter-btn');

  function openLetter() {
    initAudioContext();
    playSparkleSound();
    if (envelope) envelope.classList.add('open');

    setTimeout(() => {
      if (letterModal) {
        letterModal.classList.add('active');
      }
    }, 600);
  }

  function closeLetter() {
    if (letterModal) letterModal.classList.remove('active');
    setTimeout(() => {
      if (envelope) envelope.classList.remove('open');
    }, 400);
  }

  if (envelope) envelope.addEventListener('click', openLetter);
  if (closeLetterBtn) closeLetterBtn.addEventListener('click', closeLetter);
  if (letterModal) {
    letterModal.addEventListener('click', (e) => {
      if (e.target === letterModal) closeLetter();
    });
  }

  // --- 10. "JAR OF 365 SMILES" WISH CAPSULES ---
  const smileThoughts = [
    { star: '⭐', text: "Your laugh is completely contagious — don't ever lose that sparkle!" },
    { star: '🌸', text: "You have a natural gift for making people around you feel comfortable and valued." },
    { star: '💫', text: "Your quiet inner strength through challenges is genuinely inspiring." },
    { star: '✨', text: "The world is objectively brighter with Janvii in it. Never forget that!" },
    { star: '🌟', text: "May this year open brand new doors of success, happiness, and peace for you." },
    { star: '💖', text: "You have a heart of gold. Keep being the authentic, wonderful friend you are." },
    { star: '🌼', text: "May all your late-night aspirations turn into your daytime reality." },
    { star: '🧁', text: "Wishing you a year filled with delicious treats, peaceful moments, and good news." },
    { star: '🌷', text: "Whenever life gets busy, remember you have a loyal friend cheering for you always!" },
    { star: '🎈', text: "Another year wiser, stronger, and more graceful. Keep blooming!" },
    { star: '🎵', text: "May your favorite songs always feel like home, and every trip be memorable." },
    { star: '🌻', text: "You bring warmth without even trying. That is your genuine superpower." },
    { star: '🍀', text: "May good fortune, health, and smiling surprises follow you in every path you take." },
    { star: '🌈', text: "Keep shining bright, Janvii — your best chapters are still being written!" }
  ];

  let openedSmilesCount = 0;
  const jarContainer = document.getElementById('smile-jar');
  const smileModal = document.getElementById('smile-modal');
  const smileEmoji = document.getElementById('smile-emoji');
  const smileText = document.getElementById('smile-text');
  const smileCounter = document.getElementById('smile-counter');
  const closeSmileBtn = document.getElementById('close-smile-btn');
  const drawAnotherBtn = document.getElementById('draw-another-btn');

  function drawSmile() {
    initAudioContext();
    playPopSound();
    const randomThought = smileThoughts[Math.floor(Math.random() * smileThoughts.length)];

    openedSmilesCount = Math.min(openedSmilesCount + 1, 9);
    if (smileEmoji) smileEmoji.textContent = randomThought.star;
    if (smileText) smileText.textContent = `"${randomThought.text}"`;
    if (smileCounter) smileCounter.textContent = `Smiles Drawn: ${openedSmilesCount} of 9`;

    if (smileModal) smileModal.classList.add('active');
  }

  if (jarContainer) jarContainer.addEventListener('click', drawSmile);
  if (drawAnotherBtn) drawAnotherBtn.addEventListener('click', drawSmile);
  if (closeSmileBtn) {
    closeSmileBtn.addEventListener('click', () => {
      if (smileModal) smileModal.classList.remove('active');
    });
  }
  if (smileModal) {
    smileModal.addEventListener('click', (e) => {
      if (e.target === smileModal) smileModal.classList.remove('active');
    });
  }

  // --- 11. GRAND FINALE: SKY LANTERNS & INTERACTIVE FIREWORKS ---
  const grandSurpriseBtn = document.getElementById('grand-surprise-btn');
  const fireworksCanvas = document.getElementById('fireworks-canvas');
  const fwCtx = fireworksCanvas ? fireworksCanvas.getContext('2d') : null;
  const grandFinaleModal = document.getElementById('grand-finale-modal');
  const closeFinaleBtn = document.getElementById('close-finale-btn');
  const closeFireworksBtn = document.getElementById('close-fireworks-btn');
  let fireworksActive = false;
  let fireworksParticles = [];
  let fireworksStars = [];

  function resizeFireworks() {
    if (fireworksCanvas) {
      fireworksCanvas.width = window.innerWidth;
      fireworksCanvas.height = window.innerHeight;
      const starCount = Math.min(220, Math.max(70, Math.floor((window.innerWidth * window.innerHeight) / 7000)));
      fireworksStars = Array.from({ length: starCount }, () => ({
        x: Math.random() * fireworksCanvas.width,
        y: Math.random() * fireworksCanvas.height,
        radius: Math.random() < 0.12 ? Math.random() * 1.2 + 1 : Math.random() * 0.8 + 0.35,
        alpha: Math.random() * 0.55 + 0.25,
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.035 + 0.008,
        warm: Math.random() < 0.18
      }));
    }
  }
  resizeFireworks();
  window.addEventListener('resize', resizeFireworks);

  class FireworkParticle {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.alpha = 1;
      this.decay = Math.random() * 0.02 + 0.012;
      this.gravity = 0.08;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += this.gravity;
      this.alpha -= this.decay;
    }

    draw() {
      if (!fwCtx) return;
      fwCtx.save();
      fwCtx.globalAlpha = Math.max(0, this.alpha);
      fwCtx.fillStyle = this.color;
      fwCtx.shadowColor = this.color;
      fwCtx.shadowBlur = 14;
      fwCtx.beginPath();
      fwCtx.arc(this.x, this.y, 3, 0, Math.PI * 2);
      fwCtx.fill();
      fwCtx.restore();
    }
  }

  function createFirework(x, y) {
    initAudioContext();
    playFireworkSound();
    const colors = ['#ff5577', '#ffbd3e', '#00b8f4', '#16c79a', '#ff426f', '#d84cff', '#735cff'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    for (let i = 0; i < 60; i++) {
      fireworksParticles.push(new FireworkParticle(x, y, color));
    }
  }

  function animateFireworks() {
    if (!fireworksActive || !fwCtx) return;
    fwCtx.fillStyle = 'rgba(5, 9, 18, 0.2)';
    fwCtx.fillRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

    for (const star of fireworksStars) {
      star.phase += star.twinkleSpeed;
      fwCtx.globalAlpha = star.alpha * (0.65 + Math.sin(star.phase) * 0.35);
      fwCtx.fillStyle = star.warm ? '#ffe7b0' : '#dceaff';
      if (star.radius > 1) {
        fwCtx.shadowColor = fwCtx.fillStyle;
        fwCtx.shadowBlur = 5;
      }
      fwCtx.beginPath();
      fwCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      fwCtx.fill();
      fwCtx.shadowBlur = 0;
    }
    fwCtx.globalAlpha = 1;

    for (let i = fireworksParticles.length - 1; i >= 0; i--) {
      const p = fireworksParticles[i];
      p.update();
      p.draw();
      if (p.alpha <= 0) {
        fireworksParticles.splice(i, 1);
      }
    }

    // Auto spawn random fireworks during the show
    if (Math.random() < 0.05) {
      const randX = Math.random() * fireworksCanvas.width * 0.8 + fireworksCanvas.width * 0.1;
      const randY = Math.random() * fireworksCanvas.height * 0.5 + 80;
      createFirework(randX, randY);
    }

    requestAnimationFrame(animateFireworks);
  }

  // Interactive user click to launch fireworks
  if (fireworksCanvas) {
    fireworksCanvas.addEventListener('click', (e) => {
      createFirework(e.clientX, e.clientY);
    });
  }

  // Sky Lantern Spawner
  const lanternWishes = ["Joy 🌸", "Health 🌿", "Success 🌟", "Peace 💫", "Smiles 😊", "Love ❤️", "Dreams ✨"];
  function spawnSkyLantern() {
    const lantern = document.createElement('div');
    lantern.classList.add('sky-lantern');
    const randomWish = lanternWishes[Math.floor(Math.random() * lanternWishes.length)];
    lantern.textContent = randomWish;
    lantern.style.left = `${Math.random() * 85 + 5}vw`;
    lantern.style.animationDuration = `${Math.random() * 6 + 10}s`;

    document.body.appendChild(lantern);
    setTimeout(() => {
      lantern.remove();
    }, 16000);
  }

  let lanternInterval = null;
  let finaleTimeouts = [];

  function scheduleFinale(callback, delay) {
    finaleTimeouts.push(setTimeout(callback, delay));
  }

  function clearFinaleTimeouts() {
    finaleTimeouts.forEach((timeout) => clearTimeout(timeout));
    finaleTimeouts = [];
  }

  function launchGrandSurprise() {
    initAudioContext();
    playSparkleSound();
    fireworksActive = true;
    if (fireworksCanvas) fireworksCanvas.style.display = 'block';
    if (closeFireworksBtn) closeFireworksBtn.classList.add('is-visible');
    animateFireworks();

    // Launch lanterns
    for (let i = 0; i < 6; i++) {
      scheduleFinale(spawnSkyLantern, i * 700);
    }
    if (lanternInterval) clearInterval(lanternInterval);
    lanternInterval = setInterval(spawnSkyLantern, 2200);

    // Initial big fireworks
    scheduleFinale(() => createFirework(window.innerWidth * 0.5, window.innerHeight * 0.35), 200);
    scheduleFinale(() => createFirework(window.innerWidth * 0.3, window.innerHeight * 0.25), 600);
    scheduleFinale(() => createFirework(window.innerWidth * 0.7, window.innerHeight * 0.28), 1000);

    // Open Grand Finale Modal
    scheduleFinale(() => {
      if (grandFinaleModal) grandFinaleModal.classList.add('active');
      launchConfettiExplosion();
    }, 1200);
  }

  function stopGrandSurprise() {
    fireworksActive = false;
    clearFinaleTimeouts();
    if (fireworksCanvas) {
      fireworksCanvas.style.display = 'none';
      if (fwCtx) fwCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    }
    if (lanternInterval) {
      clearInterval(lanternInterval);
      lanternInterval = null;
    }
    if (grandFinaleModal) grandFinaleModal.classList.remove('active');
    if (closeFireworksBtn) closeFireworksBtn.classList.remove('is-visible');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (grandSurpriseBtn) grandSurpriseBtn.addEventListener('click', launchGrandSurprise);
  if (closeFinaleBtn) closeFinaleBtn.addEventListener('click', stopGrandSurprise);
  if (closeFireworksBtn) closeFireworksBtn.addEventListener('click', stopGrandSurprise);

  // --- 12. SMOOTH SECTION NAVIGATION ---
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
