import BoardPresenter from './presenter/board.js';
import FilterPresenter from './presenter/filter.js';
import FilmsModel from './model/movies.js';
import FilterModel from './model/filter.js';
import {remove, render, RenderPosition} from './utils/dom.js';

import {generateFilm} from './mock/film.js';
import {MenuStats} from "./const";
import StatsView from "./view/site-menu";

const FILM_LIST_COUNT = 20;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatistic = document.querySelector(`.footer__statistics`);

let statsComponent = null;
const films = new Array(FILM_LIST_COUNT).fill().map(generateFilm);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const filterModel = new FilterModel();

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

const boardPresenter = new BoardPresenter(siteMainElement, siteHeaderElement, filmsModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel, changeMenuState);

filterPresenter.init();
boardPresenter.init();

footerStatistic.textContent = `${films.length} movies inside`;

