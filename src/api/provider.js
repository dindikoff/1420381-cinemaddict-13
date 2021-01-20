import FilmsModel from '../model/movies.js';
import {isOnline} from '../utils/utils.js';

const getSyncedFilms = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.films);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, FilmStore) {
    this._api = api;
    this._filmStore = FilmStore;
  }

  getFilms() {
    if (isOnline()) {
      return this._api.getFilms()
        .then((films) => {
          const items = createStoreStructure(films.map(FilmsModel.adaptToServer));
          this._filmStore.setItems(items);
          return films;
        });
    }

    const storeFilms = Object.values(this._filmStore.getItems());

    return Promise.resolve(storeFilms.map(FilmsModel.adaptToClient));
  }

  getComments(movieId) {
    if (isOnline()) {
      return this._api.getComments(movieId);
    }

    return Promise.reject(new Error(`Get comments failed`));
  }

  updateFilm(film) {
    if (isOnline()) {
      return this._api.updateFilm(film)
        .then((updateFilm) => {
          this._filmStore.setItem(updateFilm.id, FilmsModel.adaptToServer(updateFilm));
          return updateFilm;
        });
    }

    this._filmStore.setItem(film.id, FilmsModel.adaptToServer(Object.assign({}, film)));

    return Promise.resolve(film);
  }

  deleteComment(commentId) {
    if (isOnline()) {
      return this._api.deleteComment(commentId);
    }

    return Promise.reject(new Error(`Delete comment failed`));
  }

  addComment(film, comment) {
    if (isOnline()) {
      return this._api.addComment(film, comment)
        .then((newFilm) => {
          this._filmStore.setItem(newFilm.id, newFilm.movie);
          return newFilm;
        });
    }

    return Promise.reject(new Error(`Add comment failed`));
  }

  sync() {
    if (isOnline()) {
      const storeFilms = Object.values(this._filmStore.getItems());

      return this._api.sync(storeFilms)
        .then((response) => {
          const updatedFilms = getSyncedFilms(response._filmStore);
          const items = createStoreStructure([...updatedFilms]);

          this._filmStore.setItems(items);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }
}
