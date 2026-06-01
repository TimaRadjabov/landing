import { useState, useCallback, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { PROJECTS, imageUrl, imageUrlOriginal } from '../data/projectsData';

const PRELOAD_AHEAD = 3;

function SlideImage({ folder, img, index, alt, isFirst }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="projects-main__slide">
      {!loaded && <div className="projects-main__skeleton" />}
      <picture>
        <source srcSet={imageUrl(folder, img)} type="image/webp" />
        <img
          src={imageUrlOriginal(folder, img)}
          alt={alt}
          className={`projects-main__img${loaded ? ' projects-main__img--loaded' : ''}`}
          loading={isFirst ? 'eager' : 'lazy'}
          fetchPriority={isFirst ? 'high' : 'low'}
          decoding={isFirst ? 'sync' : 'async'}
          onLoad={() => setLoaded(true)}
        />
      </picture>
    </div>
  );
}

// ── Fullscreen Modal ───────────────────────────────────────────────
function FullscreenModal({ project, initialIndex, onClose }) {
  const folder = project.folder;
  const images = project.images;

  return (
    <div className="fullscreen">
      {/* Close button */}
      <button className="fullscreen__close" onClick={onClose} aria-label="Закрыть">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Counter (e.g. "3 / 12") */}
      <div className="fullscreen__counter" />

      <Swiper
        modules={[Navigation, Keyboard, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={400}
        navigation
        keyboard={{ enabled: true }}
        slidesPerView={1}
        initialSlide={initialIndex}
        className="fullscreen__swiper"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <div className="fullscreen__slide">
              <picture>
                <source srcSet={imageUrl(folder, img)} type="image/webp" />
                <img src={imageUrlOriginal(folder, img)} alt={`${project.title} — фото ${i + 1}`} className="fullscreen__img" />
              </picture>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────
export default function Projects() {
  const [activeProject, setActiveProject] = useState(0);
  const [mainSwiper, setMainSwiper] = useState(null);
  const [visibleSlides, setVisibleSlides] = useState(() => new Set([0, 1, 2, 3]));
  const [fullscreen, setFullscreen] = useState(null); // { projectIndex, slideIndex }

  const current = PROJECTS[activeProject];

  const handleThumbClick = (i) => {
    setActiveProject(i);
    setVisibleSlides(new Set([0, 1, 2, 3]));
    if (mainSwiper) mainSwiper.slideTo(0);
  };

  const handleSlideChange = useCallback((swiper) => {
    const i = swiper.activeIndex;
    setVisibleSlides(prev => {
      const next = new Set(prev);
      for (let j = 0; j <= PRELOAD_AHEAD; j++) next.add(i + j);
      return next;
    });
  }, []);

  const handleThumbHover = useCallback((i) => {
    const p = PROJECTS[i];
    if (p && p.images[0]) {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.as = 'image';
      link.href = imageUrl(p.folder, p.images[0]);
      document.head.appendChild(link);
    }
  }, []);

  // Keyboard handler for closing fullscreen
  useEffect(() => {
    if (!fullscreen) return;
    const handler = (e) => {
      if (e.key === 'Escape') setFullscreen(null);
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [fullscreen]);

  const openFullscreen = () => {
    const slideIndex = mainSwiper?.activeIndex || 0;
    setFullscreen({ projectIndex: activeProject, slideIndex });
  };

  return (
    <section className="section" id="projects">
      <div className="section__container">
        <div className="section__label">03 · Работы</div>
        <h2 className="section__title">Объекты, которые мы сдали</h2>

        {/* Main slider */}
        <div className="projects-main">
          <div className="projects-main__header">
            <h3 className="projects-main__title">{current.title}</h3>
            <span className="projects-main__badge">{current.badge}</span>
          </div>

          <div className="projects-main__slider-wrap">
            <Swiper
              key={activeProject}
              modules={[Pagination, Autoplay, EffectFade]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              speed={600}
              pagination={{ clickable: true, dynamicBullets: true }}
              autoplay={{ delay: 3500, disableOnInteraction: true, pauseOnMouseEnter: true }}
              slidesPerView={1}
              onSwiper={setMainSwiper}
              onSlideChange={handleSlideChange}
              className="projects-main__swiper"
            >
              {current.images.map((img, i) => (
                <SwiperSlide key={i}>
                  {visibleSlides.has(i) && (
                    <SlideImage
                      folder={current.folder}
                      img={img}
                      index={i}
                      alt={`${current.title} — фото ${i + 1}`}
                      isFirst={i === 0}
                    />
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
            <button className="projects-main__fullscreen" onClick={openFullscreen} aria-label="На весь экран">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Thumb slider */}
        <div className="projects-thumbs">
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={10}
            slidesPerView="auto"
            className="projects-thumbs__swiper"
          >
            {PROJECTS.map((p, i) => (
              <SwiperSlide
                key={i}
                className={i === activeProject ? 'projects-thumbs__slide--active' : ''}
                onClick={() => handleThumbClick(i)}
                onMouseEnter={() => handleThumbHover(i)}
              >
                <div className="projects-thumbs__slide">
                  <picture>
                    <source srcSet={imageUrl(p.folder, p.images[0])} type="image/webp" />
                    <img
                      src={imageUrlOriginal(p.folder, p.images[0])}
                      alt={p.title}
                      className="projects-thumbs__img"
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                  <span className="projects-thumbs__label">{p.title}</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Fullscreen modal */}
      {fullscreen && (
        <FullscreenModal
          project={PROJECTS[fullscreen.projectIndex]}
          initialIndex={fullscreen.slideIndex}
          onClose={() => setFullscreen(null)}
        />
      )}
    </section>
  );
}
