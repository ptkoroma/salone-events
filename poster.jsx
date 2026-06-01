// poster.jsx — deterministic placeholder "poster" art for each event
// No external images; builds a layered gradient + pattern keyed to category.

function seedFrom(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return (h >>> 0);
}

function EventPoster({ ev, label = true, glyphSize = "150px" }) {
  const cat = window.SLE.CATEGORIES[ev.category];
  const hue = cat.hue;
  const seed = seedFrom(ev.id);
  const h2 = (hue + 28 + (seed % 26)) % 360;
  const angle = 110 + (seed % 70);
  const rot = -8 + (seed % 16);

  const bg = {
    backgroundImage:
      `radial-gradient(120% 130% at ${18 + (seed % 30)}% 0%, hsl(${h2} 78% 62% / .9), transparent 55%),` +
      `linear-gradient(${angle}deg, hsl(${hue} 72% 30%), hsl(${(hue + 18) % 360} 80% 46%))`,
  };
  const glyph = cat.short.toUpperCase();
  const arcs = [0, 1, 2].map((i) => {
    const sz = 160 + i * 120 + (seed % 40);
    return (
      <span key={i} className="parc" style={{
        width: sz, height: sz,
        left: `calc(${22 + (seed % 20)}% - ${sz / 2}px)`,
        top: `calc(${12 + (seed % 30)}% - ${sz / 2}px)`,
        opacity: 0.5 - i * 0.13,
      }} />
    );
  });

  return (
    <div className="poster" style={{ width: "100%", height: "100%" }}>
      <div className="pg" style={bg} />
      {arcs}
      <span className="pglyph" style={{ fontSize: glyphSize, transform: `rotate(${rot}deg)` }}>{glyph}</span>
      <div className="pgrain" />
      {label && (
        <div className="pmeta">
          <span className="cat-tag" style={{ background: "rgba(255,255,255,.92)", color: `hsl(${hue} 70% 24%)` }}>
            {cat.short}
          </span>
          <span className="pcity">{ev.city}</span>
        </div>
      )}
    </div>
  );
}

window.EventPoster = EventPoster;
window.seedFrom = seedFrom;
