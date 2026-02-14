// --- 1. LOADER ---
window.addEventListener("load", () => {
    setTimeout(() => {
        const loader = document.getElementById("loader");
        loader.style.opacity = "0";
        setTimeout(() => loader.style.display = "none", 500);
    }, 2000);
});

// --- 2. EMAIL LOGIC (Your Request) ---
const myEmail = "jashembedded@gmail.com"; 

function openEmail() {
    const name = document.getElementById("userName").value.trim();
    const email = document.getElementById("userEmail").value.trim();
    const message = document.getElementById("userMessage").value.trim();
    const status = document.getElementById("copyStatus");

    if (!name || !email || !message) {
        status.innerText = "> ERROR: FIELDS_EMPTY. ABORT.";
        return;
    }

    status.innerText = "> EXECUTING MAILTO_PROTOCOL...";
    const subject = encodeURIComponent("Project Inquiry: " + name);
    const body = encodeURIComponent(
        `SYSTEM MSG FROM: ${name}\nEMAIL: ${email}\n\nPAYLOAD:\n${message}\n\n[END TRANSMISSION]`
    );

    window.location.href = `mailto:${myEmail}?subject=${subject}&body=${body}`;
}

function copyMessage() {
    const name = document.getElementById("userName").value.trim();
    const email = document.getElementById("userEmail").value.trim();
    const message = document.getElementById("userMessage").value.trim();
    const status = document.getElementById("copyStatus");

    if (!name || !email || !message) {
        status.innerText = "> ERROR: NO_DATA_TO_COPY.";
        return;
    }

    const finalText = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
    navigator.clipboard.writeText(finalText);
    status.innerText = "> SUCCESS: DATA_COPIED_TO_CLIPBOARD.";
}

// --- 3. CUSTOM 3D TILT EFFECT (Vanilla JS) ---
// This makes elements look at the mouse cursor
document.addEventListener("mousemove", (e) => {
    const cards = document.querySelectorAll("[data-tilt]");
    
    cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Check if mouse is near the card to activate tilt
        // Only tilt if mouse is roughly over the element or container
        const w = rect.width;
        const h = rect.height;
        
        // Calculate rotation (max 15 degrees)
        const rotateX = ((y - h / 2) / h) * -15; 
        const rotateY = ((x - w / 2) / w) * 15;

        // Apply style
        card.style.transform = `
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            scale3d(1.02, 1.02, 1.02)
        `;
    });
});

// Reset tilt when mouse leaves
document.addEventListener("mouseout", () => {
    const cards = document.querySelectorAll("[data-tilt]");
    cards.forEach((card) => {
        card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
    });
});


// --- 4. 3D BACKGROUND ANIMATION (Canvas) ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() * 1) - 0.5;
        this.speedY = (Math.random() * 1) - 0.5;
        this.color = Math.random() > 0.5 ? '#00f3ff' : '#bc13fe'; // Cyan or Pink
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
        if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
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
    for (let i = 0; i < 100; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        
        // Draw lines between particles if close
        for (let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 243, 255, ${1 - distance/100})`;
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

// Resize canvas handling
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});
