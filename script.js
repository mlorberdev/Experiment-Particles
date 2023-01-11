import { no1 } from "./no1.js";
import { no2 } from "./no2.js";
// import { no3 } from "./no3.js";

export let particles = [];
export let canvas = document.getElementById("c");
export let ctx = canvas.getContext("2d");
export let w = innerWidth;
export let h = innerHeight;
export let stop = false;
export let dropping = false;

export function main() {

  // VARIABLES
  let step; // will be step = requestAnimationFrame([app])
  let ratio = window.devicePixelRatio || 1;
  let bound = canvas.getBoundingClientRect(); // defined in CSS
  canvas.width = bound.width * ratio;
  canvas.height = bound.height * ratio;
  ctx.scale(ratio, ratio); // now drawing context should be pixel-perfect!
  const rn = (z) => { return parseInt(Math.random() * z); } // returns a random number 0 - z

  // PARTICLE CONSTRUCTOR exports particle array with each p's position, color, invert color (grad stop ~ .1), size and velocity
  class Particle {
    constructor() {

      // position
      this.x = rn(w);
      this.y = rn(h);

      // color
      let r = rn(255);
      let g = rn(255);
      let b = rn(255);
      let a = 
      this.color = `rgba(${r},${g},${b},0.5)`;
      this.invert = `rgba(${255 - r},${255 - g},${255 - g},0.5)`

      // size
      this.radius = rn(20) + 15;

      // velocity
      this.vx = rn(2) + 1;
      this.vy = rn(2) + 1;
    }
  }

  // LOAD ARRAY
  function part() {
    particles = [];
    for (let i = 0; i < 50; i++) particles.push(new Particle());
  }

  // RESPOND TO USER SELECTION / INITIALIZATION
  document.getElementById("balldrop").addEventListener("change", init);
  function init() {
    window.can
    if (particles.length === 0) part();
    dropping = true;
    switch (document.getElementById("balldrop").value) {
      case "no1": step = window.requestAnimationFrame(no1); break;
      case "no2": step = window.requestAnimationFrame(no2); break;
      case "no3": step = window.requestAnimationFrame(no3); break;
      default: break;
    }
  }

  // DOWNLOAD
  document.getElementById("download").addEventListener("click", function () {
    let type = "jpg";
    let ele = document.createElement("a");
    document.body.appendChild(ele);
    ele.download = `mlorber_particles.${type}`;
    ele.href = canvas.toDataURL(`image/${type};base64`);
    ele.click();
    ele.remove();
  });

  // PAUSE
  document.getElementById("pause").addEventListener("click", pause);
  function pause() {
    if (dropping) dropping = false;
    else {
      dropping = true;
      init();
    }
  }

  // RELOAD
  document.getElementById("reload").addEventListener("click", reload);
  function reload() {
    particles = [];
    step = "";
    ctx.clearRect(-100, -100, w + 100, h + 100);
    window.cancelAnimationFrame(step);
    init();
  }

  // STOP (MAKES THE PARTICLES FAIL TO BOUNCE OFF SIDES BY SPLICING THEM OUT OF THE ARRAY; WHEN ARRAY.LENGTH === 0, CALLS CANCELEVENTLISTENER)

} main();