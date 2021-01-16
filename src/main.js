import Api from './api.js';
import BoardPresenter from './presenter/board.js';
import FilterPresenter from './presenter/filter.js';
import FilmsModel from './model/movies.js';
import FilterModel from './model/filter.js';
import CommentsModel from './model/comments.js';
import {remove, render, RenderPosition} from './utils/dom-utils.js';

import {MenuStats, UpdateType} from "./const";
import StatsView from "./view/site-menu";

const AUTHORIZATION = `Basic fsdf23fsddfsfdsf3fsdfsdfsdf5fgsdgdfgdHEs`;
const END_POINT = `https://13.ecmascript.pages.academy/cinemaddict/`;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatistic = document.querySelector(`.footer__statistics`);

let statsComponent = null;
const api = new Api(END_POINT, AUTHORIZATION);

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
    commentModel, api);

const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel, changeMenuState);

filterPresenter.init();
boardPresenter.init();


api.getFilms()
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
    footerStatistic.textContent = `${films.length} movies inside`;
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });

