export const SortType = {
  DEFAULT: `default`,
  BY_DATE: `by-date`,
  BY_RATING: `by-rating`
};

export const KEY = {
  ESC: `Escape`,
  ENTER: `Enter`
};

export const DateType = {
  year: `year`,
};

export const UserAction = {
  UPDATE_FILM: `UPDATE_FILM`,
  UPDATE_COMMENT: `UPDATE_COMMENT`,
};

export const UpdateType = {
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`,
};

export const FilterType = {
  ALL: `All movies`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVORITE: `Favorites`
};

export const MenuStats = {
  MOVIES: `MOVIES`,
  STATISTICS: `STATISTICS`
};

export const StatsFilter = {
  ALL: `all`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};

export const UserRank = {
  NEW: {
    filmsCount: 0,
    rankName: ``
  },
  NOVICE: {
    filmsCount: 10,
    rankName: `novice`
  },
  FAN: {
    filmsCount: 20,
    rankName: `fan`
  },
  MOVIE_BUFF: {
    filmsCount: 21,
    rankName: `movie buff`
  }
};
