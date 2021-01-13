import {UserTitle} from "../const";

const {getWatchedList} = require(`./statistcs`);

export const getUserRank = (films) => {

  const filmLength = getWatchedList(films).length;
  if (filmLength === 0) {
    return UserTitle.NEW;
  } else if (filmLength >= 1 && filmLength <= 10) {
    return UserTitle.NOVICE;
  } else if (filmLength >= 11 && filmLength <= 20) {
    return UserTitle.FAN;
  } else if (filmLength >= 21) {
    return UserTitle.MOVIE_BUFF;
  } else {
    return ``;
  }
};
