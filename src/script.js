// SOUNDCORE MICROSITE LOGIC

// ============================================================
// --- QUIZ DATA ---
// ============================================================

const QUESTIONS = [
  {
    id: 'q1',
    question: 'What do you listen to the most?',
    subtitle: 'Pick the vibe that best describes your sound world.',
    options: [
      { id: 'lofi',       label: 'Lo-fi',       emoji: '🎧', description: 'Deep focus or evening chill.' },
      { id: 'edm',        label: 'EDM',         emoji: '🔥', description: 'High energy and heavy bass.' },
      { id: 'indie',      label: 'Indie',       emoji: '🌊', description: 'Pure vocals and acoustic vibes.' },
      { id: 'gaming',     label: 'Gaming OST',  emoji: '🎮', description: 'Cinematic scores and sharp alerts.' },
      { id: 'sad',        label: 'Sad Songs',   emoji: '💔', description: 'Raw emotion and subtle layers.' },
      { id: 'nightdrive', label: 'Night Drive', emoji: '🚗', description: 'Synthwave and immersive rhythms.' },
    ],
  },
  {
    id: 'q2',
    question: 'When do you listen to music the most?',
    subtitle: 'Your listening habits reveal more than you think.',
    options: [
      { id: 'morning',  label: 'Morning Routine', emoji: '☀️', description: 'Starting the day with energy.' },
      { id: 'commute',  label: 'On the Go',       emoji: '🚇', description: 'Commuting, walking, transit.' },
      { id: 'work',     label: 'While Working',   emoji: '💻', description: 'Focus mode, deep work.' },
      { id: 'workout',  label: 'Working Out',     emoji: '🏋️', description: 'Pumping iron, running hard.' },
      { id: 'night',    label: 'Late at Night',   emoji: '🌙', description: 'Winding down, alone time.' },
      { id: 'anytime',  label: 'All Day Long',    emoji: '🔁', description: 'Music never stops for me.' },
    ],
  },
  {
    id: 'q3',
    question: 'What matters most to you in audio?',
    subtitle: 'Choose what defines your ideal listening experience.',
    options: [
      { id: 'bass',      label: 'Heavy Bass',       emoji: '💥', description: 'Feel the thump in your chest.' },
      { id: 'clarity',   label: 'Crystal Clarity',  emoji: '💎', description: 'Hear every detail, every breath.' },
      { id: 'immersion', label: 'Full Immersion',   emoji: '🌌', description: 'Get lost in the soundscape.' },
      { id: 'comfort',   label: 'All-Day Comfort',  emoji: '😌', description: 'Wear it for hours, no fatigue.' },
      { id: 'silence',   label: 'Noise Cancelling', emoji: '🔇', description: 'Block the world out completely.' },
      { id: 'wireless',  label: 'True Freedom',     emoji: '🎯', description: 'No wires, no limits.' },
    ],
  },
];

// ============================================================
// --- PERSONA SCORING MAP ---
// ============================================================

const PERSONA_SCORES = {
  lofi:       { zen: 3, pulsar: 0, surfer: 1, apex: 0, echo: 1, drifter: 1 },
  edm:        { zen: 0, pulsar: 3, surfer: 0, apex: 1, echo: 0, drifter: 2 },
  indie:      { zen: 1, pulsar: 0, surfer: 3, apex: 0, echo: 2, drifter: 0 },
  gaming:     { zen: 0, pulsar: 1, surfer: 0, apex: 3, echo: 0, drifter: 1 },
  sad:        { zen: 1, pulsar: 0, surfer: 1, apex: 0, echo: 3, drifter: 1 },
  nightdrive: { zen: 1, pulsar: 1, surfer: 0, apex: 1, echo: 0, drifter: 3 },
  morning:    { zen: 1, pulsar: 2, surfer: 1, apex: 0, echo: 0, drifter: 0 },
  commute:    { zen: 2, pulsar: 1, surfer: 1, apex: 0, echo: 1, drifter: 2 },
  work:       { zen: 3, pulsar: 0, surfer: 1, apex: 2, echo: 0, drifter: 0 },
  workout:    { zen: 0, pulsar: 3, surfer: 0, apex: 1, echo: 0, drifter: 1 },
  night:      { zen: 1, pulsar: 0, surfer: 2, apex: 1, echo: 2, drifter: 3 },
  anytime:    { zen: 1, pulsar: 1, surfer: 1, apex: 1, echo: 1, drifter: 1 },
  bass:       { zen: 0, pulsar: 3, surfer: 0, apex: 1, echo: 0, drifter: 2 },
  clarity:    { zen: 1, pulsar: 0, surfer: 3, apex: 2, echo: 1, drifter: 0 },
  immersion:  { zen: 2, pulsar: 1, surfer: 1, apex: 1, echo: 1, drifter: 3 },
  comfort:    { zen: 3, pulsar: 0, surfer: 2, apex: 0, echo: 2, drifter: 1 },
  silence:    { zen: 2, pulsar: 0, surfer: 0, apex: 2, echo: 2, drifter: 2 },
  wireless:   { zen: 0, pulsar: 2, surfer: 1, apex: 3, echo: 0, drifter: 1 },
};

