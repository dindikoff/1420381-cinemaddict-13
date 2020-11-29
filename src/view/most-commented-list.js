import {createElement} from "../utils.js";

const createMostCommentedListTemplate = () => {
  return (`<section class="films-list films-list--extra">
      <h2 class="films-list__title">Most Commented</h2>
      <div class="films-list__container"></div>
    </section>`);
};

export default class MostCommentedList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMostCommentedListTemplate();
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
