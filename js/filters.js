const runFilters = () => {
	const imgFilters = document.querySelector('.img-filters');
	const imgFiltersButtons = document.querySelectorAll('.img-filters__button');
	imgFilters.classList.remove('img-filters--inactive');

	imgFiltersButtons.forEach((el, i, arr) => {
		el.addEventListener('click', (evt) => {
			if (i === 0) {
				console.log('yo');
			}
			evt.preventDefault();
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
