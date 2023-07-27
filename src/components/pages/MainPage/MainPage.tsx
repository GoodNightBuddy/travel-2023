/* eslint-disable jsx-a11y/img-redundant-alt */
import Trips from '../../common/Trips/Trips';
import tripData from '../../../data/trips.json';
import './styles.scss';
import { useState } from 'react';
import { ITrip } from '../../common/Trips/types/types';

const MainPage: React.FC = () => {
  useState(tripData as ITrip[]);
  const [trips, setTrips] = useState(tripData);

  const [searchTitle, setSearchTitle] = useState('');
  const [searchDuration, setSearchDuration] = useState('');
  const [searchLevel, setSearchLevel] = useState('');

  const filter = ({
    title = searchTitle,
    duration = searchDuration,
    level = searchLevel,
  }): void => {
    const filteredTrips = tripData.filter(trip => {
      if (title) {
        const titleRegExp = new RegExp(title, 'i');
        if (trip.title.search(titleRegExp) === -1) return false;
      }

      if (level) {
        if (trip.level !== level) return false;
      }

      if (duration) {
        if (duration === '0_x_5') {
          if (trip.duration >= 5) return false;
        }
        if (duration === '5_x_10') {
          if (trip.duration >= 10) return false;
        }
        if (duration === '10_x') {
          if (trip.duration < 10) return false;
        }
      }

      return true;
    });
    setTrips(filteredTrips);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    filter({});
  };

  const onChangeTitle: React.ChangeEventHandler<HTMLInputElement> = e => {
    setSearchTitle(e.target.value);
  };

  const onChangeDuration: React.ChangeEventHandler<HTMLSelectElement> = e => {
    setSearchDuration(e.target.value);
    filter({ duration: e.target.value });
  };

  const onChangeLevel: React.ChangeEventHandler<HTMLSelectElement> = e => {
    setSearchLevel(e.target.value);
    filter({ level: e.target.value });
  };

  return (
    <main>
      <h1 className="visually-hidden">Travel App</h1>
      <section className="trips-filter">
        <h2 className="visually-hidden">Trips filter</h2>
        <form
          className="trips-filter__form"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <label className="trips-filter__search input">
            <span className="visually-hidden">Search by name</span>
            <input
              name="search"
              type="search"
              placeholder="search by title"
              onChange={onChangeTitle}
              data-test-id="filter-search"
            />
          </label>
          <label className="select">
            <span className="visually-hidden">Search by duration</span>
            <select
              name="duration"
              data-test-id="filter-duration"
              onChange={onChangeDuration}
            >
              <option value="">duration</option>
              <option value="0_x_5">&lt; 5 days</option>
              <option value="5_x_10">&lt; 10 days</option>
              <option value="10_x">&ge; 10 days</option>
            </select>
          </label>
          <label className="select">
            <span className="visually-hidden">Search by level</span>
            <select
              name="level"
              data-test-id="filter-level"
              onChange={onChangeLevel}
            >
              <option value="">level</option>
              <option value="easy">easy</option>
              <option value="moderate">moderate</option>
              <option value="difficult">difficult</option>
            </select>
          </label>
        </form>
      </section>
      <Trips trips={trips} />
    </main>
  );
};

export default MainPage;
