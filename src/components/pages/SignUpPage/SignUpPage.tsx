import { Link, useNavigate } from 'react-router-dom';
import './styles.scss';

const SignUpPage: React.FC<any> = () => {
  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <main className="sign-up-page">
      <h1 className="visually-hidden">Travel App</h1>
      <form className="sign-up-form" autoComplete="off" onSubmit={handleSubmit}>
        <h2 className="sign-up-form__title">Sign Up</h2>
        <label className="trip-popup__input input">
          <span className="input__heading">Full name</span>
          <input
            name="full-name"
            type="text"
            required
            data-test-id="auth-full-name"
          />
        </label>
        <label className="trip-popup__input input">
          <span className="input__heading">Email</span>
          <input name="email" type="email" required data-test-id="auth-email" />
        </label>
        <label className="trip-popup__input input">
          <span className="input__heading">Password</span>
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={3}
            required
            data-test-id="auth-password"
          />
        </label>
        <button className="button" type="submit" data-test-id="auth-submit">
          Sign Up
        </button>
      </form>
      <span>
        Already have an account?
        <Link
          to={'/sign-in'}
          className="sign-up-form__link"
          data-test-id="auth-sign-in-link"
        >
          Sign In
        </Link>
      </span>
    </main>
  );
};

export default SignUpPage;
