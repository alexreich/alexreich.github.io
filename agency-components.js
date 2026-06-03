// Alex Reich Consulting — interactive components
const {
  useState,
  useEffect,
  useRef,
  useMemo
} = React;
const CAPS_OPTS = {
  showRepoFlags: true,
  denseCaps: false
};
function cx(...xs) {
  return xs.filter(Boolean).join(" ");
}

// ---- scroll spy hook ----
function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, {
      rootMargin: "-45% 0px -50% 0px",
      threshold: 0
    });
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids.join(",")]);
  return active;
}

// ---- count-up on view ----
function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0
}) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && !done.current) {
          done.current = true;
          const dur = 1100,
            t0 = performance.now();
          const tick = t => {
            const p = Math.min(1, (t - t0) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(value * eased);
            if (p < 1) requestAnimationFrame(tick);else setN(value);
          };
          requestAnimationFrame(tick);
        }
      });
    }, {
      threshold: 0.4
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);
  const display = decimals > 0 ? n.toFixed(decimals) : Math.round(n).toString();
  return /*#__PURE__*/React.createElement("span", {
    ref: ref
  }, prefix, display, suffix);
}

// ---- NAV ----
function Nav({
  data,
  active
}) {
  const [open, setOpen] = useState(false);
  const links = [["services", "Services"], ["capabilities", "Capabilities"], ["work", "Work"], ["ventures", "Ventures"], ["about", "About"]];
  const go = id => e => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (el) window.scrollTo({
      top: el.offsetTop - 72,
      behavior: "smooth"
    });
  };
  return /*#__PURE__*/React.createElement("nav", {
    className: "nav"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#top",
    className: "nav-brand",
    onClick: go("top")
  }, /*#__PURE__*/React.createElement("span", {
    className: "nav-mark"
  }, data.brandShort), /*#__PURE__*/React.createElement("span", {
    className: "nav-brand-text"
  }, data.brand)), /*#__PURE__*/React.createElement("div", {
    className: cx("nav-links", open && "nav-links-open")
  }, links.map(([id, label]) => /*#__PURE__*/React.createElement("a", {
    key: id,
    href: "#" + id,
    onClick: go(id),
    className: cx("nav-link", active === id && "nav-link-active")
  }, label)), /*#__PURE__*/React.createElement("a", {
    href: "#contact",
    onClick: go("contact"),
    className: "nav-cta"
  }, "Book a call")), /*#__PURE__*/React.createElement("button", {
    className: "nav-burger",
    onClick: () => setOpen(!open),
    "aria-label": "Menu"
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null)));
}

// ---- HERO ----
function Hero({
  data
}) {
  const go = id => e => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({
      top: el.offsetTop - 72,
      behavior: "smooth"
    });
  };
  return /*#__PURE__*/React.createElement("header", {
    className: "hero",
    id: "top",
    "data-screen-label": "Hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-kicker"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), data.hero.kicker), /*#__PURE__*/React.createElement("h1", {
    className: "hero-title"
  }, data.hero.title), /*#__PURE__*/React.createElement("p", {
    className: "hero-sub"
  }, data.hero.sub), /*#__PURE__*/React.createElement("div", {
    className: "hero-ctas"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#contact",
    className: "btn btn-primary",
    onClick: go("contact")
  }, data.hero.cta1), /*#__PURE__*/React.createElement("a", {
    href: "#work",
    className: "btn btn-ghost",
    onClick: go("work")
  }, data.hero.cta2, " ", /*#__PURE__*/React.createElement("span", {
    className: "arr"
  }, "\u2192"))), /*#__PURE__*/React.createElement("div", {
    className: "hero-stats"
  }, data.stats.map((s, i) => /*#__PURE__*/React.createElement("div", {
    className: "hstat",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "hstat-val"
  }, /*#__PURE__*/React.createElement(CountUp, {
    value: s.value,
    prefix: s.prefix || "",
    suffix: s.suffix || "",
    decimals: s.value % 1 !== 0 ? 1 : 0
  })), /*#__PURE__*/React.createElement("div", {
    className: "hstat-label"
  }, s.label))))), /*#__PURE__*/React.createElement("div", {
    className: "hero-photo-wrap"
  }, /*#__PURE__*/React.createElement("img", {
    src: "AlexReich.jpg",
    alt: "Alex Reich"
  }))));
}

