const canvas = document.getElementById("canvas");
let tx = window.innerWidth;
let ty = window.innerHeight;

canvas.style.backgroundColor = "#b0b0ff";
canvas.width = tx;
canvas.height = ty;

let mousex = 0;
let mousey = 0;

const c = canvas.getContext("2d");

addEventListener("mousemove", (e) => {
  mousex = e.clientX;
  mousey = e.clientY;
});

class Ball {
  constructor(x, y) {
    this.color = this.randomColor();
    this.radius = Math.random() * 20 + 14;
    this.startradius = this.radius;
    this.x = x ?? Math.random() * (tx - this.radius * 2) + this.radius;
    this.y = y ?? Math.random() * (ty - this.radius * 2) + this.radius;
    this.dy = Math.random() * 2;
    this.dx = Math.round((Math.random() - 0.5) * 10);
    this.vel = Math.random() / 5;
    this.grav = 0.99;
    this.draw();
  }
  randomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r},${g},${b})`;
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    c.fillStyle = this.color;
    c.fill();
  }
  update() {
    this.x += this.dx;
    this.y += this.dy;
    if (this.x + this.radius >= tx || this.x - this.radius <= 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius >= ty || this.y - this.radius <= 0) {
      this.dy = -this.dy * this.grav;
    } else {
      this.dy += this.vel;
    }
    this.draw();
  }
}

let balls = [];
for (let i = 0; i < 50; i++) {
  balls.push(new Ball());
}

function animate() {
  if (tx != window.innerWidth || ty != window.innerHeight) {
    tx = window.innerWidth;
    ty = window.innerHeight;
    canvas.width = tx;
    canvas.height = ty;
  }
  c.clearRect(0, 0, tx, ty);
  balls.forEach((ball) => {
    ball.update();
  });
  ballScaleDouble();
  requestAnimationFrame(animate);
}

animate();

function ballScaleDouble() {
  balls.forEach((ball) => {
    let distance = Math.sqrt(
      Math.pow(mousex - ball.x, 2) + Math.pow(mousey - ball.y, 2)
    );
    if (distance < 50 && ball.radius < ball.startradius * 2) {
      ball.radius += 1;
    } else if (ball.radius > ball.startradius) {
      ball.radius -= 1;
    }
  });
}
function addBallByUserClick(e) {
  balls.push(new Ball(e.clientX, e.clientY));
}
window.addEventListener("click", addBallByUserClick);