const PERSONAS = {
  zen: {
    name: 'The Zen Master',
    description: 'You find peace in the subtle textures of sound. You don\'t just listen — you breathe with the music.',
    glow: 'bg-green-500/20',
  },
  pulsar: {
    name: 'The Power Pulsar',
    description: 'Vibrant and energetic. You need sound that hits as hard as your lifestyle. Pure bass, zero compromise.',
    glow: 'bg-orange-500/20',
  },
  surfer: {
    name: 'The Soul Surfer',
    description: 'You value clarity and depth. You want to hear every breath and every string pluck as if they were right there.',
    glow: 'bg-cyan-500/20',
  },
  apex: {
    name: 'The Apex Observer',
    description: 'Precision is your priority. Every detail matters, from distant footsteps to a soaring cinematic crescendo.',
    glow: 'bg-purple-500/20',
  },
  echo: {
    name: 'The Empathy Echo',
    description: 'Music is your refuge. You connect with the emotional weight of every lyric and harmony.',
    glow: 'bg-rose-500/20',
  },
  drifter: {
    name: 'The Night Drifter',
    description: 'You use music to disconnect from the noise and enter your own neon world. Immersive sound is your fuel.',
    glow: 'bg-blue-500/20',
  },
};

// ============================================================
// --- QUIZ STATE ---
// ============================================================

let currentQuestion = 0;
let userAnswers = [];

// ============================================================
// --- INITIALIZATION ---
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    renderQuestion(0);
    lucide.createIcons();
    initNavbar();
});

// ============================================================
// --- SCROLL LOGIC ---
// ============================================================

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ============================================================
// --- QUIZ RENDER ---
// ============================================================

function renderQuestion(index) {
    const q = QUESTIONS[index];
    const grid = document.getElementById('mood-grid');
    const titleEl = document.getElementById('quiz-title');
    const subtitleEl = document.getElementById('quiz-subtitle');
    const progressEl = document.getElementById('quiz-progress');
    const progressBarEl = document.getElementById('quiz-progress-bar');

    if (!grid) return;

    if (titleEl) titleEl.innerText = q.question;
    if (subtitleEl) subtitleEl.innerText = q.subtitle;
    if (progressEl) progressEl.innerText = `${index + 1} / ${QUESTIONS.length}`;
    if (progressBarEl) progressBarEl.style.width = `${(index / QUESTIONS.length) * 100}%`;

    grid.style.opacity = '0';
    grid.style.transform = 'translateY(16px)';

    setTimeout(() => {
        grid.innerHTML = '';

        q.options.forEach((option) => {
            const card = document.createElement('div');
            card.className = "cursor-pointer p-8 rounded-[32px] border-2 border-white/5 bg-[#111827] hover:border-sky-500/50 hover:bg-[#111827]/80 transition-all duration-500 group";
            card.innerHTML = `
                <div class="text-4xl mb-6 transform group-hover:scale-110 transition-transform">${option.emoji}</div>
                <h3 class="text-xl font-bold mb-2 uppercase tracking-tight">${option.label}</h3>
                <p class="text-gray-500 text-sm leading-relaxed">${option.description}</p>
            `;
            card.onclick = () => selectAnswer(option.id);
            grid.appendChild(card);
        });

        grid.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        grid.style.opacity = '1';
        grid.style.transform = 'translateY(0)';
        lucide.createIcons();
    }, 300);
}

function selectAnswer(answerId) {
    userAnswers.push(answerId);
    const next = currentQuestion + 1;

    if (next < QUESTIONS.length) {
        currentQuestion = next;
        renderQuestion(currentQuestion);
        const progressBarEl = document.getElementById('quiz-progress-bar');
        if (progressBarEl) progressBarEl.style.width = `${(next / QUESTIONS.length) * 100}%`;
    } else {
        const persona = computePersona(userAnswers);
        triggerResult(persona);
    }
}

// ============================================================
// --- PERSONA COMPUTATION ---
// ============================================================

function computePersona(answers) {
    const totals = { zen: 0, pulsar: 0, surfer: 0, apex: 0, echo: 0, drifter: 0 };
    answers.forEach(answerId => {
        const scores = PERSONA_SCORES[answerId];
        if (scores) Object.keys(scores).forEach(p => totals[p] += scores[p]);
    });
    const winner = Object.entries(totals).sort((a, b) => b[1] - a[1])[0][0];
    return PERSONAS[winner];
}

