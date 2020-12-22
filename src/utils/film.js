import dayjs from "dayjs";

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

  return dayjs(filmB.year).diff(dayjs(filmA.year));
};

export const sortByRating = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.rating, filmB.rating);

  if (weight !== null) {
    return weight;
  }

  return dayjs(filmB.rating).diff(dayjs(filmA.rating));
};
