import dayjs from 'dayjs';
import {generateComment} from './comments.js';
import {getRandomInteger, getRandomFloat} from '../utils.js';

const generateTitlte = () => {
  const titles = [
    `The Man with the Golden Arm`,
    `The Great Flamarion`,
    `Santa Claus Conquers the Martians`,
    `Made for Each Other`,
    `The Dance of Life`,
    `Sagebrush Trail`,
    `Popeye the Sailor Meets Sindbad the Sailor`,
  ];

  const randomIndex = getRandomInteger(0, titles.length - 1);
  return titles[randomIndex];
};

const generatePoster = () => {
  const posters = [
    `made-for-each-other.png`,
    `popeye-meets-sinbad.png`,
    `sagebrush-trail.jpg`,
    `santa-claus-conquers-the-martians.jpg`,
    `the-dance-of-life.jpg`,
    `the-great-flamarion.jpg`,
    `the-man-with-the-golden-arm.jpg`,
  ];

  const randomIndex = getRandomInteger(0, posters.length - 1);
  return posters[randomIndex];
};

const generateRating = () => {
  const MIN_RATING = 0.0;
  const MAX_RATING = 10.0;

  return getRandomFloat(MIN_RATING, MAX_RATING).toFixed(1);
};

const generateYear = () => {
  const MIN_YEAR = 1900;
  const MAX_YEAR = 2020;

  return getRandomInteger(MIN_YEAR, MAX_YEAR);
};

const generateDuration = () => {
  const HOUR = 60;
  const MIN_DURATION = 90;
  const MAX_DURATION = 260;

  const hour = Math.floor(getRandomInteger(MIN_DURATION, MAX_DURATION) / HOUR);
  const minutes = Math.floor(getRandomInteger(MIN_DURATION, MAX_DURATION)) % HOUR;

  return `${hour}h ${minutes}m`;
};

const generateGenre = () => {
  const genres = [
    `Musical`,
    `Cartoon`,
    `Comedy`,
    `Drama`,
    `Western`,
    `Mystery`,
  ];

  const randomArrayNumber = getRandomInteger(1, 3);

  const getRandomGenre = () => {
    const randomIndex = getRandomInteger(0, genres.length - 1);
    return genres[randomIndex];
  };

  const randomGenreList = new Array(randomArrayNumber).fill()
    .map(getRandomGenre);

  return randomGenreList;
};

const generateDescription = () => {
  const descriptions = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`,
  ];

  let description = ``;

  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  for (let i = 0; i < getRandomInteger(1, 5); i++) {
    description += descriptions[randomIndex];
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
  const directors = [
    `Woody Allen`,
    `Tim Burton`,
    `James Cameron`,
    `John Ford`,
    `Stanley Kubrick`,
    `George Lucas`,
  ];

  const randomIndex = getRandomInteger(0, directors.length - 1);
  return directors[randomIndex];
};

const generateFilmWriters = () => {
  const writers = [
    `Quentin Tarantino`,
    `Francis Ford Coppola`,
    `William Goldman`,
    `Charlie Kaufman`,
    `Woody Allen`,
  ];

  const randomArrayNumber = getRandomInteger(1, writers.length - 1);

  const getRandomWriter = () => {
    const randomIndex = getRandomInteger(0, writers.length - 1);
    return writers[randomIndex];
  };

  const randomWriterList = new Array(randomArrayNumber).fill()
    .map(getRandomWriter);

  return randomWriterList;
};

const generateFilmActors = () => {
  const actors = [
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

  const getRandomActor = () => {
    const randomIndex = getRandomInteger(0, actors.length - 1);
    return actors[randomIndex];
  };

  const randomArrayNumber = getRandomInteger(1, actors.length - 1);

  const randomActorList = new Array(randomArrayNumber).fill()
    .map(getRandomActor);

  return randomActorList;
};

const generateRandomDate = () => {
  const maxDaysGap = 365;
  const maxYearGap = 20;
  const maxMonthGap = 12;

  const daysGap = getRandomInteger(-maxDaysGap, 0);
  const yearGap = getRandomInteger(-maxYearGap, 0);
  const monthGap = getRandomInteger(-maxMonthGap, 0);

  const theDate = dayjs().add(daysGap, `day`)
    .add(yearGap, `year`)
    .add(monthGap, `month`);

  return theDate.toDate();
};

const generateCountry = () => {
  const countries = [
    `USA`,
    `UK`,
    `CANADA`,
    `GERMAN`,
    `ITALY`,
    `SPAIN`,
    `WONDERLAND`
  ];

  const randomIndex = getRandomInteger(0, countries.length - 1);
  return countries[randomIndex];
};

const generatePgRating = () => {
  return getRandomInteger(0, 18);
};

export const generateFilm = () => {
  return {
    title: generateTitlte(),
    originalTitle: generateTitlte(),
    director: generateFilmDirector(),
    writers: generateFilmWriters(),
    actors: generateFilmActors(),
    date: generateRandomDate(),
    country: generateCountry(),
    pg: generatePgRating(),
    poster: generatePoster(),
    rating: generateRating(),
    year: generateYear(),
    duration: generateDuration(),
    genre: generateGenre(),
    description: generateDescription(),
    comments: generateCommentsList(),
    isFilmInWatchList: Boolean(getRandomInteger(0, 1)),
    isFilmInHistory: Boolean(getRandomInteger(0, 1)),
    isFilmInFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
