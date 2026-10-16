const canvas = document.getElementById("cellCanvas");
const ctx = canvas.getContext("2d");

const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const waterSlider = document.getElementById("water");
const temperatureSlider = document.getElementById("temperature");

const waterValue = document.getElementById("waterValue");
const temperatureValue = document.getElementById("temperatureValue");
const healthStatus = document.getElementById("healthStatus");
const healthMessage = document.getElementById("healthMessage");

let isRunning = false;
let animationId = null;
let pulse = 0;

function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const pixelRatio = window.devicePixelRatio || 1;

    canvas.width = Math.round(rect.width * pixelRatio);
    canvas.height = Math.round(rect.height * pixelRatio);

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    drawCell();
}

function updateHealth() {
    const water = Number(waterSlider.value);
    const temperature = Number(temperatureSlider.value);

    waterValue.textContent = water + "%";
    temperatureValue.textContent = temperature + "°C";

    // Simplified educational model, not a medical or biological prediction.
    const waterOkay = water >= 40 && water <= 90;
    const temperatureOkay = temperature >= 20 && temperature <= 45;

    if (waterOkay && temperatureOkay) {
        healthStatus.textContent = "Healthy 🟢";
        healthMessage.textContent = "Your cell is doing well.";
        healthStatus.style.color = "#95e6b3";
    } else if (
        (water >= 20 && water <= 100) &&
        temperature >= 10 && temperature <= 60
    ) {
        healthStatus.textContent = "Stressed 🟡";
        healthMessage.textContent =
            "The environment is outside this model's preferred range.";
        healthStatus.style.color = "#facc15";
    } else {
        healthStatus.textContent = "Critical 🔴";
        healthMessage.textContent =
            "These extreme settings are marked as critical in this simplified model.";
        healthStatus.style.color = "#fb7185";
    }
}

function drawCell() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;

    const water = Number(waterSlider.value);

    // Water changes cell size: 0% = smaller, 100% = larger.
    const waterScale = 0.55 + (water / 100) * 0.65;

    // Gentle pulse when the simulation is running.
    const pulseScale = isRunning
        ? 1 + Math.sin(pulse) * 0.025
        : 1;

    const cellWidth = Math.min(width * 0.76, 540)
        * waterScale * pulseScale;
    const cellHeight = Math.min(height * 0.72, 320)
        * waterScale * pulseScale;

   // Jiggly cell membrane
const points = 64;
const membrane = [];

for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2;

const wobble =
    Math.sin(pulse * 1.7 + i * 0.45) * 0.018 +
    Math.sin(pulse * 2.3 + i * 0.21) * 0.012;
    
    const radiusX = (cellWidth / 2) * (1 + wobble);
    const radiusY = (cellHeight / 2) * (1 + wobble);

    membrane.push({
        x: centerX + Math.cos(angle) * radiusX,
        y: centerY + Math.sin(angle) * radiusY
    });
}

ctx.beginPath();

ctx.moveTo(membrane[0].x, membrane[0].y);

for (let i = 0; i < points; i++) {
    const current = membrane[i];
    const next = membrane[(i + 1) % points];

    const midpointX = (current.x + next.x) / 2;
    const midpointY = (current.y + next.y) / 2;

    ctx.quadraticCurveTo(
        current.x,
        current.y,
        midpointX,
        midpointY
    );
}

ctx.closePath();

ctx.fillStyle = "#B7E4C7";
ctx.fill();

ctx.lineWidth = 5;
ctx.strokeStyle = "#52B788";
ctx.stroke();

    // Nucleus
    const nucleusScale = Math.min(width, height) * 0.001;
    const nucleusWidth = Math.min(width * 0.19, 95);
    const nucleusHeight = Math.min(height * 0.24, 70);

    ctx.beginPath();
    ctx.ellipse(
        centerX, centerY,
        nucleusWidth / 2, nucleusHeight / 2,
        0, 0, Math.PI * 2
    );
    ctx.fillStyle = "#9D4EDD";
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#6A1B9A";
    ctx.stroke();

    // Nucleus label
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Nucleus", centerX, centerY);

    // Small decorative organelles
    const organelles = [
        [-0.30, -0.10],
        [0.28, -0.12],
        [-0.20, 0.22],
        [0.31, 0.19]
    ];

    organelles.forEach(([x, y], index) => {
        const ox = centerX + x * cellWidth;
        const oy = centerY + y * cellHeight;

        ctx.beginPath();
        ctx.ellipse(
            ox, oy,
            10 + (index % 2) * 3,
            6 + (index % 2) * 2,
            0.3, 0, Math.PI * 2
        );
        ctx.fillStyle = "#F4A261";
        ctx.fill();
        ctx.strokeStyle = "#D97736";
        ctx.lineWidth = 2;
        ctx.stroke();
    });
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

waterSlider.addEventListener("input", () => {
    updateHealth();
    drawCell();
});

temperatureSlider.addEventListener("input", updateHealth);

window.addEventListener("resize", resizeCanvas);

updateHealth();
resizeCanvas();
