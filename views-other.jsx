// views-other.jsx — Detail, Add Event, Calendar, Saved

const { useState: useStateO, useMemo: useMemoO, useEffect: useEffectO } = React;

/* =================== DETAIL =================== */
function DetailView({ ev, onBack, onOpen, saved, onSave, rsvped, onRsvp, onShare }) {
  if (!ev) return null;
  const cat = window.SLE.CATEGORIES[ev.category];
  const isGoing = rsvped.has(ev.id);
  const going = ev.going + (isGoing ? 1 : 0);
  const similar = window.SLE.EVENTS.filter((e) => e.category === ev.category && e.id !== ev.id).slice(0, 3);

  const InfoRow = ({ icon, label, value }) => (
    <div style={{ display: "flex", gap: 13, alignItems: "flex-start" }}>
      <div style={{ width: 40, height: 40, borderRadius: 11, background: "var(--paper-3)", display: "grid", placeItems: "center", color: "var(--accent-ink)", flex: "none" }}>{icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 12.5, color: "var(--ink-3)", fontWeight: 600 }}>{label}</div>
        <div style={{ fontWeight: 600, fontSize: 15 }}>{value}</div></div>
    </div>
  );

  return (
    <div className="rise">
      <div className="wrap" style={{ paddingTop: 20 }}>
        <button className="btn btn-ghost btn-sm" onClick={onBack}><Ic.back /> All events</button>
      </div>
      {/* header band */}
      <div className="wrap" style={{ paddingTop: 18 }}>
        <div style={{ position: "relative", height: 320, borderRadius: "var(--r-lg)", overflow: "hidden", boxShadow: "var(--shadow-lg)" }}>
          <EventPoster ev={ev} label={false} glyphSize="340px" />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,8,6,.78) 0%, transparent 52%)" }} />
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "30px 34px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16, flexWrap: "wrap" }}>
            <div>
              <span className="cat-tag" style={{ background: `hsl(${cat.hue} 75% 55%)`, color: "#fff" }}>{cat.label}</span>
              <h1 style={{ color: "#fff", fontSize: "clamp(30px,4vw,52px)", marginTop: 12, maxWidth: "18ch" }}>{ev.title}</h1>
            </div>
            <div onClick={(e) => e.stopPropagation()}><SaveBtn ev={ev} saved={saved} onToggle={onSave} size={52} /></div>
          </div>
        </div>
      </div>

      <div className="wrap" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 40, paddingTop: 36, alignItems: "start" }}>
        {/* left */}
        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          <p style={{ fontSize: 20, lineHeight: 1.5, color: "var(--ink)", margin: 0, fontWeight: 500 }}>{ev.blurb}</p>
          <div>
            <h3 style={{ fontSize: 22, marginBottom: 10 }}>About this event</h3>
            <p style={{ color: "var(--ink-2)", fontSize: 16.5, lineHeight: 1.65, margin: 0 }}>{ev.about}</p>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {ev.tags.map((t) => <span key={t} className="pill"><Ic.tag style={{ width: 14, height: 14 }} /> {t}</span>)}
          </div>
          <div style={{ borderTop: "1px solid var(--line)", paddingTop: 24, display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 50, height: 50, borderRadius: 14, background: `linear-gradient(135deg, var(--accent), var(--accent-ink))`, color: "#fff", display: "grid", placeItems: "center", fontWeight: 800, fontFamily: "var(--font-display)", fontSize: 19 }}>{ev.organizer[0]}</div>
            <div><div style={{ fontSize: 12.5, color: "var(--ink-3)", fontWeight: 600 }}>Organized by</div>
              <div style={{ fontWeight: 700, fontSize: 16.5, lineHeight: 1.2, marginTop: 2 }}>{ev.organizer}</div>
              <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 2 }}>{ev.organizerType}</div></div>
          </div>
        </div>
        {/* right sticky card */}
        <aside style={{ position: "sticky", top: 88 }}>
          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line-2)", borderRadius: "var(--r-lg)", padding: 24, boxShadow: "var(--shadow-md)", display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 30 }}>{window.SLE.fmtPrice(ev)}</div>
              <div style={{ color: "var(--ink-3)", fontSize: 13.5, fontWeight: 600 }}>{going} going · {ev.capacity - going} left</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <InfoRow icon={<Ic.cal />} label="Date" value={window.SLE.fmtDateLong(ev)} />
              <InfoRow icon={<Ic.clock />} label="Time" value={`${window.SLE.fmtTime(ev.startTime)} – ${window.SLE.fmtTime(ev.endTime)}`} />
              <InfoRow icon={<Ic.pin />} label="Location" value={<>{ev.venue}<br /><span style={{ color: "var(--ink-3)", fontWeight: 500 }}>{ev.address}</span></>} />
            </div>
            {/* capacity bar */}
            <div>
              <div style={{ height: 7, borderRadius: 99, background: "var(--paper-3)", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${Math.min(100, (going / ev.capacity) * 100)}%`, background: "var(--accent)", borderRadius: 99, transition: "width .4s" }} />
              </div>
            </div>
            <button className={"btn btn-block " + (isGoing ? "btn-ghost" : "btn-primary")} onClick={() => onRsvp(ev.id)}>
              {isGoing ? <><Ic.check /> You’re going</> : "RSVP — count me in"}
            </button>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn btn-ghost btn-sm" style={{ flex: 1 }} onClick={() => onSave(ev.id)}>
                <Ic.heart style={{ fill: saved.has(ev.id) ? "var(--accent-2)" : "none", color: saved.has(ev.id) ? "var(--accent-2)" : "currentColor" }} /> {saved.has(ev.id) ? "Saved" : "Save"}
              </button>
              <button className="btn btn-ghost btn-sm" style={{ flex: 1 }} onClick={() => onShare && onShare(ev)}><Ic.share /> Share</button>
            </div>
          </div>
        </aside>
      </div>

      {similar.length > 0 && (
        <div className="wrap" style={{ paddingTop: 52 }}>
          <div className="sec-head"><h2 style={{ fontSize: 28 }}>More {cat.short.toLowerCase()} events</h2></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
            {similar.map((e) => <EventCard key={e.id} ev={e} onOpen={onOpen} saved={saved} onSave={onSave} />)}
          </div>
        </div>
      )}
    </div>
  );
}

/* =================== ADD EVENT =================== */
function AddEventView({ onBack, onCreated }) {
  const empty = { title: "", category: "music", date: "", startTime: "", endTime: "", venue: "", city: "", country: "United Kingdom", address: "", organizer: "", free: true, price: "", currency: "£", blurb: "", tags: "" };
  const [f, setF] = useStateO(empty);
  const [errs, setErrs] = useStateO({});
  const [done, setDone] = useStateO(null);
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));

  const validate = () => {
    const e = {};
    ["title", "date", "startTime", "venue", "city", "organizer", "blurb"].forEach((k) => { if (!String(f[k]).trim()) e[k] = "Required"; });
    if (!f.free && (!f.price || Number(f.price) <= 0)) e.price = "Enter a price";
    if (f.blurb && f.blurb.trim().length < 20) e.blurb = "A little more detail, please (20+ chars)";
    setErrs(e);
    return Object.keys(e).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) { const first = document.querySelector(".input.err, .textarea.err, .select.err"); if (first) first.focus(); return; }
    const ev = {
      id: "user-" + Date.now(), title: f.title.trim(), category: f.category,
      date: f.date, startTime: f.startTime, endTime: f.endTime || f.startTime,
      venue: f.venue.trim(), city: f.city.trim(), country: f.country,
      address: f.address.trim() || f.city.trim(), organizer: f.organizer.trim(), organizerType: "Community member",
      price: f.free ? 0 : Number(f.price), currency: f.currency,
      going: 1, capacity: 100, featured: false,
      tags: f.tags.split(",").map((t) => t.trim()).filter(Boolean).slice(0, 5),
      blurb: f.blurb.trim(), about: f.blurb.trim(),
    };
    window.SLE.EVENTS.unshift(ev);
    setDone(ev);
    window.scrollTo({ top: 0 });
  };

  const cats = Object.values(window.SLE.CATEGORIES);

  if (done) {
    return (
      <div className="wrap rise" style={{ maxWidth: 620, padding: "60px 28px", textAlign: "center" }}>
        <div style={{ width: 70, height: 70, borderRadius: "50%", background: "var(--accent)", color: "#fff", display: "grid", placeItems: "center", margin: "0 auto 22px", boxShadow: "var(--shadow-md)" }}><Ic.check style={{ width: 34, height: 34 }} /></div>
        <h1 style={{ fontSize: 40 }}>Your event is live!</h1>
        <p style={{ color: "var(--ink-2)", fontSize: 17, marginTop: 10 }}>“{done.title}” has been added to the community calendar. Share it with your people to get the RSVPs rolling.</p>
        <div style={{ maxWidth: 360, margin: "26px auto 0" }}><EventCard ev={done} onOpen={() => onCreated(done.id)} saved={new Set()} onSave={() => {}} /></div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 26 }}>
          <button className="btn btn-primary" onClick={() => onCreated(done.id)}>View event <Ic.arrow /></button>
          <button className="btn btn-ghost" onClick={onBack}>Back to events</button>
        </div>
      </div>
    );
  }

  const Field = ({ k, label, children, hint, req }) => (
    <div className="field" style={{ flex: 1 }}>
      <label>{label} {req && <span className="req">*</span>}</label>
      {children}
      {errs[k] ? <span className="field-err">{errs[k]}</span> : hint ? <span className="field-hint">{hint}</span> : null}
    </div>
  );

  return (
    <div className="wrap rise" style={{ maxWidth: 760, padding: "28px 28px 20px" }}>
      <div style={{ marginBottom: 22 }}><button className="btn btn-ghost btn-sm" onClick={onBack}><Ic.back /> Back</button></div>
      <span className="eyebrow" style={{ display: "inline-flex" }}>List your event</span>
      <h1 style={{ fontSize: "clamp(34px,4.4vw,52px)", marginTop: 12 }}>Add an event</h1>
      <p style={{ color: "var(--ink-2)", fontSize: 17, marginTop: 8, marginBottom: 30 }}>Tell the community what’s happening. It takes about two minutes.</p>

      <form onSubmit={submit} noValidate style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <Field k="title" label="Event name" req>
          <input className={"input" + (errs.title ? " err" : "")} value={f.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Bubu Nights: Freetown to London" />
        </Field>

        <div className="field">
          <label>Category <span className="req">*</span></label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {cats.map((c) => (
              <button type="button" key={c.id} className={"chip" + (f.category === c.id ? " on" : "")} onClick={() => set("category", c.id)}>
                <CatDot cat={c.id} /> {c.short}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Field k="date" label="Date" req><input type="date" className={"input" + (errs.date ? " err" : "")} value={f.date} onChange={(e) => set("date", e.target.value)} /></Field>
          <Field k="startTime" label="Start time" req><input type="time" className={"input" + (errs.startTime ? " err" : "")} value={f.startTime} onChange={(e) => set("startTime", e.target.value)} /></Field>
          <Field k="endTime" label="End time"><input type="time" className="input" value={f.endTime} onChange={(e) => set("endTime", e.target.value)} /></Field>
        </div>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Field k="venue" label="Venue" req><input className={"input" + (errs.venue ? " err" : "")} value={f.venue} onChange={(e) => set("venue", e.target.value)} placeholder="Venue name" /></Field>
          <Field k="city" label="City" req><input className={"input" + (errs.city ? " err" : "")} value={f.city} onChange={(e) => set("city", e.target.value)} placeholder="e.g. London" /></Field>
        </div>
        <Field k="address" label="Address" hint="Optional — helps people find you"><input className="input" value={f.address} onChange={(e) => set("address", e.target.value)} placeholder="Street address" /></Field>

        <Field k="organizer" label="Organizer name" req><input className={"input" + (errs.organizer ? " err" : "")} value={f.organizer} onChange={(e) => set("organizer", e.target.value)} placeholder="You or your group" /></Field>

        <div className="field">
          <label>Price</label>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <button type="button" className={"chip" + (f.free ? " on" : "")} onClick={() => set("free", true)}>Free</button>
            <button type="button" className={"chip" + (!f.free ? " on" : "")} onClick={() => set("free", false)}>Ticketed</button>
            {!f.free && (
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <select className="select" style={{ width: 72 }} value={f.currency} onChange={(e) => set("currency", e.target.value)}><option>£</option><option>$</option><option>Le</option></select>
                <input className={"input" + (errs.price ? " err" : "")} style={{ width: 120 }} type="number" min="0" value={f.price} onChange={(e) => set("price", e.target.value)} placeholder="Amount" />
                {errs.price && <span className="field-err">{errs.price}</span>}
              </div>
            )}
          </div>
        </div>

        <Field k="blurb" label="Description" req hint="What is it, who's it for, what should people expect?">
          <textarea className={"textarea" + (errs.blurb ? " err" : "")} value={f.blurb} onChange={(e) => set("blurb", e.target.value)} placeholder="Describe your event…" />
        </Field>

        <Field k="tags" label="Tags" hint="Comma-separated, up to 5 — e.g. Live band, Family friendly">
          <input className="input" value={f.tags} onChange={(e) => set("tags", e.target.value)} placeholder="Afrobeats, Outdoor, Free" />
        </Field>

        <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 8, paddingTop: 20, borderTop: "1px solid var(--line)" }}>
          <button type="submit" className="btn btn-primary btn-lg">Publish event <Ic.arrow /></button>
          <button type="button" className="btn btn-ghost" onClick={onBack}>Cancel</button>
          {Object.keys(errs).length > 0 && <span className="field-err" style={{ marginLeft: "auto" }}>Please fix the highlighted fields.</span>}
        </div>
      </form>
    </div>
  );
}

/* =================== CALENDAR =================== */
function CalendarView({ onOpen, saved, onSave }) {
  const events = window.SLE.EVENTS;
  const firstEv = useMemoO(() => events.slice().sort((a, b) => window.SLE.parseDate(a) - window.SLE.parseDate(b))[0], [events.length]);
  const [view, setView] = useStateO(() => { const d = window.SLE.parseDate(firstEv); return { y: d.getFullYear(), m: d.getMonth() }; });
  const [selKey, setSelKey] = useStateO(firstEv.date);

  const byDay = useMemoO(() => {
    const map = {};
    events.forEach((e) => { (map[e.date] = map[e.date] || []).push(e); });
    return map;
  }, [events.length]);

  const keyFor = (y, m, d) => `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const startDow = new Date(view.y, view.m, 1).getDay();
  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const shift = (delta) => {
    let m = view.m + delta, y = view.y;
    if (m < 0) { m = 11; y--; } if (m > 11) { m = 0; y++; }
    setView({ y, m });
  };
  const selEvents = (byDay[selKey] || []).slice().sort((a, b) => a.startTime.localeCompare(b.startTime));
  const selDate = selKey ? window.SLE.parseDate({ date: selKey }) : null;

  return (
    <div className="wrap rise" style={{ paddingTop: 28 }}>
      <div className="sec-head">
        <div><span className="eyebrow">Plan ahead</span><h1 style={{ fontSize: "clamp(30px,4vw,46px)", marginTop: 10 }}>Community calendar</h1></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr", gap: 28, alignItems: "start" }}>
        {/* calendar */}
        <div style={{ background: "var(--paper-2)", border: "1px solid var(--line-2)", borderRadius: "var(--r-lg)", padding: 22, boxShadow: "var(--shadow-sm)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h2 style={{ fontSize: 24 }}>{window.SLE.MONTHS[view.m]} {view.y}</h2>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-ghost btn-sm" onClick={() => shift(-1)} aria-label="Previous month" style={{ transform: "scaleX(-1)" }}><Ic.arrow /></button>
              <button className="btn btn-ghost btn-sm" onClick={() => shift(1)} aria-label="Next month"><Ic.arrow /></button>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 6 }}>
            {window.SLE.DOW.map((d) => <div key={d} style={{ textAlign: "center", fontSize: 12, fontWeight: 700, color: "var(--ink-3)", padding: "4px 0" }}>{d}</div>)}
            {cells.map((d, i) => {
              if (!d) return <div key={i} />;
              const k = keyFor(view.y, view.m, d);
              const evs = byDay[k] || [];
              const isSel = k === selKey;
              return (
                <button key={i} onClick={() => setSelKey(k)} style={{
                  aspectRatio: "1", border: "1px solid " + (isSel ? "var(--accent)" : "var(--line-2)"), borderRadius: 10,
                  background: isSel ? "color-mix(in oklab, var(--accent) 12%, var(--paper-2))" : "var(--paper-2)",
                  display: "flex", flexDirection: "column", padding: "6px 7px", gap: 4, cursor: "pointer", textAlign: "left",
                  boxShadow: isSel ? "0 0 0 2px color-mix(in oklab, var(--accent) 30%, transparent)" : "none",
                }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: evs.length ? "var(--ink)" : "var(--ink-3)" }}>{d}</span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginTop: "auto" }}>
                    {evs.slice(0, 3).map((e) => <span key={e.id} style={{ width: 7, height: 7, borderRadius: "50%", background: `hsl(${window.SLE.CATEGORIES[e.category].hue} 62% 46%)` }} />)}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        {/* day panel */}
        <div style={{ position: "sticky", top: 88 }}>
          <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 14, fontFamily: "var(--font-display)" }}>
            {selDate ? `${window.SLE.DOW[selDate.getDay()]}, ${window.SLE.MONTHS[selDate.getMonth()]} ${selDate.getDate()}` : "Select a day"}
          </div>
          {selEvents.length === 0 ? (
            <div style={{ color: "var(--ink-3)", padding: "28px 0", border: "1.5px dashed var(--line)", borderRadius: "var(--r-md)", textAlign: "center" }}>No events this day.</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {selEvents.map((e) => (
                <div key={e.id} onClick={() => onOpen(e.id)} style={{ display: "flex", gap: 12, alignItems: "center", background: "var(--paper-2)", border: "1px solid var(--line-2)", borderRadius: "var(--r-md)", padding: 11, cursor: "pointer", boxShadow: "var(--shadow-sm)" }}>
                  <div style={{ width: 52, height: 52, borderRadius: 10, overflow: "hidden", flex: "none" }}><EventPoster ev={e} label={false} glyphSize="44px" /></div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontFamily: "var(--font-display)", fontSize: 16, lineHeight: 1.1 }}>{e.title}</div>
                    <div className="ecard-meta" style={{ marginTop: 3 }}><Ic.clock /> {window.SLE.fmtTime(e.startTime)} · {e.city}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* =================== SAVED =================== */
function SavedView({ saved, onOpen, onSave, go }) {
  const list = window.SLE.EVENTS.filter((e) => saved.has(e.id));
  return (
    <div className="wrap rise" style={{ paddingTop: 28 }}>
      <div className="sec-head"><div><span className="eyebrow">Your list</span><h1 style={{ fontSize: "clamp(30px,4vw,46px)", marginTop: 10 }}>Saved events</h1></div></div>
      {list.length === 0 ? (
        <div style={{ textAlign: "center", padding: "70px 20px", border: "1.5px dashed var(--line)", borderRadius: "var(--r-lg)" }}>
          <Ic.heart style={{ width: 40, height: 40, color: "var(--ink-3)" }} />
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, marginTop: 10 }}>Nothing saved yet</div>
          <p style={{ color: "var(--ink-3)", margin: "8px 0 18px" }}>Tap the heart on any event to keep it here.</p>
          <button className="btn btn-primary" onClick={() => go("home")}>Browse events <Ic.arrow /></button>
        </div>
      ) : (
        <EventList events={list} cardStyle="list" onOpen={onOpen} saved={saved} onSave={onSave} onClear={() => {}} />
      )}
    </div>
  );
}

Object.assign(window, { DetailView, AddEventView, CalendarView, SavedView });
