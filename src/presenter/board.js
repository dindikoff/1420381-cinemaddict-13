import FilmsView from '../view/films.js';
import FilmListView from '../view/film-list.js';
import EmptyList from '../view/film-list-empty.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import SortView from '../view/sort-filter.js';
import FilmPresenter from './film.js';
import NavigationView from '../view/main-navigation.js';

import {render, remove, RenderPosition} from '../utils/dom.js';
import {updateItem} from "../utils/common.js";
import {sortByYear, sortByRating} from "../utils/film.js";
import {SortType} from "../const.js";

const FILM_LIST_COUNT_STEP = 5;

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._renderFilmsCount = FILM_LIST_COUNT_STEP;
    this._filmPresenter = {};

    this._currentSortType = SortType.DEFAULT;

    this._filmComponent = new FilmsView();
    this._filmListComponent = new FilmListView();
    this._emptyListComponent = new EmptyList();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleLoadMoreButton = this._handleLoadMoreButton.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(filmList, filters) {
    this._filmList = filmList.slice();
    this._filters = filters;

    this._navigationComponent = new NavigationView(this._filters);
    this._sortComponent = new SortView(this._currentSortType);

    this._sourcedBoardFilms = filmList.slice();
    this._renderBoard();
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilms(sortType);
    this._clearFilmList();
    this._renderBoard();
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.BY_DATE:
        this._filmList = this._sourcedBoardFilms.slice();
        this._filmList.sort(sortByYear);
        break;
      case SortType.BY_RATING:
        this._filmList = this._sourcedBoardFilms.slice();
        this._filmList.sort(sortByRating);
        break;
      default:
        this._filmList = this._sourcedBoardFilms.slice();
    }

    this._currentSortType = sortType;
  }

  _renderSort() {
    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
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

  _renderNavigation() {
    render(this._boardContainer, this._navigationComponent, RenderPosition.BEFOREEND);
  }

  _renderBoard() {
    if (this._filmList.length === 0) {
      this._renderEmptyList();
      return;
    }

    this._renderFilmList();
    this._renderNavigation();
    this._renderSort();

    render(this._boardContainer, this._filmComponent, RenderPosition.BEFOREEND);
    render(this._filmComponent, this._filmListComponent, RenderPosition.BEFOREEND);

  }
}
