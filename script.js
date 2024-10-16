const nouns = ['dog', 'cat', 'apple', 'car', 'teacher', 'book', 'planet', 'house', 'computer', 'pizza', 'ghost', 'pumpkin', 'witch', 'skeleton', 'candy', 'zombie'];
const verbs = ['eats', 'drives', 'writes', 'jumps', 'flies', 'types', 'runs', 'reads', 'sings', 'plays', 'haunts', 'scares'];
const adjectives = ['quick', 'lazy', 'red', 'delicious', 'happy', 'smart', 'bright', 'loud', 'green', 'funny', 'spooky', 'creepy', 'eerie'];
const adverbs = ['quickly', 'slowly', 'happily', 'loudly', 'carefully', 'quietly', 'sadly', 'eagerly', 'frightfully'];
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

function createShapes(count) {
    for (let i = 0; i < count; i++) {
        const shape = document.createElement('div');
        shape.classList.add('background-shape', `shape${(i % 3) + 1}`);
        shape.setAttribute('draggable', true);
        document.body.appendChild(shape);
        moveShape(shape);
        addDragEvents(shape);
    }
}

function moveShape(shape) {
    let posX = Math.random() * (window.innerWidth - shape.offsetWidth);
    let posY = Math.random() * (window.innerHeight - shape.offsetHeight);
    let speedX = (Math.random() - 0.5) * 2;
    let speedY = (Math.random() - 0.5) * 2;

    function animate() {
        posX += speedX;
        posY += speedY;

        if (posX <= 0 || posX + shape.offsetWidth >= window.innerWidth) {
            speedX = -speedX;
        }

        if (posY <= 0 || posY + shape.offsetHeight >= window.innerHeight) {
            speedY = -speedY;
        }

        shape.style.transform = `translate(${posX}px, ${posY}px)`;
        requestAnimationFrame(animate);
    }

    animate();
}

function addDragEvents(shape) {
    let offsetX, offsetY;

    shape.addEventListener('mousedown', (e) => {
        offsetX = e.clientX - shape.getBoundingClientRect().left;
        offsetY = e.clientY - shape.getBoundingClientRect().top;

        function mouseMoveHandler(e) {
            shape.style.transform = `translate(${e.clientX - offsetX}px, ${e.clientY - offsetY}px)`;
        }

        function mouseUpHandler() {
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        }

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    });
}

createShapes(10);
