import FilmsView from '../view/films-container.js';
import FilmListView from '../view/film-list.js';
import EmptyList from '../view/empty-list.js';
import LoadingView from '../view/loading.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import SortView from '../view/sort-filter.js';
import TopRatedListView from '../view/top-rated-list.js';
import MostCommentedList from '../view/most-commented-list.js';
import FilmPresenter from './film.js';

import {render, remove, RenderPosition} from '../utils/dom-utils.js';
import {sortByYear, sortByRating, getTopRatedFilms, getMostCommented} from '../utils/film.js';
import {FeatureBlock, SortType, UpdateType, UserAction} from "../const.js";
import {filter} from '../utils/filter.js';
import UserTitle from '../view/user-title.js';

const FILM_LIST_COUNT_STEP = 5;

export default class Board {
  constructor(boardContainer, siteHeaderContainer, filmsModel, filterModel, commentModel, api) {
    this._boardContainer = boardContainer;
    this._siteHeaderContainer = siteHeaderContainer;
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._renderFilmsCount = FILM_LIST_COUNT_STEP;
    this._filmPresenter = {};
    this._commentPresenter = {};
    this._ratedListPresenter = {};
    this._topCommentedList = null;
    this._topRatedListComponent = null;

    this._api = api;

    this._sortComponent = null;
    this._loadMoreButtonComponent = null;
    this._isLoading = true;

    this._profileComponent = null;
    this._currentSortType = SortType.DEFAULT;

    this._filmComponent = new FilmsView();
    this._filmListComponent = new FilmListView();
    this._emptyListComponent = new EmptyList();
    this._loadingComponent = new LoadingView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleLoadMoreButton = this._handleLoadMoreButton.bind(this);
    this._handleModelChange = this._handleModelChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._renderBoard();
  }

  destroy() {
    this._clearFilmList({resetRenderedFilmsCount: true});
    remove(this._filmListComponent);
    remove(this._filmComponent);
    remove(this._sortComponent);
    remove(this._profileComponent);
    remove(this._topRatedListComponent);
    remove(this._topCommentedList);

    this._filmsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  _getFilms() {
    const filterType = this._filterModel.getActive();
    const movies = this._filmsModel.getFilms();
    const filteredMovies = filter[filterType](movies);

    switch (this._currentSortType) {
      case SortType.BY_DATE:
        return filteredMovies.slice().sort(sortByYear);
      case SortType.BY_RATING:
        return filteredMovies.slice().sort(sortByRating);
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

  _renderUserProfile() {
    if (this._profileComponent !== null) {
      this._profileComponent = null;
    }

    this._profileComponent = new UserTitle(this._filmsModel.getFilms());
    render(this._siteHeaderContainer, this._profileComponent, RenderPosition.BEFOREEND);

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

    this._renderFilms(films, this._filmListComponent, this._filmPresenter);
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
    Object.values(this._filmPresenter).forEach((presenter) => {
      presenter.destroy();
    });

    this._filmPresenter = {};

    remove(this._sortComponent);
    remove(this._emptyListComponent);
    remove(this._loadMoreButtonComponent);
    remove(this._profileComponent);
    remove(this._loadingComponent);
    remove(this._topCommentedList);
    remove(this._topRatedListComponent);

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
      case UserAction.UPDATE_FILM:
        this._api.updateFilm(update)
          .then((response) => {
            this._filmsModel.updateFilm(updateType, response);
          });
        break;
    }
  }

  _updatePresenters(data) {
    if (this._filmPresenter[data.id]) {
      this._filmPresenter[data.id].init(data);
    }

    if (this._commentPresenter[data.id]) {
      this._commentPresenter[data.id].init(data);
    }

    if (this._ratedListPresenter[data.id]) {
      this._ratedListPresenter[data.id].init(data);
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.MINOR:
        this._updatePresenters(data);
        break;
      case UpdateType.MAJOR:
        this._clearFilmList({resetRenderedFilmsCount: false, resetSortType: false});
        this._renderBoard();
        break;
      case UpdateType.GRAND:
        this._clearFilmList({resetRenderedFilmsCount: true, resetSortType: true});
        this._renderBoard();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderBoard();
        break;
    }
  }

  _renderLoading() {
    render(this._boardContainer, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _renderFilm(container, film, presenter) {
    const filmPresenter = new FilmPresenter(container, this._handleViewAction, this._handleModelChange, this._api);
    filmPresenter.init(film);

    presenter[film.id] = filmPresenter;
  }

  _renderFilms(films, component, presenter) {
    const filmsListElementContainer = component.getElement().querySelector(`.films-list__container`);
    films.forEach((film) => this._renderFilm(filmsListElementContainer, film, presenter));
  }

  _renderBoard() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const films = this._getFilms();
    const filmsCount = this._getFilms().length;

    if (filmsCount === 0) {
      this._renderEmptyList();
      return;
    }

    this._renderSort();
    this._renderFilms(films.slice(0, Math.min(filmsCount, this._renderFilmsCount)), this._filmListComponent, this._filmPresenter);

    if (filmsCount > this._renderFilmsCount) {
      this._renderLoadMoreButton();
    }

    this._renderUserProfile();
    render(this._boardContainer, this._filmComponent, RenderPosition.BEFOREEND);
    render(this._filmComponent, this._filmListComponent, RenderPosition.BEFOREEND);
    this._renderTopList(films);
    this._renderTopCommentList(films);
  }

  _renderFeatureBlock(films, container, presenter) {
    if (films.length > 0) {
      render(this._filmComponent, container, RenderPosition.BEFOREEND);
      this._renderFilms(films, container, presenter);
    }
  }

  _renderTopList(films) {
    if (this._topRatedListComponent !== null) {
      this._topRatedListComponent = null;
    }

    this._topRatedListComponent = new TopRatedListView();
    this._renderFeatureBlock(
        getTopRatedFilms(films, FeatureBlock.RATING.SIZE),
        this._topRatedListComponent,
        this._ratedListPresenter
    );
  }

  _renderTopCommentList(films) {
    if (this._topCommentedList !== null) {
      this._topCommentedList = null;
    }

    this._topCommentedList = new MostCommentedList();

    this._renderFeatureBlock(
        getMostCommented(films, FeatureBlock.COMMENT.SIZE),
        this._topCommentedList,
        this._commentPresenter
    );
  }
}
