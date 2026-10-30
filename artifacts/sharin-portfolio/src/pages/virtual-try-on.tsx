import { useState } from 'react';
import { ArrowLeft, Play } from 'lucide-react';
import { Link } from 'wouter';
import { usePageMeta } from '@/lib/use-page-meta';
import './virtual-try-on.css';

const media = (filename: string) => `${import.meta.env.BASE_URL}media/personal/${filename}`;

const learnings = [
  'The model got fit wrong, and faces and bodies warped.',
  'More realistic results made pages slower.',
] as const;

function DemoVideo({ file, poster, label, testId }: { file: string; poster: string; label: string; testId: string }) {
  const [started, setStarted] = useState(false);

  return started ? (
    <video
      src={media(file)}
      poster={media(poster)}
      controls
      autoPlay
      playsInline
      preload="metadata"
      aria-label={label}
      data-testid={testId}
    />
  ) : (
    <button
      type="button"
      className="vto-play"
      onClick={() => setStarted(true)}
      aria-label={`Play ${label}`}
      data-testid={`button-play-${testId}`}
    >
      <img src={media(poster)} alt="" />
      <span className="vto-play-icon"><Play size={16} fill="currentColor" aria-hidden="true" /></span>
    </button>
  );
}

export default function VirtualTryOn() {
  usePageMeta(
    'Virtual try-on chrome extension — Sharin Khander',
    'Browse any apparel site as an avatar of yourself. See how clothes will look on you before you buy them.',
  );

  return (
    <article className="page-reveal virtual-try-on">
      <div className="vto-wrap">
        <header className="vto-mast">
          <Link
            href="/"
            className="vto-back archive-link"
            data-testid="link-back-home-virtual-try-on"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            All work
          </Link>
          <h1 id="virtual-try-on-title" className="vto-title" data-testid="text-virtual-try-on-title">
            Virtual try-on chrome extension
          </h1>
          <div className="vto-intro">
            <p className="vto-dek">
              Browse any apparel site as an avatar of yourself. See how clothes will look on you before you buy them.
            </p>
            <div>
              <h2 id="vto-problem-title" className="vto-heading">The problem</h2>
              <p className="vto-body">
                Online shopping requires you to look at clothes on a mannequin or model and imagine how they will look on you.
              </p>
            </div>
          </div>
        </header>

        <section className="vto-demo" aria-labelledby="vto-demo-title">
          <h2 id="vto-demo-title" className="vto-heading">The demo</h2>
          <p className="vto-body">Upload a full-body photo. Enter your measurements. Then browse any store as an avatar of you.</p>
          <div className="vto-shots">
            <figure className="vto-figure">
              <div className="vto-frame">
                <DemoVideo
                  file="virtual-try-on-build-upload.mp4"
                  poster="virtual-try-on-build-upload-poster.jpg"
                  label="Virtual try-on chrome extension demo: upload a photo on ShopMy"
                  testId="video-virtual-try-on-build-upload"
                />
              </div>
              <figcaption>Demo</figcaption>
            </figure>
            <figure className="vto-figure">
              <div className="vto-frame">
                <img
                  src={media('virtual-try-on-pdp-poster.jpg')}
                  alt="ShopMy product page showing clothes tried on as an avatar"
                  width={1600}
                  height={900}
                />
              </div>
              <figcaption>Product page</figcaption>
            </figure>
            <figure className="vto-figure">
              <div className="vto-frame">
                <img
                  src={`${media('virtual-try-on-grid-poster.jpg')}?v=2`}
                  alt="ShopMy browse page showing a grid of products tried on as an avatar"
                  width={1600}
                  height={900}
                />
              </div>
              <figcaption>Browse page</figcaption>
            </figure>
          </div>
        </section>

        <section className="vto-learned" aria-labelledby="vto-learned-title">
          <h2 id="vto-learned-title" className="vto-heading">What I learned</h2>
          <ul className="vto-learnings">
            {learnings.map((line) => (
              <li key={line}>{line}</li>
            ))}
            <li>
              The question was simple: is it good enough to help someone buy? <strong>Yes.</strong>
            </li>
          </ul>
        </section>
      </div>
    </article>
  );
}
