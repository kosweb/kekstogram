const getRandomIndex = (arr) => {
	return arr[Math.floor(Math.random() * (arr.length - 1))];
};

function getRandomInt(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const isEscEvent = (evt) => {
	return evt.key === ('Escape' || 'Esc');
};

const isEnterEvent = (evt) => {
	return evt.key === 'Enter';
};

export { getRandomIndex, getRandomInt, isEscEvent };
