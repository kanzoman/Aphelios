// PASSWORD (change this!)
const correctPassword = "Dracula";

function checkPassword() {
  const input = document.getElementById("password-input").value;
  if (input === correctPassword) {
    document.getElementById("password-gate").classList.add("hidden");
    document.getElementById("main-site").classList.remove("hidden");
    startCountdown();
    loadProducts();
  } else {
    document.querySelector(".wrong").classList.add("show");
    setTimeout(() => document.querySelector(".wrong").classList.remove("show"), 2000);
  }
}

// Allow Enter key
  document.getElementById("password-input").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      checkPassword();
    }
  });
  
// COUNTDOWN TO NEXT DROP (set your date here)
const dropDate = new Date("2025-12-20T22:00:00").getTime();

function startCountdown() {
  const countdownElement = document.getElementById("countdown");

  const interval = setInterval(() => {
    const now = new Date().getTime();
    const distance = dropDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 *24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    if (distance < 0) {
      clearInterval(interval);
      countdownElement.innerHTML = "DROP LIVE NOW";
    }
  }, 1000);
}

// CURRENT DROP PRODUCTS — CLICKABLE → product.html?id=X
function loadProducts() {
  const container = document.querySelector(".products");
  container.innerHTML = ""; // clear

const products = [
  { id: 1, name: "THORNED BAT HOODIE", price: "280 MAD", img: "https://i.ibb.co/dJ47zJNP/Gemini-Generated-Image-kcsoa4kcsoa4kcso.png", sold: false },
  { id: 2, name: "DRIPPING CASTLE HOODIE", price: "280 MAD", img: "https://i.ibb.co/HLKxCDBm/Gemini-Generated-Image-qj4vugqj4vugqj4v.png", sold: false },
  { id: 3, name: "BAT THORN SLEEVE HOODIE", price: "280 MAD", img: "https://i.postimg.cc/6QHzPh6V/Gemini-Generated-Image-vrz34cvrz34cvrz3.png", sold: false },
  { id: 4, name: "WHITE RAVEN CROSS HOODIE", price: "280 MAD", img: "https://i.postimg.cc/vBVq6VMN/Design-sans-titre.png", sold: true },
];

  products.forEach(p => {
    const card = document.createElement("a");
    card.href = `product.html?id=${p.id}`;
    card.className = "product-card";
    card.style.textDecoration = "none";
    card.style.color = "inherit";
    card.style.display = "block";

    card.innerHTML = `
      <div style="position:relative;">
        <img src="${p.img}" alt="${p.name}">
        ${p.sold ? '<div class="sold-out">SOLD OUT</div>' : ''}
      </div>
      <h3>${p.name}</h3>
      <p>${p.price}</p>
      ${!p.sold ? '<span style="color:#9B111E; margin-top:15px; display:inline-block;">Enter BUY →</span>' : ''}
    `;

    container.appendChild(card);
  });
}
// Remove preloader after everything loads
window.onload = () => {
  setTimeout(() => {
    document.getElementById("preloader").style.opacity = "0";
    setTimeout(() => document.getElementById("preloader").remove(), 1000);
  }, 2000);
};


//Secret Konami Code//
let konamiCode = [];
const secret = [38,38,40,40,37,39,37,39,66,65];
window.addEventListener('keydown', (e) => {
  konamiCode.push(e.keyCode);
  if (konamiCode.length > secret.length) konamiCode.shift();
  if (konamiCode.toString() === secret.toString()) {
    window.location.href = "secret-drop.html"; // we’ll make this file next
  }
});
// VISIBLE GOTHIC CURSOR FOLLOW
document.addEventListener('mousemove', (e) => {
  document.documentElement.style.setProperty('--cursor-x', e.clientX + 'px');
  document.documentElement.style.setProperty('--cursor-y', e.clientY + 'px');
});

/* VISIBLE RED CRESCENT CURSOR (kept from last version + improved) */
document.addEventListener('mousemove', (e) => {
  document.documentElement.style.setProperty('--cursor-x', e.clientX + 'px');
  document.documentElement.style.setProperty('--cursor-y', e.clientY + 'px');
});

