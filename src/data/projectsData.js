const PROJECTS = [
  {
    folder: 'Object-1',
    title: 'ЖК «Дубрава 2.0»',
    badge: 'Санузел под ключ',
    images: [
      'image-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp',
      'image-5.webp', 'image-6.webp', 'image-7.webp', 'image-8.webp',
      'image-9.webp', 'image-10.webp', 'image-11.webp',
      'image-12.webp', 'image-13.webp', 'image-14.webp',
      'image-15.webp', 'image-16.webp', 'image-17.webp',
      'image-18.webp', 'image-19.webp', 'image-20.webp',
      'image-21.webp', 'image-22.webp', 'image-23.webp',
      'image-24.webp', 'image-25.webp', 'image-26.webp',
      'image-27.webp', 'image-28.webp',
    ],
  },
  {
    folder: 'Object-2',
    title: 'ЖК «Царево» частный дом',
    badge: 'Два санузла',
    images: [
      'image-1.webp', 'image-2.webp', 'image-3.webp',
      'image-4.webp', 'image-5.webp', 'image-6.webp',
      'image-7.webp', 'image-8.webp', 'image-9.webp',
      'image-10.webp', 'image-11.webp', 'image-12.webp',
      'image-13.webp', 'image-14.webp', 'image-15.webp',
      'image-16.webp', 'image-17.webp', 'image-18.webp',
      'image-19.webp', 'image-20.webp', 'image-21.webp',
      'image-22.PNG', 'image-23.webp',
      'image-24.webp', 'image-25.webp', 'image-26.webp',
      'image-27.webp', 'image-28.webp', 'image-29.webp',
      'image-30.webp', 'image-31.webp', 'image-32.webp',
      'image-33.webp', 'image-34.webp', 'image-35.webp',
      'image-36.webp', 'image-37.webp', 'image-38.webp',
      'image-39.webp', 'image-40.PNG',
    ],
  },
  {
    folder: 'Object-3',
    title: 'ЖК «Яшлек», ул. Тихая',
    badge: 'Санузел под ключ',
    images: [
      'image-1.webp', 'image-2.webp',
      'image-3.webp', 'image-4.webp', 'image-5.webp',
      'image-6.webp', 'image-7.webp',
      'image-8.webp', 'image-9.webp', 'image-10.webp',
      'image-11.webp', 'image-12.webp', 'image-13.webp',
      'image-14.webp', 'image-15.webp', 'image-16.webp',
      'image-17.PNG', 'image-18.webp', 'image-19.webp',
      'image-20.webp', 'image-21.webp',
    ],
  },
  {
    folder: 'Object-4',
    title: 'Ул. 23 квартал, д.84',
    badge: 'Фартук + подсветка',
    images: [
      'image-1.webp', 'image-2.webp',
      'image-3.webp', 'image-4.webp',
    ],
  },
  {
    folder: 'Object-5',
    title: 'Сакуры, ул. Теплая, 35',
    badge: 'Первый этаж под ключ',
    images: [
      'image-1.webp', 'image-2.webp', 'image-3.webp',
      'image-4.webp', 'image-5.webp', 'image-6.webp',
      'image-7.webp', 'image-8.webp', 'image-9.webp',
      'image-10.webp', 'image-11.webp', 'image-12.webp',
      'image-13.webp',
      'image-14.webp', 'image-15.webp',
      'image-16.webp', 'image-17.webp', 'image-18.webp',
      'image-19.webp', 'image-20.webp', 'image-21.webp',
      'image-22.webp', 'image-23.webp', 'image-24.webp', 'image-25.webp',
      'image-26.webp', 'image-27.webp', 'image-28.webp', 'image-29.webp',
      'image-30.webp', 'image-31.webp', 'image-32.webp',
      'image-33.webp', 'image-34.webp', 'image-35.webp',
      'image-36.webp', 'image-37.webp', 'image-38.webp',
      'image-39.webp',
    ],
  },
];

function imageUrl(folder, image) {
  const enc = s => encodeURIComponent(s).replace(/%2C/gi, ',').replace(/%2B/gi, '+');
  // Serve WebP version (all images pre-converted, ~95% smaller)
  const webpName = image.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  return `/images/${enc(folder)}/${enc(webpName)}`;
}

// Original URL for <picture> fallback
function imageUrlOriginal(folder, image) {
  const enc = s => encodeURIComponent(s).replace(/%2C/gi, ',').replace(/%2B/gi, '+');
  return `/images/${enc(folder)}/${enc(image)}`;
}

export { PROJECTS, imageUrl, imageUrlOriginal };
