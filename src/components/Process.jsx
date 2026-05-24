const STEPS = [
  { num: '01', title: 'Замер на объекте', desc: <>Приезжаем, замеряем, обсуждаем задачу. <strong style={{ fontSize: 'calc(1em + 4px)' }}>Бесплатно</strong>.</> },
  { num: '02', title: 'Смета и договор', desc: 'Прозрачная смета в день замера. Договор фиксирует цену.' },
  { num: '03', title: 'Закупка и логистика', desc: 'Материалы, доставка, согласования — всё на нас.' },
  { num: '04', title: 'Старт работ', desc: 'Берём предоплату, выходим на объект, ведём по графику.' },
  { num: '05', title: 'Регулярный отчёт', desc: 'Фото и видео на каждом этапе. Можно уехать — мы держим связь.' },
  { num: '06', title: 'Сдача и гарантия', desc: 'Принимаете готовый объект. 1 год гарантии на работы.' },
];

export default function Process() {
  return (
    <section className="section" id="process">
      <div className="section__container">
        <div className="section__label">04 · Процесс</div>
        <h2 className="section__title">Как мы работаем</h2>

        <div className="process__grid">
          {STEPS.map((s) => (
            <div className="process-step" key={s.num}>
              <div className="process-step__number">{s.num}</div>
              <div className="process-step__title">{s.title}</div>
              <div className="process-step__desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
