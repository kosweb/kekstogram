import { isEscEvent } from './util.js';

const imgUploadCancel = document.querySelector('.img-upload__cancel');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelNumber = document.querySelector('.effect-level__number span');

effectLevelValue.addEventListener('input', function() {
	effectLevelNumber.textContent = this.value;
	let x = effectLevelValue.value;
	let color = `linear-gradient(90deg, rgba(255, 231, 83, 1) ${x}%, rgba(255, 231, 83, 0.5) ${x}%)`;
	effectLevelValue.style.background = color;
});

const onImgUploadOverlayEscPress = (evt) => {
	if (isEscEvent(evt)) {
		evt.preventDefault();
		imgUploadOverlay.classList.add('hidden');
		imgUploadInput.value = '';
		document.removeEventListener('keydown', onImgUploadOverlayEscPress);
	}
};

imgUploadInput.addEventListener('change', () => {
	imgUploadOverlay.classList.remove('hidden');
	document.addEventListener('keydown', onImgUploadOverlayEscPress);
});

imgUploadCancel.addEventListener('click', (evt) => {
	evt.preventDefault();
	imgUploadOverlay.classList.add('hidden');
	imgUploadInput.value = '';
	document.removeEventListener('keydown', onImgUploadOverlayEscPress);
});
