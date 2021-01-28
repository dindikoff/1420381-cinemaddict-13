import {getTimeFromMins} from './utils.js';
import dayjs from 'dayjs';
import {StatsFilter} from '../const';

export const getWatchedList = (filmsList) => {
  return filmsList.filter((film) => film.isFilmInAlreadyWatch === true);
};

export const getTotalDurationStats = (films) => {
  let durationStats = 0;

  getWatchedList(films).forEach((film) => {
    durationStats += film.duration;
  });

  return {
    HOURS: getTimeFromMins(durationStats, true).hours,
    MINUTES: getTimeFromMins(durationStats, true).minutes
  };
};

const getTopGenreStats = (films) => {
  const combinedGenreList = [];
  getWatchedList(films).forEach((item) => {
    item.genre.forEach((genreItem) => {
      combinedGenreList.push(genreItem);
    });
  });

  const countGenres = combinedGenreList.reduce((accumulator, currentValue) => {
    accumulator[currentValue] = (accumulator[currentValue] || 0) + 1;
    return accumulator;
  }, {});

  const sortGenres = {};

  Object.keys(countGenres).sort((genreA, genreB) =>
    countGenres[genreB] - countGenres[genreA]).forEach((key) => {
    sortGenres[key] = countGenres[key];
  });

  return {
    SORT_GENRES: sortGenres,
    TOP_GENRE: Object.keys(sortGenres)[0],
  };
};

export const filterGenres = (data) => {
  const {films, filter} = data;
  let sortedGenres;

  const filterByPeriodS = (period) => {
    return getWatchedList(films)
      .filter((i) => i.watchingDate >= dayjs().subtract(1, period).toDate());
  };

  switch (filter) {
    case StatsFilter.ALL:
      sortedGenres = getWatchedList(films);
      break;
    case StatsFilter.YEAR:
      sortedGenres = filterByPeriodS(StatsFilter.YEAR);
      break;
    case StatsFilter.MONTH:
      sortedGenres = filterByPeriodS(StatsFilter.MONTH);
      break;
    case StatsFilter.WEEK:
      sortedGenres = filterByPeriodS(StatsFilter.WEEK);
      break;
    case StatsFilter.TODAY:
      sortedGenres = filterByPeriodS(StatsFilter.TODAY);
      break;
  }

  return {
    SORT_GENRES: getTopGenreStats(sortedGenres).SORT_GENRES,
    FILMS_COUNT: sortedGenres.length,
    TOP_GENRE: getTopGenreStats(sortedGenres).TOP_GENRE,
    DURATION: getTotalDurationStats(sortedGenres)
  };
};


