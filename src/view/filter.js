import AbstractView from "./abstract.js";

const createMainNavigationItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;
  return (`
    <a href="#${name}" class="main-navigation__item ${type === currentFilterType ? `main-navigation__item--active` : ``}">${name}
    <span class="main-navigation__item-count">${count}</span></a>
    `);
};

const createMainNavigationTemplate = (filtersItem, currentFilterType) => {
  const mainNavigationItemTemplate = filtersItem.map((filter) => createMainNavigationItemTemplate(filter, currentFilterType)).join(``);

  return (`
    <nav class="main-navigation">
      <div class="main-navigation__items">
        ${mainNavigationItemTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>
  `).trim();
};

export default class FilterView extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createMainNavigationTemplate(this._filters, this._currentFilter);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.sortClick = callback;
    this.getElement().querySelectorAll(`.main-navigation__item`).forEach((navigationItem) => navigationItem.addEventListener(`click`, this._filterTypeChangeHandler));
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.sortClick(evt.target.firstChild.textContent.slice(0, -1).trim());
  }
}
