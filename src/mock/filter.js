// const filmToFilterMap = {
//   watchlist: (films) => films.filter((film) => film.isFilmInWatchList).length,
//   history: (films) => films.filter((film) => film.isFilmInHistory).length,
//   favorite: (films) => films.filter((film) => film.isFilmInFavorite).length
// };
//
// export const generateFilter = (films) => {
//   return Object.entries(filmToFilterMap).map(([filterName, filmCount]) => {
//     return {
//       name: filterName,
//       count: filmCount(films)
//     };
//   });
// };
