import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {KEY, DateType} from '../const.js';
dayjs.extend(relativeTime);

export const isEscape = (evt) => {
  return evt.key === KEY.ESC;
};

export const isEnter = (evt) => {
  return (evt.key === `Enter` && (evt.ctrlKey || evt.metaKey));
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

export const getTimeFromMins = (mins, separate = false) => {
  let hours = Math.trunc(mins / 60);
  let minutes = mins % 60;

  if (separate) {
    return {
      hours,
      minutes
    };
  }
  return hours + `h ` + minutes + `m`;
};

export const formatReleaseDate = (releaseDate, type) => {
  return type === DateType.year
    ? dayjs(releaseDate).format(`YYYY`)
    : dayjs(releaseDate).format(`DD MMM YYYY`);
};

export const formatCommentDate = (commentDate) => {
  return dayjs(commentDate).fromNow();
};

export const getRandomIndexRange = (from, array) => {
  const randomIndex = getRandomInteger(from, array.length - 1);

  return array[randomIndex];
};

export const isOnline = () => {
  return window.navigator.onLine;
};
