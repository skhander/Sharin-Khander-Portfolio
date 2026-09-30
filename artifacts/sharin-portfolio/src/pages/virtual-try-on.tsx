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
    'Virtual Try-On — Sharin Khander',
    'A Chrome extension to try on products from The RealReal and ShopMy.',
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
                Virtual<br className="vto-title-break" /> Try-On
              </h1>
            </div>
            <div className="vto-intro-copy">
              <p className="vto-question font-editorial">See it on before you buy it.</p>
              <p className="vto-description">
                I built a Chrome extension that lets you upload a photo of yourself and virtually try on products from any website.
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
                label="Virtual Try-On build recording showing a photo upload on ShopMy"
                testId="video-virtual-try-on-build-upload"
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="vto-demo vto-shell" aria-label="Virtual Try-On working demo">
        <div className="vto-video-figure vto-video-main">
          <DemoVideo
            file="virtual-try-on-grid.mp4"
            poster="virtual-try-on-grid-poster.jpg"
            label="Virtual Try-On demo recording showing ShopMy product browsing and try-on"
            testId="video-virtual-try-on-grid"
          />
        </div>
        <div className="vto-video-figure vto-video-detail">
          <DemoVideo
            file="virtual-try-on-pdp.mp4"
            poster="virtual-try-on-pdp-poster.jpg"
            label="Virtual Try-On demo recording showing a ShopMy product detail page and try-on"
            testId="video-virtual-try-on-product-page"
          />
        </div>
      </section>

      <section className="vto-editorial-section vto-learning" aria-labelledby="vto-learning-title">
        <div className="vto-shell vto-section-grid">
          <h2 id="vto-learning-title" className="vto-section-title font-editorial">What I learned</h2>
          <p className="vto-section-statement vto-learning-copy font-editorial">
            The interesting product question wasn’t whether AI could generate a try-on. It was whether the result was useful enough to change a shopping decision.
          </p>
        </div>
      </section>

      <section className="vto-proof-section" aria-labelledby="vto-proof-title">
        <div className="vto-shell">
          <div className="vto-proof-heading">
            <div>
              <h2 id="vto-proof-title" className="font-editorial">Built for real shopping.</h2>
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