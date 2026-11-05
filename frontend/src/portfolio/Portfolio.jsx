import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import VideoPhone from "./VideoPhone";
import { P } from "@/lib/path";
import { scrollToId } from "@/lib/lenis";
import {
  SITE, SERIES, HISTORY, FORMAT, PIPELINE, PIPELINE_POINTS, STORY_JSON, PIPELINE_TOOLS, SERVICES, SKILLS,
} from "@/lib/portfolio";


const Brand = () => (
  <a className="brand" href="#top" onClick={(e) => { e.preventDefault(); scrollToId("#top"); }}>
    <span className="brand__mark"><ArrowRight size={16} strokeWidth={2.5} /></span>
    <span className="brand__word">{SITE.name}</span>
  </a>
);

function Nav() {
  const go = (id) => (e) => { e.preventDefault(); scrollToId(id); };
  return (
    <header className="nav">
      <Brand />
      <nav className="nav__links">
        <a href="#work" onClick={go("#work")}>Work</a>
        <a href="#pipeline" onClick={go("#pipeline")}>Pipeline</a>
        <a href="#about" onClick={go("#about")}>About</a>
        <a href="#contact" onClick={go("#contact")}>Contact</a>
      </nav>
    </header>
  );
}

const FLOATS = [
  { cls: "float--a", k: "01 · Story", v: "story.json" },
  { cls: "float--b", k: "02 · Images", v: "gpt-image-1 · 1024×1536" },
  { cls: "float--c", k: "03 · Voice", v: "word-level timings" },
  { cls: "float--d", k: "05 · Final", v: "final_vN.mp4 · 9:16" },
];

function Hero() {
  const go = (id) => (e) => { e.preventDefault(); scrollToId(id); };
  return (
    <section className="hero" id="top">
      <div className="hero__grid">
        <div className="hero__inner">
          <p className="hero__eyebrow">AI consultant · automation &amp; AI video</p>
          <h1 className="display hero__title">{SITE.headline}</h1>
          <p className="hero__pitch">{SITE.pitch}</p>
          <div className="hero__cta">
            <a className="btn btn--white" href="#work" onClick={go("#work")}>See the work</a>
            <a className="btn btn--glass" href="#pipeline" onClick={go("#pipeline")}>How it runs</a>
          </div>
        </div>
        <div className="hero__stage">
          {FLOATS.map((f) => (
            <div className={`float ${f.cls}`} key={f.k}><span>{f.k}</span><b>{f.v}</b></div>
          ))}
          <div className="hero__device">
            <VideoPhone hero src={P("/videos/ep1.mp4")} poster={P("/images/posters/ep1.jpg")} label="The Golden Mask · EP1" />
          </div>
        </div>
      </div>
    </section>
  );
}

const Points = ({ items }) => (
  <ul className="points">
    {items.map(([t, b]) => (
      <li key={t}>
        <h4>{t}</h4>
        <p>{b}</p>
      </li>
    ))}
  </ul>
);

function Intro() {
  return (
    <section className="wrap section section--intro">
      <div className="editorial"><h2 className="display">Systems, not one-off clips.</h2>
      <p>{SITE.bio}</p>
      <p className="muted">
        Most AI video portfolios show clips. This one shows a system: the same character stays
        consistent across episodes, the audience steers the plot, and the pipeline repeats.
      </p></div>
    </section>
  );
}

function Series() {
  return (
    <section className="wrap section" id="work">
      <header className="section__head">
        <span className="badge">Case study · Series</span>
        <h2 className="display">Golden Mask</h2>
        <p>{SERIES.summary}</p>
      </header>

      <div className="phones">
        {SERIES.episodes.map((e) => (
          <VideoPhone key={e.id} src={e.src} poster={e.poster} label={`${e.tag} · ${e.choice}`} />
        ))}
      </div>

      <div className="editorial">
        <p>{SERIES.story}</p>
        <Points items={SERIES.points} />
      </div>
    </section>
  );
}

function History() {
  return (
    <section className="wrap section">
      <div className="split">
        <div className="split__text">
          <span className="badge">Range</span>
          <h2 className="display">Cinematic history, with an AI presenter</h2>
          <p>{HISTORY.summary}</p>
          <Points items={HISTORY.points} />
        </div>
        <VideoPhone src={HISTORY.video.src} poster={HISTORY.video.poster} label={HISTORY.video.tag} />
      </div>
    </section>
  );
}

