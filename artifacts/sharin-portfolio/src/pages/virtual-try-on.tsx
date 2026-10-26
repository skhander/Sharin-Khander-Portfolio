import { useState } from 'react';
import { ArrowLeft, Play } from 'lucide-react';
import { Link } from 'wouter';
import { usePageMeta } from '@/lib/use-page-meta';
import './virtual-try-on.css';

const media = (filename: string) => `${import.meta.env.BASE_URL}media/personal/${filename}`;

const proofImages = [
  {
    src: media('shopmy-try-on-patterned.webp'),
    alt: 'ShopMy try-on example showing a patterned dress.',
    className: 'try-on-proof-patterned',
  },
  {
    src: media('shopmy-try-on-blue.webp'),
    alt: 'ShopMy try-on example showing a blue dress.',
    className: 'try-on-proof-blue',
  },
  {
    src: media('shopmy-try-on-floral.webp'),
    alt: 'ShopMy try-on example showing a dark floral dress.',
    className: 'try-on-proof-floral',
  },
];

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
      className="vto-video-play"
      onClick={() => setStarted(true)}
      aria-label={`Play ${label}`}
      data-testid={`button-play-${testId}`}
    >
      <img src={media(poster)} alt="" loading="lazy" />
      <span className="vto-play-icon"><Play size={21} fill="currentColor" aria-hidden="true" /></span>
    </button>
  );
}

export default function VirtualTryOn() {
  usePageMeta(
    'Virtual try-on avatar — Sharin Khander',
    'A Chrome extension that lets you shop any site as an avatar of yourself.',
  );

  return (
    <article className="page-reveal virtual-try-on">
      <header className="vto-header">
        <div className="vto-shell">
          <Link
            href="/"
            className="vto-back archive-link"
            data-testid="link-back-home-virtual-try-on"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            <span>All work</span>
          </Link>
          <div className="vto-intro">
            <div>
              <h1 id="virtual-try-on-title" className="font-editorial" data-testid="text-virtual-try-on-title">
                Virtual try-on<br className="vto-title-break" /> avatar
              </h1>
            </div>
            <div className="vto-intro-copy">
              <p className="vto-question font-editorial">You have to imagine the clothes on someone else.</p>
              <p className="vto-description">
                This extension lets you browse as yourself.
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="vto-editorial-section vto-build" aria-labelledby="vto-build-title">
        <div className="vto-shell vto-section-grid">
          <h2 id="vto-build-title" className="vto-section-title font-editorial">Demo</h2>
          <div className="vto-build-content">
            <p className="vto-build-copy">
              Upload a photo → submit → browse the site as an avatar of you.
            </p>
            <figure className="vto-video-figure vto-build-recording">
              <DemoVideo
                file="virtual-try-on-build-upload.mp4"
                poster="virtual-try-on-build-upload-poster.jpg"
                label="Virtual try-on avatar build recording showing a photo upload on ShopMy"
                testId="video-virtual-try-on-build-upload"
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="vto-demo vto-shell" aria-label="Virtual try-on avatar working demo">
        <figure className="vto-video-figure vto-video-detail">
          <figcaption className="vto-video-caption">PDP</figcaption>
          <DemoVideo
            file="virtual-try-on-pdp.mp4"
            poster="virtual-try-on-pdp-poster.jpg"
            label="Virtual try-on avatar demo recording showing a ShopMy product detail page and try-on"
            testId="video-virtual-try-on-product-page"
          />
        </figure>
        <figure className="vto-video-figure vto-video-main">
          <figcaption className="vto-video-caption">Browse Page</figcaption>
          <DemoVideo
            file="virtual-try-on-grid-web.mp4"
            poster="virtual-try-on-grid-poster.jpg"
            label="Virtual try-on avatar demo recording showing ShopMy product browsing and try-on"
            testId="video-virtual-try-on-grid"
          />
        </figure>
      </section>

      <section className="vto-editorial-section vto-learning" aria-labelledby="vto-learning-title">
        <div className="vto-shell vto-section-grid">
          <h2 id="vto-learning-title" className="vto-section-title font-editorial">What I learned</h2>
          <div className="vto-learning-copy font-editorial">
            <p>The model messed up fit. Faces and bodies warped.</p>
            <p>More realistic meant a slower page.</p>
            <p>The question was simple. Was it good enough to help someone buy?</p>
          </div>
        </div>
      </section>

      <section className="vto-proof-section" aria-labelledby="vto-proof-title">
        <div className="vto-shell">
          <div className="vto-proof-heading">
            <div>
              <h2 id="vto-proof-title" className="font-editorial">Yes.</h2>
            </div>
          </div>
          <div className="vto-proof-grid">
            {proofImages.map((image) => (
              <div className={`vto-proof-figure ${image.className}`} key={image.src}>
                <div className="vto-proof-image">
                  <img src={image.src} alt={image.alt} loading="lazy" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}