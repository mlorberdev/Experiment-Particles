import { particles, ctx, w, h, stop, dropping } from "./script.js";

export function no1() {

  // CANVAS DRAW (ANIMATION)
  for (let i = 0; i < particles.length; i++) {

    let p = particles[i];

    ctx.beginPath();
    let gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);

    gradient.addColorStop(.1, p.invert);
    gradient.addColorStop(.3, p.color);
    gradient.addColorStop(.6, "transparent");

    ctx.shadowColor = "#00000055";
    ctx.shadowOffsetX = p.radius * 0.8;
    ctx.shadowOffsetY = p.radius * 0.8;
    ctx.fillStyle = gradient;
    ctx.arc(p.x, p.y, p.radius, Math.PI * 2, false);
    ctx.fill();

    // add velocity illusion

    p.x += p.vx;
    p.y += p.vy;

    // bounce off the sides

    if (p.x < -20) { stop === false ? p.vx = -p.vx : particles.splice(i, 1); }
    if (p.y < -20) { stop === false ? p.vy = -p.vy : particles.splice(i, 1); }
    if (p.x > w + 10) { stop === false ? p.vx = -p.vx : particles.splice(i, 1); }
    if (p.y > h + 10) { stop === false ? p.vy = -p.vy : particles.splice(i, 1); }

  }
  particles.length > 0 && dropping === true ? window.requestAnimationFrame(no1) : window.cancelAnimationFrame(no1);

}