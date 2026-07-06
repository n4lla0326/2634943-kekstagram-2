import { similarArray } from './data.js';

const photos = similarArray();

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const pictureElement = pictureTemplate.querySelector('.picture');

const createPictureElement = (photo) => {
  const picture = pictureElement.cloneNode(true);

  const img = picture.querySelector('.picture__img');
  const likes = picture.querySelector('.picture__likes');
  const commentsCount = picture.querySelector('.picture__comments');

  img.src = photo.url;
  img.alt = photo.description;
  likes.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;

  return picture;
};

const picturesFragment = document.createDocumentFragment();

photos.forEach((photo) => {
  const pictureNode = createPictureElement(photo);
  picturesFragment.appendChild(pictureNode);
});

picturesContainer.appendChild(picturesFragment);
