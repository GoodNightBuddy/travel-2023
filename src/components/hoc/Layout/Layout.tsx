import { useState } from 'react';
import heartIcon from '../../../images/heart.svg';
import { Link, Outlet, useMatch, useOutletContext } from 'react-router-dom';
import './styles.scss';
import HeaderNav from '../../common/HeaderNav/HeaderNav';
import bookingList from '../../../data/bookings.json';
import { IBooking } from '../../pages/BookingPage/types/types';

const Layout: React.FC = () => {
  const signInMatch = useMatch('sign-in');
  const signUpMatch = useMatch('sign-up');
  const dislayNavigation = !signInMatch && !signUpMatch;

  const [bookings, setBookings] = useState<IBooking[]>(bookingList);
  const addBooking = (booking: IBooking) => {
    setBookings(prevBookings => [booking, ...prevBookings]);
  };
  const deleteBooking = (bookingId: string) => {
    setBookings(prevBookings =>
      prevBookings.filter(booking => booking.id !== bookingId)
    );
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="header__inner">
          <Link to={'/'} className="header__logo" data-test-id="header-logo">
            Travel App
          </Link>
          {dislayNavigation && <HeaderNav />}
        </div>
      </header>
      <div className="layout-main">
        <h1 className="visually-hidden">Travel App</h1>

        <Outlet context={[bookings, addBooking, deleteBooking]} />
      </div>
      <footer className="footer">
        <span className="footer__text">
          from{' '}
          <a className="footer__link" href="https://binary-studio.com">
            binary studio
          </a>{' '}
          with
          <img className="footer__icon" src={heartIcon} alt="heart icon" />
        </span>
      </footer>
    </div>
  );
};

type ContextType = [
  bookings: IBooking[],
  addBooking: (booking: IBooking) => void,
  deleteBooking: (bookingId: string) => void
];

export function useBookings() {
  return useOutletContext<ContextType>();
}

export default Layout;
