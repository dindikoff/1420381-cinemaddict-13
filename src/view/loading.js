import AbstractView from "./abstract.js";

const createLoadingView = () => {
  return (`
    <section class="films">
    <section class="films-list">
      <h2 class="films-list__title">Loading...</h2>
    </section>
  </section>
  `).trim();
};

export default class LoadingView extends AbstractView {
  getTemplate() {
    return createLoadingView();
  }
}


