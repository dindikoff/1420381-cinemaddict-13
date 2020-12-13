import FilmCardView from "../view/film-card.js";
import FilmDetailsView from "../view/film-details.js";

import {render, replace, remove, RenderPosition} from "../utils/dom.js";
import {isEscape} from "../utils/common.js";

const Mode = {
  CLOSED: `CLOSED`,
  OPENED: `OPENED`,
};

export default class Film {
  constructor(filmListContainer, changeData, changeMode) {
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmComponent = null;
    this._prevFilmDetails = null;
    this._mode = Mode.CLOSED;

    this._handleOpenClick = this._handleOpenClick.bind(this);
    this._handleClose = this._handleClose.bind(this);
    this._onEscKeyDownHandler = this._onEscKeyDownHandler.bind(this);

    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleAsWatchedListClick = this._handleAsWatchedListClick.bind(this);
    this._handleFavoriteListClick = this._handleFavoriteListClick.bind(this);
  }

  init(film) {
    this.film = film;
    const prevFilmComponent = this._filmComponent;
    const prevFilmDetails = this._filmDetails;

    this._filmComponent = new FilmCardView(film);
    this._filmDetails = new FilmDetailsView(film);

    this._filmComponent.setFilmPosterClickHandler(this._handleOpenClick);
    this._filmComponent.setFilmTitleClickHandler(this._handleOpenClick);
    this._filmComponent.setFilmCommentsClickHandler(this._handleOpenClick);

    this._filmComponent.setFilmWatchListClickHandler(this._handleWatchListClick);
    this._filmComponent.setFilmAsWatchedClickHandler(this._handleAsWatchedListClick);
    this._filmComponent.setFilmFavoriteClickHandler(this._handleFavoriteListClick);

    this._filmDetails.setFilmWatchListClickHandler(this._handleWatchListClick);
    this._filmDetails.setFilmAsWatchedClickHandler(this._handleAsWatchedListClick);
    this._filmDetails.setFilmFavoriteClickHandler(this._handleFavoriteListClick);

    if (prevFilmComponent === null || prevFilmDetails === null) {
      render(this._filmListContainer, this._filmComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._filmListContainer.contains(prevFilmComponent.getElement())) {
      replace(this._filmComponent, prevFilmComponent);
    }

    if (this._mode === Mode.OPENED) {
      this._onCloseModal();
      this._onShowModal();
    }

    remove(prevFilmComponent);
    remove(prevFilmDetails);
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._prevFilmDetails);
  }

  resetView() {
    if (this._mode !== Mode.CLOSED) {
      this._onCloseModal();
    }
  }

  _onCloseModal() {
    this._filmDetails.getElement().remove(this._filmDetails.getElement());
    this._filmDetails.removeElement();
    document.body.classList.remove(`hide-overflow`);
    document.removeEventListener(`keydown`, this._onEscKeyDownHandler);

    this._mode = Mode.CLOSED;
  }

  _onShowModal() {
    this._filmDetails.setCloseClickHandler(this._handleClose);
    document.addEventListener(`keydown`, this._onEscKeyDownHandler);
    document.body.classList.add(`hide-overflow`);

    render(document.body, this._filmDetails, RenderPosition.BEFOREEND);

    this._changeMode();
    this._mode = Mode.OPENED;
  }

  _handleOpenClick() {
    this._onShowModal();
  }

  _handleClose() {
    this._onCloseModal();
  }

  _onEscKeyDownHandler(evt) {
    if (isEscape(evt)) {
      this._onCloseModal();
      document.removeEventListener(`keydown`, this._onEscKeyDownHandler);
    }
  }

  _handleWatchListClick() {
    this._changeData(
        Object.assign(
            {},
            this.film,
            {isFilmInWatchList: !this.film.isFilmInWatchList}
        )
    );
  }

  _handleAsWatchedListClick() {
    this._changeData(
        Object.assign(
            {},
            this.film,
            {isFilmInHistory: !this.film.isFilmInHistory}
        )
    );
  }

  _handleFavoriteListClick() {
    this._changeData(
        Object.assign(
            {},
            this.film,
            {isFilmInFavorite: !this.film.isFilmInFavorite}
        )
    );
  }
}
