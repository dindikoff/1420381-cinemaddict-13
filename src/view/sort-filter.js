import AbstractView from "./abstract.js";
import {SortType} from "../const.js";

const createSortFilterTemplate = () => {
  return (`
    <ul class="sort">
      <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.BY_DATE}">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.BY_RATING}">Sort by rating</a></li>
    </ul>
  `).trim();
};

export default class Sort extends AbstractView {
  constructor() {
    super();
    this._sortTypeChangeHandle = this._sortTypeChangeHandle.bind(this);
  }

  getTemplate() {
    return createSortFilterTemplate();
  }

  _sortTypeChangeHandle(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(cb) {
    this._callback.sortTypeChange = cb;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandle);
  }
}
