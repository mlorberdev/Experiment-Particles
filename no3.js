export function no3() {
  // let hues = palettes[Math.floor(Math.random() * palettes.length)];
  // INITIALIZE CANVAS

  let canvas = document.getElementById("c");
  let ctx = canvas.getContext("2d");

  // canvas dimensions

  let w;
  let h;

  // canvas pixel ratio

  setupCanvas();
  function setupCanvas() {
    w = innerWidth;
    h = innerHeight;
    let ratio = window.devicePixelRatio || 1;
    let bound = canvas.getBoundingClientRect();
    canvas.width = bound.width * ratio;
    canvas.height = bound.height * ratio;
    ctx.scale(ratio, ratio);
  }

  // PARTICLE CONSTRUCTOR

  class particle {
    constructor() {

      // position

      this.x = parseInt(Math.random() * w);
      this.y = parseInt(Math.random() * h);

      // color

      let r = parseInt(Math.random() * 255);
      let g = parseInt(Math.random() * 255);
      let b = parseInt(Math.random() * 255);
      this.color = `rgba(${r},${g},${b},0.5)`;
      this.invert = `rgba(${255 - r},${255 - g},${255 - g},0.5)`

      // size

      this.radius = parseInt(Math.random() * 20) + 15;

      // velocity

      this.vx = Math.random().toFixed(2) * 5 + 3;
      this.vy = Math.random().toFixed(2) * 5 + 3;
    }
  }

  // PARTICLE CONTAINER

  let step, n = 50, particles = [];

  // add ele to array

  for (let i = 0; i < n; i++) particles.push(new particle());

  // CANVAS DRAW (ANIMATION)

  let F = 0;

  function draw() {

    // clear canvas

    if (F === 10) { F = 0; }
    else { F++; }

    // draw from particle array

    for (let i = 0; i < n; i++) {

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
    step = window.requestAnimationFrame(draw);
  }

  // ON-OFF SWITCH

  let dropping = false;

  document.getElementById("balldrop").addEventListener("click", function () {

    if (dropping) {
      dropping = false;
      window.cancelAnimationFrame(step);
      ctx.clearRect(0, 0, w, h);
    }
    else {
      dropping = true;
      window.requestAnimationFrame(draw);
    }
  });

  // WINDOW RESIZE DEBOUNCE

  const debounce = (func, delay = 250) => {

    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    }
  }
  window.addEventListener("resize", () => {
    window.cancelAnimationFrame(step);
    window.cancelAnimationFrame(draw);
    ctx.clearRect(0, 0, w, h);
    setupCanvas();
  });
  window.addEventListener("resize", debounce(function () {

    particles = [];
    for (let i = 0; i < n; i++) {
      particles.push(new particle());
    }

    if (dropping === true) window.requestAnimationFrame(draw);

  }));

  // PAUSE

  document.getElementById("pause").addEventListener("click", function () {
    if (dropping === true) {
      dropping = false;
      window.cancelAnimationFrame(step);
      window.cancelAnimationFrame(draw);
    } else {
      dropping = true;
      // window.requestAnimationFrame(step);
      window.requestAnimationFrame(draw);
    }
  });

  // RELOAD

  document.getElementById("reload").addEventListener("click", () => {
    dropping = false;
    window.cancelAnimationFrame(step);
    window.cancelAnimationFrame(draw);
    ctx.clearRect(0, 0, w, h);
    particles = [];
    for (let i = 0; i < n; i++) particles.push(new particle());
    dropping = true;
    window.requestAnimationFrame(draw);
  });

  // DOWNLOAD

  document.getElementById("download").addEventListener("click", function () {
    let c = document.getElementById("c");
    let type = "jpg";
    let ele = document.createElement("a");
    document.body.appendChild(ele);
    ele.download = `mlorber_particles.${type}`;
    ele.href = c.toDataURL(`image/${type};base64`);
    ele.click();
    ele.remove();

  });
}