import { getRandomIndex, getRandomInt } from './util.js';

const photoTemplate = document.getElementById('picture').content.querySelector('.picture');
const commentTemplate = document.getElementById('comment').content.querySelector('.social__comment');
const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const socialComments = document.querySelector('.social__comments');

const comments = [
	'Всё отлично!',
	'В целом всё неплохо. Но не всё.',
	'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
	'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
	'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
	'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const descriptions = [
	'Тестим новую камеру!',
	'Затусили с друзьями на море',
	'Как же круто тут кормят',
	'Отдыхаем...',
	'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
	'Вот это тачка!'
];

const getPhotosObj = () => {
	let newArr = [];

	for (let i = 0; i < 25; i++) {

		let newObj = {
			url: `photos/${i + 1}.jpg`,
			likes: getRandomInt(50, 200),
			comments: comments.slice(getRandomInt(0, comments.length / 2 - 1),
										 getRandomInt(comments.length / 2, comments.length)),
			description: getRandomIndex(descriptions)
		};

		newArr.push(newObj);
	}

	return newArr;
};

const photosObj = getPhotosObj();

const renderPhotos = () => {
	const fragment = document.createDocumentFragment();

	photosObj.forEach(el => {
		const photoCopy = photoTemplate.cloneNode('true');

		photoCopy.querySelector('.picture__img').src = el.url;
		photoCopy.querySelector('.picture__comments').textContent = el.comments.length;
		photoCopy.querySelector('.picture__likes').textContent = el.likes;
		fragment.appendChild(photoCopy)
	});

	return pictures.appendChild(fragment);
};

const renderComments = (arr) => {
	const fragment = document.createDocumentFragment();

	for (let i = 0; i < 2; i++) {
		const commentCopy = commentTemplate.cloneNode('true');
		commentCopy.querySelector('.social__picture').src = `img/avatar-${getRandomInt(1, 6)}.svg`;
		commentCopy.querySelector('.social__text').textContent = getRandomIndex(arr.comments);
		fragment.appendChild(commentCopy);
	}

	return socialComments.appendChild(fragment);
};

const showBigPhoto = (arr) => {
	bigPicture.classList.remove('hidden');
	bigPicture.querySelector('.big-picture__img img').src = arr.url;
	bigPicture.querySelector('.likes-count').textContent = arr.likes;
	bigPicture.querySelector('.comments-count').textContent = arr.comments.length;
	bigPicture.querySelector('.social__caption').textContent = arr.description;
	bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
	bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
};


renderPhotos();

export { showBigPhoto, renderComments };
export { photosObj, socialComments, bigPicture };
