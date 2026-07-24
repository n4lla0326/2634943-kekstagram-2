import '../vendor/pristine/pristine.min.js';

const Pristine = window.Pristine;
const noUiSlider = window.noUiSlider;

const form = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancelButton = document.querySelector('.img-upload__cancel');

const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');

const previewImage = form.querySelector('.img-upload__preview img');
const effectsPreview = form.querySelector('.effects__preview');

const scaleControl = form.querySelector('.scale__control--value');
const scaleSmallerButton = form.querySelector('.scale__control--smaller');
const scaleBiggerButton = form.querySelector('.scale__control--bigger');

const sliderContainer = form.querySelector('.effect-level');
const sliderElement = form.querySelector('.effect-level__slider');
const sliderValue = form.querySelector('.effect-level__value');

const effectsContainer = form.querySelector('.effects');

const SCALE = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
  DEFAULT: 100,
};

const MAX_HASHTAGS = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;

const EFFECTS = {
  none: {
    min: 0,
    max: 1,
    step: 0.1,
    start: 0,
    filter: '',
  },

  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
    filter: (value) => `grayscale(${value})`,
  },

  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
    filter: (value) => `sepia(${value})`,
  },

  marvin: {
    min: 0,
    max: 100,
    step: 1,
    start: 100,
    filter: (value) => `invert(${value}%)`,
  },

  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    start: 3,
    filter: (value) => `blur(${value}px)`,
  },

  heat: {
    min: 1,
    max: 3,
    step: 0.1,
    start: 3,
    filter: (value) => `brightness(${value})`,
  },
};

let pristine;
let slider;

const validateHashtags = (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtags = value.trim().toLowerCase().split(/\s+/);

  if (hashtags.length > MAX_HASHTAGS) {
    return false;
  }

  const uniqueHashtags = new Set();

  return hashtags.every((hashtag) => {
    const isValid = /^#[a-zа-яё0-9]{1,19}$/i.test(hashtag);

    if (!isValid || uniqueHashtags.has(hashtag)) {
      return false;
    }

    uniqueHashtags.add(hashtag);
    return true;
  });
};

const validateComment = (value) =>
  value.length <= MAX_COMMENT_LENGTH;

const initValidation = () => {
  pristine = new Pristine(form);

  pristine.addValidator(
    hashtagInput,
    validateHashtags,
    'Введите корректные хэштеги'
  );

  pristine.addValidator(
    commentInput,
    validateComment,
    'Комментарий не должен превышать 140 символов'
  );
};
const updateScale = (value) => {
  previewImage.style.transform = `scale(${value / 100})`;
  scaleControl.value = `${value}%`;
};

const changeScale = (step) => {
  const currentValue = parseInt(scaleControl.value, 10);

  const newValue = Math.min(
    SCALE.MAX,
    Math.max(SCALE.MIN, currentValue + step)
  );

  updateScale(newValue);
};

const initScale = () => {
  scaleSmallerButton.addEventListener('click', () => {
    changeScale(-SCALE.STEP);
  });

  scaleBiggerButton.addEventListener('click', () => {
    changeScale(SCALE.STEP);
  });

  updateScale(SCALE.DEFAULT);
};

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
    tooltips: true
  });

  slider = sliderElement.noUiSlider;
  sliderContainer.classList.add('hidden');
};

const updateSlider = (effect) => {
  slider.updateOptions({
    range: {
      min: EFFECTS[effect].min,
      max: EFFECTS[effect].max,
    },
    start: EFFECTS[effect].start,
    step: EFFECTS[effect].step,
  });
};

const removeEffectClasses = () => {
  Object.keys(EFFECTS)
    .filter((effect) => effect !== 'none')
    .forEach((effect) => {
      effectsPreview.classList.remove(`effects__preview--${effect}`);
    });
};

const applyEffect = (effect) => {
  if (effect === 'none') {
    sliderContainer.classList.add('hidden');
    previewImage.style.filter = '';
    sliderValue.value = '';
    return;
  }

  sliderContainer.classList.remove('hidden');

  removeEffectClasses();
  effectsPreview.classList.add(`effects__preview--${effect}`);

  updateSlider(effect);

  previewImage.style.filter =
    EFFECTS[effect].filter(Number(slider.get()));

  sliderValue.value = slider.get();
};

const initEffects = () => {
  effectsContainer.addEventListener('change', (evt) => {
    applyEffect(evt.target.value);
  });

  slider.on('update', () => {
    const currentEffect = form.querySelector(
      '.effects__radio:checked'
    ).value;

    if (currentEffect === 'none') {
      return;
    }

    const value = Number(slider.get());

    previewImage.style.filter =
      EFFECTS[currentEffect].filter(value);

    sliderValue.value = value;
  });
};
const resetForm = () => {
  form.reset();

  updateScale(SCALE.DEFAULT);

  previewImage.style.transform = '';

  removeEffectClasses();

  previewImage.style.filter = '';

  sliderContainer.classList.add('hidden');

  slider.set(EFFECTS.none.start);

  sliderValue.value = '';

  pristine.reset();
};

const isTextFieldFocused = () =>
  document.activeElement === hashtagInput ||
  document.activeElement === commentInput;

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    closeUploadForm();
  }
};

const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);

  resetForm();

  uploadInput.value = '';
};

const onUploadInputChange = () => {
  openUploadForm();
};

const onCloseButtonClick = (evt) => {
  evt.preventDefault();
  closeUploadForm();
};

const initUploadForm = () => {
  initValidation();
  initScale();
  createSlider();
  initEffects();

  uploadInput.addEventListener('change', onUploadInputChange);

  uploadCancelButton.addEventListener('click', onCloseButtonClick);
};

export { initUploadForm };
