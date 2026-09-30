import { usePageMeta } from '@/lib/use-page-meta';
import { Link } from 'wouter';
import { ArrowUpRight } from 'lucide-react';

export default function About() {
  usePageMeta('Process — Sharin Khander', 'How Sharin Khander builds products: frame the problem, bring the system, build one component at a time, critique with care, then polish and ship.');

  return (
    <div className="page-reveal about-process">
      <section className="about-intro mx-auto w-full max-w-[1440px] px-6 pb-12 pt-14 sm:px-10 md:pb-14 md:pt-24 lg:px-16">
        <h1 className="about-title">How I build</h1>
        <p className="about-process-sequence"><strong>Brief → design → build → refine</strong></p>
      </section>

      <section className="about-step mx-auto w-full max-w-[1440px] px-6 pb-20 sm:px-10 md:pb-28 lg:px-16" aria-labelledby="about-step-title">
        <div className="about-step-heading">
          <span className="about-step-index" aria-hidden="true">01</span>
          <div className="about-step-heading-copy">
            <p className="font-mono-archive text-sm tracking-[.04em] text-muted-foreground">Frame the problem</p>
            <h2 id="about-step-title">Give the agent requirements.</h2>
          </div>
        </div>

        <div className="about-step-grid">
          <div className="about-step-copy">
            <p className="about-step-lede">Checklist</p>
            <ol className="about-brief-list">
              <li><span className="about-list-mark" aria-hidden="true">a</span><span>Write a clear brief: context + scope.</span></li>
              <li><span className="about-list-mark" aria-hidden="true">b</span><span>Upload meeting + interview insights.</span></li>
              <li><span className="about-list-mark" aria-hidden="true">c</span><span>Write a short PRD.</span></li>
              <li><span className="about-list-mark" aria-hidden="true">d</span><span>Brainstorm out loud with Claude Code.</span></li>
            </ol>
          </div>

          <figure className="about-brief-figure">
            <img
              src="/media/about/build-process-brief-clean.png"
              alt="A mockup showing Sharin’s Claude conversation alongside a short PRD and user interview insights."
              loading="lazy"
              data-testid="img-about-build-brief"
            />
          </figure>
        </div>
      </section>

      <section className="about-step mx-auto w-full max-w-[1440px] px-6 pb-20 sm:px-10 md:pb-24 lg:px-16" aria-labelledby="about-step-02-title">
        <div className="about-step-heading">
          <span className="about-step-index" aria-hidden="true">02</span>
          <div className="about-step-heading-copy">
            <p className="font-mono-archive text-sm tracking-[.04em] text-muted-foreground">Design</p>
            <h2 id="about-step-02-title">Create a prototype</h2>
          </div>
        </div>
        <div className="about-step-grid about-diagram-grid">
          <p className="about-step-lede">I use Figma to design the product before I build.</p>
          <figure className="about-system-mockup">
            <img
              src="/media/about/figma-system-mockup-refined.png"
              alt="Figma design screens addressed to Sharin alongside a connected Figma MCP panel and a code-generation example."
              loading="lazy"
              decoding="async"
              data-testid="img-about-figma-system"
            />
            <figcaption className="about-diagram-caption">A Figma MCP example</figcaption>
          </figure>
          <figure className="about-diagram about-system-diagram" role="img" aria-label="Enter a design system, components, tokens, and references to inform the agent.">
            <div className="about-system-inputs">
              <p className="about-system-inputs-title">Enter</p>
              <span>Design system</span><span>Components</span><span>Tokens</span><span>References</span>
            </div>
            <span className="about-diagram-connector" aria-hidden="true"><i /></span>
            <div className="about-system-agent">Agent</div>
          </figure>
        </div>
      </section>

      <section className="about-step mx-auto w-full max-w-[1440px] px-6 pb-20 sm:px-10 md:pb-24 lg:px-16" aria-labelledby="about-step-03-title">
        <div className="about-step-heading">
          <span className="about-step-index" aria-hidden="true">03</span>
          <div className="about-step-heading-copy">
            <p className="font-mono-archive text-sm tracking-[.04em] text-muted-foreground">Build</p>
            <h2 id="about-step-03-title">Build one component at a time.</h2>
          </div>
        </div>
        <div className="about-step-grid about-diagram-grid">
          <table className="about-tools-table">
            <caption className="sr-only">Tools I use during the build stage</caption>
            <thead>
              <tr><th scope="col">Tool</th><th scope="col">How I use it</th></tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row"><span className="about-tool-name"><img src="/media/about/cursor-logo.png" alt="" width="56" height="56" loading="lazy" />Cursor</span></th>
                <td>My workhorse. I use Ask and Plan mode to brainstorm, then build one component at a time.</td>
              </tr>
              <tr>
                <th scope="row"><span className="about-tool-name"><img src="/media/about/supabase-logo.png" alt="" width="56" height="56" loading="lazy" />Supabase</span></th>
                <td>Backend: used for database and logins.</td>
              </tr>
            </tbody>
          </table>
          <figure className="about-cursor-window">
            <img
              src="/media/about/cursor-window.png"
              alt="My Cursor editor window, with a project file tree, code editor, and agent panel open."
              width="1280"
              height="797"
              loading="lazy"
              decoding="async"
            />
            <figcaption>My Cursor window</figcaption>
          </figure>
        </div>
      </section>

      <section className="about-step mx-auto w-full max-w-[1440px] px-6 pb-20 sm:px-10 md:pb-24 lg:px-16" aria-labelledby="about-step-04-title">
        <div className="about-step-heading">
          <span className="about-step-index" aria-hidden="true">04</span>
          <div className="about-step-heading-copy">
            <p className="font-mono-archive text-sm tracking-[.04em] text-muted-foreground">Test it</p>
            <h2 id="about-step-04-title">Try to break the happy path.</h2>
          </div>
        </div>
        <div className="about-step-grid about-diagram-grid">
          <figure className="about-diagram about-critique-diagram" role="img" aria-label="A test loop: click around, find failure points, give focused feedback, fix, and repeat.">
            <div className="about-critique-loop">
              <div className="about-loop-node"><span>01</span><strong>Click around</strong></div>
              <span className="about-loop-arrow" aria-hidden="true" />
              <div className="about-loop-node"><span>02</span><strong>Find failure points.</strong></div>
              <span className="about-loop-arrow" aria-hidden="true" />
              <div className="about-loop-node"><span>03</span><strong>Focused feedback</strong></div>
              <span className="about-loop-arrow" aria-hidden="true" />
              <div className="about-loop-node"><span>04</span><strong>Fix</strong></div>
            </div>
            <div className="about-loop-return"><span>Repeat the pass</span></div>
          </figure>
        </div>
      </section>

      <section className="about-step mx-auto w-full max-w-[1440px] px-6 pb-24 sm:px-10 md:pb-28 lg:px-16" aria-labelledby="about-step-05-title">
        <div className="about-step-heading">
          <span className="about-step-index" aria-hidden="true">05</span>
          <div className="about-step-heading-copy">
            <p className="font-mono-archive text-sm tracking-[.04em] text-muted-foreground">Polish + ship</p>
            <h2 id="about-step-05-title">Make it real. Then learn.</h2>
          </div>
        </div>
        <div className="about-step-grid about-diagram-grid">
          <p className="about-step-lede">I use GitHub and Vercel to deploy, share, and keep improving.</p>
          <table className="about-tools-table">
            <caption className="sr-only">Tools for code history and deployment</caption>
            <thead>
              <tr><th scope="col">Tool</th><th scope="col">What it does</th></tr>
            </thead>
            <tbody>
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
          <p className="font-mono-archive text-sm tracking-[.04em] text-muted-foreground">Process / Sharin Khander</p>
          <Link href="/" className="group inline-flex items-center gap-3 font-editorial text-2xl archive-link" data-testid="link-about-work">View work <ArrowUpRight size={17} strokeWidth={1.2} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>
        </div>
      </section>
    </div>
  );
}