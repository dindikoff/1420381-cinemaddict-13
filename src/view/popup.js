import SmartView from './smart.js';
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

const generateCommentsBlockTemplate = (comments, isEmoji, emojiName, commentText) => {
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
        <div class="film-details__add-emoji-label">
             ${isEmoji ? `<img src="images/emoji/${emojiName}.png" width="55" height="55" alt="emoji-${emojiName}">` : ``}
        </div>
        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${commentText === undefined ? `` : commentText}</textarea>
        </label>

        <div class="film-details__emoji-list">
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
          <label class="film-details__emoji-label" for="emoji-smile">
            <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji-smile">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
          <label class="film-details__emoji-label" for="emoji-sleeping">
            <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji-sleeping">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
          <label class="film-details__emoji-label" for="emoji-puke">
            <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji-puke">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
          <label class="film-details__emoji-label" for="emoji-angry">
            <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji-angry">
          </label>
        </div>
      </div>
    </section>
  `);
};

const createFilmDetailsTemplate = (data) => {
  const {
    title, originalTitle,
    director, writers,
    actors, date,
    country, pg,
    poster, rating,
    duration, genre,
    description, comments,
    isFilmInWatchList, isFilmInHistory,
    isFilmInFavorite, isEmoji,
    emojiName, commentText,
  } = data;

  const genresList = genre.map((gen) => {
    return `<span class="film-details__genre">${gen}</span>`;
  }).join(``);

  const writerList = writers.map((writer) => {
    return `${writer}`;
  }).join(`, `);

  const actorsList = actors.map((actor) => {
    return `${actor}`;
  }).join(`, `);

  const commentsBlock = generateCommentsBlockTemplate(comments, isEmoji, emojiName, commentText);
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
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isFilmInWatchList ? ` checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isFilmInHistory ? ` checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFilmInFavorite ? ` checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>
        <div class="film-details__bottom-container">
          ${commentsBlock}
        </div>
      </form>
    </section>`).trim();
};

export default class Popup extends SmartView {
  constructor(film) {
    super();
    this._data = Popup.parseFilmToData(film);

    this._closeCrossClickHandler = this._closeCrossClickHandler.bind(this);
    this._changeEmojiHandler = this._changeEmojiHandler.bind(this);
    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._changeControlHandler = this._changeControlHandler.bind(this);

    this._setInnerHandlers();
    this._setEmojiHandler();
    this._setControlHandler();
  }

  reset(film) {
    this.updateData(Popup.parseFilmToData(film));
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._data);
  }

  _closeCrossClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeCrossClick();
    this.reset(this.film);
  }

  setCloseCrossClickHandler(cb) {
    this._callback.closeCrossClick = cb;
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, this._closeCrossClickHandler);
  }

  _commentInputHandler(evt) {
    evt.preventDefault();

    this.updateData({
      commentText: evt.target.value,
    }, true);
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.film-details__comment-input`)
      .addEventListener(`input`, this._commentInputHandler);
  }

  _changeControlHandler(evt) {
    evt.preventDefault();

    switch (evt.target.htmlFor) {
      case `watchlist`:
        this.updateData({
          isFilmInWatchList: !this._data.isFilmInWatchList,
        });
        break;
      case `watched`:
        this.updateData({
          isFilmInHistory: !this._data.isFilmInHistory,
        });
        break;
      case `favorite`:
        this.updateData({
          isFilmInFavorite: !this._data.isFilmInFavorite,
        });
        break;
    }
  }

  _setControlHandler() {
    this.getElement().querySelector(`.film-details__controls`)
      .addEventListener(`click`, this._changeControlHandler);
  }

  restoreHandlers() {
    this.setCloseCrossClickHandler(this._callback.closeCrossClick);
    this._setInnerHandlers();
    this._setEmojiHandler();
    this._setControlHandler();
  }

  _setEmojiHandler() {
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`change`, this._changeEmojiHandler);
  }

  _changeEmojiHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isEmoji: true,
      emojiName: evt.target.value,
    });
  }

  static parseFilmToData(film) {
    return Object.assign(
        {},
        film,
        {
          isEmoji: false,
          emojiName: ``,
          commentText: ``,
        });
  }

}
