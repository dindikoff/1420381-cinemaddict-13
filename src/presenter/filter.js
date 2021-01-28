import FilterView from '../view/filter.js';
import {remove, render, RenderPosition, replace} from '../utils/dom-utils.js';
import {FilterType, MenuStats, UpdateType} from '../const.js';
import {filter} from '../utils/filter.js';

export default class Filter {
  constructor(filterContainer, filterModel, filmsModel, changeMenuState) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._changeMenuState = changeMenuState;
    this._currentFilter = null;
    this._currentStatusPage = MenuStats.MOVIES;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._handleStatsPage = this._handleStatsPage.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getActive();

    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters, this._currentFilter, this._currentStatusPage);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);
    this._filterComponent.setStatsButtonClickHandler(this._handleStatsPage);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType && this._currentStatusPage === MenuStats.MOVIES) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
    this._changeMenuState(MenuStats.MOVIES);
    this._currentStatusPage = MenuStats.MOVIES;
    this.init();
  }

  _handleStatsPage() {
    this._changeMenuState(MenuStats.STATISTICS);
    this._currentStatusPage = MenuStats.STATISTICS;
    this.init();
  }

  _getFilters() {
    const films = this._filmsModel.getFilms();

    return [
      {
        type: FilterType.ALL,
        name: `All movies`,
        count: filter[FilterType.ALL](films).length
      },
      {
        type: FilterType.WATCHLIST,
        name: `Watchlist`,
        count: filter[FilterType.WATCHLIST](films).length
      },
      {
        type: FilterType.HISTORY,
        name: `History`,
        count: filter[FilterType.HISTORY](films).length
      },
      {
        type: FilterType.FAVORITE,
        name: `Favorites`,
        count: filter[FilterType.FAVORITE](films).length
      }
    ];
  }
}
