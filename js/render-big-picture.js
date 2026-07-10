const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImage = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const captionElement = bigPictureElement.querySelector('.social__caption');
const commentsListElement = bigPictureElement.querySelector('.social__comments');
const commentShownCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const commentTotalCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const commentCountBlockElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');

const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const avatarElement = document.createElement('img');
  avatarElement.classList.add('social__picture');
  avatarElement.src = comment.avatar;
  avatarElement.alt = comment.name;
  avatarElement.width = 35;
  avatarElement.height = 35;

  const textElement = document.createElement('p');
  textElement.classList.add('social__text');
  textElement.textContent = comment.message;

  commentElement.appendChild(avatarElement);
  commentElement.appendChild(textElement);

  return commentElement;
};
const renderBigPicture = (photo) => {
  bigPictureImage.src = photo.url;
  bigPictureImage.alt = photo.description;

  likesCountElement.textContent = photo.likes;
  captionElement.textContent = photo.description;

  commentShownCountElement.textContent = photo.comments.length;
  commentTotalCountElement.textContent = photo.comments.length;

  commentsListElement.innerHTML = '';

  const commentsFragment = document.createDocumentFragment();

  photo.comments.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    commentsFragment.appendChild(commentElement);
  });

  commentsListElement.appendChild(commentsFragment);

  commentCountBlockElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');
};

const openBigPicture = (photo) => {
  renderBigPicture(photo);
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};
const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};
closeButtonElement.addEventListener('click', () => {
  closeBigPicture();
});

export { openBigPicture };
