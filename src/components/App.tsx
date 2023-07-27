import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import BookingPage from './pages/BookingPage/BookingPage';
import MainPage from './pages/MainPage/MainPage';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import TripPage from './pages/TripPage/TripPage';
import Layout from './hoc/Layout/Layout';
import AppPath from '../enums/routes/AppPath';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppPath.ROOT} element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path={AppPath.SIGN_UP} element={<SignUpPage />} />
          <Route path={AppPath.SIGN_IN} element={<SignInPage />} />
          <Route path={AppPath.TRIP} element={<TripPage />} >
            <Route path={AppPath.TRIP_ID} element={<TripPage />} />
          </Route>
          <Route path={AppPath.BOOKINGS} element={<BookingPage />} />
          <Route path={AppPath.ANY} element={<Navigate to={AppPath.ROOT} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