// ---- LOCAL ----
function LocalSection() {
  const go = id => e => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({
      top: el.offsetTop - 72,
      behavior: "smooth"
    });
  };
  const cities = ["Lake Elsinore", "Temecula", "Murrieta", "Menifee", "Wildomar", "Canyon Lake", "Corona", "Perris", "Riverside County"];
  return /*#__PURE__*/React.createElement("section", {
    className: "local",
    id: "local",
    "data-screen-label": "Local"
  }, /*#__PURE__*/React.createElement("div", {
    className: "local-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "local-kicker"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), "Based in Lake Elsinore, CA"), /*#__PURE__*/React.createElement("div", {
    className: "local-layout"
  }, /*#__PURE__*/React.createElement("div", {
    className: "local-left"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "local-title"
  }, "Your business software shouldn't be holding you back."), /*#__PURE__*/React.createElement("p", {
    className: "local-body"
  }, "If your order system, scheduling tool, or inventory tracker has been \"good enough\" for years \u2014 until it wasn't \u2014 you don't need to put a full-time developer on staff. You need a senior engineer who can come in, understand what you have, fix what's broken, and make it safe to grow again. I work directly with local business owners, no long-term contract required."), /*#__PURE__*/React.createElement("ul", {
    className: "local-bullets"
  }, /*#__PURE__*/React.createElement("li", null, "Order management, inventory, and scheduling tools that have outgrown Excel or Access"), /*#__PURE__*/React.createElement("li", null, "Custom software that's slow, fragile, or tied to a vendor you can no longer reach"), /*#__PURE__*/React.createElement("li", null, "Modernizing what works \u2014 without throwing away what you've built")), /*#__PURE__*/React.createElement("a", {
    href: "#contact",
    className: "btn btn-primary",
    onClick: go("contact")
  }, "Book a free conversation")), /*#__PURE__*/React.createElement("div", {
    className: "local-right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "area-label"
  }, "Serving businesses in"), /*#__PURE__*/React.createElement("div", {
    className: "area-chips"
  }, cities.map(c => /*#__PURE__*/React.createElement("span", {
    key: c,
    className: "area-chip"
  }, c)))))));
}

// ---- SECTION LABEL ----
function SecLabel({
  n,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "sec-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sec-num"
  }, n), children);
}

// ---- SERVICES ----
function Services({
  data
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "services",
    "data-screen-label": "Services"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement(SecLabel, {
    n: "01"
  }, "What I do"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, "How I plug into a team")), /*#__PURE__*/React.createElement("div", {
    className: "svc-grid"
  }, data.services.map(s => /*#__PURE__*/React.createElement("article", {
    className: cx("svc", s.wide && "svc-wide"),
    key: s.n
  }, /*#__PURE__*/React.createElement("div", {
    className: "svc-n"
  }, s.n), /*#__PURE__*/React.createElement("h3", {
    className: "svc-title"
  }, s.title), /*#__PURE__*/React.createElement("p", {
    className: "svc-body"
  }, s.body), /*#__PURE__*/React.createElement("div", {
    className: "svc-tags"
  }, s.tags.map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    className: "svc-tag"
  }, t)))))));
}

