import dayjs from 'dayjs';

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortByYear = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.year, filmB.year);

  if (weight !== null) {
    return weight;
  }

  return dayjs(filmB.date).diff(dayjs(filmA.date));
};

export const sortByRating = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.rating, filmB.rating);

  if (weight !== null) {
    return weight;
  }

  return filmB.rating - filmA.rating;
};

export const getTopRatedFilms = (films, size) => {
  return films.slice().sort((a, b) => b.rating - a.rating).slice(0, size);
};

export const getMostCommented = (films, size) => {
  return films.slice().sort((a, b) => b.comments.length - a.comments.length).slice(0, size);
};
