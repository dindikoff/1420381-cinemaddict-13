import UserTitleView from './view/user-title.js';
import BoardPresenter from './presenter/board.js';
import FilterPresenter from './presenter/filter.js';
import FilmsModel from './model/movies.js';
import FilterModel from './model/filter.js';
import {render, RenderPosition} from './utils/dom.js';

import {generateFilm} from './mock/film.js';


const FILM_LIST_COUNT = 12;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatistic = document.querySelector(`.footer__statistics`);

const films = new Array(FILM_LIST_COUNT).fill().map(generateFilm);

const filmsModel = new FilmsModel();
filmsModel.setTasks(films);

const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter(siteMainElement, filmsModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);

render(siteHeaderElement, new UserTitleView(), RenderPosition.BEFOREEND);

filterPresenter.init();
boardPresenter.init();

footerStatistic.textContent = `${films.length} movies inside`;
