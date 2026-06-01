const PROJECTS = [
  {
    folder: 'Object-2',
    title: 'ЖК «Царево» частный дом',
    badge: 'Два санузла',
    images: [
      ...Array.from({ length: 21 }, (_, i) => `image-${i + 1}.webp`),
      'image-22.PNG', 'image-22.webp',
      ...Array.from({ length: 17 }, (_, i) => `image-${i + 23}.webp`),
      'image-40.PNG', 'image-40.webp',
    ],
  },
  {
    folder: 'Object-3',
    title: 'ЖК «Яшлек», ул. Тихая',
    badge: 'Санузел под ключ',
    images: [
      ...Array.from({ length: 16 }, (_, i) => `image-${i + 1}.webp`),
      'image-17.PNG', 'image-17.webp',
      ...Array.from({ length: 4 }, (_, i) => `image-${i + 18}.webp`),
    ],
  },
  {
    folder: 'Object-4',
    title: 'Ул. 23 квартал, д.84',
    badge: 'Фартук + подсветка',
    images: ['image-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp'],
  },
  {
    folder: 'Object-5',
    title: 'Сакуры, ул. Теплая, 35',
    badge: 'Первый этаж под ключ',
    images: Array.from({ length: 39 }, (_, i) => `image-${i + 1}.webp`),
  },
  {
    folder: 'Object-6',
    title: 'Константиновка',
    badge: 'Санузел под ключ с демонтажем',
    images: [
      '20260505_130330.webp', '20260505_130335.webp', '20260505_130337.webp',
      'IMG_20260601_122304_414.webp', 'IMG_20260601_122304_415.webp',
      'IMG_20260601_122304_416.webp', 'IMG_20260601_122304_418.webp',
    ],
  },
  {
    folder: 'Object-7',
    title: 'Куюки, ул. 26 квартал',
    badge: 'Санузел под ключ',
    images: [
      '20251004_142051_IMG_6326.webp', '20251004_142103_IMG_6329.webp',
      '20251110_184751_IMG_6782.webp', '20251226_142023.webp',
      '20251226_142039.webp',
    ],
  },
  {
    folder: 'Object-8',
    title: 'Ул. Родина, д.17',
    badge: 'Санузел под ключ',
    images: [
      '20240816_151242_IMG_1710.webp', '20240816_151258_IMG_1715.webp',
      '20240816_151305_IMG_1716.webp', '20240816_151325_IMG_1717.webp',
      '20240816_151343_IMG_1720.webp', '20240816_151357_IMG_1721.webp',
    ],
  },
];

function imageUrl(folder, image) {
  const enc = s => encodeURIComponent(s).replace(/%2C/gi, ',').replace(/%2B/gi, '+');
  const webpName = image.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  return `/images/${enc(folder)}/${enc(webpName)}`;
}

function imageUrlOriginal(folder, image) {
  const enc = s => encodeURIComponent(s).replace(/%2C/gi, ',').replace(/%2B/gi, '+');
  return `/images/${enc(folder)}/${enc(image)}`;
}

export { PROJECTS, imageUrl, imageUrlOriginal };
