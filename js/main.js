import './util.js';
import { similarArray } from './data.js';
import { renderCards } from './render-cards.js';
import { initUploadForm } from './form-upload.js';

const photos = similarArray();
renderCards(photos);

initUploadForm();

