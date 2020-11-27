import {createUserTitlteTemplate} from './view/user-title.js';
import {createMainNavigationTemplate} from "./view/main-navigation.js";
import {createSortFilterTemplate} from "./view/sort-filter.js";
import {createFilmCardTemplate} from './view/film-card.js';
import {createFilmListTemplate} from './view/film-list.js';
import {createTopRatedFilmsTemplate} from './view/top-rated-list.js';
import {createMostCommentedListTemplate} from './view/most-commented-list.js';
import {createShowMoreButtonTemplate} from './view/show-more-button.js';
import {createFilmDetailsTemplate} from './view/film-details.js';

import {generateFilm} from './mock/film.js';
import {generateFilter} from './mock/filter.js';

const FILM_LIST_COUNT = 20;
const FILM_LIST_COUNT_STEP = 5;
const TOP_RATED_COUNT = 2;
const MOST_COMMENTED_COUNT = 2;

const footerStatistic = document.querySelector(`.footer__statistics`);

const films = new Array(FILM_LIST_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);
const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
render(siteHeaderElement, createUserTitlteTemplate());
render(siteMainElement, createMainNavigationTemplate(filters));
render(siteMainElement, createSortFilterTemplate());

render(siteMainElement, createFilmListTemplate());
const filmsBlock = document.querySelector(`.films`);
const filmListElement = filmsBlock.querySelector(`.films-list`);
const filmsListElementContainer = filmsBlock.querySelector(`.films-list__container`);
for (let i = 1; i <= FILM_LIST_COUNT_STEP; i++) {
  render(filmsListElementContainer, createFilmCardTemplate(films[i]));
}

if (films.length > FILM_LIST_COUNT_STEP) {
  let renderFilmsCount = FILM_LIST_COUNT_STEP;
  render(filmListElement, createShowMoreButtonTemplate());
  const showMoreButton = document.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, () => {
    films.slice(renderFilmsCount, renderFilmsCount + FILM_LIST_COUNT_STEP)
      .forEach((film) => render(filmsListElementContainer, createFilmCardTemplate(film), `beforeend`));
    renderFilmsCount += FILM_LIST_COUNT_STEP;

    if (renderFilmsCount >= films.length) {
      showMoreButton.remove();
    }
  });
}

render(filmsBlock, createTopRatedFilmsTemplate());
const topRatedFilmList = filmsBlock.querySelector(`.films-list:nth-child(2) .films-list__container`);
for (let i = 0; i < TOP_RATED_COUNT; i++) {
  render(topRatedFilmList, createFilmCardTemplate(films[i]));
}

render(filmsBlock, createMostCommentedListTemplate());
const mostCommentedFilmList = filmsBlock.querySelector(`.films-list:nth-child(3) .films-list__container`);
for (let i = 0; i < MOST_COMMENTED_COUNT; i++) {
  render(mostCommentedFilmList, createFilmCardTemplate(films[i]));
}

const bodyElement = document.querySelector(`body`);
render(bodyElement, createFilmDetailsTemplate(films[0]));

footerStatistic.textContent = `${films.length} movies inside`;
