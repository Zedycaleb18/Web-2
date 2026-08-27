"use client";

import { useEffect, useRef } from "react";

/* ---------------------------------------------------------------------- */
/* Small inline glyphs — stand-ins for photography, drawn from the        */
/* studio's own vernacular (pen tool, layers, crop marks, swatches).      */
/* ---------------------------------------------------------------------- */

function GlyphPen({ stroke = "#0e0d0c" }) {
  return (
    <svg viewBox="0 0 120 120" fill="none">
      <path
        d="M20 100 L46 74 M46 74 C40 60 46 48 60 40 C78 30 96 34 100 20 C86 24 76 42 66 60 C58 74 46 80 32 74 Z"
        stroke={stroke}
        strokeWidth="2.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx="46" cy="74" r="4.5" fill={stroke} />
      <circle cx="100" cy="20" r="4.5" fill={stroke} />
    </svg>
  );
}

function GlyphLayers({ stroke = "#0e0d0c" }) {
  return (
    <svg viewBox="0 0 120 120" fill="none">
      <path d="M60 18 L108 46 L60 74 L12 46 Z" stroke={stroke} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M12 62 L60 90 L108 62" stroke={stroke} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M12 78 L60 106 L108 78" stroke={stroke} strokeWidth="2.2" strokeLinejoin="round" opacity="0.55" />
    </svg>
  );
}

function GlyphCrop({ stroke = "#0e0d0c" }) {
  return (
    <svg viewBox="0 0 120 120" fill="none">
      <path d="M30 8 V30 H8" stroke={stroke} strokeWidth="2.4" />
      <path d="M90 8 V30 H112" stroke={stroke} strokeWidth="2.4" />
      <path d="M30 112 V90 H8" stroke={stroke} strokeWidth="2.4" />
      <path d="M90 112 V90 H112" stroke={stroke} strokeWidth="2.4" />
      <circle cx="60" cy="60" r="20" stroke={stroke} strokeWidth="2" opacity="0.6" />
    </svg>
  );
}

function GlyphGrid({ stroke = "#0e0d0c" }) {
  return (
    <svg viewBox="0 0 120 120" fill="none">
      {[0, 1, 2, 3].map((i) => (
        <line key={`v${i}`} x1={12 + i * 32} y1="8" x2={12 + i * 32} y2="112" stroke={stroke} strokeWidth="1.4" opacity="0.5" />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <line key={`h${i}`} x1="8" y1={12 + i * 32} x2="112" y2={12 + i * 32} stroke={stroke} strokeWidth="1.4" opacity="0.5" />
      ))}
      <rect x="44" y="44" width="32" height="32" fill={stroke} opacity="0.85" />
    </svg>
  );
}

function GlyphMonogram({ fill = "#f1efe9" }) {
  return (
    <svg viewBox="0 0 200 200" fill="none">
      <path d="M20 20 L96 96 L20 172" stroke={fill} strokeWidth="10" strokeLinecap="square" opacity="0.9" />
      <path d="M180 20 L104 96 L180 172" stroke={fill} strokeWidth="10" strokeLinecap="square" opacity="0.9" />
      <circle cx="100" cy="100" r="6" fill={fill} />
    </svg>
  );
}

function LogoMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 3 L21 19 H3 Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="12" cy="14.5" r="1.6" fill="currentColor" />
    </svg>
  );
}

/* ---------------------------------------------------------------------- */
/* Reveal-on-scroll wrapper                                                */
/* ---------------------------------------------------------------------- */

