// Alex Reich Consulting — interactive components
const { useState, useEffect, useRef, useMemo } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#c2410c",
  "theme": "light",
  "showRepoFlags": true,
  "denseCaps": false
}/*EDITMODE-END*/;

function cx(...xs) { return xs.filter(Boolean).join(" "); }

// ---- scroll spy hook ----
function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids.join(",")]);
  return active;
}

// ---- count-up on view ----
function CountUp({ value, prefix = "", suffix = "", decimals = 0 }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !done.current) {
          done.current = true;
          const dur = 1100, t0 = performance.now();
          const tick = (t) => {
            const p = Math.min(1, (t - t0) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(value * eased);
            if (p < 1) requestAnimationFrame(tick);
            else setN(value);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);
  const display = decimals > 0 ? n.toFixed(decimals) : Math.round(n).toString();
  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

// ---- NAV ----
function Nav({ data, active }) {
  const [open, setOpen] = useState(false);
  const links = [
    ["services", "Services"],
    ["capabilities", "Capabilities"],
    ["work", "Work"],
    ["ventures", "Ventures"],
    ["about", "About"],
  ];
  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: "smooth" });
  };
  return (
    <nav className="nav">
      <a href="#top" className="nav-brand" onClick={go("top")}>
        <span className="nav-mark">{data.brandShort}</span>
        <span className="nav-brand-text">{data.brand}</span>
      </a>
      <div className={cx("nav-links", open && "nav-links-open")}>
        {links.map(([id, label]) => (
          <a key={id} href={"#" + id} onClick={go(id)} className={cx("nav-link", active === id && "nav-link-active")}>
            {label}
          </a>
        ))}
        <a href="#contact" onClick={go("contact")} className="nav-cta">Book a call</a>
      </div>
      <button className="nav-burger" onClick={() => setOpen(!open)} aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </nav>
  );
}

