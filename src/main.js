import UserTitleView from './view/user-title.js';
import NavigationView from './view/main-navigation.js';
import SortView from './view/sort-filter.js';
import FilmListView from './view/film-list.js';
import FilmCardView from './view/film-card.js';
import ShowMoreButtonView from './view/show-more-button.js';
import FilmDetailsView from "./view/film-details.js";
import {render} from './utils.js';

import {generateFilm} from './mock/film.js';
import {generateFilter} from './mock/filter.js';


const FILM_LIST_COUNT = 20;
const FILM_LIST_COUNT_STEP = 5;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatistic = document.querySelector(`.footer__statistics`);

const films = new Array(FILM_LIST_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);

render(siteHeaderElement, new UserTitleView().getElement());
render(siteMainElement, new NavigationView(filters).getElement());
render(siteMainElement, new SortView().getElement());

const renderFilm = (filmListElement, film) => {
  const filmComponent = new FilmCardView(film);
  const filmDetails = new FilmDetailsView(film);

  const filmPoster = filmComponent.getElement().querySelector(`.film-card__poster`);
  const filmTitle = filmComponent.getElement().querySelector(`.film-card__title`);
  const filmComments = filmComponent.getElement().querySelector(`.film-card__comments`);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      onCloseModal();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const onShowModal = () => {
    const closeButton = filmDetails.getElement().querySelector(`.film-details__close-btn`);

    closeButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      onCloseModal();
    });

    document.body.classList.add(`hide-overflow`);

    render(document.querySelector(`body`), filmDetails.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const onCloseModal = () => {
    filmDetails.getElement().remove(filmDetails.getElement());
    filmDetails.removeElement();
    document.body.classList.remove(`hide-overflow`);
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  filmPoster.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    onShowModal();
  });

  filmTitle.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    onShowModal();
  });

  filmComments.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    onShowModal();
  });

  render(filmListElement, filmComponent.getElement());
};

const renderList = (filmsContainer, filmList) => {
  const filmsComponent = new FilmListView();
  render(filmsContainer, filmsComponent.getElement());

  const filmListElement = filmsComponent.getElement().querySelector(`.films-list`);
  const filmsListElementContainer = filmsComponent.getElement().querySelector(`.films-list__container`);

  for (let i = 1; i <= FILM_LIST_COUNT_STEP; i++) {
    renderFilm(filmsListElementContainer, filmList[i]);
  }

  if (films.length > FILM_LIST_COUNT_STEP) {
    let renderTemplateFilmsCount = FILM_LIST_COUNT_STEP;
    const showMoreButton = new ShowMoreButtonView();
    render(filmListElement, showMoreButton.getElement());

    showMoreButton.getElement().addEventListener(`click`, () => {
      films.slice(renderTemplateFilmsCount, renderTemplateFilmsCount + FILM_LIST_COUNT_STEP)
        .forEach((film) => renderFilm(filmsListElementContainer, film));
      renderTemplateFilmsCount += FILM_LIST_COUNT_STEP;

      if (renderTemplateFilmsCount >= films.length) {
        showMoreButton.getElement().remove();
        showMoreButton.removeElement();
      }
    });
  }
};


renderList(siteMainElement, films);

footerStatistic.textContent = `${films.length} movies inside`;
