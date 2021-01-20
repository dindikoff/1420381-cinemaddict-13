import SmartView from './smart.js';
import {formatCommentDate, formatReleaseDate, getTimeFromMins, isEnter, isEscape, isOnline} from '../utils/utils.js';
import he from 'he';

const generateCommentTemplate = (comment, isDeleting = false) => {
  return (`<li class="film-details__comment" id="${comment.id}"">
      <span class="film-details__comment-emoji">
  ${comment.emoji ? `<img src="./images/emoji/${comment.emoji}.png" width="55" height="55" alt="emoji-${comment.emoji}">`
      : ``}</span>
      <div>
        <p class="film-details__comment-text">${he.encode(comment.commentText)}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comment.author}</span>
          <span class="film-details__comment-day">${formatCommentDate(comment.date)}</span>
          <button class="film-details__comment-delete" ${isDeleting ? `disabled` : ``}>${isDeleting ? `Deleting…` : `Delete`}</button>
        </p>
      </div>
    </li>`).trim();
};

const generateCommentsBlockTemplate = (comments, isEmoji, emojiName, commentText, isDisabled, isDeleting, deletedId) => {
  const commentItems = comments.map((comment) => {
    return comment.id === deletedId ? (generateCommentTemplate(comment, true)) :
      generateCommentTemplate(comment, false);
  }).join(``);

  return (`
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
      <ul class="film-details__comments-list">
        ${isOnline() ? commentItems : `Loading...`}
      </ul>

      <div class="film-details__new-comment">
        <div class="film-details__add-emoji-label">
             ${isEmoji ? `<img src="images/emoji/${emojiName}.png" width="55" height="55" alt="emoji-${emojiName}">` : ``}
        </div>
        <label class="film-details__comment-label">
          <textarea ${isDisabled ? `disabled` : ``} class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${commentText === undefined ? `` : commentText}</textarea>
        </label>

        <div class="film-details__emoji-list">
          <input ${isDisabled ? `disabled` : ``} class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
          <label class="film-details__emoji-label" for="emoji-smile">
            <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji-smile">
          </label>

          <input ${isDisabled ? `disabled` : ``} class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
          <label class="film-details__emoji-label" for="emoji-sleeping">
            <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji-sleeping">
          </label>

          <input ${isDisabled ? `disabled` : ``} class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
          <label class="film-details__emoji-label" for="emoji-puke">
            <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji-puke">
          </label>

          <input ${isDisabled ? `disabled` : ``} class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
          <label class="film-details__emoji-label" for="emoji-angry">
            <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji-angry">
          </label>
        </div>
      </div>
    </section>
  `);
};

