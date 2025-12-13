const pastDrops = [
  { name: "BLOOD ECLIPSE HOODIE", pieces: "000/150", img: "https://cdn.jsdelivr.net/gh/aphelios/assets/drop1.jpg", link: "product.html?id=1" },
  { name: "SHADOW ABAYA 001", pieces: "SOLD OUT", img: "https://cdn.jsdelivr.net/gh/aphelios/assets/abaya-past.jpg", link: "#" },
  { name: "RITUAL CARGO", pieces: "000/120", img: "https://cdn.jsdelivr.net/gh/aphelios/assets/cargo-past.jpg", link: "#" },
  { name: "LUNAR THERMAL", pieces: "ENDED", img: "https://cdn.jsdelivr.net/gh/aphelios/assets/thermal.jpg", link: "#" },
];

const container = document.querySelector(".products");
pastDrops.forEach(drop => {
  const card = document.createElement("a");
  card.href = drop.link;
  card.className = "product-card";
  card.style.position = "relative";
  card.innerHTML = `
    <img src="${drop.img}" style="opacity:0.7;">
    <div style="position:absolute; inset:0; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center;">
      <h3 style="font-size:3rem; color:#9B111E;">${drop.pieces}</h3>
    </div>
    <h3 style="margin-top:20px;">${drop.name}</h3>
  `;
  container.appendChild(card);
});