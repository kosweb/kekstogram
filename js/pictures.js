import { onBigPhotoEscPress } from './events.js';

const photoTemplate = document.getElementById('picture').content.querySelector('.picture');
const commentTemplate = document.getElementById('comment').content.querySelector('.social__comment');
const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const socialComments = document.querySelector('.social__comments');

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

bigPicture.addEventListener('click', (evt) => {
	if (evt.target.classList.contains('overlay')) {
		bigPicture.classList.add('hidden');
	}
})

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
		const target = evt.target;
		if (target.classList.contains('picture__img')) {
			const miniImgSrc = target.src;
			for (let obj of data) {
				if (miniImgSrc.indexOf(obj.url) > 0) {
					renderComments(obj.comments);
					showBigPhoto(obj);
				}
			}
		}
		document.addEventListener('keydown', onBigPhotoEscPress);
	});
};



export { showBigPhoto, renderComments, renderPhotos, runPictures };


// АЛГОРИТМ
// 1 - ПРИ КЛИКЕ НА МИНИФОТКУ ПОЛУЧИТЬ ЕЕ САУРС
// 2 - ПРОЙТИСЬ ПО МАССИВУ ОБЬЕКТОВ И СРАВНИТЬ САУРС КАЖДОГО ОБЬЕКТА
// 		С САУРСОМ МИНИФОТКИ
// 3 - ЕСЛИ САУРСЫ СОВПАЛИ, ВСТАВИТЬ ЭТОТ ОБЬЕКТ В БИГФОТО И В РЕНДЕРКОММЕНТС