// ---- CAPABILITIES ----
function Capabilities({
  data,
  tweaks
}) {
  const groups = data.capabilities;
  const [activeGroup, setActiveGroup] = useState("All");
  const tabs = ["All", ...groups.map(g => g.group)];
  const shown = activeGroup === "All" ? groups : groups.filter(g => g.group === activeGroup);
  return /*#__PURE__*/React.createElement("section", {
    className: cx("section", "caps", tweaks.denseCaps && "caps-dense"),
    id: "capabilities",
    "data-screen-label": "Capabilities"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement(SecLabel, {
    n: "02"
  }, "Capabilities"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, "The stack, as it actually ships"), tweaks.showRepoFlags && /*#__PURE__*/React.createElement("p", {
    className: "caps-legend"
  }, /*#__PURE__*/React.createElement("span", {
    className: "repo-dot"
  }), " surfaced directly from analyzing the live codebases")), /*#__PURE__*/React.createElement("div", {
    className: "caps-tabs"
  }, tabs.map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    className: cx("caps-tab", activeGroup === t && "caps-tab-active"),
    onClick: () => setActiveGroup(t)
  }, t))), /*#__PURE__*/React.createElement("div", {
    className: "caps-groups"
  }, shown.map(g => /*#__PURE__*/React.createElement("div", {
    className: "cap-group",
    key: g.group
  }, /*#__PURE__*/React.createElement("div", {
    className: "cap-group-title"
  }, g.group), /*#__PURE__*/React.createElement("div", {
    className: "cap-items"
  }, g.items.map(it => /*#__PURE__*/React.createElement("span", {
    key: it.t,
    className: cx("cap", it.repo && tweaks.showRepoFlags && "cap-repo")
  }, it.repo && tweaks.showRepoFlags && /*#__PURE__*/React.createElement("span", {
    className: "repo-dot",
    "aria-label": "from repos"
  }), it.t)))))));
}

// ---- WORK ----
function Work({
  data
}) {
  const [openId, setOpenId] = useState(data.work[0].id);
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "work",
    "data-screen-label": "Work"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement(SecLabel, {
    n: "03"
  }, "Selected work"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, "Shipped under real constraints")), /*#__PURE__*/React.createElement("div", {
    className: "work-list"
  }, data.work.map(w => {
    const open = openId === w.id;
    return /*#__PURE__*/React.createElement("article", {
      className: cx("case", open && "case-open"),
      key: w.id
    }, /*#__PURE__*/React.createElement("button", {
      className: "case-head",
      onClick: () => setOpenId(open ? null : w.id)
    }, /*#__PURE__*/React.createElement("div", {
      className: "case-head-main"
    }, /*#__PURE__*/React.createElement("div", {
      className: "case-meta"
    }, /*#__PURE__*/React.createElement("span", {
      className: "case-client"
    }, w.client), /*#__PURE__*/React.createElement("span", {
      className: "case-sep"
    }, "\xB7"), /*#__PURE__*/React.createElement("span", {
      className: "case-role"
    }, w.role), /*#__PURE__*/React.createElement("span", {
      className: "case-sep"
    }, "\xB7"), /*#__PURE__*/React.createElement("span", {
      className: "case-year"
    }, w.year)), /*#__PURE__*/React.createElement("h3", {
      className: "case-title"
    }, w.title), /*#__PURE__*/React.createElement("p", {
      className: "case-summary"
    }, w.summary)), /*#__PURE__*/React.createElement("div", {
      className: "case-head-side"
    }, /*#__PURE__*/React.createElement("div", {
      className: "case-metric"
    }, w.metric), /*#__PURE__*/React.createElement("div", {
      className: "case-metric-label"
    }, w.metricLabel), /*#__PURE__*/React.createElement("div", {
      className: "case-toggle",
      "aria-hidden": "true"
    }, open ? "–" : "+"))), /*#__PURE__*/React.createElement("div", {
      className: "case-body",
      style: {
        maxHeight: open ? "640px" : "0px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "case-body-inner"
    }, /*#__PURE__*/React.createElement("ul", {
      className: "case-detail"
    }, w.detail.map((d, i) => /*#__PURE__*/React.createElement("li", {
      key: i
    }, d))), /*#__PURE__*/React.createElement("div", {
      className: "case-stack"
    }, w.stack.map(s => /*#__PURE__*/React.createElement("span", {
      key: s,
      className: "case-chip"
    }, s))))));
  })));
}

