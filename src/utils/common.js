import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

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

export const getTimeFromMins = (mins) => {
  let hours = Math.trunc(mins / 60);
  let minutes = mins % 60;
  return hours + `h ` + minutes + `m`;
};

export const formatReleaseDate = (releaseDate, type) => {
  if (type === `year`) {
    return dayjs(releaseDate).format(`YYYY`);
  } else {
    return dayjs(releaseDate).format(`DD MMMM YYYY`);
  }
};

export const formatCommentDate = (commentDate) => {
  return dayjs(commentDate).fromNow();
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
