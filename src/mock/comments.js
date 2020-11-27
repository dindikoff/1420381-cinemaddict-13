import dayjs from 'dayjs';
import {getRandomIndexRange, getRandomInteger} from '../utils.js';

const AUTHORS = [
  `Tim Macoveev`,
  `John Doe`,
  `Big Boss`
];

const COMMENT_TEXT = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`
];

const EMOJIS = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`
];

const GAPS = {
  MAX_DAYS: 365,
  MAX_YEARS: 20,
  MAX_MONTHS: 12,
  MAX_HOURS: 12,
  MAX_MINUTES: 40
};

const EMOJI_LIST = () => {
  return [
    `smile`,
    `sleeping`,
    `puke`,
    `angry`
  ];
};

const generateAuthor = () => {
  return getRandomIndexRange(0, AUTHORS);
};

const generateCommentText = () => {
  return getRandomIndexRange(0, COMMENT_TEXT);
};

const generateEmoji = () => {
  return getRandomIndexRange(0, EMOJIS);
};

const generateDate = () => {
  const theDate = dayjs().add(getRandomInteger(-GAPS.MAX_DAYS, 0), `day`)
    .add(getRandomInteger(-GAPS.MAX_YEARS, 0), `year`)
    .add(getRandomInteger(-GAPS.MAX_MONTHS, 0), `month`)
    .add(getRandomInteger(-GAPS.MAX_HOURS, 0), `hour`)
    .add(getRandomInteger(-GAPS.MAX_MINUTES, 0), `minute`);

  return theDate.toDate();
};

export const generateComment = () => ({
  author: generateAuthor(),
  commentText: generateCommentText(),
  emoji: generateEmoji(),
  EMOJI_LIST,
  date: generateDate()
});
