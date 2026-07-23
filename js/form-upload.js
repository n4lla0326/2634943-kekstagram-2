import '../vendor/pristine/pristine.min.js';

const Pristine = window.Pristine;

const form = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancelBtn = document.querySelector('.img-upload__cancel');
const uploadSubmitBtn = document.querySelector('.img-upload__submit');
const scaleValue = document.querySelector('.scale__control--value');
const previewImg = document.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelector('.effects__preview');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');

let pristine;

const HASHTAG_LIMIT = 5;
const HASHTAG_MAX_LENGTH = 20;
const COMMENT_MAX_LENGTH = 140;

const validateHashtag = (value) => {
  if (!value.trim()) return true;

  const hashtags = value.trim().split(/\s+/);
  const hashtagPattern = /^#[a-zA-Z0-9]+$/;
  const seenHashtags = new Set();

  for (const hashtag of hashtags) {
    if (!hashtagPattern.test(hashtag)) {
      return false;
    }

    if (hashtag.length > HASHTAG_MAX_LENGTH) {
      return false;
    }

    const lowerHashtag = hashtag.toLowerCase();
    if (seenHashtags.has(lowerHashtag)) {
      return false;
    }
    seenHashtags.add(lowerHashtag);

    if (hashtags.length > HASHTAG_LIMIT) {
      return false;
    }
  }

  return true;
};

const validateDescription = (value) => {
  return value.length <= COMMENT_MAX_LENGTH;
};

const initFormValidation = () => {
  pristine = new Pristine(form);

  pristine.addValidator('hashtags', validateHashtag, 'Неправильный хэштег');
  pristine.addValidator('description', validateDescription, 'Длина комментария превышает 140 символов');

  form.addEventListener('submit', (evt) => {
    if (!pristine.validate()) {
      evt.preventDefault();
    }
  });
};

const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadInput.value = '';
  form.reset();
  scaleValue.value = '100%';
  previewImg.style.transform = 'scale(1)';
  const defaultEffect = document.querySelector('#effect-none');
  if (defaultEffect) {
    defaultEffect.checked = true;
  }
  effectLevelSlider.classList.add('hidden');
  effectsPreview.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
  previewImg.style.filter = '';
};

const onUploadInputChange = () => {
  openUploadForm();
};

const onUploadCancel = (evt) => {
  if (evt.key === 'Escape' || evt.target === uploadCancelBtn) {
    closeUploadForm();
  }
};

const onEscapeKeyDown = (evt) => {
  const activeElement = document.activeElement;
  const isHashtagInput = activeElement.classList.contains('text__hashtags');
  const isDescriptionTextarea = activeElement.classList.contains('text__description');

  if (evt.key === 'Escape' && !isHashtagInput && !isDescriptionTextarea) {
    closeUploadForm();
  }
};

const initUploadForm = () => {
  uploadInput.addEventListener('change', onUploadInputChange);
  uploadCancelBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    closeUploadForm();
  });

  document.addEventListener('keydown', onEscapeKeyDown);

  initFormValidation();
};

export { initUploadForm, openUploadForm, closeUploadForm };