// ============================================================
// --- RESULT LOGIC ---
// ============================================================

let isProcessing = false;

function triggerResult(personaData) {
    if (isProcessing) return;

    const resultSection = document.getElementById('result-section');
    const loadingUI = document.getElementById('ai-loading');
    const cardUI = document.getElementById('persona-card');

    resultSection.classList.remove('hidden');
    resultSection.classList.add('flex');
    loadingUI.classList.remove('hidden');
    cardUI.classList.add('hidden');

    scrollToSection('result-section');
    isProcessing = true;

    const progressBarEl = document.getElementById('quiz-progress-bar');
    if (progressBarEl) progressBarEl.style.width = '100%';

    setTimeout(() => {
        displayPersona(personaData);
        isProcessing = false;
    }, 2500);
}

function displayPersona(data) {
    const loadingUI = document.getElementById('ai-loading');
    const cardUI = document.getElementById('persona-card');
    const nameEl = document.getElementById('result-name');
    const descEl = document.getElementById('result-description');
    const glowEl = document.getElementById('persona-bg-glow');

    loadingUI.classList.add('hidden');
    cardUI.classList.remove('hidden');

    nameEl.innerText = data.name;
    descEl.innerText = `"${data.description}"`;
    glowEl.className = "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] transition-all duration-1000 " + data.glow;

    lucide.createIcons();
}

