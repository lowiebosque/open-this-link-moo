
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const buttonsArea = document.getElementById("buttonsArea");

const mainEmoji = document.getElementById("mainEmoji");
const hint = document.getElementById("hint");

const successScreen = document.getElementById("successScreen");
const successMessage = document.getElementById("successMessage");
const backBtn = document.getElementById("backBtn");
const heartsContainer = document.getElementById("heartsContainer");

let noCount = 0;

const noMessages = [
    "Are you sure? 🥺",
    "Think again! 💗",
    "Pretty please? 🥹",
    "Last chance! 💕",
    "Hehe, catch me! 💨",
    "You can still say Yes! 💖"
];

function moveNoButton() {
    const area = buttonsArea.getBoundingClientRect();
    const button = noBtn.getBoundingClientRect();

    const maxX = Math.max(0, area.width - button.width);
    const maxY = Math.max(0, area.height - button.height);

    let x;
    let y;
    let attempts = 0;

    do {
        x = Math.random() * maxX;
        y = Math.random() * maxY;
        attempts++;
    } while (
        attempts < 25 &&
        Math.abs(
            x + button.width / 2 -
            (yesBtn.offsetLeft + yesBtn.offsetWidth / 2)
        ) < (button.width + yesBtn.offsetWidth) / 2 &&
        Math.abs(
            y + button.height / 2 -
            (yesBtn.offsetTop + yesBtn.offsetHeight / 2)
        ) < (button.height + yesBtn.offsetHeight) / 2
    );

    noBtn.style.position = "absolute";
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;

    noCount++;

    const messageIndex = Math.min(noCount - 1, noMessages.length - 1);
    hint.textContent = noMessages[messageIndex];

    if (noCount >= 8) {
        mainEmoji.textContent = "🥹💞";
    } else if (noCount >= 6) {
        mainEmoji.textContent = "😭💗";
    } else if (noCount >= 3) {
        mainEmoji.textContent = "🥺👉👈";
    }
}

noBtn.addEventListener("pointerenter", (event) => {
    if (event.pointerType === "mouse") {
        moveNoButton();
    }
});

noBtn.addEventListener("click", (event) => {
    event.preventDefault();
    moveNoButton();
});

yesBtn.addEventListener("click", () => {
    successMessage.textContent =
        "You just made my day! Thank you for giving me a chance. 💗";

    successScreen.classList.add("show");

    for (let i = 0; i < 25; i++) {
        setTimeout(createHeart, i * 80);
    }
});

backBtn.addEventListener("click", () => {
    successScreen.classList.remove("show");
});

function createHeart() {
    const heart = document.createElement("span");
    heart.classList.add("floating-heart");

    const symbols = ["💗", "💕", "💖", "💘", "💓", "❤️"];

    heart.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];

    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${16 + Math.random() * 22}px`;

    const duration = 4 + Math.random() * 5;
    heart.style.animationDuration = `${duration}s`;

    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

setInterval(createHeart, 500);

window.addEventListener("resize", () => {
    noBtn.style.position = "";
    noBtn.style.left = "";
    noBtn.style.top = "";
});
