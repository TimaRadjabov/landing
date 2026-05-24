import { useState } from 'react';
import kirillImg from '../avatars/kirill.jpg';
import farxatImg from '../avatars/farxat.jpg';

const TEAM = [
  {
    avatar: kirillImg,
    name: 'Кирилл, мастер',
    role: '5 лет в ремонте · Инженерное образование',
    desc: 'Окончил программу «Бригадный подряд». Лично вёл 11 объектов одновременно. Специализация — санузлы под ключ.',
  },
  {
    avatar: farxatImg,
    name: 'Фархат, мастер',
    role: '5 лет в ремонте · Инженерное образование',
    desc: 'Окончил программу «Бригадный подряд». Лично вёл 11 объектов одновременно. Специализация — санузлы под ключ.',
  },
];

export default function Team() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="section" id="team">
      {/* Фоновый коллаж из фото мастеров на всю секцию */}
      <div className="team-bg">
        {TEAM.map((m, i) => (
          <img
            key={i}
            src={m.avatar}
            alt=""
            className={`team-bg__img${hovered === i ? ' team-bg__img--active' : ''}`}
            aria-hidden="true"
          />
        ))}
      </div>

      <div className={`section__container${hovered !== null ? ' section__container--dimmed' : ''}`}>
        <div className="section__label">05 · Команда</div>
        <h2 className="section__title">За каждым объектом — конкретный человек</h2>

        <div className={`team__grid${hovered !== null ? ' team__grid--dimmed' : ''}`}>
          {TEAM.map((m, i) => (
            <div
              className="team-card"
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="team-card__avatar">
                <img src={m.avatar} alt={m.name} className="team-card__img" />
              </div>
              <div>
                <div className="team-card__name">{m.name}</div>
                <div className="team-card__role">{m.role}</div>
                <div className="team-card__desc">{m.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
