import { useState } from 'react';

const projects = [
  {
    id: 'elevated-experience',
    number: '01',
    title: 'Elevated Experience',
    category: 'Commerce',
    company: 'THE REALREAL',
    premise: 'How might browsing luxury inventory feel less like sorting and more like finding?',
    description: 'Reimagining shopping around luxury inventory, from the browse experience through product detail.',
    signal: 'BROWSE → PRODUCT DETAIL',
    phases: ['Notice the browse ritual', 'Shape a clearer path through inventory', 'Carry the direction into product detail'],
    artifact: 'BROWSE / PRODUCT DETAIL',
  },
  {
    id: 'attribute-enrichment',
    number: '02',
    title: 'Trend, Vibe, Occasion Discovery',
    category: 'Discovery',
    company: 'THE REALREAL',
    premise: 'What if shoppers could search in the language they already use for style?',
    description: 'Helping shoppers discover fashion by trend, vibe, and occasion.',
    signal: 'STYLE LANGUAGE → DISCOVERY',
    phases: ['Collect the words people use', 'Organize prompts and taxonomy', 'Evaluate routes into discovery'],
    artifact: 'PROMPTS / TAXONOMY / EVALUATION',
  },
  {
    id: 'ai-discovery',
    number: '03',
    title: 'Shopping Agent',
    category: 'AI',
    company: 'THE REALREAL',
    premise: 'Can a shopping agent help someone compare, refine, and decide?',
    description: 'MVP: multimodal search and product comparison. Later explorations: virtual try-on and in-agent checkout.',
    signal: 'ASK → COMPARE → DECIDE',
    phases: ['Ask with an image or a phrase', 'Compare product details', 'Explore later directions separately'],
    artifact: 'MVP + LATER EXPLORATIONS',
  },
  {
    id: 'visual-search',
    number: '04',
    title: 'Visual Search',
    category: 'AI',
    company: 'THE REALREAL',
    premise: 'How can a spark of visual inspiration become a useful place to start?',
    description: 'Turning inspiration into product discovery.',
    signal: 'IMAGE → MATCHING ITEMS',
    phases: ['Start with a visual signal', 'Explore the retrieval path', 'Treat matches as candidates, not duplicates'],
    artifact: 'RETRIEVAL PATH',
  },
  {
    id: 'similar-designers',
    number: '05',
    title: 'Similar Designers',
    category: 'Discovery',
    company: 'THE REALREAL',
    premise: 'What could a designer page open up beyond the designer someone already knows?',
    description: 'Making a designer page a doorway to the next designer someone might love.',
    signal: 'DESIGNER → NEXT DESIGNER',
    phases: ['Begin on a designer page', 'Explore a similarity space', 'Consider co-browse and next directions'],
    artifact: 'CO-BROWSE MVP / NEXT DIRECTIONS',
  },
  {
    id: 'curation',
    number: '06',
    title: 'Curation',
    category: 'Discovery',
    company: 'THE REALREAL',
    premise: 'How can editorial taste become a legible path into product discovery?',
    description: 'Scaling editorial taste into product discovery.',
    signal: 'EDITORIAL SIGNAL → FEED',
    phases: ['Start with an editorial eye', 'Translate selections into signals', 'Connect signals to a discovery feed'],
    artifact: 'CURATION SYSTEM',
  },
];

const lanes = ['All questions', 'Discovery', 'Commerce', 'AI'];
const chapters = ['The question', 'The system', 'The practice'];

