document.addEventListener('DOMContentLoaded', () => {
    const cardDisplay = document.getElementById('card-display');
    const userInput = document.getElementById('user-input');
    const submitBtn = document.getElementById('submit-btn');
    const skipBtn = document.getElementById('skip-btn'); // New: Skip button
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
    let incorrectAttempts = 0; // New: Track incorrect attempts

    function initialize(newMode) {
        mode = newMode;
        meaning.textContent = '';
        feedback.textContent = '';
        userInput.value = '';
        incorrectAttempts = 0; // Reset attempts on mode change
        skipBtn.style.display = 'none'; // Hide skip button
        
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
            incorrectAttempts = 0; // Reset attempts for new card
            skipBtn.style.display = 'none'; // Hide skip button for new card
        } else {
            cardDisplay.textContent = '🎉';
            feedback.textContent = 'All done!';
            skipBtn.style.display = 'none'; // Hide skip button when all done
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
            incorrectAttempts = 0; // Reset attempts on correct answer
            skipBtn.style.display = 'none'; // Hide skip button
            currentIndex++;
            updateProgressBar();
        } else {
            feedback.textContent = 'Incorrect. Try again.';
            feedback.className = 'incorrect';
            incorrectAttempts++;
            if (incorrectAttempts >= 3) {
                skipBtn.style.display = 'inline-block'; // Show skip button after 3 incorrect attempts
            }
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

    function skipCard() {
        const currentKey = currentKeys[currentIndex];
        const correctAnswer = (mode === 'hiraganaKatakanaWords' || mode === 'kanji') ? currentData[currentKey].romaji : currentData[currentKey];
        const currentMeaning = (mode === 'hiraganaKatakanaWords' || mode === 'kanji') ? currentData[currentKey].meaning : '';

        feedback.textContent = `Skipped. Correct answer was: ${correctAnswer}`;
        meaning.textContent = `Meaning: ${currentMeaning}`;
        feedback.className = 'skipped';
        incorrectAttempts = 0; // Reset attempts on skip
        skipBtn.style.display = 'none'; // Hide skip button
        currentIndex++;
        updateProgressBar();
        userInput.value = ''; // Clear input field

        setTimeout(() => {
            feedback.textContent = '';
            meaning.textContent = '';
            updateFlashcard();
        }, 2000); // Longer delay for skipped cards to show answer
    }

    submitBtn.addEventListener('click', checkAnswer);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });
    skipBtn.addEventListener('click', skipCard); // New: Skip button event listener

    hiraganaBtn.addEventListener('click', () => initialize('hiragana'));
    katakanaBtn.addEventListener('click', () => initialize('katakana'));
    hiraganaKatakanaWordsBtn.addEventListener('click', () => initialize('hiraganaKatakanaWords'));
    kanjiBtn.addEventListener('click', () => initialize('kanji'));

    // Initial load
    initialize('hiragana');
});
