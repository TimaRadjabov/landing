import { useState, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { PROJECTS, imageUrl } from '../data/projectsData';

export default function Projects() {
  const [activeProject, setActiveProject] = useState(0);
  const [mainSwiper, setMainSwiper] = useState(null);
  const [loadedSlides, setLoadedSlides] = useState(() => new Set([0, 1]));

  const current = PROJECTS[activeProject];

  const handleThumbClick = (i) => {
    setActiveProject(i);
    setLoadedSlides(new Set([0, 1]));
    if (mainSwiper) mainSwiper.slideTo(0);
  };

  const handleSlideChange = useCallback((swiper) => {
    const i = swiper.activeIndex;
    setLoadedSlides(prev => {
      const next = new Set(prev);
      next.add(i);
      next.add(i + 1);
      return next;
    });
  }, []);

  return (
    <section className="section" id="projects">
      <div className="section__container">
        <div className="section__label">03 · Работы</div>
        <h2 className="section__title">Объекты, которые мы сдали</h2>

        {/* Main slider — все фото выбранного проекта */}
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
            speed={800}
            cssEase="ease-in"
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 2000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            slidesPerView={1}
            onSwiper={setMainSwiper}
            onSlideChange={handleSlideChange}
            className="projects-main__swiper"
          >
            {current.images.map((img, i) => (
              <SwiperSlide key={i}>
                <div className="projects-main__slide">
                  {loadedSlides.has(i) && (
                    <img
                      src={imageUrl(current.folder, img)}
                      alt={`${current.title} — фото ${i + 1}`}
                      className="projects-main__img"
                      loading={i === 0 ? 'eager' : 'lazy'}
                    />
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Thumb slider — превью проектов */}
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
              >
                <div className="projects-thumbs__slide">
                  <img
                    src={imageUrl(p.folder, p.images[0])}
                    alt={p.title}
                    className="projects-thumbs__img"
                    loading="lazy"
                  />
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
