import dayjs from "dayjs";

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

export const humanizeReleaseDate = (releaseDate) => {
  return dayjs(releaseDate).format(`DD MMMM YYYY`);
};

export const humanizeCommentDate = (commentDate) => {
  return dayjs(commentDate).format(`YYYY/M/D HH:MM`);
};

// export const topRateFilmsFilter = (films) => {
//   const topFilms = films.sort((a, b) => parseFloat(a.rating) - parseFloat(b.rating));
//   return [topFilms[topFilms.length - 1], topFilms[topFilms.length - 2]];
// };
