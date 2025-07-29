document.addEventListener('DOMContentLoaded', () => {
    const cardDisplay = document.getElementById('card-display');
    const userInput = document.getElementById('user-input');
    const submitBtn = document.getElementById('submit-btn');
    const feedback = document.getElementById('feedback');
    const meaning = document.getElementById('meaning');
    const progressBar = document.getElementById('progress-bar');

    const hiraganaBtn = document.getElementById('hiragana-btn');
    const katakanaBtn = document.getElementById('katakana-btn');
    const hiraganaKatakanaWordsBtn = document.getElementById('hiragana-katakana-words-btn');
    const kanjiBtn = document.getElementById('kanji-btn');

    let currentData = {};
    let currentKeys = [];
    let currentIndex = 0;
    let mode = 'hiragana'; // hiragana, katakana, hiraganaKatakanaWords, or kanji

    function initialize(newMode) {
        mode = newMode;
        meaning.textContent = '';
        feedback.textContent = '';
        userInput.value = '';

        if (mode === 'hiragana') {
            currentData = hiragana;
        } else if (mode === 'katakana') {
            currentData = katakana;
        } else if (mode === 'hiraganaKatakanaWords') {
            currentData = hiraganaKatakanaWords;
        } else {
            currentData = kanji;
        }

        currentKeys = Object.keys(currentData);
        shuffleArray(currentKeys);
        currentIndex = 0;
        updateFlashcard();
        updateProgressBar();
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function updateFlashcard() {
        if (currentIndex < currentKeys.length) {
            cardDisplay.textContent = currentKeys[currentIndex];
        } else {
            cardDisplay.textContent = '🎉';
            feedback.textContent = 'All done!';
        }
    }

    function updateProgressBar() {
        const progress = (currentIndex / currentKeys.length) * 100;
        progressBar.style.width = `${progress}%`;
        progressBar.setAttribute('aria-valuenow', progress);
    }

    function checkAnswer() {
        const currentKey = currentKeys[currentIndex];
        const correctAnswer = (mode === 'hiraganaKatakanaWords' || mode === 'kanji') ? currentData[currentKey].romaji : currentData[currentKey];

        if (userInput.value.toLowerCase() === correctAnswer) {
            feedback.textContent = 'Correct!';
            feedback.className = 'correct';
            currentIndex++;
            updateProgressBar();
        } else {
            feedback.textContent = 'Incorrect. Try again.';
            feedback.className = 'incorrect';
        }

        if (mode === 'hiraganaKatakanaWords' || mode === 'kanji') {
            meaning.textContent = `Meaning: ${currentData[currentKey].meaning}`;
        }

        setTimeout(() => {
            if (feedback.textContent === 'Correct!') {
                userInput.value = '';
                feedback.textContent = '';
                meaning.textContent = '';
                updateFlashcard();
            }
        }, 1500);
    }

    submitBtn.addEventListener('click', checkAnswer);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });

    hiraganaBtn.addEventListener('click', () => initialize('hiragana'));
    katakanaBtn.addEventListener('click', () => initialize('katakana'));
    hiraganaKatakanaWordsBtn.addEventListener('click', () => initialize('hiraganaKatakanaWords'));
    kanjiBtn.addEventListener('click', () => initialize('kanji'));

    // Initial load
    initialize('hiragana');
});
