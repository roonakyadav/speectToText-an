// Check for SpeechRecognition support
if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
    alert('Your browser does not support Speech Recognition. Please use Chrome or Firefox.');
}

// Initialize ONE global SpeechRecognition instance
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.interimResults = true;

// Get DOM elements
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const speechOutput = document.getElementById('speech-output');
const saveBtn = document.getElementById('save-btn');
const micIcon = document.getElementById('mic-icon');
const listeningIndicator = document.getElementById('listening-indicator');
const notesContainer = document.getElementById('notes-container');

// State variables
let isListening = false; // Tracks if speech recognition is active
let currentSpeech = '';  // Stores the current recognized speech
let finalText = '';      // Accumulates finalized speech transcripts

// Simple beep sounds
function playBeep(frequency, duration, type) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = type;

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    } catch (e) {
        // Fallback if AudioContext fails
        console.log('Audio not supported');
    }
}

// Event listeners
startBtn.addEventListener('click', () => {
    currentSpeech = ''; // Reset current speech
    finalText = '';     // Reset accumulated final text
    speechOutput.value = '';
    recognition.start();
});

// STOP button MUST work - do NOT auto-restart
stopBtn.addEventListener("click", () => {
    recognition.stop();
});

// Speech recognition events
recognition.onstart = function () {
    console.log('Voice recognition started.');
    isListening = true;
    startBtn.disabled = true;
    stopBtn.disabled = false;
    micIcon.classList.add('listening');
    listeningIndicator.classList.add('active');
    playBeep(800, 0.1, 'sine'); // Start beep
};

recognition.onresult = function (event) {
    let newFinalText = '';     // New finalized speech since last result
    let interimTranscript = ''; // Current interim speech

    // Process each result: finalize confirmed text and collect interim
    for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
            newFinalText += transcript;
        } else {
            interimTranscript += transcript;
        }
    }

    // Accumulate the finalized text
    finalText += newFinalText;

    // Display the accumulated final text plus any current interim text
    speechOutput.value = finalText + interimTranscript;

    // Update current speech for saving
    currentSpeech = finalText + interimTranscript;
};

recognition.onend = function () {
    console.log('Voice recognition ended.');
    isListening = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    micIcon.classList.remove('listening');
    listeningIndicator.classList.remove('active');
    playBeep(600, 0.1, 'sine'); // Stop beep
};

recognition.onerror = function (event) {
    console.error('Speech recognition error:', event.error);
    isListening = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    micIcon.classList.remove('listening');
    listeningIndicator.classList.remove('active');
    alert('Speech recognition error: ' + event.error);
};

// Load notes from localStorage on page load
function loadNotes() {
    try {
        const notes = JSON.parse(localStorage.getItem('speechfx-notes') || '[]');
        console.log('Loaded notes from localStorage:', notes);
        notes.forEach(text => {
            createNote(text, false); // Load without animation for initial load
        });
    } catch (e) {
        console.error('Error loading notes:', e);
    }
}

// Save note and persist to localStorage
function saveNoteToStorage(text) {
    const notes = JSON.parse(localStorage.getItem('speechfx-notes') || '[]');
    notes.push(text);
    localStorage.setItem('speechfx-notes', JSON.stringify(notes));
}

// Create note element
function createNote(text, animate = true) {
    const note = document.createElement('div');
    note.className = 'note';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '&times;';
    deleteBtn.onclick = function () {
        // Remove from localStorage
        const notes = JSON.parse(localStorage.getItem('speechfx-notes') || '[]');
        const index = notes.indexOf(text);
        if (index > -1) {
            notes.splice(index, 1);
            localStorage.setItem('speechfx-notes', JSON.stringify(notes));
        }
        // Remove element
        note.remove();
    };

    note.innerHTML = `<span>${text}</span>`;
    note.appendChild(deleteBtn);
    notesContainer.appendChild(note);

    if (animate) {
        // Trigger animation for new notes
        setTimeout(() => {
            note.classList.add('visible');
        }, 50);
    } else {
        note.classList.add('visible');
    }
}

// Save note
saveBtn.addEventListener('click', () => {
    if (speechOutput.value.trim() === '') {
        alert('No speech to save. Please speak first.');
        return;
    }

    const text = speechOutput.value.trim();
    createNote(text, true);
    saveNoteToStorage(text);

    // Reset speech output
    speechOutput.value = '';
    currentSpeech = '';
});

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    stopBtn.disabled = true;
    loadNotes();
});
