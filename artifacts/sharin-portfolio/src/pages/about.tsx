import { usePageMeta } from '@/lib/use-page-meta';
import { Link } from 'wouter';
import { ArrowUpRight } from 'lucide-react';

export default function About() {
  usePageMeta('About — Sharin Khander', 'How Sharin Khander builds products: frame the problem, bring the system, build in batches, critique with care, then polish and ship.');

  return (
    <div className="page-reveal about-process">
      <section className="about-intro mx-auto w-full max-w-[1440px] px-6 pb-16 pt-14 sm:px-10 md:pb-20 md:pt-24 lg:px-16">
        <h1 className="about-title">How I build products</h1>
        <p className="about-process-sequence"><strong>Brief → Design → Build → Refine</strong></p>
        <p className="about-intro-copy">I get clear on the problem, design the experience, build it, and iterate.</p>
      </section>

      <section className="about-step mx-auto w-full max-w-[1440px] px-6 pb-20 sm:px-10 md:pb-28 lg:px-16" aria-labelledby="about-step-title">
        <div className="about-step-heading">
          <span className="about-step-index" aria-hidden="true">01</span>
          <div className="about-step-heading-copy">
            <p className="font-mono-archive text-[10px] uppercase tracking-[.16em] text-muted-foreground">Frame the problem</p>
            <h2 id="about-step-title">Give the agent the requirements.</h2>
          </div>
        </div>

        <div className="about-step-grid">
          <div className="about-step-copy">
            <p className="about-step-lede">Context and scope. No guessing.</p>
            <ol className="about-brief-list">
              <li><span className="about-list-mark" aria-hidden="true">A</span><span>Write a clear brief: context + scope.</span></li>
              <li><span className="about-list-mark" aria-hidden="true">B</span><span>Upload meeting + interview insights.</span></li>
              <li><span className="about-list-mark" aria-hidden="true">C</span><span>Write a short PRD.</span></li>
              <li><span className="about-list-mark" aria-hidden="true">D</span><span>Brainstorm out loud with Claude Code.</span></li>
            </ol>
          </div>

          <figure className="about-brief-figure">
            <img
              src="/media/about/build-process-brief.jpg"
              alt="A mockup showing Sharin’s Claude conversation alongside a short PRD and user interview insights."
              loading="lazy"
              data-testid="img-about-build-brief"
            />
            <figcaption>
              <span>Working note</span>
              <span>Context before code</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="about-step mx-auto w-full max-w-[1440px] px-6 pb-20 sm:px-10 md:pb-24 lg:px-16" aria-labelledby="about-step-02-title">
        <div className="about-step-heading">
          <span className="about-step-index" aria-hidden="true">02</span>
          <div className="about-step-heading-copy">
            <p className="font-mono-archive text-[10px] uppercase tracking-[.16em] text-muted-foreground">design</p>
            <h2 id="about-step-02-title">Start from what already works.</h2>
          </div>
        </div>
        <div className="about-step-grid about-diagram-grid">
          <figure className="about-diagram about-system-diagram" role="img" aria-label="Design system, tokens, components, and references inform the agent. A Figma MCP connection is one example.">
            <div className="about-system-inputs">
              <span>Design system</span><span>Tokens</span><span>Components</span><span>References</span>
            </div>
            <span className="about-diagram-connector" aria-hidden="true"><i /></span>
            <div className="about-system-agent">Agent</div>
            <p className="about-diagram-caption">A Figma MCP example</p>
          </figure>
          <figure className="about-system-mockup">
            <a href="/media/about/figma-system-mockup.png" target="_blank" rel="noopener noreferrer" aria-label="Open the Figma system mockup at full size">
              <img
                src="/media/about/figma-system-mockup.png"
                alt="Figma design screens addressed to Sharin alongside a connected Figma MCP panel and a code-generation example."
                loading="lazy"
                decoding="async"
                data-testid="img-about-figma-system"
              />
            </a>
          </figure>
        </div>
      </section>

      <section className="about-step mx-auto w-full max-w-[1440px] px-6 pb-20 sm:px-10 md:pb-24 lg:px-16" aria-labelledby="about-step-03-title">
        <div className="about-step-heading">
          <span className="about-step-index" aria-hidden="true">03</span>
          <div className="about-step-heading-copy">
            <p className="font-mono-archive text-[10px] uppercase tracking-[.16em] text-muted-foreground">Build in batches</p>
            <h2 id="about-step-03-title">One component at a time.</h2>
          </div>
        </div>
        <div className="about-step-grid about-diagram-grid">
          <p className="about-step-lede">Describe first. Structure second. Build small.</p>
          <figure className="about-diagram about-build-diagram" role="img" aria-label="Sequence: describe the design, get the structure right, build one component at a time.">
            <div className="about-flow-node"><span>01</span><strong>Describe<br />the design</strong></div>
            <span className="about-flow-arrow" aria-hidden="true" />
            <div className="about-flow-node"><span>02</span><strong>Get the<br />structure right</strong></div>
            <span className="about-flow-arrow" aria-hidden="true" />
            <div className="about-flow-node about-flow-node-accent"><span>03</span><strong>One component<br />at a time</strong></div>
          </figure>
        </div>
      </section>

      <section className="about-step mx-auto w-full max-w-[1440px] px-6 pb-20 sm:px-10 md:pb-24 lg:px-16" aria-labelledby="about-step-04-title">
        <div className="about-step-heading">
          <span className="about-step-index" aria-hidden="true">04</span>
          <div className="about-step-heading-copy">
            <p className="font-mono-archive text-[10px] uppercase tracking-[.16em] text-muted-foreground">Critique it</p>
            <h2 id="about-step-04-title">Try to break the happy path.</h2>
          </div>
        </div>
        <div className="about-step-grid about-diagram-grid">
          <p className="about-step-lede">Test like a user. Give exact feedback. Repeat.</p>
          <figure className="about-diagram about-critique-diagram" role="img" aria-label="A critique loop: click around, try to break it, give focused feedback, compare to the design system, and repeat.">
            <div className="about-critique-loop">
              <div className="about-loop-node"><span>01</span><strong>Click around</strong></div>
              <span className="about-loop-arrow" aria-hidden="true" />
              <div className="about-loop-node"><span>02</span><strong>Try to break it</strong></div>
              <span className="about-loop-arrow" aria-hidden="true" />
              <div className="about-loop-node"><span>03</span><strong>Focused feedback</strong></div>
              <span className="about-loop-arrow" aria-hidden="true" />
              <div className="about-loop-node"><span>04</span><strong>Compare to system</strong></div>
            </div>
            <div className="about-loop-return"><span>Repeat the pass</span></div>
          </figure>
        </div>
      </section>

      <section className="about-step mx-auto w-full max-w-[1440px] px-6 pb-24 sm:px-10 md:pb-28 lg:px-16" aria-labelledby="about-step-05-title">
        <div className="about-step-heading">
          <span className="about-step-index" aria-hidden="true">05</span>
          <div className="about-step-heading-copy">
            <p className="font-mono-archive text-[10px] uppercase tracking-[.16em] text-muted-foreground">Polish + ship</p>
            <h2 id="about-step-05-title">Make it real. Then learn.</h2>
          </div>
        </div>
        <div className="about-step-grid about-diagram-grid">
          <table className="about-tools-table">
            <caption className="sr-only">Tools for backend, code history, and deployment</caption>
            <thead>
              <tr><th scope="col">Tool</th><th scope="col">What it does</th></tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row"><span className="about-tool-name"><img src="/media/about/supabase-logo.png" alt="" width="56" height="56" loading="lazy" />Supabase</span></th>
                <td>Backend for data and logins.</td>
              </tr>
              <tr>
                <th scope="row"><span className="about-tool-name"><img src="/media/about/github-logo.png" alt="" width="56" height="56" loading="lazy" />GitHub</span></th>
                <td>Code repository. Roll back mistakes.</td>
              </tr>
              <tr>
                <th scope="row"><span className="about-tool-name"><img src="/media/about/vercel-logo.png" alt="" width="56" height="56" loading="lazy" />Vercel</span></th>
                <td>Easy deploys. GitHub changes go live.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="about-work-link mx-auto w-full max-w-[1440px] border-t border-border px-6 py-6 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono-archive text-[10px] uppercase tracking-[.16em] text-muted-foreground">About / Sharin Khander</p>
          <Link href="/" className="group inline-flex items-center gap-3 font-editorial text-2xl archive-link" data-testid="link-about-work">View work <ArrowUpRight size={17} strokeWidth={1.2} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>
        </div>
      </section>
    </div>
  );
}