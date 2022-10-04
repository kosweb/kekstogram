import { onBigPhotoEscPress } from './events.js';

const photoTemplate = document.getElementById('picture').content.querySelector('.picture');
const commentTemplate = document.getElementById('comment').content.querySelector('.social__comment');
const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const socialComments = document.querySelector('.social__comments');

const renderPhotos = (arr) => {
	let picturesCollection = pictures.children;
	if (picturesCollection.length > 2) {
		for (let i = 2; i < picturesCollection.length; i++) {
			picturesCollection[i].remove();
			console.log(picturesCollection);
		}
	}
	console.log(picturesCollection);

	const fragment = document.createDocumentFragment();

	arr.forEach(el => {
		const photoCopy = photoTemplate.cloneNode('true');

		photoCopy.querySelector('.picture__img').src = el.url;
		photoCopy.querySelector('.picture__comments').textContent = el.comments.length;
		photoCopy.querySelector('.picture__likes').textContent = el.likes;
		fragment.appendChild(photoCopy)
	});

	return pictures.appendChild(fragment);
};

const renderComments = (arr) => {
	while (socialComments.firstChild) {
		socialComments.removeChild(socialComments.firstChild);
	}

	const fragment = document.createDocumentFragment();

	for (let i = 0; i < arr.length; i++) {
		const commentCopy = commentTemplate.cloneNode('true');
		commentCopy.querySelector('.social__picture').src = arr[i].avatar;
		commentCopy.querySelector('.social__text').textContent = arr[i].message;
		fragment.appendChild(commentCopy);
	}

	return socialComments.appendChild(fragment);
};

const showBigPhoto = (obj) => {
	bigPicture.classList.remove('hidden');
	bigPicture.querySelector('.big-picture__img img').src = obj.url;
	bigPicture.querySelector('.likes-count').textContent = obj.likes;
	bigPicture.querySelector('.comments-count').textContent = obj.comments.length;
	bigPicture.querySelector('.social__caption').textContent = obj.description;
	bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
	bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
};

const runPictures = (data) => {
	pictures.addEventListener('click', (evt) => {
		let target = evt.target.closest('.picture');
		let picturesChildren = pictures.children;
		let photoIndex = [...picturesChildren].indexOf(target);

		if (photoIndex !== -1) {
			renderComments(data[photoIndex - 2].comments);
			showBigPhoto(data[photoIndex - 2]);
		}

		document.addEventListener('keydown', onBigPhotoEscPress);
	});
};



export { showBigPhoto, renderComments, renderPhotos, runPictures };
