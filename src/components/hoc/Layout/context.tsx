import { useState } from 'react';
import bookingList from '../../../data/bookings.json';
import { IBooking } from '../../pages/BookingPage/types/types';
import { useOutletContext } from 'react-router-dom';

const useBookingContext = () => {
  const [bookings, setBookings] = useState<IBooking[]>(bookingList);
  const addBooking = (booking: IBooking) => {
    setBookings(prevBookings => [booking, ...prevBookings]);
  };
  const deleteBooking = (bookingId: string) => {
    setBookings(prevBookings =>
      prevBookings.filter(booking => booking.id !== bookingId)
    );
  };

  return [bookings, addBooking, deleteBooking]
};

type ContextType = [
  bookings: IBooking[],
  addBooking: (booking: IBooking) => void,
  deleteBooking: (bookingId: string) => void
];

export function useBookings() {
  return useOutletContext<ContextType>();
}

export default useBookingContext;