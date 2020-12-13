import AbstractView from "./abstract.js";
import {formatReleaseDate, formatCommentDate} from '../utils/common.js';

const generateCommentTemplate = (comment) => {
  return (`
    <li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${comment.emoji}.png" width="55" height="55" alt="emoji-${comment.emoji}">
      </span>
      <div>
        <p class="film-details__comment-text">${comment.commentText}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comment.author}</span>
          <span class="film-details__comment-day">${formatCommentDate(comment.date)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>
  `).trim();
};

const generateCommentsBlockTemplate = (comments) => {
  const commentItems = comments.map((comment) => {
    return (generateCommentTemplate(comment));
  }).join(``);

  return (`
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
      <ul class="film-details__comments-list">
        ${commentItems}
      </ul>

      <div class="film-details__new-comment">
        <div class="film-details__add-emoji-label"></div>
        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
        </label>

        <div class="film-details__emoji-list">
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
          <label class="film-details__emoji-label" for="emoji-smile">
            <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
          <label class="film-details__emoji-label" for="emoji-sleeping">
            <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
          <label class="film-details__emoji-label" for="emoji-puke">
            <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
          <label class="film-details__emoji-label" for="emoji-angry">
            <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
          </label>
        </div>
      </div>
    </section>
  `);
};

const createFilmDetailsTemplate = (film) => {
  const {
    title, originalTitle,
    director, writers,
    actors, date,
    country, pg,
    poster, rating,
    duration, genre,
    description, comments
  } = film;

  const genresList = genre.map((gen) => {
    return `<span class="film-details__genre">${gen}</span>`;
  }).join(``);

  const writerList = writers.map((writer) => {
    return `${writer}`;
  }).join(`, `);

  const actorsList = actors.map((actor) => {
    return `${actor}`;
  }).join(`, `);


  const commentsBlock = generateCommentsBlockTemplate(comments);

  return (`
    <section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">
              <p class="film-details__age">${pg}+</p>
            </div>
            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${originalTitle}</p>
                </div>
                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>
              <table class="film-details__table">
                <tbody><tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writerList}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actorsList}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${formatReleaseDate(date)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    ${genresList}
                    </td>
                </tr>
              </tbody></table>
              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>
          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>
        <div class="film-details__bottom-container">
          ${commentsBlock}
        </div>
      </form>
    </section>`).trim();
};

export default class FilmDetails extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._closeClickHandler = this._closeClickHandler.bind(this);

    this._watchListClickHandler = this._watchListClickHandler.bind(this);
    this._asWatchedClickHandler = this._asWatchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film);
  }

  _closeClickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _watchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchList();
  }

  _asWatchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.asWatched();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favorite();
  }


  setCloseClickHandler(cb) {
    this._callback.click = cb;
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, this._closeClickHandler);
  }

  setFilmWatchListClickHandler(cb) {
    this._callback.watchList = cb;
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, this._watchListClickHandler);
  }

  setFilmAsWatchedClickHandler(cb) {
    this._callback.asWatched = cb;
    this.getElement().querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, this._asWatchedClickHandler);
  }

  setFilmFavoriteClickHandler(cb) {
    this._callback.favorite = cb;
    this.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, this._favoriteClickHandler);
  }

}
