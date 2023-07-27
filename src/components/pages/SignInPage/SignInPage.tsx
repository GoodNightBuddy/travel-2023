import { Link, useNavigate } from 'react-router-dom';
import './styles.scss';

const SignInPage: React.FC = () => {
  const navigate = useNavigate()
  const handeSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
      navigate('/')
  }

  return (
    <>
      <main className="sign-in-page">
        <h1 className="visually-hidden">Travel App</h1>
        <form className="sign-in-form" autoComplete="off" onSubmit={handeSubmit}>
          <h2 className="sign-in-form__title">Sign In</h2>
          <label className="trip-popup__input input">
            <span className="input__heading">Email</span>
            <input name="email" type="email" required data-test-id="auth-email"/>
          </label>
          <label className="trip-popup__input input">
            <span className="input__heading">Password</span>
            <input name="password" type="password" autoComplete="new-password" minLength={3} required data-test-id="auth-password"/>
          </label>
          <button className="button" type="submit" data-test-id="auth-submit">Sign In</button>
        </form>
        <span>
          Don't have an account?
          <Link to={'/sign-up'} className="sign-in-form__link" data-test-id="auth-sign-up-link">Sign Up</Link>
        </span>
      </main>
    </>
  )
};

export default SignInPage