// ---- HERO ----
function Hero({ data }) {
  const go = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: "smooth" });
  };
  return (
    <header className="hero" id="top" data-screen-label="Hero">
      <div className="hero-inner">
        <div className="hero-kicker"><span className="dot"></span>{data.hero.kicker}</div>
        <h1 className="hero-title">{data.hero.title}</h1>
        <p className="hero-sub">{data.hero.sub}</p>
        <div className="hero-ctas">
          <a href="#contact" className="btn btn-primary" onClick={go("contact")}>{data.hero.cta1}</a>
          <a href="#work" className="btn btn-ghost" onClick={go("work")}>{data.hero.cta2} <span className="arr">→</span></a>
        </div>
        <div className="hero-stats">
          {data.stats.map((s, i) => (
            <div className="hstat" key={i}>
              <div className="hstat-val">
                <CountUp value={s.value} prefix={s.prefix || ""} suffix={s.suffix || ""} decimals={s.value % 1 !== 0 ? 1 : 0} />
              </div>
              <div className="hstat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

// ---- SECTION LABEL ----
function SecLabel({ n, children }) {
  return <div className="sec-label"><span className="sec-num">{n}</span>{children}</div>;
}

// ---- SERVICES ----
function Services({ data }) {
  return (
    <section className="section" id="services" data-screen-label="Services">
      <div className="section-head">
        <SecLabel n="01">What I do</SecLabel>
        <h2 className="section-title">Six ways I plug into a team</h2>
      </div>
      <div className="svc-grid">
        {data.services.map((s) => (
          <article className={cx("svc", s.wide && "svc-wide")} key={s.n}>
            <div className="svc-n">{s.n}</div>
            <h3 className="svc-title">{s.title}</h3>
            <p className="svc-body">{s.body}</p>
            <div className="svc-tags">
              {s.tags.map((t) => <span key={t} className="svc-tag">{t}</span>)}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// ---- CAPABILITIES ----
function Capabilities({ data, tweaks }) {
  const groups = data.capabilities;
  const [activeGroup, setActiveGroup] = useState("All");
  const tabs = ["All", ...groups.map((g) => g.group)];
  const shown = activeGroup === "All" ? groups : groups.filter((g) => g.group === activeGroup);
  return (
    <section className={cx("section", "caps", tweaks.denseCaps && "caps-dense")} id="capabilities" data-screen-label="Capabilities">
      <div className="section-head">
        <SecLabel n="02">Capabilities</SecLabel>
        <h2 className="section-title">The stack, as it actually ships</h2>
        {tweaks.showRepoFlags && (
          <p className="caps-legend"><span className="repo-dot"></span> surfaced directly from analyzing the live codebases</p>
        )}
      </div>
      <div className="caps-tabs">
        {tabs.map((t) => (
          <button key={t} className={cx("caps-tab", activeGroup === t && "caps-tab-active")} onClick={() => setActiveGroup(t)}>
            {t}
          </button>
        ))}
      </div>
      <div className="caps-groups">
        {shown.map((g) => (
          <div className="cap-group" key={g.group}>
            <div className="cap-group-title">{g.group}</div>
            <div className="cap-items">
              {g.items.map((it) => (
                <span key={it.t} className={cx("cap", it.repo && tweaks.showRepoFlags && "cap-repo")}>
                  {it.repo && tweaks.showRepoFlags && <span className="repo-dot" aria-label="from repos"></span>}
                  {it.t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---- WORK ----
function Work({ data }) {
  const [openId, setOpenId] = useState(data.work[0].id);
  return (
    <section className="section" id="work" data-screen-label="Work">
      <div className="section-head">
        <SecLabel n="03">Selected work</SecLabel>
        <h2 className="section-title">Shipped under real constraints</h2>
      </div>
      <div className="work-list">
        {data.work.map((w) => {
          const open = openId === w.id;
          return (
            <article className={cx("case", open && "case-open")} key={w.id}>
              <button className="case-head" onClick={() => setOpenId(open ? null : w.id)}>
                <div className="case-head-main">
                  <div className="case-meta">
                    <span className="case-client">{w.client}</span>
                    <span className="case-sep">·</span>
                    <span className="case-role">{w.role}</span>
                    <span className="case-sep">·</span>
                    <span className="case-year">{w.year}</span>
                  </div>
                  <h3 className="case-title">{w.title}</h3>
                  <p className="case-summary">{w.summary}</p>
                </div>
                <div className="case-head-side">
                  <div className="case-metric">{w.metric}</div>
                  <div className="case-metric-label">{w.metricLabel}</div>
                  <div className="case-toggle" aria-hidden="true">{open ? "–" : "+"}</div>
                </div>
              </button>
              <div className="case-body" style={{ maxHeight: open ? "640px" : "0px" }}>
                <div className="case-body-inner">
                  <ul className="case-detail">
                    {w.detail.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                  <div className="case-stack">
                    {w.stack.map((s) => <span key={s} className="case-chip">{s}</span>)}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

// ---- VENTURES ----
function Ventures({ data }) {
  const items = data.ventures;
  const featured = items.find((v) => v.featured);
  const rest = items.filter((v) => !v.featured);
  return (
    <section className="section" id="ventures" data-screen-label="Ventures">
      <div className="section-head">
        <SecLabel n="04">Building now</SecLabel>
        <h2 className="section-title">Products I own, not just deliver</h2>
      </div>
      <div className="ventures">
        {featured && (
          <a className="venture venture-feat" href={featured.url} target="_blank" rel="noreferrer">
            <div className="venture-top">
              <span className="venture-role">{featured.role}</span>
              <span className="venture-status venture-status-live">{featured.status}</span>
            </div>
            <h3 className="venture-name">{featured.name}</h3>
            <p className="venture-blurb">{featured.blurb}</p>
            <div className="venture-stack">
              {featured.stack.map((s) => <span key={s} className="venture-chip">{s}</span>)}
            </div>
            <span className="venture-link">{featured.urlLabel} <span className="arr">↗</span></span>
          </a>
        )}
        <div className="venture-rest">
          {rest.map((v) => (
            <a className="venture" key={v.name} href={v.url} target="_blank" rel="noreferrer">
              <div className="venture-top">
                <span className="venture-role">{v.role}</span>
                <span className="venture-status">{v.status}</span>
              </div>
              <h3 className="venture-name">{v.name}</h3>
              <p className="venture-blurb">{v.blurb}</p>
              <div className="venture-stack">
                {v.stack.map((s) => <span key={s} className="venture-chip">{s}</span>)}
              </div>
              <span className="venture-link">{v.urlLabel} <span className="arr">↗</span></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- CAREER TIMELINE ----
function Career({ data }) {
  const span = data.career[0].years.split(" ")[2] || "2026";
  return (
    <section className="section" id="career" data-screen-label="Career">
      <div className="section-head">
        <SecLabel n="06">Track record</SecLabel>
        <h2 className="section-title">Twenty-six roles, since 1997</h2>
        <p className="caps-legend">The full arc — founder, CTO, VP, architect, and hands-on engineer.</p>
      </div>
      <ol className="career-list">
        {data.career.map((c, i) => (
          <li className="career-row" key={i}>
            <span className="career-years">{c.years}</span>
            <span className="career-co">{c.co}</span>
            <span className="career-role">{c.role}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

// ---- OPEN SOURCE ----
function OpenSource({ data }) {
  return (
    <section className="section" id="opensource" data-screen-label="Open source">
      <div className="section-head">
        <SecLabel n="05">Open source</SecLabel>
        <h2 className="section-title">Code that's out in the world</h2>
      </div>
      <div className="oss-grid">
        {data.openSource.map((o) => (
          <article className="oss" key={o.name}>
            <div className="oss-top">
              <span className="oss-role">{o.role}</span>
              <span className="oss-tag">{o.tag}</span>
            </div>
            <h3 className="oss-name">{o.name}</h3>
            <p className="oss-note">{o.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

// ---- CLIENTS ----
function Clients({ data }) {
  return (
    <section className="clients-band" aria-label="Selected clients">
      <div className="clients-label">Trusted by teams at</div>
      <div className="clients-marquee">
        <div className="clients-track">
          {[...data.clients, ...data.clients].map((c, i) => (
            <span className="client" key={i}>{c}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- ABOUT ----
function About({ data }) {
  return (
    <section className="section about" id="about" data-screen-label="About">
      <div className="section-head">
        <SecLabel n="06">About</SecLabel>
        <h2 className="section-title">{data.about.lead}</h2>
      </div>
      <div className="about-grid">
        <p className="about-body">{data.about.body}</p>
        <div className="about-side">
          <div className="about-block">
            <div className="about-block-label">Speaking & writing</div>
            <ul>{data.about.speaking.map((s, i) => <li key={i}>{s}</li>)}</ul>
          </div>
          <div className="about-block">
            <div className="about-block-label">Beyond the keyboard</div>
            <p>{data.about.beyond}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- CONTACT ----
function Contact({ data }) {
  return (
    <section className="contact" id="contact" data-screen-label="Contact">
      <div className="contact-inner">
        <div className="contact-kicker"><span className="dot"></span>Available for select engagements</div>
        <h2 className="contact-title">Let's build something that ships.</h2>
        <p className="contact-sub">Fractional leadership, full-stack delivery, or a hard architecture problem — tell me what you're up against.</p>
        <div className="contact-actions">
          <a className="btn btn-primary btn-lg" href={"mailto:" + data.email}>{data.email}</a>
          <a className="btn btn-ghost btn-lg" href={"tel:+13102918969"}>{data.phone}</a>
        </div>
        <div className="contact-meta">
          <span>{data.location}</span>
          <span className="contact-dot">·</span>
          <a href={"https://" + data.github} target="_blank" rel="noreferrer">{data.github}</a>
        </div>
      </div>
    </section>
  );
}

// ---- FOOTER ----
function Footer({ data }) {
  return (
    <footer className="footer">
      <div className="footer-brand">{data.brand}</div>
      <div className="footer-meta">© {new Date().getFullYear()} Alex Reich · Built hands-on</div>
    </footer>
  );
}

// ---- TWEAKS ----
function SiteTweaks({ tweaks, setTweak }) {
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Look">
        <TweakRadio label="Theme" value={tweaks.theme} onChange={(v) => setTweak("theme", v)}
          options={[{ value: "light", label: "Light" }, { value: "dark", label: "Dark" }]} />
        <TweakColor label="Accent" value={tweaks.accent} onChange={(v) => setTweak("accent", v)}
          options={["#c2410c", "#1f6f5c", "#3a4a8c", "#9a3412"]} />
      </TweakSection>
      <TweakSection title="Capabilities">
        <TweakToggle label="Flag repo-found skills" checked={tweaks.showRepoFlags} onChange={(v) => setTweak("showRepoFlags", v)} />
        <TweakToggle label="Dense layout" checked={tweaks.denseCaps} onChange={(v) => setTweak("denseCaps", v)} />
      </TweakSection>
    </TweaksPanel>
  );
}

// ---- APP ----
function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const data = window.SITE;
  const active = useScrollSpy(["services", "capabilities", "work", "ventures", "about"]);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = tweaks.theme;
    root.style.setProperty("--accent", tweaks.accent);
  }, [tweaks.theme, tweaks.accent]);

  return (
    <div className="site">
      <Nav data={data} active={active} />
      <Hero data={data} />
      <Services data={data} />
      <Capabilities data={data} tweaks={tweaks} />
      <Work data={data} />
      <Clients data={data} />
      <Ventures data={data} />
      <OpenSource data={data} />
      <About data={data} />
      <Contact data={data} />
      <Footer data={data} />
      <SiteTweaks tweaks={tweaks} setTweak={setTweak} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
