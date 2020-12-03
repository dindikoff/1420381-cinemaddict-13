import UserTitleView from './view/user-title.js';
import NavigationView from './view/main-navigation.js';
import SortView from './view/sort-filter.js';
import FilmsView from './view/films.js';
import FilmListView from './view/film-list.js';
import EmptyList from './view/film-lsit-empty.js';
import FilmCardView from './view/film-card.js';
import ShowMoreButtonView from './view/show-more-button.js';
import FilmDetailsView from "./view/film-details.js";
import {isEscape} from './utils/common.js';
import {render, RenderPosition} from './utils/dom.js';

import {generateFilm} from './mock/film.js';
import {generateFilter} from './mock/filter.js';

const FILM_LIST_COUNT = 20;
const FILM_LIST_COUNT_STEP = 5;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatistic = document.querySelector(`.footer__statistics`);

const films = new Array(FILM_LIST_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);


const renderFilm = (filmListElement, film) => {
  const filmComponent = new FilmCardView(film);
  const filmDetails = new FilmDetailsView(film);

  const onEscKeyDown = (evt) => {
    if (isEscape(evt)) {
      onCloseModal(evt);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const onShowModal = () => {
    filmDetails.setCloseClickHandler(onCloseModal);
    document.addEventListener(`keydown`, onEscKeyDown);
    document.body.classList.add(`hide-overflow`);

    render(document.body, filmDetails.getElement());
  };

  const onCloseModal = () => {
    filmDetails.getElement().remove(filmDetails.getElement());
    filmDetails.removeElement();
    document.body.classList.remove(`hide-overflow`);
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  filmComponent.setFilmPosterClickHandler(onShowModal);
  filmComponent.setFilmTitleClickHandler(onShowModal);
  filmComponent.setFilmCommentsClickHandler(onShowModal);

  render(filmListElement, filmComponent.getElement());
};

const renderList = (filmsContainer, filmList) => {
  const filmsComponent = new FilmsView();
  const filmsListComponent = new FilmListView();
  render(filmsContainer, filmsComponent.getElement());

  if (filmList.length === 0) {
    render(filmsComponent.getElement(), new EmptyList().getElement());
  } else {
    render(siteMainElement, new SortView().getElement(), RenderPosition.AFTERBEGIN);
    render(filmsComponent.getElement(), filmsListComponent.getElement());
    const filmsListElementContainer = filmsListComponent.getElement().querySelector(`.films-list__container`);

    for (let i = 1; i <= FILM_LIST_COUNT_STEP; i++) {
      renderFilm(filmsListElementContainer, filmList[i]);
    }

    if (films.length > FILM_LIST_COUNT_STEP) {
      let renderTemplateFilmsCount = FILM_LIST_COUNT_STEP;
      const showMoreButton = new ShowMoreButtonView();
      render(filmsListComponent.getElement(), showMoreButton.getElement());

      showMoreButton.setClickHandler(() => {
        films.slice(renderTemplateFilmsCount, renderTemplateFilmsCount + FILM_LIST_COUNT_STEP)
          .forEach((film) => renderFilm(filmsListElementContainer, film));
        renderTemplateFilmsCount += FILM_LIST_COUNT_STEP;

        if (renderTemplateFilmsCount >= films.length) {
          showMoreButton.getElement().remove();
          showMoreButton.removeElement();
        }
      });
    }
  }
};

render(siteHeaderElement, new UserTitleView().getElement());
renderList(siteMainElement, films);
render(siteMainElement, new NavigationView(filters).getElement(), RenderPosition.AFTERBEGIN);

footerStatistic.textContent = `${films.length} movies inside`;
