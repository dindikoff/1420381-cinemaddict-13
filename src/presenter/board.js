import FilmsView from '../view/films.js';
import FilmListView from '../view/film-list.js';
import EmptyList from '../view/film-list-empty.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import SortView from '../view/sort-filter.js';
import FilmPresenter from './film.js';

import {render, remove, RenderPosition} from '../utils/dom.js';
import {updateItem} from "../utils/common.js";

const FILM_LIST_COUNT_STEP = 5;

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._renderFilmsCount = FILM_LIST_COUNT_STEP;
    this._filmPresenter = {};

    this._filmComponent = new FilmsView();
    this._filmListComponent = new FilmListView();
    this._emptyListComponent = new EmptyList();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._sortComponent = new SortView();

    this._handleLoadMoreButton = this._handleLoadMoreButton.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(filmList) {
    this._filmList = filmList.slice();
    render(this._boardContainer, this._filmComponent, RenderPosition.BEFOREEND);
    render(this._filmComponent, this._filmListComponent, RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  _renderSort() {
    render(this._boardContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderEmptyList() {
    render(this._filmComponent, this._emptyListComponent, RenderPosition.BEFOREEND);
  }

  _renderLoadMoreButton() {
    render(this._filmListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    this._showMoreButtonComponent.setClickHandler(this._handleLoadMoreButton);
  }

  _handleLoadMoreButton() {
    this._renderFilms(this._renderFilmsCount, this._renderFilmsCount + FILM_LIST_COUNT_STEP);
    this._renderFilmsCount += FILM_LIST_COUNT_STEP;

    if (this._renderFilmsCount >= this._filmList.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _clearFilmList() {
    Object.values(this._filmPresenter).forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderFilmsCount = FILM_LIST_COUNT_STEP;
    remove(this._showMoreButtonComponent);
  }

  _handleFilmChange(updateFilm) {
    this._filmList = updateItem(this._filmList, updateFilm);
    this._filmPresenter[updateFilm.id].init(updateFilm);
  }

  _renderFilm(film) {
    const filmsListElementContainer = this._filmListComponent.getElement().querySelector(`.films-list__container`);
    const filmPresenter = new FilmPresenter(filmsListElementContainer, this._handleFilmChange, this._handleModeChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderFilms(from, to) {
    this._filmList.slice(from, to).forEach((film) => this._renderFilm(film));
  }

  _renderFilmList() {
    this._renderFilms(0, Math.min(this._filmList.length, FILM_LIST_COUNT_STEP));

    if (this._filmList.length > FILM_LIST_COUNT_STEP) {
      this._renderLoadMoreButton();
    }
  }

  _renderBoard() {
    if (this._filmList.length === 0) {
      this._renderEmptyList();
      return;
    }

    this._renderSort();
    this._renderFilmList();
  }
}