function Reveal({ as: Tag = "div", className = "", children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If the element is already on/near screen when it mounts (fast scroll,
    // direct #anchor navigation, short pages) show it immediately instead
    // of waiting on an intersection event that may arrive late or not at all.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add("is-visible");
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);

    // Safety net: if something prevents the observer from ever firing
    // (edge cases with layout thrash on resize, etc.), don't leave the
    // section permanently invisible.
    const fallback = setTimeout(() => el.classList.add("is-visible"), 2500);

    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

/* ---------------------------------------------------------------------- */
/* Nav                                                                     */
/* ---------------------------------------------------------------------- */

function Nav() {
  const ref = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      ref.current.classList.toggle("is-scrolled", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["Work", "About", "Services", "Skills", "Journal"];

  return (
    <header className="nav" ref={ref}>
      <a href="#top" className="nav-logo">
        <LogoMark /> Xerox
      </a>
      <ul className="nav-links">
        {links.map((l) => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`}>
              <span>{l}</span>
              <span aria-hidden="true">{l}</span>
            </a>
          </li>
        ))}
      </ul>
      <a href="#contact" className="nav-cta">
        Hire Me
      </a>
      <button className="nav-burger" aria-label="Menu">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M0 2H14M0 7H14M0 12H14" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </button>
    </header>
  );
}

/* ---------------------------------------------------------------------- */
/* Page                                                                    */
/* ---------------------------------------------------------------------- */

export default function Page() {
  return (
    <>
      <Nav />

      {/* HERO ------------------------------------------------------------ */}
      <section className="hero" id="top">
        <div className="hero-canvas" />
        <div className="hero-mark">
          <GlyphMonogram />
        </div>
        <div className="hero-inner">
          <p className="hero-eyebrow">Xerox Designs · Est. 2013</p>
          <h1>Ideas, reduced to their sharpest form.</h1>
          <p className="hero-sub">
            A Nairobi-based studio shaping brand identities, digital products and print with
            precision and instinct — every mark, layout and pixel designed as one continuous
            system.
          </p>
          <a href="#work" className="btn-pill">
            Discover Our Work
          </a>
        </div>
        <div className="hero-stats">
          <div className="wrap">
            <span>
              <b>12 Yrs</b> In Practice
            </span>
            <span>
              <b>40+</b> Brands Shaped
            </span>
            <span>
              <b>Nairobi</b> · Kenya
            </span>
          </div>
        </div>
      </section>

      {/* 01 / VISION ------------------------------------------------------ */}
      <section className="split" id="about">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow-num">01 / Vision</span>
            <h2 className="display">The next form of identity.</h2>
            <p className="lead">
              Xerox explores what a brand can become when every surface, response and
              interaction is designed as one continuous system — legible at a glance, and
              considered up close.
            </p>
          </Reveal>
          <Reveal className="split-art art-swatch-a art-dots">
            <span className="art-frame-mark">Mark / 01</span>
            <div className="art-glyph">
              <GlyphPen />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 02 / CRAFT --------------------------------------------------------- */}
      <section className="craft" id="services">
        <div className="wrap">
          <Reveal as="div" className="craft-media art-swatch-b art-grid">
            <span className="art-frame-mark on-dark">Craft / 02</span>
            <div className="art-glyph">
              <GlyphGrid stroke="#f1efe9" />
            </div>
          </Reveal>
          <Reveal className="craft-copy">
            <span className="eyebrow-num">02 / Craft</span>
            <h2 className="display">Crafted around the brand.</h2>
            <p>
              Xerox removes the distance between intention and audience. Every layout, colour
              relationship and typographic rule is placed around a single idea: immediate
              recognition.
            </p>
            <p>
              A disciplined grid, considered type system and consistent voice work together
              without visual or strategic excess.
            </p>
            <a href="#skills" className="btn-pill dark">
              Read the Philosophy
            </a>
          </Reveal>
        </div>
      </section>

      {/* MACRO TRANSITION ---------------------------------------------------- */}
      <div className="macro">
        <div className="art art-swatch-c art-diagonal" />
        <span className="macro-caption">Detail — Letterform Study</span>
      </div>

      {/* SHOWCASE -------------------------------------------------------------- */}
      <section className="showcase" id="work">
        <div className="wrap">
          <Reveal className="showcase-panel art-swatch-d art-dots">
            <span className="art-frame-mark">Featured Project</span>
            <span className="art-corner-num">04</span>
            <div className="art-glyph">
              <GlyphLayers />
            </div>
          </Reveal>
          <div className="showcase-tag">
            <span>Brand system · Digital · Print</span>
            <strong>Selected Work, 2026</strong>
          </div>
        </div>
      </section>

      {/* ABOUT / DARK COLLAGE --------------------------------------------------- */}
      <section className="about-dark">
        <div className="wrap">
          <div className="about-grid">
            <Reveal>
              <span className="eyebrow-num">About / Xerox</span>
              <h2 className="display">Beautifully built for brands.</h2>
              <p>
                We believe great design should feel effortless, honest and human. Xerox brings
                strategic thinking into a form that is bold, intuitive and enduring — built for
                studios, founders and teams who care about the details.
              </p>
            </Reveal>
            <Reveal className="collage">
              <div className="art-swatch-a art-dots">
                <div className="art-glyph">
                  <GlyphCrop />
                </div>
              </div>
              <div className="art-swatch-c">
                <div className="art-glyph">
                  <GlyphMonogram />
                </div>
              </div>
              <div className="art-swatch-b art-grid">
                <div className="art-glyph">
                  <GlyphGrid stroke="#f1efe9" />
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal className="tagline-strip">
            <p>
              Less noise. <span>More signal.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* STUDIO SYSTEMS / SERVICES ---------------------------------------------- */}
      <section className="systems" id="skills">
        <div className="wrap systems-head">
          <Reveal>
            <span className="eyebrow-num">Studio / Services</span>
            <h2 className="display">Every discipline, one studio.</h2>
          </Reveal>
        </div>

        <Reveal as="div" className="feature-row">
          <div className="feature-media art-swatch-a art-dots">
            <div className="art-glyph">
              <GlyphPen />
            </div>
          </div>
          <div className="feature-copy">
            <div className="top-row">
              <span>Feature</span>
              <span>( 01 )</span>
            </div>
            <h3>Brand Identity</h3>
            <p>
              Logo systems, colour and typography built to hold up across every surface a brand
              touches.
            </p>
            <a href="#contact" className="feature-more">
              Read More
            </a>
            <div className="feature-foot">
              <span>Strategy-first</span>
              <span>Cross-platform</span>
            </div>
          </div>
        </Reveal>

        <Reveal as="div" className="feature-row reverse" style={{ direction: "rtl" }}>
          <div className="feature-media art-swatch-b art-grid" style={{ direction: "ltr" }}>
            <div className="art-glyph">
              <GlyphGrid stroke="#f1efe9" />
            </div>
          </div>
          <div className="feature-copy" style={{ direction: "ltr" }}>
            <div className="top-row">
              <span>Feature</span>
              <span>( 02 )</span>
            </div>
            <h3>Digital Systems</h3>
            <p>
              Websites and product interfaces designed and built end to end, from wireframe to
              shipped Next.js front end.
            </p>
            <a href="#contact" className="feature-more">
              Read More
            </a>
            <div className="feature-foot">
              <span>Design + build</span>
              <span>Responsive</span>
            </div>
          </div>
        </Reveal>

        <Reveal as="div" className="feature-row">
          <div className="feature-media art-swatch-d art-dots">
            <div className="art-glyph">
              <GlyphCrop />
            </div>
          </div>
          <div className="feature-copy">
            <div className="top-row">
              <span>Feature</span>
              <span>( 03 )</span>
            </div>
            <h3>Print &amp; Packaging</h3>
            <p>
              Collateral, packaging and signage produced with production-ready precision, not
              just concept art.
            </p>
            <a href="#contact" className="feature-more">
              Read More
            </a>
            <div className="feature-foot">
              <span>Production-ready</span>
              <span>Nairobi &amp; remote</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CLOSING CTA --------------------------------------------------------- */}
      <section className="closing" id="contact">
        <div className="wrap">
          <Reveal as="div">
            <span className="eyebrow-num">Let's talk</span>
            <h2 className="display">Have a brand that needs its sharpest form?</h2>
            <a href="mailto:xeroxdesigns001ke@gmail.com" className="btn-pill solid">
              Start a Project
            </a>
            <div className="closing-contacts">
              <a href="https://wa.me/254742881736" target="_blank" rel="noopener noreferrer">
                WhatsApp +254 742 881 736
              </a>
              <a href="mailto:xeroxdesigns001ke@gmail.com">xeroxdesigns001ke@gmail.com</a>
            </div>
          </Reveal>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <span>© {new Date().getFullYear()} Xerox Designs</span>
          <span>Nairobi, Kenya</span>
        </div>
      </footer>
    </>
  );
}
