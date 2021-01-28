import {FilterType} from '../const.js';

export const filter = {
  [FilterType.ALL]: (films) => films.filter((film) => film),
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.isFilmInWatchList),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.isFilmInAlreadyWatch),
  [FilterType.FAVORITE]: (films) => films.filter((film) => film.isFilmInFavorite)
};