const createFilmDetailsTemplate = (data, comments) => {
  const {
    title, originalTitle,
    director, writers,
    actors, date,
    country, pg,
    poster, rating,
    duration, genre,
    description,
    isFilmInWatchList, isFilmInAlreadyWatch,
    isFilmInFavorite, isEmoji,
    emojiName, commentText,
    isDisabled, isDeleting,
    deletedId
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

  const commentsBlock = generateCommentsBlockTemplate(comments, isEmoji,
      emojiName, commentText, isDisabled, isDeleting, deletedId);

  return (`
    <section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="">
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
                  <td class="film-details__cell">${getTimeFromMins(duration)}</td>
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
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isFilmInAlreadyWatch ? ` checked` : ``}>
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
  constructor(film, comments = []) {
    super();
    this._data = Popup.parseFilmToData(film);
    this._comments = comments;
    this._scrollPosition = 0;

    this._closeCrossClickHandler = this._closeCrossClickHandler.bind(this);
    this._changeEmojiHandler = this._changeEmojiHandler.bind(this);
    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._closeEscapeHandler = this._closeEscapeHandler.bind(this);

    this._watchListClickHandler = this._watchListClickHandler.bind(this);
    this._asWatchedClickHandler = this._asWatchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);

    this._submitCommentHandler = this._submitCommentHandler.bind(this);
    this._deleteCommentHandler = this._deleteCommentHandler.bind(this);

    this._setInnerHandlers();
    this._setEmojiHandler();
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._data, this._comments);
  }

  _closeCrossClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeCrossClick(Popup.parseDataToFilm(this._data));
  }

  setCloseCrossClickHandler(cb) {
    this._callback.closeCrossClick = cb;
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, this._closeCrossClickHandler);
  }

  _closeEscapeHandler(evt) {
    if (isEscape(evt)) {
      evt.preventDefault();
      this._callback.closeEscapePress(Popup.parseDataToFilm(this._data));
    }
  }

  setEscapePressHandler(cb) {
    this._callback.closeEscapePress = cb;
    document.addEventListener(`keydown`, this._closeEscapeHandler);
  }

  removeEscapePressHandler() {
    document.removeEventListener(`keydown`, this._closeEscapeHandler);
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.film-details__comment-input`)
      .addEventListener(`input`, this._commentInputHandler);
  }

  _watchListClickHandler(evt) {
    evt.preventDefault();
    this._scrollPosition = this.getElement().scrollTop;

    this._callback.popupWatchListClick(this._scrollPosition);
  }

  setWatchListClickHandler(cb) {
    this._callback.popupWatchListClick = cb;
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, this._watchListClickHandler);
  }

  _asWatchedClickHandler(evt) {
    evt.preventDefault();
    this._scrollPosition = this.getElement().scrollTop;

    this._callback.popupAsWatchedClick(this._scrollPosition);
  }

  setAsWatchedClickHandler(cb) {
    this._callback.popupAsWatchedClick = cb;
    this.getElement().querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, this._asWatchedClickHandler);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._scrollPosition = this.getElement().scrollTop;

    this._callback.popupFavoriteClick(this._scrollPosition);
  }

  setFavoriteClickHandler(cb) {
    this._callback.popupFavoriteClick = cb;
    this.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, this._favoriteClickHandler);
  }

  restoreHandlers() {
    this.setCloseCrossClickHandler(this._callback.closeCrossClick);
    this.setSubmitCommentHandler(this._callback.sendComment);
    this.setDeleteComment(this._callback.deleteComment);
    this._setInnerHandlers();
    this._setEmojiHandler();
  }

  _commentInputHandler(evt) {
    evt.preventDefault();

    this.updateData({
      commentText: evt.target.value,
    }, true);
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

  setSubmitCommentHandler(cb) {
    this._callback.sendComment = cb;
    this.getElement().querySelector(`.film-details__comment-input`)
      .addEventListener(`keydown`, this._submitCommentHandler);
  }

  _submitCommentHandler(evt) {
    this._scrollPosition = this.getElement().scrollTop;

    if (isEnter(evt)) {
      evt.preventDefault();
      const comment = {
        commentText: this._data.commentText,
        emoji: this._data.emojiName
      };
      this._callback.sendComment(comment, this._scrollPosition);
    }
  }

  setDeleteComment(cb) {
    this._callback.deleteComment = cb;
    this.getElement().querySelectorAll(`.film-details__comment-delete`)
      .forEach((deleteButton) =>
        deleteButton.addEventListener(`click`, this._deleteCommentHandler));
  }

  _deleteCommentHandler(evt) {
    evt.preventDefault();

    // evt.target.textContent = `Deleting`;
    // evt.target.disabled = true;

    this._scrollPosition = this.getElement().scrollTop;

    const clickedId = evt.target.parentElement.parentElement.parentElement.id;
    this._callback.deleteComment(clickedId, this._scrollPosition);
  }

  static parseFilmToData(film) {
    return Object.assign(
        {},
        film,
        {
          isEmoji: false,
          emojiName: ``,
          commentText: ``,
          isDisabled: false,
          isDeleting: false
        });
  }

  static parseDataToFilm(data) {
    data = Object.assign({}, data);

    delete data.isEmoji;
    delete data.emojiName;
    delete data.commentText;
    delete data.isDeleting;
    delete data.isDisabled;

    return data;
  }

}