// INSTANT BLOOD ASH / FALLING EMBERS — works everywhere, no CDN
const ashContainer = document.getElementById("blood-ash");
if (ashContainer) {
ashContainer.style.position = "fixed";
ashContainer.style.inset = "0";
ashContainer.style.overflow = "hidden";
ashContainer.style.pointerEvents = "none";
  ashContainer.style.zIndex = "1";

  function createAsh() {
    const ash = document.createElement("div");
    ash.style.position = "absolute";
    ash.style.width = Math.random() * 5 + "px";
    ash.style.height = ash.style.width;
    ash.style.background = Math.random() > 0.3 ? "#9B111E" : "#2c0000";
    ash.style.borderRadius = "50%";
    ash.style.opacity = Math.random() * 0.6 + 0.2;
    ash.style.left = Math.random() * 100 + "vw";
    ash.style.top = "-10px";
    ash.style.boxShadow = "0 0 8px #9B111E";
    ash.style.animation = `fall ${Math.random() * 12 + 12}s linear forwards`;

    ashContainer.appendChild(ash);

    setTimeout(() => ash.remove(), 25000);
  }

  // Create new ash every 200–500ms
  setInterval(createAsh, Math.random() * 300 + 200);

  // Add the falling animation once
  const style = document.createElement("style");
  style.textContent = `
    @keyframes fall {
      0% { transform: translateY(-100px) rotate(0deg); opacity: 0; }
      10% { opacity: 1; }
      100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  // Spawn a bunch at start
  for (let i = 0; i < 60; i++) setTimeout(createAsh, i * 100);
}
// 1. RED CRESCENT MOUSE TRAIL
document.addEventListener('mousemove', (e) => {
  const trail = document.createElement('div');
  trail.className = '🌙';
  trail.className = 'trail';
  trail.style.left = e.clientX + 'px';
  trail.style.top = e.clientY + 'px';
  document.body.appendChild(trail);
  setTimeout(() => trail.remove(), 1200);
});

// 2. RANDOM LIGHTNING FLASHES
setInterval(() => {
  const flash = document.getElementById('lightning-overlay');
  flash.style.animation = 'none';
  flash.offsetHeight; // trigger reflow
  flash.style.animation = 'flash 0.6s';
}, Math.random() * 60000 + 30000);

// 11. WAX SEAL ON EVERY CLICK
document.addEventListener('click', (e) => {
  const seal = document.createElement('div');
  seal.className = 'wax-seal';
  seal.style.left = e.clientX + 'px';
  seal.style.top = e.clientY + 'px';
  document.body.appendChild(seal);
  setTimeout(() => seal.remove(), 800);
});

// SIMPLIFIED SECRET DROP — HOLDS 3 SECONDS → PIECE 000
let pressTimer;
const logo = document.getElementById("secret-trigger");
if (logo) {
  // Desktop hold
  logo.addEventListener("mousedown", startHold);
  logo.addEventListener("mouseup", stopHold);
  logo.addEventListener("mouseleave", stopHold);
  
  // Mobile long-press
  logo.addEventListener("touchstart", (e) => {
    e.preventDefault();
    startHold();
  }, {passive: false});
  logo.addEventListener("touchend", stopHold);
  
  function startHold() {
    console.log("Hold started — keep for 3 seconds"); // Check console
    pressTimer = setTimeout(() => {
      console.log("Secret unlocked!"); // Check console
      document.body.style.transition = "background 0.6s";
      document.body.style.background = "#9B111E";
      navigator.vibrate?.(200); // Phone buzz
      setTimeout(() => {
        window.location.href = "piece000.html";
      }, 600);
    }, 3000);
    
    // Visual feedback: logo glows brighter
    logo.style.filter = "drop-shadow(0 0 20px #9B111E)";
    logo.style.transition = "filter 0.1s";
  }
  
  function stopHold() {
    console.log("Hold stopped");
    clearTimeout(pressTimer);
    logo.style.filter = "none";
  }
} else {
  console.log("Logo not found — check ID='secret-trigger'");
}

// Disable heavy effects on mobile
if (/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  // Kill blood ash
  const ashContainer = document.getElementById("blood-ash");
  if (ashContainer) ashContainer.style.display = "none";
  
  // Kill particles
  const particles = document.getElementById("product-particles");
  if (particles) particles.style.display = "none";

  // Reduce vibration frequency
  setInterval(() => navigator.vibrate?.([50, 30, 50]), 20000);
}