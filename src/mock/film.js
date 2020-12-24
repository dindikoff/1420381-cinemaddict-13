import dayjs from 'dayjs';
import {generateComment} from './comments.js';
import {getRandomInteger, getRandomFloat, getRandomIndexRange} from '../utils/common.js';

const TITLES = [
  `The Man with the Golden Arm`,
  `The Great Flamarion`,
  `Santa Claus Conquers the Martians`,
  `Made for Each Other`,
  `The Dance of Life`,
  `Sagebrush Trail`,
  `Popeye the Sailor Meets Sindbad the Sailor`,
];

const POSTERS = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

const FILM_RATING = {
  MIN: 0.0,
  MAX: 10.0
};

const GENRES = [
  `Musical`,
  `Cartoon`,
  `Comedy`,
  `Drama`,
  `Western`,
  `Mystery`,
];

const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

const DIRECTORS = [
  `Woody Allen`,
  `Tim Burton`,
  `James Cameron`,
  `John Ford`,
  `Stanley Kubrick`,
  `George Lucas`,
];

const WRITERS = [
  `Quentin Tarantino`,
  `Francis Ford Coppola`,
  `William Goldman`,
  `Charlie Kaufman`,
  `Woody Allen`,
];

const ACTORS = [
  `Jack Nicholson`,
  `Marlon Brando`,
  `Robert De Niro`,
  `Al Pacino`,
  `Daniel Day-Lewis`,
  `Dustin Hoffman`,
  `Tom Hanks`,
  `Anthony Hopkins`,
  `Paul Newman`,
  `Denzel Washington`,
];

const GAPS = {
  MAX_DAYS: 365,
  MAX_YEARS: 20,
  MAX_MONTHS: 12
};

const COUNTRIES = [
  `USA`,
  `UK`,
  `CANADA`,
  `GERMAN`,
  `ITALY`,
  `SPAIN`,
  `WONDERLAND`
];

const generateTitle = () => {
  return getRandomIndexRange(0, TITLES);
};

const generatePoster = () => {
  return getRandomIndexRange(0, POSTERS);
};

const generateRating = () => {
  return getRandomFloat(FILM_RATING.MIN, FILM_RATING.MAX).toFixed(1);
};

const generateGenre = () => {
  const randomArrayNumber = getRandomInteger(1, 3);

  const getRandomGenre = () => {
    return getRandomIndexRange(0, GENRES);
  };

  const randomGenreList = new Array(randomArrayNumber).fill()
    .map(getRandomGenre);

  return randomGenreList;
};

const generateDescription = () => {
  let description = ``;

  for (let i = 0; i < getRandomInteger(1, 5); i++) {
    description += getRandomIndexRange(0, DESCRIPTIONS);
  }
  return description;
};

const generateCommentsList = () => {
  const commentList = [];

  for (let i = 0; i < getRandomInteger(1, 5); i++) {
    commentList.push(generateComment());
  }

  return commentList;
};

const generateFilmDirector = () => {
  return getRandomIndexRange(0, DIRECTORS);
};

const generateFilmWriters = () => {
  const randomArrayNumber = getRandomInteger(1, WRITERS.length - 1);

  const getRandomWriter = () => {
    return getRandomIndexRange(0, WRITERS);
  };

  const randomWriterList = new Array(randomArrayNumber).fill()
    .map(getRandomWriter);

  return randomWriterList;
};

const generateFilmActors = () => {
  const getRandomActor = () => {
    return getRandomIndexRange(0, ACTORS);
  };

  const randomArrayNumber = getRandomInteger(1, ACTORS.length - 1);

  const randomActorList = new Array(randomArrayNumber).fill()
    .map(getRandomActor);

  return randomActorList;
};

const generateRandomDate = () => {
  const theDate = dayjs().add(getRandomInteger(-GAPS.MAX_DAYS, 0), `day`)
    .add(getRandomInteger(-GAPS.MAX_YEARS, 0), `year`)
    .add(getRandomInteger(-GAPS.MAX_MONTHS, 0), `month`);

  return theDate.toDate();
};

const generateCountry = () => {
  return getRandomIndexRange(0, COUNTRIES);
};

const generatePgRating = () => {
  return getRandomInteger(0, 18);
};

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

export const generateFilm = () => {
  return {
    id: generateId(),
    title: generateTitle(),
    originalTitle: generateTitle(),
    director: generateFilmDirector(),
    writers: generateFilmWriters(),
    actors: generateFilmActors(),
    date: generateRandomDate(),
    country: generateCountry(),
    pg: generatePgRating(),
    poster: generatePoster(),
    rating: generateRating(),
    duration: getRandomInteger(0, 300),
    genre: generateGenre(),
    description: generateDescription(),
    comments: generateCommentsList(),
    isFilmInWatchList: Boolean(getRandomInteger(0, 1)),
    isFilmInHistory: Boolean(getRandomInteger(0, 1)),
    isFilmInFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