function resetExperience() {
    currentQuestion = 0;
    userAnswers = [];

    const resultSection = document.getElementById('result-section');
    resultSection.classList.add('hidden');
    resultSection.classList.remove('flex');

    const progressBarEl = document.getElementById('quiz-progress-bar');
    if (progressBarEl) progressBarEl.style.width = '0%';

    renderQuestion(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================
// --- DOWNLOAD STORY CARD ---
// ============================================================

function downloadStoryCard() {
    const card = document.getElementById('persona-card');
    const btn = document.getElementById('download-btn');

    // Loading state
    btn.innerHTML = '<i data-lucide="loader-2" size="20" class="animate-spin"></i> Generating...';
    btn.disabled = true;
    lucide.createIcons();

    html2canvas(card, {
        backgroundColor: '#111827',
        scale: 2,
        useCORS: true,
        logging: false,
        ignoreElements: (el) => el.id === 'persona-bg-glow', // skip blur glow biar bersih
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'soundcore-story-card.png';
        link.href = canvas.toDataURL('image/png');
        link.click();

        // Reset tombol
        btn.innerHTML = '<i data-lucide="download" size="20"></i> SAVE STORY CARD';
        btn.disabled = false;
        lucide.createIcons();
    }).catch(err => {
        console.error('[Soundcore] Download failed:', err);
        btn.innerHTML = '<i data-lucide="download" size="20"></i> SAVE STORY CARD';
        btn.disabled = false;
        lucide.createIcons();
    });
}

// ============================================================
// --- ANC SIMULATION WITH AUDIO ---
// ============================================================

import musicFile from './assets/music.mp3';
import noiseFile from './assets/crowd-noise.mp3';

const musicAudio = new Audio(musicFile);
const noiseAudio = new Audio(noiseFile);

// penting untuk mobile
musicAudio.preload = 'auto';
noiseAudio.preload = 'auto';

musicAudio.loop = true;
noiseAudio.loop = true;

// default volume
musicAudio.volume = 0.2;
noiseAudio.volume = 0.8;

// ancActive false = Noisy Reality
// ancActive true  = Soundcore Focus
let ancActive = false;
let audioStarted = false;

// ============================================================
// START AUDIO
// ============================================================

async function startAudioIfNeeded() {
    if (audioStarted) return;

    try {
        await musicAudio.play();
        await noiseAudio.play();

        // force sync
        musicAudio.currentTime = 0;
        noiseAudio.currentTime = 0;

        audioStarted = true;

        console.log('[Soundcore] Audio started');
    } catch (err) {
        console.warn('[Soundcore] Audio blocked:', err);
    }
}

// ============================================================
// SAFE FADE FUNCTION (MOBILE FIX)
// ============================================================

function fadeAudio(audioEl, targetVolume, durationMs) {
    const startVolume = audioEl.volume;
    const volumeDiff = targetVolume - startVolume;

    const startTime = performance.now();

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / durationMs, 1);

        audioEl.volume = Math.max(
            0,
            Math.min(1, startVolume + volumeDiff * progress)
        );

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

// ============================================================
// UI STATES
// ============================================================

function applyNoisyRealityUI() {
    const ring    = document.getElementById('anc-ring');
    const icon    = document.getElementById('anc-icon');
    const waves   = document.getElementById('wave-rings');
    const listOff = document.getElementById('list-off');
    const listOn  = document.getElementById('list-on');
    const btn     = document.getElementById('anc-btn');

    if (!ring) return;

    ring.classList.remove(
        'border-sky-500',
        'bg-sky-500/10',
        'shadow-[0_0_40px_rgba(14,165,233,0.3)]'
    );

    ring.classList.add(
        'border-gray-700',
        'bg-white/5'
    );

    icon.setAttribute('data-lucide', 'eye-off');

    icon.classList.remove('text-sky-400');
    icon.classList.add('text-gray-500');

    waves.classList.add('opacity-0');
    waves.classList.remove('opacity-100');

    listOff.classList.add(
        'scale-105',
        'ring-1',
        'ring-white/20'
    );

    listOff.classList.remove(
        'opacity-30',
        'scale-95'
    );

    listOn.classList.add(
        'opacity-30',
        'scale-95'
    );

    listOn.classList.remove(
        'bg-sky-500/10',
        'border-sky-500/30',
        'scale-105',
        'ring-1',
        'ring-sky-500/20'
    );

    btn.innerText = 'SIMULATE SILENCE';

    btn.classList.remove(
        'bg-sky-500',
        'text-white'
    );

    btn.classList.add(
        'bg-white',
        'text-[#030712]'
    );

    lucide.createIcons();
}

function applySoundcoreFocusUI() {
    const ring    = document.getElementById('anc-ring');
    const icon    = document.getElementById('anc-icon');
    const waves   = document.getElementById('wave-rings');
    const listOff = document.getElementById('list-off');
    const listOn  = document.getElementById('list-on');
    const btn     = document.getElementById('anc-btn');

    if (!ring) return;

    ring.classList.add(
        'border-sky-500',
        'bg-sky-500/10',
        'shadow-[0_0_40px_rgba(14,165,233,0.3)]'
    );

    ring.classList.remove(
        'border-gray-700',
        'bg-white/5'
    );

    icon.setAttribute('data-lucide', 'eye');

    icon.classList.add('text-sky-400');
    icon.classList.remove('text-gray-500');

    waves.classList.remove('opacity-0');
    waves.classList.add('opacity-100');

    listOff.classList.remove(
        'scale-105',
        'ring-1',
        'ring-white/20'
    );

    listOff.classList.add(
        'opacity-30',
        'scale-95'
    );

    listOn.classList.remove(
        'opacity-30',
        'scale-95'
    );

    listOn.classList.add(
        'bg-sky-500/10',
        'border-sky-500/30',
        'scale-105',
        'ring-1',
        'ring-sky-500/20'
    );

    btn.innerText = 'RESTORE REALITY';

    btn.classList.add(
        'bg-sky-500',
        'text-white'
    );

    btn.classList.remove(
        'bg-white',
        'text-[#030712]'
    );

    lucide.createIcons();
}

// ============================================================
// TOGGLE ANC
// ============================================================

async function toggleAnc() {

    // start audio pertama kali
    await startAudioIfNeeded();

    ancActive = !ancActive;

    if (ancActive) {

        // SOUNDCORE FOCUS
        fadeAudio(noiseAudio, 0.0, 1000);
        fadeAudio(musicAudio, 1.0, 1000);

        applySoundcoreFocusUI();

        console.log('[Soundcore] Focus ON');

    } else {

        // NOISY REALITY
        fadeAudio(noiseAudio, 0.8, 1000);
        fadeAudio(musicAudio, 0.2, 1000);

        applyNoisyRealityUI();

        console.log('[Soundcore] Focus OFF');
    }
}

// expose
window.toggleAnc = toggleAnc;

// ============================================================
// --- NAVBAR LOGIC ---
// ============================================================

const SECTIONS = ['hero', 'mood-picker', 'blind-experience', 'booth'];

function initNavbar() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveLink();
    }, { passive: true });

    updateActiveLink();
}

function updateActiveLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    let currentSection = 'hero';

    SECTIONS.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 100) currentSection = id;
        }
    });

    navLinks.forEach(link => {
        if (link.dataset.section === currentSection) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function navTo(sectionId) {
    scrollToSection(sectionId);
}

let mobileMenuOpen = false;

function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
    const menu = document.getElementById('mobile-menu');
    const hamburger = document.getElementById('hamburger');

    if (mobileMenuOpen) {
        menu.classList.remove('hidden');
        menu.classList.add('flex');
        hamburger.classList.add('open');
    } else {
        menu.classList.add('hidden');
        menu.classList.remove('flex');
        hamburger.classList.remove('open');
    }
}

window.scrollToSection = scrollToSection;
window.navTo = navTo;
window.toggleMobileMenu = toggleMobileMenu;
window.selectAnswer = selectAnswer;
window.downloadStoryCard = downloadStoryCard;
window.resetExperience = resetExperience;
window.toggleAnc = toggleAnc;