export function QuestionIndex() {
  const [lane, setLane] = useState('All questions');
  const [activeId, setActiveId] = useState(projects[0].id);
  const [chapter, setChapter] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const visible = projects.filter((project) => lane === 'All questions' || project.category === lane);
  const active = projects.find((project) => project.id === activeId) ?? projects[0];

  const chooseLane = (nextLane: string) => {
    setLane(nextLane);
    const next = projects.find((project) => nextLane === 'All questions' || project.category === nextLane);
    if (next) setActiveId(next.id);
    setChapter(0);
  };

  return (
    <div className="qi">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap');
        .qi{--paper:#f2eee7;--sheet:#fbf9f4;--ink:#252520;--muted:#77766e;--line:#d9d3c8;--red:#bd472f;--sage:#dce2d6;min-height:100vh;background:var(--paper);color:var(--ink);font-family:'DM Sans',sans-serif}
        .qi *{box-sizing:border-box}.qi button{font:inherit;color:inherit}
        .qi-top{height:72px;padding:0 5.2vw;border-bottom:1px solid var(--line);display:flex;align-items:center;justify-content:space-between}
        .qi-brand{display:flex;align-items:center;gap:15px;font-size:14px;font-weight:700;letter-spacing:-.03em}
        .qi-mark{width:25px;height:25px;border:1px solid var(--red);border-radius:50%;display:grid;place-items:center;color:var(--red);font-family:'Instrument Serif',serif;font-size:18px;font-weight:400}
        .qi-top-meta{font:10px 'DM Mono',monospace;letter-spacing:.12em;color:var(--muted)}
        .qi-nav{display:flex;align-items:center;gap:27px}.qi-nav a{color:var(--ink);text-decoration:none;font-size:12px}.qi-nav a:hover{color:var(--red)}
        .qi-menu{display:none;border:0;background:none;padding:8px;cursor:pointer}
        .qi-intro{padding:62px 5.2vw 41px;display:grid;grid-template-columns:1fr minmax(250px,350px);gap:35px;align-items:end}
        .qi-kicker,.qi-mono{font:10px 'DM Mono',monospace;letter-spacing:.13em;text-transform:uppercase}
        .qi-kicker{color:var(--red);display:flex;align-items:center;gap:10px}.qi-kicker:before{content:'';width:23px;height:1px;background:var(--red)}
        .qi-intro h1{font:clamp(55px,7.2vw,100px)/.91 'Instrument Serif',Georgia,serif;letter-spacing:-.045em;margin:20px 0 0;max-width:780px;font-weight:400}
        .qi-intro h1 em{color:var(--red);font-weight:400}
        .qi-deck{font-size:14px;line-height:1.8;color:#65645d;max-width:330px;margin:0 0 5px}
        .qi-deck strong{color:var(--ink);font-weight:600}
        .qi-explorer{margin:0 5.2vw 72px;background:var(--sheet);border:1px solid var(--line);display:grid;grid-template-columns:minmax(280px, .83fr) 1.6fr;min-height:572px;box-shadow:0 14px 40px #4a3a2410}
        .qi-index{padding:27px 24px 21px;border-right:1px solid var(--line);display:flex;flex-direction:column}
        .qi-index-head{display:flex;justify-content:space-between;align-items:center;padding-bottom:17px;border-bottom:1px solid var(--line)}
        .qi-index-head .qi-mono{color:var(--muted)}.qi-count{font:10px 'DM Mono',monospace;color:var(--red)}
        .qi-lanes{display:flex;gap:6px;flex-wrap:wrap;padding:16px 0 20px}
        .qi-lane{border:1px solid var(--line);border-radius:30px;background:transparent;padding:7px 10px;font-size:10px;cursor:pointer;transition:background .18s,color .18s,border-color .18s}
        .qi-lane:hover,.qi-lane.is-active{background:var(--ink);color:var(--sheet);border-color:var(--ink)}
        .qi-list{display:flex;flex-direction:column}
        .qi-item{display:grid;grid-template-columns:32px 1fr 17px;gap:8px;align-items:start;border:0;border-top:1px solid #e8e3da;background:transparent;padding:14px 4px;text-align:left;cursor:pointer;transition:background .18s,padding .18s}
        .qi-item:hover{background:#f4f0e9;padding-left:9px}.qi-item.is-active{background:var(--sage);padding-left:10px;border-color:transparent}
        .qi-item-no{font:10px 'DM Mono',monospace;color:var(--red);padding-top:2px}
        .qi-item-title{font-size:13px;font-weight:600;line-height:1.3}
        .qi-item-type{display:block;font:9px 'DM Mono',monospace;color:var(--muted);margin-top:5px;text-transform:uppercase;letter-spacing:.06em}
        .qi-chevron{font-size:15px;color:var(--muted);transition:transform .18s}.qi-item.is-active .qi-chevron{color:var(--red);transform:translateX(2px)}
        .qi-index-foot{font:9px 'DM Mono',monospace;letter-spacing:.09em;color:var(--muted);margin-top:auto;padding-top:17px}
        .qi-dossier{padding:35px 5.2% 27px;display:flex;flex-direction:column;min-width:0}
        .qi-dossier-top{display:flex;justify-content:space-between;align-items:center;gap:16px}
        .qi-company{font:10px 'DM Mono',monospace;letter-spacing:.12em;color:var(--muted)}
        .qi-artifact{border:1px solid var(--line);padding:7px 9px;font:9px 'DM Mono',monospace;letter-spacing:.05em;color:var(--red);white-space:nowrap}
        .qi-project-title{font:clamp(37px,4.1vw,56px)/1 'Instrument Serif',Georgia,serif;letter-spacing:-.035em;font-weight:400;margin:31px 0 16px}
        .qi-project-description{max-width:510px;font-size:14px;line-height:1.7;color:#66655e;margin:0}
        .qi-separator{height:1px;background:var(--line);margin:28px 0 23px}
        .qi-chapters{display:flex;border-bottom:1px solid var(--line);gap:25px}
        .qi-chapter{border:0;background:none;padding:0 0 11px;position:relative;color:#88867d;font-size:11px;cursor:pointer}
        .qi-chapter.is-active{color:var(--ink);font-weight:600}.qi-chapter.is-active:after{content:'';height:2px;background:var(--red);position:absolute;bottom:-1px;left:0;right:0}
        .qi-content{min-height:155px;padding:24px 0 17px}
        .qi-content-label{font:9px 'DM Mono',monospace;color:var(--red);letter-spacing:.11em;text-transform:uppercase;margin:0 0 12px}
        .qi-question{font:clamp(22px,2.5vw,32px)/1.2 'Instrument Serif',Georgia,serif;max-width:590px;margin:0}
        .qi-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:13px}
        .qi-step{border-top:1px solid var(--line);padding-top:11px}.qi-step span{font:9px 'DM Mono',monospace;color:var(--red)}.qi-step p{font-size:12px;line-height:1.5;margin:11px 0 0}
        .qi-practice-copy{font-size:17px;line-height:1.5;max-width:480px;margin:0}
        .qi-dossier-foot{margin-top:auto;border-top:1px solid var(--line);padding-top:15px;display:flex;justify-content:space-between;align-items:center}
        .qi-foot-note{font:9px 'DM Mono',monospace;color:var(--muted);letter-spacing:.09em}
        .qi-arrows{display:flex;gap:8px}
        .qi-arrow{width:34px;height:34px;border:1px solid var(--line);background:transparent;cursor:pointer;font-size:15px;transition:background .18s,color .18s}
        .qi-arrow:hover{background:var(--ink);color:var(--sheet)}
        .qi-bottom{border-top:1px solid var(--line);padding:22px 5.2vw 34px;display:flex;justify-content:space-between;gap:20px;color:var(--muted);font:9px 'DM Mono',monospace;letter-spacing:.08em}
        .qi-bottom strong{color:var(--ink);font-weight:500}
        @media(max-width:760px){
          .qi-top{height:62px;padding:0 6vw}.qi-top-meta{display:none}.qi-menu{display:block}
          .qi-nav{display:none;position:absolute;z-index:2;top:61px;left:0;right:0;padding:18px 6vw;background:var(--sheet);border-bottom:1px solid var(--line)}
          .qi-nav.is-open{display:flex;justify-content:flex-start}
          .qi-intro{padding:45px 6vw 29px;grid-template-columns:1fr;gap:17px}.qi-intro h1{font-size:66px}
          .qi-deck{max-width:480px}.qi-explorer{margin:0 4vw 50px;grid-template-columns:1fr}
          .qi-index{border-right:0;border-bottom:1px solid var(--line);padding:20px}
          .qi-index-foot{display:none}.qi-list{display:grid;grid-template-columns:1fr 1fr;column-gap:9px}
          .qi-item{grid-template-columns:25px 1fr 12px;padding:12px 3px}
          .qi-item-title{font-size:11px}.qi-item-type{font-size:8px}
          .qi-dossier{padding:25px 22px 22px;min-height:420px}
          .qi-project-title{font-size:43px;margin-top:26px}.qi-project-description{font-size:13px}
          .qi-steps{grid-template-columns:1fr;gap:9px}.qi-step{display:grid;grid-template-columns:25px 1fr;padding-top:9px}.qi-step p{margin:0}
          .qi-content{min-height:145px}.qi-bottom{padding:18px 6vw 25px}
        }
        @media(max-width:420px){.qi-list{grid-template-columns:1fr}.qi-item{padding:10px 3px}.qi-artifact{font-size:8px}.qi-intro h1{font-size:57px}}
      `}</style>

      <header className="qi-top">
        <div className="qi-brand"><span className="qi-mark">s</span><span>Sharin Khander</span></div>
        <div className="qi-top-meta">PRODUCT WORK / FASHION COMMERCE</div>
        <button className="qi-menu" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? '×' : '＋'}</button>
        <nav className={`qi-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          <a href="#index" onClick={() => setMenuOpen(false)}>Index</a><a href="#method" onClick={() => setMenuOpen(false)}>Method</a><a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        </nav>
      </header>

      <main>
        <section className="qi-intro">
          <div><p className="qi-kicker">A PRODUCT PRACTICE / SELECTED WORK</p><h1>Start with<br />the <em>question.</em></h1></div>
          <p className="qi-deck"><strong>Six projects. Six different ways in.</strong><br />Choose a question on the left to trace how a shopping moment becomes a product direction.</p>
        </section>

        <section className="qi-explorer" id="index" aria-label="Interactive project question index">
          <aside className="qi-index">
            <div className="qi-index-head"><span className="qi-mono">CHOOSE A QUESTION</span><span className="qi-count">{String(visible.length).padStart(2, '0')} / 06</span></div>
            <div className="qi-lanes" role="group" aria-label="Filter by project theme">
              {lanes.map((item) => <button key={item} type="button" className={`qi-lane${lane === item ? ' is-active' : ''}`} aria-pressed={lane === item} onClick={() => chooseLane(item)}>{item}</button>)}
            </div>
            <div className="qi-list" aria-live="polite">
              {visible.map((project) => <button key={project.id} type="button" onClick={() => { setActiveId(project.id); setChapter(0); }} className={`qi-item${activeId === project.id ? ' is-active' : ''}`} aria-current={activeId === project.id ? 'true' : undefined}>
                <span className="qi-item-no">{project.number}</span><span><span className="qi-item-title">{project.title}</span><span className="qi-item-type">{project.category} / {project.company}</span></span><span className="qi-chevron">↗</span>
              </button>)}
            </div>
            <div className="qi-index-foot">SELECT A PROJECT TO OPEN ITS FIELD NOTE ↗</div>
          </aside>

          <article className="qi-dossier" key={active.id}>
            <div className="qi-dossier-top"><span className="qi-company">{active.company} &nbsp;·&nbsp; PROJECT {active.number}</span><span className="qi-artifact">{active.signal}</span></div>
            <h2 className="qi-project-title">{active.title}</h2>
            <p className="qi-project-description">{active.description}</p>
            <div className="qi-separator" />
            <div className="qi-chapters" role="tablist" aria-label="Project field note chapters">
              {chapters.map((name, index) => <button key={name} role="tab" type="button" aria-selected={chapter === index} className={`qi-chapter${chapter === index ? ' is-active' : ''}`} onClick={() => setChapter(index)}>{name}</button>)}
            </div>
            <div className="qi-content" role="tabpanel">
              {chapter === 0 && <><p className="qi-content-label">THE STARTING POINT</p><p className="qi-question">{active.premise}</p></>}
              {chapter === 1 && <><p className="qi-content-label">A WAY THROUGH</p><div className="qi-steps">{active.phases.map((phase, index) => <div className="qi-step" key={phase}><span>0{index + 1}</span><p>{phase}</p></div>)}</div></>}
              {chapter === 2 && <><p className="qi-content-label">A PRACTICE, NOT A REVEAL</p><p className="qi-practice-copy">Notice the friction. Give it a shape. Put an interaction in front of someone. Let what happens inform the next decision.</p></>}
            </div>
            <div className="qi-dossier-foot"><span className="qi-foot-note">FIELD NOTE &nbsp; / &nbsp; {active.artifact}</span><div className="qi-arrows"><button className="qi-arrow" type="button" aria-label="Previous project" onClick={() => { const i = projects.findIndex((p) => p.id === active.id); const p = projects[(i + projects.length - 1) % projects.length]; setActiveId(p.id); setLane('All questions'); setChapter(0); }}>←</button><button className="qi-arrow" type="button" aria-label="Next project" onClick={() => { const i = projects.findIndex((p) => p.id === active.id); const p = projects[(i + 1) % projects.length]; setActiveId(p.id); setLane('All questions'); setChapter(0); }}>→</button></div></div>
          </article>
        </section>

        <section id="method" className="qi-bottom"><span><strong>NOTICE / FRAME / PROTOTYPE / LEARN / SHIP</strong></span><span id="about">SHARIN KHANDER &nbsp;·&nbsp; PRODUCT WORK</span></section>
      </main>
    </div>
  );
}