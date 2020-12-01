import {createElement} from "../utils/dom.js";

const createFilmListEmptyTemplate = () => {
  return (`
    <section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
    </section>
  `).trim();
};

export default class EmptyList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmListEmptyTemplate();
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


