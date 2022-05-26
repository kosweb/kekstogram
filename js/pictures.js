'use strict'

const photoTemplate = document.getElementById('picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');

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

function getRandomInt(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const getRandomIndex = (arr) => {
	return arr[Math.floor(Math.random() * (arr.length - 1))];
};

const getPhotosObj = () => {
	let newArr = [];

	for (let i = 0; i < 25; i++) {

		let newObj = {
			url: `photos/${i + 1}.jpg`,
			likes: getRandomInt(50, 200),
			comments: comments.slice(getRandomInt(0, comments.length / 2 - 1),
										 getRandomInt(comments.length / 2, comments.length)),
			descriptions: getRandomIndex(descriptions)
		};

		newArr.push(newObj);
	}

	return newArr;
};

const photosObj = getPhotosObj();

const renderPhotos = (arr) => {
	const photoCopy = photoTemplate.cloneNode('true');

	photoCopy.querySelector('.picture__img').src = arr.url;
	photoCopy.querySelector('.picture__comments').textContent = arr.comments.length;
	photoCopy.querySelector('.picture__likes').textContent = arr.likes;

	return photoCopy;
};

const appendPhotos = (arr) => {
	const fragment = document.createDocumentFragment();

	for (let i = 0; i < arr.length; i++) {
		fragment.appendChild(renderPhotos(arr[i]));
	}

	return pictures.appendChild(fragment);
}

appendPhotos(photosObj);

// bigPicture.querySelector('.gallery-overlay-image').src = photosObj[0].url;
// bigPicture.querySelector('.likes-count').textContent = photosObj[0].likes;
// bigPicture.querySelector('.comments-count').textContent = photosObj[0].comments.length;
