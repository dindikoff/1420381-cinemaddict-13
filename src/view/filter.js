import AbstractView from './abstract.js';
import {MenuStats} from '../const';

const createMainNavigationItemTemplate = (filter, currentFilterType, currentStatusPage) => {
  const {type, name, count} = filter;
  return (`
    <a href="#${name}" class="main-navigation__item ${type === currentFilterType && currentStatusPage === MenuStats.MOVIES ? `main-navigation__item--active` : ``}">${name}
    <span class="main-navigation__item-count">${count}</span></a>
    `);
};

const createMainNavigationTemplate = (filtersItem, currentFilterType, currentStatusPage) => {
  const mainNavigationItemTemplate = filtersItem.map((filter) => createMainNavigationItemTemplate(filter, currentFilterType, currentStatusPage)).join(``);

  return (`
    <nav class="main-navigation">
      <div class="main-navigation__items">
        ${mainNavigationItemTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional ${currentStatusPage === MenuStats.STATISTICS ? `main-navigation__additional--active` : ``}">Stats</a>
    </nav>
  `).trim();
};

export default class FilterView extends AbstractView {
  constructor(filters, currentFilterType, currentStatusPage) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;
    this._currentStatusPage = currentStatusPage;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this._statsButtonClickHandler = this._statsButtonClickHandler.bind(this);
  }

  getTemplate() {
    return createMainNavigationTemplate(this._filters, this._currentFilter, this._currentStatusPage);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.sortClick = callback;
    this.getElement().querySelectorAll(`.main-navigation__item`).forEach((navigationItem) => navigationItem.addEventListener(`click`, this._filterTypeChangeHandler));
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.sortClick(evt.target.firstChild.textContent.slice(0, -1).trim());
  }

  setStatsButtonClickHandler(callback) {
    this._callback.openStats = callback;
    this.getElement().querySelector(`.main-navigation__additional`).addEventListener(`click`, this._statsButtonClickHandler);
  }

  _statsButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.openStats(evt);
  }
}