// ---- VENTURES ----
function Ventures({
  data
}) {
  const items = data.ventures;
  const featured = items.find(v => v.featured);
  const rest = items.filter(v => !v.featured);
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "ventures",
    "data-screen-label": "Ventures"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement(SecLabel, {
    n: "04"
  }, "Building now"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, "Products I own, not just deliver")), /*#__PURE__*/React.createElement("div", {
    className: "ventures"
  }, featured && /*#__PURE__*/React.createElement("a", {
    className: "venture venture-feat",
    href: featured.url,
    target: "_blank",
    rel: "noreferrer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "venture-top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "venture-role"
  }, featured.role), /*#__PURE__*/React.createElement("span", {
    className: "venture-status venture-status-live"
  }, featured.status)), /*#__PURE__*/React.createElement("h3", {
    className: "venture-name"
  }, featured.name), /*#__PURE__*/React.createElement("p", {
    className: "venture-blurb"
  }, featured.blurb), /*#__PURE__*/React.createElement("div", {
    className: "venture-stack"
  }, featured.stack.map(s => /*#__PURE__*/React.createElement("span", {
    key: s,
    className: "venture-chip"
  }, s))), /*#__PURE__*/React.createElement("span", {
    className: "venture-link"
  }, featured.urlLabel, " ", /*#__PURE__*/React.createElement("span", {
    className: "arr"
  }, "\u2197"))), /*#__PURE__*/React.createElement("div", {
    className: "venture-rest"
  }, rest.map(v => /*#__PURE__*/React.createElement("a", {
    className: "venture",
    key: v.name,
    href: v.url,
    target: "_blank",
    rel: "noreferrer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "venture-top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "venture-role"
  }, v.role), /*#__PURE__*/React.createElement("span", {
    className: "venture-status"
  }, v.status)), /*#__PURE__*/React.createElement("h3", {
    className: "venture-name"
  }, v.name), /*#__PURE__*/React.createElement("p", {
    className: "venture-blurb"
  }, v.blurb), /*#__PURE__*/React.createElement("div", {
    className: "venture-stack"
  }, v.stack.map(s => /*#__PURE__*/React.createElement("span", {
    key: s,
    className: "venture-chip"
  }, s))), /*#__PURE__*/React.createElement("span", {
    className: "venture-link"
  }, v.urlLabel, " ", /*#__PURE__*/React.createElement("span", {
    className: "arr"
  }, "\u2197")))))));
}

// ---- CAREER TIMELINE ----
function Career({
  data
}) {
  const span = data.career[0].years.split(" ")[2] || "2026";
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "career",
    "data-screen-label": "Career"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement(SecLabel, {
    n: "06"
  }, "Track record"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, "Twenty-six roles, since 1997"), /*#__PURE__*/React.createElement("p", {
    className: "caps-legend"
  }, "The full arc \u2014 founder, CTO, VP, architect, and hands-on engineer.")), /*#__PURE__*/React.createElement("ol", {
    className: "career-list"
  }, data.career.map((c, i) => /*#__PURE__*/React.createElement("li", {
    className: "career-row",
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "career-years"
  }, c.years), /*#__PURE__*/React.createElement("span", {
    className: "career-co"
  }, c.co), /*#__PURE__*/React.createElement("span", {
    className: "career-role"
  }, c.role)))));
}

// ---- OPEN SOURCE ----
function OpenSource({
  data
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "opensource",
    "data-screen-label": "Open source"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement(SecLabel, {
    n: "05"
  }, "Open source"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, "Code that's out in the world")), /*#__PURE__*/React.createElement("div", {
    className: "oss-grid"
  }, data.openSource.map(o => /*#__PURE__*/React.createElement("article", {
    className: "oss",
    key: o.name
  }, /*#__PURE__*/React.createElement("div", {
    className: "oss-top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "oss-role"
  }, o.role), /*#__PURE__*/React.createElement("span", {
    className: "oss-tag"
  }, o.tag)), /*#__PURE__*/React.createElement("h3", {
    className: "oss-name"
  }, o.name), /*#__PURE__*/React.createElement("p", {
    className: "oss-note"
  }, o.note)))));
}

// ---- CLIENTS ----
function Clients({
  data
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "clients-band",
    "aria-label": "Selected clients"
  }, /*#__PURE__*/React.createElement("div", {
    className: "clients-label"
  }, "Trusted by teams at"), /*#__PURE__*/React.createElement("div", {
    className: "clients-marquee"
  }, /*#__PURE__*/React.createElement("div", {
    className: "clients-track"
  }, [...data.clients, ...data.clients].map((c, i) => /*#__PURE__*/React.createElement("span", {
    className: "client",
    key: i
  }, c)))));
}

