import Observer from '../utils/observer.js';

export default class Comments extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  setComments(comments) {
    this._comments = comments.slice();
  }

  addComment(updateType, update) {
    this._comments = [
      ...this._comments,
      update
    ];

    this._notify(updateType, update);
  }

  deleteComment(updateType, id) {
    const index = this._comments.findIndex((comment) => parseInt(comment.id, 10) === parseInt(id, 10));
    if (index === -1) {
      throw new Error(`Can't delete nonexistent comment`);
    }

    this._comments = [
      ...this._comments.slice(0, index),
      ...this._comments.slice(index + 1)
    ];

    this._notify(updateType);
  }

  getComments() {
    return this._comments.slice();
  }

  static adaptToClient(comment) {
    const adaptedComment = Object.assign(
        {},
        comment,
        {
          commentText: comment.comment,
          date: new Date(comment.date),
          emoji: comment.emotion
        }
    );

    delete adaptedComment.comment;
    delete adaptedComment.emotion;

    return adaptedComment;
  }

  static adaptToServer(comment) {
    return {
      comment: comment.commentText,
      date: new Date() instanceof Date ? new Date().toISOString() : null,
      emotion: comment.emoji
    };
  }
}
