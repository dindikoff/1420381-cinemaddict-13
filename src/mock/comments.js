import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateAuthor = () => {
  const authors = [
    `Tim Macoveev`,
    `John Doe`,
    `Big Boss`
  ];

  const randomIndex = getRandomInteger(0, authors.length - 1);
  return authors[randomIndex];
};

const generateCommentText = () => {
  const commentText = [
    `Interesting setting and a good cast`,
    `Booooooooooring`,
    `Very very old. Meh`,
    `Almost two hours? Seriously?`
  ];

  const randomIndex = getRandomInteger(0, commentText.length - 1);
  return commentText[randomIndex];
};

const generateEmoji = () => {
  const emojis = [
    `smile`,
    `sleeping`,
    `puke`,
    `angry`
  ];

  const randomIndex = getRandomInteger(0, emojis.length - 1);
  return emojis[randomIndex];
};

const emojiList = () => {
  return [
    `smile`,
    `sleeping`,
    `puke`,
    `angry`
  ];
};

const generateDate = () => {
  const maxDaysGap = 365;
  const maxYearGap = 20;
  const maxMonthGap = 12;

  const maxHours = 12;
  const maxMinutes = 40;

  const daysGap = getRandomInteger(-maxDaysGap, 0);
  const yearGap = getRandomInteger(-maxYearGap, 0);
  const monthGap = getRandomInteger(-maxMonthGap, 0);
  const hourGap = getRandomInteger(-maxHours, 0);
  const minuteGap = getRandomInteger(-maxMinutes, 0);

  const theDate = dayjs().add(daysGap, `day`)
    .add(yearGap, `year`)
    .add(monthGap, `month`)
    .add(hourGap, `hour`)
    .add(minuteGap, `minute`);


  return theDate.toDate();
};

export const generateComment = () => {
  return {
    author: generateAuthor(),
    commentText: generateCommentText(),
    emoji: generateEmoji(),
    emojiList,
    date: generateDate()
  };
};