// ---- ABOUT ----
function About({
  data
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "section about",
    id: "about",
    "data-screen-label": "About"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement(SecLabel, {
    n: "06"
  }, "About"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, data.about.lead)), /*#__PURE__*/React.createElement("div", {
    className: "about-grid"
  }, /*#__PURE__*/React.createElement("p", {
    className: "about-body"
  }, data.about.body), /*#__PURE__*/React.createElement("div", {
    className: "about-side"
  }, /*#__PURE__*/React.createElement("div", {
    className: "about-block"
  }, /*#__PURE__*/React.createElement("div", {
    className: "about-block-label"
  }, "Speaking & writing"), /*#__PURE__*/React.createElement("ul", null, data.about.speaking.map((s, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, s)))), /*#__PURE__*/React.createElement("div", {
    className: "about-block"
  }, /*#__PURE__*/React.createElement("div", {
    className: "about-block-label"
  }, "Beyond the keyboard"), /*#__PURE__*/React.createElement("p", null, data.about.beyond)))));
}

// ---- CONTACT ----
function Contact({
  data
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "contact",
    id: "contact",
    "data-screen-label": "Contact"
  }, /*#__PURE__*/React.createElement("div", {
    className: "contact-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "contact-kicker"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), "Available for select engagements"), /*#__PURE__*/React.createElement("h2", {
    className: "contact-title"
  }, "Let's build something that ships."), /*#__PURE__*/React.createElement("p", {
    className: "contact-sub"
  }, "Fractional leadership, full-stack delivery, or a hard architecture problem \u2014 tell me what you're up against."), /*#__PURE__*/React.createElement("div", {
    className: "contact-actions"
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn btn-primary btn-lg",
    href: "mailto:" + data.email
  }, data.email), /*#__PURE__*/React.createElement("a", {
    className: "btn btn-ghost btn-lg",
    href: "tel:+13102918969"
  }, data.phone)), /*#__PURE__*/React.createElement("div", {
    className: "contact-meta"
  }, /*#__PURE__*/React.createElement("span", null, data.location), /*#__PURE__*/React.createElement("span", {
    className: "contact-dot"
  }, "\xB7"), /*#__PURE__*/React.createElement("a", {
    href: "https://" + data.github,
    target: "_blank",
    rel: "noreferrer"
  }, data.github))));
}

// ---- FOOTER ----
function Footer({
  data
}) {
  return /*#__PURE__*/React.createElement("footer", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-brand"
  }, data.brand), /*#__PURE__*/React.createElement("div", {
    className: "footer-meta"
  }, "\xA9 ", new Date().getFullYear(), " Alex Reich \xB7 Built hands-on"));
}

// ---- APP ----
function App() {
  const data = window.SITE;
  const active = useScrollSpy(["services", "capabilities", "work", "ventures", "about"]);
  return /*#__PURE__*/React.createElement("div", {
    className: "site"
  }, /*#__PURE__*/React.createElement(Nav, {
    data: data,
    active: active
  }), /*#__PURE__*/React.createElement(Hero, {
    data: data
  }), /*#__PURE__*/React.createElement(LocalSection, null), /*#__PURE__*/React.createElement(Services, {
    data: data
  }), /*#__PURE__*/React.createElement(Capabilities, {
    data: data,
    tweaks: CAPS_OPTS
  }), /*#__PURE__*/React.createElement(Work, {
    data: data
  }), /*#__PURE__*/React.createElement(Clients, {
    data: data
  }), /*#__PURE__*/React.createElement(Ventures, {
    data: data
  }), /*#__PURE__*/React.createElement(OpenSource, {
    data: data
  }), /*#__PURE__*/React.createElement(About, {
    data: data
  }), /*#__PURE__*/React.createElement(Contact, {
    data: data
  }), /*#__PURE__*/React.createElement(Footer, {
    data: data
  }));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));