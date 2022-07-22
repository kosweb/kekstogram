import { isEscEvent } from './util.js';

const imgUploadCancel = document.querySelector('.img-upload__cancel');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const rangeField = document.querySelector('.effect-level');
const rangeInput = document.querySelector('.effect-level__value');
const rangeInputValue = document.querySelector('.effect-level__number span');
const effectItems = document.querySelectorAll('.effects__radio');
const rangeMaxValue = 100;
const scaleControlSmallerButton = document.querySelector('.scale__control--smaller');
const scaleControlBiggerButton = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreviewWrapper = document.querySelector('.img-upload__preview');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

scaleControlSmallerButton.addEventListener('click', function(evt) {
	evt.preventDefault();
	if (scaleControlValue.value !== '25%') {
		let value = parseInt(scaleControlValue.value);
		value -= 25;
		scaleControlValue.value = `${value}%`;
		imgUploadPreviewWrapper.style = `transform: scale(0.${value})`;
	}
});

scaleControlBiggerButton.addEventListener('click', function(evt) {
	evt.preventDefault();
	if (scaleControlValue.value !== '100%') {
		let value = parseInt(scaleControlValue.value);
		value += 25;
		scaleControlValue.value = `${value}%`;
		if (value === 100) {
			imgUploadPreviewWrapper.style = 'transform: scale(1)';
		} else {
			imgUploadPreviewWrapper.style = `transform: scale(0.${value})`;
		}
	}
});

effectItems.forEach((el, i) => {
	el.addEventListener('change', () => {
		if (i === 0) {
			rangeField.style = 'display: none';
			imgUploadPreview.removeAttribute('class');
			imgUploadPreview.removeAttribute('style');
		} else {
			rangeField.style = 'display: flex';
			rangeInput.value = rangeMaxValue;
			let x = rangeInput.value;
			rangeInputValue.textContent = x;
			rangeInput.style.background = `linear-gradient(90deg, rgba(255, 231, 83, 1) ${x}%, rgba(255, 231, 83, 0.5) ${x}%)`;
		}

		switch (i) {
			case 1:
				imgUploadPreview.removeAttribute('class');
				imgUploadPreview.removeAttribute('style');
				imgUploadPreview.classList.add('effects__preview--chrome');
				break;
			case 2:
				imgUploadPreview.removeAttribute('class');
				imgUploadPreview.removeAttribute('style');
				imgUploadPreview.classList.add('effects__preview--sepia');
				break;
			case 3:
				imgUploadPreview.removeAttribute('class');
				imgUploadPreview.removeAttribute('style');
				imgUploadPreview.classList.add('effects__preview--marvin');
				break;
			case 4:
				imgUploadPreview.removeAttribute('class');
				imgUploadPreview.removeAttribute('style');
				imgUploadPreview.classList.add('effects__preview--phobos');
				break;
			case 5:
				imgUploadPreview.removeAttribute('class');
				imgUploadPreview.removeAttribute('style');
				imgUploadPreview.classList.add('effects__preview--heat');
				break;
		}
	});
});

rangeInput.addEventListener('input', function() {
	rangeInputValue.textContent = this.value;
	let x = this.value;
	let color = `linear-gradient(90deg, rgba(255, 231, 83, 1) ${x}%, rgba(255, 231, 83, 0.5) ${x}%)`;
	this.style.background = color;

	if (x === 100) {
		x = 1;
	} else {
		x /= 100;
	}

	switch (imgUploadPreview.className) {
		case 'effects__preview--chrome':
			imgUploadPreview.style = `filter: grayscale(${x})`;
			break;
		case 'effects__preview--sepia':
			imgUploadPreview.style = `filter: sepia(${x})`;
			break;
		case 'effects__preview--marvin':
			imgUploadPreview.style = `filter: invert(${x * 100}%)`;
			break;
		case 'effects__preview--phobos':
			imgUploadPreview.style = `filter: blur(${x * 3}px)`;
			break;
		case 'effects__preview--heat':
			imgUploadPreview.style = `filter: brightness(${1 + x * 2})`;
			break;
	}
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
