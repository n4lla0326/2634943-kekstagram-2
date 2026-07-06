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
];

const SIMILAR_ARRAY_COUNT = 25;

const Likes = {
  MIN: 15,
  MAX: 200
};
const COMMENTS = 30;
const Avatar = {
  MIN: 1,
  MAX: 6
};
const CommentsId = {
  MIN: 10000,
  MAX: 1_000_000
};

const getComment = () => ({
  id: getRandomInteger(CommentsId.MIN, CommentsId.MAX),
  name: getRandomArrayElement(NAMES),
  message: getRandomArrayElement(MESSAGES),
  avatar: `./img/avatar-${getRandomInteger(Avatar.MIN, Avatar.MAX)}.svg`
});

const createArray = (i) => ({
  description: getRandomArrayElement(DESCRIPTIONS),
  id: i,
  url: `./photos/${i}.jpg`,
  likes: getRandomInteger(Likes.MIN, Likes.MAX),
  comments: Array.from({ length: getRandomInteger(0, COMMENTS) }, getComment)
});

const similarArray = () => Array.from({ length: SIMILAR_ARRAY_COUNT }, (_, i) => createArray(i + 1));

export { similarArray };
import { getRandomArrayElement, getRandomInteger } from './util.js';
