import UserTitleView from './view/user-title.js';
import BoardPresenter from './presenter/board.js';
import {render, RenderPosition} from './utils/dom.js';

import {generateFilm} from './mock/film.js';
import {generateFilter} from './mock/filter.js';

const FILM_LIST_COUNT = 20;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatistic = document.querySelector(`.footer__statistics`);

const films = new Array(FILM_LIST_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);

const boardPresenter = new BoardPresenter(siteMainElement);
render(siteHeaderElement, new UserTitleView(), RenderPosition.BEFOREEND);
boardPresenter.init(films, filters);


footerStatistic.textContent = `${films.length} movies inside`;
