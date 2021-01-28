import Smart from './smart';
import {StatsFilter} from '../const.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {genresFilter} from '../utils/statistcs.js';
import {getUserRank} from '../utils/title.js';

const renderChart = (statisticCtx, data) => {
  const sortedGenres = genresFilter(data).SORT_GENRES;
  const BAR_HEIGHT = 50;
  statisticCtx.height = BAR_HEIGHT * Object.keys(sortedGenres).length;

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: Object.keys(sortedGenres),
      datasets: [{
        data: Object.values(sortedGenres),
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

const createStats = (data) => {
  return (`<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${getUserRank(data.films)}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" ${data.filter === StatsFilter.ALL ? `checked` : ``}>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today" ${data.filter === StatsFilter.TODAY ? `checked` : ``}>
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week" ${data.filter === StatsFilter.WEEK ? `checked` : ``}>
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month" ${data.filter === StatsFilter.MONTH ? `checked` : ``}>
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year" ${data.filter === StatsFilter.YEAR ? `checked` : ``}>
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${genresFilter(data).FILMS_COUNT} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${genresFilter(data).DURATION.HOURS} <span class="statistic__item-description">h</span> ${genresFilter(data).DURATION.MINUTES} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">
            ${genresFilter(data).TOP_GENRE ? genresFilter(data).TOP_GENRE : ``}
        </p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`).trim();
};

export default class Stats extends Smart {
  constructor(films) {
    super();

    this._data = {
      films,
      filter: StatsFilter.ALL
    };

    this._chart = null;

    this._onFilterButton = this._onFilterButton.bind(this);

    this._setChart();
    this._setHandler();
  }

  getTemplate() {
    return createStats(this._data);
  }

  removeElement() {
    super.removeElement();
    if (this._chart !== null) {
      this._chart = null;
    }
  }

  _onFilterButton(evt) {
    if (evt.target.tagName !== `INPUT`) {
      return;
    }

    if (evt.target.value === `all-time`) {
      this.updateData({filter: StatsFilter.ALL});
    } else {
      this.updateData({filter: evt.target.value});
    }

    this._setChart();
  }

  _setHandler() {
    this.getElement().querySelector(`.statistic__filters`).addEventListener(`click`, this._onFilterButton);
  }

  restoreHandlers() {
    this._setHandler();
  }

  _setChart() {
    if (this._chart !== null) {
      this._chart = null;
    }
    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);
    this._chart = renderChart(statisticCtx, this._data);
  }
}
