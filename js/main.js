const NAMES = [
  'Артём',
  'Борис',
  'Владимир',
  'Григорий',
  'Денис',
  'Анастасия',
  'Валерия',
  'Елена',
  'Ирина',
  'Ксения'
];

const DESCRIPTIONS = [
  'Впечатления, которые остаются навсегда.',
  'Каждый кадр - часть летней истории.',
  'Простые вещи - самые важные.',
  'Отдых - это искусство жить.',
  'Вдохновение в каждом дне.',
  'Уют в простых вещах.',
  'Счастье в мелочах вокруг.',
  'Эмоции, которые остаются навсегда.',
  'Вкус к жизни в каждом дне.',
  'Любовь к жизни в деталях.'
];

const MESSAGES = [
  'Всё отлично!В целом всё неплохо.Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент ?!'
]

const SIMILAR_ARRAY_COUNT = 25;
const id = 25;
const likes = 200;
const comments = 30;
const avatar = 25;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const createArray = () => ({
  name: getRandomArrayElement(NAMES),
  message: getRandomArrayElement(MESSAGES),
  description: getRandomArrayElement(DESCRIPTIONS),
  id: getRandomArrayElement(id),
  url: getRandomArrayElement(url),
  likes: getRandomArrayElement(likes),
  comments: getRandomArrayElement(comments),
  avatar: photos / avatar - { getRandomArrayElement }.jpg
});

const similarArray = Array.from({ length: SIMILAR_ARRAY_COUNT }, createArray);

console.log(similarArray);


