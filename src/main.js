import Api from './api/api.js';
import BoardPresenter from './presenter/board.js';
import FilterPresenter from './presenter/filter.js';
import FilmsModel from './model/movies.js';
import FilterModel from './model/filter.js';
import CommentsModel from './model/comments.js';
import {remove, render, RenderPosition} from './utils/dom-utils.js';
import {toast} from './utils/toast/toast.js';

import Store from './api/store.js';
import Provider from './api/provider.js';


import {MenuStats, UpdateType} from './const.js';
import StatsView from './view/stats.js';

const AUTHORIZATION = `Basic fsdf23fsddfsfdsf3fsdfsdfsdf5fgsdgdfgdHEs`;
const END_POINT = `https://13.ecmascript.pages.academy/cinemaddict/`;
const STORE_PREFIX = `cinema`;
const STORE_VER = `v13`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatistic = document.querySelector(`.footer__statistics`);

let statsComponent = null;
const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const filmsModel = new FilmsModel();
const filterModel = new FilterModel();
const commentModel = new CommentsModel();

const changeMenuState = (action) => {
  switch (action) {
    case MenuStats.MOVIES:
      boardPresenter.destroy();
      boardPresenter.init();
      remove(statsComponent);
      break;
    case MenuStats.STATISTICS:
      boardPresenter.destroy();
      statsComponent = new StatsView(filmsModel.getFilms());
      render(siteMainElement, statsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

const boardPresenter = new BoardPresenter(
    siteMainElement, siteHeaderElement,
    filmsModel, filterModel,
    commentModel, apiWithProvider);

const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel, changeMenuState);

filterPresenter.init();
boardPresenter.init();


apiWithProvider.getFilms()
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
    footerStatistic.textContent = `${films.length} movies inside`;
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
  toast(`Lost connection`);
});
