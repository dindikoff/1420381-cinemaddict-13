const filmToFilterMap = {
  watchlist: (filmList) => filmList.filter((film) => film.isFilmInWatchList).length,
  history: (filmList) => filmList.filter((film) => film.isFilmInHistory).length,
  favorite: (filmList) => filmList.filter((film) => film.isFilmInFavorite).length
};

export const generateFilter = (films) => {
  return Object.entries(filmToFilterMap).map(([filterName, filmCount]) => {
    return {
      name: filterName,
      count: filmCount(films)
    };
  });
};
