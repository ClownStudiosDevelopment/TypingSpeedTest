const nouns = ['dog', 'cat', 'apple', 'car', 'teacher', 'book', 'planet', 'house', 'computer', 'pizza', 'ghost', 'witch', 'pumpkin', 'zombie', 'vampire', 'candy'];
const verbs = ['eats', 'drives', 'writes', 'jumps', 'flies', 'types', 'runs', 'reads', 'sings', 'plays', 'haunts'];
const adjectives = ['quick', 'lazy', 'red', 'delicious', 'happy', 'smart', 'bright', 'loud', 'green', 'funny', 'spooky', 'creepy', 'dark'];
const adverbs = ['quickly', 'slowly', 'happily', 'loudly', 'carefully', 'quietly', 'sadly', 'eagerly', 'angrily'];
const articles = ['the', 'a'];
const prepositions = ['on', 'over', 'under', 'behind', 'beside', 'with', 'near'];

function generateSentence() {
    const article1 = articles[Math.floor(Math.random() * articles.length)];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun1 = nouns[Math.floor(Math.random() * nouns.length)];
    const verb = verbs[Math.floor(Math.random() * verbs.length)];
    const adverb = adverbs[Math.floor(Math.random() * adverbs.length)];
    const preposition = prepositions[Math.floor(Math.random() * prepositions.length)];
    const article2 = articles[Math.floor(Math.random() * articles.length)];
    const noun2 = nouns[Math.floor(Math.random() * nouns.length)];
    return `${article1.charAt(0).toUpperCase() + article1.slice(1)} ${adjective} ${noun1} ${verb} ${adverb} ${preposition} ${article2} ${noun2}.`;
}

const textToTypeElement = document.getElementById('textToType');
const typedText = document.getElementById('typedText');
const resultElement = document.getElementById('result');
const restartButton = document.getElementById('restart');
const pauseButton = document.getElementById('pause');

let startTime;
let isTyping = false;
let isPaused = false;
let pauseStartTime;
let pausedDuration = 0;

function startTyping() {
    const textToType = textToTypeElement.textContent;
    if (!isTyping && typedText.value.length === 1) {
        startTime = new Date();
        isTyping = true;
    }
    if (typedText.value === textToType) {
        const endTime = new Date();
        const timeTaken = (endTime - startTime - pausedDuration) / 1000;
        const wordsPerMinute = (textToType.split(' ').length / timeTaken) * 60;
        resultElement.textContent = `You typed at ${Math.round(wordsPerMinute)} WPM!`;
        textToTypeElement.textContent = generateSentence();
        typedText.value = '';
        isTyping = false;
        pausedDuration = 0;
    }
}

function togglePause() {
    if (!isPaused) {
        isPaused = true;
        pauseStartTime = new Date();
        pauseButton.textContent = 'Continue';
        typedText.disabled = true;
    } else {
        isPaused = false;
        pausedDuration += new Date() - pauseStartTime;
        pauseButton.textContent = 'Pause';
        typedText.disabled = false;
    }
}

function restartGame() {
    typedText.value = '';
    resultElement.textContent = '';
    textToTypeElement.textContent = generateSentence();
    isTyping = false;
    isPaused = false;
    pausedDuration = 0;
    typedText.disabled = false;
    pauseButton.textContent = 'Pause';
}

textToTypeElement.textContent = generateSentence();
typedText.addEventListener('input', startTyping);
restartButton.addEventListener('click', restartGame);
pauseButton.addEventListener('click', togglePause);

const shapes = [];
const shapeCount = 10;

for (let i = 0; i < shapeCount; i++) {
    const shape = document.createElement('div');
    shape.className = 'background-shape';
    const size = Math.random() * 50 + 50; // Size between 50px and 100px
    shape.style.width = `${size}px`;
    shape.style.height = `${size}px`;
    shape.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
    shape.style.position = 'absolute';
    shape.style.top = `${Math.random() * (window.innerHeight - size)}px`;
    shape.style.left = `${Math.random() * (window.innerWidth - size)}px`;
    shape.dx = Math.random() < 0.5 ? 1 : -1; // Direction on x-axis
    shape.dy = Math.random() < 0.5 ? 1 : -1; // Direction on y-axis
    shapes.push(shape);
    document.body.appendChild(shape);
}

function moveShapes() {
    shapes.forEach(shape => {
        const rect = shape.getBoundingClientRect();
        if (rect.right >= window.innerWidth || rect.left <= 0) {
            shape.dx *= -1;
        }
        if (rect.bottom >= window.innerHeight || rect.top <= 0) {
            shape.dy *= -1;
        }
        shape.style.left = `${rect.left + shape.dx}px`;
        shape.style.top = `${rect.top + shape.dy}px`;
    });
    requestAnimationFrame(moveShapes);
}

moveShapes();
