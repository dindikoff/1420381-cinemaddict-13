import FilmsView from '../view/films.js';
import FilmListView from '../view/film-list.js';
import EmptyList from '../view/film-list-empty.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import SortView from '../view/sort-filter.js';
import FilmPresenter from './film.js';

import {render, remove, RenderPosition} from '../utils/dom.js';
import {sortByYear, sortByRating} from "../utils/film.js";
import {SortType, UpdateType, UserAction} from "../const.js";
import {filter} from '../utils/filter.js';

const FILM_LIST_COUNT_STEP = 5;

export default class Board {
  constructor(boardContainer, filmsModel, filterModel) {
    this._boardContainer = boardContainer;
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._renderFilmsCount = FILM_LIST_COUNT_STEP;
    this._filmPresenter = {};

    this._sortComponent = null;
    this._loadMoreButtonComponent = null;

    this._currentSortType = SortType.DEFAULT;

    this._filmComponent = new FilmsView();
    this._filmListComponent = new FilmListView();
    this._emptyListComponent = new EmptyList();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleLoadMoreButton = this._handleLoadMoreButton.bind(this);
    this._handleModelChange = this._handleModelChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderBoard();
  }

  _getFilms() {
    const filterType = this._filterModel.getFilter();
    const movies = this._filmsModel.getFilms();
    const filteredMovies = filter[filterType](movies);

    switch (this._currentSortType) {
      case SortType.BY_DATE:
        return filteredMovies.sort(sortByYear);
      case SortType.BY_RATING:
        return filteredMovies.sort(sortByRating);
    }

    return filteredMovies;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearFilmList({resetRenderedFilmsCount: true});
    this._renderBoard();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);

  }

  _renderEmptyList() {
    render(this._filmComponent, this._emptyListComponent, RenderPosition.BEFOREEND);
  }

  _renderLoadMoreButton() {
    if (this._loadMoreButtonComponent !== null) {
      this._loadMoreButtonComponent = null;
    }

    this._loadMoreButtonComponent = new ShowMoreButtonView();
    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButton);
    render(this._filmListComponent, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

  }

  _handleLoadMoreButton() {
    const filmsCount = this._getFilms().length;
    const newRenderFilmsCount = Math.min(filmsCount, this._renderFilmsCount + FILM_LIST_COUNT_STEP);
    const films = this._getFilms().slice(this._renderFilmsCount, newRenderFilmsCount);

    this._renderFilms(films);
    this._renderFilmsCount = newRenderFilmsCount;

    if (this._renderFilmsCount >= filmsCount) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _handleModelChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _clearFilmList({resetRenderedFilmsCount = false, resetSortType = false} = {}) {
    const filmsCount = this._getFilms().length;
    Object.values(this._filmPresenter).forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};

    remove(this._sortComponent);
    remove(this._emptyListComponent);
    remove(this._loadMoreButtonComponent);

    if (resetRenderedFilmsCount) {
      this._renderFilmsCount = FILM_LIST_COUNT_STEP;
    } else {
      this._renderFilmsCount = Math.min(filmsCount, this._renderFilmsCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE:
        this._filmsModel.updateFilm(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.MINOR:
        this._filmPresenter[data.id].init(data);
        break;
      case UpdateType.MAJOR:
        this._clearFilmList({resetRenderedFilmsCount: true, resetSortType: true});
        this._renderBoard();
        break;
    }
  }

  _renderFilm(film) {
    const filmsListElementContainer = this._filmListComponent.getElement().querySelector(`.films-list__container`);
    const filmPresenter = new FilmPresenter(filmsListElementContainer, this._handleViewAction, this._handleModelChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilm(film));
  }

  _renderBoard() {
    const films = this._getFilms();
    const filmsCount = this._getFilms().length;

    if (filmsCount === 0) {
      this._renderEmptyList();
      return;
    }

    this._renderSort();
    this._renderFilms(films.slice(0, Math.min(filmsCount, this._renderFilmsCount)));

    if (filmsCount > this._renderFilmsCount) {
      this._renderLoadMoreButton();
    }

    render(this._boardContainer, this._filmComponent, RenderPosition.BEFOREEND);
    render(this._filmComponent, this._filmListComponent, RenderPosition.BEFOREEND);

  }
}
