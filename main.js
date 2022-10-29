const canvas = document.createElement("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.style.background = "#f1f1f1";

document.getElementById("app").append(canvas);

const ctx = canvas.getContext("2d");

class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Planet {
  constructor(color, atmosphere, position, size) {
    this.color = color;
    this.atmosphere = atmosphere;
    this.position = position;
    this.size = size;
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.strokeStyle = this.atmosphere;
    // ctx.lineWidth = 10;
    ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
  }
}

class Sun extends Planet {
  constructor(position) {
    super("red", "yellow", position, 100);
  }
}

class Earth extends Planet {
  constructor(center, radius) {
    super("green", "blue", new Position(center.x + radius, center.y + radius), 40);
    this._radius = radius;
    this.center = center;
    this.alpha = 0;
  }

  get radius() {
    return this._radius + this.size;
  }

  rotate() {
    this.alpha += 0.05 / Math.PI;
    this.position.x = this.radius * Math.sin(this.alpha) + this.center.x;
    this.position.y = this.radius * Math.cos(this.alpha) + this.center.y;
    if (alpha >= 2 * Math.PI) alpha = 0;
  }

  render(ctx) {
    super.render(ctx);
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(this.position.x - 10, this.position.y, this.size / 2, 0, 2 * Math.PI);
    ctx.fill();
  }
}

const sun = new Sun(new Position(canvas.width / 2, canvas.height / 2));
const earth = new Earth(sun.position, sun.size + 100);

let alpha = 0;

window.requestAnimationFrame(renderPlanets);

function renderPlanets() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  earth.rotate();
  earth.render(ctx);
  sun.render(ctx);
  window.requestAnimationFrame(renderPlanets);
}
