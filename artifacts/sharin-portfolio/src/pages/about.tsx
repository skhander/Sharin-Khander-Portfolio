import { usePageMeta } from '@/lib/use-page-meta';
import { Link } from 'wouter';
import { ArrowUpRight } from 'lucide-react';

const beats = [
  {
    id: 'about-step-title',
    index: '01',
    eyebrow: 'Brief',
    title: 'Tell the agent what to build before you ask it to build.',
    lede: 'A blank prompt gets you a blank product.',
    points: [
      'Write the context and the scope.',
      'Add notes from meetings and interviews.',
      'Write a short PRD.',
      'Talk it through with Claude.',
    ],
  },
  {
    id: 'about-step-02-title',
    index: '02',
    eyebrow: 'Design',
    title: 'Draw it in Figma before you write code.',
    lede: 'The agent gets a picture, not a blank file.',
    points: [
      'Put in the design system.',
      'Put in the components and tokens.',
      'Put in the references.',
    ],
  },
  {
    id: 'about-step-03-title',
    index: '03',
    eyebrow: 'Build',
    title: 'One component at a time.',
    lede: 'Ask and Plan first. Then build the piece.',
    points: [
      'Cursor is where I build.',
      'Supabase handles the database and login.',
    ],
  },
  {
    id: 'about-step-04-title',
    index: '04',
    eyebrow: 'Break it',
    title: 'Click around until something fails.',
    lede: 'Find the break. Fix that one thing. Do the pass again.',
    points: [
      'Click the happy path, then leave it.',
      'Write down the failure.',
      'Ship one fix and repeat.',
    ],
  },
  {
    id: 'about-step-05-title',
    index: '05',
    eyebrow: 'Ship',
    title: 'Put it somewhere people can open.',
    lede: 'GitHub keeps the history. Vercel puts the change live.',
    points: [
      'Save the work in GitHub.',
      'Roll back when it is wrong.',
      'Ship the next change from there.',
    ],
  },
] as const;

export default function About() {
  usePageMeta('Process — Sharin Khander', 'How Sharin Khander builds: brief the agent, design in Figma, build one piece, break it, and ship it.');

  return (
    <div className="page-reveal about-process">
      <section className="about-intro mx-auto w-full max-w-[1440px] px-6 pb-12 pt-14 sm:px-10 md:pb-14 md:pt-24 lg:px-16">
        <h1 className="about-title font-editorial">How I Vibe Code</h1>
        <p className="about-process-sequence">Brief it. Design it. Build one piece. Break it. Ship it.</p>
      </section>

      {beats.map((beat) => (
        <section key={beat.id} className="about-step mx-auto w-full max-w-[1440px] px-6 pb-20 sm:px-10 md:pb-24 lg:px-16" aria-labelledby={beat.id}>
          <div className="about-step-heading">
            <span className="about-step-index font-editorial" aria-hidden="true">{beat.index}</span>
            <div className="about-step-heading-copy">
              <p className="site-eyebrow font-mono-archive tracking-[.04em] text-muted-foreground">{beat.eyebrow}</p>
              <h2 id={beat.id} className="font-editorial">{beat.title}</h2>
            </div>
          </div>
          <div className="about-step-grid about-diagram-grid">
            <p className="about-step-lede">{beat.lede}</p>
            <ol className="about-brief-list">
              {beat.points.map((point, index) => (
                <li key={point}>
                  <span className="about-list-mark font-mono-archive" aria-hidden="true">{String.fromCharCode(97 + index)}</span>
                  <span>{point}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ))}

      <section className="about-work-link mx-auto w-full max-w-[1440px] border-t border-border px-6 py-6 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="site-eyebrow font-mono-archive tracking-[.04em] text-muted-foreground">Process / Sharin Khander</p>
          <Link href="/" className="group inline-flex items-center gap-3 font-editorial text-2xl archive-link" data-testid="link-about-work">View work <ArrowUpRight size={17} strokeWidth={1.2} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>
        </div>
      </section>
    </div>
  );
}
