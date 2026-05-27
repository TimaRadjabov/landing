import { useState, useCallback, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { PROJECTS, imageUrl, imageUrlOriginal } from '../data/projectsData';

// Сколько слайдов вперёд подгружать заранее
const PRELOAD_AHEAD = 3;

function SlideImage({ folder, img, index, alt, isFirst }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="projects-main__slide">
      {/* Skeleton-заглушка пока картинка грузится */}
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

export default function Projects() {
  const [activeProject, setActiveProject] = useState(0);
  const [mainSwiper, setMainSwiper] = useState(null);
  const [visibleSlides, setVisibleSlides] = useState(() => new Set([0, 1, 2, 3]));

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

  // Preload первое изображение следующего проекта при наведении на thumb
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
    </section>
  );
}
