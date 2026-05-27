const PROJECTS = [
  {
    folder: 'Object-1',
    title: 'ЖК «Дубрава 2.0»',
    badge: 'Санузел под ключ',
    images: [
      'image-1.jpg', 'image-2.jpg', 'image-3.jpg', 'image-4.jpg',
      'image-5.jpg', 'image-6.jpg', 'image-7.jpg', 'image-8.jpg',
      'image-9.jpg', 'image-10.jpg', 'image-11.jpg',
      'image-12.jpg', 'image-13.jpg', 'image-14.jpg',
      'image-15.jpg', 'image-16.jpg', 'image-17.jpg',
      'image-18.jpg', 'image-19.jpg', 'image-20.jpg',
      'image-21.jpg', 'image-22.jpg', 'image-23.jpg',
      'image-24.jpg', 'image-25.jpg', 'image-26.jpg',
      'image-27.jpg', 'image-28.jpg',
    ],
  },
  {
    folder: 'Object-2',
    title: 'ЖК «Царево» частный дом',
    badge: 'Два санузла',
    images: [
      'image-1.JPG', 'image-2.JPG', 'image-3.JPG',
      'image-4.JPG', 'image-5.JPG', 'image-6.JPG',
      'image-7.JPG', 'image-8.JPG', 'image-9.JPG',
      'image-10.JPG', 'image-11.JPG', 'image-12.JPG',
      'image-13.JPG', 'image-14.JPG', 'image-15.JPG',
      'image-16.JPG', 'image-17.JPG', 'image-18.JPG',
      'image-19.JPG', 'image-20.JPG', 'image-21.JPG',
      'image-22.PNG', 'image-23.jpg',
      'image-24.JPG', 'image-25.JPG', 'image-26.JPG',
      'image-27.JPG', 'image-28.JPG', 'image-29.JPG',
      'image-30.JPG', 'image-31.JPG', 'image-32.JPG',
      'image-33.JPG', 'image-34.JPG', 'image-35.JPG',
      'image-36.JPG', 'image-37.JPG', 'image-38.JPG',
      'image-39.JPG', 'image-40.PNG',
    ],
  },
  {
    folder: 'Object-3',
    title: 'ЖК «Яшлек», ул. Тихая',
    badge: 'Санузел под ключ',
    images: [
      'image-1.jpg', 'image-2.JPG',
      'image-3.JPG', 'image-4.JPG', 'image-5.JPG',
      'image-6.jpg', 'image-7.JPG',
      'image-8.JPG', 'image-9.JPG', 'image-10.JPG',
      'image-11.JPG', 'image-12.JPG', 'image-13.JPG',
      'image-14.JPG', 'image-15.JPG', 'image-16.JPG',
      'image-17.PNG', 'image-18.jpg', 'image-19.jpg',
      'image-20.jpg', 'image-21.jpg',
    ],
  },
  {
    folder: 'Object-4',
    title: 'Ул. 23 квартал, д.84',
    badge: 'Фартук + подсветка',
    images: [
      'image-1.JPG', 'image-2.JPG',
      'image-3.JPG', 'image-4.JPG',
    ],
  },
  {
    folder: 'Object-5',
    title: 'Сакуры, ул. Теплая, 35',
    badge: 'Первый этаж под ключ',
    images: [
      'image-1.JPG', 'image-2.JPG', 'image-3.JPG',
      'image-4.JPG', 'image-5.JPG', 'image-6.JPG',
      'image-7.JPG', 'image-8.JPG', 'image-9.JPG',
      'image-10.JPG', 'image-11.JPG', 'image-12.JPG',
      'image-13.jpg',
      'image-14.jpg', 'image-15.JPG',
      'image-16.JPG', 'image-17.JPG', 'image-18.JPG',
      'image-19.JPG', 'image-20.JPG', 'image-21.JPG',
      'image-22.jpg', 'image-23.jpg', 'image-24.jpg', 'image-25.jpg',
      'image-26.jpg', 'image-27.jpg', 'image-28.jpg', 'image-29.jpg',
      'image-30.jpg', 'image-31.jpg', 'image-32.jpg',
      'image-33.jpg', 'image-34.jpg', 'image-35.jpg',
      'image-36.jpg', 'image-37.jpg', 'image-38.jpg',
      'image-39.jpg',
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
