import dayjs from "dayjs";

export const KEY = {
  ESC: `Escape`
};

export const isEscape = (evt) => {
  return evt.key === KEY.ESC;
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomFloat = (a = 1, b = 0) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  return lower + Math.random() * (upper - lower);
};

export const formatReleaseDate = (releaseDate) => {
  return dayjs(releaseDate).format(`DD MMMM YYYY`);
};

export const formatCommentDate = (commentDate) => {
  return dayjs(commentDate).format(`YYYY/M/D HH:MM`);
};

export const getRandomIndexRange = (from, array) => {
  const randomIndex = getRandomInteger(from, array.length - 1);

  return array[randomIndex];
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};
