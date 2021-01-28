import AbstractView from './abstract.js';

const createFilmsContainer = () => {
  return (`
    <section class="films"></section>
  `).trim();
};

export default class FilmsContainer extends AbstractView {
  getTemplate() {
    return createFilmsContainer();
  }
}


