import Observer from '../utils/observer.js';

export default class Movies extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(updateType, films) {
    this._films = films.slice();

    this._notify(updateType);
  }

  updateFilm(updateType, update) {
    const index = this._films.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error(`Can't Update Film Card`);
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  getFilms() {
    return this._films;
  }

  static adaptToClient(film) {
    const adaptedFilm = Object.assign(
        {},
        film,
        {
          id: film.id,
          title: film.film_info.title,
          originalTitle: film.film_info.alternative_title,
          actors: film.film_info.actors,
          director: film.film_info.director,
          writers: film.film_info.writers,
          date: new Date(film.film_info.release.date),
          country: film.film_info.release.release_country,
          pg: film.film_info.age_rating,
          poster: film.film_info.poster,
          rating: film.film_info.total_rating,
          duration: film.film_info.runtime,
          genre: film.film_info.genre,
          description: film.film_info.description,
          isFilmInWatchList: film.user_details.watchlist,
          isFilmInAlreadyWatch: film.user_details.already_watched,
          isFilmInFavorite: film.user_details.favorite,
          watchingDate: film.user_details.watching_date !== null ? new Date(film.user_details.watching_date) : film.user_details.watching_date,
        }
    );
    delete adaptedFilm.user_details;
    delete adaptedFilm.film_info;
    return adaptedFilm;
  }

  static adaptToServer(film) {
    return {
      'id': film.id,
      'comments': film.comments.map((it) => it.id),
      'film_info': {
        'title': film.title,
        'alternative_title': film.originalTitle,
        'total_rating': film.rating,
        'poster': film.poster,
        'age_rating': film.pg,
        'director': film.director,
        'writers': film.writers,
        'actors': film.actors,
        'release': {
          'date': film.date instanceof Date ? film.date.toISOString() : null,
          'release_country': film.country,
        },
        'runtime': film.duration,
        'genre': film.genre,
        'description': film.description,
      },
      'user_details': {
        'watchlist': film.isFilmInWatchList,
        'already_watched': film.isFilmInAlreadyWatch,
        'watching_date': film.watchingDate instanceof Date ? film.watchingDate.toISOString() : null,
        'favorite': film.isFilmInFavorite,
      }
    };
  }
}
