// app.jsx — root: routing, persistence, tweaks, mount

const { useState, useEffect, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroLayout": "spotlight",
  "cardStyle": "cards",
  "fontPair": "contemporary",
  "accent": ["#1C7D4A", "#0F4A2C", "#E2592B"],
  "cardRadius": 16,
  "dark": false
}/*EDITMODE-END*/;

const FONT_PAIRS = {
  contemporary: { label: "Contemporary", display: "'Bricolage Grotesque'", body: "'Hanken Grotesk'" },
  expressive:   { label: "Expressive",   display: "'Unbounded'",          body: "'Hanken Grotesk'" },
  editorial:    { label: "Editorial",    display: "'Playfair Display'",   body: "'Hanken Grotesk'" },
  grotesk:      { label: "Grotesk",      display: "'Space Grotesk'",      body: "'Space Grotesk'" },
};

function usePersistentSet(key) {
  const [set, setSet] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem(key) || "[]")); } catch (e) { return new Set(); }
  });
  const toggle = (id) => setSet((prev) => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    try { localStorage.setItem(key, JSON.stringify([...next])); } catch (e) {}
    return next;
  });
  return [set, toggle];
}

function Toast({ msg, ok }) {
  return <div className={"toast" + (msg ? " show" : "")}>{ok && <Ic.check className="ok" />}{msg}</div>;
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = useState(() => {
    try { return JSON.parse(localStorage.getItem("sle.route")) || { name: "home" }; } catch (e) { return { name: "home" }; }
  });
  const [saved, toggleSaved] = usePersistentSet("sle.saved");
  const [rsvped, toggleRsvped] = usePersistentSet("sle.rsvped");
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const flash = (msg, ok = true) => {
    setToast({ msg, ok });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  };

  const go = (name, params = {}) => {
    const r = { name, ...params };
    setRoute(r);
    try { localStorage.setItem("sle.route", JSON.stringify(r)); } catch (e) {}
    window.scrollTo({ top: 0 });
  };
  const openEvent = (id) => go("detail", { id });

  const onSave = (id) => { const was = saved.has(id); toggleSaved(id); flash(was ? "Removed from saved" : "Saved to your list"); };
  const onRsvp = (id) => { const was = rsvped.has(id); toggleRsvped(id); flash(was ? "RSVP cancelled" : "You’re going — see you there!"); };
  const onShare = (ev) => { try { navigator.clipboard && navigator.clipboard.writeText(window.location.href); } catch (e) {} flash("Event link copied"); };

  // apply tweaks to root
  const accent = Array.isArray(t.accent) ? t.accent : TWEAK_DEFAULTS.accent;
  const pair = FONT_PAIRS[t.fontPair] || FONT_PAIRS.contemporary;
  const rootStyle = {
    "--accent": accent[0], "--accent-ink": accent[1], "--accent-2": accent[2],
    "--r-card": t.cardRadius + "px",
    "--font-display": pair.display + ", system-ui, sans-serif",
    "--font-body": pair.body + ", system-ui, sans-serif",
  };
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", t.dark ? "dark" : "light");
  }, [t.dark]);

  const current = route.name === "detail" ? window.SLE.EVENTS.find((e) => e.id === route.id) : null;

  return (
    <div className="app-bg" style={rootStyle}>
      <Nav route={route} go={go} savedCount={saved.size} onAdd={() => go("add")} />

      {route.name === "home" && <HomeView tweaks={t} onOpen={openEvent} saved={saved} onSave={onSave} go={go} />}
      {route.name === "detail" && <DetailView ev={current} onBack={() => go("home")} onOpen={openEvent} saved={saved} onSave={onSave} rsvped={rsvped} onRsvp={onRsvp} onShare={onShare} />}
      {route.name === "add" && <AddEventView onBack={() => go("home")} onCreated={(id) => go("detail", { id })} />}
      {route.name === "calendar" && <CalendarView onOpen={openEvent} saved={saved} onSave={onSave} />}
      {route.name === "saved" && <SavedView saved={saved} onOpen={openEvent} onSave={onSave} go={go} />}

      <Footer onAdd={() => go("add")} />

      <Toast msg={toast && toast.msg} ok={toast && toast.ok} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Hero treatment" />
        <TweakRadio label="Layout" value={t.heroLayout} options={["spotlight", "split", "marquee"]} onChange={(v) => { setTweak("heroLayout", v); if (route.name !== "home") go("home"); }} />
        <TweakSection label="Events list" />
        <TweakRadio label="Card style" value={t.cardStyle} options={["cards", "list", "magazine"]} onChange={(v) => { setTweak("cardStyle", v); if (route.name !== "home") go("home"); }} />
        <TweakSlider label="Card corners" value={t.cardRadius} min={4} max={28} unit="px" onChange={(v) => setTweak("cardRadius", v)} />
        <TweakSection label="Typography" />
        <TweakSelect label="Font pairing" value={t.fontPair}
          options={Object.keys(FONT_PAIRS).map((k) => ({ value: k, label: FONT_PAIRS[k].label }))}
          onChange={(v) => setTweak("fontPair", v)} />
        <TweakSection label="Color & theme" />
        <TweakColor label="Accent palette" value={t.accent}
          options={[
            ["#1C7D4A", "#0F4A2C", "#E2592B"],
            ["#1E63C4", "#123E80", "#E8A33D"],
            ["#E2592B", "#9A3210", "#1C7D4A"],
            ["#7A3CB0", "#4A2270", "#E2592B"],
            ["#2A2620", "#15120E", "#C2603A"],
          ]}
          onChange={(v) => setTweak("accent", v)} />
        <TweakToggle label="Dark mode" value={t.dark} onChange={(v) => setTweak("dark", v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
