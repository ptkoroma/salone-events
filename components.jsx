// components.jsx — icons + shared UI for Sierra Leone Events

/* ---------------- icons ---------------- */
const Ic = {
  cal: (p) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><rect x="3" y="4.5" width="18" height="17" rx="3"/><path d="M3 9h18M8 2.5v4M16 2.5v4"/></svg>),
  pin: (p) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>),
  clock: (p) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3 2"/></svg>),
  users: (p) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M16 19v-1.5a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V19"/><circle cx="9" cy="7" r="3.2"/><path d="M22 19v-1.5a4 4 0 0 0-3-3.87M16 4.13a4 4 0 0 1 0 7.75"/></svg>),
  heart: (p) => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 20S3.5 14.5 3.5 8.8A4.3 4.3 0 0 1 12 6.3a4.3 4.3 0 0 1 8.5 2.5C20.5 14.5 12 20 12 20Z"/></svg>),
  search: (p) => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></svg>),
  plus: (p) => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" {...p}><path d="M12 5v14M5 12h14"/></svg>),
  arrow: (p) => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>),
  back: (p) => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 12H5M11 6l-6 6 6 6"/></svg>),
  check: (p) => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5"/></svg>),
  share: (p) => (<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="18" cy="5" r="2.6"/><circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="19" r="2.6"/><path d="m8.3 10.8 7.4-4.3M8.3 13.2l7.4 4.3"/></svg>),
  tag: (p) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20.5 13.3 13 20.8a2 2 0 0 1-2.8 0l-6.9-6.9A2 2 0 0 1 2.7 12.5V5a2.3 2.3 0 0 1 2.3-2.3h7.5a2 2 0 0 1 1.4.6l6.6 6.6a2 2 0 0 1 0 2.8Z"/><circle cx="8" cy="8" r="1.4"/></svg>),
  download: (p) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>),
};
window.Ic = Ic;

/* ---------------- small bits ---------------- */
function DateChip({ ev }) {
  const dt = window.SLE.parseDate(ev);
  return (
    <div className="datechip">
      <div className="dc-m">{window.SLE.MON_ABBR[dt.getMonth()]}</div>
      <div className="dc-d">{dt.getDate()}</div>
    </div>
  );
}

function CatDot({ cat }) {
  const c = window.SLE.CATEGORIES[cat];
  return <span className="dot" style={{ background: `hsl(${c.hue} 60% 45%)` }} />;
}

