import Booking from './Booking/Booking';
import './styles.scss';
import { useBookings } from '../../hoc/Layout/Layout';

const BookingPage: React.FC = () => {
  const [bookings] = useBookings();

  return (
    <main className="bookings-page">
      <h1 className="visually-hidden">Travel App</h1>
      <ul className="bookings__list">
        {bookings.map(booking => (
          <Booking booking={booking} key={booking.id} />
        ))}
      </ul>
    </main>
  );
};

export default BookingPage;
