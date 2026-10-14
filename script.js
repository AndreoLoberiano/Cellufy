const canvas = document.getElementById("cellCanvas");
const ctx = canvas.getContext("2d");

const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");

let isRunning = false;
let animationId = null;
let pulse = 0;

function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;

    drawCell();
}

function drawCell() {
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;
const waterSlider = document.getElementById("water");
const waterLevel = Number(waterSlider.value);

// 80 is our normal water level
const waterScale = 0.6 + (waterLevel / 100) * 0.5;
    // Gentle pulsing effect
    const pulseScale = 1 + Math.sin(pulse) * 0.025;

   const cellWidth = Math.min(width * 0.66, 920) * pulseScale * waterScale;
const cellHeight = Math.min(height * 0.55, 390) * pulseScale * waterScale;
    // Cell membrane
    ctx.beginPath();
    ctx.ellipse(
        centerX,
        centerY,
        cellWidth / 2,
        cellHeight / 2,
        0,
        0,
        Math.PI * 2
    );
    ctx.fillStyle = "#B7E4C7";
    ctx.fill();
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#52B788";
    ctx.stroke();

    // Nucleus
    const nucleusRadiusX = Math.min(width * 0.09, 120);
    const nucleusRadiusY = Math.min(height * 0.13, 90);

    ctx.beginPath();
    ctx.ellipse(
        centerX,
        centerY,
        nucleusRadiusX,
        nucleusRadiusY,
        0,
        0,
        Math.PI * 2
    );
    ctx.fillStyle = "#9D4EDD";
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#6A1B9A";
    ctx.stroke();

    // Nucleus label
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 18px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Nucleus", centerX, centerY);
}

function animate() {
    if (!isRunning) return;

    pulse += 0.045;
    drawCell();

    animationId = requestAnimationFrame(animate);
}

startButton.addEventListener("click", () => {
    if (isRunning) return;

    isRunning = true;
    animate();
});

pauseButton.addEventListener("click", () => {
    isRunning = false;

    if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }

    drawCell();
});

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
waterSlider.addEventListener("input", drawCell);
