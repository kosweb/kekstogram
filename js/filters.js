import { renderPhotos } from './pictures.js';
import { shuffle } from './util.js';

const runFilters = (data) => {
	const imgFilters = document.querySelector('.img-filters');
	const imgFiltersButtons = document.querySelectorAll('.img-filters__button');
	imgFilters.classList.remove('img-filters--inactive');

	imgFiltersButtons.forEach((el, i, arr) => {
		el.addEventListener('click', (evt) => {
			evt.preventDefault();

			if (i === 0) {
				renderPhotos(data.slice());
			}
			if (i === 1) {
				renderPhotos(shuffle(data.slice()).slice(0,9));
			}
			if (i === 2) {
				renderPhotos(data.slice().sort((left, right) => {
					return right.comments.length - left.comments.length;
				}))
			}

			if (el.classList.contains('img-filters__button--active')) {
				return evt;
			}
			for (let button of arr) {
				if (button.classList.contains('img-filters__button--active')) {
					button.classList.remove('img-filters__button--active');
				}
			}
			el.classList.add('img-filters__button--active');
		})
	});
};

export { runFilters };