function SaveBtn({ ev, saved, onToggle, size = 38 }) {
  const on = saved.has(ev.id);
  return (
    <button
      className="savebtn"
      aria-label={on ? "Remove from saved" : "Save event"}
      onClick={(e) => { e.stopPropagation(); onToggle(ev.id); }}
      style={{
        width: size, height: size, borderRadius: "50%", border: "1.5px solid var(--line)",
        background: on ? "var(--accent-2)" : "var(--paper-2)", color: on ? "#fff" : "var(--ink-2)",
        display: "grid", placeItems: "center", transition: "all .15s", flex: "none",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <Ic.heart style={{ fill: on ? "#fff" : "none" }} />
    </button>
  );
}

/* ---------------- event cards (3 variants) ---------------- */
function MetaLine({ ev }) {
  return (
    <>
      <div className="ecard-meta"><Ic.cal /> {window.SLE.fmtDateLong(ev)}</div>
      <div className="ecard-meta"><Ic.pin /> {ev.venue}, {ev.city}</div>
    </>
  );
}

function EventCard({ ev, onOpen, saved, onSave }) {
  return (
    <article className="ecard" onClick={() => onOpen(ev.id)}>
      <div style={{ position: "relative", height: 168 }}>
        <EventPoster ev={ev} />
        <div style={{ position: "absolute", right: 12, bottom: 12 }}>
          <SaveBtn ev={ev} saved={saved} onToggle={onSave} />
        </div>
      </div>
      <div className="ecard-body">
        <h3 className="ecard-title">{ev.title}</h3>
        <MetaLine ev={ev} />
        <div className="ecard-foot">
          <span className={"pill" + (ev.price === 0 ? " free" : "")}>{window.SLE.fmtPrice(ev)}</span>
          <span className="ecard-going">{ev.going} going</span>
        </div>
      </div>
    </article>
  );
}

function EventRow({ ev, onOpen, saved, onSave }) {
  return (
    <article className="erow" onClick={() => onOpen(ev.id)}>
      <EventPoster ev={ev} label={false} glyphSize="80px" />
      <div className="erow-mid">
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span className="cat-tag" style={{ background: "var(--paper-3)", color: "var(--ink-2)" }}>
            <CatDot cat={ev.category} /> {window.SLE.CATEGORIES[ev.category].short}
          </span>
          <span className={"pill" + (ev.price === 0 ? " free" : "")}>{window.SLE.fmtPrice(ev)}</span>
        </div>
        <div className="erow-title">{ev.title}</div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div className="ecard-meta"><Ic.cal /> {window.SLE.fmtDateLong(ev)}</div>
          <div className="ecard-meta"><Ic.clock /> {window.SLE.fmtTime(ev.startTime)}</div>
          <div className="ecard-meta"><Ic.pin /> {ev.venue}, {ev.city}</div>
        </div>
      </div>
      <div className="erow-right">
        <SaveBtn ev={ev} saved={saved} onToggle={onSave} />
        <span className="ecard-going">{ev.going} going</span>
      </div>
    </article>
  );
}

function EventMag({ ev, onOpen, saved, onSave }) {
  return (
    <article className="emag" onClick={() => onOpen(ev.id)}>
      <div style={{ position: "relative" }}>
        <EventPoster ev={ev} glyphSize="220px" />
      </div>
      <div className="emag-body">
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span className="cat-tag" style={{ background: "var(--ink)", color: "var(--paper)" }}>Featured</span>
          <span className={"pill" + (ev.price === 0 ? " free" : "")}>{window.SLE.fmtPrice(ev)}</span>
        </div>
        <h3 className="emag-title">{ev.title}</h3>
        <p style={{ color: "var(--ink-2)", margin: 0, fontSize: 16, lineHeight: 1.5 }}>{ev.blurb}</p>
        <div style={{ display: "flex", gap: 18, flexWrap: "wrap", marginTop: 2 }}>
          <div className="ecard-meta"><Ic.cal /> {window.SLE.fmtDateLong(ev)}</div>
          <div className="ecard-meta"><Ic.pin /> {ev.city}</div>
          <div className="ecard-meta"><Ic.users /> {ev.going} going</div>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
          <button className="btn btn-primary" onClick={(e) => { e.stopPropagation(); onOpen(ev.id); }}>
            View event <Ic.arrow />
          </button>
          <div onClick={(e) => e.stopPropagation()}><SaveBtn ev={ev} saved={saved} onToggle={onSave} size={46} /></div>
        </div>
      </div>
    </article>
  );
}

/* ---------------- nav + footer ---------------- */
function Nav({ route, go, savedCount, onAdd }) {
  const links = [["home", "Events"], ["calendar", "Calendar"]];
  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <a className="brand" onClick={() => go("home")} style={{ cursor: "pointer" }}>
          <span className="brand-mark">SL</span>
          <span>Salone Events<small>Sierra Leone Community</small></span>
        </a>
        <div className="nav-links">
          {links.map(([id, label]) => (
            <a key={id} className={"nav-link" + (route.name === id ? " active" : "")} onClick={() => go(id)}>{label}</a>
          ))}
        </div>
        <div className="nav-spacer" />
        <a className="nav-saved" onClick={() => go("saved")}>
          <Ic.heart className="heart" style={{ fill: savedCount ? "var(--accent-2)" : "none" }} />
          {savedCount > 0 && <span>{savedCount}</span>}
        </a>
        <button className="btn btn-dark btn-sm nav-links" onClick={onAdd}><Ic.plus /> Add event</button>
      </div>
    </nav>
  );
}

function Footer({ onAdd }) {
  return (
    <footer style={{ borderTop: "1px solid var(--line)", marginTop: 80, padding: "44px 0 56px" }}>
      <div className="wrap" style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "space-between", alignItems: "center" }}>
        <div className="brand"><span className="brand-mark">SL</span><span>Salone Events<small>Sierra Leone Community</small></span></div>
        <p style={{ color: "var(--ink-3)", margin: 0, fontSize: 14, maxWidth: "40ch" }}>
          A community-run home for Sierra Leonean events around the world. Built by the diaspora, for everyone.
        </p>
        <button className="btn btn-ghost" onClick={onAdd}><Ic.plus /> List your event</button>
      </div>
    </footer>
  );
}

Object.assign(window, { DateChip, CatDot, SaveBtn, EventCard, EventRow, EventMag, Nav, Footer, MetaLine });
