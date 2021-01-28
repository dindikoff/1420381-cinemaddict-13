import AbstractView from './abstract.js';
import {formatReleaseDate, getTimeFromMins} from '../utils/utils';

const createFilmCardTemplate = (film) => {
  const SHORT_DESCRIPTION_MAX_LETTERS = 140;

  const {
    title, rating,
    date, duration,
    genre, poster,
    description, comments,
    isFilmInWatchList, isFilmInAlreadyWatch,
    isFilmInFavorite
  } = film;

  const generateShortDescriptionTemplate = () => {
    return description.length >= SHORT_DESCRIPTION_MAX_LETTERS
      ? description.substring(0, SHORT_DESCRIPTION_MAX_LETTERS)
      : description;
  };

  return (`
    <article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${formatReleaseDate(date, `year`)}</span>
        <span class="film-card__duration">${getTimeFromMins(duration)}</span>
        <span class="film-card__genre">${genre[0]}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${generateShortDescriptionTemplate()}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <div class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isFilmInWatchList ? `film-card__controls-item--active` : ``}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isFilmInAlreadyWatch ? `film-card__controls-item--active` : ``}" type="button">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${isFilmInFavorite ? `film-card__controls-item--active` : ``}" type="button">Mark as favorite</button>
      </div>
    </article>
  `).trim();
};

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._posterClickHandler = this._posterClickHandler.bind(this);
    this._titleClickHandler = this._titleClickHandler.bind(this);
    this._commentsClickHandler = this._commentsClickHandler.bind(this);

    this._watchListClickHandler = this._watchListClickHandler.bind(this);
    this._asWatchedClickHandler = this._asWatchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  _posterClickHandler(evt) {
    evt.preventDefault();
    this._callback.posterClick();
  }

  _titleClickHandler(evt) {
    evt.preventDefault();
    this._callback.titleClick();
  }

  _commentsClickHandler(evt) {
    evt.preventDefault();
    this._callback.commentsClick();
  }

  _watchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchList();
  }

  _asWatchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.asWatched();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favorite();
  }

  setFilmPosterClickHandler(cb) {
    this._callback.posterClick = cb;
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._posterClickHandler);
  }
  setFilmTitleClickHandler(cb) {
    this._callback.titleClick = cb;
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._titleClickHandler);
  }

  setFilmCommentsClickHandler(cb) {
    this._callback.commentsClick = cb;
    this.getElement().querySelector(`.film-card__comments`)
      .addEventListener(`click`, this._commentsClickHandler);
  }

  setFilmWatchListClickHandler(cb) {
    this._callback.watchList = cb;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, this._watchListClickHandler);
  }

  setFilmAsWatchedClickHandler(cb) {
    this._callback.asWatched = cb;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, this._asWatchedClickHandler);
  }

  setFilmFavoriteClickHandler(cb) {
    this._callback.favorite = cb;
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, this._favoriteClickHandler);
  }

}
