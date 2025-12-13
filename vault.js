const pastDrops = [
  { name: "THORNED BAT HOODIE", pieces: "01/10", img: "https://i.ibb.co/dJ47zJNP/Gemini-Generated-Image-kcsoa4kcsoa4kcso.png", link: "product.html?id=1" },
  { name: "WHITE RAVEN CROSS HOODIE", pieces: "SOLD OUT", img: "https://i.postimg.cc/vBVq6VMN/Design-sans-titre.png", link: "#" },
  { name: "BAT THORN SLEEVE HOODIE", pieces: "04/10", img: "https://i.postimg.cc/6QHzPh6V/Gemini-Generated-Image-vrz34cvrz34cvrz3.png", link: "product.html?id=3" },
  { name: "DRIPPING CASTLE HOODIE", pieces: "ENDED", img: "https://i.ibb.co/HLKxCDBm/Gemini-Generated-Image-qj4vugqj4vugqj4v.png", link: "#" },
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