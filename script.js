const canvas = document.getElementById("cellCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 450;

function drawCell() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Cell membrane
    ctx.beginPath();
    ctx.ellipse(350, 225, 250, 160, 0, 0, Math.PI * 2);

    ctx.fillStyle = "#b7e4c7";
    ctx.fill();

    ctx.strokeStyle = "#52b788";
    ctx.lineWidth = 8;
    ctx.stroke();

    // Nucleus
    ctx.beginPath();
    ctx.arc(350, 225, 65, 0, Math.PI * 2);

    ctx.fillStyle = "#9d4edd";
    ctx.fill();

    ctx.strokeStyle = "#6a1b9a";
    ctx.lineWidth = 5;
    ctx.stroke();

    // Nucleus label
    ctx.fillStyle = "white";
    ctx.font = "18px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Nucleus", 350, 230);
}

drawCell();