function Format() {
  return (
    <section className="wrap section">
      <div className="split split--rev">
        <div className="split__text">
          <span className="badge">Format engine</span>
          <h2 className="display">What if everyone froze except you</h2>
          <p>{FORMAT.summary}</p>
          <ol className="beats">
            {FORMAT.beats.map(([k, t], i) => (
              <li key={k}>
                <span className="beats__n">{i + 1}</span>
                <div><b>{k}</b><span>{t}</span></div>
              </li>
            ))}
          </ol>
          <Points items={FORMAT.points} />
        </div>
        <VideoPhone src={FORMAT.video.src} poster={FORMAT.video.poster} label={FORMAT.video.tag} />
      </div>
    </section>
  );
}

function Pipeline() {
  return (
    <section className="section section--wide" id="pipeline">
      <div className="wrap">
        <header className="section__head">
          <span className="badge">Automation · Built</span>
          <h2 className="display">One command. Story in, video out.</h2>
          <p>
            Making a story video used to mean a script in one tool, images in another, narration in a
            third, then a manual edit, and every fix meant redoing steps by hand. Now{" "}
            <code className="inline">python make_video.py story.json</code> chains them and saves every step for review.
          </p>
        </header>
      </div>
      <div className="rail" tabIndex={0}>
        <ol className="rail__track">
          {PIPELINE.map((s) => (
            <li className="step" key={s.n}>
              <span className="step__n step__n--plain">{s.n}</span>
              <h4>{s.title}</h4>
              <span className="pill pill--blue">{s.tool}</span>
              <p>{s.body}</p>
              <code className="step__out">{s.out}</code>
            </li>
          ))}
        </ol>
      </div>
      <div className="wrap split split--code">
        <div className="split__text">
          <h3 className="display display--sm">Built so fixes stay cheap</h3>
          <Points items={PIPELINE_POINTS} />
          <p className="meta"><span>Sample story</span> The Last Chai Stall</p>
        </div>
        <div className="codecard">
          <div className="codecard__bar"><i /><i /><i /><b>story.json</b></div>
          <pre>{STORY_JSON}</pre>
          <p className="codecard__note">The shape of the input file. One file in, one captioned 9:16 video out.</p>
        </div>
      </div>
      <div className="wrap tools">
        {PIPELINE_TOOLS.map((t) => <span className="pill" key={t}>{t}</span>)}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="wrap section" id="services">
      <div className="card services">
        <h2 className="display">What I can build for you</h2>
        <ul className="checks">
          {SERVICES.map((s) => (
            <li key={s}><Check size={18} strokeWidth={2.5} />{s}</li>
          ))}
        </ul>
        <div className="skills">
          {SKILLS.map((s) => <span className="pill" key={s}>{s}</span>)}
        </div>
        <p className="muted link-line">{SITE.link}</p>
      </div>
    </section>
  );
}

function About() {
  const rows = [["Role", SITE.role], ["Based in", SITE.location], ["Education", SITE.education]];
  return (
    <section className="wrap section" id="about">
      <div className="card about">
        <div className="about__text">
          <h2 className="display">About</h2>
          <p>{SITE.bio}</p>
          <dl className="about__rows">
            {rows.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
          </dl>
        </div>
      </div>
    </section>
  );
}

const Contact = () => (
  <section className="wrap section contact" id="contact">
    <div className="card contact__card">
      <h2 className="display">Have a story, a series or a repetitive process?</h2>
      <p>Send me the idea and I'll show you how it runs automatically.</p>
      <div className="contact__links">
        <a className="btn btn--blue" href={SITE.email.href}>{SITE.email.label}<ArrowUpRight size={16} /></a>
        <a className="btn btn--ghost" href={SITE.linkedin.href} target="_blank" rel="noreferrer">LinkedIn<ArrowUpRight size={16} /></a>
      </div>
    </div>
  </section>
);

export default function Portfolio() {
  return (
    <div className="pf">
      <Nav />
      <main>
        <Hero />
        <Intro />
        <Series />
        <History />
        <Format />
        <Pipeline />
        <Services />
        <About />
        <Contact />
      </main>
      <footer className="foot">
        <Brand />
        <span>© 2026 {SITE.name} · AI video &amp; automation</span>
      </footer>
    </div>
  );
}
