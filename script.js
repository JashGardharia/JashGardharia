// --- 1. LOADER (PREMIUM DOT + BAR INTRO) ---
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.classList.add("loader-done");
  }, 1600);

  setTimeout(() => {
    loader.classList.add("loader-hide");
  }, 2200);

  setTimeout(() => {
    loader.style.display = "none";
  }, 3000);
});


// --- 2. HAMBURGER MENU ---
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

// --- 3. BACK TO TOP BUTTON ---
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// --- 4. SCROLL REVEAL ---
window.addEventListener("scroll", revealElements);

function revealElements() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 100;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add("active");
    }
  });
}

revealElements();

// --- 5. EMAIL MESSAGE GENERATOR ---
const myEmail = "jashembedded@gmail.com";

function openEmail() {
  const name = document.getElementById("userName").value.trim();
  const email = document.getElementById("userEmail").value.trim();
  const message = document.getElementById("userMessage").value.trim();
  const status = document.getElementById("copyStatus");

  if (!name || !email || !message) {
    status.innerText = "> Please fill all the fields 😭";
    return;
  }

  status.innerText = "> Mailing... 📩";

  const subject = encodeURIComponent("Project Inquiry: " + name);

  const body = encodeURIComponent(
`NAME: ${name}

EMAIL: ${email}

MESSAGE:
${message}

THANK YOU`
  );

  window.location.href = `mailto:${myEmail}?subject=${subject}&body=${body}`;
}

function copyMessage() {
  const name = document.getElementById("userName").value.trim();
  const email = document.getElementById("userEmail").value.trim();
  const message = document.getElementById("userMessage").value.trim();
  const status = document.getElementById("copyStatus");

  if (!name || !email || !message) {
    status.innerText = "> No data to copy 🙃";
    return;
  }

  const finalText =
`NAME: ${name}

EMAIL: ${email}

MESSAGE:
${message}

THANK YOU`;

  navigator.clipboard.writeText(finalText);
  status.innerText = "> Copied to clipboard 📋🔥";
}

// --- 6. 3D TILT EFFECT (FIXED: NO DRUNK BOXES) ---
const tiltCards = document.querySelectorAll("[data-tilt]");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const w = rect.width;
    const h = rect.height;

    const rotateX = ((y - h / 2) / h) * -10;
    const rotateY = ((x - w / 2) / w) * 10;

    card.style.transition = "transform 0.05s ease-out";
    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(1.03, 1.03, 1.03)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transition = "transform 0.4s ease";
    card.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      scale3d(1, 1, 1)
    `;
  });
});

// --- 7. 3D BACKGROUND PARTICLE ANIMATION ---
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2;
    this.speedX = Math.random() * 0.8 - 0.4;
    this.speedY = Math.random() * 0.8 - 0.4;
    this.color = Math.random() > 0.5 ? "#00f3ff" : "#bc13fe";
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
    if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < 110; i++) {
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();

    for (let j = i; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 243, 255, ${1 - distance / 120})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Resize canvas when screen changes
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});
