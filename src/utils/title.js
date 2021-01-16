import {UserRank} from "../const";

const {getWatchedList} = require(`./statistcs`);

export const getUserRank = (films) => {
  const filmLength = getWatchedList(films).length;

  if (filmLength > UserRank.MOVIE_BUFF.filmsCount) {
    return UserRank.MOVIE_BUFF.rankName;
  } else if (filmLength > UserRank.NOVICE.filmsCount) {
    return UserRank.FAN.rankName;
  } else if (filmLength > UserRank.NEW.filmsCount) {
    return UserRank.NOVICE.rankName;
  }

  return UserRank.NEW.rankName;
};

