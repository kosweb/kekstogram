const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'webp'];

const fileChoser = document.querySelector('.img-upload__start input[type=file]');
const preview = document.querySelector('.img-upload__preview img');
const lilPreview = document.querySelectorAll('.effects__preview');

fileChoser.addEventListener('change', (evt) => {
	const file = evt.target.files[0];
	const fileName = file.name.toLowerCase();

	const matches = FILE_TYPES.some((element) => {
		return fileName.endsWith(element);
	});

	if (matches) {
		const reader = new FileReader();

		reader.addEventListener('load', () => {

			preview.src = reader.result;
			lilPreview.forEach(el => {
				el.style.backgroundImage = `url(${reader.result})`
			})
		});

		reader.readAsDataURL(file);
	}
});
