// SOUNDCORE MICROSITE LOGIC

const MOODS = [
  { id: 'lofi', label: 'Lo-fi', emoji: '🎧', description: 'Deep focus or evening chill.' },
  { id: 'edm', label: 'EDM', emoji: '🔥', description: 'High energy and heavy bass.' },
  { id: 'indie', label: 'Indie', emoji: '🌊', description: 'Pure vocals and acoustic vibes.' },
  { id: 'gaming', label: 'Gaming', emoji: '🎮', description: 'Cinematic scores and sharp alerts.' },
  { id: 'sad', label: 'Sad Songs', emoji: '💔', description: 'Raw emotion and subtle layers.' },
  { id: 'nightdrive', label: 'Night Drive', emoji: '🚗', description: 'Synthwave and immersive rhythms.' },
];

const PERSONAS = {
  lofi: {
    name: 'The Zen Master',
    description: 'You find peace in the subtle textures of sound. You don’t just listen; you breathe with the music.',
    glow: 'bg-green-500/20',
  },
  edm: {
    name: 'The Power Pulsar',
    description: 'Vibrant and energetic. You need sound that hits as hard as your lifestyle. Pure bass, zero compromise.',
    glow: 'bg-orange-500/20',
  },
  indie: {
    name: 'The Soul Surfer',
    description: 'You value clarity and depth. You want to hear every breath and every string pluck as if they were right there.',
    glow: 'bg-cyan-500/20',
  },
  gaming: {
    name: 'The Apex Observer',
    description: 'Precision is your priority. Every detail matters, from distant footsteps to a soaring cinematic crescendo.',
    glow: 'bg-purple-500/20',
  },
  sad: {
    name: 'The Empathy Echo',
    description: 'Music is your refuge. You connect with the emotional weight of every lyric and harmony.',
    glow: 'bg-rose-500/20',
  },
  nightdrive: {
    name: 'The Night Drifter',
    description: 'You use music to disconnect from the noise and enter your own neon world. Immersive sound is your fuel.',
    glow: 'bg-blue-500/20',
  },
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    renderMoods();
    lucide.createIcons();
});

// --- SCROLL LOGIC ---
function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
    }
}

// --- MOOD PICKER RENDER ---
function renderMoods() {
    const grid = document.getElementById('mood-grid');
    if (!grid) return;

    MOODS.forEach((mood, idx) => {
        const card = document.createElement('div');
        card.className = "cursor-pointer p-8 rounded-[32px] border-2 border-white/5 bg-[#111827] hover:border-sky-500/50 hover:bg-[#111827]/80 transition-all duration-500 group";
        card.innerHTML = `
            <div class="text-4xl mb-6 transform group-hover:scale-110 transition-transform">${mood.emoji}</div>
            <h3 class="text-xl font-bold mb-2 uppercase tracking-tight">${mood.label}</h3>
            <p class="text-gray-500 text-sm leading-relaxed">${mood.description}</p>
        `;
        card.onclick = () => selectMood(mood);
        grid.appendChild(card);
    });
}

// --- PERSONA LOGIC ---
let isProcessing = false;

function selectMood(mood) {
    if (isProcessing) return;
    
    // UI Transitions
    const resultSection = document.getElementById('result-section');
    const loadingUI = document.getElementById('ai-loading');
    const cardUI = document.getElementById('persona-card');
    
    resultSection.classList.remove('hidden');
    resultSection.classList.add('flex');
    loadingUI.classList.remove('hidden');
    cardUI.classList.add('hidden');
    
    scrollToSection('result-section');
    isProcessing = true;

    // Simulate AI Mapping engine
    setTimeout(() => {
        const personaData = PERSONAS[mood.id];
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
    
    lucide.createIcons(); // Refresh icons inside the new UI
}

function resetExperience() {
    const resultSection = document.getElementById('result-section');
    resultSection.classList.add('hidden');
    resultSection.classList.remove('flex');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- ANC SIMULATION ---
let ancActive = false;

function toggleAnc() {
    ancActive = !ancActive;
    
    const ring = document.getElementById('anc-ring');
    const icon = document.getElementById('anc-icon');
    const waves = document.getElementById('wave-rings');
    const listOff = document.getElementById('list-off');
    const listOn = document.getElementById('list-on');
    const btn = document.getElementById('anc-btn');
    
    if (ancActive) {
        ring.classList.add('border-sky-500', 'bg-sky-500/10', 'shadow-[0_0_40px_rgba(14,165,233,0.3)]');
        ring.classList.remove('border-gray-700', 'bg-white/5');
        
        icon.setAttribute('data-lucide', 'eye');
        icon.classList.add('text-sky-400');
        icon.classList.remove('text-gray-500');
        
        waves.classList.remove('opacity-0');
        waves.classList.add('opacity-100');
        
        listOff.classList.remove('scale-105', 'ring-1', 'ring-white/20');
        listOff.classList.add('opacity-30', 'scale-95');
        
        listOn.classList.remove('opacity-30', 'scale-95');
        listOn.classList.add('bg-sky-500/10', 'border-sky-500/30', 'scale-105', 'ring-1', 'ring-sky-500/20');
        
        btn.innerText = 'RESTORE REALITY';
        btn.classList.add('bg-sky-500', 'text-white');
        btn.classList.remove('bg-white', 'text-[#030712]');
    } else {
        ring.classList.remove('border-sky-500', 'bg-sky-500/10', 'shadow-[0_0_40px_rgba(14,165,233,0.3)]');
        ring.classList.add('border-gray-700', 'bg-white/5');
        
        icon.setAttribute('data-lucide', 'eye-off');
        icon.classList.remove('text-sky-400');
        icon.classList.add('text-gray-500');
        
        waves.classList.add('opacity-0');
        waves.classList.remove('opacity-100');
        
        listOff.classList.add('scale-105', 'ring-1', 'ring-white/20');
        listOff.classList.remove('opacity-30', 'scale-95');
        
        listOn.classList.add('opacity-30', 'scale-95');
        listOn.classList.remove('bg-sky-500/10', 'border-sky-500/30', 'scale-105', 'ring-1', 'ring-sky-500/20');
        
        btn.innerText = 'SIMULATE SILENCE';
        btn.classList.remove('bg-sky-500', 'text-white');
        btn.classList.add('bg-white', 'text-[#030712]');
    }
    
    lucide.createIcons();
}
