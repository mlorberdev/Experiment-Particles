import { particles, ctx, w, h, stop, dropping } from "./script.js";

export function no2() {

  for (let i = 0; i < particles.length; i++) {

    let p = particles[i];

    ctx.beginPath();

    // particle gradient

    let gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);

    gradient.addColorStop(.1, p.invert);
    gradient.addColorStop(0.3, p.color);
    gradient.addColorStop(.9, "transparent");

    ctx.shadowColor = "#00000033";
    ctx.shadowOffsetX = p.radius * 0.8;
    ctx.shadowOffsetY = p.radius * 0.8;
    ctx.fillStyle = gradient;
    ctx.arc(p.x, p.y, p.radius, Math.PI * 2, false);
    ctx.fill();

    // add velocity illusion

    p.x += p.vx * Math.cos(Math.random() * Math.PI * 2);
    p.y += p.vy * Math.sin(Math.random() * Math.PI * 2);

    // bounce off the sides

    if (p.x < 0) { p.vx = -p.vx }
    if (p.y < 0) { p.vy = -p.vy; }
    if (p.x > w) { p.vx = -p.vx; }
    if (p.y > h) { p.vy = -p.vy; }

  }
  particles.length > 0 && dropping === true ? window.requestAnimationFrame(no2) : window.cancelAnimationFrame(no2);
}