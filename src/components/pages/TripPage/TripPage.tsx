/* eslint-disable jsx-a11y/img-redundant-alt */
import { useParams } from 'react-router-dom';
import './styles.scss';
import trips from '../../../data/trips.json';
import { useRef, useState } from 'react';
import { useBookings } from '../../hoc/Layout/Layout';

const TripPage: React.FC = () => {
  const { tripId } = useParams();
  const trip = trips.find(trip => trip.id === tripId);

  const [show, setShow] = useState(true);
  const [guests, setGuests] = useState(1);
  const [date, setDate] = useState(new Date());
  const [totalPrice, setTotalPrice] = useState(trip?.price || 0);
  const dateInput = useRef(null);
  const [_, addBooking] = useBookings();

  const showModal = () => {
    setShow(!show);
  };

  const createBooking = () => {
    if (!trip) return;
    const booking = {
      id: crypto.randomUUID(),
      tripId: trip.id,
      userId: crypto.randomUUID(),
      guests,
      date: date.toISOString(),
      trip: {
        title: trip.title,
        duration: trip.duration,
        price: trip.price,
      },
      totalPrice,
      createdAt: new Date().toISOString(),
    };

    return booking;
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    if (new Date() >= date) {
      return alert('Enter correct date!');
    }
    showModal();

    const booking = createBooking();
    if (booking) {
      addBooking(booking);
    }
  };

  const closeModal: React.MouseEventHandler<HTMLDivElement> = e => {
    const modal = e.target as HTMLDivElement;
    if (modal.classList.contains('modal')) {
      showModal();
    }
  };

  const guestsHandler: React.ChangeEventHandler<HTMLInputElement> = e => {
    setGuests(+e.target.value);
    setTotalPrice(prevPrice => {
      if (prevPrice && trip?.price) {
        return (+trip?.price) * (+e.target.value);
      } else {
        console.log('prevPrice or trip.price is not defined');
        return 0;
      }
    });
  };

  const dateHandler: React.ChangeEventHandler<HTMLInputElement> = e => {
    setDate(new Date(e.target.value));
  };

  if (!trip) {
    return <div>Opps. Something went wong. Trip not found...</div>;
  }

  return (
    <>
      <main className="trip-page">
        <h1 className="visually-hidden">Travel App</h1>
        <div className="trip">
          <img src={trip.image} className="trip__img" alt="trip image" data-test-id="trip-details-image"/>
          <div className="trip__content">
            <div className="trip-info">
              <h3 className="trip-info__title" data-test-id="trip-details-title">{trip.title}</h3>
              <div className="trip-info__content">
                <span className="trip-info__duration" data-test-id="trip-details-duration">
                  <strong>{trip.duration}</strong> days
                </span>
                <span className="trip-info__level" data-test-id="trip-details-level">{trip.level}</span>
              </div>
            </div>
            <div className="trip__description" data-test-id="trip-details-description">{trip.description}</div>
            <div className="trip-price">
              <span>Price</span>
              <strong className="trip-price__value" data-test-id="trip-details-price-value">{trip.price} $</strong>
            </div>
            <button className="trip__button button" onClick={showModal} data-test-id="trip-details-button">
              Book a trip
            </button>
          </div>
        </div>
      </main>
      <div hidden={show}>
        <div className="modal" onClick={closeModal}>
          <div className="book-trip-popup" data-test-id="book-trip-popup">
            <button className="book-trip-popup__close" onClick={showModal} data-test-id="book-trip-popup-close">
              ×
            </button>
            <form
              className="book-trip-popup__form"
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <div className="trip-info">
                <h3 className="trip-info__title" data-test-id="book-trip-popup-title">{trip.title}</h3>
                <div className="trip-info__content">
                  <span className="trip-info__duration" data-test-id="book-trip-popup-duration">
                    <strong>{trip.duration}</strong> days
                  </span>
                  <span className="trip-info__level" data-test-id="book-trip-popup-level">{trip.level}</span>
                </div>
              </div>
              <label className="trip-popup__input input">
                <span className="input__heading">Date</span>
                <input
                  name="date"
                  type="date"
                  ref={dateInput}
                  onChange={dateHandler}
                  required
                  data-test-id="book-trip-popup-date"
                />
              </label>
              <label className="trip-popup__input input">
                <span className="input__heading">Number of guests</span>
                <input
                  name="guests"
                  type="number"
                  min="1"
                  max="10"
                  value={guests}
                  onChange={guestsHandler}
                  required
                  data-test-id="book-trip-popup-guests"
                />
              </label>
              <span className="book-trip-popup__total">
                Total:{' '}
                <output className="book-trip-popup-total-value" data-test-id="book-trip-popup-total-value">
                  {totalPrice} $
                </output>
              </span>
              <button className="button" type="submit" data-test-id="book-trip-popup-submit">
                Book a trip
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default TripPage;
