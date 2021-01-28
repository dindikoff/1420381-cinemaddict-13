import AbstractView from './abstract.js';

const createFilmListEmptyTemplate = () => {
  return (`
    <section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
    </section>
  `).trim();
};

export default class EmptyList extends AbstractView {
  getTemplate() {
    return createFilmListEmptyTemplate();
  }
}


