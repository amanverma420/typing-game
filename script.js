document.addEventListener('DOMContentLoaded', () => {
    const textToType = document.getElementById('text-to-type');
    const typingInput = document.getElementById('typing-input');
    const speedElement = document.getElementById('speed');
    const accuracyElement = document.getElementById('accuracy');
    const messageArea = document.getElementById('message-area');

    const wordDictionary = [
        "apple", "banana", "cherry", "date", "elder", "fig", "grape", "honey", "ice", "juice",
        "kiwi", "lemon", "mango", "nectar", "orange", "peach", "quince", "raspberry", "strawberry", "tangerine",
        "umbrella", "violet", "water", "xray", "yellow", "zebra", "cat", "dog", "bird", "fish",
        "house", "tree", "river", "mountain", "ocean", "sun", "moon", "star", "cloud", "rain",
        "book", "pen", "paper", "computer", "phone", "car", "bike", "train", "plane", "ship",
        "happy", "sad", "angry", "calm", "excited", "tired", "hungry", "thirsty", "hot", "cold",
        "big", "small", "fast", "slow", "high", "low", "long", "short", "new", "old"
    ];

    let currentText = "";
    let startTime = null;
    let errors = 0;

    function generateRandomWord() {
        return wordDictionary[Math.floor(Math.random() * wordDictionary.length)];
    }

    function initializeGame() {
        currentText = generateRandomWord(); 
        textToType.innerHTML = currentText;
        typingInput.value = "";
        errors = 0;
        startTime = new Date();
        updateFeedback();
    }

    function updateFeedback() {
        const elapsed = (new Date() - startTime) / 60000;
        const charsTyped = typingInput.value.length;

        const speed = elapsed > 0 ? Math.round((charsTyped / 5) / elapsed) : 0;
        speedElement.textContent = speed + ' WPM';

        const accuracy = charsTyped > 0 ? Math.max(0, Math.round(((charsTyped - errors) / charsTyped) * 100)) : 100;
        accuracyElement.textContent = accuracy;
    }

    function updateTextHighlight(typed) {
        let result = "";

        for (let i = 0; i < currentText.length; i++) {
            if (i < typed.length) {
                result += typed[i] === currentText[i]
                    ? `<span class="correct">${currentText[i]}</span>`
                    : `<span class="incorrect">${currentText[i]}</span>`;
            } else {
                result += `<span class="cursor">${currentText[i]}</span>`;
            }
        }

        textToType.innerHTML = result;
    }

    typingInput.addEventListener("input", () => {
        const typed = typingInput.value;
        errors = 0;
        for (let i = 0; i < typed.length; i++) {
            if (typed[i] !== currentText[i]) errors++;
        }

        updateTextHighlight(typed);
        updateFeedback();

        if (typed === currentText) { 
            messageArea.textContent = `✓ "${currentText}" completed! New word...`;
            setTimeout(() => {
                messageArea.textContent = "";
                initializeGame();
            }, 1500);
        }
    });

    // Allow backspace correction
    typingInput.addEventListener("keydown", (e) => {
        if (e.key === 'Backspace') {
            setTimeout(updateFeedback, 10); 
        }
    });

    initializeGame();
});
