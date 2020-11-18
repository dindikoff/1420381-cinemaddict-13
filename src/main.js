import {createUserTitlteTemplate} from './view/user-title.js';
import {createMainNavigationTemplate} from "./view/main-navigation.js";
import {createSortFilterTemplate} from "./view/sort-filter.js";
import {createFilmCardTemplate} from './view/film-card.js';
import {createFilmListTemplate} from './view/film-list.js';
import {createTopRatedFilmsTemplate} from './view/top-rated-list.js';
import {createMostCommentedListTemplate} from './view/most-commented-list.js';
import {createShowMoreButtonTemplate} from './view/show-more-button.js';
import {createFilmDetailsTemplate} from './view/film-details.js';

const BASIC_LIST_COUNT = 5;
const TOP_RATED_COUNT = 2;
const MOST_COMMENTED_COUNT = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
render(siteHeaderElement, createUserTitlteTemplate(), `beforeend`);
render(siteMainElement, createMainNavigationTemplate(), `beforeend`);
render(siteMainElement, createSortFilterTemplate(), `beforeend`);

render(siteMainElement, createFilmListTemplate(), `beforeend`);
const filmsBlock = document.querySelector(`.films`);
const filmListElement = filmsBlock.querySelector(`.films-list`);
const filmsListElementContainer = filmsBlock.querySelector(`.films-list__container`);
for (let i = 0; i < BASIC_LIST_COUNT; i++) {
  render(filmsListElementContainer, createFilmCardTemplate(), `beforeend`);
}

render(filmListElement, createShowMoreButtonTemplate(), `beforeend`);

render(filmsBlock, createTopRatedFilmsTemplate(), `beforeend`);
const topRatedFilmList = filmsBlock.querySelector(`.films-list:nth-child(2) .films-list__container`);
for (let i = 0; i < TOP_RATED_COUNT; i++) {
  render(topRatedFilmList, createFilmCardTemplate(), `beforeend`);
}

render(filmsBlock, createMostCommentedListTemplate(), `beforeend`);
const mostCommentedFilmList = filmsBlock.querySelector(`.films-list:nth-child(3) .films-list__container`);
for (let i = 0; i < MOST_COMMENTED_COUNT; i++) {
  render(mostCommentedFilmList, createFilmCardTemplate(), `beforeend`);
}

const bodyElement = document.querySelector(`body`);
render(bodyElement, createFilmDetailsTemplate(), `beforeend`);

