import {getTimeFromMins} from './utils.js';
import dayjs from 'dayjs';
import {StatsFilter} from '../const';

export const getWatchedList = (filmsList) => {
  return filmsList.filter((film) => film.isFilmInAlreadyWatch === true);
};

export const totalDurationStats = (films) => {
  let durationStats = 0;

  getWatchedList(films).forEach((film) => {
    durationStats += film.duration;
  });

  return {
    HOURS: getTimeFromMins(durationStats, true).hours,
    MINUTES: getTimeFromMins(durationStats, true).minutes
  };
};

const topGenreStats = (films) => {
  let combinedGenreList = [];
  getWatchedList(films).forEach((item) => {
    item.genre.forEach((genreItem) => {
      combinedGenreList.push(genreItem);
    });
  });

  const countGenreObj = combinedGenreList.reduce((acc, el) => {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, {});

  const sortGenres = {};
  Object.keys(countGenreObj).sort((a, b) =>
    countGenreObj[b] - countGenreObj[a]).forEach((key) => {
    sortGenres[key] = countGenreObj[key];
  });

  return {
    SORT_GENRES: sortGenres,
    TOP_GENRE: Object.keys(sortGenres)[0],
  };
};

export const genresFilter = (data) => {
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
    SORT_GENRES: topGenreStats(sortedGenres).SORT_GENRES,
    FILMS_COUNT: sortedGenres.length,
    TOP_GENRE: topGenreStats(sortedGenres).TOP_GENRE,
    DURATION: totalDurationStats(sortedGenres)
  };
};


