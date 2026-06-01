// views-home.jsx — Home view: hero variants + filter bar + list variants

const { useState: useStateH, useMemo: useMemoH } = React;

/* =============== HEROES =============== */
function HeroSearch({ value, onChange, onSubmit, big }) {
  return (
    <form className="searchbar" style={big ? { padding: "8px 8px 8px 22px" } : null}
      onSubmit={(e) => { e.preventDefault(); onSubmit && onSubmit(); }}>
      <Ic.search style={{ color: "var(--ink-3)" }} />
      <input value={value} onChange={(e) => onChange(e.target.value)}
        placeholder="Search events, cities, music…" aria-label="Search events" />
      <button type="submit" className={"btn btn-primary" + (big ? " btn-lg" : "")}>Search</button>
    </form>
  );
}

function QuickCats({ active, onPick }) {
  const cats = Object.values(window.SLE.CATEGORIES);
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {cats.map((c) => (
        <button key={c.id} className={"chip" + (active === c.id ? " on" : "")} onClick={() => onPick(active === c.id ? "all" : c.id)}>
          <CatDot cat={c.id} /> {c.short}
        </button>
      ))}
    </div>
  );
}

function StatRow() {
  const evs = window.SLE.EVENTS;
  const cities = new Set(evs.map((e) => e.city)).size;
  const going = evs.reduce((a, e) => a + e.going, 0);
  const Stat = ({ n, l }) => (
    <div><div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 26, letterSpacing: "-.02em" }}>{n}</div>
      <div style={{ color: "var(--ink-3)", fontSize: 13, fontWeight: 600 }}>{l}</div></div>
  );
  return (
    <div style={{ display: "flex", gap: 36, marginTop: 4 }}>
      <Stat n={evs.length} l="upcoming events" />
      <Stat n={cities} l="cities worldwide" />
      <Stat n={going.toLocaleString()} l="people going" />
    </div>
  );
}

function HeroSpotlight({ featured, search, setSearch, cat, setCat, onOpen, go }) {
  return (
    <section className="wrap" style={{ display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: 52, alignItems: "center", padding: "56px 28px 64px" }}>
      <div className="rise" style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <span className="eyebrow">The Salone community, gathered</span>
        <h1 style={{ fontSize: "clamp(40px, 5.4vw, 72px)" }}>
          Find your people.<br /><span style={{ color: "var(--accent)" }}>Find your event.</span>
        </h1>
        <p style={{ color: "var(--ink-2)", fontSize: 18, lineHeight: 1.5, maxWidth: "44ch", margin: 0 }}>
          Concerts, fundraisers, festivals and meetups for the Sierra Leonean community — wherever you are in the world.
        </p>
        <HeroSearch value={search} onChange={setSearch} big />
        <QuickCats active={cat} onPick={setCat} />
        <StatRow />
      </div>
      <div className="rise" style={{ position: "relative", animationDelay: ".08s" }}>
        <div style={{ position: "relative", borderRadius: "var(--r-lg)", overflow: "hidden", boxShadow: "var(--shadow-lg)", aspectRatio: "4/5", cursor: "pointer" }}
          onClick={() => onOpen(featured.id)}>
          <EventPoster ev={featured} glyphSize="260px" />
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "60px 24px 22px",
            background: "rgba(10,8,6,.72)" }}>
            <span className="cat-tag" style={{ background: "var(--accent-2)", color: "#fff" }}>This week’s spotlight</span>
            <h3 style={{ color: "#fff", fontSize: 30, marginTop: 12, lineHeight: 1.02 }}>{featured.title}</h3>
            <div style={{ display: "flex", gap: 16, marginTop: 10, color: "rgba(255,255,255,.9)", fontSize: 14, fontWeight: 600 }}>
              <span style={{ display: "flex", gap: 6, alignItems: "center" }}><Ic.cal /> {window.SLE.fmtDateLong(featured)}</span>
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", top: -18, right: -14, background: "var(--paper-2)", borderRadius: 14,
          padding: "12px 16px", boxShadow: "var(--shadow-md)", border: "1px solid var(--line-2)", transform: "rotate(4deg)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Ic.users style={{ color: "var(--accent)" }} />
            <span style={{ fontWeight: 800, fontFamily: "var(--font-display)", fontSize: 18 }}>{featured.going}</span>
          </div>
          <div style={{ fontSize: 12, color: "var(--ink-3)", fontWeight: 600 }}>already going</div>
        </div>
      </div>
    </section>
  );
}

