import AbstractView from './abstract.js';
import {getUserRank} from "../utils/title";

const createUserTitleTemplate = (films) => {
  if (getUserRank(films) === UserTitle.NEW) {
    return ``;
  } else {
    return (`
    <section class="header__profile profile">
      <p class="profile__rating">${getUserRank(films)}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>
  `).trim();
  }
};

export default class UserTitle extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
  }
  getTemplate() {
    return createUserTitleTemplate(this._films);
  }
}
