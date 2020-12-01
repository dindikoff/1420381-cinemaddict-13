import {createElement} from "../utils/dom.js";

const createMainNavigationItemTemplate = ({name, count}) => {
  return (`
    <a href="#${name}" class="main-navigation__item">${name}
    <span class="main-navigation__item-count">${count}</span></a>
    `);
};


const createMainNavigationTemplate = (filtersItem) => {
  const mainNavigationItemTemplate = filtersItem.map(createMainNavigationItemTemplate).join(``);

  return (`
    <nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item">All movies</a>
        ${mainNavigationItemTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>
  `).trim();
};

export default class Navigation {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createMainNavigationTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
