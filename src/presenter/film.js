import FilmCardView from "../view/film-card.js";
import FilmDetailsView from "../view/popup.js";

import {render, replace, remove, RenderPosition} from "../utils/dom-utils.js";
import {UserAction, UpdateType} from "../const.js";
import CommentsModel from "../model/comments";

const Mode = {
  CLOSED: `CLOSED`,
  OPENED: `OPENED`,
};

export default class Film {
  constructor(filmListContainer, changeData, changeMode, api) {
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._api = api;

    this._commentsModel = new CommentsModel();

    this._filmComponent = null;
    this._mode = Mode.CLOSED;

    this._handleOpenClick = this._handleOpenClick.bind(this);
    this._handleClose = this._handleClose.bind(this);

    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleAsWatchedListClick = this._handleAsWatchedListClick.bind(this);
    this._handleFavoriteListClick = this._handleFavoriteListClick.bind(this);
    this._handleUpdateComments = this._handleUpdateComments.bind(this);
    this._handleDeleteComment = this._handleDeleteComment.bind(this);
  }

  init(film) {
    this.film = film;
    const prevFilmComponent = this._filmComponent;
    const prevFilmDetails = this._popup;

    this._api.getComments(this.film)
      .then((comments) => {
        this._commentsModel.setComments(comments);
      })
      .catch(() => {
        this._commentsModel.setComments([]);
      })
      .then(() => {
        this.film.comments = this._commentsModel.getComments();
        this._popup = new FilmDetailsView(film);
        this._setPopUpHandlers();
      });

    this._filmComponent = new FilmCardView(film);
    this._filmComponent.setFilmPosterClickHandler(this._handleOpenClick);
    this._filmComponent.setFilmTitleClickHandler(this._handleOpenClick);
    this._filmComponent.setFilmCommentsClickHandler(this._handleOpenClick);

    this._filmComponent.setFilmWatchListClickHandler(this._handleWatchListClick);
    this._filmComponent.setFilmAsWatchedClickHandler(this._handleAsWatchedListClick);
    this._filmComponent.setFilmFavoriteClickHandler(this._handleFavoriteListClick);

    if (prevFilmComponent === null || prevFilmDetails === null) {
      render(this._filmListContainer, this._filmComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.CLOSED) {
      replace(this._filmComponent, prevFilmComponent);
    }

    if (this._mode === Mode.OPENED) {
      replace(this._filmComponent, prevFilmComponent);
      replace(this._popup, prevFilmDetails);
    }

    remove(prevFilmComponent);
    remove(prevFilmDetails);
  }

  destroy() {
    remove(this._filmComponent);
  }

  resetView() {
    if (this._mode !== Mode.CLOSED) {
      this._onCloseModal();
    }
  }

  _onCloseModal(update) {
    const isObjectChanged = (this.film.isFilmInWatchList !== update.isFilmInWatchList ||
      this.film.isFilmInAlreadyWatch !== update.isFilmInAlreadyWatch ||
      this.film.isFilmInFavorite !== update.isFilmInFavorite) ? true : ``;

    if (isObjectChanged) {
      this._changeData(
          UserAction.UPDATE,
          UpdateType.MAJOR,
          update
      );
    }

    this._popup.getElement().remove(this._popup.getElement());
    this._popup.removeElement();
    this._popup.removeEscapePressHandler();
    document.body.classList.remove(`hide-overflow`);

    this._mode = Mode.CLOSED;
  }

  _handleClose(update) {
    this._onCloseModal(update);
  }

  _onShowModal() {
    document.body.classList.add(`hide-overflow`);
    render(document.body, this._popup, RenderPosition.BEFOREEND);
    this._changeMode();
    this._mode = Mode.OPENED;
  }

  _handleOpenClick() {
    this._onShowModal();
  }

  _setPopUpHandlers() {
    this._popup.setEscapePressHandler(this._handleClose);
    this._popup.setCloseCrossClickHandler(this._handleClose);
    this._popup.setDeleteComment(this._handleDeleteComment);
    this._popup.setSubmitCommentHandler(this._handleUpdateComments);
  }

  _handleWatchListClick() {
    this._changeData(
        UserAction.UPDATE,
        UpdateType.MAJOR,
        Object.assign(
            {},
            this.film,
            {isFilmInWatchList: !this.film.isFilmInWatchList}
        )
    );
  }

  _handleAsWatchedListClick() {
    this._changeData(
        UserAction.UPDATE,
        UpdateType.MAJOR,
        Object.assign(
            {},
            this.film,
            {isFilmInAlreadyWatch: !this.film.isFilmInAlreadyWatch}
        )
    );
  }

  _handleFavoriteListClick() {
    this._changeData(
        UserAction.UPDATE,
        UpdateType.MAJOR,
        Object.assign(
            {},
            this.film,
            {isFilmInFavorite: !this.film.isFilmInFavorite}
        )
    );
  }

  _handleUpdateComments(comment, scrollPosition) {
  // В след задании будет обновление комментареви.
  // const serverComment = generateComment();
  // const newComment = Object.assign(
  //     {},
  //     serverComment,
  //     comment
  // );

    // this._commentsModel.addComment(this._commentsModel.getComments(), newComment);
    this.film.comments = this._commentsModel.getComments();

    this._changeData(
        UserAction.UPDATE,
        UpdateType.MINOR,
        this.film
    );

    this._popup.getElement().scroll(0, scrollPosition);
  }

  _handleDeleteComment(commentId, scrollPosition) {
    this.film.comments = this._commentsModel.getComments();
    this._commentsModel.deleteComment(this.film.comments, commentId);

    this._changeData(
        UserAction.UPDATE,
        UpdateType.MINOR,
        this.film
    );

    this._popup.getElement().scroll(0, scrollPosition);
  }
}
