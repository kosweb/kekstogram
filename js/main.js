import './pictures.js';
import './events.js';
import './photo-preview.js';


// СЕРВАКОВСКИЕ ШТУЧКИ


import { renderPhotos, runPictures } from './pictures.js';
import { sendRequest } from './util.js';
import { runFilters } from './filters.js';

const getRequestURL = 'https://24.javascript.pages.academy/kekstagram/data';

sendRequest('GET', getRequestURL)
.then(data => {
	renderPhotos(data);
	runFilters(data);
	runPictures(data);
})
.catch(err => console.log(err));