function HeroMarquee({ featured, search, setSearch, cat, setCat, onOpen, events }) {
  const words = ["BUBU", "GUMBE", "JOLLOF", "FREETOWN", "COMMUNITY", "AFROBEATS", "DIASPORA", "SALONE", "TOGETHER"];
  const strip = [...words, ...words];
  const row = events.slice(0, 6);
  return (
    <section style={{ padding: "30px 0 56px", overflow: "hidden" }}>
      <div style={{ overflow: "hidden", padding: "8px 0 6px", borderBlock: "1px solid var(--line-2)", marginBottom: 42 }}>
        <div style={{ display: "flex", gap: 28, whiteSpace: "nowrap", animation: "marq 28s linear infinite", width: "max-content" }}>
          {strip.map((w, i) => (
            <span key={i} style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 40, letterSpacing: "-.03em",
              color: i % 3 === 0 ? "var(--accent)" : "transparent", WebkitTextStroke: i % 3 === 0 ? "0" : "1.4px var(--ink-3)" }}>
              {w} <span style={{ color: "var(--accent-2)", WebkitTextStroke: 0 }}>✺</span>
            </span>
          ))}
        </div>
      </div>
      <div className="wrap rise" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
        <span className="eyebrow">Every Salone event, one place</span>
        <h1 style={{ fontSize: "clamp(42px, 6.5vw, 88px)", maxWidth: "16ch" }}>
          The whole community’s diary.
        </h1>
        <p style={{ color: "var(--ink-2)", fontSize: 18, maxWidth: "52ch", margin: 0 }}>
          Search hundreds of Sierra Leonean events across the diaspora and at home — then add your own in minutes.
        </p>
        <div style={{ width: "min(640px, 100%)" }}><HeroSearch value={search} onChange={setSearch} big /></div>
        <QuickCats active={cat} onPick={setCat} />
      </div>
      <div className="wrap" style={{ marginTop: 40 }}>
        <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 10, scrollSnapType: "x mandatory" }}>
          {row.map((ev) => (
            <div key={ev.id} style={{ flex: "0 0 230px", scrollSnapAlign: "start", cursor: "pointer" }} onClick={() => onOpen(ev.id)}>
              <div style={{ height: 150, borderRadius: "var(--r-card)", overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
                <EventPoster ev={ev} />
              </div>
              <div style={{ fontWeight: 700, fontFamily: "var(--font-display)", fontSize: 17, marginTop: 10, lineHeight: 1.1 }}>{ev.title}</div>
              <div className="ecard-meta" style={{ marginTop: 4 }}><Ic.cal /> {window.SLE.MON_ABBR[window.SLE.parseDate(ev).getMonth()]} {window.SLE.parseDate(ev).getDate()} · {ev.city}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroSplit({ featured, search, setSearch, cat, setCat, onOpen, events }) {
  const stack = events.slice(0, 3);
  const rots = [-6, 3, 8];
  return (
    <section className="wrap" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, padding: "40px 28px 56px", alignItems: "stretch" }}>
      <div className="rise" style={{ background: "var(--paper-2)", border: "1px solid var(--line-2)", borderRadius: "var(--r-lg) 0 0 var(--r-lg)",
        padding: "48px 44px", display: "flex", flexDirection: "column", gap: 22, justifyContent: "center", boxShadow: "var(--shadow-sm)" }}>
        <span className="eyebrow">Sierra Leone community</span>
        <h1 style={{ fontSize: "clamp(36px, 4.4vw, 60px)" }}>Where the diaspora comes together.</h1>
        <p style={{ color: "var(--ink-2)", fontSize: 17, margin: 0, maxWidth: "40ch" }}>
          From Freetown to London to DC — browse what’s coming up and never miss a gathering again.
        </p>
        <HeroSearch value={search} onChange={setSearch} />
        <QuickCats active={cat} onPick={setCat} />
      </div>
      <div className="rise" style={{ position: "relative", background: "var(--paper-3)", borderRadius: "0 var(--r-lg) var(--r-lg) 0",
        overflow: "hidden", minHeight: 460, animationDelay: ".08s" }}>
        {stack.map((ev, i) => (
          <div key={ev.id} onClick={() => onOpen(ev.id)} style={{
            position: "absolute", width: 220, height: 290, cursor: "pointer",
            left: `${14 + i * 26}%`, top: `${10 + i * 12}%`, transform: `rotate(${rots[i]}deg)`,
            borderRadius: "var(--r-card)", overflow: "hidden", boxShadow: "var(--shadow-lg)", zIndex: i, transition: "transform .2s",
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = `rotate(${rots[i]}deg) translateY(-8px) scale(1.03)`}
          onMouseLeave={(e) => e.currentTarget.style.transform = `rotate(${rots[i]}deg)`}>
            <EventPoster ev={ev} glyphSize="150px" />
          </div>
        ))}
      </div>
    </section>
  );
}

function Hero(props) {
  if (props.heroLayout === "marquee") return <HeroMarquee {...props} />;
  if (props.heroLayout === "split") return <HeroSplit {...props} />;
  return <HeroSpotlight {...props} />;
}

/* =============== FILTER BAR + LIST =============== */
function FilterBar({ search, setSearch, cat, setCat, city, setCity, sort, setSort, count }) {
  const cities = ["All cities", ...Array.from(new Set(window.SLE.EVENTS.map((e) => e.city))).sort()];
  const cats = [["all", "All"], ...Object.values(window.SLE.CATEGORIES).map((c) => [c.id, c.short])];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 26 }}>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <div className="searchbar" style={{ flex: "1 1 280px", minWidth: 220 }}>
          <Ic.search style={{ color: "var(--ink-3)" }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search events…" aria-label="Search" />
        </div>
        <select className="select" style={{ width: "auto", flex: "0 0 auto" }} value={city} onChange={(e) => setCity(e.target.value)}>
          {cities.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select className="select" style={{ width: "auto", flex: "0 0 auto" }} value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="soon">Soonest first</option>
          <option value="pop">Most popular</option>
        </select>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        {cats.map(([id, label]) => (
          <button key={id} className={"chip" + (cat === id ? " on" : "")} onClick={() => setCat(id)}>
            {id !== "all" && <CatDot cat={id} />} {label}
          </button>
        ))}
        <span style={{ marginLeft: "auto", color: "var(--ink-3)", fontWeight: 600, fontSize: 13.5 }}>{count} event{count !== 1 ? "s" : ""}</span>
      </div>
    </div>
  );
}

function EmptyState({ onClear }) {
  return (
    <div style={{ textAlign: "center", padding: "64px 20px", border: "1.5px dashed var(--line)", borderRadius: "var(--r-lg)", color: "var(--ink-3)" }}>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, color: "var(--ink)" }}>No events match that.</div>
      <p style={{ margin: "8px 0 18px" }}>Try a different city or category — or be the first to add one.</p>
      <button className="btn btn-ghost" onClick={onClear}>Clear filters</button>
    </div>
  );
}

function EventList({ events, cardStyle, onOpen, saved, onSave, onClear }) {
  if (events.length === 0) return <EmptyState onClear={onClear} />;

  if (cardStyle === "list") {
    return <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {events.map((ev, i) => <div key={ev.id} className="rise" style={{ animationDelay: `${Math.min(i, 8) * 0.04}s` }}><EventRow ev={ev} onOpen={onOpen} saved={saved} onSave={onSave} /></div>)}
    </div>;
  }
  if (cardStyle === "magazine") {
    const [first, ...rest] = events;
    return <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
      <div className="rise" style={{ gridColumn: "1 / -1" }}><EventMag ev={first} onOpen={onOpen} saved={saved} onSave={onSave} /></div>
      {rest.map((ev, i) => <div key={ev.id} className="rise" style={{ animationDelay: `${Math.min(i, 8) * 0.04}s` }}><EventCard ev={ev} onOpen={onOpen} saved={saved} onSave={onSave} /></div>)}
    </div>;
  }
  return <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
    {events.map((ev, i) => <div key={ev.id} className="rise" style={{ animationDelay: `${Math.min(i, 8) * 0.04}s` }}><EventCard ev={ev} onOpen={onOpen} saved={saved} onSave={onSave} /></div>)}
  </div>;
}

/* =============== HOME =============== */
function HomeView({ tweaks, onOpen, saved, onSave, go }) {
  const [search, setSearch] = useStateH("");
  const [cat, setCat] = useStateH("all");
  const [city, setCity] = useStateH("All cities");
  const [sort, setSort] = useStateH("soon");

  const featured = useMemoH(() => window.SLE.EVENTS.find((e) => e.featured) || window.SLE.EVENTS[0], []);

  const filtered = useMemoH(() => {
    let evs = window.SLE.EVENTS.slice();
    const q = search.trim().toLowerCase();
    if (q) evs = evs.filter((e) => (e.title + " " + e.city + " " + e.venue + " " + e.tags.join(" ") + " " + window.SLE.CATEGORIES[e.category].label).toLowerCase().includes(q));
    if (cat !== "all") evs = evs.filter((e) => e.category === cat);
    if (city !== "All cities") evs = evs.filter((e) => e.city === city);
    evs.sort((a, b) => sort === "pop" ? b.going - a.going : window.SLE.parseDate(a) - window.SLE.parseDate(b));
    return evs;
  }, [search, cat, city, sort]);

  const clear = () => { setSearch(""); setCat("all"); setCity("All cities"); };

  return (
    <div>
      <Hero heroLayout={tweaks.heroLayout} featured={featured} search={search} setSearch={setSearch}
        cat={cat} setCat={setCat} onOpen={onOpen} go={go} events={window.SLE.EVENTS} />
      <main className="wrap" style={{ paddingTop: 8 }}>
        <div className="sec-head">
          <div>
            <span className="eyebrow">Upcoming</span>
            <h2 style={{ marginTop: 10 }}>What’s coming up</h2>
          </div>
        </div>
        <FilterBar search={search} setSearch={setSearch} cat={cat} setCat={setCat} city={city} setCity={setCity}
          sort={sort} setSort={setSort} count={filtered.length} />
        <EventList events={filtered} cardStyle={tweaks.cardStyle} onOpen={onOpen} saved={saved} onSave={onSave} onClear={clear} />
      </main>
    </div>
  );
}

window.HomeView = HomeView;
window.EventList = EventList;
