import AbstractView from "./abstract.js";

const createMostCommentedListTemplate = () => {
  return (`
    <section class="films-list films-list--extra">
      <h2 class="films-list__title">Most Commented</h2>
      <div class="films-list__container"></div>
    </section>
  `).trim();
};

export default class MostCommentedList extends AbstractView {
  getTemplate() {
    return createMostCommentedListTemplate();
  }
}
