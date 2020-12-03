import AbstractView from "./abstract.js";

const createFilmCardTemplate = (film) => {
  const SHORT_DESCRIPTION_MAX_LETTERS = 140;

  const {
    title, rating,
    year, duration,
    genre, poster,
    description, comments,
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
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genre[0]}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${generateShortDescriptionTemplate()}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <div class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite" type="button">Mark as favorite</button>
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
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._commentsClickHandler);
  }

}
