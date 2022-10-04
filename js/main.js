import './pictures.js';
import './events.js';
import './photo-preview.js';


// СЕРВАКОВСКИЕ ШТУЧКИ


import { renderPhotos, runPictures } from './pictures.js';
import { sendRequest } from './util.js';
import { runFilters } from './filters.js';

let photoData;
const getRequestURL = 'https://24.javascript.pages.academy/kekstagram/data';

sendRequest('GET', getRequestURL)
.then(data => {
	photoData = data;
	renderPhotos(data);
	runFilters();
	runPictures(data);
})
.catch(err => console.log(err));
