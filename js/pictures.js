import { onBigPhotoEscPress } from './events.js';

const photoTemplate = document.getElementById('picture').content.querySelector('.picture');
const commentTemplate = document.getElementById('comment').content.querySelector('.social__comment');
const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const socialComments = document.querySelector('.social__comments');
const minCommentsCount = bigPicture.querySelector('.comments-min-count');
const maxCommentsCount = bigPicture.querySelector('.comments-max-count');
const commentsLoaderButton = bigPicture.querySelector('.social__comments-loader');


bigPicture.addEventListener('click', (evt) => {
	if (evt.target.classList.contains('overlay')) {
		bigPicture.classList.add('hidden');
	}
});

const renderPhotos = (arr) => {

	if (pictures.children.length > 2) {
		for (let i = pictures.children.length - 1; i > 1; i--) {
			pictures.children[i].remove();
		}
	}

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

const commentsLoader = () => {
	if (maxCommentsCount.textContent - minCommentsCount.textContent <= 5) {
		Array.from(socialComments.children).forEach((el) => {
			el.classList.contains('visually-hidden') ? el.classList.remove('visually-hidden') : false;
		});
		// прячу кнопку
		commentsLoaderButton.classList.add('visually-hidden');
		// делаю минимальное кол-во комментов максимальным
		minCommentsCount.textContent = maxCommentsCount.textContent;
	} else {
		Array.from(socialComments.children).forEach((el, i) => {
			if (i < +(minCommentsCount.textContent) + 5) {
				el.classList.contains('visually-hidden') ? el.classList.remove('visually-hidden') : false;
			}
		});
		minCommentsCount.textContent = +(minCommentsCount.textContent) + 5;
	}
};

const loadComments = (arr) => {
	if (arr.length <= 5) {
		minCommentsCount.textContent = arr.length;
		// прячу кнопку
		if (!(commentsLoaderButton.classList.contains('visually-hidden'))) {
			commentsLoaderButton.classList.add('visually-hidden');
		};
		commentsLoaderButton.removeEventListener('click', commentsLoader);
	} else {
		minCommentsCount.textContent = 5;

		// прохожусь по всему массиву КОММЕНТОВ и скрываю все после пятого
		Array.from(socialComments.children).forEach((el, i) => {
			i > 4 ? el.classList.add('visually-hidden') : false;
		});
		// показываю кнопку
		if (commentsLoaderButton.classList.contains('visually-hidden')) {
			commentsLoaderButton.classList.remove('visually-hidden');
		};
		commentsLoaderButton.addEventListener('click', commentsLoader);
	}
};

const showBigPhoto = (obj) => {
	bigPicture.classList.remove('hidden');
	bigPicture.querySelector('.big-picture__img img').src = obj.url;
	bigPicture.querySelector('.likes-count').textContent = obj.likes;
	bigPicture.querySelector('.social__caption').textContent = obj.description;
	maxCommentsCount.textContent = obj.comments.length;
};

const runPictures = (data) => {
	pictures.addEventListener('click', (evt) => {
		const target = evt.target;
		if (target.classList.contains('picture__img')) {
			const miniImgSrc = target.src;
			for (let obj of data) {
				if (miniImgSrc.indexOf(obj.url) > 0) {
					renderComments(obj.comments);
					showBigPhoto(obj);
					loadComments(obj.comments);
				}
			}
		}
		document.addEventListener('keydown', onBigPhotoEscPress);
	});
};

export { renderPhotos, runPictures };
