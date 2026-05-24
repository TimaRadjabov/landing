const NAV_ITEMS = [
  { label: 'Работы', href: '#projects' },
  { label: 'Калькулятор', href: '#calculator' },
  { label: 'Как работаем', href: '#process' },
  { label: 'Команда', href: '#team' },
  { label: 'Контакты', href: '#cta' },
];

export default function Header() {
  const scrollTo = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="header">
      <div className="header__logo">
        <div className="header__logo-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
          </svg>
        </div>
        <span>PULSE.remont</span>
      </div>
      <nav className="header__nav">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => scrollTo(e, item.href)}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <button
        className="header__cta"
        onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
      >
        Получить смету
      </button>
    </header>
  );
}
