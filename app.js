const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const galleryList = document.querySelector('.js-gallery');

for (const { preview, original, description } of galleryItems) {
  const newItem = document.createElement('li');
  newItem.className = 'gallery__item';

  const newLink = document.createElement('a');
  newLink.className = 'gallery__link';
  newLink.href = original;

  const newImage = document.createElement('img');
  newImage.className = 'gallery__image';
  newImage.setAttribute('src', preview);
  newImage.setAttribute('alt', description);
  newImage.dataset['source'] = original;

  newLink.appendChild(newImage);
  newItem.appendChild(newLink);
  galleryList.appendChild(newItem);
}

const lightbox = document.querySelector('.js-lightbox');
const bigImage = lightbox.querySelector('.lightbox__image');

galleryList.addEventListener('click', e => {
  if (e.target.nodeName !== 'IMG') return;
  e.preventDefault();

  lightbox.classList.add('is-open');
  bigImage.setAttribute('src', e.target.dataset.source);
});

const btnClose = lightbox.querySelector('button[data-action="close-lightbox"]');

btnClose.addEventListener('click', hideModal);

window.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('is-open')) return;
  let increment = 0;
  switch (e.key) {
    case 'Escape':
      hideModal();
    default:
      return;

    case 'ArrowLeft':
      increment = -1;
      break;
    case 'ArrowRight':
      increment = 1;
      break;
  }
  //console.log(increment);
  let idx = galleryItems.findIndex(
    ({ original }) => original == bigImage.getAttribute('src'),
  );
  bigImage.setAttribute(
    'src',
    galleryItems[mod(idx + increment, galleryItems.length)].original,
  );
});

lightbox
  .querySelector('.lightbox__overlay')
  .addEventListener('click', hideModal);

function hideModal() {
  lightbox.classList.remove('is-open');
  bigImage.setAttribute('src', '');
}

function mod(a, n) {
  return ((a % n) + n) % n; // modulo without negatives
}
